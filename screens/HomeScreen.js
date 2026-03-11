import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import React from "react";
import axios from "axios";
import { useState, useEffect, useLayoutEffect } from "react";
import CategoriesTicket from "../components/CategoriesTicket";
import SvgLogo from "../assets/images/Logo.svg";
import Colors from "../constants/colors";
import IconButton from "../components/IconButton";

export default function HomeScreen({ navigation }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 15 }}>
          <IconButton
            onPress={() => navigation.navigate("LIST", { likedMeals: [] })}
            icon="shoppingcart"
            color="white"
          />
        </View>
      ),
    });
  }, [navigation]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
    } catch (err) {
      setError("Failed to load categories. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySelection = (category, isChecked) => {
    if (isChecked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== category));
    }
  };

  const handleFindRecipes = () => {
    if (selectedCategories.length === 0) {
      Alert.alert("No categories selected", "Please select at least one category to find recipes.");
      return;
    }
    navigation.navigate("SWIPE", { selectedCategories });
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <SvgLogo style={styles.image} width={200} height={200} />
      </View>

      <View style={styles.ticketsContainer}>
        {loading && <ActivityIndicator size="large" color={Colors.primary} />}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button title="Retry" color={Colors.primary} onPress={fetchCategories} />
          </View>
        )}
        {!loading &&
          !error &&
          categories &&
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
          onPress={handleFindRecipes}
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
  errorContainer: {
    alignItems: "center",
    padding: 16,
    gap: 8,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 8,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
