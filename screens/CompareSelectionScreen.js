import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

export default function CompareSelectionScreen({ navigation, route }) {
  const { meals } = route.params;
  const [remainingMeals, setRemainingMeals] = useState([...meals]);
  const [pair, setPair] = useState([]);

  useEffect(() => {
    if (remainingMeals.length >= 2) {
      setPair([remainingMeals[0], remainingMeals[1]]);
    } else if (remainingMeals.length === 1) {
      navigation.navigate('COOK', { mealId: remainingMeals[0].idMeal });
    }
  }, [remainingMeals]);

  const handleChooseWinner = (winner) => {
    const loser = pair.find((recipe) => recipe.idMeal !== winner.idMeal);
    const updated = remainingMeals.filter((recipe) => recipe.idMeal !== loser.idMeal);
    setRemainingMeals(updated);
  };

  if (remainingMeals.length < 2) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Which one would you rather cook?</Text>
      {pair.map((recipe) => (
        <TouchableOpacity
          key={recipe.idMeal}
          style={styles.recipeContainer}
          onPress={() => handleChooseWinner(recipe)}
        >
          <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
          <Text style={styles.name}>{recipe.strMeal}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  prompt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    color: Colors.secondary,
  },
  recipeContainer: {
    alignItems: 'center',
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: 280,
    height: 200,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
    textAlign: 'center',
  },
});
