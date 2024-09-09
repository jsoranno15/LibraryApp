import connectMonogDB from "../../../../../libs/mongodb"; // Update path as necessary
import User from "../../../../../models/user"; // Update path as necessary

export async function PATCH(request) {
  try {
    await connectMonogDB();

    const { uid, bookId, favorite } = await request.json();

    if (!uid || !bookId || typeof favorite !== "boolean") {
      return new Response(
        JSON.stringify({
          error: "UID, bookId, and favorite status are required",
        }),
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

    if (favorite) {
      // Check if the user already has 3 favorite books
      const favoriteCount = user.library.filter(
        (libraryBook) => libraryBook.favorite
      ).length;

      if (favoriteCount >= 3) {
        return new Response(
          JSON.stringify({ error: "Cannot have more than 3 favorite books" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Update the favorite status
    book.favorite = favorite;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Book favorite status updated" }),
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
