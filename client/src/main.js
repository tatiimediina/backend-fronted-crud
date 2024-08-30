import "./style.css";

import { getAllTasks, postTasks } from "./services";
import { renderTask } from "./tasks";

const pathname = window.location.pathname;

const $app = document.querySelector("#app");
const $taskForm = document.querySelector("#create-task-form");

if (pathname === "/login") {
  $app.innerHTML += `<h1>hola</h1>`;
}

$taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const $title = document.querySelector("#input-title");
  const $description = document.querySelector("#input-description");
  const $isComplete = document.querySelector("#input-is-complete");

  const newTask = {
    title: $title.value,
    description: $description.value,
    isComplete: $isComplete.checked,
  };

  postTasks(newTask).then((result) => {
    $app.appendChild(renderTask(result));
    event.target.reset();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  getAllTasks().then((tasks) => {
    tasks.forEach((task) => {
      $app.appendChild(renderTask(task));
    });
  });
});
