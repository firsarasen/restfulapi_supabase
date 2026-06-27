import supabase from "../config/supabase.js";

export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");

  if (error) throw error;

  return data;
};

export const getCategoryById = async (id) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};

export const createCategory = async (name) => {
  const { data, error } = await supabase
    .from("categories")
    .insert([{ name }])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateCategory = async (id, name) => {
  const { data, error } = await supabase
    .from("categories")
    .update({ name })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteCategory = async (id) => {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
};