import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {term: '' };
    }

    render(){
        return (
        	<div className="input-group input-lg">
                <input 
                    className="form-control input-lg"
                    placeholder='Search Products' 
                    value={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
                <span className="input-group-btn">
                    <button className="btn btn-lg btn-default-o">
                        CARI
                    </button>
                    <button className="btn btn-lg btn-default-o">
                        CLEAR
                    </button>
                </span>
    		</div>
    	);
    } 

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;