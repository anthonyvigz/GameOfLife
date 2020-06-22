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
  const [numCols, setCols] = useState(24);
  const [numRows, setRows] = useState(24);
  const [counter, setCounter] = useState(0);
  const [speed, setSpeed] = useState(500);

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

  const runningSpeed = useRef();
  runningSpeed.current = speed;

  const runningGrid = useRef();
  runningGrid.current = grid;

  const runningCount = useRef();
  runningCount.current = counter;

  // this handles the speed change
  const speedChange = (event) => {
    event.preventDefault();

    setSpeed(parseInt(event.target.value));
  };

  // this sets the new grid
  const resetGrid = () => {
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            gridCopy[i][k] = 0;
          }
        }
      });
    });
    setCounter(0);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    const firstGrid = runningGrid.current;
    const count = runningCount.current;

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
    if (firstGrid === runningGrid.current) {
      setRunning(!running);
    } else {
      const newCount = count + 1;
      console.log(newCount);
      setCounter(newCount);
    }

    // simulate
    setTimeout(runSimulation, runningSpeed.current);
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
      <h2>{counter}</h2>
      <div className="buttons">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
          style={{
            fontSize: "1.3em",
            padding: "5px 15px",
            marginBottom: "15px",
            color: "white",
            backgroundColor: running ? "#f52a3b" : "#7aeb34",
          }}
        >
          {running ? "STOP" : "START"}
        </button>
        <button onClick={resetGrid}>NEW</button>
        <select onChange={speedChange} id="speed">
          <option value={2000}>2 Seconds</option>
          <option value={1000}>1 Second</option>
          <option value={500} selected>
            1/2 Second
          </option>
          <option value={100}>1/10 Second</option>
        </select>
      </div>
    </div>
  );
}

export default App;
