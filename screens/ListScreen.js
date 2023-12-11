import { StyleSheet, FlatList,Text, View, Button } from 'react-native'
import React, { useEffect } from 'react'


export default function ListScreen({navigation, route}) {
  const likedMeals = route.params.likedMeals
  console.log(likedMeals[0])

  useEffect(()=>{
    console.log(likedMeals)
  })
  return (
    /* shows the button to navigate to SelectScreen when there is nothing here */
    /* when there is selection, show Flat list with swipe to remove button and tap to cook button*/

    <View>
    <FlatList
      data={likedMeals}
      renderItem={({item})=> <Text key={item.idMeal}>{item.strMeal}</Text> }
    />
    <Button title="Cook" onPress={()=>navigation.navigate("COOK")}/>
    <Button title="Refin your selection" onPress={()=>navigation.navigate("COMPARE")}/>
    </View>
  )
}

const styles = StyleSheet.create({})