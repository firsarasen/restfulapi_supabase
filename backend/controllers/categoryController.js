import supabase from "../config/supabase.js";

export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("id");

    if (error) throw error;

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Kategori tidak ditemukan",
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const { error } = await supabase
      .from("categories")
      .insert([{ name }]);

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Kategori berhasil ditambahkan",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const { error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Kategori berhasil diperbarui",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Kategori berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};