import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

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

  const {venueItem, stateChange} = this.props;

//adds filter functionality to search bar

  let showingVenues
  if(this.state.query) {
    const match = new RegExp(escapeRegExp(this.state.query), 'i')
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
    value = {this.state.query}
    onChange = {(event) => this.updateQuery(event.target.value)}/>
    </div>
    <ol className = "list-places">
    {showingVenues.map((place) => (
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
