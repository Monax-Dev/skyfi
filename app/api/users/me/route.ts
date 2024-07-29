import { getDataFromToken } from '@/helpers/getDataFromToken'
import { NextRequest, NextResponse } from 'next/server'
import User from "@/models/user.model"
import { connectToDB } from "@/db/db";

connectToDB()

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password")
        return NextResponse.json({
            message: "User found",
            data: user,
        })
    } catch (error:any) {
        return NextResponse.json({ error: error.message}, {status: 400})
        
    }
}

export async function PUT(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const body = await request.json()
        
        const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true, runValidators: true }).select("-password")
        
        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return NextResponse.json({
            message: "User updated",
            data: updatedUser,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        
        const deletedUser = await User.findByIdAndDelete(userId).select("-password")
        
        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        return NextResponse.json({
            message: "User deleted",
            data: deletedUser,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}