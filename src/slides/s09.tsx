import { AnimatePresence, motion } from "framer-motion";
import { tex } from "../Katex";
import { makeSlide } from "../hooks";
import { appear, useSlide } from "../slides";
import { Callout, H } from "../common";
import React from "react";
import { weakestPre } from "../semantics";

const steps = [
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      <div className="text-3xl">
        The{" "}
        <H>
          <i>demonic</i> weakest pre-expectation
        </H>{" "}
        transforms an expression to the <i>expectation</i> <br />
        of that expression after executing the given program.
      </div>
    </div>
    <div className="text-3xl">{tex`\\H{\\mathbf{dwp}} : \\pGCL \\to \\Expr \\to \\Expr`}</div>
  </div>,
  ...weakestPre.map(
    (wp, idx) => (delta: number) =>
      delta - weakestPre.length + idx < 1 && (
        <div className="text-3xl flex gap-10">{wp}</div>
      )
  ),
  null,
  <div className="text-3xl flex gap-10">{tex`\\dwp{\\nondet{C_1}{C_2}}{X}(\\sigma) = (\\dwp{C_1}{X} \\sqcap \\dwp{C_2}{X})(\\sigma)`}</div>,
  <div className="text-3xl flex gap-10">{tex`\\dwp{\\loop{B}{C}}{X}(\\sigma) = (\\text{lfp} \\: \\lambda Y.\\: B \\cdot \\dwp{C}{Y} + \\neg B \\cdot X)(\\sigma)`}</div>,
  <Callout title="Reminder:">
    <div className="flex justify-center flex-col items-center gap-4">
      <div className="text-3xl">{tex`\\begin{aligned}
        \\lambda \\state{C}{\\sigma}.\\: &\\MinER(r, \\state{C}{\\sigma}) \\\\
            &= \\text{lfp}\\: \\lambda v.\\: \\lambda \\state{C}{\\sigma}.\\: r(\\state{C}{\\sigma}) + \\displaystyle \\inf_{\\alpha \\:\\in\\: \\Act} \\sum_{\\state{C'}{\\sigma'} \\:\\in\\: \\succs(\\state{C}{\\sigma})} \\cdots % \\P(\\state{C}{\\sigma}, \\alpha)(\\state{C'}{\\sigma'}) \\cdot v(\\state{C'}{\\sigma'})
        \\end{aligned}`}</div>
    </div>
  </Callout>,
  null,
];

export const s09 = makeSlide(steps.length + 1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <div className="text-7xl flex whitespace-pre">
        <AnimatePresence>
          <motion.span layout="position" className="text-center">
            <H>Weakest pre-expectation</H>
          </motion.span>
        </AnimatePresence>
      </div>
      {steps.slice(0, step).map((s, idx) => {
        const delta = step - (idx + 1);
        const sf = typeof s == "function" ? s(delta) : s;

        if (sf && typeof sf == "object" && "render" in sf) {
          if ("appear" in sf && !sf.appear) {
            return (
              <React.Fragment key={idx}>
                <div key={idx} className={idx + 1 == step ? "mt-10 mb-32" : ""}>
                  {sf.render}
                </div>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={idx}>
                <appear.div
                  key={idx}
                  from={idx + 1}
                  className={idx + 1 == step ? "mt-10 mb-32" : ""}
                >
                  {sf.render}
                </appear.div>
              </React.Fragment>
            );
          }
        } else {
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
        }
      })}
    </div>
  );
});
