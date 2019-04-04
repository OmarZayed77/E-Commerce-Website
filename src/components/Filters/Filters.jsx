import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';

const Filters = (props) => {

  let categories = [];
  if(props.categories && props.categories.length > 0)
  {
      categories = props.categories.map((c,index)=>{
          return(<li onClick={()=> {props.onGetByCategory(c._id); props.reset()}} className="link list__item" key={c._id}><i className="link__icon fas fa-angle-right"></i>{c.name}</li>);
      })
  }

  return (
    <section className="filters">
      <div className="search-box">
        <input className="search-box__input" placeholder="Search..." type="text" name="txt_search" id="" />
        <button type="submit" className="search-box__btn"><i className="fas fa-search"></i></button>

      </div>
      <div>
        <h5>Categories</h5>
        <ul className="list list--vr-separator">
          <li onClick={()=>{props.onGetAll(); props.reset()}} className="link list__item"><i className="link__icon fas fa-angle-right"></i>All</li>
          {categories}
        </ul>
      </div>
      <div>

        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div>

        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}

const mapStateToProps = state => {
  return{
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetAll: () => {dispatch(actions.getAllProducts())},
    onGetByCategory: (categoryId) => {dispatch(actions.getProductsByCategory(categoryId))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);