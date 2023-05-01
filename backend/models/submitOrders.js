const mongoose = require("mongoose");

const submitOrders = mongoose.Schema(
  {
    finalBillAmount: {
      type: Number,
      required: true,
    },
    orderedDateTime: {
      type: String,
      required: true,
    },
    orderedItems: [mongoose.Schema.Types.Mixed],
    userDetails: {
      address: {
        type: String,
      },
      mobileNum: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      pincode: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ordereditems", submitOrders);
