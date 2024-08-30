import connectMonogDB from "../../../libs/mongodb";
import Book from "../../../models/book";

export async function POST(req) {
  try {
    const data = await req.json(); // Parse the JSON body
    const newBook = new Book(data);
    const savedBook = await newBook.save();
    return new Response(
      JSON.stringify({
        message: "Book Created",
        book: savedBook,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectMonogDB();
    const books = await Book.find().exec();

    return new Response(JSON.stringify(books), {
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

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing ID parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectMonogDB();

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return new Response(JSON.stringify({ error: "Book not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Book Deleted" }), {
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
