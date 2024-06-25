import { AnimatePresence, motion } from "framer-motion";
import { tex, text } from "../Katex";
import { makeSlide } from "../hooks";
import { operationalSemantics } from "../semantics";
import { Code } from "../CodeEditor";
import { appear, useSlide } from "../slides";
import { H } from "../common";
import React from "react";

const steps = [
  (delta: number) =>
    delta > 5 ? null : (
      <div className="flex justify-center flex-col items-center gap-4">
        <div className="text-3xl">
          <div className="text-3xl">
            We define {tex`\\orew : \\Expr \\to \\Rew`} the be the reward
            funciton for {tex`\\pGCL`}.
          </div>
        </div>
        <div className="text-3xl">{tex`\\orew(X)(\\state{C}{\\sigma}) = \\begin{cases}
        X(\\sigma) & \\text{if } C =\: \\sink \\\\
        A(\\sigma) & \\text{if } C = \\tick{A} \\\\
        0 & \\text{otherwise} \\\\
    \\end{cases}`}</div>
      </div>
    ),
  (delta: number) =>
    delta > 4 ? null : (
      <div className="flex justify-center flex-col items-center gap-4">
        {/* <div className="text-3xl">
      <div className="text-3xl">
        The function {tex`\\MinER : \\Rew \\to \\State \\to \\ENNReal`} computes
        the minimum <br /> expected reward by taking the <i>infimum</i> over
        schedulers.
      </div>
    </div> */}
        <div className="text-4xl">{tex`\\MinER(\\orew(X), \\state{C}{\\sigma}) = \\displaystyle \\inf_{\\Sche \\:\\in\\: \\Scheduler} \\displaystyle \\sum_{\\pi \\:\\in\\: \\Paths(\\state{C}{\\sigma})} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(\\orew(X), \\pi)`}</div>
      </div>
    ),
  (delta: number) =>
    delta > 3 ? null : (
      <div className="text-4xl">{tex`= [\\text{lfp}\\:\\Phi_{\\orew(X)}](\\state{C}{\\sigma})`}</div>
    ),
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      <div className="text-3xl">
        The <i>Bellman Operator</i>{" "}
        {tex`\\Phi : \\Rew \\to (\\State \\to \\ENNReal) \\to \\State \\to \\ENNReal`}{" "}
        computes <br /> the minimum expected reward for a one step.*
      </div>
    </div>
    <div className="text-4xl">{tex`\\Phi_r(v) = \\lambda s.\\: r(s) + \\displaystyle \\inf_{\\alpha \\:\\in\\: \\Act} \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot v(s')`}</div>
  </div>,
  null,
  (delta: number) =>
    delta < 2 && {
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\text{lfp}\\:\\Phi_r = \\Phi_r(\\Phi_r(\\Phi_r(\\Phi_r(\\dots))))`}</motion.div>
      ),
    },
  null,
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
      \\text{lfp}\\:\\Phi_r &= \\Phi_r(\\Phi_r(\\Phi_r(\\Phi_r(\\dots)))) \\\\
          &= \\displaystyle \\sup_n \\Phi_r^n(\\bot)
      \\end{aligned}`}</motion.div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
          \\text{lfp}\\:\\Phi_r &= \\Phi_r(\\Phi_r(\\Phi_r(\\Phi_r(\\dots)))) \\\\
              &= \\displaystyle \\sup_n \\Phi_r^n(\\bot) \\\\
              &= \\displaystyle \\sup_n \\lambda s.\\: r(s) + \\displaystyle \\inf_{\\alpha \\:\\in\\: \\Act} \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot \\Phi_r^n(\\bot)(s')
          \\end{aligned}`}</motion.div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
          \\text{lfp}\\:\\Phi_r &= \\Phi_r(\\Phi_r(\\Phi_r(\\Phi_r(\\dots)))) \\\\
              &= \\displaystyle \\sup_n \\Phi_r^n(\\bot) \\\\
              &= \\displaystyle \\sup_n \\lambda s.\\: r(s) + \\displaystyle \\inf_{\\alpha \\:\\in\\: \\Act} \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot \\Phi_r^n(\\bot)(s') \\\\
              &= \\lambda s.\\: \\displaystyle \\inf_{\\Sche \\:\\in\\: \\Scheduler} \\displaystyle \\sum_{\\pi \\:\\in\\: \\Paths(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
          \\end{aligned}`}</motion.div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
                \\text{lfp}\\:\\Phi_r &= \\Phi_r(\\Phi_r(\\Phi_r(\\Phi_r(\\dots)))) \\\\
                    &= \\displaystyle \\sup_n \\Phi_r^n(\\bot) \\\\
                    &= \\displaystyle \\sup_n \\lambda s.\\: r(s) + \\displaystyle \\inf_{\\alpha \\:\\in\\: \\Act} \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot \\Phi_r^n(\\bot)(s') \\\\
                    &= \\lambda s.\\: \\displaystyle \\inf_{\\Sche \\:\\in\\: \\Scheduler} \\displaystyle \\sum_{\\pi \\:\\in\\: \\Paths(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                    &= \\lambda s.\\: \\displaystyle \\inf_{\\Sche \\:\\in\\: \\Scheduler} \\displaystyle \\sup_n \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                \\end{aligned}`}</motion.div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
                  \\text{lfp}\\:\\Phi_r &= \\Phi_r(\\Phi_r(\\Phi_r(\\Phi_r(\\dots)))) \\\\
                      &= \\displaystyle \\sup_n \\Phi_r^n(\\bot) \\\\
                      &= \\displaystyle \\sup_n \\lambda s.\\: r(s) + \\displaystyle \\inf_{\\alpha \\:\\in\\: \\Act} \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot \\Phi_r^n(\\bot)(s') \\\\
                      &= \\lambda s.\\: \\displaystyle \\inf_{\\Sche \\:\\in\\: \\Scheduler} \\displaystyle \\sup_n \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                  \\end{aligned}`}</motion.div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
                  \\text{lfp}\\:\\Phi_r &= \\Phi_r(\\Phi_r(\\Phi_r(\\Phi_r(\\dots)))) \\\\
                      &= \\displaystyle \\sup_n \\Phi_r^n(\\bot) \\\\
                      &= \\displaystyle \\sup_n \\lambda s.\\: r(s) + \\displaystyle \\inf_{\\alpha \\:\\in\\: \\Act} \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot \\Phi_r^n(\\bot)(s') \\\\
                      &= \\lambda s.\\: \\displaystyle \\inf_{\\Sche \\:\\in\\: \\Scheduler} \\displaystyle \\sup_n \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                      &= \\lambda s.\\: \\MinER(r, s)
                  \\end{aligned}`}</motion.div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
                      \\text{lfp}\\:\\Psi_r &= \\Psi_r(\\Psi_r(\\Psi_r(\\Psi_r(\\dots)))) \\\\
                          &= \\displaystyle \\sup_n \\Psi_r^n(\\bot) \\\\
                          &= \\displaystyle \\sup_n \\lambda s.\\: r(s) + \\displaystyle \\sup_{\\alpha \\:\\in\\: \\Act} \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot \\Psi_r^n(\\bot)(s') \\\\
                          &= \\lambda s.\\: \\displaystyle \\sup_{\\Sche \\:\\in\\: \\Scheduler} \\displaystyle \\sup_n \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                          &= \\lambda s.\\: \\MaxER(r, s)
                      \\end{aligned}`}</motion.div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
                          \\text{lfp}\\:\\Psi_r &= \\Psi_r(\\Psi_r(\\Psi_r(\\Psi_r(\\dots)))) \\\\
                              &= \\displaystyle \\sup_n \\Psi_r^n(\\bot) \\\\
                              &= \\displaystyle \\sup_n \\lambda s.\\: r(s) + \\displaystyle \\sup_{\\alpha \\:\\in\\: \\Act} \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot \\Psi_r^n(\\bot)(s') \\\\
                              &= \\lambda s.\\: \\displaystyle \\sup_{\\Sche \\:\\in\\: \\Scheduler} \\displaystyle \\sup_n \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                              &= \\lambda s.\\: \\displaystyle \\displaystyle \\sup_n \\sup_{\\Sche \\:\\in\\: \\Scheduler} \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                              &= \\lambda s.\\: \\MaxER(r, s)
                          \\end{aligned}`}</motion.div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
                              \\text{lfp}\\:\\Psi_r &= \\Psi_r(\\Psi_r(\\Psi_r(\\Psi_r(\\dots)))) \\\\
                                  &= \\displaystyle \\sup_n \\Psi_r^n(\\bot) \\\\
                                  &= \\displaystyle \\sup_n \\lambda s.\\: r(s) + \\displaystyle \\sup_{\\alpha \\:\\in\\: \\Act} \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot \\Psi_r^n(\\bot)(s') \\\\
                                  &= \\lambda s.\\: \\displaystyle \\sup_{\\Sche \\:\\in\\: \\Scheduler} \\displaystyle \\sup_n \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                                  &= \\lambda s.\\: \\displaystyle \\displaystyle \\sup_n \\sup_{\\Sche \\:\\in\\: \\Scheduler} \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                                  &= \\sup_n \\lambda s.\\: \\displaystyle \\displaystyle \\sup_{\\Sche \\:\\in\\: \\Scheduler} \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                                  &= \\lambda s.\\: \\MaxER(r, s)
                              \\end{aligned}`}</motion.div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
                                  \\text{lfp}\\:\\Psi_r &= \\Psi_r(\\Psi_r(\\Psi_r(\\Psi_r(\\dots)))) \\\\
                                      &= \\displaystyle \\sup_n \\Psi_r^n(\\bot) \\\\
                                      &= \\displaystyle \\sup_n \\lambda s.\\: r(s) + \\displaystyle \\sup_{\\alpha \\:\\in\\: \\Act} \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot \\Psi_r^n(\\bot)(s') \\\\
                                      &= \\sup_n \\lambda s.\\: \\displaystyle \\displaystyle \\sup_{\\Sche \\:\\in\\: \\Scheduler} \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                                      &= \\lambda s.\\: \\MaxER(r, s)
                                  \\end{aligned}`}</motion.div>
      ),
    },
  (delta: number) =>
    delta < 2 && {
      appear: false,
      render: (
        <motion.div
          layout="position"
          layoutId="bell-eq"
          className="text-4xl"
        >{tex`\\begin{aligned}
                                    \\text{lfp}\\:\\Psi_r &= \\Psi_r(\\Psi_r(\\Psi_r(\\Psi_r(\\dots)))) \\\\
                                        &= \\displaystyle \\sup_n \\Psi_r^n(\\bot) \\\\
                                        &= \\displaystyle \\sup_n \\lambda s.\\: \\displaystyle \\sup_{\\alpha \\:\\in\\: \\Act} r(s) + \\sum_{s' \\:\\in\\: \\succs(s)} \\P(s, \\alpha)(s') \\cdot \\Psi_r^n(\\bot)(s') \\\\
                                        &= \\sup_n \\lambda s.\\: \\displaystyle \\displaystyle \\sup_{\\Sche \\:\\in\\: \\Scheduler} \\sum_{\\pi \\:\\in\\: \\Paths_{\\le n}(s)} \\Prob(\\Sche, \\pi) \\cdot \\rew{}(r, \\pi) \\\\
                                        &= \\lambda s.\\: \\MaxER(r, s)
                                    \\end{aligned}`}</motion.div>
      ),
    },
  null,
];

export const s07 = makeSlide(steps.length + 1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <div className="text-7xl flex whitespace-pre">
        <AnimatePresence>
          <motion.span layout="position" className="text-center">
            Bridging <H>operational semantics</H>
            <br />
            and <H>expected rewards</H>
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
