import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signinUser } from "../actions/userActions";

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = this.state;

      await this.props.dispatch(signinUser(email, password));

      const { userInfo } = await this.props.userSignin;

      const search = this.props.location.search;

      const redirect = search ? search.split("=")[1] : "/";

      if (userInfo.token) {
        this.props.history.push(redirect);
      }

      this.setState({
        email: "",
        password: "",
      });
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
    const { email, password } = this.state;
    const { error, userInfo } = this.props.userSignin;
    // console.log(userInfo);

    const search = this.props.location.search;

    const redirect = search ? search.split("=")[1] : "/";

    return (
      <div className="page-height signin">
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-container">
              <div className="form-group">
                <h2>Sign In</h2>
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
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Signin
                </button>
              </div>
              <div className="form-group">
                <p>New to Amazon?</p>
              </div>
              <div className="form-group">
                <Link
                  to={
                    redirect === "/"
                      ? "/register"
                      : "/register?redirect=" + redirect
                  }
                  className="btn btn-secondary"
                >
                  Create your amazon account
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
  userSignin: state.userSignin,
});

export default connect(mapStateToProps)(Signin);
