import React, { Component } from 'react';
import SweetAlert from 'sweetalert2-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import { fetchProducts, createCart, getCart } from '../../actions';
import LoaderComponent from '../common/loader';
import ItemList from './item_list';

const KEYS_TO_FILTERS = ['sku', 'name'];

class Products extends Component {

    constructor(props){
        super(props);
        this.state = { showAlert: false };
        this.addToCart = this.addToCart.bind(this);
        this.changePage = this.changePage.bind(this);
        this.state = {
            visible : false,
            isReady : false,
            id : 0,
            qty : 1,
            text : '',
            message : '',
            confirmdiv : 'Oke',
            searchTerm : '',
            page : 1,
            nextPage : 1,
            previousPage : 1,
            loading : false,
            isPaneOpen: false,
            isPaneOpenLeft: false,
        }
    }

    static defaultProps = {
        products: []
    }

    searchUpdated(term) {
        this.setState({
            searchTerm: term.target.value,
        });

        this.props.onFetchProducts(1, this.state.searchTerm);
    }

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    openCart(productId){
        alert('hahaha');
        this.setState({
            visible : true,
            id : productId,
            qty : 1,
            isPaneOpen: false
        });
    }

    updateQty = (qty) => {
        this.setState({
            qty : qty
        });
    }

    addToCart () {
        this.setState({
            loading : true,
        });

        let values = JSON.stringify({
            id: parseInt(this.state.id),
            value: parseInt(this.state.qty),
        });

        this.props.onCreateCart(values, () => {
            this.setState({
                visible : false,
                id : 0,
                qty : 1,
                loading : false
            });
        });
    }

    ListEmptydiv = () => {
        return (
                <div style={{textAlign: 'center'}}> Cart Is Empty </div>
        );
    }

    componentDidMount(){
        this.props.onFetchProducts(this.state.page, this.state.searchTerm);
        let nextPage, currentPage, previousPage;
        if(_.isEmpty(this.props.products)){
            nextPage = 2;
            previousPage = 0;
        } else {
            nextPage = this.props.products._meta.currentPage + 1;
            previousPage = this.props.products._meta.currentPage - 1;
        }

        this.setState({
            isReady : true,
            nextPage : nextPage,
            previousPage : previousPage
        });
    }

    changePage(page){
        this.setState({
            isReady : false,
            page : page,
            loading : true
        });

        this.props.onFetchProducts(page, this.state.searchTerm);

        let nextPage, currentPage, previousPage;
        if(_.isEmpty(this.props.products)){
            nextPage = 2;
            previousPage = 0;
        } else {
            nextPage = this.props.products._meta.currentPage + 1;
            previousPage = this.props.products._meta.currentPage - 1;
        }

        this.setState({
            isReady : true,
            nextPage : nextPage,
            previousPage : previousPage,
            loading : true
        });
    }

    renderProducts() {
        return _.map(this.props.products.items, (item, index) => {
            return (
                <div className="col-lg-4 col-md-3 col-xs-2" key={index}>
                    <ReactPlaceholder type='media' rows={7} ready={this.state.isReady}>
                        <div style={{ flex : 1, flexDirection : 'row' }}>
                            <div style={ styles.itemImage }>

                            </div>
                            <div style={ styles.itemInfo }>
                                <div style={ styles.itemInfoCode }>{ item.sku } - { item.name }</div>
                                <div style={ styles.itemInfoName }>{ item.product.type_name }</div>
                                <div style={ styles.itemInfoPrice }>                                    
                                    { item.price }
                                </div>
                            </div>
                            <div style={ styles.itemAction }>
                                <button
                                    className="btn btn-lg btn-primary-o btn-block"
                                    onClick={ () => this.openCart(item.id) }>
                                        BUY
                                </button>
                            </div>
                        </div>
                    </ReactPlaceholder>
                </div>
            );
        });
    }

