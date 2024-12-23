# Project
This is a fullstack website for tracking drivers and packages delivery. This website uses Angular as the frontend, Socket.io for Real-Time Communication between client and server. Node.js and Express.js as the backend, and MongoDB as the database. The website also has a built-in features to send requests to Google gemini and translate to get AI generated result on the ETA.

# Installation
```
npm install --force
ng build
```
Notice that the Google AI feature would requires API key. Simply get the API key and create an .env file inside ass3Ang folder. The format should be like this.
```
GEMINI_API_KEY=your_api_key
TRANSLATE_API_KEY=your_api_key
```

# Documentation
For detail documentation, click the 3 pdf files in the root folder.
