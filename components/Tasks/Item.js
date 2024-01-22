import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Checkbox } from 'react-native-paper';
import  { updateTask } from '../../api/api'

const TaskItem = ({ task, handleDelete }) => {
  const navigation = useNavigation();

  const [status, setStatus] = React.useState(task.isCompleted);

  const handledCheckBox = async () => {
    const updatedTask = { isCompleted: !status };
    setStatus(!status);
    await updateTask(task.id, updatedTask);
  };
  

  return (
    <View style={styles.itemContainer}>
    <Checkbox.Item style={{marginLeft: -20, marginRight: -13}} onPress={handledCheckBox} color="#41aaf0" status={status ? "checked" : "unchecked"} />
      <TouchableOpacity
        style={{
          flex: 1,

          marginRight: 30,

        }}
        onPress={() => navigation.navigate("TaskFormScreen", { id: task.id })}

      >
        <Text style={styles.itemTitle} numberOfLines={1}>
          {task.title.length > 70
            ? task.title.substring(0, 30) + "..."
            : task.title}
        </Text>
        <Text
          style={{
            color: "#8395a7",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          numberOfLines={1}
        >
          {task.description.length > 40
            ? task.description.substring(0, 40) + "..."
            : task.description}
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.butttonUpdate}
        onPress={() => navigation.navigate("TaskFormScreen", { id: task.id })}
      >
        <Icon name="note-edit" color="#ffffff" size={20}></Icon>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => handleDelete(task.id)}
      >
        <Icon name="delete" color="#ffffff" size={20}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    backgroundColor: "#131054",
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "#3b27c2",
    borderWidth: 1,
  },
  buttonDelete: {
    backgroundColor: "#ff2323",
    padding: 7,
    borderRadius: 10,
  },
  butttonUpdate: {
    backgroundColor: "#4046ee",
    padding: 7,
    marginRight: 5,
    borderRadius: 10,
  },
  itemTitle: {
    color: "#ffffff",
  },
});
export default TaskItem;
