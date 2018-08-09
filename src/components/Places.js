import React from 'react'
import escregexp from 'escape-regexp'

function Places (props) {

	const match = new RegExp(escregexp(props.query), 'i')

	return (
		<section>
			<nav aria-label="Locations list" className="navbar navbar-dark">
				<h1 className="navbar-brand" tabIndex="1">Craiova City Locations</h1>
				<button className="navbar-toggler" tabIndex="1" type="button" data-toggle="collapse"
				data-target="#places-list" aria-expanded="false" aria-label="search places">
					<span className="navbar-toggler-icon"></span>
				</button>
			</nav>
			<aside className="collapse" id="places-list" aria-expanded="false">
				<ul className='list' tabIndex="-1">
			    <input
						className="form-control"
						id="search-query"
			  		type="text"
			  		placeholder="Filter locations..."
			  		value={props.query}
			  		onClick={props.onInputClick}
			  		onChange={props.onQueryChange}
			  		//autoFocus
			  		tabIndex="1"
			  		aria-label="Type location name to filter locations"
			  	/>
					{props.locations.filter(location => {
						return match.test(location.title)
					})
					.map(location => {
						return (
							<li
								className="list-group-item"
								key={location.title}
								tabIndex="-1"
								//aria-label="Location"
							>
								<button type="button" onClick={props.onMarkerClick} className="btn btn-link" tabIndex="1">{location.title}</button>
							</li>
						)
					})}
				</ul>
			</aside>
		</section>
	)
}

export default Places
