// handling user theme preferences
let toggle = document.getElementById("theme__toggle");

let storedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
if (storedTheme)
  document.documentElement.setAttribute("data-theme", storedTheme);

toggle.onclick = function () {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let targetTheme = "light";

  if (currentTheme === "light") {
    targetTheme = "dark";
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
};

// calculator logic
let calculatorKeys = document.querySelector(".calculator__keys");
let calculatorDisplay = document.querySelector(".calculator__display");
let originalDisplay = calculatorDisplay.innerHTML;
let displayStr = " ";
let calculatorArr = [];

function handleEquals(arr) {
  let str = " ";

  arr.forEach((element) => {
    str += element;
  });

  return eval(str);
}

calculatorKeys.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "BUTTON") {
    if (/[0-9]/.test(parseInt(e.target.innerHTML))) {
      while (displayStr.charAt(0) === "0") {
        displayStr = displayStr.substring(1);
      }
      displayStr += e.target.innerHTML;
      calculatorDisplay.innerHTML = displayStr;
    } else if (e.target.innerHTML == ".") {
      displayStr += ".";
      calculatorDisplay.innerHTML = displayStr;
    } else if (e.target.innerHTML == "AC") {
      displayStr = originalDisplay;
      calculatorArr = [];
      calculatorDisplay.innerHTML = displayStr;
    } else if (
      e.target.dataset.action == "addition" ||
      e.target.dataset.action == "subtraction" ||
      e.target.dataset.action == "multiplication" ||
      e.target.dataset.action == "division"
    ) {
      calculatorArr.push(displayStr);
      displayStr = originalDisplay;
      calculatorArr.push(e.target.innerHTML);
      console.log(calculatorArr);
    } else if (e.target.dataset.action == "equals") {
      calculatorArr.push(displayStr);
      console.log(calculatorArr);
      calculatorDisplay.innerHTML = handleEquals(calculatorArr);
    }
  }
});
