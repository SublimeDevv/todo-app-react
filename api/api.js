import axios from 'axios';

const hostApi = "http://192.168.126.76:4000/api/tasks";

export const deleteTask = async (id) => {
  await axios.delete(`${hostApi}/${id}`);
};

export const getTasks = async () => {
  const res = await axios.get(hostApi);
  return res.data;
};

export const saveTask = async (newTask) => {
  const res = await axios.post(hostApi, newTask, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const getTask = async (taskId) => {
  const res = await axios.get(`${hostApi}/${taskId}`);
  return res.data;
};

export const updateTask = async (taskId, newTask) => {
  const res = await axios.patch(`${hostApi}/${taskId}`, newTask, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
};
