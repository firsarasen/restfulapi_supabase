import supabase from "../config/supabase.js";

export const getFoods = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("foods")
      .select("*, categories(name)")
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

export const getFoodById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("foods")
      .select("*, categories(name)")
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
      message: "Bahan makanan tidak ditemukan",
    });
  }
};

export const createFood = async (req, res) => {
  try {
    const {
      name,
      category_id,
      stock,
      unit,
      expired_date,
      description,
    } = req.body;

    const { error } = await supabase
      .from("foods")
      .insert([
        {
          name,
          category_id,
          stock,
          unit,
          expired_date,
          description,
        },
      ]);

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Bahan makanan berhasil ditambahkan",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const {
      name,
      category_id,
      stock,
      unit,
      expired_date,
      description,
    } = req.body;

    const { error } = await supabase
      .from("foods")
      .update({
        name,
        category_id,
        stock,
        unit,
        expired_date,
        description,
      })
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Bahan makanan berhasil diperbarui",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { error } = await supabase
      .from("foods")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Bahan makanan berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};