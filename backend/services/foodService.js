import supabase from "../config/supabase.js";

export const getAllFoods = async () => {
  const { data, error } = await supabase
    .from("foods")
    .select(`
      *,
      categories(name)
    `)
    .order("id");

  if (error) throw error;

  return data;
};

export const getFoodById = async (id) => {
  const { data, error } = await supabase
    .from("foods")
    .select(`
      *,
      categories(name)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

export const createFood = async (food) => {
  const { data, error } = await supabase
    .from("foods")
    .insert([food])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateFood = async (id, food) => {
  const { data, error } = await supabase
    .from("foods")
    .update(food)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteFood = async (id) => {
  const { error } = await supabase
    .from("foods")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
};