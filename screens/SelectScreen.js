import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'


export default function SelectScreen({navigation}) {
  return (
    <View>
    {/* photo of the meal */}
    
      <Text>Name of the meal</Text>
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

const styles = StyleSheet.create({})