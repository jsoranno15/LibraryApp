import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: String,
    author: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
