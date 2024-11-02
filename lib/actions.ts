"use server";

import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

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
    .select("*")
    .neq("email", process.env.ADMIN_EMAIL);

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

export async function getRestaurantMenuCategories(id: number) {
  const { data: menuCategories, error } = await supabase
    .from("Menu")
    .select("category")
    .eq("restaurantId", id);

  if (error) throw error;

  let categories: string[] = [];

  menuCategories?.forEach((value, idx) => {
    if (!categories.includes(value.category)) categories.push(value.category);
  });

  return categories;
}

export async function getRestaurantMenu(id: number) {
  const { data: menu, error } = await supabase
    .from("Menu")
    .select("*")
    .eq("restaurantId", id);

  if (error) throw error;

  return menu;
}

export async function addMenuItem(formData: FormData) {
  // Parse extraParams properly
  const extraParamsString = formData.get("extraParams");
  const extraParams = extraParamsString
    ? JSON.parse(extraParamsString as string)
    : [];

  const values = {
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    popular: formData.get("popular"),
    category: formData.get("category"),
    image: formData.get("image"),
    restaurantId: formData.get("restaurantId"),
  };

  const itemImageName = `${Math.random()}-${
    (values.image as File).name
  }`.replaceAll("/", "");

  const itemImageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/menuItemImage/${itemImageName}`;

  const { error: uploadError } = await supabase.storage
    .from("menuItemImage")
    .upload(itemImageName, values.image as File);

  if (uploadError) throw uploadError;

  const { data: itemData, error: itemUploadError } = await supabase
    .from("Menu")
    .insert([{ ...values, image: itemImageUrl }])
    .select("*");

  if (itemUploadError) throw itemUploadError;

  if (extraParams.length > 0) {
    for (let i = 0; i < extraParams.length; i++) {
      const { data: paramData, error: paramUploadError } = await supabase
        .from("MenuParameters")
        .insert([{ ...extraParams[i], menuId: itemData[0].id }])
        .select();

      if (paramUploadError) throw paramUploadError;
    }
  }

  return {
    success: true,
    message: "Menu items added successfully",
    data: values, // Optional: return the processed data
  };
}

export async function getUnapprovedRestaurants() {
  const { data: Restaurants, error } = await supabase
    .from("Restaurants")
    .select("*")
    .eq("approved", false)
    .neq("email", process.env.ADMIN_EMAIL)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return Restaurants;
}

export async function approveRestaurant(id: number) {
  const { error } = await supabase
    .from("Restaurants")
    .update({ approved: true })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/admin-dashboard");
}

export async function rejectRestaurant(id: number) {
  const { data: restaurant, error: notFoundError } = await supabase
    .from("Restaurants")
    .select("*")
    .eq("id", id);

  if (notFoundError) throw notFoundError;

  const { error: deleteError } = await supabase
    .from("Restaurants")
    .delete()
    .eq("id", id);

  if (deleteError) throw deleteError;

  const imageName = restaurant[0].logo.split("restaurantLogo/")[1];
  console.log(imageName);

  const { error: fileDeleteError } = await supabase.storage
    .from("restaurantLogo")
    .remove([imageName]);

  if (fileDeleteError) throw fileDeleteError;

  revalidatePath("/admin-dashboard");
}
// authentication

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3600 sec from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user

  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data: restaurant, error } = await supabase
    .from("Restaurants")
    .select("*")
    .eq("email", user.email)
    .eq("approved", true);

  console.log(restaurant);

  if (restaurant === null || restaurant?.length === 0) return;

  const isPasswordSame = await bcrypt.compare(
    user.password as string,
    restaurant[0].password
  );

  if (!isPasswordSame) {
    console.log("milenai");
    return;
  }

  console.log("milse");

  // Create the session
  const expires = new Date(Date.now() + 3600 * 1000);
  const session = await encrypt({
    ...restaurant[0],
    isAdmin: restaurant[0].email === process.env.ADMIN_EMAIL,
    expires,
  });

  // Save the session in a cookie
  const cookieStore = await cookies();

  cookieStore.set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  const cookieStore = await cookies();
  // Destroy the session
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
