import { StyleSheet, FlatList, Text, View, Button } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import RecipeListElement from '../components/RecipeListElement';
import { getFavorites, removeFavorite } from '../utils/favorites';
import Colors from '../constants/colors';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setFavorites);
    }, [])
  );

  const handleRemove = async (mealId) => {
    await removeFavorite(mealId);
    setFavorites((prev) => prev.filter((m) => m.idMeal !== mealId));
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptySubtitle}>
          When you find a recipe you love, tap the heart on the recipe page to save it here.
        </Text>
        <Button
          title="Find recipes"
          color={Colors.primary}
          onPress={() => navigation.navigate('HOME')}
        />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <RecipeListElement meal={item} handleRemove={handleRemove} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  emptySubtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
});
