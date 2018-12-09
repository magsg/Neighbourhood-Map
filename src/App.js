import React, { Component } from 'react';
import MapGL, {Marker, NavigationControl, Popup} from 'react-map-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import './App.css';
// import Pin from './Pin';
import VenueInfo from './Venue-info';
import VenueListItem from './Venue-list';



class App extends Component {

state = {
  // container: {
  //   latitude: 50.0,
  //      longitude: 19.9,
  //      zoom: 12,
  //      bearing: 0,
  //      pitch: 0,
  //      width: 500,
  //      height: 500,
  //
  // },
  markerProperties: {
    color: "green"
  },
  places: [],
  markers: [],
  filteredMarkers: [],
  placeInfo: null,
  activeMarker: null,
  color: "green"
  // query:''
};


componentDidMount() {
        this.initMap();
        // this.getPlaces();
        // window.addEventListener('resize', this.resize);
        // this.resize();
    }

  //   componentWillUnmount() {
  //   window.removeEventListener('resize', this.resize);
  // }


//init map

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



  //resize map depending on viewport

//   resize = () => {
//   this.setState({
//     container: {
//       ...this.state.container,
//       width: this.props.width || window.innerWidth,
//       height: this.props.height || window.innerHeight
//     }
//   });
// };
//
// updateViewport = (container) => {
//    this.setState({container});
//  }

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

  //create markers and popups for each venue

  createMarkers = () => {
    const initialMarkers = this.state.places

      .map(place => {
        const popup = new mapboxgl.Popup({
          closeOnClick: true,
          offset: 25,
          className: `${[place.venue.location.lng, place.venue.location.lat]}`
        })
          .setLngLat([place.venue.location.lng, place.venue.location.lat])
          .setHTML(
            `<h3>${place.venue.name}</h3>
            <p>${place.venue.categories[0].name}</p>
            <p>${place.venue.location.formattedAddress[0]}</p>`
          )

        let marker = new mapboxgl.Marker({
          color: "green",
          className: place.venue.name
        })
        .setLngLat([place.venue.location.lng, place.venue.location.lat])
        .setPopup(popup)
        .addTo(this.map)
        marker.getElement().data = place.venue.name;
        // marker.getElement().firstChild.classList.add("pin")
        // marker.getElement().addEventListener('click', this.animateMarker)
        marker.getElement().addEventListener('click', (event) => {this.zoomOnLocation(place), event.target.classList.toggle("flash-pin"); })
        // console.log("fly")
        return marker;
    })
   this.setState({ markers: initialMarkers, filteredMarkers: initialMarkers });
  }

  zoomOnLocation = (place) => {
    // event.preventDefault();
    this.map.flyTo({
      center: [place.venue.location.lng, place.venue.location.lat],
      zoom: 15
    });
    console.log("fly")
  }

  changeColor = (color) => {
    this.setState({color:color})
    console.log("coloring")
  }


  // animateMarker = (event) => {
  //   event.preventDefault();
  //   event.target.classList.toggle("flash-pin");
  //   console.log("animate")
  // }


   openPopup = (event, place) => {
    event.preventDefault();
      const markersArray = this.state.filteredMarkers;
      const location = place.join(",");
      let markerPopup;
/* loops through all markers checking if the clicked button matches
any of them; if it does, then highlight the marker, otherwise close it */
        for (let i = 0; i < markersArray.length; i++) {
          markerPopup = markersArray[i].getPopup();
          if (markerPopup.options.className === location) {
            let activeMarker = markersArray[i];
            // activeMarker.getElement().firstChild.classList.toggle("flash-pin")
activeMarker._color="red";

// let markerContainer = activeMarker.getElement();
// let child = markerContainer.firstChild;
// child.classList.toggle("flash-pin")
            activeMarker.togglePopup();

            console.log(activeMarker)
            // console.log(child)
          } else {
            markerPopup._onClickClose();
          }
        }
      };

      /*
       * Open the drawer when the menu icon is clicked.
       */

       toggleSidebar = () =>{

         const menu = document.querySelector('#menu');
         const main = document.querySelector('#map');
         const drawer = document.querySelector('.listing-box');

         menu.addEventListener('click', (event) => {
           drawer.classList.add('open');
           event.stopPropagation();
         });
         console.log("toggle1")
         main.addEventListener('click', (event) => {
           drawer.classList.remove('open');
         });
console.log("toggle")
       }


    //   updateMarkers = (query) => {
    //     let displayedMarkers = this.state.markers;
    //
    //     if (query) {
    //         const match = new RegExp(escapeRegExp(query.toLowerCase(), 'i'))
    //         displayedMarkers = this.state.markers.filter((myMarker) => {
    //             return match.test(
    //                 myMarker.getElement().data.toLowerCase()
    //             )
    //           }
    //         )
    //         this.setState({
    //             filteredMarkers: displayedMarkers
    //         })
    //     } else {
    //         this.setState({ fileteredMarkers: this.state.markers })
    //     }
    // }


//     displayMarkers = () => {
//     this.state.markers.forEach(marker => marker.remove());
//     this.state.filteredMarkers.forEach(marker => {
//         marker.addTo(this.map)
//     })
// }

  // createMarkers = (place) => {
  //   return (
  //     <Marker key = {place.venue.id}
  //     longitude = {place.venue.location.lng}
  //     latitude = {place.venue.location.lat}>
  //     <Pin size = {20} fill={this.state.color} onClick={() => this.setState({placeInfo: place} && {color:"red"})}/>
  //     </Marker>
  //
  //
  //
  //   );
  // }

  //create popups draft

  // renderPopup = (place) => {
  //
  //   const {placeInfo} = this.state;
  //
  //   return placeInfo && (
  //     <Popup
  //     anchor = 'top'
  //     longitude = {placeInfo.venue.location.lng}
  //     latitude = {placeInfo.venue.location.lat}
  //     onClose = {() => this.setState({placeInfo: null})}>
  //     <VenueInfo info={placeInfo}/>
  //     </Popup>
  //   )
  //
  // }

//   createPopUp = (place) => {
//     let popUps = document.getElementsByClassName('mapboxgl-popup');
//     const {placeInfo} = this.state;
//     // Check if there is already a popup on the map and if so, remove it
//     if (popUps[0]) popUps[0].remove();
//
//    this.state.places.filter((location) => location.id === place.id).map(location => {this.setState({placeInfo: place})
// return placeInfo && (
//   let popup = new mapboxgl.Popup({ closeOnClick: false })
//   .setLngLat([placeInfo.venue.location.lng, placeInfo.venue.location.lat])
//   .setHTML(<VenueInfo info={placeInfo}/>)
//   .addTo(this.map);
//
// )
//  }
//   )
//   }



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

// openPopup = (place) => {
//   return(
//  this.state.places.filter((location) => location.id === place.id).map(location => {this.setState({placeInfo: place})}
// ))}

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
      <section className="nav">
      <a id="menu" onClick={(()=>{this.toggleSidebar()})}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
        </svg>
      </a>
</section>
      <VenueListItem
      stateChange = {this.openPopup}
      venueItem = {this.state.places}
      markers = {this.state.markers}
      map = {this.map}
      zoom= {this.zoomOnLocation}
      color={this.changeColor}/>

        <section>
        <div
          id="map"
          role = "application"
          tabIndex = "0">


      {/*}<div className = "nav">
        <NavigationControl  onViewportChange={this.updateViewport}/>
      </div>*/}




</div>
    </section>
      </main>

    );
  }
}


export default App;
