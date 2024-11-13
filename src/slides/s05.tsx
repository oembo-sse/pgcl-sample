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
      <div className="text-3xl">{text`A $\\Path$ is a sequence of states $s_0s_1\\dots s_n$ such that,`}</div>
    </div>
    <div className="text-3xl">{tex`\\forall i \\in 0\\dots n - 1. \\: \\exists \\alpha. \\: 0 < \\P(s_i, \\alpha)(s_{i+1})`}</div>
  </div>,
  (delta: number) =>
    delta > 1 ? null : (
      <div className="flex justify-center flex-col items-center gap-4">
        <div className="text-3xl">
          <div className="text-3xl">
            The function {tex`\\act : \\State  \\to \\Set{\\Act}`} produces the
            set of actions <br /> enabled in a given state.
          </div>
        </div>
        <div className="text-3xl">{tex`\\act(s) = \\{ \\alpha \\mid \\supp \\P(s, \\alpha) \\ne \\empty \\}`}</div>
      </div>
    ),
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      <div className="text-3xl">
        The function {tex`\\succs : \\Act \\to \\State \\to \\Set{\\State}`}{" "}
        produces the set of <br /> immediate successors of a given state.
      </div>
    </div>
    <div className="text-3xl">{tex`
      \\succs_\\alpha(s) = \\supp \\P(s, \\alpha)
      `}</div>
  </div>,
  null,
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      <div className="text-3xl">
        The function {tex`\\Paths^= : \\Nat \\to \\State \\to \\Set \\Path`}{" "}
        produces all paths <br /> of length {tex`n`} from a given state.
      </div>
    </div>
    <div className="text-3xl">{tex`\\Paths^{= n}(s) = \\begin{cases}
        s & \\text{if } n = 0 \\\\
        \\{ \\pi s' \\mid \\pi \\in \\Paths^{= n}(s) \\land s' \\in \\succs(s) \\} & \\text{otherwise} \\\\
    \\end{cases}`}</div>
  </div>,
  // <div className="flex justify-center flex-col items-center gap-4">
  //   <div className="text-3xl">
  //     <div className="text-3xl">
  //       The function {tex`\\Paths : \\State \\to \\Set \\Path`} produces all
  //       paths from a given state.
  //     </div>
  //   </div>
  //   <div className="text-3xl">{tex`\\Paths(s) = \\displaystyle \\bigcup_n \\Paths_{\\le n}(s)`}</div>
  // </div>,
  null,
];

export const s05 = makeSlide(steps.length + 1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <div className="text-7xl flex whitespace-pre">
        <AnimatePresence>
          <motion.span layout="position">
            Paths of a <H>MDP</H>
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
