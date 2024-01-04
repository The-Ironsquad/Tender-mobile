import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
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
  const [lastDirection, setLastDirection] = useState();
  const [shownMeals, setShownMeals] = useState([]);
  const [likedMeals, setLikedMeals] = useState([]);
  const [dislikedMeals, setDislikedMeals] = useState([]);
  const { height, width } = useWindowDimensions();

  // using axios to fetch api by url and run the function on load
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

  const swiped = (direction, mealToDelete) => {
    // console.log("removing: " + mealToDelete.strMeal);
    if (direction === "right") {
      setLikedMeals((prevLikedMeals) => [...prevLikedMeals, mealToDelete]);
      
    } else if (direction === "left") {
      setDislikedMeals((prevDislikedMeals) => [
        ...prevDislikedMeals,
        mealToDelete,
      ]);
    }
    setShownMeals((prevShownMeals) => [...prevShownMeals, mealToDelete]);
    setLastDirection(direction);
  };
  const handleSelections = () => {
    // console.log("navigating to selections, here are liked meals:", likedMeals);
    navigation.navigate("LIST", { likedMeals: likedMeals });
  };
  /*   const outOfFrame = (mealToDelete) => {
    return undefined
    console.log("liked meals:", likedMeals[0]);
    console.log("disliked meals:", dislikedMeals[0]);
  }; */

  // the TinderCard solution is not ideal because it loads all elements on page.
  // there will be performance issue if the selection is very big
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
          {availableMeals &&
            availableMeals.map((meal) => (
              <TinderCard
                key={meal.idMeal}
                onSwipe={(dir) => swiped(dir, meal)}
                //onCardLeftScreen={() => outOfFrame(meal)}
              >
                <View
                  style={[
                    styles.card,
                    {
                      height: 0.6 * height,
                    },
                  ]}
                >
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
              {lastDirection === "right"
                ? "Great choice!"
                : "Maybe another time"}{" "}
            </Text>
          ) : (
            <Text style={styles.infoText} />
          )}
        </View>
      </View>
      <View style={[styles.listButton, { height: 0.15 * height }]}>
        <Button title="See Your Selection" onPress={() => handleSelections()} />
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
  container: {
    flex: 1,
    marginBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  header: {
    color: "#000",
    fontSize: 30,
    marginBottom: 30,
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
    backgroundColor: "#fff",
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#b3b3b3",
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderRadius: 4,
    resizeMode: "cover",
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
  likeButtonsContainer: {
    flex: 1,
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  likeButton: {},
  listButton: {
    paddingTop: 30,
  },
});
