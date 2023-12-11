import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CookScreen({navigation, route}) {
  const meal = route.params.meal
  return (
    <View>
      <Text>{meal.strMeal}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})