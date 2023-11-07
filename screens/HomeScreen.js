import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import CategoriesTicket from '../composants/CategoriesTicket'


export default function HomeScreen({navigation}) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categories, setCategories] = useState(null)
  const fetchCategories = async ()=>{
    try{
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
      setCategories(response.data.categories)
    }catch (error){
      console.error('Error fetching categories:',error)
    }
  }

  useEffect(()=>{
    fetchCategories()
    
  },[])

  const handleCategorySelection = (idCategory, isChecked)=>{
    if(isChecked){
      setSelectedCategories((previousSelection)=>[...previousSelection,idCategory])
    }else{
      setSelectedCategories((previousSelection)=>previousSelection.filter((id)=> id !== idCategory))
    }
  }

  return (
    <View style={styles.ticketsContainer}>
       {categories !==null && categories.map(category => (
        <CategoriesTicket key={category.idCategory} category={category} onCategorySelected={handleCategorySelection} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  ticketsContainer:{
    flex:1,
    width:"100%",
    flexDirection:"row",
    flexWrap:"wrap"
  }
})