import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/generateToken";

export class AuthService {
  static async register(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error("Name, Email & Password fields are required!");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      token: generateToken(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  static async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email & Password required!");
    }

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return {
      token: generateToken(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
