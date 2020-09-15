import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/userActions";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      passError: "",
      confirmError: "",
    };

    // console.log(this.props);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      } = this.state;

      if (password.trim().length < 8) {
        this.setState({
          password: "",
          confirmPassword: "",
          passError: "Password must be atleast 8 characters",
        });

        setTimeout(() => {
          this.setState({
            passError: "",
          });
        }, 2000);
      } else if (password.trim() !== confirmPassword.trim()) {
        this.setState({
          password: "",
          confirmPassword: "",
          passError: "",
          confirmError: "Passwords do not match",
        });

        setTimeout(() => {
          this.setState({
            confirmError: "",
          });
        }, 2000);
      } else {
        await this.props.dispatch(
          registerUser(firstname, lastname, email, password)
        );

        const { userInfo } = await this.props.userRegister;

        // console.log(userInfo);
        const search = this.props.location.search;

        const redirect = search ? search.split("=")[1] : "/";

        if (userInfo.token) {
          this.props.history.push(redirect);
        }

        this.setState({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const {
      email,
      password,
      confirmPassword,
      firstname,
      lastname,
      passError,
      confirmError,
    } = this.state;

    const { error, userInfo } = this.props.userRegister;
    // console.log(error, loading);
    const search = this.props.location.search;

    const redirect = search ? search.split("=")[1] : "/";

    return (
      <div className="page-height register">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-container">
              <div className="form-group">
                <h2>Create Account</h2>
              </div>
              <div className="form-group">
                {error && <div>{error}</div>}
                {userInfo
                  ? userInfo.error && <div>{userInfo.error}</div>
                  : null}
                {userInfo
                  ? userInfo.message && <div>{userInfo.message}</div>
                  : null}
              </div>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={firstname}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={lastname}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">{passError}</div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">{confirmError}</div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <div className="form-group">
                <p>Already have an account?</p>
              </div>
              <div className="form-group">
                <Link
                  to={
                    redirect === "/"
                      ? "/signin"
                      : "/signin?redirect=" + redirect
                  }
                  className="btn btn-secondary"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
});

export default connect(mapStateToProps)(Register);
