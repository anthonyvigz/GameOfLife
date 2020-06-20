import React from "react";
import "../styling/info.scss";
import { motion } from "framer-motion";

function Info1(props) {
  const goToInfo = (event) => {
    event.preventDefault();

    props.history.push("turing");
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
        Talk About Conway
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Luctus accumsan
        tortor posuere ac. Lectus vestibulum mattis ullamcorper velit sed
        ullamcorper morbi. Eu scelerisque felis imperdiet proin fermentum leo.
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
