import React from 'react';
import Filters from '../../components/Filters/Filters';
import ListingItems from '../../components/ListingItems/ListingItems';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';


class ProductListing extends React.Component {
  state = {
    Page: 1,
    max_items: 6,
  }
  pageChanedHndlr = (page) => {
    let numOfPages = (this.props.products.length%this.state.max_items === 0) ? Math.floor(this.props.products.length / this.state.max_items): Math.floor(this.props.products.length / this.state.max_items) + 1;
    if (page <= numOfPages && page > 0) {
      this.setState({ Page: page });
    }

  }
  pageClicked(value){
    this.pageChanedHndlr(value);
  }
  componentDidMount(){
    this.props.getAllProducts();
    this.props.getAllCategories();
  }
  render() {
        let list = (<ListingItems pageClicked={(value) => this.pageClicked.bind(this,value)} max_items={this.state.max_items} pageChanedHndlr={this.pageChanedHndlr.bind(this)} page={this.state.Page} products={this.props.products} />) 
        if(this.props.userProducts) list = (<ListingItems pageClicked={(value) => this.pageClicked.bind(this,value)} max_items={this.state.max_items} pageChanedHndlr={this.pageChanedHndlr.bind(this)} page={this.state.Page} products={this.props.userProducts} />);
        return (
      <div className="container" >
        <Filters />
        {list}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products

});

const mapDispatchToProps = dispatch => {
  return{
    getAllProducts: () => dispatch(actions.getAllProducts()),
    getAllCategories: () => dispatch(actions.getAllCategories())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
