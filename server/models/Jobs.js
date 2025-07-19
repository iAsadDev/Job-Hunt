const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a job title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"]
  },
  description: {
    type: String,
    required: [true, "Please provide a job description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"]
  },
  company: {
    type: String,
    required: [true, "Please provide a company name"],
    maxlength: [50, "Company name cannot be more than 50 characters"]
  },
  location: {
    type: String,
    required: [true, "Please provide a location"],
    maxlength: [100, "Location cannot be more than 100 characters"]
  },
  salary: {
    type: Number,
    required: [true, "Please provide a salary"],
    min: [0, "Salary cannot be negative"]
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  contact: {
    type: String,
    required: [true, "Please provide contact information"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email"
    ]
  },
  requirements: {
    type: String,
    required: [true, "Please provide job requirements"],
    maxlength: [500, "Requirements cannot be more than 500 characters"]
  },
  responsibilities: {
    type: String,
    default: "Not specified",
    maxlength: [500, "Responsibilities cannot be more than 500 characters"]
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    required: [true, "Please provide job type"]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Index for better performance on frequently queried fields
JobSchema.index({ title: 'text', description: 'text', company: 'text', location: 'text' });

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;