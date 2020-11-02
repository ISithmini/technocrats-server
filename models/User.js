const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  category: String,
  description: String
});

const ratingSchema = new mongoose.Schema({
  rating: Number,
  jobId: mongoose.Types.ObjectId, //add a ref //////////////////////////////////////////////// 
});

const savedJobsSchema = new mongoose.Schema({
  jobPostId: mongoose.Types.ObjectId, // add a ref ///////////////////////////////////////////
});

const appliedJobs = new mongoose.Schema({ 
  jobPostId: mongoose.Types.ObjectId, // add a ref ///////////////////////////////////////////
  status: { //pending accepted rejected
    type: String, 
    default: 'pending'
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  proPic: {
    type: String,
  },
  location: {
    type: String,
    required: true
  },
  contactNo: {
    type: Number,
    required: true
  },
  activeStatus: {
    type: Date
  },
  bio: {
    type: String,
  },
  level: {
    type: Number,
    default: 1
  },
  verifyStatus: {
    type: Boolean,
    default: false
  },
  jobsCount: {
    type: Number,
    default: 0
  },
  skills: {
    type: [skillsSchema],
  },
  providerRating: {
    type: [ratingSchema],
  },
  seekerRating: {
    type: [ratingSchema],
  },
  savedJobPosts: {
    type: [savedJobsSchema],
  },
  appliedJobs: {
    type: [appliedJobs],
  }

}, {timestamps: true})
