import { deleteTask, putTask } from "./services";

export const renderTask = (task) => {
  const $taskContainer = document.createElement("div");
  $taskContainer.classList.add(
    "task-item",
    "bg-slate-200",
    "m-2",
    "rounded-xl",
    "p-4",
    "shadow-md",
    "flex",
    "flex-col",
    "space-y-2"
  );

  const taskTitle = document.createElement("p");
  const $taskDescription = document.createElement("p");
  const $taskIsCompleted = document.createElement("input");
  const $taskDelete = document.createElement("button");

  taskTitle.classList.add("task-title", "text-center", "font-bold", "text-lg");
  taskTitle.textContent = task.title;

  if (task.isComplete) {
    taskTitle.classList.add("line-through", "text-gray-500");
  }

  $taskContainer.appendChild(taskTitle);

  $taskDescription.classList.add(
    "task-description",
    "text-center",
    "italic",
    "text-slate-600"
  );
  $taskDescription.textContent = task.description;

  if (task.isComplete) {
    $taskDescription.classList.add("line-through", "text-gray-500");
  }

  $taskContainer.appendChild($taskDescription);

  $taskIsCompleted.type = "checkbox";
  $taskIsCompleted.classList.add("justify-center", "items-center");
  $taskIsCompleted.checked = task.isComplete;
  $taskIsCompleted.classList.add("h-4", "w-4", "text-slate-800");

  $taskIsCompleted.addEventListener("change", (event) => {
    task.isComplete = event.target.checked;
    taskTitle.classList.toggle("line-through", task.isComplete);
    $taskDescription.classList.toggle("line-through", task.isComplete);
    taskTitle.classList.toggle("text-gray-500", task.isComplete);
    $taskDescription.classList.toggle("text-gray-500", task.isComplete);

    putTask(task.id, {
      title: task.title,
      description: task.description,
      isComplete: task.isComplete,
    });
  });

  $taskContainer.appendChild($taskIsCompleted);

  $taskDelete.textContent = "Delete";
  $taskDelete.classList.add(
    "bg-red-600",
    "text-white",
    "py-1",
    "px-4",
    "rounded-lg",
    "hover:bg-red-700",
    "transition"
  );

  $taskDelete.addEventListener("click", () => {
    deleteTask(task.id).then(() => {
      $taskContainer.remove();
    });
  });

  $taskContainer.appendChild($taskDelete);

  let $editButton = createEditButton();

  $editButton.addEventListener("click", () => {
    // Verifica si ya hay un formulario de edición
    if (
      $taskContainer.querySelector("input[type='text']") ||
      $taskContainer.querySelector("textarea")
    ) {
      return;
    }

    toggleEditMode($taskContainer, task);
    $editButton.remove(); // Elimina el botón "Editar" después de hacer clic
  });

  $taskContainer.appendChild($editButton);

  function toggleEditMode($taskContainer, task) {
    const $taskTitle = $taskContainer.querySelector(".task-title");
    const $taskDescription = $taskContainer.querySelector(".task-description");
    const $checkbox = $taskContainer.querySelector("input[type='checkbox']");

    $taskTitle.classList.add("hidden");
    $taskDescription.classList.add("hidden");

    const $editTitleInput = document.createElement("input");
    $editTitleInput.type = "text"; // Añade un tipo para la verificación anterior
    $editTitleInput.value = task.title;
    $editTitleInput.classList.add(
      "border",
      "border-slate-300",
      "rounded-lg",
      "p-2",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-slate-500",
      "w-full"
    );

    const $editDescriptionInput = document.createElement("textarea");
    $editDescriptionInput.value = task.description;
    $editDescriptionInput.classList.add(
      "border",
      "border-slate-300",
      "rounded-lg",
      "p-2",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-slate-500",
      "w-full",
      "mt-2"
    );

    $taskContainer.appendChild($editTitleInput);
    $taskContainer.appendChild($editDescriptionInput);

    const $saveButton = document.createElement("button");
    $saveButton.textContent = "Guardar";
    $saveButton.classList.add(
      "bg-green-600",
      "text-white",
      "py-1",
      "px-4",
      "rounded-lg",
      "hover:bg-green-700",
      "transition",
      "mt-2"
    );

    $saveButton.addEventListener("click", () => {
      const updatedTitle = $editTitleInput.value;
      const updatedDescription = $editDescriptionInput.value;

      putTask(task.id, {
        title: updatedTitle,
        description: updatedDescription,
        isComplete: $checkbox.checked,
      })
        .then(() => {
          $taskTitle.textContent = updatedTitle;
          $taskDescription.textContent = updatedDescription;

          $taskTitle.classList.remove("hidden");
          $taskDescription.classList.remove("hidden");
          $editTitleInput.remove();
          $editDescriptionInput.remove();
          $saveButton.remove();

          // Vuelve a agregar el botón de editar
          $editButton = createEditButton();
          $editButton.addEventListener("click", () => {
            if (
              $taskContainer.querySelector("input[type='text']") ||
              $taskContainer.querySelector("textarea")
            ) {
              return;
            }

            toggleEditMode($taskContainer, task);
            $editButton.remove();
          });
          $taskContainer.appendChild($editButton);
        })
        .catch((error) => {
          console.error("Error al actualizar la tarea:", error);
          alert(
            "Se produjo un error al guardar los cambios. Por favor, inténtalo de nuevo."
          );
        });
    });

    $taskContainer.appendChild($saveButton);
  }

  function createEditButton() {
    const $editButton = document.createElement("button");
    $editButton.textContent = "Editar";
    $editButton.classList.add(
      "bg-slate-800",
      "text-white",
      "py-1",
      "px-4",
      "rounded-lg",
      "hover:bg-slate-900",
      "transition"
    );
    return $editButton;
  }

  return $taskContainer;
};
