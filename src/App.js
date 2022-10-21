import React, { useState } from "react";
import "./App.css";

function create2dArray(n, m) {
  return new Array(n).fill().map((_) => new Array(m).fill(false));
}

// 0 = Empty Space
// 1 = Wall
// 2 = Source
// 3 = Destination
const EMPTY_SPACE = 0;
const WALL = 1;
const SOURCE = 2;
const DESTINATION = 3;

const CELL_COLOR = ["#eeeeee", "#000000", "#ff0000", "#0000ff"];

function createInitialMap() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

function createDummyRoute() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

function GameMap({ grid, onClick, route }) {
  return (
    <table>
      <tbody>
        {grid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((column, columnIndex) => {
              let bgColor = CELL_COLOR[column];
              if (
                route[rowIndex][columnIndex] === 4 &&
                column === EMPTY_SPACE
              ) {
                bgColor = "#0f0";
              }

              return (
                <td
                  key={columnIndex}
                  style={{
                    background: bgColor,
                    height: 20,
                    width: 20,
                  }}
                  onClick={() => onClick(rowIndex, columnIndex)}
                ></td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function findValueInGrid(grid, value) {
  for (let sy = 0; sy < grid.length; sy++) {
    for (let sx = 0; sx < grid[sy].length; sx++) {
      if (grid[sy][sx] === value) return { x: sx, y: sy };
    }
  }

  return null;
}

function pushToQueue(grid, q, x, y, px, py) {
  if (x < 0) return;
  if (y < 0) return;
  if (x >= grid[0].length) return;
  if (y >= grid.length) return;
  if (grid[y][x] === WALL) return;
  if (typeof grid[y][x] === "object") return;

  grid[y][x] = { x: px, y: py };
  q.push({ x, y });
}

function findRoute(grid) {
  // where is the source location
  // where is the destination location
  const srcLocation = findValueInGrid(grid, SOURCE);
  const destLocation = findValueInGrid(grid, DESTINATION);

  if (!srcLocation || !destLocation) return;

  const copyGrid = grid.map((row) => [...row]);

  const q = [];
  pushToQueue(copyGrid, q, srcLocation.x, srcLocation.y, null, null);

  while (q.length > 0) {
    const pop = q.shift();
    if (pop.x === destLocation.x && pop.y === destLocation.y) break;
    pushToQueue(copyGrid, q, pop.x + 1, pop.y, pop.x, pop.y);
    pushToQueue(copyGrid, q, pop.x - 1, pop.y, pop.x, pop.y);
    pushToQueue(copyGrid, q, pop.x, pop.y + 1, pop.x, pop.y);
    pushToQueue(copyGrid, q, pop.x, pop.y - 1, pop.x, pop.y);
  }

  let ptr = destLocation;
  while (ptr.y !== null) {
    const tmp = copyGrid[ptr.y][ptr.x];
    copyGrid[ptr.y][ptr.x] = 4;
    ptr = tmp;
  }

  return copyGrid;
}

function App() {
  const [grid, setGrid] = useState(createInitialMap());
  const [editMode, setEditMode] = useState(WALL);
  const [route, setRoute] = useState(
    create2dArray(grid.length, grid[0].length)
  );

  const onCellClicked = (y, x) => {
    if (editMode === WALL || editMode === EMPTY_SPACE) {
      grid[y][x] = editMode;
      setGrid([...grid]);
    } else if (editMode === SOURCE || editMode === DESTINATION) {
      const found = findValueInGrid(grid, editMode);
      if (found) {
        grid[found.y][found.x] = EMPTY_SPACE;
      }
      grid[y][x] = editMode;
      setGrid([...grid]);
    }
  };

  const onRouteClicked = () => {
    setRoute(findRoute(grid));
  };

  return (
    <div>
      <GameMap grid={grid} onClick={onCellClicked} route={route} />
      <div>
        {[
          ["Empty Space", EMPTY_SPACE],
          ["Wall", WALL],
          ["Source", SOURCE],
          ["Destination", DESTINATION],
        ].map(([buttonName, buttonMode]) => (
          <button
            key={buttonMode}
            style={{
              background: editMode === buttonMode ? "#e00" : undefined,
              color: editMode === buttonMode ? "#fff" : undefined,
            }}
            onClick={() => setEditMode(buttonMode)}
          >
            {buttonName}
          </button>
        ))}
        <button onClick={onRouteClicked}>Find route</button>
      </div>
    </div>
  );
}

export default App;
