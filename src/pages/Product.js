import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

const Product = (props) => {
  /*
  const productId = props.match.params.product_id;
  const product = data.products.find((item) => item._id === productId);
  */
  const [quantity, setQuantity] = useState(1);

  const productId = props.match.params.product_id;
  const productDetails = useSelector((state) => state.productDetails);
  // console.log(productDetails);
  const { product, loading, error } = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true; //for handling the aync actions on componentWillUnmount
    if (isSubscribed) {
      dispatch(detailsProduct(productId));
    }

    return () => (isSubscribed = false);
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    props.history.push(`/cart/${productId}?quantity=${quantity}`);
  };

  return (
    <div className="page-height product-details">
      <div className="back-link">
        <Link to="/">
          {" "}
          <i className="fa fa-long-arrow-left"></i> Back to products
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt={`${product.name} product`} />
          </div>
          <div className="details-info">
            <div>
              <h4>{product.name}</h4>
              <p>
                {product.rating} Stars ({product.reviews} Reviews)
              </p>
              <p>
                Price: <strong>Ksh. {product.price}</strong>
              </p>
              <div className="details-description">
                Description:
                <p>{product.description}</p>
              </div>
            </div>
          </div>
          <div className="details-action">
            <div>
              <p>
                <strong>Price : </strong>Ksh. {product.price}
              </p>
              <p>
                <strong>Status : </strong>
                {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </p>
              <p>
                <strong>Qty : </strong>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map(
                    (item, index) => (
                      <option value={item + 1} key={index}>
                        {item + 1}
                      </option>
                    )
                  )}
                </select>
              </p>
              <p>
                {product.countInStock > 0 && (
                  <button className="btn btn-primary" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
