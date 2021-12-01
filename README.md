# heartBeat-synergy

## Project Description

heartBeat is a web-based online dating/social application centered around connecting people with similar music interests together. heartBeat can be linked to a user’s audio streaming service to connect their musical interests with their heartBeat account. Users can update their profiles with information about their music and view matches for other users with similar tastes.

## Technologies Used

* Java
* Angular 10
* Spring Data
* Spring Boot
* Spring Framework
* Git
* PostgreSQL
* AWS EC2
* AWS RDS
* Jenkins
* JUnit
* EclEmma
* OAuth 2.0

## Features

* Register and create profile page
  *  User can register using username, password, email, first name, last name and age
  *  User can add favorite song, favorite artists and favorite genres to profile during registration
  *  Songs and artists are passed through Spotify API search algorithm to generate specific details about song and artist such as album art, composer etc.
* Login and view home page  
  *  User can login using username and password 
  *  All passwords are encrypted in database
  *  OAuth token is generated to allow user to access information from spotify API
  *  User can view home page which displays personal infomration and profile picture as well as information about their selected favorite songs, artists, genres using information from spotify API
* Edit profile information
  *  User can edit profile information including personal information as well as song, genre and artist choices 
  *  User can add personal profile picture to profile to be displayed on profile page
* View other users with similar music tastes
  *  User can select the "discover profiles" page to view other users with similar choices for genre, top artists and favorite songs 
  *  User can select match or unmatch with each profile page displayed under discover profiles
* View profiles with mutual matches
  *  User can view other users who they chose to match with that also chose to match with the user 
  *  Users will recieve a popup notification for mutual matches
  


To-do list:
* Utilize OAuth 2.0 to link account playlists
* Decrease loading time for pages within application

## Getting Started
   
Frontend:
 * Use git clone to clone https://github.com/tubigervie/heartBeat-frontend-synergy.git onto local machine
 * Open project repository in IDE (VsCode etc.)
 * Run npm install to install required dependencies from package.json
 * Navigate to app/services/account-service, change the serverUrl variable to match your machine's localhost
 * In account-service

Backend:
 * Use git clone to clone https://github.com/tubigervie/heartBeat-synergy.git   
 * Open project repository in IDE (Eclipse etc.)
 * Navigate to src/main/resources and open the application.properties file
 * Change the categories under #Database Credentials to match the endpoint of your AWS RDS


## Usage
* After backend and front end are running, navigate to localhost:4200
* Register account and login to view profile
* Edit profile to add profile picture and update information
* Navigate to discover profiles to view and match with other similar users
* Navigate to view matches to view your matches


## Contributors
* bucknermi (Michael Buckner)
* tubigervie (Ervie Tubig)
* Build-coder Phil Wood (Phil Wood)
* AAcosta9600 (Alejandro Acosta)
* FeltonMac (Felton McCarty)


