"use server";

import { supabase } from "./supabase";

export async function getRestaurants() {
  const { data: Restaurants, error } = await supabase
    .from("Restaurants")
    .select("*");

  if (error) throw error;

  return Restaurants;
}
