import Crypto from "../models/Crypto.js";

// GET /crypto — All cryptocurrencies sorted by rank
export const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ rank: 1 });
    res.status(200).json({ success: true, count: cryptos.length, data: cryptos });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching cryptos." });
  }
};

// GET /crypto/gainers — Top gainers (positive change, sorted high to low)
export const getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({ change: { $gt: 0 } }).sort({ change: -1 });
    res.status(200).json({ success: true, count: gainers.length, data: gainers });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching gainers." });
  }
};

// GET /crypto/new — Newest listings (sorted by createdAt descending)
export const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ success: true, count: newListings.length, data: newListings });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching new listings." });
  }
};

// POST /crypto — Add new cryptocurrency
export const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change, marketCap, volume, circulatingSupply, description } = req.body;

    if (!name || !symbol || price === undefined || change === undefined) {
      return res.status(400).json({ message: "Name, symbol, price and 24h change are required." });
    }

    // Check if symbol already exists
    const existing = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existing) {
      return res.status(400).json({ message: `A crypto with symbol ${symbol.toUpperCase()} already exists.` });
    }

    // Auto-assign rank
    const count = await Crypto.countDocuments();

    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      change,
      image: image || "",
      marketCap: marketCap || "N/A",
      volume: volume || "N/A",
      circulatingSupply: circulatingSupply || "N/A",
      description: description || "",
      rank: count + 1,
    });

    res.status(201).json({ success: true, data: crypto });
  } catch (error) {
    console.error("Add crypto error:", error);
    res.status(500).json({ message: "Server error adding crypto." });
  }
};
