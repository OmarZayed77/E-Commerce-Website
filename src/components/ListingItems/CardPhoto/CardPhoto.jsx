import React from 'react';

import { connect } from 'react-redux';
import { deleteProduct} from '../../../store/actions/actions';
import {Link} from 'react-router-dom';

const CardPhoto = (props) => {

  let Sale = null;
  let price = (
    <>
    <span to="/" className="lable" >${props.product.price}</span>
    </>
  );
  if (props.product.isOnSale) {
    Sale = (
      <>
        <div className="item-medium-1__alert" >Sale</div>
      </>
    );
    price = (
      <>
      <del>${props.product.price}</del>
      <span to="/" className="lable" >${props.product.price - props.product.discount}</span>
      </>
    );
  }
  let deleteIcon = null;
  if(props.isLoggedIn && props.product.addedBy === props.userId){
        deleteIcon= (<span onClick={() => { props.deleteProduct(props.product._id, props.token) }} ><i className="fas fa-trash-alt"></i></span>);
  }
  return (
    <>


      {Sale}

      <div className="item-medium-1__image image" style={{backgroundImage: `url(${props.product.image})`}}>
        <span href="#" className="item-medium-1__action">Add to Cart</span>
      </div>

      <span href="#">
        <h4>{props.product.name}</h4>
        <div className="flex-row">
          <div>
             {price}
          </div>
        </div>
      </span>
      <div className="crud-actions">
        <Link to={`/products/${props.product._id}`}><i className="far fa-eye"></i></Link>
        {deleteIcon}
      </div>

    </>
  );
}

const mapStatetoprops = state => {
  return {
    token: state.token,
    isLoggedIn: state.isLoggedIn,
    userId: state.userId
  }
}

const mapDispachToProps = (dispach) => ({
  deleteProduct: (id, token) => { dispach(deleteProduct(id, token))}
});

export default connect(mapStatetoprops, mapDispachToProps)(CardPhoto);
