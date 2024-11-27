const API_URL = "https://dummyjson.com/todos";

const API_ENDPOINTS = {
  FETCH: API_URL,
  ADD: `${API_URL}/add`,
  UPDATE: (id) => `${API_URL}/${id}`,
  DELETE: (id) => `${API_URL}/${id}`,
};

function toggleTaskCompletion() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          task.classList.add("task-completed");
        } else {
          task.classList.remove("task-completed");
        }
      });
    }
  });
}

function toggleInputsState(container, disabled, selector = "input, button, select, textarea") {
  const inputs = container.querySelectorAll(selector);
  inputs.forEach((input) => {
    input.disabled = disabled;
  });
}

// CRUD functions
async function fetchTodos() {
  showLoading();
  try {
    const response = await fetch(API_ENDPOINTS.FETCH);
    const data = await response.json();
    renderTodos(data.todos, "full-refresh");
  } catch (error) {
    showNotification("Error fetching todos", "error");
    console.error(error);
  } finally {
    hideLoading();
  }
}

async function addTodo(newTodo, isCompleted) {
  const newTaskElement = document.getElementById("newTask");
  toggleInputsState(newTaskElement, true);

  try {
    const response = await fetch(API_ENDPOINTS.ADD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: newTodo,
        completed: isCompleted,
        userId: 5,
      }),
    });

    const createdTodo = await response.json();
    renderTodos([], "add", createdTodo);
    showNotification("Task added successfully!", "success");
  } catch (error) {
    showNotification("Error adding task", "error");
    console.error(error);
  } finally {
    toggleInputsState(newTaskElement, false);
  }
}

async function editTodo(todoId, updatedText, isCompleted) {
  const taskElement = document.querySelector(`.task[data-id="${todoId}"]`);
  toggleInputsState(taskElement, true);

  try {
    await fetch(API_ENDPOINTS.UPDATE(todoId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: updatedText, completed: isCompleted }),
    });

    showNotification("Task updated successfully!", "success");
  } catch (error) {
    showNotification("Error updating task", "error");
    console.error(error);
  } finally {
    toggleInputsState(taskElement, false);
  }
}

async function deleteTodo(todoId) {
  const taskElement = document.querySelector(`.task[data-id="${todoId}"]`);
  toggleInputsState(taskElement, true);

  try {
    await fetch(API_ENDPOINTS.DELETE(todoId), { method: "DELETE" });
    taskElement.remove(); 
    showNotification("Task deleted successfully!", "success");
  } catch (error) {
    showNotification("Error deleting task", "error");
    console.error(error);
  } 
}


