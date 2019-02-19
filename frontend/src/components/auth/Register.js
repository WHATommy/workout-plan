import React, { Component } from 'react'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <input
              type='text'
              placeholder='Username'
              name='username'
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              value={this.state.password2}
              onChange={this.onChange}
            />
          </div>
          <button>submit</button>
        </form>
      </div>
    )
  }
}

export default Register