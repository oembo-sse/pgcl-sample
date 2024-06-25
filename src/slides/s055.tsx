import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { tex, text } from "../Katex";
import { makeSlide } from "../hooks";
import { operationalSemantics } from "../semantics";
import { Code } from "../CodeEditor";
import { appear, useSlide } from "../slides";
import { Callout, H } from "../common";
import React from "react";

const steps = [
  (delta: number) =>
    delta > 2 ? null : (
      <motion.div layout="position" layoutId="Paths">
        <Callout title="Reminder:">
          <div className="flex justify-center flex-col items-center gap-4">
            <div className="text-3xl">
              <div className="text-3xl">{text`A $\\Path$ is a sequence of states $s_0s_1\\dots s_n$ such that,`}</div>
            </div>
            <div className="text-3xl">{tex`\\forall i \\in 0\\dots n - 1. \\: \\H{\\exists \\alpha.} \\: 0 < \\P(s_i, \\H{\\alpha})(s_{i+1})`}</div>
          </div>
        </Callout>
      </motion.div>
    ),
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      A {tex`\\Scheduler : (s : \\State) \\to \\act(s)`} is a dependent function
      that <br /> selects an action for each state.
    </div>
  </div>,
  (delta: number) =>
    delta > 2 ? null : (
      <Callout title="Scheduled paths:">
        <div className="flex justify-center flex-col items-center gap-4">
          <div className="text-3xl">
            <div className="text-3xl">{text`A \\textit{scheduled $\\Path$} is a sequence of states $s_0s_1\\dots s_n$ with a scheduler $\\Sche$ such that,`}</div>
          </div>
          <div className="text-3xl">{tex`\\forall i \\in 0\\dots n - 1. \\: 0 < \\P(s_i, \\Sche(s_i))(s_{i+1})`}</div>
        </div>
      </Callout>
    ),
  null,
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      <div className="text-3xl">
        The probability {tex`\\Prob : \\Scheduler \\to \\Path \\to \\ENNReal`}{" "}
        computes the probability of <br /> a path with respect to a given
        scheduler.
      </div>
    </div>
    <div className="text-3xl">{tex`\\Prob(\\Sche, s_0\\dots s_n) = \\displaystyle \\prod_{i \\:\\in\\: 0\\dots n - 1} \\P(s_i, \\Sche(s_i))(s_{i+1})`}</div>
  </div>,
  null,
  <div className="text-3xl">
    A function {tex`\\Rew : \\State \\to \\ENNReal`} assigned rewards to states.
  </div>,
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      <div className="text-3xl">
        The reward {tex`\\rew{} : \\Rew \\to \\Path \\to \\ENNReal`} computes
        total reward of <br /> a path given a reward function.
      </div>
    </div>
    <div className="text-3xl">{tex`\\rew{}(r, s_0\\dots s_n) = \\displaystyle \\sum_{s \\in s_0\\dots s_n} r(s)`}</div>
  </div>,
  null,
];

export const s055 = makeSlide(steps.length + 1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <div className="text-7xl flex whitespace-pre">
        <AnimatePresence>
          <motion.span layout="position">
            <H>Paths</H> and <H>schedulers</H>
          </motion.span>
        </AnimatePresence>
      </div>
      <LayoutGroup>
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
      </LayoutGroup>
    </div>
  );
});
