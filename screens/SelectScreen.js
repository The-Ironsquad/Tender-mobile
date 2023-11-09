import { StyleSheet, Text, View, Button,FlatList, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import MealCard from "../composants/MealCard"


export default function SelectScreen({navigation, route}) {
  const selectedCategories = route.params.selectedCategories
  const [currentMeal, setCurrentMeal] = useState({})
  const [shownMealIds, setShownMealIds] = useState([])


/* 
  useEffect(() => {
 
  
    fetchByCategory();
  }, []); */
  

  return (
    <View>
    {/* photo of the meal */}
    
      {/* <MealCard meal={currentMeal} /> */}
      <View style={styles.imageContainer}>
        <Image source={{uri:"https://www.themealdb.com/images/media/meals/t8mn9g1560460231.jpg"}} style={styles.image} />
      </View>
      
      <View>
    {/* swipe left and right */}
    {/* button like and regret and dislike */}
    {/*  npm i --save react-tinder-card */
    /*  npm i --save @react-spring/native@9.5.5 */}
      </View>
      <Button title='See Your Selection' onPress={()=>navigation.navigate("LIST")}/>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer:{
    height:"50%"
  },
  image:{
    width:"100%",
    height:200
  }
})