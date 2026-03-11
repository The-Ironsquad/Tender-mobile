import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TinderCard from "react-tinder-card";
import shuffle from "../utils/shuffle";
import Colors from "../constants/colors";
import uniqueArray from "../utils/uniqueArray";

export default function SelectScreen({ navigation, route }) {
  const selectedCategories = route.params.selectedCategories;
  const [availableMeals, setAvailableMeals] = useState([]);
  const [likedMeals, setLikedMeals] = useState([]);
  const [lastDirection, setLastDirection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { height, width } = useWindowDimensions();

  const fetchByCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      let meals = [];
      for (const category of selectedCategories) {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        meals = [...meals, ...response.data.meals];
      }
      setAvailableMeals(shuffle(uniqueArray(meals)));
    } catch (err) {
      setError("Failed to load recipes. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchByCategory();
  }, []);

  const swiped = (direction, meal) => {
    if (direction === "right") {
      setLikedMeals((prev) => [...prev, meal]);
    }
    setLastDirection(direction);
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Finding recipes for you...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" color={Colors.primary} onPress={fetchByCategory} />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={[styles.container, { height: 0.7 * height }]}>
        <View
          style={[
            styles.cardContainer,
            {
              width: 0.9 * width,
              maxWidth: width,
              maxHeight: 0.6 * height,
            },
          ]}
        >
          {availableMeals.map((meal) => (
            <TinderCard
              key={meal.idMeal}
              onSwipe={(dir) => swiped(dir, meal)}
            >
              <View style={[styles.card, { height: 0.6 * height }]}>
                <ImageBackground
                  style={styles.cardImage}
                  source={{ uri: meal.strMealThumb }}
                >
                  <Text style={styles.cardTitle}>{meal.strMeal}</Text>
                </ImageBackground>
              </View>
            </TinderCard>
          ))}
        </View>
        <View>
          {lastDirection ? (
            <Text style={styles.infoText}>
              {lastDirection === "right" ? "Great choice!" : "Maybe another time"}
            </Text>
          ) : (
            <Text style={styles.infoText} />
          )}
        </View>
      </View>
      <View style={[styles.listButton, { height: 0.15 * height }]}>
        <Button
          title="See Your Selection"
          color={Colors.primary}
          onPress={() => navigation.navigate("LIST", { likedMeals })}
        />
      </View>
      <View style={{ height: 0.05 * height }}>
        <Text>Swipe right to like a recipe!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
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
  container: {
    flex: 1,
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  cardContainer: {
    marginTop: 30,
    width: "90%",
    maxWidth: 260,
    height: 300,
    padding: 10,
  },
  card: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    shadowColor: "#b3b3b3",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderRadius: 4,
    padding: 10,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 4,
  },
  cardTitle: {
    position: "absolute",
    bottom: 0,
    margin: 10,
    color: "#fff",
  },
  infoText: {
    padding: 10,
    height: 28,
    justifyContent: "flex-end",
    color: Colors.onPrimary,
    fontWeight: "bold",
    fontSize: 20,
    display: "flex",
    zIndex: -100,
    margin: 20,
  },
  listButton: {
    paddingTop: 30,
  },
});
