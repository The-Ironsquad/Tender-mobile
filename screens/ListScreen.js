import { StyleSheet, FlatList,Text, View, Button, InteractionManager } from 'react-native'
import React, { useState,useEffect } from 'react'
import ReceipeListElement from '../components/ReceipeListElement'


export default function ListScreen({navigation, route}) {
  const [selection,setSelection] = useState([])

  const handleRemove = (removeMealId)=>{
    setSelection(prev=> prev.find(meal=> meal.id !== removeMealId))
  }
 
  useEffect(()=>{
    setSelection(route.params.likedMeals)
  })
  return (
    /* shows the button to navigate to SelectScreen when there is nothing here */
    /* when there is selection, show Flat list with swipe to remove button and tap to cook button*/

    <View>
    <FlatList
      data={selection}
      renderItem={({item})=> <ReceipeListElement key={item.idMeal} meal={item} handleRemove={handleRemove}/> }
    />
    {/* <Button title="Cook" onPress={()=>navigation.navigate("COOK")}/> */}
    <Button title="Refine your selection" onPress={()=>navigation.navigate("COMPARE")}/>
    </View>
  )
}

const styles = StyleSheet.create({})