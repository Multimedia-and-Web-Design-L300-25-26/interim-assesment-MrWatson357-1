import express from "express";
import {
  getAllCryptos,
  getGainers,
  getNewListings,
  addCrypto,
} from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/", getAllCryptos);         // GET /crypto
router.get("/gainers", getGainers);    // GET /crypto/gainers
router.get("/new", getNewListings);    // GET /crypto/new
router.post("/", addCrypto);           // POST /crypto

export default router;
