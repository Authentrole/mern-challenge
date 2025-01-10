const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Route to fetch transactions for a specific month and page
router.get('/', async (req, res) => {
  const { month, page = 1 } = req.query;

  // Find transactions for the given month (e.g., '2025-03') and paginate
  try {
    const transactions = await Transaction.find({ date: { $regex: `^${month}` } })
      .skip((page - 1) * 10) // Paginate (10 transactions per page)
      .limit(10);
    
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Server Error');
  }
});

// Route to fetch transaction statistics for a specific month
router.get('/stats', async (req, res) => {
  const { month } = req.query;

  // Aggregate data to get total sales, sold items, and not sold items
  try {
    const stats = await Transaction.aggregate([
      { $match: { date: { $regex: `^${month}` } } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" },
          soldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          notSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } },
        },
      },
    ]);

    res.json(stats[0] || {});
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).send('Server Error');
  }
});

// Route to search transactions by title, description, or price for a specific month
router.get('/search', async (req, res) => {
  const { month, query } = req.query;

  try {
    const transactions = await Transaction.find({
      date: { $regex: `^${month}` },
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { price: query },
      ],
    });

    res.json(transactions);
  } catch (error) {
    console.error('Error searching transactions:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
