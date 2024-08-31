import { getIdTokenResult } from "firebase/auth";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookProgressSchema = new Schema({
  totalPages: { type: Number, required: true },
  pagesRead: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
});

const BookSchema = new Schema({
  bookId: { type: String, required: true },
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  image: { type: String, require: true },
  genres: { type: [String], required: true },
  favorite: { type: Boolean, default: false },
  progress: { type: BookProgressSchema, required: false },
});

const ReviewSchema = new Schema({
  bookId: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
});

const DashboardSchema = new Schema({
  booksRead: { type: Number, default: 0 },
  currentBooks: [
    {
      bookId: { type: String, required: true },
      progress: { type: Number, default: 0 },
    },
  ],
  favoriteBooks: [String],
});

const UserSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  library: [BookSchema],
  favoriteBooks: [String],
  quotes: [String],
  dashboard: { type: DashboardSchema, required: true },
  reviews: [ReviewSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
