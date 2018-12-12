# Neighbourhood Map Project

## What is Neighbourhood Map Project?

Neighbourhood Map project is one of the assessment projects for Udacity's Front End Nanodegree course.
The goal was to build an interactive map using third party API.
The map displays a number of restaurants in Krakow and uses map markers to indicate their position on the map.
The user is provided with a text input field which allows them to filter through the list of venues and their associated map markers.

## How to install and run the project

* in a terminal, type `npm install` to install necessary project dependencies then `npm start` to launch the application,
* a list-view of location names is provided and, by default, will display all locations along with their associated markers,
* use the search field to look for a particular venue; the list will display a filtered subset of locations that match your input,
* clicking a location on the list or a map marker will display more detailed information about the venue
* to enable `service worker` for offline use, build the application using `npm run build`, please note this functionality is only available for browsers which support `service worker`,

## How the project was built

* The project was built with React and the [Mapbox Maps API](https://www.mapbox.com/api-documentation/#introduction) along with [Mapbox GL JS library](https://www.mapbox.com/mapbox-gl-js/api/).
* The application uses asynchronous requests to obtain location data from [Foursquare API](https://developer.foursquare.com/).
* The application uses `map()` and `filter()` for the filter functionality,
* It implements `service worker` to support offline use.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
