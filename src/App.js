import React, { Component } from 'react'
import './App.css'
import MapContainer from './components/MapContainer'
import Places from './components/Places'

class App extends Component {

  state = {
  	locations: [],
  	locationDetails: {},
  	query: '',
  }

  // Fetch locations from Forsquare
  componentDidMount() {
    fetch('https://api.foursquare.com/v2/venues/explore?ll=44.3301785,23.7948807&client_id=K5LTU5KVALWJJWS3OMU20Y2NU2TNFGF4WPKMKFQYM1C30TIB&client_secret=PSYKMZU3OAA2O4PLFLXBG5ILHSQ52JH4BTBRZTQJORA25KAA&v=20180731')
    .then(response => response.json())
    .then(data => {
      const locations = data.response.groups[0].items.map(item => {
        return {
          position: {
            lat: item.venue.location.lat,
            lng: item.venue.location.lng },
          title: item.venue.name,
          id: item.venue.id,
          category: item.venue.categories[0].name,
          address: item.venue.location.address,
        }
      })
      this.setState({ locations });
      console.log('Fetched locations: ', this.state.locations);
    })
    .catch(err => {
      console.log('Foursquare error:', err);
      alert('Locations could not be fetched from Forsquare.');
    })
  }

  onMarkerClick = event => {
  	 this.setState({
  		query: event.target.textContent
  	})
  	for (const location of this.state.locations) {
  		if (location.title === event.target.textContent) {
  			this.setState({
  				locationDetails: location
  			})
  		}
  	}
  }

  onMarkerClick = event => {
  	 this.setState({
  		query: event.target.textContent
  	})
  }

  onInputClick = event => {
  	this.setState({
  		query: ''
  	})
  }

  searchHandler = event => {
  	this.setState({
  		query: event.target.value
  	})
  }

  handleClick() {
	   this.setState({
	      open: !this.state.open
	   });
	}

  render() {
    return (
    	<div role="main">
  	   <Places
  	      locations={this.state.locations}
  	      query={this.state.query}
  	      onInputClick={this.onInputClick}
          onMarkerClick={this.onMarkerClick}
  	      onQueryChange={this.searchHandler}
          onHandleClick={this.handleClick}
  	    />
	      <MapContainer
	      	locations={this.state.locations}
	      	query={this.state.query}
	      />
    	</div>
    );
  }
}

export default App
