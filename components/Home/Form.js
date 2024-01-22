import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { saveTask, getTask, updateTask } from "../../api/api";
import Layout from "../Tasks/Layout";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (route.params && route.params.id) {
      setEditing(true);
      navigation.setOptions({ headerTitle: "Actualizando tarea" });
      (async () => {
        const task = await getTask(route.params.id);
        setTask({ title: task.title, description: task.description });
      })();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (!editing) {
        await saveTask(task);
      } else {
        await updateTask(route.params.id, {...task});
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder="Titulo de la tarea"
        placeholderTextColor="#576574"
        value={task.title}
        onChangeText={(text) => handleChange("title", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción de la tarea"
        placeholderTextColor="#576574"
        value={task.description}
        onChangeText={(text) => handleChange("description", text)}
      />

      {!editing ? (
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#3b27c2",
    height: 30,
    color: "#ffffff",
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#3b27c2",
    width: "90%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#3b27c2",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default TaskFormScreen;