import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IngredientsList({meal}) {
    // Extract ingredients and measures from the meal object
  const ingredients = [];
  const measures = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (meal[ingredientKey] && meal[ingredientKey].trim() !== "") {
      ingredients.push(meal[ingredientKey]);
    }

    if (meal[ingredientKey] && meal[measureKey].trim() !== "") {
      measures.push(meal[measureKey]);
    }
  }

  return (
    <View style={styles.container}>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.ingredient}>{ingredient}</Text>
          <Text style={styles.measure}>{measures[index]}</Text>
        </View>
      ))}
    </View>
  );
  }


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginHorizontal: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  ingredient: {
    flex: 1,
    fontSize: 14,
    fontWeight:"bold"
  },
  measure: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
});


