const API_URL = "https://dummyjson.com/todos";
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

function loadTodosFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function saveTodosToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleInputsState(disabled) {
  const inputs = document.querySelectorAll("input, button, select, textarea");
  inputs.forEach((input) => {
    input.disabled = disabled;
  });
}

async function fetchTodos() {
  toggleInputsState(true);
  showLoading();
  try {
    const todosFromStorage = loadTodosFromLocalStorage();
    if (todosFromStorage.length > 0) {
      renderTodos(todosFromStorage);
    } else {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      renderTodos(data.todos);

      saveTodosToLocalStorage(data.todos);
    }
  } catch (error) {
    showNotification("Error fetching todos", "error");
    console.error(error);
  } finally {
    hideLoading();
    toggleInputsState(false);
  }
}

async function addTodo(newTodo, isCompleted) {
  const customId = new Date().getTime();
  toggleInputsState(true);
  console.log(newTodo);

  try {
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: newTodo,
        completed: isCompleted,
        userId: 5,
      }),
    });

    const createdTodo = await response.json();
    console.log("Created Todo:", createdTodo);
    // Store the Todo with the custom ID
    const finalTodo = {
      ...createdTodo,
      id: createdTodo.id === 255 ? customId : createdTodo.id,
    };

    const currentTodos = loadTodosFromLocalStorage();
    currentTodos.push(finalTodo);
    saveTodosToLocalStorage(currentTodos);

    renderTodos(currentTodos);

    showNotification("Task added successfully!", "success");
  } catch (error) {
    showNotification("Error adding task", "error");
    console.error(error);
  } finally {
    toggleInputsState(false);
  }
}

async function editTodo(todoId, updatedText, isCompleted) {
  toggleInputsState(true);

  try {
    await fetch(`${API_URL}/${todoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: updatedText, completed: isCompleted }),
    });

    const currentTodos = loadTodosFromLocalStorage();
    console.log(currentTodos);
    const todoIndex = currentTodos.findIndex((todo) => todo.id === todoId);

    if (todoIndex !== -1) {
      currentTodos[todoIndex].todo = updatedText;
      saveTodosToLocalStorage(currentTodos);
      renderTodos(currentTodos);
    }
    showNotification("Task updated successfully!", "success");
  } catch (error) {
    showNotification("Error updating task", "error");
    console.error(error);
  } finally {
    toggleInputsState(false);
  }
}

// Delete a todo
async function deleteTodo(todoId) {
  toggleInputsState(true); // Disable inputs during the API call

  try {
    await fetch(`${API_URL}/${todoId}`, {
      method: "DELETE",
    });
    // Remove the todo from localStorage
    const currentTodos = loadTodosFromLocalStorage();
    const updatedTodos = currentTodos.filter((todo) => todo.id !== todoId);
    saveTodosToLocalStorage(updatedTodos);
    renderTodos(updatedTodos); // Re-render todos after deletion
    showNotification("Task deleted successfully!", "success");
  } catch (error) {
    showNotification("Error deleting task", "error");
    console.error(error);
  } finally {
    toggleInputsState(false); // Enable inputs after the API call
  }
}
