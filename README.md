# Find a Coach

It is a Web Application where you can show all coaches and contact them, also you can register as a coach. And as a Coach, you can review all requests you received.

## Getting Started

These steps will get you a copy of the project up and running for development and testing purposes.

## Installation

1.  Install  **Nodejs** _latest stable version_
2.  Install  **npm** _latest stable version_
3.  Clone the Project
4.  **In Project Directory** 
	Run the following commands:
	```
	npm install
	cp .env.example .env
	```
5.  Use your google acount to login in Firebase service to handle Backend and database.
6.  After login to Firebase add a new project and give it any name of your choice.
7.  Then create a real-time database and make sure you start in test mode. After creating it you will see the `DATABASE_URL` which will be used to send HTTP requests.
8.  Change the Rules in real-time database to be like that
	```
	"rules": {
	    "coaches": {
	      ".read": true,
	      ".write": "auth != null",
	    },
	    "requests": {
	      ".read": "auth != null",
	      ".write": true,
	    },
	}
	```
9.  In Authentication in Firebase, in **Sign-in method**, enable the email/password.
10. From project setting in firebase you can get **Web API Key** and it's unique for each project.
11.  In the **.env** file change the  `VUE_APP_WEB_API_KEY`,  `VUE_APP_FIREBASE_DATABASE_URL`  variables to match the credentials of the database you just created in Firebase.

    And I recommended taking a look at the firebase documentation to fully understand all the steps and all .env variables.
    You Also Can Try the deployed version[Click here](https://vue-http-demo-7dafa.web.app).
    
## Usage

   In the project directory, run the following command to launch the project in development mode:  `npm run serve`.

## Hospital Admin Features

    Review all Requests received.

## User Features

1.  View all Coaches.
2.  Filter Coahes.
3.  View Coach Profile or details.
4.  Contact the Coach.
5.  can register as coach.

## Built With

[Vuejs](https://v3.vuejs.org/) and [Firebase](https://firebase.google.com/)

