const main = document.querySelector("main");

let count = 0;
const counter = document.createElement("span");
counter.className = "counter";

const incrementButton = document.createElement("button");
incrementButton.innerText = "+";
incrementButton.addEventListener('click', () => {
  count++;
  countDisplay.innerText = count;
});
counter.append(incrementButton);

const decrementButton = document.createElement("button");
decrementButton.innerText = "-";
decrementButton.addEventListener('click', () => {
  count--;
  countDisplay.innerText = count;
});
counter.append(decrementButton);

const countDisplay = document.createElement("span");
countDisplay.innerText = count;
counter.append(countDisplay);

main.append(counter);
