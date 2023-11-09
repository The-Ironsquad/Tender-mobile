import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function MealCard({meal}) {
  const {strMealThumb,strMeal,strCategory} = meal
  return (
    <View>
      <Text>{strMeal}</Text>
      <Image source={{uri:strMealThumb}}/>
    </View>
  )
}

const styles = StyleSheet.create({})