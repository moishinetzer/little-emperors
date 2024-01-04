# Little Emperors Test

This test consists on a backend and a frontend part.
The backend should be done in a framework of your choice and committed to the _backend_ folder on this repository. We use Laravel in the company but you can use any other that you're familiar with.

The frontend should be done with ReactJS and committed to the _frontend_ folder.

On both parts, feel free to install any libraries or plugins you want to facilitate the tasks. Take as much time as you need and commit the code to the repository when you're done. 

## BACKEND
Implement a Restful API to return the list of hotels in the hotels.csv file.
You're free to import the list to any database engine of your choice or just fetch the hotels directly from the file.
Note the file columns are separated by semicolon ';' as some of the content might have commas in it, like the Hotel Name or the Description.

The API should have an endpoint for each of the following actions:
- Return the list of all hotels. It should display only the id, name, stars and city fields of each hotel.
- Return all the details of a single hotel given its ID.

## FRONTEND
Using the backend API created in the backend test, build a ReactJS web app to display the list of hotels.
The app should consist of an initial listing page displaying the name, image, city and stars for each hotel.
When clicking on a hotel it should go to a hotel detail page and show the hotel name, image, city, stars, address and description.
The design is completely up to you but don't worry too much about it, something very simple is fine. Feel free to use for example Material UI or any design template.
