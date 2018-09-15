import React, {Component} from 'react';

 class VenueInfo extends Component {

  render() {
    const {info} = this.props;
    const displayInfo = `${info.venue.name} \n${info.venue.location.address}`;

    return (
      <div>
        <div>
          {displayInfo} | <a target="_new"
          href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayInfo}`}>
            Wikipedia
          </a>
        </div>
        <img width={240} />
      </div>
    );
  }
}

export default VenueInfo
