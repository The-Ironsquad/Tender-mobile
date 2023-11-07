import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import CookScreen from "./screens/CookScreen";
import ListScreen from "./screens/ListScreen";
import SelectScreen from "./screens/SelectScreen"

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="black" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HOME" component={HomeScreen} />
          <Stack.Screen name="LIST" component={ListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
