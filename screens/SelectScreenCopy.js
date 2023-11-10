import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TinderCard from "react-tinder-card";
import shuffle from "../utils/shuffle";
import uniqueArray from "../utils/uniqueArray"

export default function SelectScreen({ navigation, route }) {
  const selectedCategories = route.params.selectedCategories;
  const [currentMeal, setCurrentMeal] = useState({});
  const [shownMealIds, setShownMealIds] = useState([]);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [likedMeals, setLikedMeals] = useState([])
  const [dislikedMeals, setDislikedMeals] = useState([])

  const fetchByCategory = async () => {
    try {
      for (const category of selectedCategories) {
        await axios
          .get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          )
          .then((response) => {
            setAvailableMeals((previousArray) => [
              ...previousArray,
              ...response.data.meals,
            ]);
          });
      }
      setAvailableMeals((previousArray) => shuffle(uniqueArray(previousArray)));
    } catch (error) {
      console.log("error in fetchByCategory:", error);
    }
  };

  useEffect(() => {
    fetchByCategory();
  }, []);

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    if(direction === "left"){
      setLikedMeals((previousArray)=> [...previousArray, currentMeal])
    }else if (direction ==="right"){
      setDislikedMeals((previousArray)=>[...previousArray, currentMeal])
    }
    setShownMealIds((previousArray)=>[...previousArray, currentMeal])
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log("liked meals:", likedMeals, "disliked meals:", dislikedMeals);
  };

  // the TinderCard solution is not ideal because it loads all elements on page. 
  // there will be performance issues.
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {availableMeals &&
          availableMeals.map((meal) => (
            <TinderCard
              key={meal.idMeal}
              onSwipe={(dir) => swiped(dir, meal.strMeal)}
              onCardLeftScreen={() => outOfFrame(meal.strMeal)}
            >
              <View style={styles.card}>
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
      {lastDirection ? (
        <Text style={styles.infoText}>You swiped {lastDirection}</Text>
      ) : (
        <Text style={styles.infoText} />
      )}
      <Button
        title="See Your Selection"
        onPress={() => navigation.navigate("LIST")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    color: "#000",
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: "90%",
    maxWidth: 260,
    height: 300,
    padding:10
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: "90%",
    height: 300,
    backgroundColor: "white",
    shadowColor: "#b3b3b3",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderRadius: 4,
    resizeMode: "cover",
    padding:10
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
    height: 28,
    justifyContent: "center",
    display: "flex",
    zIndex: -100,
  },
});
