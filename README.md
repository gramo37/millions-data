# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What does this project demonstrate?

This prototype demonstrates a stock market trading app where data is fetched via API calls every 2-3 seconds, handling large datasets of 10,000 rows or more. It utilizes web sockets and web workers to manage this process efficiently. A parallel worker script connects to the server through web sockets, retrieves data every 3 seconds, and sends it back to the React frontend. This approach ensures that the frontend remains responsive and avoids lag or blank states in case of errors.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Start the Server

Go to the server folder using cd server

### `npm run dev`

Runs the development Server

### `npm run build && npm start`

Runs the production Server
