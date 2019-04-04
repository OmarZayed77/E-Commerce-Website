import React , {Component} from 'react';
import Listing from '../containers/ProductListing';
import { connect } from 'react-redux';

class UserProducts extends Component{
    constructor(props){
        super(props);
        this.state = {
            products: []
        };
    }
    componentDidMount(){
        const userProducts = this.props.products.filter(p => p.addedBy === this.props.userId);
        this.setState({products: userProducts});      
    }
    componentDidUpdate()
    {
        const userProducts = this.props.products.filter(p => p.addedBy === this.props.userId);
        if(this.state.products.length !== userProducts.length) this.setState({products: userProducts});      
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