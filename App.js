import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/Home/Screen";
import TaskFormScreen from "./components/Home/Form";
import AddTaskButton from "./components/Tasks/AddTask";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Sublime Todo App",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#131054",
            },
            // headerRight: () => <AddTaskButton />,
            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="TaskFormScreen"
          component={TaskFormScreen}
          options={{
            title: "Nueva tarea",
            headerStyle: {
              backgroundColor: "#131054",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        />
      
      </Stack.Navigator>

      <AddTaskButton />

    </NavigationContainer>
  );
};

export default App;
