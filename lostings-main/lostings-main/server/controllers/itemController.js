const Item = require("../models/itemModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const cloudinary = require("../utils/cloudinaryConfig");
exports.createItem = catchAsyncError(async (req, res, next) => {
    if (!req.files) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    req.fields.creator = req.userData.userId;
    try {
      const result = await cloudinary.uploader.upload(req.files.image.path, {
        folder: "lostings", 
      });
      const item = await Item.create({
        ...req.fields,
        image:{
            url: result.secure_url, 
            public_id:result.public_id
        }

      });
      res.status(201).json({
        success: true,
        item,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });

exports.getLostItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({ type: "lost" });
  res.status(200).json({
    items,
  });
});

exports.getFoundItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({ type: "found" });
  res.status(200).json({
    items,
  });
});

exports.deleteItem = catchAsyncError(async (req, res, next) => {
  const item = await Item.findOneAndRemove({ _id: req.params.id });
  if (!item) {
    return next(new errorHandler("No items found", 404));
  }
  res.status(200).json({
    success: true,
    message: "item deleted successfully",
  });
});

exports.getItem = catchAsyncError(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return next(new errorHandler("No items found", 404));
  }
  res.status(200).json({
    success: true,
    item,
  });
});

exports.updateItem = catchAsyncError(async (req, res, next) => {
  let item = await Item.findById(req.params.id);

  if (!item) {
    return next(new errorHandler("Item not found", 404));
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    item,
  });
});

exports.getMyLostItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({ creator: req.userData.userId, type: "lost" });
  res.status(200).json({
    success: true,
    items,
  });
});
exports.getMyFoundItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find({
    creator: req.userData.userId,
    type: "found",
  });

  res.status(200).json({
    success: true,
    items,
  });
});