    render() {
        if(_.isEmpty(this.props.products)){
            return (
                <div>
                    <LoaderComponent loading="true" />
                    <div>product is empty</div>
                </div>
            );
        }

        return(
            <div className="row">
                { 
                    this.state.loading &&
                    <LoaderComponent loading="true" />
                }

                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="input-group input-lg">
                                <input 
                                    className="form-control input-lg"
                                    placeholder='Search Products' 
                                    value={this.state.term} 
                                    onChange={ term => this.searchUpdated(term) } />
                                <span className="input-group-btn">
                                    <button className="btn btn-lg btn-default-o">
                                        CARI
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        { this.renderProducts() }
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <a href="#"
                                style={{ flex : 1 }}
                                onClick={ () => this.changePage(this.state.previousPage) }>
                                prev
                            </a>
                        </div>
                        <div className="col-xs-6">
                            <a href="#"
                                style={{ flex : 1 }}
                                onClick={ () => this.changePage(this.state.nextPage) }>
                                <div  style={{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
                                    next
                                </div>
                            </a>
                        </div>
                    </div>
                    <SlidingPane
                        className='some-custom-class'
                        overlayClassName='some-custom-overlay-class'
                        isOpen={ this.state.isPaneOpen }
                        title='Hey, it is optional pane title.  I can be React component too.'
                        subtitle='Optional subtitle.'
                        onRequestClose={ () => {
                            // triggered on "<" on left top click or on outside click
                            this.setState({ isPaneOpen: false });
                        } }>
                        <div style={styles.slideContainer}>
                            <div style={{ flex : 1 }}>
                                <button
                                    style={{ flex : 1 }}
                                    onClick={() => this.setState({visible: false})}>
                                    <div style={{ backgroundColor : '#ff5c63', flex : 1, alignItems : 'center', justifyContent : 'center' }}>
                                        Close cart
                                    </div>
                                </button>
                            </div>
                            <div style={{ flex : 1 }}>
                                <divInput value={`${this.state.qty}`} style={ styles.inputQty } onChangediv={ (qty) => this.updateQty(qty) } placeholder='Qty' underlineColorAndroid={'transparent'} keyboardType='numeric' />
                            </div>
                            <div style={{ flex : 1 }}>
                                <button
                                    style={{ flex : 1 }}
                                    onClick={() => this.addToCart()}>
                                    <div style={{ backgroundColor : '#ff5c63', flex : 1, alignItems : 'center', justifyContent : 'center' }}>
                                        Add to cart
                                    </div>
                                </button>
                            </div>
                        </div>
                    </SlidingPane>
                    <SweetAlert
                        show={this.state.showAlert}
                        showProgress={false}
                        title="Information"
                        message={this.state.message}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={false}
                        showConfirmButton={true}
                        canceldiv="No, Cancel"
                        confirmdiv={this.state.confirmdiv}
                        confirmButtonColor="#ff5c63"
                        onCancelPressed={() => {
                            this.hideAlert();
                        }}
                        onConfirmPressed={() => {
                            this.hideAlert();
                        }}
                    />
                </div>
                <div className="col-lg-4">

                </div>
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        create_cart : state.create_cart
    };
}

const mapDispatchToProps = (dispatch) => {
        return {
                onFetchProducts: (page, term) => { dispatch(fetchProducts(page, term)); },
                onCreateCart: (values, callback) => { dispatch(createCart(values, callback)); }
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);


const styles = {
    itemIcon : {
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#ff5c63',
        borderRadius : 5,
        height: 40
    },
    listContainer : {
        backgroundColor : '#fff',
        flex : 1,
        margin : 0
    },
    itemContainer : {
        padding : 15, backgroundColor : 'white', marginBottom : -1, borderColor : '#e0e0e0', borderWidth : 1
    },
    itemImage : {
        flex : 1,
        backgroundColor: '#f0f0f0',
        height : 60
    },
    itemInfo : {
        flex : 3,
        paddingLeft : 10,
        paddingRight : 10,
    },
    itemInfoCode : {
        color : '#444',
        fontWeight : 'bold'
    },
    itemInfoName : {
        color : '#777'
    },
    itemInfoPrice : {
        color : '#ff5c63',
        fontSize : 12,
        fontWeight : 'bold',
        marginTop : 5
    },
    itemAction : {
        flex : 1,
        justifyContent : 'center'
    },
    input : {
        paddingTop : 20,
        paddingBottom : 20,
        paddingLeft : 20,
        paddingRight : 20,
        fontSize : 16,
        fontWeight : 'bold'
    },
    slideContainer: {
        flex: 1,
        flexDirection : 'row',
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        padding : 20
    },
    inputQty : {
        backgroundColor : '#fff',
        color : '#000',
        borderColor : '#666',
        borderRadius : 4,
        height : 60,
        padding : 10,
        textAlign : 'center'
    }
};