const Contact = require("../models/contactModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");

// create contact
const createcontact = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(200).json( {
      status: true,
      message: "Enquery Form Submitted Successfully",
    });
  }
  catch (error) {
    throw new Error(error);
  }
});

//get All
const getAllcontacts = asyncHandler(async (req, res) => {
  try {
    const contact = await Contact.find();
    res
    .status(200)
    .json( {
      status: true,
      message: "Enquery Fetched Successfully",
      contact
    });
  }
  catch (error) {
    throw new Error(error);
  }
});

//get a
const getAcontact = asyncHandler(async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const contact = await Contact.findById(id);
    res.status(200).json( {
      status: true,
      message: "Enquery Fetched Successfully",
      contact
    });
  }
  catch (error) {
    throw new Error(error);
  }
});

//delete
const deleteAcontact = asyncHandler(async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    res.status(200).json( {
      status: true,
      message: "Enquery Delete Successfully",
    });
  }
  catch (error) {
    throw new Error(error);
  }
});

//update
const updatecontactStatus = asyncHandler(async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const contact = await Contact.findByIdAndUpdate(
      id,
      {
        status: req.body.status
      },
      {
        new: true
      }
    );
    res.status(200).json( {
      status: true,
      message: "Enquery Updated Successfully",
      contact
    });
  }
  catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createcontact,
  getAllcontacts,
  getAcontact,
  deleteAcontact,
  updatecontactStatus
};