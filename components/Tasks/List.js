import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Alert, RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { deleteTask, getTasks } from "../../api/api";
import TaskItem from "./Item";

const TasksList = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const getUsers = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getUsers();
    setRefreshing(false);
  }, []);

  const handleDelete = (id) => {
    Alert.alert("Eliminar tarea", "¿Deseas eliminarla?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: async () => {
          await deleteTask(id);
          await getUsers();
        },
      },
    ]);
  };

  useEffect(() => {
    getUsers();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TaskItem task={item} handleDelete={handleDelete} />
  );

  return (
    <SafeAreaView style={{ flex: 1, width: "90%" }}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#78e08f"]}
            progressBackgroundColor="#0a3d62"
          />
        }
      />
    </SafeAreaView>
  );
};

export default TasksList;