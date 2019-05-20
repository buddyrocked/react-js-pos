import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../common/navbar'


class Intro extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cart_count : 0,
			message : '',
		}
	}

	async componentDidMount(){
		const welcomeMessage = 'Hai, Welcome To My App';
		this.setState({
			message : welcomeMessage,
		});
	}

	render() {
		return (
			<div className="intro">
				<Navbar />
				{ this.state.message }
			</div>
		);
	}
}

export default Intro;
