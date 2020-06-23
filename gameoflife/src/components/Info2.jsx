import React from "react";
import "../styling/info.scss";
import { motion } from "framer-motion";

function Info2(props) {
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
        Turing Completeness
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
        For a process or system to be "Turing Complete" means it should be able
        to do anything a Turing machine can do. In brief, a Turing Complete
        system means a system in which a program can be written that will find
        an answer; that it can be used to solve any computation problem without
        regard of runtime or memory.
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
        onClick={goToGame}
      >
        Try The Game
        <i className="fa fa-arrow-right"></i>
      </motion.button>
    </motion.div>
  );
}
export default Info2;
