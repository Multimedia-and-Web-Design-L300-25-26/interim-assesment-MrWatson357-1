import User from "../models/User.js";

// GET /user/profile — Get logged-in user's profile (protected)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching profile." });
  }
};
