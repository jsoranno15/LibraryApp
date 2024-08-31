// pages/api/user/addBook.js
import connectMonogDB from "../../../../libs/mongodb"; // Update path as necessary
import User from "../../../../models/user"; // Update path as necessary

export async function POST(request) {
  try {
    await connectMonogDB();

    const { uid, book } = await request.json();

    if (!uid || !book) {
      return new Response(
        JSON.stringify({ error: "UID and book data are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const user = await User.findOne({ uid }).exec();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const bookExists = user.library.some(
      (libraryBook) => libraryBook.bookId === book.bookId
    );

    if (bookExists) {
      return res.status(400).json({ error: "Book already in library" });
    }

    user.library.push(book);
    await user.save();

    return new Response(JSON.stringify({ message: "Book added to library" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
