"use server";

import { z } from "zod";
import { supabase } from "./supabase";
import bcrypt from "bcrypt";

const restaurantFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().min(10),
  cuisine: z.string(),
  address: z.string().min(10),
  location: z.string(),
  logo: z.any().optional(),
});

export async function registerRestaurant(formData: FormData) {
  const values = {
    name: formData.get("restaurantName"),
    email: formData.get("email"),
    password: formData.get("password"),
    phoneNumber: formData.get("phone"),
    cuisine: formData.get("cuisine"),
    address: formData.get("address"),
    location: formData.get("location"),
    logo: formData.get("logo"),
  };

  const validatedFields = restaurantFormSchema.safeParse(values);

  const resLogoName = `${Math.random()}-${
    (values.logo as File).name
  }`.replaceAll("/", "");

  const resLogoUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/restaurantLogo/${resLogoName}`;

  if (!validatedFields.success) {
    return { error: "Invalid form data" };
  }

  try {
    const { error: uploadError } = await supabase.storage
      .from("restaurantLogo")
      .upload(resLogoName, values.logo as File);

    if (uploadError) throw uploadError;

    // Hash the password with bcrypt
    const saltRounds = 2;
    const hashedPassword = await bcrypt.hash(
      values.password as string,
      saltRounds
    );

    // Replace the plain password with the hashed one
    const dataToInsert = {
      ...values,
      password: hashedPassword,
      logo: resLogoUrl,
    };

    const { error } = await supabase.from("Restaurants").insert([dataToInsert]);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error during registration:", error);
    return { error: "Failed to register restaurant" };
  }
}

export async function getAllRestaurants() {
  const { data: Restaurants, error } = await supabase
    .from("Restaurants")
    .select("*");

  if (error) throw error;

  return Restaurants;
}

export async function getRestaurant(restaurantId: string) {
  const { data: Restaurant, error } = await supabase
    .from("Restaurants")
    .select("*")
    .eq("id", restaurantId);

  if (error) throw error;

  return Restaurant;
}
