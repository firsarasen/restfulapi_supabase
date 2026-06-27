import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async ({ name, email, password }) => {
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    throw new Error("Email sudah digunakan");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        name,
        email,
        password: hashedPassword,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const loginUser = async ({ email, password }) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Email tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password salah");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};