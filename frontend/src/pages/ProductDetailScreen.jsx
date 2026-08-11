import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function ProductDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
    navigate('/cart');
  };

  if (loading) return <div className="container mx-auto p-6">Loading product details...</div>;
  if (error) return <div className="container mx-auto p-6 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="inline-block mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-medium">
        &larr; Back to Products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 border rounded-lg shadow-sm">
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded" />
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded font-semibold uppercase">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold mt-2 mb-4 text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            <p className="text-3xl font-bold text-gray-900 mb-4">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
            <p className={`font-semibold mb-6 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>

          {product.stock > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold text-gray-700">Quantity:</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {[...Array(product.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-bold text-lg"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}