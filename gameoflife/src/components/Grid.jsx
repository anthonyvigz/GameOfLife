import React, { useState, useCallback, useRef, useEffect } from "react";
import "../styling/grid.scss";
import produce from "immer";
// import the template presets
import {
  pulsarTemplate,
  replicatorTemplate,
  cloverTemplate,
} from "./Templates";

// these operations aid the cells in deciding their states
// there are 8 possible neighbors, these arrays give the cells
// and operator to check each neighbor
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

function App(props) {
  // state for setting the rows and columns
  const [numCols, setCols] = useState(24);
  const [numRows, setRows] = useState(24);
  // sets the counter for the generations
  const [counter, setCounter] = useState(0);
  // sets the speed for the process run
  const [speed, setSpeed] = useState(500);
  // sets the initial empty grid
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });
  // sets the state for whether the render is running or not
  const [running, setRunning] = useState(false);

  // this sets the state for the cell colors
  const [color, setColor] = useState("white");

  // these are the reference variables for the state values
  // they allow the running callback function to have access
  // to changing variables
  const runningRef = useRef();
  runningRef.current = running;

  const runningSpeed = useRef();
  runningSpeed.current = speed;

  const runningGrid = useRef();
  runningGrid.current = grid;

  const runningCount = useRef();
  runningCount.current = counter;

  // function to exit to main menu
  const exit = (event) => {
    event.preventDefault();

    props.props.history.push("/");
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

  // this function updates the speed based on the current speed
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

  // this function updates the color based on the current color
  const changeColor = (event) => {
    event.preventDefault();

    if (color === "white") {
      setColor("pink");
    } else if (color === "pink") {
      setColor("lightblue");
    } else if (color === "lightblue") {
      setColor("orange");
    } else {
      setColor("white");
    }
  };

  // this is the callback function that continuously updates the grid
  // based on the last one
  const runSimulation = useCallback(() => {
    // if not running, stop the sim
    if (!runningRef.current) {
      return;
    }
    const firstGrid = runningGrid.current;
    const count = runningCount.current;

    // sets the next grid based on the current grid
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        /// goes through the rows and the columns to get a x, y value for each
        /// cell, applies the operations to each cell to check its neighbots
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              /// checks how many neighbors have a value of 1
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            // checks the amount of neighbors to set next cell state
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
    /// updates the generation count
    if (firstGrid === runningGrid.current) {
      setRunning(!running);
    } else {
      const newCount = count + 1;
      setCounter(newCount);
    }

    // simulate, checks the speed, recursive simulation
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
            {/* sets the current grid */}
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
                    backgroundColor: grid[i][k] ? color : "black",
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
          <button onClick={exit} className="exit">
            <i className="fas fa-angle-left"></i>Exit
          </button>
        </div>
        <div className="rightSide">
          <button className="newButton" onClick={resetGrid}>
            <i class="fas fa-trash-alt"></i>
          </button>
          <div className="counter">
            <h2 style={{ color: counter === 0 ? "white" : "lightblue" }}>
              {counter}
            </h2>
            <h4>Generations</h4>
            <button
              className="colorButton"
              onClick={changeColor}
              style={{ backgroundColor: color }}
            >
              Color
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
