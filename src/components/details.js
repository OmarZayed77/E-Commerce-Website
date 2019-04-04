import React from 'react';
import {connect} from 'react-redux';
import {getProductById} from '../store/actions/actions';
import {withRouter} from 'react-router-dom';

const Details = (props) => {
    if(!props.product._id || props.product._id.toString() !== props.match.params.id.toString())
    {
        props.onSelect(props.match.params.id);
    }
    let price = ( <span>{props.product.price}</span>);
    if(props.product.isOnSale)
    {
        price = (<><span style={{color: 'lightgray', textDecoration: 'line-through'}}>{props.product.price}</span>&nbsp;<span>{(parseInt(props.product.price) - parseInt(props.product.discount)).toString()}</span>
        </>);
    }

    let tags = null;
    if(props.product.id && props.product.tags.length > 0)
    {
        tags = props.product.tags.map((t, index)=>{
            return (<span key={index} rel="tag" >, {t}</span>)
        });
    }
    let category = null;
    if(props.product.category)
    {
        category = (<span rel="tag" >{props.product.category.name}</span>);
    }
    return(
        <div className="product-details container">
            <section className="product-details__main">
                <div className="slider">
                    <div className="slider__items">
                        <div className="slider__item active" style={{backgroundImage: `url(${props.product.image})`}}></div>
                    </div>
                </div>
                <div className="product-details__info">
                    <h1>{props.product.name}</h1>
                    <div className="rating">
                        <div className="rating__stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                        </div>
                        <div className="rating__data">
                            2 reviews
                        </div>
                    </div>
                    <div className="product-details__amount">
                        {price}
                    </div>
                    <p className="product-details__desc">
                        {props.product.description}
                    </p>
                    <div className="product-details__meta">
                        Category: {category}{tags}.
                    </div>
                </div>
            </section>
            <section className="tabs">
                <div className="tabs__headers">
                    <div className="tabs__header active">
                        Description
                    </div>
                    <div className="tabs__header">
                        Additional Information
                    </div>
                    <div className="tabs__header">
                        Reviews (2)
                    </div>
                </div>
                <div className="tabs__bodies">
                    <div className="tabs__body active">
                        <div className="product-details__desc">
                            <p>
                                {props.product.description}
                            </p>
                            <p>
                                {props.product.description}
                            </p>
                        </div>   
                    </div>
                    <div className="tabs__body ">
                        tab2
                    </div>
                    <div className="tabs__body">
                        tab3
                    </div>
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {product: state.selectedProduct}
}

const mapDispatchToProps = dispatch => {
    return {onSelect: (id)=> {dispatch(getProductById(id))}}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Details));