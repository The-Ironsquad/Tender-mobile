import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function RecipeBattleScreen({ navigation, route }) {
  const { meals } = route.params; // Get the list of meals passed as a parameter
  const [remainingMeals, setRemainingMeals] = useState([...meals]); // Remaining meals for the battle
  const [pair, setPair] = useState([]); // Current pair of recipes for comparison

  useEffect(() => {
    // Initialize with the first two meals from the list
    setPair([remainingMeals[0], remainingMeals[1]]);
  }, [remainingMeals]);


  // this function is not working until the end. try to fixe the issue of 1 left in the list. 
  const handleChooseWinner = (winner) => {
    const loser = pair.find(recipe => recipe.idMeal !== winner.idMeal);
    const updatedRemainingMeals = remainingMeals.filter(recipe => recipe.idMeal !== loser.idMeal);
    setRemainingMeals(updatedRemainingMeals);
  
    if (updatedRemainingMeals.length > 1) {
      // Choose a new pair for the next battle
      setPair([updatedRemainingMeals[0], updatedRemainingMeals[1]]);
    } else if (updatedRemainingMeals.length === 1) {
      // Only one recipe remains, declare it as the winner
      Alert.alert('Winner', `The ultimate winner is ${updatedRemainingMeals[0].strMeal}`);
      navigation.navigate("COOK", { mealId: updatedRemainingMeals[0].idMeal });
    } else {
      // Handle the scenario where no recipes remain
      Alert.alert('No Recipes Left', 'All recipes have been compared.');
    }
  };

  return (
    <View style={styles.container}>
      {pair.map(recipe => (
        <TouchableOpacity key={recipe.idMeal} style={styles.recipeContainer} onPress={() => handleChooseWinner(recipe)}>
          <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
          <Text>{recipe.strMeal}</Text>
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
  },
  recipeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    minWidth: 250,
    minHeight: 250,
    marginBottom: 10,
    borderRadius: 10,
  },
});
