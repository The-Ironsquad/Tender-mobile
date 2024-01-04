import { StyleSheet, Text, ScrollView, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Colors from "../constants/colors";
import IngredientsList from "../components/IngredientsList";

export default function CookScreen({ navigation, route }) {
  const [meal, setMeal] = useState({});
  const idMeal = route.params.mealId;

  // use the API to fetch the full receipe of the meal
  const fetchById = async (id) => {
    try {
      await axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => {
          setMeal(response.data.meals[0]);
        });
    } catch (error) {
      console.log("error in fetchById:", error);
    }
  };
  useEffect(() => {
    fetchById(idMeal);
  }, []);

  return (
    // make sure the meal is set before showing anything
    meal && (
      <ScrollView style={styles.rootContainer}>
        <Image style={styles.image} source={{ uri: meal.strMealThumb }} />
        <Text style={styles.title}>{meal.strMeal}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}> Ingredients</Text>
        </View>
        <IngredientsList meal={meal} />
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}> Instructions</Text>
        </View>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}> {meal.strInstructions}</Text>
        </View>
      </ScrollView>
    )
  );
}
const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
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
    paddingTop:15,
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
    paddingHorizontal:30,
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    marginBottom:20,
  },
  instructions: {
    marginTop:15,
    color: "black",
  },
});
