import React from "react";
import { connect } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePayment } from "../actions/cartActions";

class Payment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentMethod: "paypal",
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
      // console.log(this.state);
      this.props.dispatch(savePayment(this.state));

      this.props.history.push("/place-order");
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
    const { paymentMethod } = this.state;

    return (
      <div className="page-height">
        <CheckoutSteps step1 step2 step3 />

        <div className="payment">
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <div className="form-container">
                <div className="form-group">
                  <h2>Payment</h2>
                </div>
                <div className="form-group">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="paymentMethod">Paypal</label>
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

export default connect()(Payment);
