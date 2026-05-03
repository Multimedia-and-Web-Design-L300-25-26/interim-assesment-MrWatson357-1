import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, "Symbol is required"],
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    change: {
      type: Number,
      required: [true, "24h change is required"],
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    marketCap: {
      type: String,
      default: "N/A",
    },
    volume: {
      type: String,
      default: "N/A",
    },
    circulatingSupply: {
      type: String,
      default: "N/A",
    },
    rank: {
      type: Number,
      default: 999,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Crypto", cryptoSchema);
