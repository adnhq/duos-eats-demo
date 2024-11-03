"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, decrypt, deleteSession } from "./session";
import { supabase } from "./supabase";

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

export async function editRestaurant(formData: FormData) {
  const values = {
    name: formData.get("name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    cuisine: formData.get("cuisine"),
    address: formData.get("address"),
    location: formData.get("location"),
    logo: formData.get("logo"),
  };

  const isLogoFile = values.logo instanceof File;

  if (isLogoFile) {
    //upload the file
    const resLogoName = `${Math.random()}-${
      (values.logo as File).name
    }`.replaceAll("/", "");

    const resLogoUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/restaurantLogo/${resLogoName}`;

    const { error: uploadError } = await supabase.storage
      .from("restaurantLogo")
      .upload(resLogoName, values.logo as File);

    if (uploadError) throw uploadError;

    const dataToUpdate = {
      ...values,
      logo: resLogoUrl,
    };

    const { error: EditError } = await supabase
      .from("Restaurants")
      .update(dataToUpdate)
      .eq("id", formData.get("id"));

    if (EditError) throw EditError;
  } else {
    const { error: EditError } = await supabase
      .from("Restaurants")
      .update(values)
      .eq("id", formData.get("id"));

    if (EditError) throw EditError;
  }

  revalidatePath("/restaurant/Settings");
  return { success: true };
}

export async function getAllRestaurants() {
  const { data: Restaurants, error } = await supabase
    .from("Restaurants")
    .select("*")
    .neq("email", process.env.ADMIN_EMAIL)
    .eq("approved", true);

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

export async function login(formData: FormData) {
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data: restaurant, error } = await supabase
    .from("Restaurants")
    .select("*")
    .eq("email", user.email)
    .eq("approved", true);

  if (restaurant === null || restaurant?.length === 0) return;

  const isPasswordSame = await bcrypt.compare(
    user.password as string,
    restaurant[0].password
  );

  if (!isPasswordSame) return;

  const isAdmin = restaurant[0].email === process.env.ADMIN_EMAIL;

  await createSession(restaurant[0], isAdmin);
}

export async function logout() {
  await deleteSession();
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
