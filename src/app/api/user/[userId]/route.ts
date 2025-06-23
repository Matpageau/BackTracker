import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

type Params = {
  params: {
    userId: string;
  };
};

export async function GET({ params }: Params) {
  await connectToDatabase();

  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ message: "User ID missing" }, { status: 400 });
  }

  try {
    const user = await User.findById(userId)
      .select("-password")
      .lean()

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
  }
}
