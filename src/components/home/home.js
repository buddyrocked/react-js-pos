import React, { Component } from 'react';
import { connect } from 'react-redux';


class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cart_count : 0
		}
	}

	render() {
		return (
			<div className="test">
				Home Page
			</div>
		);
	}
}

export default Home;
