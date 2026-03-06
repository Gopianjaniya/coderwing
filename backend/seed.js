const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Apple iPhone 15 Pro',
    description: 'Latest iPhone with titanium build, A17 Pro chip, and USB-C.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
    category: 'Electronics',
    stock: 50,
    rating: 4.8,
  },
  {
    name: 'Samsung 4K Smart TV 55"',
    description: 'Crystal clear 4K display with smart features and voice control.',
    price: 649,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400',
    category: 'Electronics',
    stock: 30,
    rating: 4.6,
  },
  {
    name: 'Nike Air Max 270',
    description: 'Iconic Air cushioning and comfortable everyday running shoes.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'Footwear',
    stock: 120,
    rating: 4.5,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling wireless headphones.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics',
    stock: 75,
    rating: 4.9,
  },
  {
    name: 'Leather Backpack',
    description: 'Premium genuine leather backpack for work and travel.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    category: 'Bags',
    stock: 60,
    rating: 4.3,
  },
  {
    name: 'MacBook Air M2',
    description: 'Supercharged by M2 chip, 15.3" Liquid Retina display.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    category: 'Computers',
    stock: 25,
    rating: 4.9,
  },
  {
    name: 'Men\'s Classic Watch',
    description: 'Elegant stainless steel watch with sapphire crystal glass.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'Accessories',
    stock: 80,
    rating: 4.4,
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High precision wireless gaming mouse with RGB lighting.',
    price: 79,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    category: 'Electronics',
    stock: 150,
    rating: 4.7,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopdb');
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedProducts();
