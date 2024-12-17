# Cloud Store API

This package will be a JS connector for the Cloud Store API

## How to use
### Installation
```
npm install --save  cloud_store_api
```
### Usage
```
// Create a client instance
      const client = new CloudStoreApiClient({
          baseUrl: 'http://localhost:5234',   // Example URL
          username: 'admin',   // Example credentials
          password: 'admin',   // Example credentials
          useTLS: false   // For bypass SSL
      });

// Example methods
      try {
          // Get file list
          const fileList = await client.getFileList(''); // Rootpath
          console.log(fileList);
      } catch (error) {
          console.error('API Error:', error);
      }
```

## !!! Important !!!
In your Cloud Store installation you need to enable the API elsewhere you will get a 404 Error
