import User from "@/models/user.model";
import { connectToDB } from "@/db/db";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, password, email, tel} = reqBody;

        connectToDB();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: 'User Already Exists' }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = new User({
            username, 
            password: hashedPassword,
            email,
            tel
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch(error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
