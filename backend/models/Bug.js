const mongoose = require('mongoose');

const BugSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  severity: { 
    type: String, 
    enum: ["low", "medium", "high", "critical"], 
    required: true 
  },
  reward: { 
    type: Number, 
    required: true 
  }, // USD or Crypto equivalent
  companyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // Company who posted
  status: { 
    type: String, 
    enum: ["open", "in_progress", "closed"], 
    default: "open" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Bug', BugSchema);