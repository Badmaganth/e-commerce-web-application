const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Noise-Canceling Headphones',
    price: 14999,
    description: 'High-quality over-ear wireless headphones with active noise cancellation.',
    category: 'Electronics',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
  },
  {
    name: 'Ergonomic Mechanical Keyboard',
    price: 6999,
    description: 'RGB backlit mechanical keyboard with customizable tactile switches.',
    category: 'Electronics',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80'
  },
  {
    name: 'Smart Fitness Watch',
    price: 9999,
    description: 'Track heart rate, steps, sleep, and workouts with 7-day battery life.',
    category: 'Wearables',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'
  },
  {
    name: 'Minimalist Leather Backpack',
    price: 5499,
    description: 'Durable water-resistant backpack suited for laptops up to 15 inches.',
    category: 'Accessories',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80'
  }
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('Sample Products Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

importData();