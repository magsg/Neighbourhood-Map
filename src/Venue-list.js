import React, { Component } from 'react';


class VenueListItem extends Component {


render() {

  const {venueItem, stateChange,} = this.props;


  return (
    <ul>
    {venueItem.map((place) => (
      <li key = {place.venue.id}
      onClick = {() => {stateChange(place)}}
      > {place.venue.name} </li>
    ))}
    </ul>
  )
}


}

export default VenueListItem
