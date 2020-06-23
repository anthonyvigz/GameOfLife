import React from "react";
import "../styling/info.scss";
import { motion } from "framer-motion";

function Info1(props) {
  const goToInfo = (event) => {
    event.preventDefault();

    props.history.push("turing");
  };

  const goToGame = (event) => {
    event.preventDefault();

    props.history.push("gamescreen");
  };

  // variants for parent animation
  const parentList = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  // variants for word animation
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -55 },
  };
  return (
    <motion.div
      variants={parentList}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="infoBlock"
    >
      <motion.h2
        variants={item}
        transition={{
          ease: "easeIn",
          duration: 2,
          type: "spring",
          stiffness: 100,
        }}
      >
        The Rules of the Game
      </motion.h2>
      <motion.p
        variants={item}
        transition={{
          ease: "easeIn",
          duration: 2,
          type: "spring",
          stiffness: 100,
        }}
      >
        <span>Conway's Game of Life</span> is a cellular automaton designed by
        John Conway in 1970. The rules of the game are simple. Within a grid
        contains a number of cells that are destined to come alive or to die
        based on their neighbors' current states. <br />
        <p>
          If a cell is alive and if 2 or 3 neighbors are also alive, then it
          stays alive. If this isn't true, then it dies. If a cell is dead and
          has <span>exactly</span> 3 living neighbors, then it comes to life!
          Otherwise, it stays dead.
        </p>
        <p>
          These conditions can create "living" patterns as the computer
          continues to check for them. This "zero-player" game is considered{" "}
          <span>Turing Complete.</span>
        </p>
      </motion.p>
      <motion.button
        className="turingComplete"
        variants={item}
        transition={{
          ease: "easeIn",
          duration: 3,
          type: "spring",
          stiffness: 100,
        }}
        onClick={goToInfo}
      >
        Turing Completeness
        <i className="fa fa-arrow-right"></i>
      </motion.button>
      <motion.button
        className="goToGame"
        onClick={goToGame}
        variants={item}
        transition={{
          ease: "easeIn",
          duration: 3,
          type: "spring",
          stiffness: 100,
        }}
      >
        Go To Game
        <i className="fa fa-arrow-right"></i>
      </motion.button>
    </motion.div>
  );
}
export default Info1;
