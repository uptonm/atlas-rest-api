const mongoose = require("mongoose");
const User = mongoose.model("users");

exports.get = async (req, res) => {
  const response = await User.find({});
  res.send(response);
};
exports.getOne = async (req, res) => {
  const response = await User.findById(req.params.id);
  res.send(response);
};
exports.post = async (req, res) => {
  const response = await new User(req.body).save();
  res.send(response);
};
exports.put = async (req, res) => {
  const response = await User.findByIdAndUpdate(req.params.id, req.body);
  res.send(response);
};
exports.delete = async (req, res) => {
  const response = await User.findByIdAndDelete(req.params.id);
  res.send(response);
};
