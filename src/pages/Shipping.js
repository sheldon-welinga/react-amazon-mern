import React from "react";
import { connect } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

class Shipping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      city: "",
      country: "",
      postalCode: "",
    };

    console.log(this.props);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(this.state);

      this.props.dispatch(saveShipping(this.state));

      this.props.history.push("/payment");
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
    const { address, city, country, postalCode } = this.state;

    return (
      <div className="page-height">
        <CheckoutSteps step1 step2 />

        <div className="shipping">
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <div className="form-container">
                <div className="form-group">
                  <h2>Shipping</h2>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    value={postalCode}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={country}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   userRegister: state.userRegister,
// });

export default connect()(Shipping);
