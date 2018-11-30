import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'

class VenueListItem extends Component {

    constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

//trims off any extra white space from user input

updateQuery = (query) =>{
  this.setState({query: query.trim()})
}






render() {


  const {venueItem, stateChange} = this.props
  const {query} = this.state

//adds filter functionality to search bar

  let showingVenues
  if(query) {
    const match = new RegExp(escapeRegExp(query), 'i')
    showingVenues = venueItem.filter((place) => match.test(place.venue.name))
  } else {
    showingVenues = venueItem
  }


//returns a search bar and a list of venues from foursquare api

  return (
    <div className = "listing-box">
    <div className = "search-places">
    <input className = "search"
    type = "text"
    placeholder = "Search places"
    aria-label = "Search places"
    value = {query}
    onChange = {(event) => this.updateQuery(event.target.value)}/>
    </div>
    <ol className = "list-places">
    {showingVenues.map((place, index) => (
      <li key = {place.venue.id}
      onClick = {() => {stateChange(place)}}
      > {place.venue.name} </li>
    ))}
    </ol>
    </div>
  )
}


}

export default VenueListItem
