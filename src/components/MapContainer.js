import React, { Component } from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import escregexp from 'escape-regexp'

//Source of code: https://github.com/fullstackreact/google-maps-react

class MapContainer extends Component {

	state = {
	  activeMarker: {},
	  selectedPlace: {},
	  showingInfoWindow: false
	}

	//Google Maps API error handler
  componentDidUpdate(prevProps, prevState) {
  	if (prevProps.google !== this.props.google) {
      this.loadMap();
    } else {
      console.log('Google Maps API error');
      alert('The map could not be fetched from Google.');
    }
  }

	onMarkerClick = (props, marker, e) => {
	  this.setState({
	    activeMarker: marker,
	    selectedPlace: props,
	    showingInfoWindow: true
	  })
	}

	render() {

		const bounds = new this.props.google.maps.LatLngBounds()
		const match = new RegExp(escregexp(this.props.query), 'i')

	    for (let i = 0; i < this.props.locations.length; i++) {
      		bounds.extend(this.props.locations[i].position)
    	}

		return (
			<Map
				google={this.props.google}
				initialCenter={{lat:46.769994, lng:23.589588}}
				bounds={bounds}
        zoom={14}
			>
				{
					this.props.locations.filter(location => {
						return match.test(location.title)
					})
					.map(location => {
						return (
							<Marker
								className="marker"
								key={location.id}
								position={{ lat: location.position.lat, lng: location.position.lng}}
								title={location.title}
								animation={this.props.google.maps.Animation.DROP}
  				        category={location.category}
  				        address={location.address}
                    onClick={this.onMarkerClick}
              />
						)
					})
				}

				<InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
					<div className="infowindow">
					    <h5>{this.state.selectedPlace.title}</h5>
					    <h6>{this.state.selectedPlace.category}</h6>
					    <p>Address: {this.state.selectedPlace.address}</p>
              <p><em>Source: <a rel="noopener noreferrer" href="https://foursquare.com" target="_blank">Foursquare</a></em></p>
				  </div>
				</InfoWindow>
			</Map>
		)
	}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVPcPwaU6dPLEy0zbj7vuxU6iplDDEhWY'
})(MapContainer)
