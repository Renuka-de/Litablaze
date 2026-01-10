let currentLevel = 0;

function goToLevel(level) {
  currentLevel = level;
  document.getElementById("container").style.transform =
    `translateY(-${level * 100}vh)`;
}
