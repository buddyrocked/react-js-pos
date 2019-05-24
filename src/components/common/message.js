import React, { Component } from 'react';

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            display : this.props.display
        }
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div className="alert alert-dismissible alert-success" style={{ display : this.props.display }}>
                <button type="button" className="close" onClick={ () => this.setState({ display : false }) }>&times;</button>
                { this.props.text }
            </div>
        );
    };
}

export default Message;