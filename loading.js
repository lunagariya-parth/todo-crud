function showLoading() {
  const loadingElement = document.getElementById("loading");
  const mainElement = document.getElementById("main");
  loadingElement.classList.remove("d-none");
  mainElement.classList.add("d-none");
}

function hideLoading() {
  const loadingElement = document.getElementById("loading");
  const mainElement = document.getElementById("main");
  loadingElement.classList.add("d-none");
  mainElement.classList.remove("d-none");
}
