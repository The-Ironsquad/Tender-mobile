import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import Colors from "../constants/colors";


export default function CategoriesTicket({ category, onCategorySelected }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCategorySelection = ()=>{
    setIsChecked(!isChecked)
    onCategorySelected(category.strCategory, !isChecked)
  }

  return (
    <View style={styles.ticket}>
        <Checkbox
          value={category.strCategory}
          status={isChecked? "checked" : "indeterminate"}
          onPress={handleCategorySelection}
          />
      <Text style={styles.ticketText}>{category.strCategory}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ticket: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 22,
    borderColor: Colors.accent500,
    margin: 4,
    paddingLeft:5,
    paddingRight:15,
    backgroundColor:"white",
    justifyContent:"space-around",
    alignItems:"center",
    elevation:4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  ticketText: {
    fontSize: 15,
    color: Colors.accent500,
    fontWeight:"bold",
    justifyContent:"center"
  },
});
