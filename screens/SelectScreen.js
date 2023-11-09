import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MealCard from "../composants/MealCard";
import shuffle from "../utils/shuffle";

export default function SelectScreen({ navigation, route }) {
  const selectedCategories = route.params.selectedCategories;
  const [currentMeal, setCurrentMeal] = useState({});
  const [shownMealIds, setShownMealIds] = useState([]);
  const [availableMeals, setAvailableMeals] = useState([]);

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
      setAvailableMeals((previousArray) => shuffle(previousArray));
    
    } catch (error) {
      console.log("error in fetchByCategory:", error);
    }
  };

  useEffect(() => {
    fetchByCategory();
  }, []);

  return (
    <>
      <View>
        {/* photo of the meal */}
        <FlatList
          data={availableMeals}
          renderItem={({item})=> <MealCard meal={item}/>  }
        />
        <View>
          {/* swipe left and right */}
          {/* button like and regret and dislike */}
          {/*  npm i --save react-tinder-card */
          /*  npm i --save @react-spring/native@9.5.5 */}
        </View>
        <Button
          title="See Your Selection"
          onPress={() => navigation.navigate("LIST")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
