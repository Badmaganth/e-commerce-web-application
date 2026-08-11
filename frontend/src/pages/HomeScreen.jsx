import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Ensure backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Latest Products</h1>
        <input
          type="text"
          placeholder="Search products or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2.5 border rounded-lg w-full md:w-80 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products match your search criteria.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white border rounded-lg shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <Link to={`/product/${product._id}`}>
                  <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded mb-4 hover:opacity-90 transition" />
                  <h2 className="font-semibold text-lg text-gray-800 hover:text-blue-600 transition">{product.name}</h2>
                </Link>
                <p className="text-xs bg-gray-100 text-gray-600 w-fit px-2 py-0.5 rounded my-2 font-medium">{product.category}</p>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                <p className="text-xl font-bold text-gray-900 mb-4">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
              <button
                onClick={() => dispatch(addToCart({ ...product, qty: 1 }))}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}