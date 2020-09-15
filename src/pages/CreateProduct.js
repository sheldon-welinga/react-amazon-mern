import React from "react";
import { connect } from "react-redux";
import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../actions/productActions";
// import { products } from "../../../server/data/data";

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      image: "",
      brand: "",
      category: "",
      countInStock: "",
      description: "",
      rating: 0,
      reviews: 0,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  openModal = (product) => {
    this.setState({
      modalVisible: true,
      id: product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      brand: product.brand,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(this.state);

    await this.props.dispatch(saveProduct(this.state));

    const { success: successSave } = this.props.productSave;

    if (successSave) {
      this.setState({
        modalVisible: false,
      });

      this.props.dispatch(listProducts());
    }

    this.setState({
      name: "",
      price: "",
      image: "",
      brand: "",
      category: "",
      countInStock: "",
      description: "",
    });
  };

  handleDelete = async (product) => {
    await this.props.dispatch(deleteProduct(product._id));

    const { success: deleteSuccess } = this.props.productDelete;

    if (deleteSuccess) {
      this.props.dispatch(listProducts());
    }
  };

  componentDidMount() {
    this.props.dispatch(listProducts());

    // console.log(this.props);
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
      modalVisible,
      id,
    } = this.state;
    // const { success: successSave, error: errorSave } = this.props.productSave;
    // console.log(sucessSave);
    // console.log(this.props.productList);
    const { loading, products, error } = this.props.productList;

    return (
      <div className="page-height content content-margined">
        <div className="products-header">
          <h3>Products</h3>
          <button
            className="btn btn-primary"
            onClick={() => this.openModal(this.state)}
          >
            Create Product
          </button>
        </div>

        {modalVisible && (
          <div className=" create-product">
            <div className="form">
              <form onSubmit={this.handleSubmit}>
                <div className="form-container">
                  <div className="form-group">
                    <h2>Create Product</h2>
                  </div>
                  <div className="form-group">
                    {error && <div>{error}</div>}
                    {loading && <div>Loading...</div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={price}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      type="text"
                      name="image"
                      id="image"
                      value={image}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      value={brand}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="countInStock">Count In Stock</label>
                    <input
                      type="text"
                      name="countInStock"
                      id="countInStock"
                      value={countInStock}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={category}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      id="description"
                      value={description}
                      onChange={this.handleChange}
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      {id ? "Update" : "Create"}
                    </button>
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      onClick={() => this.setState({ modalVisible: false })}
                      className="btn btn-secondary"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="product-list">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0
                ? products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => this.openModal(product)}
                        >
                          Edit
                        </button>{" "}
                        <button
                          className="btn btn-danger"
                          onClick={() => this.handleDelete(product)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productList: state.products,
  productSave: state.productSave,
  productDelete: state.productDelete,
});

export default connect(mapStateToProps)(CreateProduct);
