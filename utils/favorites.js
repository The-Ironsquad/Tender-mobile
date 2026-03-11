import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@tender_favorites';

export async function getFavorites() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export async function addFavorite(meal) {
  const favorites = await getFavorites();
  if (favorites.some((m) => m.idMeal === meal.idMeal)) return;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites, meal]));
}

export async function removeFavorite(mealId) {
  const favorites = await getFavorites();
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites.filter((m) => m.idMeal !== mealId))
  );
}

export async function isFavorite(mealId) {
  const favorites = await getFavorites();
  return favorites.some((m) => m.idMeal === mealId);
}
