import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function MealCard({meal}) {
  return (
    <View>
      <Text>{meal.strMealThumb}</Text>
      <Image source={{uri:meal.strMealThumb}}/>
    </View>
  )
}

const styles = StyleSheet.create({})