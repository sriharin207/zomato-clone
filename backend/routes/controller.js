const { jwtTokenGenerator } = require("../util/jwt");

const userModal = require("../models/userModal");
const mealItemsModal = require("../models/mealItemsModal");
const submitOrderModal = require("../models/submitOrders");

// @desc Get user Details
// @route GET /api/getLoginDetails
// @acess Private
async function verifyLoginDetails(req, res, next) {
  try {
    const { mobileNumber, password } = req.body;
    const userDetails = await userModal.findOne({ mobileNumber: mobileNumber });
    if (userDetails) {
      if (password === userDetails.password) {
        res.status(200).json({
          message: "User auth ok",
          jwtToken: jwtTokenGenerator(mobileNumber),
          userName: userDetails.firstName,
          mobileNumber,
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error(`User ${mobileNumber} doesn't exists in DB`);
    }
  } catch (error) {
    next(error);
  }
}

// @desc Create a new User
// @route POST /api/createUser
// @acess Private
async function createUser(req, res, next) {
  try {
    const newuserDetails = {
      mobileNumber: req.body.mobileNumber,
      password: req.body.password,
      firstName: req.body.firstName,
    };
    const isUserExists = await userModal.countDocuments({
      mobileNumber: newuserDetails.mobileNumber,
    });
    if (isUserExists === 0) {
      const newUser = await userModal.create(newuserDetails);
      res.status(200).json({
        message: "User created sucessfully",
        userCreated: newUser,
      });
    } else {
      throw new Error("User already exists in DB");
    }
  } catch (error) {
    next(error);
  }
}

// @desc Get Items List from DB
// @route GET /api/getItemsDetails
// @acess Private
async function getItemsDetails(req, res, next) {
  try {
    const mealsDB = await mealItemsModal.find({});
    res.status(200).json({ createdMeal: mealsDB });
  } catch (error) {
    next(error);
  }
}

// @desc Create a new order
// @route POST /api/submitOrder
// @acess Private
async function submitOrder(req, res, next) {
  try {
    const orderDetails = req.body;
    const createdOrder = await submitOrderModal.create(orderDetails);
    res.status(200).json({ createdOrder: createdOrder });
  } catch (error) {
    next(error);
  }
}

// @desc Get a Ordered Items Details
// @route GET /api//getOrderedItemsData
// @acess Private
async function getOrderedItemsData(req, res, next) {
  try {
    const orderDetails = req.body;
    const OrderedItems = await submitOrderModal.find({});
    if (OrderedItems.length > 0) {
      res.status(200).json({ OrderedItems: OrderedItems });
    } else {
      throw new Error("No Order found for the User");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  verifyLoginDetails,
  createUser,
  getItemsDetails,
  submitOrder,
  getOrderedItemsData,
};
