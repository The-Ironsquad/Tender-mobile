import { StyleSheet, FlatList,Text, View, Button, InteractionManager } from 'react-native'
import React, { useState,useEffect, useLayoutEffect } from 'react'
import ReceipeListElement from '../components/ReceipeListElement'
import IconButton from '../components/IconButton'


export default function ListScreen({navigation, route}) {
  const [selection,setSelection] = useState([])

  function headerButtonPressHandler() {
    navigation.navigate("HOME")
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => 
        <View style={{marginRight: 15}}>
          <IconButton onPress={headerButtonPressHandler} icon="home" color="white" />
        </View>
    });
  }, [navigation, headerButtonPressHandler]);

  const handleRemove = (mealIdToRemove)=>{
    console.log("idMeal to remove:", mealIdToRemove)
    setSelection(previousSelection => previousSelection.filter(meal=> meal.idMeal !== mealIdToRemove))
  }
 
  useEffect(()=>{
    setSelection(route.params.likedMeals)
  },[])
  return (
    /* shows the button to navigate to SelectScreen when there is nothing here */
    /* when there is selection, show Flat list with swipe to remove button and tap to cook button*/

    <View>
    <FlatList
      data={selection}
      renderItem={({item})=> <ReceipeListElement key={item.idMeal} meal={item} handleRemove={handleRemove}/> }
    />
    {/* <Button title="Cook" onPress={()=>navigation.navigate("COOK")}/> */}
    <Button title="Refine your selection" onPress={()=>navigation.navigate("COMPARE", {meals:selection})}/>
    </View>
  )
}

const styles = StyleSheet.create({})