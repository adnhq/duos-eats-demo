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

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   price: z.number().min(0, {
//     message: "Price must be a positive number.",
//   }),
//   description: z.string().optional(),
//   category: z.string().min(1, {
//     message: "Category is required.",
//   }),
//   image: z.instanceof(File).optional(),
//   isPopular: z.boolean().default(false),
//   extraParams: z
//     .array(
//       z.object({
//         name: z.string().min(1, "Parameter name is required"),
//         options: z.array(z.string().min(1, "Option cannot be empty")),
//       })
//     )
//     .optional(),
// });

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
    .insert([{ ...values, image: itemImageUrl, restaurantId: 9 }])
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

  // console.log(extraParams);
  // console.log(values);

  // Simulate a delay to mimic database operation
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Menu items added successfully",
    data: values, // Optional: return the processed data
  };
}
