function showNotification(message, type) {
  const notification = document.getElementById("notification");
  const successIcon = document.getElementById("successIcon");
  const errorIcon = document.getElementById("errorIcon");
  const notificationMessage = document.getElementById("notificationMessage");

  notificationMessage.textContent = message;
  notification.classList.add("visible");

  if (type === "success") {
    successIcon.style.display = "flex";
    errorIcon.style.display = "none";
  } else {
    successIcon.style.display = "none";
    errorIcon.style.display = "flex";
  }

  setTimeout(() => notification.classList.remove("visible"), 3000);
}
