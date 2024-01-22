import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import {  useNavigation } from "@react-navigation/native";

const AddTaskButton = () => {
    const navigation = useNavigation();
  
    return (
      <View style={{  position: 'absolute', backgroundColor: '#1e27a0',  bottom: 20, right: 20, borderRadius: 30 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("TaskFormScreen")}
          style={{ padding: 10, borderRadius: 30 }}
        >
          <Text style={{ color: "#fff", fontSize: 15 }}>
            <Icon name="add-to-list" size={30}></Icon>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default AddTaskButton