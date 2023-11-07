import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import getAllCategories from '../services/getAllCategories'

export default function ListScreen() {

  const [categories, setCategories] = useState(null)

  useEffect(()=>{
    setCategories(getAllCategories())
    
  },[])

  return (
    <View>
      <Text>List</Text>
    </View>
  )
}

const styles = StyleSheet.create({})