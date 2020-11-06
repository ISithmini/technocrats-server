const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  category: String,
  description: String
});

const ratingSchema = new mongoose.Schema({
  rating: Number,
  jobId: {
    type: mongoose.Types.ObjectId,
    ref: 'Job'
  },
  review: String //add a ref //////////////////////////////////////////////// 
});

const savedJobsSchema = new mongoose.Schema({
  jobPostId: {
    type: mongoose.Types.ObjectId,
    ref: 'Job',
  } // add a ref ///////////////////////////////////////////
});

const appliedJobs = new mongoose.Schema({ 
  jobPostId: {
    type:mongoose.Types.ObjectId,
    ref: 'Job'
  }, // add a ref ///////////////////////////////////////////
  status: { //pending accepted rejected
    type: String, 
    default: 'pending'
  }
})

const userSchema = new mongoose.Schema({
  name: {//intial login & update
    type: String,
    required: true,
    trim: true
  },
  proPic: {//initial login & update
    type: String,
  },
  location: {// initial login & update
    type: String,
    required: true
  },
  contactNo: {// initial login
    type: Number,
    required: true,
    unique: true
  },
  activeStatus: {
    type: Date
  },
  bio: {// initial login & update
    type: String,
  },
  level: {
    type: Number,
    default: 1
  },
  isDissable: {// put this true when a user under examin for some policy issue
    type: Boolean,
    default: false
  },
  verifyStatus: {
    type: Boolean,
    default: false
  },
  jobsCount: {// update on post job and delete
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

}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
