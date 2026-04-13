const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true, minLength: [50, 'Title must be  50 characters']},
  content: { type: String, required: [true, 'Content is required'], minLength: [500, 'Content must be  500 characters']},
  author: { type: String, required: [true, 'Author is required'], trim: true},
    tags: { type: Array , default: [] },
},{timestamps: true}
)
const Post = mongoose.model('Post', postSchema);

module.exports = Post
