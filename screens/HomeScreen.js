import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function HomeScreen({navigation}) {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="List Screen" onPress={()=> navigation.navigate("LIST") } />
    </View>
  )
}

const styles = StyleSheet.create({})