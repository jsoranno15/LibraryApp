import connectMonogDB from "../../../libs/mongodb";
import User from "../../../models/user";

export async function GET(request) {
  try {
    await connectMonogDB();
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return new Response(JSON.stringify({ error: "UID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await User.findOne({ uid }).exec();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user), {
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

export async function POST(request) {
  try {
    await connectMonogDB();
    const { uid, email } = await request.json();

    if (!uid || !email) {
      return new Response(
        JSON.stringify({ error: "UID and email are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ uid }).exec();
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create a new user
    const newUser = new User({
      uid,
      email,
      library: [],
      favoriteBooks: [],
      quotes: [],
      dashboard: {
        booksRead: 0,
        currentBooks: [],
        favoriteBooks: [],
      },
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
