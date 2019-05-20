import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../common/navbar';


class Index extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cart_count : 0
		}
	}

	render() {
		return (
			<div>
				<Navbar />
					Profile Page
					{ this.props.token }
			</div>
		);
	}
}

export default Index;
