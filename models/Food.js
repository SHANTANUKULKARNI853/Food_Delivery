const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  costForTwo: { type: Number, required: true },
  imageUrl: { type: String },
  description: { type: String },
  category: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
