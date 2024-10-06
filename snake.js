"use strict";

import Grid from "./grid.js";
import Queue from "./queue.js";

window.addEventListener("load", start);

// ****** CONTROLLER ******
// #region controller

const queue = new Queue();

queue.enqueue({ row: 5, col: 5 });
queue.enqueue({ row: 5, col: 6 });
queue.enqueue({ row: 5, col: 7 });

function start() {
  console.log(`Javascript kører`);

  generateBoard();

  document.addEventListener("keydown", receiveInput);

  // start ticking
  tick();
}

function tick() {
  // setup next tick
  setTimeout(tick, 200);

  // TODO: Do stuff
  for (let i = 0; i < queue.size(); i++) {
    const part = queue.get(i);

    grid.set({ row: part.row, col: part.col, value: 0 });
  }

  const head = { row: queue.tail.data.row, col: queue.tail.data.col };

  switch (direction) {
    case "right":
      head.col++;
      if (head.col > grid.getCols() - 1) {
        head.col = 0;
      }
      break;
    case "left":
      head.col--;
      if (head.col < 0) {
        head.col = grid.getCols() - 1;
      }
      break;
    case "up":
      head.row--;
      if (head.row < 0) {
        head.row = grid.getRows() - 1;
      }
      break;
    case "down":
      head.row++;
      if (head.row > grid.getRows() - 1) {
        head.row = 0;
      }
      break;
    default:
      break;
  }

  queue.enqueue(head);
  queue.dequeue();

  for (let i = 0; i < queue.size(); i++) {
    const part = queue.get(i);

    grid.set({ row: part.row, col: part.col, value: 1 });
  }

  // display the model in full
  displayBoard();
}

function receiveInput(event) {
  console.log(event.key);
  switch (event.key) {
    case "ArrowUp":
    case "w":
      direction = "up";
      break;
    case "ArrowDown":
    case "s":
      direction = "down";
      break;
    case "ArrowLeft":
    case "a":
      direction = "left";
      break;
    case "ArrowRight":
    case "d":
      direction = "right";
      break;
    default:
      break;
  }
}

// #endregion controller

// ****** MODEL ******
const newHead = { row: queue.tail.data.row, col: queue.tail.data.col };
const player = { row: 5, col: 5 };
let direction = "right";

// #region model
const grid = new Grid(30, 30);

function generateGoal() {
  const row = Math.floor(Math.random() * grid.getRows());
  const col = Math.floor(Math.random() * grid.getCols());

  grid.set({ row, col, value: 2 });
}

generateGoal();

// #endregion model

// ****** VIEW ******
// #region view

function generateBoard() {
  const board = document.querySelector("#grid");

  for (let i = 0; i < grid.getRows() * grid.getCols(); i++) {
    board.insertAdjacentHTML(
      "beforeend",
      /*html*/
      `
      
        <div class="cell"></div>
        `
    );
  }

  board.style.gridTemplateColumns = `repeat(${grid.getCols()}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${grid.getRows()}, 1fr)`;
}

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < grid.getRows(); row++) {
    for (let col = 0; col < grid.getCols(); col++) {
      const index = row * grid.getCols() + col;

      switch (grid.get({ row, col })) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}

// #endregion view
