import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import TinderCard from 'react-tinder-card'

export default function MealCard({meal}) {

  return (
    <View>
      <Text>{meal.strMeal}</Text>
      <Image style={styles.image} source={{uri:meal.strMealThumb}}/>
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