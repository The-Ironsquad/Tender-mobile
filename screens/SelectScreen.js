import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'


export default function SelectScreen({navigation}) {
  return (
    <View>
    {/* photo of the meal */}
    
      <Text>Name of the meal</Text>
      <View>
        {/* buttons left and right */}
      </View>
      <Button title='See Your Selection' onPress={()=>navigation.navigate("LIST")}/>
    </View>
  )
}

const styles = StyleSheet.create({})