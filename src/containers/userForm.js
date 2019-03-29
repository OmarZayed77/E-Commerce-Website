import React , {Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions'

class UserForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
        this.change = this.change.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    change(event){
        let newState = {...this.state};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }
    register(){
        this.props.onRegister(this.state);
        this.setState({
            userName: "",
            password: ""
        });
    }
    login(){
        this.props.onLogin(this.state);            
    }
    render()
    {
        return (
            <div className="add-product container-fluid">
                <form onSubmit={event => event.preventDefault()}>
                    <div><label>Username: </label><input name="userName" value={this.state.userName} onChange={this.change} className="form-control" type="text"/></div>
                    <div><label>Password: </label><input name="password" value={this.state.password} onChange={this.change} className="form-control" type="password"/></div>
                    <button onClick={this.login} className="btn btn--gray">Login</button>
                    <button onClick={this.register} className="btn btn--gray">Register</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (value) => {dispatch(actions.register(value))},
        onLogin: (value) => {dispatch(actions.login(value))}
    }
}

export default connect(null, mapDispatchToProps)(UserForm);