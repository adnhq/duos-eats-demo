"use server";

import bcrypt from "bcrypt";
import { JWTPayload } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { createSession, decrypt, deleteSession } from "./session";
import { supabase } from "./supabase";

// authentication

export async function restaurantLogin(formData: FormData) {
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data: restaurant, error: restaurantLoginError } = await supabase
    .from("Restaurants")
    .select("*")
    .eq("email", user.email)
    .eq("approved", true);

  if (restaurantLoginError) throw restaurantLoginError;

  if (restaurant === null || restaurant?.length === 0)
    throw new Error("Restaurant not found");

  const isPasswordSame = await bcrypt.compare(
    user.password as string,
    restaurant[0].password
  );

  if (!isPasswordSame) throw new Error("Incorrect password");

  await createSession({
    name: restaurant[0].name,
    email: restaurant[0].email,
    id: restaurant[0].id,
    role: "restaurant",
  });
}

export async function userLogin(formData: FormData) {
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data: fetchedUsers, error: userLoginError } = await supabase
    .from("Users")
    .select("*")
    .eq("email", user.email);

  if (userLoginError) throw userLoginError;

  if (fetchedUsers === null || fetchedUsers?.length === 0)
    throw new Error("User not found");

  const isPasswordSame = await bcrypt.compare(
    user.password as string,
    fetchedUsers[0].password
  );

  if (!isPasswordSame) throw new Error("Incorrect password");

  const isAdmin = fetchedUsers[0].email === process.env.ADMIN_EMAIL;

  await createSession({
    name: fetchedUsers[0].name,
    email: fetchedUsers[0].email,
    id: fetchedUsers[0].id,
    role: isAdmin ? "admin" : "user",
  });
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

export async function registerUser(formData: FormData) {
  const { data: existingData, error: emailAlreadyExistsError } = await supabase
    .from("Users")
    .select("*")
    .eq("email", formData.get("email"));

  if (emailAlreadyExistsError) throw emailAlreadyExistsError;

  if (existingData.length > 0) throw new Error("Email already exists");

  const values = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phoneNumber: formData.get("phoneNumber"),
  };

  // Hash the password with bcrypt

  const hashedPassword = await bcrypt.hash(
    values.password as string,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );

  // Replace the plain password with the hashed one
  const dataToInsert = {
    ...values,
    password: hashedPassword,
  };

  const { error } = await supabase.from("Users").insert([dataToInsert]);

  if (error) throw error;

  return { success: true };
}

const restaurantFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().min(10),
  cuisine: z.string(),
  address: z.string().min(10),
  location: z.string(),
  logo: z.any().optional(),
  discount: z.string().regex(/^(?:[1-9]|[1-4][0-9]|50)$/),
});

