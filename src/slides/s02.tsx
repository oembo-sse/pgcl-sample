import { AnimatePresence, motion } from "framer-motion";
import { makeSlide } from "../hooks";
import { appear, useSlide } from "../slides";
import { grammar, operationalSemantics } from "../semantics";
import { tex, text } from "../Katex";
import React from "react";
import { H } from "../common";

const steps = [
  <div className="text-3xl">
    An <H>operational semantics</H> defines how a program is executed.
  </div>,
  <div className="text-3xl">
    A configuration {tex`\\Conf : \\pGCL \\times \\Mem`} is the combination{" "}
    <br />
    of a program and a memory, denoted by {tex`\\state{C}{\\sigma}`}.
  </div>,
  ...operationalSemantics.map(
    (op) => (delta: number) =>
      delta == 0 && (
        <div
          className={
            "flex flex-col items-center transition gap-20 " +
            (delta == 0 ? "text-4xl" : "text-xl")
          }
        >
          {op}
        </div>
      )
  ),
];

export const s02 = makeSlide(steps.length + 1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <AnimatePresence>
        <appear.div>
          <div className="text-7xl">
            <H>Operational semantics</H>
          </div>
        </appear.div>
        {steps.slice(0, step).map((s, idx) => {
          const delta = step - (idx + 1);
          const sf = typeof s == "function" ? s(delta) : s;
          return (
            <React.Fragment key={idx}>
              {sf && (
                <appear.div
                  key={idx}
                  from={idx + 1}
                  className={idx + 1 == step ? "mt-10 mb-32" : ""}
                >
                  {sf}
                </appear.div>
              )}
            </React.Fragment>
          );
        })}
      </AnimatePresence>
    </div>
  );
});
