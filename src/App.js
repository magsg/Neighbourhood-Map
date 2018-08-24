import React, { Component } from 'react';
import MapGL, {NavigationControl} from 'react-map-gl';
import './App.css';


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
  }
};
}

  render() {

const {container} = this.state;

    return (
      <main>
      // <div id="map">
      <MapGL
      {...container}
      mapStyle= 'mapbox://styles/mapbox/streets-v10'
      mapboxApiAccessToken=''>
      <div className="nav">
        <NavigationControl/>
      </div>
    </MapGL>
      // </div>
      </main>

    );
  }
}


export default App;
