# Project
This is a full-stack website for tracking drivers and package deliveries. The website leverages Angular for the frontend, Socket.io for real-time communication between the client and server, Node.js and Express.js for the backend, and MongoDB as the database. Additionally, it integrates Google Gemini AI and Google Translate API for generating AI-driven results on estimated time of arrival (ETA) and translation.

This repo is copied from gitlab: https://git.infotech.monash.edu/fit2095/fit2095-s2-2024/projects/alee0152/Assignment-3. Thus having no commits.

# Installation
To set up the project locally:
Install dependencies:
```
npm install --force
```
Build the Angular frontend:
```
ng build
```
Set up Google API keys: Create an .env file in the ass3Ang folder with the following format:
```
GEMINI_API_KEY=your_api_key
TRANSLATE_API_KEY=your_api_key
```
# Features
The project provides driver management, including adding, updating, deleting, listing, and filtering drivers by department. It also supports package management, such as adding, updating, deleting, listing packages, and associating them with drivers. Google Gemini integration enables AI-driven ETA predictions, and a complete API supports all these features.
# Navigation Bar
The navigation bar provides quick access to key functionalities of the website. Here's what each link does:  
Home: Redirects to the home page of the website.  
Add Driver: Opens a form to add a new driver to the database.  
Delete Driver: Allows deletion of a driver by ID.  
List Driver: Displays a list of all drivers currently in the database.  
Update Driver: Opens a form to update driver details.  
Add Package: Opens a form to add a new package and associate it with a driver.  
Delete Package: Allows deletion of a package by ID.  
List Package: Displays a list of all packages currently in the database.  
Update Package: Opens a form to update the destination or details of a package.  
Statistics: Displays number of drivers and packages in the database.  
Gemini-ai: Accesses the AI-powered feature for estimating delivery times using Google Gemini.  
Translate: Provides translation functionalities using Google Translate API.  
# API Endpoints
Provided in Routing_Table_API.pdf in the root folder. 
# Documentation
For detailed documentation, refer to the PDF files in the root folder
