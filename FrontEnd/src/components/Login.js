import React from "react";
import { Link } from 'react-router-dom';
import './style.css';
import UserInput from "./UserInput";

export class Login extends React.Component {
    state = {
        username: '',
        error: ''
    }
    handleChange = event => {
        this.setState({ username: event.target.value, error: '' });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.username === '') {
            this.setState({
                error: 'please enter username'
            })
        }
        else {
            fetch(`http://localhost:5000/adduser?username=${this.state.username}`)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.status === 'success') {
                        this.props.history.push('/map');
                        console.log('success');
                    } else {
                        this.setState({
                            error: responseJson.message
                        })
                    }
                })
                .catch(error => { console.log(error); this.setState({ error: 'Network error' }) })
        }
    }
    render() {
        return (
            <div className="base">
                <h1 className='head'>Log In</h1>
                <form className='form'>
                    <p className='head'>Enter username to continue</p>
                    <input className='input' value={this.state.username} type="text" name="name" onChange={this.handleChange} />
                    {
                        this.state.error === '' ? null : <div className='error'>{this.state.error}</div>
                    }
                    <button className='button' type="submit" onClick={this.handleSubmit}>Login</button>
                </form>
            </div >
        );
    }
}

export default Login
