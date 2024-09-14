import dbConnect from '../../../dbConfig/config';
import User from '../../../models/model';
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";


export default async function POST(req) {
  await dbConnect();
  try {
    const reqBody = await req.json()
    const { name, email, password, employeeID } = reqBody

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      employeeID,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}