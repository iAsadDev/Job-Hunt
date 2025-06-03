const  mongoose = require('mongoose');
const JobSchema  = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    postedDate: {
        type: Date,
        default: Date.now,
    },
    contact: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},  {timestamps: true});

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;