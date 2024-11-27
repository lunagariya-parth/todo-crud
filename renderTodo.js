const listContainer = document.getElementById("list");

function createTodoElement(todo) {
  const todoItem = document.createElement("div");
  todoItem.className = `task ${todo.completed ? "task-completed" : ""}`;
  todoItem.dataset.id = todo.id;

  todoItem.innerHTML = `
    <div class="checkbox">
      <input 
        type="checkbox" 
        ${todo.completed ? "checked" : ""} 
        class="todo-checkbox" 
      />
      <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <textarea class="title" rows="1">${todo.todo}</textarea>
    <button class="delete">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--clr-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;

  return todoItem;
}

function renderTodos(todos, action = "full-refresh", updatedTodo = null) {
  if (action === "full-refresh") {
    listContainer.innerHTML = "";
    todos.forEach((todo) => {
      const todoItem = createTodoElement(todo);
      listContainer.appendChild(todoItem);
    });
  } else if (action === "add") {
    const todoItem = createTodoElement(updatedTodo);
    listContainer.appendChild(todoItem);
  }
}

// Handle events using delegation
listContainer.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest(".delete")) {
    const todoElement = target.closest(".task");
    const todoId = todoElement.dataset.id;
    deleteTodo(todoId);
    return;
  }

  // Handle checkbox toggle
  if (target.classList.contains("todo-checkbox")) {
    const todoElement = target.closest(".task");
    const todoId = todoElement.dataset.id;
    const isCompleted = target.checked;
    const title = todoElement.querySelector(".title").value;

    todoElement.classList.toggle("task-completed", isCompleted);
    editTodo(todoId, title, isCompleted);
  }
});

listContainer.addEventListener(
  "blur",
  (event) => {
    if (event.target.classList.contains("title")) {
      const todoElement = event.target.closest(".task");
      const todoId = todoElement.dataset.id;
      const updatedText = event.target.value.trim();
      const isCompleted = todoElement.querySelector(".todo-checkbox").checked;

      if (updatedText) {
        editTodo(todoId, updatedText, isCompleted);
      } else {
        console.log("Task text cannot be empty.");
      }
    }
  },
  true
);

// Add new todo
const newTodoTextarea = document.getElementById("newTodoTextarea");
const newTask = document.getElementById("newTask");
const newTodoAddButton = document.getElementById("newTodoAdd");
const newTodoCheckbox = document.getElementById("newTodoCheckbox");

newTodoAddButton.addEventListener("click", () => {
  const newTodoText = newTodoTextarea.value.trim();
  const newTodoState = newTodoCheckbox.checked;

  if (newTodoText) {
    addTodo(newTodoText, newTodoState);
    newTodoTextarea.value = "";
    newTodoCheckbox.checked = false;
    newTask.classList.remove("task-completed");
  } else {
    console.log("Todo text is empty!");
  }
});
