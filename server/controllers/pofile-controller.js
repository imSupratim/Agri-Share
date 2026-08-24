import User from "../models/User.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error is getProfile function");
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, profileImage, address } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }


    if (address !== undefined) {
      if (address.street !== undefined) {
        user.address.street = address.street;
      }

      if (address.village !== undefined) {
        user.address.village = address.village;
      }

      if (address.district !== undefined) {
        user.address.district = address.district;
      }

      if (address.state !== undefined) {
        user.address.state = address.state;
      }

      if (address.pincode !== undefined) {
        user.address.pincode = address.pincode;
      }
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
