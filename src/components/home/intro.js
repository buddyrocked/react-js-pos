import React, { Component } from 'react';


class Intro extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cart_count : 0,
			message : '',
		}
	}

	componentDidMount(){
		const welcomeMessage = 'Hai, Welcome To My App';
		this.setState({
			message : welcomeMessage,
		});
	}

	render() {
		return (
			<div className="intro">
				{ this.state.message }
			</div>
		);
	}
}

export default Intro;
