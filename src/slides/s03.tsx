import { AnimatePresence, motion } from "framer-motion";
import { tex, text } from "../Katex";
import { makeSlide } from "../hooks";
import { operationalSemantics } from "../semantics";
import { Code } from "../CodeEditor";
import { appear, useSlide } from "../slides";
import { Callout, H } from "../common";
import React from "react";

const steps = [
  null,
  <div className="text-4xl">
    A <H>MDP</H> is a triple {tex`\\langle\\State, \\Act, \\P\\rangle`} where:
  </div>,
  <div className="text-3xl">
    {tex`\\State`} is a set of states and {tex`\\Act`} is a set of actions and
  </div>,
  <div className="text-3xl">{tex`\\P : \\State \\times \\Act \\to \\Dist \\State`}</div>,
  null,
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">
      A <H>MDP</H> can be defined in terms of an <H>operational semantic</H>{" "}
      given
    </div>
    <div className="text-3xl">{tex`\\op : \\State \\to \\Set{(\\Act \\times \\State \\times \\PPReal)}`}</div>
  </div>,
  (current: boolean) =>
    current ? (
      <Callout title="Example:">
        <div className="text-2xl">From the inference rules:</div>
        <div className="text-3xl flex items-center gap-4">
          {Array.isArray(operationalSemantics[3]) &&
            operationalSemantics[3].slice(0, 2)}
        </div>
        <div className="text-2xl my-4">we derive that</div>
        <div className="text-center text-3xl">
          {tex`\\op(\\state{\\prob{C_1}{p}{C_2}}{\\sigma}) = \\{
            (N, \\state{C_1}{\\sigma}, p(\\sigma)),
            (N, \\state{C_2}{\\sigma}, 1-p(\\sigma))
            \\}`}
        </div>
      </Callout>
    ) : null,
  // <div className="text-3xl w-[15em]">
  //   <div className="text-xl font-bold -ml-10">Property 1.</div>
  //   {tex`\\forall s, \\alpha. \\displaystyle\\sum_{(\\alpha,\\ s',\\ p) \\:\\in\\: \\op(s)} p \\in \\{0, 1\\}`}
  // </div>,
  // <div className="text-3xl w-[15em]">
  //   <div className="text-xl font-bold -ml-10">Property 2.</div>
  //   {tex`\\forall s. \\; \\op(s) \\ne \\empty`}
  // </div>,
  // null,
  <div className="flex justify-center flex-col items-center gap-4">
    <div className="text-3xl">Then we can define {tex`\\P`} as:</div>
    <div className="text-3xl">{tex`\\P(s, \\alpha)(s') = \\displaystyle \\sum_{(\\alpha,\\: s',\\: p) \\:\\in\\: \\op(s)} p`}</div>
  </div>,
  // <div className="text-3xl">{tex`\\act : \\State \\to \\Set{\\Act}`}</div>,
  // <div className="text-3xl">{tex`\\succs : \\State \\to \\Act  \\to \\Set{\\State}`}</div>,
  // <div className="text-3xl">{tex`\\act(s) = \\{ \\alpha \\mid \\exists s'. \\P(s, \\alpha)(s') > 0 \\}`}</div>,
  // <div className="text-3xl">{tex`\\succs(s, \\alpha) = \\{ s' \\mid \\P(s, \\alpha)(s') > 0 \\} = \\supp{\\P(s, \\alpha)}`}</div>,
];

export const s03 = makeSlide(steps.length + 2, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center gap-8">
      <div className="text-7xl flex whitespace-pre">
        <AnimatePresence>
          <appear.span key="M">
            <H>M</H>
          </appear.span>
          <appear.span to={1} exit>
            arkov{" "}
          </appear.span>
          <appear.span key="D">
            <H>D</H>
          </appear.span>
          <appear.span key="ecision" to={1} exit>
            ecision{" "}
          </appear.span>
          <appear.span key="P">
            <H>P</H>
          </appear.span>
          <appear.span key="rocesse" to={1} exit>
            rocesse
          </appear.span>
          <appear.span key="s">s</appear.span>
        </AnimatePresence>
      </div>
      {steps.slice(0, step).map((s, idx) => {
        const current = idx + 1 == step;
        const sf = typeof s == "function" ? s(current) : s;
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
