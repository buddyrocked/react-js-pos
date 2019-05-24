import React, { Component } from 'react';


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
				Profile Page
				{ this.props.token }
			</div>
		);
	}
}

export default Index;
