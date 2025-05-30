"use client";

import { motion } from "motion/react";
import { JSX } from "react";
import { parseText } from "./utils";

type PropsType = {
  text: string;
  wrapper: keyof JSX.IntrinsicElements;
  separator?: string;
  props?: JSX.IntrinsicAttributes;
  duration?: number;
  wordsSpace?: number;
};

export default function PopText({
  wrapper: Wrapper,
  text,
  separator = " ",
  props,
  duration = 0.1,
  wordsSpace = 2,
}: PropsType) {
  const parts = parseText(text, separator);

  return (
    <Wrapper
      {...props}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: wordsSpace,
        maxWidth: "100%",
        alignItems: "center",
      }}
    >
      {parts.map(({ word, isBold }, index) => (
        <motion.span
          key={index}
          style={{
            display: "inline-block",
            whiteSpace: "normal",
            fontWeight: isBold ? "bold" : "inherit",
          }}
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration, delay: index * duration, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </Wrapper>
  );
}
