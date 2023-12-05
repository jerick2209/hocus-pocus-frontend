import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const API_ENDPOINT="https://hocus-pocus-backend.onrender.com";

const AdsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/ads/active`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Featured Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-lg-4 mb-4" key={product.id}>
              <Link to={`/ads/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      {/* <small className="text-muted">Owner: {product.owner.name}</small> */}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdsList;
