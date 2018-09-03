import React, { Component } from 'react';
import MapGL, {Marker, NavigationControl} from 'react-map-gl';
import './App.css';
import Pin from './pin';


class App extends Component {

constructor(props) {
super(props);
this.state = {
  container: {
    latitude: 50.0,
       longitude: 19.9,
       zoom: 10,
       bearing: 0,
       pitch: 0,
       width: 500,
       height: 500,

  },
  places: [],
  markers: []
};
}

componentDidMount() {
        this.getPlaces();
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

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


getPlaces = () => {
     let url = 'https://api.foursquare.com/v2/venues/explore?'
     let parameters = {
         client_id: 'VSHIOMXPUT1YOHRSEI2I5FJ1FWHT2JNFAY3ZOGV5MZJ10WGJ',
         client_secret: 'R43ANCXPWOWCTOH0FKIAJZS45BLEZ2ANU1XH1PY5DRVWJO4X',
         v: "20180323",
         section: 'food',
         ll: '50.0, 19.9',
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

  marker = (place) => {
    return (
      <Marker key = {place.venue.id}
      longitude = {place.venue.location.lat}
      latitude = {place.venue.location.lng}>
      <Pin size = {40}/>
      </Marker>
    );
  }

  render() {

    return (
      <main>
      <MapGL
      {...this.state.container}
      mapStyle= 'mapbox://styles/mapbox/streets-v10'
      mapboxApiAccessToken='pk.eyJ1Ijoia290ZWs2IiwiYSI6ImNqam42MmFnejF0aXYza20wdXh4dGFwcXcifQ.e-GDBXL7FGLyrbtdyy-gkw'
      onViewportChange={(container) => this.setState({container})}>
      <div className="nav">
        <NavigationControl/>
      </div>
      {this.state.places.map(this.marker)}
    </MapGL>
      </main>

    );
  }
}


export default App;
