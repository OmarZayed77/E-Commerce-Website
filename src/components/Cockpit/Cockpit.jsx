import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';
import {withRouter} from 'react-router-dom';

const Cockpit = (props) => {

  let links = (<ul className="nav__items list list--hr">
      <li className="nav__item">
        <NavLink to="/products" className="nav__link">All Products</NavLink>
      </li>
      <li className="nav__item">
        <NavLink to="/login" className="nav__link">Register now or Log In</NavLink>
      </li>
    </ul>
  )

  const logout = () => {
    props.onLogOut();
    props.history.push('/products');
  }

  if(props.isLoggedIn)
  {
    links = (<ul className="nav__items list list--hr">
        <li className="nav__item">
          <NavLink to="/products" className="nav__link">All Products</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/myproducts" className="nav__link">My Products</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/add" className="nav__link">Add Product</NavLink>
        </li>
        <li className="nav__item">
          <span className="nav__link" onClick={logout}>Logout</span>
        </li>
      </ul>
    )
  }
  return (
    <div className="header">
      <div className="header__upper">
        <div className="container">
          <ul className="list list--hr list--hr-separator">
            <li className="list__item">
              <span className="info">
                <i className="info__icon far fa-dot-circle"></i>
                <span className="info__data">1234 Street Name, City Name</span>
              </span>
            </li>
            <li className="list__item">
              <span href="#" className="info">
                <i className="info__icon fab fa-whatsapp"></i>
                <span className="info__data">123-456-7890</span>
              </span>
            </li>
            <li className="list__item">
              <span href="#" className="info">
                <i className="info__icon far fa-envelope"></i>
                <span className="info__data">mail@domain.com</span>
              </span>
            </li>
          </ul>
          <ul className="list list--hr">
            <li className="list__item">

              <div className="dropdown ">
                <div className="dropdown__header">
                  <span href="#" className="link">
                    <img className="flag flag-us" src="" alt="" />
                    English
                                </span>
                  <i className="fas fa-angle-down"></i>
                </div>

                <div className="dropdown__body">
                  <ul className="dropdown__items list">
                    <li className="dropdown__item list__item">
                      <span href="#" className="link">
                        <img className="flag flag-us" src="" alt="" />
                        English
                                        </span>
                    </li>
                    <li className="dropdown__item list__item">
                      <span href="#" className="link">
                        <img className="flag flag-es" src="" alt="" />
                        Español
                                        </span>
                    </li>
                    <li className="dropdown__item list__item">
                      <span href="#" className="link">
                        <img className="flag flag-fr" src="" alt="" />
                        Française
                                        </span>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
     
      <div className="header__lower container">
        <nav className="nav">
          {links}
        </nav>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    isLoggedIn : state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogOut : () => {dispatch({type: actions.LOGOUT})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cockpit));