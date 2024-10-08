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

    // Toggle favorite status
    const isCurrentlyFavorite = book.favorite ?? false;
    const newFavoriteStatus = !isCurrentlyFavorite;

    // Check if adding the book as favorite exceeds the limit
    if (newFavoriteStatus) {
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

    // Update the book's favorite status
    book.favorite = newFavoriteStatus;
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
