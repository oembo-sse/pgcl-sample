import { AnimatePresence, motion } from "framer-motion";
import { tex, text } from "../Katex";
import { makeSlide } from "../hooks";
import { operationalSemantics } from "../semantics";
import { Code } from "../CodeEditor";
import { appear, useSlide } from "../slides";
import { H } from "../common";
import React from "react";
import { LeanLogo } from "../assets/lean_logo";

const steps = [
  <div className="text-5xl text-center flex flex-col items-center">
    Formalize in the Lean theorem prover
    <LeanLogo className="w-50" />
  </div>,
  <div className="text-5xl text-center flex flex-col items-center">
    Specify and implement a language for shared <br /> verification of
    probabilistic programs:
  </div>,
  <div className="text-3xl text-center flex flex-col items-center italic">
    "The LSP/LLVM for probabilistic programming."
  </div>,
  null,
];

export const s85 = makeSlide(steps.length + 1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <div className="text-7xl flex whitespace-pre">
        <AnimatePresence>
          <motion.span layout="position">Current and future work</motion.span>
        </AnimatePresence>
      </div>
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
    </div>
  );
});
