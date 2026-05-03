import mongoose from "mongoose";
import dotenv from "dotenv";
import Crypto from "./models/Crypto.js";

dotenv.config();

const seedData = [
  { rank:1, name:"Bitcoin",   symbol:"BTC",   price:64200,  change:2.3,  marketCap:"1.26T", volume:"34.2B", circulatingSupply:"19.6M BTC",  description:"Bitcoin is a decentralized digital currency that operates without a central authority or bank." },
  { rank:2, name:"Ethereum",  symbol:"ETH",   price:3200,   change:-1.4, marketCap:"385B",  volume:"18.6B", circulatingSupply:"120M ETH",    description:"Ethereum is a decentralized platform that enables developers to build and deploy smart contracts and dApps." },
  { rank:3, name:"Solana",    symbol:"SOL",   price:150,    change:4.1,  marketCap:"65B",   volume:"5.2B",  circulatingSupply:"440M SOL",    description:"Solana is a high-performance blockchain supporting builders around the world creating crypto apps." },
  { rank:4, name:"Cardano",   symbol:"ADA",   price:0.65,   change:-2.8, marketCap:"23B",   volume:"1.3B",  circulatingSupply:"35B ADA",     description:"Cardano is a proof-of-stake blockchain platform designed to enable changemakers and innovators." },
  { rank:5, name:"XRP",       symbol:"XRP",   price:0.72,   change:1.9,  marketCap:"39B",   volume:"2.1B",  circulatingSupply:"54B XRP",     description:"XRP is the native cryptocurrency of the XRP Ledger, built for fast, low-cost international payments." },
  { rank:6, name:"Dogecoin",  symbol:"DOGE",  price:0.14,   change:5.7,  marketCap:"19B",   volume:"900M",  circulatingSupply:"140B DOGE",   description:"Dogecoin started as a meme cryptocurrency but has grown into a widely recognized digital asset." },
  { rank:7, name:"Avalanche", symbol:"AVAX",  price:38,     change:-0.9, marketCap:"14B",   volume:"620M",  circulatingSupply:"365M AVAX",   description:"Avalanche is a decentralized platform for launching highly scalable applications and blockchain networks." },
  { rank:8, name:"Polkadot",  symbol:"DOT",   price:7.8,    change:2.2,  marketCap:"10B",   volume:"420M",  circulatingSupply:"1.2B DOT",    description:"Polkadot enables different blockchains to transfer messages and value in a trust-free fashion." },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Crypto.deleteMany({});
    console.log("🗑️  Cleared existing cryptos");

    await Crypto.insertMany(seedData);
    console.log(`🌱 Seeded ${seedData.length} cryptocurrencies`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();
