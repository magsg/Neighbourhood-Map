import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import './App.css';
import VenueListItem from './Venue-list';



class App extends Component {
state = {
  places: [],
  markers: [],
  // filteredMarkers: []
};


componentDidMount() {
  this.initMap();
  this.getPlaces();
}


//initialise map

initMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1Ijoia290ZWs2IiwiYSI6ImNqam42MmFnejF0aXYza20wdXh4dGFwcXcifQ.e-GDBXL7FGLyrbtdyy-gkw'
  this.map = new mapboxgl.Map({
    container: "map",
    center: [19.93658, 50.06143],
    zoom: 10,
    style: 'mapbox://styles/mapbox/streets-v10',
  });
  window.map = this.map;

  /* loads navigation and all markers upon init map */

  this.map.on('load', () => {
    this.createMarkers();
    this.map.addControl(new mapboxgl.NavigationControl());
  })

}


//fetch restaurants using Foursquare API

getPlaces = () => {
  let url = 'https://api.foursquare.com/v2/venues/explore?'
  let parameters = {
    client_id: 'VSHIOMXPUT1YOHRSEI2I5FJ1FWHT2JNFAY3ZOGV5MZJ10WGJ',
    client_secret: 'R43ANCXPWOWCTOH0FKIAJZS45BLEZ2ANU1XH1PY5DRVWJO4X',
    v: "20180323",
    section: 'food',
    near: 'Krakow',
    limit: '5'
  }

  fetch(url + new URLSearchParams(parameters))
    .then(response => response.json())
    .then(parsedJson => {
      this.setState({
        places: parsedJson.response.groups[0].items
      });
      // console.log(this.state.places);
    })
    .catch(error => alert('There was a problem loading the data from Foursquare API' + error))
}

//create markers and popups for each venue

createMarkers = () => {
  const initialMarkers = this.state.places

    .map(place => {
      const popup = new mapboxgl.Popup({
          closeOnClick: true,
          offset: 25,
          className: `${[place.venue.location.lng, place.venue.location.lat]}`,
        })
        .setLngLat([place.venue.location.lng, place.venue.location.lat])
        .setHTML(
          `<h3>${place.venue.name}</h3>
            <span>${place.venue.categories[0].name}</span>
            <span> Address: ${place.venue.location.formattedAddress[0]}</span>`
        )

      let marker = new mapboxgl.Marker({
          color: "green",
        })
        .setLngLat([place.venue.location.lng, place.venue.location.lat])
        .setPopup(popup)
        .addTo(this.map)
      marker.getElement().data = place.venue.name;
      marker.getElement().addEventListener('click', (event) => {
        this.zoomOnLocation(place)
      })
      return marker;
    })
  this.setState({
    markers: initialMarkers
    // filteredMarkers: initialMarkers
  });
}

//zoom in on a chosen location

zoomOnLocation = (place) => {
  this.map.flyTo({
    center: [place.venue.location.lng, place.venue.location.lat],
    zoom: 15
  });
}


//open a popup and highlight the respective marker when a list item is clicked

openPopup = (event, place) => {
  event.preventDefault();
  const markersArray = this.state.markers;
  const location = place.join(",");
  let markerPopup;

  for (let i = 0; i < markersArray.length; i++) {
    markerPopup = markersArray[i].getPopup();
    if (markerPopup.options.className === location) {
      let clickedMarker = markersArray[i];
      clickedMarker.getElement().firstChild.classList.toggle("flash-pin")
      clickedMarker.togglePopup();
    } else {
      markerPopup._onClickClose();
    }
  }
};

// open the drawer when the search icon is clicked (for screens <550px)


toggleSidebar = () => {

  const menu = document.querySelector('#menu');
  const main = document.querySelector('#map');
  const drawer = document.querySelector('.listing-box');

  menu.addEventListener('click', (event) => {
    drawer.classList.add('open');
    event.stopPropagation();
  });
  main.addEventListener('click', (event) => {
    drawer.classList.remove('open');
  });
}


render() {

  return (

    <main>

      <VenueListItem
        stateChange={this.openPopup}
        venueItem={this.state.places}
        markers={this.state.markers}
        map={this.map}
        zoom={this.zoomOnLocation}
        />

        <div
          id="map"
          role="application"
          aria-label="Mapbox map application">
            <button
            id="menu"
            className="nav"
            aria-label= "search"
            onClick={(()=>{this.toggleSidebar()})}>
            </button>
        </div>

    </main>
    );
  }
}

export default App;
