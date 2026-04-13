const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  email: { type: String, required: [true, 'Email is required'], trim: true, unique: true},
  name: { type: String, required: [true, 'Name is required'], trim: true},
  password: { type: String, required: [true, 'Password is required'], minLength: [6, 'Password must be at least 6 characters']},
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
},{timestamps: true}
)
const User = mongoose.model('User', postSchema);

module.exports = User