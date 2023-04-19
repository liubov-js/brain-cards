const API_URL = "https://aged-tidal-sand.glitch.me/";

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}api/category`);

    if (response.status === 200 || response.status === 201) {
      const categories = response.json();
      return categories;
    } else {
      const error = response.json();
      throw error;
    }
  } catch (error) {
    return { error };
  }
};

export const fetchCards = async (id) => {
  try {
    const response = await fetch(`${API_URL}api/category/${id}`);

    if (response.status === 200 || response.status === 201) {
      const cards = response.json();
      return cards;
    } else {
      const error = response.json();
      throw error;
    }
  } catch (error) {
    return { error };
  }
};
