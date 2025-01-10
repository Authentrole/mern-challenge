const axios = require("axios");
const Product = require("../models/Product");

const seedDatabase = async (req, res) => {
    try {
        const { data } = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        await Product.deleteMany({});
        await Product.insertMany(data);
        res.status(200).json({ message: "Database seeded successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { seedDatabase };