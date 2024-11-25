// Foe theme handling
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function saveTheme(theme) {
  localStorage.setItem("selectedTheme", theme);
}

// Function to initialize the theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem("selectedTheme");
  const themeSelector = document.getElementById("theme");

  if (savedTheme) {
    applyTheme(savedTheme);
    themeSelector.value = savedTheme;
  }

  themeSelector.addEventListener("change", () => {
    const selectedTheme = themeSelector.value;
    applyTheme(selectedTheme);
    saveTheme(selectedTheme);
  });
}

initializeTheme();
