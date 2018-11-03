import React, { Component } from 'react';

class VenueListItem extends Component {

    constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
  }

updateQuery = (query) =>{
  this.setState({query: query.trim()})
}

render() {

  const {venueItem, stateChange} = this.props;


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
    {venueItem.map((place) => (
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
