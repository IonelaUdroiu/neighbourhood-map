# neighbourhood-map

#Project Overview
The project offers the possibility to filter a list of locations on Google Maps, from a given area.
The app will load 30 locations from Craiova, Romania. 

The project was bootstrapped with Create React App. 
Google Maps API and Foursquare API are used for fetching map and locations.
This project was part of Udacity FEND Nanodegree.

#How to Install the Project

Download or clone the project on your local computer.
Install all project dependencies with npm install
Start the development server with npm start
With your server running, visit the site: http://localhost:3000.

npm test
Launches the test runner in the interactive watch mode.

npm run build
Builds the app for production to the build folder.
See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can’t go back! This command will remove the single build dependency from your project.

#Making a Progressive Web App
By default, the production build is a fully functional, offline-first Progressive Web App. 

#Service Workers
The service worker only works in production mode. 
If your production web server does not support HTTPS, then the service worker registration will fail, but the rest of your web app will remain functional.
Service workers are not supported in all web browsers. 

#Deployment

`npm run build` creates a `build` directory with a production build.

#Static Server

For environments using Node install serve:
```sh
npm install -g serve
serve -s build
```
The last command shown above will serve the static site on the port **5000**.

#Dependencies
The project uses the following npm packages:

react
google-maps-react
escape-regexp
