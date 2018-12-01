import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class VenueListItem extends Component {
state = {
      query: ''
    }


//trims off any extra white space from user input

updateQuery = (query) =>{
  this.setState({query: query.trim()})
  // this.updateMarkers(query);
}


render() {

  const {venueItem, stateChange, markers, map, zoom} = this.props;

//adds filter functionality to search bar

//   let showingVenues
//   if(this.state.query) {
//     const match = new RegExp(escapeRegExp(this.state.query), 'i')
//     showingVenues = venueItem.filter((place) => match.test(place.venue.name))
//   } else {
//     showingVenues = venueItem
//   }
//
//   let displayedMarkers
//
//   if (this.state.query) {
//       const match = new RegExp(escapeRegExp(this.state.query.toLowerCase(), 'i'))
//       displayedMarkers = markers.filter((myMarker) => {
//       return match.test(
//               myMarker.getElement().data.toLowerCase()
//           )
//         }
//       )
//       markers.map(marker => marker.remove());
//       displayedMarkers.map(marker => {
//             marker.addTo(map)
//         })
//       console.log("filtering")
//   } else {
// displayedMarkers = markers
//   }

let showingVenues
let displayedMarkers

if(this.state.query) {
  const match = new RegExp(escapeRegExp(this.state.query.toLowerCase(), 'i'))
  showingVenues = venueItem.filter((place) => match.test(place.venue.name))
  displayedMarkers = markers.filter((myMarker) => {
    return match.test(
      myMarker.getElement().data.toLowerCase()
    )
  }
)
markers.map(marker => marker.remove());
displayedMarkers.map(marker => {
  marker.addTo(map)
})
console.log("filtering")
} else {
  showingVenues = venueItem
  displayedMarkers = markers
}



//returns a search bar and a list of venues from foursquare api

  return (
    <div className = "listing-box">
    <div className = "search-places">
    <input className = "search"
    type = "text"
    placeholder = "Search places"
    value = {this.state.query}
    onChange = {(event) => {this.updateQuery(event.target.value)}}/>
    </div>
    <ol className = "list-places">
    {showingVenues.map((place) => (
      <li key = {place.venue.id}
      onClick = {(event) => {stateChange(event, [place.venue.location.lng, place.venue.location.lat]), zoom(place)}}
      > {place.venue.name} </li>
    ))}
    </ol>
    </div>
  )
}


}

export default VenueListItem
