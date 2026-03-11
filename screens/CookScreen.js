import { StyleSheet, Text, ScrollView, View, Image, ActivityIndicator, Button } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Colors from "../constants/colors";
import IngredientsList from "../components/IngredientsList";

export default function CookScreen({ navigation, route }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const idMeal = route.params.mealId;

  const fetchById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setMeal(response.data.meals[0]);
    } catch (err) {
      setError("Failed to load recipe. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchById(idMeal);
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </View>
    );
  }

  if (error || !meal) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error ?? "Recipe not found."}</Text>
        <Button title="Go back" color={Colors.primary} onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: meal.strMealThumb }} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Ingredients</Text>
      </View>
      <IngredientsList meal={meal} />
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Instructions</Text>
      </View>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 32,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.secondary,
    marginTop: 8,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "black",
  },
  subtitleContainer: {
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    marginHorizontal: 25,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 18,
    margin: 8,
    textAlign: "center",
    color: Colors.secondary,
  },
  instructionsContainer: {
    paddingHorizontal: 30,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  instructions: {
    marginTop: 15,
    color: "black",
  },
});
