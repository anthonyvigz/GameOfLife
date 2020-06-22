import React from "react";
import Grid from "./Grid";
import "../styling/grid.scss";
import { motion } from "framer-motion";

function GameScreen(props) {
  // variants for parent animation
  const parentList = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      x: -55,
      transition: {
        when: "afterChildren",
      },
    },
  };
  return (
    <motion.div
      variants={parentList}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        ease: "easeIn",
        duration: 2,
        type: "spring",
        stiffness: 100,
      }}
    >
      <Grid props={props} />
    </motion.div>
  );
}
export default GameScreen;
