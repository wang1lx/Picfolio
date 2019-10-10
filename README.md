# Picfolio

## Installation Instructions (Running Backend Only)
````javascript
// Clone this repo 
git clone https://github.com/solidsnacks/Picfolio.git

// Change to Picfolio directory
cd Picfolio

// Install server dependencies in Picfolio root directory
npm install

// Create your own /config/default.json file
// Note: mongoURI can be for remote database or local mongoDB instance
{
  mongoURI: 'YOUR_MONGO_URI',
  tokenSecret: 'SOME_TOKEN_SECRET'
}

// Run Express Server, server will run on http://localhost:5000
npm run server
````


## Testing Instructions
````javascript
// Make sure Picfolio and MongoDB are installed

// Start local MongoDB instance in any terminal directory
mongod

// Run test script in Picfolio root directory
npm run test

// Mocha test suite will now run
````

## Misc Documentation
-----
![picfolio app architecture diagram](https://i.imgur.com/a4cOlNd.png)