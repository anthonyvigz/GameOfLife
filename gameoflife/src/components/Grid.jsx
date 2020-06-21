import React, { useState, useCallback, useRef, useEffect } from "react";
import "../styling/grid.scss";
import produce from "immer";

const operations = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
  [1, 0],
  [-1, 0],
];

function App() {
  // state for setting the rows and columns
  const [numRows, setRows] = useState(30);
  const [numCols, setCols] = useState(30);

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef();
  runningRef.current = running;

  // this is the change handler for input values for making grid
  const numHandler = (event) => {
    event.preventDefault();

    if (event.target.name === "numRows") {
      setRows(parseInt(event.target.value));
    } else if (event.target.name === "numCols") {
      setCols(parseInt(event.target.value));
    }
  };

  // this sets the new grid
  const setValues = (event) => {
    event.preventDefault();

    setRows(event.target.value);
    setCols(event.target.value);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    // simulate
    setTimeout(runSimulation, 100);
  }, []);

  return (
    <div className="gameSettings">
      <div className="gridHolder">
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 17px`,
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                key={`${i}-${k}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[i][k] = grid[i][k] ? 0 : 1;
                  });
                  setGrid(newGrid);
                }}
                className="block"
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: grid[i][k] ? "white" : undefined,
                }}
              />
            ))
          )}
        </div>
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "stop" : "start"}
        </button>
        <input name="numRows" onChange={numHandler} value={numRows} />
        <input name="numCols" onChange={numHandler} value={numCols} />
        <button type="submit" onSubmit={setValues}>
          New Grid
        </button>
      </div>
    </div>
  );
}

export default App;
