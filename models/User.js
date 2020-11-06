const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcript = require('bcrypt');

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
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    minlength: [6, 'Minimum password length is 6 charactors']
  },
  role: {
    type: String,
    default: 'basic',
    ref: 'Role'
  },
  proPic: {//initial login & update
    type: String,
  },
  location: {// initial login & update
    type: String,
    required: [true, 'Locaton is required']
  },
  contactNo: {// initial login
    type: String,
    required: [true, 'Contact number is required'],
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
  workCount: {
    type: Number,
    default: 0
  },
  skills: {
    type: [skillsSchema],
    default: []
  },
  providerRating: {
    type: [ratingSchema],
    default: []
  },
  seekerRating: {
    type: [ratingSchema],
    default: []
  },
  savedJobPosts: {
    type: [savedJobsSchema],
    default: []
  },
  appliedJobs: {
    type: [appliedJobs],
    default: []
  }

}, {timestamps: true});

userSchema.pre('save', async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
})

userSchema.static.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
}

const User = mongoose.model('User', userSchema);
module.exports = User;