export async function registerRestaurant(formData: FormData) {
  const { data: existingData, error: emailAlreadyExistsError } = await supabase
    .from("Restaurants")
    .select("*")
    .eq("email", formData.get("email"));

  if (emailAlreadyExistsError) throw emailAlreadyExistsError;

  if (existingData.length > 0) throw new Error("Email already exists");

  const values = {
    name: formData.get("restaurantName"),
    email: formData.get("email"),
    password: formData.get("password"),
    phoneNumber: formData.get("phone"),
    cuisine: formData.get("cuisine"),
    address: formData.get("address"),
    location: formData.get("location"),
    logo: formData.get("logo"),
    discount: formData.get("discount"),
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

    const hashedPassword = await bcrypt.hash(
      values.password as string,
      Number(process.env.BCRYPT_SALT_ROUNDS)
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

export async function editRestaurantDiscount(formData: FormData) {
  const session = await getSession();

  if (
    Number((session as JWTPayload).id) !== Number(formData.get("restaurantId"))
  )
    throw new Error("You are not authorized to edit this item");

  const { error: EditError } = await supabase
    .from("Restaurants")
    .update({
      discount: formData.get("discount"),
    })
    .eq("id", formData.get("restaurantId"));

  if (EditError) throw EditError;

  revalidatePath("/restaurant/Settings");
  return { success: true };
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

  revalidatePath("/restaurant");
  return { success: true };
}

export async function editRestaurantPassword(formData: FormData) {
  const { data: restaurants, error: notFoundError } = await supabase
    .from("Restaurants")
    .select("*")
    .eq("id", formData.get("id"));

  if (notFoundError) throw notFoundError;

  const isCurPassSame = await bcrypt.compare(
    formData.get("currentPassword") as string,
    restaurants[0].password
  );

  if (!isCurPassSame) throw new Error("Incorrect password");

  const hashedPassword = await bcrypt.hash(
    formData.get("newPassword") as string,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );

  const { error: EditError } = await supabase
    .from("Restaurants")
    .update({
      password: hashedPassword,
    })
    .eq("id", formData.get("id"));

  if (EditError) throw EditError;

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

export async function getRestaurant(restaurantId: any) {
  const { data: Restaurant, error } = await supabase
    .from("Restaurants")
    .select("*")
    .eq("id", restaurantId);

  if (error) throw error;

  return Restaurant;
}

export async function getRestaurantMenuCategories(id: any) {
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

export async function getRestaurantMenu(id: any) {
  const { data: menu, error } = await supabase
    .from("Menu")
    .select("*, MenuParameters(name, options)")
    .eq("restaurantId", id);

  if (error) throw error;

  return menu;
}

export async function getRestaurantMenuItem(id: string) {
  const { data: menu, error } = await supabase
    .from("Menu")
    .select("*, MenuParameters(name, options)")
    .eq("id", id);

  if (error || menu.length === 0) throw new Error("Menu item not found");

  return { ...menu[0], extraParams: menu[0].MenuParameters };
}

export async function addMenuItem(formData: FormData) {
  // Parse extraParams properly
  const extraParamsString = formData.get("extraParams");
  const extraParams = extraParamsString
    ? JSON.parse(extraParamsString as string)
    : [];

  console.log(extraParams);
  const values = {
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    popular: formData.get("popular"),
    category: formData.get("category"),
    image: formData.get("image"),
    restaurantId: formData.get("restaurantId"),
  };

  if (values.image instanceof File) {
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
  } else {
    const { data: itemData, error: itemUploadError } = await supabase
      .from("Menu")
      .insert([values])
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
  }

  return {
    success: true,
    message: "Menu items added successfully",
    data: values, // Optional: return the processed data
  };
}

export async function editMenuItem(formData: FormData) {
  // checking authorization first
  const session = await getSession();
  if (!session) throw new Error("Please sign in to your account first!");

  // retrieve the old menu item
  const editMenuId = formData.get("editMenuId");
  const { data: menuItems, error: notFoundError } = await supabase
    .from("Menu")
    .select("*")
    .eq("id", editMenuId);

  if (notFoundError || menuItems.length === 0) throw notFoundError;

  if (Number((session as JWTPayload).id) !== Number(menuItems[0].restaurantId))
    throw new Error("You are not authorized to edit this item");

  // parsing the form data properly
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

  if (values.image instanceof File) {
    // deleting the old image
    const imageName = menuItems[0].image.split("menuItemImage/")[1];
    const { error: fileDeleteError } = await supabase.storage
      .from("menuItemImage")
      .remove([imageName]);

    if (fileDeleteError) throw fileDeleteError;

    // uploading the new image
    const editItemImgName = `${Math.random()}-${
      (values.image as File).name
    }`.replaceAll("/", "");
    const editItemImageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/menuItemImage/${editItemImgName}`;

    const { error: uploadError } = await supabase.storage
      .from("menuItemImage")
      .upload(editItemImgName, values.image as File);

    if (uploadError) throw uploadError;

    values.image = editItemImageUrl;
  }

  // updating the menu item
  const { error: editMenuItemError } = await supabase
    .from("Menu")
    .update(values)
    .eq("id", editMenuId);

  if (editMenuItemError) throw editMenuItemError;

  // deleting the old extra parameters
  const { error: deleteParamsError } = await supabase
    .from("MenuParameters")
    .delete()
    .eq("menuId", editMenuId);

  if (deleteParamsError) throw deleteParamsError;

  // inserting the new extra parameters
  if (extraParams.length > 0) {
    for (let i = 0; i < extraParams.length; i++) {
      const { error: paramUploadError } = await supabase
        .from("MenuParameters")
        .insert([{ ...extraParams[i], menuId: editMenuId }])
        .select();

      if (paramUploadError) throw paramUploadError;
    }
  }

  revalidatePath(`/restaurant/EditMenu/${editMenuId}`);
  return { success: true };
}

export async function deleteMenuItem(id: any) {
  const session = await getSession();

  const { data: menuItems, error: notFoundError } = await supabase
    .from("Menu")
    .select("*")
    .eq("id", id);

  if (notFoundError || menuItems.length === 0) throw notFoundError;

  if (Number((session as JWTPayload).id) !== Number(menuItems[0].restaurantId))
    throw new Error("You are not authorized to delete this item");

  const { error: deleteError } = await supabase
    .from("Menu")
    .delete()
    .eq("id", id);

  if (deleteError) throw deleteError;

  const imageName = menuItems[0].image.split("menuItemImage/")[1];
  console.log(imageName);

  const { error: fileDeleteError } = await supabase.storage
    .from("menuItemImage")
    .remove([imageName]);

  if (fileDeleteError) throw fileDeleteError;

  revalidatePath("/restaurant/EditMenu");

  return { success: true };
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
  return { success: true };
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
