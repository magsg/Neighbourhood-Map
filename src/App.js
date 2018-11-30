import React, { Component } from 'react';
import MapGL, {Marker, NavigationControl, Popup} from 'react-map-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import './App.css';
import Pin from './Pin';
import VenueInfo from './Venue-info';
import VenueListItem from './Venue-list';
import escapeRegExp from 'escape-string-regexp'



class App extends Component {

constructor(props) {
super(props);
this.state = {
  container: {
    latitude: 50.0,
       longitude: 19.9,
       zoom: 12,
       bearing: 0,
       pitch: 0,
       width: 500,
       height: 500,

  },
  places: [],
  markers: [],
  filteredMarkers: [],
  placeInfo: null,
  color: "green"
  // query:''
};
// this.openPopup = this.openPopup.bind(this);


}

componentDidMount() {
        this.getPlaces();


        window.addEventListener('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  //resize map depending on viewport

  resize = () => {
  this.setState({
    container: {
      ...this.state.container,
      width: this.props.width || window.innerWidth,
      height: this.props.height || window.innerHeight
    }
  });
};

updateViewport = (container) => {
   this.setState({container});
 }

//fetch venues using foursquare api

getPlaces = () => {
     let url = 'https://api.foursquare.com/v2/venues/explore?'
     let parameters = {
         client_id: 'VSHIOMXPUT1YOHRSEI2I5FJ1FWHT2JNFAY3ZOGV5MZJ10WGJ',
         client_secret: 'R43ANCXPWOWCTOH0FKIAJZS45BLEZ2ANU1XH1PY5DRVWJO4X',
         v: "20180323",
         section: 'food',
         near: 'Krakow',
         limit: '2'
     }

     fetch(url + new URLSearchParams(parameters))
     .then(response => response.json())
     .then(parsedJson => {
         this.setState({
             places: parsedJson.response.groups[0].items
         });

         console.log(this.state.places); //it's fetching!
     })
     .catch(error => alert('error!' + error))

  }

  //create markers for each venue

  createMarkers = () => {
    const pins = this.state.places;

pins.map(place => {
  this.setState({markers: pins});
})
}
  // let marker = new mapboxgl.Marker({
  //   color: this.state.color,
  // })
  // .setLngLat([place.venue.location.lng, place.venue.location.lat])
  // .addTo(this)
  // marker.getElement().data = place.venue.name;
  // marker.getElement().classList.add("pin")
  //
  // return marker;



renderMarkers = (place) => {


  return  (
     <Marker key = {place.venue.id}
      longitude = {place.venue.location.lng}
      latitude = {place.venue.location.lat}
      style = {{backgroundColor:this.state.color}}
      onClick={() => this.setState({placeInfo: place})}>

      </Marker>
    )

console.log("marker")
}


  //create popups draft

  renderPopup = (place) => {

    const {placeInfo} = this.state;

    return placeInfo && (
      <Popup
      anchor = 'top'
      longitude = {placeInfo.venue.location.lng}
      latitude = {placeInfo.venue.location.lat}
      onClose = {() => this.setState({placeInfo: null})}>
      <VenueInfo info={placeInfo}/>
      </Popup>
)



  }




//laczymy marker z lista
//
/*handleMarkerClickEvent = (event, place, index) => {
  this.setState ({
     selectedMarkerIndex = index,
     placeInfo = place//selected marker latlng
   })
 }*/

//we want both comp to refer to the same function

// <ListPlaces
// onClickMarker = this.handleMarkerClickEvent
// locationsArray = {places}/>

openPopup = (place) => {
  return(
 this.state.places.filter((location) => location.id === place.id).map(location => {this.setState({placeInfo: place})}
))}

// openPopup = (e, index, place) => {
// e.preventDefault();
// let markerPopup;
//
// // for (let i = 0; i < this.state.markers.length; i++) {
// //
// //          if (i === index) {
// //
// //            // console.log(i, index, activeMarker);
// //
// // }
// // }
// this.state.markers.filter((location) => location.id === place.id).map(location => {this.setState({placeInfo: place}, )})
//
// }
// updateQuery = (query) =>{
//   this.setState({query: query})
//   // this.filterMarkers(query);
// }

// filterMarkers = (query) => {
//
//   let filteredMarkers=this.state.places;
//   if(query) {
//     const match = new RegExp(escapeRegExp(query, 'i'))
//     filteredMarkers = this.state.places.filter((place) => match.test(place.venue.name))
//     this.setState({filteredMarkers: filteredMarkers})
//   } else {
//   this.setState({filteredMarkers: this.state.places})
//   }
//
// }

/*onLoad = {() => {this.createMarkers()}, console.log("markers")}*/


  render() {

    return (
      <main>

      <MapGL
      {...this.state.container}
      mapStyle = 'mapbox://styles/mapbox/streets-v10'
      mapboxApiAccessToken = 'pk.eyJ1Ijoia290ZWs2IiwiYSI6ImNqam42MmFnejF0aXYza20wdXh4dGFwcXcifQ.e-GDBXL7FGLyrbtdyy-gkw'
      onViewportChange = {(container) => this.setState({container})}
      >
      <div className = "nav">
        <NavigationControl  onViewportChange={this.updateViewport}/>
      </div>

        <VenueListItem
        stateChange = {this.openPopup}
        venueItem = {this.state.places}
        updateQuery = {this.updateQuery}
        />


      {this.state.places.map(this.renderMarkers)}


      {this.renderPopup()}

    </MapGL>
      </main>

    );
  }
}


export default App;
