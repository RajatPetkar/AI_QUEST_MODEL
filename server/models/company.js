import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  industry: {
    type: String,
    required: true
  },
  founded: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Company', companySchema);