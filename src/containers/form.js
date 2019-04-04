import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addProduct, getProductById, deleteProduct} from '../store/actions/actions';
import {withRouter} from 'react-router-dom';
// import Compare from '../Helper Functions/compareTwoStates';

class Form extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            product : {
                name: '',
                image: 'https://obamawhitehouse.archives.gov/sites/default/files/image/image_file/50-50-page-header.jpg',
                description: '',
                category: '',
                addedBy: '',
                price: '',
                discount: '',
                isOnSale: false,
                paymentTypes: [],
                tags: []
            }
        }
    }
    dataChanged = (event) => {
        let newProduct= {...this.state.product};
        newProduct[event.target.name] = event.target.value;
        this.setState({
            product: newProduct
        })
    }

    saleChanged = (event) => {
        let newProduct= {...this.state.product};
        newProduct.isOnSale = Boolean(Number(event.target.value));
        this.setState({
            product: newProduct
        });
    }

    paymentChanged = (event) => {
        let newProduct= {...this.state.product};
        let newArr = [];
        if(this.state.product.paymentTypes.length > 0)
        {
            newArr = [...newProduct.paymentTypes];
        }
        if(event.target.checked)
        {
            newArr.push(event.target.name);
        }
        else
        {
            const index = newProduct.paymentTypes.findIndex(p => p === event.target.name);
            newArr.splice(index, 1);
        }
        this.setState({
            product: {
                ...newProduct,
                paymentTypes: newArr
            }
        })
    }

    tagAdded = (event) => {
        if(event.key === 'Enter')
        {
            let newTags = (this.state.product.tags.length > 0) ? [...this.state.product.tags] : [];
            newTags.push(event.target.value);
            this.setState({
                product : {
                    ...this.state.product,
                    tags: newTags           
                }
            })
            event.target.value = "";
        }
    }

    tagRemoved(index){
        let newTags = [...this.state.product.tags];
        newTags.splice(index, 1);
        this.setState({
            product:{
                ...this.state.product,
                tags: newTags
            }
        })
    }

    userAdded = (event) =>{
        event.preventDefault();
        this.props.onAdd(this.state.product, this.props.token);
        this.props.history.push('/products');
    }
  

    cancel = (event) => {
        event.preventDefault();
        this.props.history.push('/products');
    }
    componentDidMount()
    {
        let newProduct = {...this.state.product};
        newProduct.addedBy = this.props.userId;
        this.setState({product: newProduct});  
    }
  
   
    render()
    {
        let tags = null;
        if(this.state.product.tags && this.state.product.tags.length > 0)
        {
            tags = this.state.product.tags.map((t, index) => {
                return <div key={index} className="taged-textbox__tag"><span>{t}</span><span  className="taged-textbox__remove"><i
                onClick={this.tagRemoved.bind(this, index)} className="fas fa-times"></i></span></div>
            });
            tags = (<>{tags} <div className="taged-textbox__clear" onClick={()=>{this.setState({product:{...this.state.product, tags:[]}})}}>
            <span ><i className="fas fa-times"></i></span>
            </div></>);
        }
        let btn =  (this.props.match.params.id)? (<button onClick={this.userEdited}  type="submit" className="btn btn--primary">Confirm</button>) : (<button onClick={this.userAdded}  type="submit" className="btn btn--primary">Add</button>);
        let categories = [];
        if(this.props.categories && this.props.categories.length > 0)
        {
            categories = this.props.categories.map((c,index)=>{
                return(<option key={index} value={c._id}>{c.name}</option>);
            })
        }
        return (
            <div className="add-product container-fluid">
                <form onKeyDown={(e) => {if(e.key === 'Enter')  {e.preventDefault()}}}>
                    <div className="add-product__images slider">
                        <div className="slider__items">
                            <div className="slider__item active" style={{backgroundImage: `url(${this.state.product.image})`}}></div>
                        </div>
                    </div>
                    <div className="add-product__data">
                        <div className="form-controls">
                            <section className="tabs">
                                <div className="tabs__headers">
                                    <div className="tabs__header active">
                                        English
                                    </div>
                                    <div className="tabs__header">
                                        Arabic
                                    </div>
                                </div>
                                <div className="tabs__bodies">
                                    <div className="tabs__body active">
                                        <div className="form-group">
                                            <label >Name</label>
                                            <input className="form-control" value={this.state.product.name} onChange={this.dataChanged} type="text" name="name"/>
                                        </div>
                                        <div className="form-group">
                                            <label >Image URL</label>
                                            <input className="form-control" value={this.state.product.image} onChange={this.dataChanged} type="text" name="image"/>
                                        </div>
                                        <div className="form-group">
                                            <label >Description</label>
                                            <textarea className="form-control" value={this.state.product.description} onChange={this.dataChanged} name="description" cols="30" rows="4"></textarea>
                                        </div>
                                    </div>
                                    <div className="tabs__body ">
                                        <div className="form-group invalid">
                                            <label >Name</label>
                                            <input className="form-control" type="text" name="" id=""/>
                                        </div>
                                        <div className="form-group">
                                            <label >Description</label>
                                            <textarea className="form-control" name="" id="" cols="30" rows="4"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="form-group">
                                <label >Price</label>
                                <input className="form-control" type="text" name="price" value={this.state.product.price} onChange={this.dataChanged}/>
                            </div>
                            <div className="add-product__discount">
                                <div className="form-group">
                                    <label >Satus</label>
                                    <div className="form-group__radios">
                                        <div className="form-group__radio"><input type="radio" name="isOnSale" value="1" checked={this.state.product.isOnSale}  onChange={this.saleChanged}/><span>On Sale</span></div>
                                        <div className="form-group__radio"><input type="radio" name="isOnSale" value="0" checked={!this.state.product.isOnSale} onChange={this.saleChanged}/><span>Not On Sale</span></div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label >Discount</label>
                                    <input disabled={!this.state.product.isOnSale} className="form-control" value={this.state.product.discount} type="text" name="discount" onChange={this.dataChanged} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Payment Types</label>
                                <div className="form-group__checkboxs">
                                    <div className="form-group__checkbox"><input type="checkbox" name="Direct Bank Transfer" onChange={this.paymentChanged}/><span>Direct Bank
                                            Transfer</span></div>
                                    <div className="form-group__checkbox"><input type="checkbox" name="Cheque Payment" onChange={this.paymentChanged}/><span>Cheque Payment</span></div>
                                    <div className="form-group__checkbox"><input type="checkbox" name="Paypal" onChange={this.paymentChanged}/><span>Paypal</span></div>
                                    <div className="form-group__checkbox"><input type="checkbox" name="Visa" onChange={this.paymentChanged}/><span>Visa</span></div>
                                    <div className="form-group__checkbox"><input type="checkbox" name="Mastercard" onChange={this.paymentChanged}/><span>Mastercard</span></div>
                                    <div className="form-group__checkbox"><input type="checkbox" name="Cash On Delivery" onChange={this.paymentChanged}/><span>Cash On Delivery</span></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Category</label>
                                <select className="form-control" name="category" defaultValue={""}  onChange={this.dataChanged}>
                                    <option value="" disabled>Select A Category</option>
                                    {categories}
                                </select>
                            </div>

                            <div className="taged-textbox form-group">
                                <label className="taged-textbox__lable" >Tags</label>
                                <div className="taged-textbox__data">
                                    <div className="taged-textbox__tags">
                                        {tags}
                                    </div>
                                </div>
                                <input className="taged-textbox__textbox form-control" type="text" onKeyUp={this.tagAdded}/>
                            </div>
                            <div className="add-product__actions">
                                <button onClick={this.cancel}  className="btn btn--gray">Cancel</button>
                                {btn}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        product: state.selectedProduct,
        categories: state.categories,
        token: state.token,
        userId: state.userId
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onAdd: (value, token) => {dispatch(addProduct(value, token))},
        onSelect: (id)=> {dispatch(getProductById(id))},
        onDelete: (id) => {dispatch(deleteProduct(id))}
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));