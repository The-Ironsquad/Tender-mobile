import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Colors from "../constants/colors";

export default function ReceipeListElement({ meal, handleRemove }) {
  const navigation = useNavigation();

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 3) + '...';
    }
    return title;
  };

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: meal.strMealThumb }} />
      <Text style={styles.title}>{truncateTitle(meal.strMeal, 25)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cookButton} onPress={() => navigation.navigate("COOK", { mealId: meal.idMeal })}>
          <Text style={styles.cookButtonText}>Cook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(meal.idMeal)}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 3,
    borderRadius: 5,
    borderColor: Colors.accent500,
    borderWidth:2,
    flexDirection: "row",
    alignItems: "center", // Align items horizontally
    padding: 10, // Add some padding
  },
  image: {
    marginEnd: 10, // Adjust margin for image
    height: 60,
    width: 60,
    borderRadius: 5,
   
  },
  title: {
    flex: 1, // Allow title to take remaining space
    fontSize: 16, // Harmonize font size
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap:8,
  },
  cookButton: {
    borderWidth:2,
    borderColor: Colors.accent500, // Harmonize button colors
    paddingVertical: 4, // Adjust padding
    paddingHorizontal: 8, // Adjust padding
    borderRadius: 5,
    marginStart: 10, // Adjust margin between buttons
    width:80
  },
  removeButton:{
    backgroundColor: "#de3838", // Harmonize button colors
    paddingVertical: 4, // Adjust padding
    paddingHorizontal: 8, // Adjust padding
    borderRadius: 5,
    marginStart: 10, // Adjust margin between buttons
    width:80
  },
  cookButtonText: {
    fontSize: 14, 
    fontWeight:"bold",
    textAlign:"center",
    color: Colors.accent500, // Harmonize button text color
  },
  removeButtonText: {
    fontSize: 14, 
    fontWeight:"bold",
    textAlign:"center",
    color: "white", // Harmonize button text color
  },
});
