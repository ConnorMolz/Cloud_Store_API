import axios from 'axios';
import https from 'https';

class CloudStoreApiClient {
    /**
     * Create a new CloudStoreApiClient instance
     * @param {Object} config - Configuration object
     * @param {string} config.baseUrl - Base URL of the API
     * @param {string} [config.username] - Optional username for authentication
     * @param {string} [config.password] - Optional password for authentication
     */
    async constructor({baseUrl, username, password, useTLS = true}) {
        // Create an axios instance with base configuration
        const usernamePasswordBuffer = Buffer.from(username + ':' + password);
        const base64data = usernamePasswordBuffer.toString('base64');
        this.axiosInstance = await axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${base64data}`,
            },
            httpsAgent: {
                rejectUnauthorized: useTLS
            },
            withCredentials: false
        });
    }

    /**
     * Retrieve file list for a given path
     * @param {string} path - Directory path to list files from
     * @returns {Promise<Object>} File list view model
     */
    async getFileList(path) {
        try {
            const response = await this.axiosInstance.get('/api/file_list', {
                params: { path },
            });
            return response.data;
        } catch (error) {
            this._handleError(error, 'Get File List');
        }
    }

    /**
     * Download a file
     * @param {string} path - Directory path of the file
     * @param {string} fileName - Name of the file to download
     * @returns {Promise<Blob>} File stream
     */
    async downloadFile(path, fileName) {
        try {
            const response = await this.axiosInstance.get('/api/file', {
                params: { path, fileName },
                responseType: 'blob',
            });
            return response.data;
        } catch (error) {
            this._handleError(error, 'Download File');
        }
    }

    /**
     * Upload a file
     * @param {string} currentPath - Current directory path
     * @param {string} fileName - Name of the file to upload
     * @param {File|Blob|ReadableStream} fileStream - File to upload
     * @returns {Promise<void>}
     */
    async uploadFile(currentPath, fileName, fileStream) {
        try {
            const formData = new FormData();
            formData.append('file', fileStream, fileName);

            await this.axiosInstance.post('/api/file', formData, {
                params: { currentPath, fileName },
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        } catch (error) {
            this._handleError(error, 'Upload File');
        }
    }

    /**
     * Delete a file
     * @param {string} path - Directory path of the file
     * @param {string} fileName - Name of the file to delete
     * @returns {Promise<void>}
     */
    async deleteFile(path, fileName) {
        try {
            await this.axiosInstance.delete('/api/file', {
                params: { path, fileName },
            });
        } catch (error) {
            this._handleError(error, 'Delete File');
        }
    }

    /**
     * Create a new folder
     * @param {string} currentPath - Current directory path
     * @param {string} folderName - Name of the folder to create
     * @returns {Promise<void>}
     */
    async createFolder(currentPath, folderName) {
        try {
            await this.axiosInstance.post('/api/folder', null, {
                params: { currentPath, folderName },
            });
        } catch (error) {
            this._handleError(error, 'Create Folder');
        }
    }

    /**
     * Internal error handling method
     * @param {Error} error - Axios error object
     * @param {string} operation - Name of the operation that failed
     * @private
     */
    _handleError(error, operation) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(`${operation} failed: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error(`${operation} failed: No response received`);
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(`${operation} failed: ${error.message}`);
        }
    }
}

export default CloudStoreApiClient;