import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CategoriesTicket from "../composants/CategoriesTicket";
import SvgLogo from "../assets/images/Logo.svg";
import Colors from "../constants/colors";

export default function HomeScreen({ navigation }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    // fetch all categories on loading. no need to refresh later
    fetchCategories();
  }, []);

  const handleCategorySelection = (idCategory, isChecked) => {
    if (isChecked) {
      setSelectedCategories((previousSelection) => [
        ...previousSelection,
        idCategory,
      ]);
    } else {
      setSelectedCategories((previousSelection) =>
        previousSelection.filter((id) => id !== idCategory)
      );
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <SvgLogo width={200} height={200} fill={Colors.accent500} />
      </View>
      <View style={styles.ticketsContainer}>
        {categories !== null &&
          categories.map((category) => (
            <CategoriesTicket
              key={category.idCategory}
              category={category}
              onCategorySelected={handleCategorySelection}
            />
          ))}
      </View>
      <View>
        <Button title="Find Recipes!" />
      </View>

      <View style={styles.footer}>
        <Text>
          Powered by <Text>The Meal DB</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  ticketsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: "40%",
  },
  imageContainer: {
    overflow: "hidden",
    margin: 5,
    maxHeight: 220,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
