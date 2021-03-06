import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class LoaderComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading : this.props.loading
        }
    }

    render() {
        if(this.state.loading){
            return (
                    <div id="loader-container">
                        <Loader 
                            type="Watch"
                            color="#ff5c63"
                            height="100"    
                            width="100"
                        />
                    </div>
            );
        } 

        return (
            ''
        );
    };
}

export default LoaderComponent;