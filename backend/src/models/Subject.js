const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tárgy neve kötelező'],
      trim: true,
    },
    requirement: {
      type: String,
      enum: {
        values: ['Beadandó feladat', 'Zárthelyi dolgozat', 'Szóbeli vizsga'],
        message: '{VALUE} nem érvényes követelmény típus!',
      },
      required: [true, 'A követelmény típusát kötelező kiválasztani'],
    },
    taskTitle: {
      type: String,
      required: [true, 'A feladat címe kötelező'],
      trim: true,
    },
    deadline: {
      type: Date,
      required: [true, 'A határidő megadása kötelező'],
    },
    status: {
      type: String,
      enum: {
        values: ['hátralévő', 'folyamatban', 'befejezett'],
        message: '{VALUE} nem érvényes státusz!',
      },
      default: 'hátralévő',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Subject', SubjectSchema);
