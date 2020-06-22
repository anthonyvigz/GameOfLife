import React, { useState, useCallback, useRef, useEffect } from "react";
import "../styling/grid.scss";
import produce from "immer";
import {
  pulsarTemplate,
  replicatorTemplate,
  cloverTemplate,
} from "./Templates";

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

  // this sets the pulsar template grid
  const pulsarGrid = () => {
    resetGrid();
    setCounter(0);
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        pulsarTemplate(gridCopy);
      });
    });
  };

  // this sets the pulsar template grid
  const replicatorGrid = () => {
    resetGrid();
    setCounter(0);
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        replicatorTemplate(gridCopy);
      });
    });
  };

  // this sets the clover template grid
  const cloverGrid = () => {
    resetGrid();
    setCounter(0);
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        cloverTemplate(gridCopy);
      });
    });
  };

  // set speed
  const upSpeed = (event) => {
    event.preventDefault();

    if (speed === 500) {
      setSpeed(100);
    } else if (speed === 100) {
      setSpeed(2000);
    } else if (speed === 2000) {
      setSpeed(1000);
    } else {
      setSpeed(500);
    }
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

    console.log(runningGrid.current);
    if (firstGrid === runningGrid.current) {
      setRunning(!running);
    } else {
      const newCount = count + 1;
      setCounter(newCount);
    }

    // simulate
    setTimeout(runSimulation, runningSpeed.current);
  }, []);

  return (
    <div className="wholeGame">
      <div className="gameSettings">
        <div className="templates">
          <h3>Presets</h3>
          <button onClick={pulsarGrid}>
            PULSAR <i className="fas fa-angle-right"></i>
          </button>
          <button onClick={replicatorGrid}>
            REPLICATOR <i className="fas fa-angle-right"></i>
          </button>
          <button onClick={cloverGrid}>
            CLOVER <i className="fas fa-angle-right"></i>
          </button>
        </div>
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
                    backgroundColor: grid[i][k] ? "white" : "black",
                  }}
                />
              ))
            )}
          </div>
          <button className="speed" onClick={upSpeed}>
            {speed === 2000 ? (
              <i class="fas fa-tachometer-slowest"></i>
            ) : speed === 1000 ? (
              <i class="fas fa-tachometer-slow"></i>
            ) : speed === 500 ? (
              <i class="fas fa-tachometer-fast"></i>
            ) : (
              <i class="fas fa-tachometer-fastest"></i>
            )}
          </button>
          <button
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
            style={{
              backgroundColor: running ? "#f52a3b" : "#7aeb34",
            }}
            className="startButton"
          >
            {running ? "STOP" : "START"}
          </button>
        </div>
        <div className="rightSide">
          <button className="newButton" onClick={resetGrid}>
            <i class="fas fa-trash-alt"></i>
          </button>
          <h2>{counter}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
