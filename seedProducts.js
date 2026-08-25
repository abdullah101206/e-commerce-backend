// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Product = require("./models/Product");

// dotenv.config();

// const sampleProducts = [
//   {
//     title: "AURA Signature Black Silk Suit",
//     description: "Premium handcrafted black silk suit with detailed embroidery.",
//     price: 299.99,
//     category: "Clothing",
//     subCategory: "Formal",
//     image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=compress&cs=tinysrgb&w=600",
//     images: [
//       "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=compress&cs=tinysrgb&w=600"
//     ],
//     stockCount: 15,
//     isFeatured: true
//   },
//   {
//     title: "Velvet Evening Gown",
//     description: "Luxurious deep red velvet gown designed for high-end gala events.",
//     price: 450.00,
//     category: "Clothing",
//     subCategory: "Dresses",
//     image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=compress&cs=tinysrgb&w=600",
//     images: [
//       "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=compress&cs=tinysrgb&w=600"
//     ],
//     stockCount: 8,
//     isFeatured: true
//   },
//   {
//     title: "AURA Leather Weekend Bag",
//     description: "Full-grain genuine leather travel bag with gold accents.",
//     price: 180.00,
//     category: "Accessories",
//     subCategory: "Bags",
//     image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=compress&cs=tinysrgb&w=600",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=compress&cs=tinysrgb&w=600"
//     ],
//     stockCount: 25,
//     isFeatured: false
//   }
// ];

// const seedData = async () => {
//   try {
//     console.log("Connecting to Database...");
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected Successfully!");

//     await Product.deleteMany();
//     console.log("Old products removed.");

//     await Product.insertMany(sampleProducts);
//     console.log("Sample Products Added Successfully!");

//     process.exit();
//   } catch (error) {
//     console.error(`Seeding Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// seedData();