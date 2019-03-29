import React, { Component } from 'react';
import './App.css';
import Cockpit from './components/Cockpit';
import ProductListing from './containers/ProductListing';
import Footer from './components/Footer';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Form from './containers/form';
import UserForm from './containers/userForm';
import Details from './components/details'
import UserProducts from './containers/userProducts'
import * as actions from './store/actions/actions';
import {connect} from 'react-redux';

class App extends Component {

  componentDidMount(){
    if(localStorage.getItem('token'))
    {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      this.props.onAuth({token, userId});
    }
  }


  render() {
    let routes = (
      <>
      <Switch>
          <Route path="/login" exact component={UserForm}/>
          <Route path="/products/:id" component={Details}/>
          <Route path="/products" exact component={ProductListing}/>
          <Redirect from="/home" to="/products"/>
          <Redirect from="/" to="/products"/>
          <Route render={()=>{return "not found!!!"}}/>
      </Switch>
      <footer>&copy; COPYRIGHTS goes to Omar Zayed</footer>
      </>
    );
    if(this.props.isLoggedIn)
    {
      routes = (
        <Switch>
            <Redirect from="/login" to="/products"/>
            <Route path="/add" exact component={Form}/>
            <Route path="/products/:id" component={Details}/>
            <Route path="/products" exact component={ProductListing}/>
            <Route path="/myproducts" exact component={UserProducts}/>
            <Redirect from="/home" to="/products"/>
            <Redirect from="/" to="/products"/>
            <Route render={()=>{return "not found!!!"}}/>
        </Switch>
      );
    }
    return (
      <>
          <BrowserRouter>
            <>
              <Cockpit />
                {routes}
              <Footer />
            </>
          </BrowserRouter>
      </>
    );
  }
}

const mapStateToProps = state => {
  return{
    isLoggedIn : state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAuth: (value) => {dispatch({type: actions.LOGIN, payload: value})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
