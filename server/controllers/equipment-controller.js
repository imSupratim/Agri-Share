import Equipment from "../models/Equipment.js";

export const createEquipment = async (req, res, next) => {
  try {
    const {
      name,
      category,
      brand,
      model,
      description,
      pricePerDay,
      securityDeposit,
      location,
      images,
    } = req.body;

    if (!name || !category || pricePerDay === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, category and price per day are required",
      });
    }

    const equipment = await Equipment.create({
      owner: req.user._id,
      name,
      category,
      brand,
      model,
      description,
      pricePerDay,
      securityDeposit,
      location,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Equipment added successfully",
      equipment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.find()
      .populate("owner", "name email profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: equipment.length,
      equipment,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: equipment.length,
      equipment,
    });
  } catch (error) {
    next(error);
  }
};

export const getEquipmentById = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate("owner", "name email phone profileImage address");

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    res.status(200).json({
      success: true,
      equipment,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    if (equipment.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this equipment",
      });
    }

    const {
      name,
      category,
      brand,
      model,
      description,
      pricePerDay,
      securityDeposit,
      location,
      images,
      status,
    } = req.body;

    if (name !== undefined) equipment.name = name;
    if (category !== undefined) equipment.category = category;
    if (brand !== undefined) equipment.brand = brand;
    if (model !== undefined) equipment.model = model;
    if (description !== undefined) equipment.description = description;
    if (pricePerDay !== undefined) equipment.pricePerDay = pricePerDay;
    if (securityDeposit !== undefined) {
      equipment.securityDeposit = securityDeposit;
    }

    if (location !== undefined) {
      equipment.location = {
        ...equipment.location.toObject(),
        ...location,
      };
    }

    if (images !== undefined) equipment.images = images;
    if (status !== undefined) equipment.status = status;

    await equipment.save();

    res.status(200).json({
      success: true,
      message: "Equipment updated successfully",
      equipment,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    if (equipment.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this equipment",
      });
    }

    await equipment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Equipment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};