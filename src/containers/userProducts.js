import React , {Component} from 'react';
import Listing from '../containers/ProductListing';
import * as productsDB from '../DBHelper/product';
import { connect } from 'react-redux';

class UserProducts extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: []
        };
    }
    componentDidMount(){
        productsDB.getUserProducts(this.props.userId, this.props.token)
        .then(res =>{ this.setState({products: res.data}); console.log(res)})
        .catch(console.error)
    }
    render(){
        let products= (<Listing userProducts={this.state.products}></Listing>);
        if(this.state.products.length <= 0)  products=(<h2>You Haven't Added Any Products Yet!</h2>);
        return products;
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
        products: state.products
    }
} 

export default connect(mapStateToProps)(UserProducts);