const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Solved', 'Revised'],
      default: 'Pending',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Problem', problemSchema);
