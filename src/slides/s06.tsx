import { AnimatePresence, motion } from "framer-motion";
import { tex, text } from "../Katex";
import { makeSlide } from "../hooks";
import { operationalSemantics } from "../semantics";
import { Code } from "../CodeEditor";
import { appear, useSlide } from "../slides";
import { H } from "../common";
import React from "react";

const steps = [
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      <div className="text-3xl">
        The function{" "}
        {tex`\\ER : \\Scheduler \\to \\Rew \\to \\State \\to \\ENNReal`}{" "}
        computes <br /> <i>expected reward</i> of the <H>MDP</H> starting in{" "}
        {tex`s`}.
      </div>
    </div>
    <div className="text-3xl">{tex`\\ER(\\Sche, r, s) = \\displaystyle \\sum_{\\pi \\:\\in\\: \\Paths(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi)`}</div>
  </div>,
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      <div className="text-3xl">
        The function {tex`\\MinER : \\Rew \\to \\State \\to \\ENNReal`} computes
        the minimum <br /> expected reward by taking the <i>infimum</i> over
        schedulers.
      </div>
    </div>
    <div className="text-3xl">{tex`\\MinER(r, s) = \\displaystyle \\inf_{\\Sche \\:\\in\\: \\Scheduler} \\ER(\\Sche, r, s)`}</div>
  </div>,
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      <div className="text-3xl">
        Similarly, {tex`\\MaxER : \\Rew \\to \\State \\to \\ENNReal`} computes
        the maximum <br /> expected reward by taking the <i>supremum</i> over
        schedulers.
      </div>
    </div>
    <div className="text-3xl">{tex`\\MaxER(r, s) = \\displaystyle \\sup_{\\Sche \\:\\in\\: \\Scheduler} \\ER(\\Sche, r, s)`}</div>
  </div>,
  null,
];

export const s06 = makeSlide(steps.length + 1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <div className="text-7xl flex whitespace-pre">
        <AnimatePresence>
          <motion.span layout="position">
            <H>Expected rewards</H>
          </motion.span>
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
