import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CategoriesTicket from "../components/CategoriesTicket";
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

  const handleCategorySelection = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories((previousSelection) => [
        ...previousSelection,
        category,
      ]);
    } else {
      setSelectedCategories((previousSelection) =>
        previousSelection.filter((item) => item !== category)
      );
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <SvgLogo style={styles.image} width={200} height={200} />
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
        <Button
          title="Find Recipes!"
          color={Colors.primary}
          onPress={() => navigation.navigate("SWIPE",{selectedCategories: selectedCategories})}
        />
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
    justifyContent: "center",
    flexWrap: "wrap",
    maxHeight: "40%",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    margin: 5,
    maxHeight: 220,
  },
  image: {
    color: Colors.accent500,
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
