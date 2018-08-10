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
								tabIndex="0"
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
					<div className="infowindow" tabIndex="0">
					    <h5 tabIndex="0">{this.state.selectedPlace.title}</h5>
					    <h6 tabIndex="0">{this.state.selectedPlace.category}</h6>
					    <p tabIndex="0">Address: {this.state.selectedPlace.address}</p>
              <p tabIndex="0"><em>Source: <a rel="noopener noreferrer" href="https://foursquare.com" target="_blank">Foursquare</a></em></p>
				  </div>
				</InfoWindow>
			</Map>
		)
	}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCVPcPwaU6dPLEy0zbj7vuxU6iplDDEhWY'
})(MapContainer)
