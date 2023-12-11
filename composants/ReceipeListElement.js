import { StyleSheet, Text, View, Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Colors from "../constants/colors";

export default function ReceipeListElement({ meal, handleRemove}) {
    const navigation = useNavigation()
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: meal.strMealThumb }} />
      <View>
        <Text>{meal.strMeal}</Text>
      </View>
      <View>
      <Button title="Cook This" onPress={() => navigation.navigate("COOK", {meal:meal})} />
        <Button title="Remove" onPress={() => handleRemove(meal.idMeal)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 3,
    borderRadius: 5,
    borderColor: Colors.outline,
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    justifyContent: "space-between",
  },
  image: {
    margin:5,
    height: 40, 
    width: 40, 
    borderRadius: 5,
  },
});
