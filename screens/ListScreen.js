import { StyleSheet, FlatList,Text, View, Button } from 'react-native'
import React from 'react'


export default function ListScreen({navigation}) {


  return (
    /* shows the button to navigate to SelectScreen when there is nothing here */
    /* when there is selection, show Flat list with remove button and cook button*/
    <View>
   {/*    <FlatList /> */}
    <Text>The list screen</Text>
    <Button title="Cook" onPress={()=>navigation.navigate("COOK")}/>
    <Button title="Refin your selection" onPress={()=>navigation.navigate("COMPARE")}/>
    </View>
  )
}

const styles = StyleSheet.create({})