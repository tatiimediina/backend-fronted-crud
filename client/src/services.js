import { API_URL } from "./constants.js";

// create a new task
export const postTasks = async ({ title, description, isComplete }) => {
  return fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ title, description, isComplete }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

// get all tasks
export const getAllTasks = async () => {
  return fetch(API_URL).then((response) => response.json());
};

// delete a single task
export const deleteTask = (id) => {
  return fetch(API_URL + `/${id}`, {
    method: "DELETE",
  });
};

// update a single task
export const putTask = (id, { title, description, isComplete }) => {
  return fetch(API_URL + `/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      description,
      isComplete,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
