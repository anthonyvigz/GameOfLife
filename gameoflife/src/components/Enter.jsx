import React from "react";
import "../styling/enter.scss";
import { motion } from "framer-motion";

function Enter(props) {
  const goToInfo = (event) => {
    event.preventDefault();

    props.history.push("whatisit");
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
      className="enterScreen"
    >
      <motion.h1
        variants={item}
        transition={{
          ease: "easeIn",
          duration: 2,
          type: "spring",
          stiffness: 100,
        }}
      >
        Conway's Game of Life
      </motion.h1>
      <motion.h2
        variants={item}
        transition={{
          ease: "easeIn",
          duration: 2.5,
          type: "spring",
          stiffness: 100,
        }}
      >
        {" "}
        Interpretation by Anthony Vigliotta
      </motion.h2>
      <motion.button
        className="whatIsIt"
        variants={item}
        transition={{
          ease: "easeIn",
          duration: 3,
          type: "spring",
          stiffness: 100,
        }}
        onClick={goToInfo}
      >
        What Is It?
        <i className="fa fa-arrow-right"></i>
      </motion.button>
      <motion.button
        className="goToGame"
        variants={item}
        transition={{
          ease: "easeIn",
          duration: 3,
          type: "spring",
          stiffness: 100,
        }}
        onClick={goToGame}
      >
        Go To Game
        <i className="fa fa-arrow-right"></i>
      </motion.button>
    </motion.div>
  );
}
export default Enter;
