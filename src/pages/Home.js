import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

const Home = () => {
  // const [products, setProducts] = useState([]);
  const productsList = useSelector((state) => state.products);

  // console.log(productsList);

  const { products, loading, error } = productsList;

  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true; //To avoid a memory leak on componentDidUnmount/WillUnount for asynchronous fetching data

    //using redux
    if (isSubscribed) {
      dispatch(listProducts());
    }

    //using normal data store from the server

    /*const fetchData = async () => {
      const config = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch("/api/v1/products/", config);

      const data = await response.json();

      if (isSubscribed) {
        setProducts(data);
      }
    };

    fetchData();
    */

    return () => (isSubscribed = false);
  }, [dispatch]);

  if (loading) {
  } else if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="container">
      <main className="main">
        <div className="content">
          <div className="products">
            {products.map((product, index) => (
              <div className="product-container" key={index}>
                <div className="product">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      alt="product"
                      className="product-image"
                    />
                  </Link>
                  <p className="product-name">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </p>
                  <p className="product-brand">{product.brand}</p>
                  <p className="product-price">Ksh. {product.price}</p>
                  <p className="product-rating">
                    {product.rating} Stars ({product.reviews} reviews)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
