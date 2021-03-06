import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { createCart, fetchProducts, fetchCarts, deleteCart, clearCart, updateCart } from '../../actions';
import LoaderComponent from '../common/loader';

import SearchBar from './search_bar';

const MySwal = withReactContent(Swal)

Modal.setAppElement('#root');

class Products extends Component {

    constructor(props){
        super(props);
        this.state = { showAlert: false };
        this.addToCart = this.addToCart.bind(this);
        this.changePage = this.changePage.bind(this);
        this.setCartId = this.setCartId.bind(this);
        this.state = {
            visible : false,
            isReady : false,
            id : 0,
            qty : 1,
            text : '',
            message : '',
            confirmText : 'Oke',
            searchTerm : '',
            page : 1,
            nextPage : 1,
            previousPage : 1,
            loading : false,
            isPaneOpen: false,
            isPaneOpenLeft: false,
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    static defaultProps = {
        products: []
    }

    searchUpdated(term) {
        this.setState({
            searchTerm: term,
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

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    openCart(productId){
        this.setState({
            visible : true,
            id : productId,
            qty : 1,
            isPaneOpen: true
        });

        this.openModal();
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

            this.props.onFetchCarts();

            this.closeModal();

            MySwal.fire({
                text: this.props.create_cart.message,
                type: 'success',
                position : 'bottom-end',
                showConfirmButton: false,
                toast: true,
                timer: 9000 
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
        this.props.onFetchCarts();
        
        let nextPage, previousPage;
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

        let nextPage, previousPage;
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
            loading : false
        });
    }

    updateCart () {
        this.setState({
            loading : true,
        });

        let values = JSON.stringify({
            value: parseInt(this.state.qty),
        });

        this.props.onUpdateCart(this.state.id, values, () => {
            this.setState({
                visible : false,
                id : 0,
                qty : 1,
                loading : false
            });
            this.props.onFetchCarts();
        });
    }

    setCartId(id, qty){
        this.setState({
            visible : true,
            id : id,
            qty : qty
        });
    }

    confirmDelete(){
        this.showAlert();
    }

    eventDeleteCart(e){
        this.setState({
            loading : true,
        });

        this.props.onDeleteCart(this.state.id, () => {
            this.setState({
                visible : false,
                loading : false
            });
            this.props.onFetchCarts();
            this.hideAlert();
        });
        e.preventDefault();
    }

    renderProducts() {
        return _.map(this.props.products.items, (item, index) => {
            return (
                <div className="col-lg-4 col-md-3 col-xs-12" key={index}>
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
        const productSearch = _.debounce((term) => {this.searchUpdated(term)}, 300);

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
                            <SearchBar onSearchTermChange={productSearch} />
                        </div>
                    </div>
                    <div className="row">
                        { this.renderProducts() }
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                        { this.props.products._meta.currentPage >= this.props.products._meta.pageCount &&
                            <button
                                className="btn btn-primary"
                                onClick={ () => this.changePage(this.state.previousPage) }>
                                prev
                            </button>
                        }
                        </div>
                        <div className="col-xs-6">
                        { this.props.products._meta.currentPage < this.props.products._meta.pageCount &&
                            <button
                                className="btn btn-primary"
                                onClick={ () => this.changePage(this.state.nextPage) }>
                                next
                            </button>
                        }
                        </div>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <h2 ref={subtitle => this.subtitle = subtitle}>Add to cart</h2>
                        <div className="row">
                            <div className="col-xs-8">
                                <input value={`${this.state.qty}`} className="form-control" onChange={ (qty) => this.updateQty(qty.target.value) } placeholder='Qty'  />
                            </div>
                            <div className="col-xs-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.addToCart()}>                                    
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="col-lg-4">
                    {this.props.carts.count === 0 ? (
                        <div>                          
                        Cart Is Empty
                        </div>
                    ) : (
                        <div>                          
                        Aya
                        </div>
                    )}
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        products    : state.products,
        create_cart : state.create_cart,
        carts       : state.carts
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchProducts: (page, term) => { dispatch(fetchProducts(page, term)); },
        onCreateCart: (values, callback) => { dispatch(createCart(values, callback)); },
        onClearCart : (callback) => { dispatch(clearCart(callback)); },
        onFetchCarts : () => { dispatch(fetchCarts()); },
        onDeleteCart : (id, callback) => { dispatch(deleteCart(id, callback)); },
        onUpdateCart: (id, values, callback) => { dispatch(updateCart(id, values, callback)); }
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
        textAlign : 'center'
    }
};

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};