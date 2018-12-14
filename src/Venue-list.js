import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class VenueListItem extends Component {
state = {
  query: ''
}


updateQuery = (query) => {
  this.setState({
    query: query
  })
}


render() {

    const {
      venueItem,
      stateChange,
      markers,
      map,
      zoom
    } = this.props;

    //add filter functionality to search bar

    let showingVenues
    let displayedMarkers

    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query.toLowerCase(), 'i'))
      showingVenues = venueItem.filter((place) => match.test(place.venue.name.toLowerCase()))
      displayedMarkers = markers.filter((myMarker) => {
        return match.test(
          myMarker.getElement().data.toLowerCase()
        )
      })
      markers.map(marker => marker.remove());
      displayedMarkers.map(marker => {
        marker.addTo(map)
      })
    } else {
      showingVenues = venueItem
      displayedMarkers = markers
    }

//return a search bar and a list of venues

  return (
    <aside className = "listing-box">
      <div className = "search-places">
        <input className = "search"
          type = "text"
          placeholder = "Search"
          aria-label="Search for places"
          value = {this.state.query}
          onChange = {(event) => {this.updateQuery(event.target.value)}}/>
      </div>
      <ol className = "list-places">
        {showingVenues.map((place, index) => (
          <li key = {place.venue.id}
            role="link"
            tabIndex="0"
            onClick = {(event) => {stateChange(event, [place.venue.location.lng, place.venue.location.lat]), zoom(place)}}
            onKeyPress = {(event) => {stateChange(event, [place.venue.location.lng, place.venue.location.lat]), zoom(place)}}
          > {place.venue.name} </li>
        ))}
      </ol>
      <span tabIndex="0" className = "attr" role="img" aria-label="powered by foursquare"></span>
    </aside>
  )
}
}

export default VenueListItem
