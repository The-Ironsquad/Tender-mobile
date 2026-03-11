import { StyleSheet, FlatList, Text, View, Button } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import RecipeListElement from '../components/RecipeListElement';
import IconButton from '../components/IconButton';
import Colors from '../constants/colors';

export default function ListScreen({ navigation, route }) {
  const [selection, setSelection] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 16, marginRight: 15 }}>
          <IconButton onPress={() => navigation.navigate('FAVORITES')} icon="user" color="white" />
          <IconButton onPress={() => navigation.navigate('HOME')} icon="home" color="white" />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setSelection(route.params?.likedMeals ?? []);
  }, []);

  const handleRemove = (mealIdToRemove) => {
    setSelection((prev) => prev.filter((meal) => meal.idMeal !== mealIdToRemove));
  };

  if (selection.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Nothing here yet</Text>
        <Text style={styles.emptySubtitle}>Swipe right on recipes you like and they'll show up here.</Text>
        <Button
          title="Go find recipes"
          color={Colors.primary}
          onPress={() => navigation.navigate('HOME')}
        />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={selection}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <RecipeListElement meal={item} handleRemove={handleRemove} />
        )}
      />
      <View style={styles.refineButton}>
        <Button
          title="Refine your selection"
          color={Colors.primary}
          onPress={() => navigation.navigate('COMPARE', { meals: selection })}
        />
      </View>
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
  refineButton: {
    padding: 16,
  },
});
