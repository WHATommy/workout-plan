import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/AuthAction';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  componentDidMount() {
    // If authenticated, go straight to the user's folders
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/folders');
    };
  };

  componentWillReceiveProps(nextProps) {
    // If authenticated, go straight to the user's folders
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/folders');
    };

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    };
  };

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="align">
        <form className="form" onSubmit={this.onSubmit}>
          <div>
            <input
              className="input"
              type='email'
              placeholder='Email Address'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              className="input"
              type='password'
              placeholder='Password'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <div className="line">
            <input type="submit" value="Login" className="submit" />
          </div>
        </form>
      </div>
    );
  };
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));