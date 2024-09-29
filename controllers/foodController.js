import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  let image_filename = req.file ? req.file.filename : "";

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({success: true, message: "Food added successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Error adding food"});
  }
};

// all food list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({success: true, data: foods});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error fetching food list"});
  }
};

// remove food item

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    req.json({success: true, message: "Food removed successfully"});

  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error removing food"});
  }
};

export { addFood, listFood, removeFood };