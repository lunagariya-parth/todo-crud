const listContainer = document.getElementById("list");

function renderTodos(todos, append = false) {
  if (!append) listContainer.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.className = ` task ${todo.completed ? "task-completed" : ""}`;
    todoItem.dataset.id = todo.id;

    todoItem.innerHTML = `
      <div class="checkbox">
        <input type="checkbox" ${todo.completed ? "checked" : ""} id="todoCheckbox" />
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

    // Add event listeners for edit and delete
    const titleElement = todoItem.querySelector(".title");
    const isCompleted = todoItem.querySelector("#todoCheckbox");
    const deleteButton = todoItem.querySelector(".delete");

    titleElement.addEventListener("blur", () =>
      editTodo(todo.id, titleElement.value, isCompleted.checked)
    );
    isCompleted.addEventListener("click", () =>
      editTodo(todo.id, titleElement.value, isCompleted.checked)
    );
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    listContainer.appendChild(todoItem);
  });
}

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
