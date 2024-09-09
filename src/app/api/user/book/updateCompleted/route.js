import connectMonogDB from "../../../../../libs/mongodb"; // Update path as necessary
import User from "../../../../../models/user"; // Update path as necessary

export async function PATCH(request) {
  try {
    await connectMonogDB();

    const { uid, bookId } = await request.json();

    if (!uid || !bookId) {
      return new Response(
        JSON.stringify({ error: "UID and bookId are required" }),
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

    const book = user.library.find(
      (libraryBook) => libraryBook.bookId === bookId
    );

    if (!book) {
      return new Response(
        JSON.stringify({ error: "Book not found in library" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    book.progress.completed = !(book.progress.completed ?? false);
    await user.save();

    return new Response(
      JSON.stringify({ message: "Book completion status updated" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
