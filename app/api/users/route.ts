import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user.model';
import { connectToDB } from '@/db/db';

export async function GET(request: NextRequest) {
    try {
      await connectToDB();

      const allUsers = await User.find().select('-password');;

      return NextResponse.json(allUsers, { status: 200 });
    } catch (err) {
      console.error(err);
      return new NextResponse("Failed to get all users", { status: 500 });
    }
  }