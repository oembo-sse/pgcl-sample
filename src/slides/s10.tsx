import { AnimatePresence, motion } from "framer-motion";
import { tex } from "../Katex";
import { makeSlide } from "../hooks";
import { appear, useSlide } from "../slides";
import { Callout, H } from "../common";
import React from "react";
import { weakestPre } from "../semantics";
import { LeanLogo } from "../assets/lean_logo";

const steps = [
  (delta: number) =>
    delta < 4 && (
      <motion.div
        layout="position"
        layoutId="math-theorem"
        className="text-5xl flex gap-10"
      >{tex`\\MinER(\\orew_X, \\state{C}{\\sigma}) = \\dwp{C}{X}(\\sigma)`}</motion.div>
    ),
  (delta: number) =>
    delta == 0 && {
      render: (
        <div className="flex flex-col items-center text-5xl gap-4">
          <motion.div layout="position" layoutId="statement">
            The <H>minimum expected reward</H> on the <H>MDP</H>,
          </motion.div>
        </div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <div className="flex flex-col items-center text-5xl gap-4">
          <motion.div layout="position" layoutId="statement">
            The <H>minimum expected reward</H> on the <H>MDP</H>, <br />
          </motion.div>
          <motion.div layout="position" layoutId="statement-2">
            derived from the <H>operational semantics</H>,
          </motion.div>
        </div>
      ),
    },
  (delta: number) =>
    delta == 0 && {
      appear: false,
      render: (
        <div className="flex flex-col items-center text-5xl gap-4">
          <motion.div layout="position" layoutId="statement">
            The <H>minimum expected reward</H> on the <H>MDP</H>, <br />
          </motion.div>
          <motion.div layout="position" layoutId="statement-2">
            derived from the <H>operational semantics</H>, <br />
          </motion.div>
          <motion.div layout="position" layoutId="statement-3">
            is equal to the <H>weakest pre-expectations</H>.
          </motion.div>
        </div>
      ),
    },
  (delta: number) => ({
    appear: false,
    render: (
      <motion.div layout="position">
        <Callout title="Theorem">
          <div className="flex flex-col items-center text-5xl gap-4 p-10">
            <motion.div
              layout="position"
              layoutId="math-theorem"
              className="text-5xl flex mb-10"
            >{tex`\\MinER(\\orew_X, \\state{C}{\\sigma}) = \\dwp{C}{X}(\\sigma)`}</motion.div>
            <motion.div layout="position" layoutId="statement">
              The <H>minimum expected reward</H> on the <H>MDP</H>, <br />
            </motion.div>
            <motion.div layout="position" layoutId="statement-2">
              derived from the <H>operational semantics</H>, <br />
            </motion.div>
            <motion.div layout="position" layoutId="statement-3">
              is equal to the <H>weakest pre-expectations</H>.
            </motion.div>
          </div>
          {delta == 1 && (
            <motion.div
              layout
              initial={{
                scale: 0,
                position: "absolute",
                top: "-2em",
                right: "-6em",
                rotate: -50,
              }}
              animate={{ scale: 1, position: "absolute", rotate: 20 }}
              className="bg-bg-50/50 rounded-xl border"
            >
              <LeanLogo className="w-96 blur-[5px] animate-pulse" />
            </motion.div>
          )}
        </Callout>
      </motion.div>
    ),
  }),
  null,
];

export const s10 = makeSlide(steps.length + 1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center gap-10">
      <div className="text-7xl flex whitespace-pre">
        <AnimatePresence>
          <motion.span layout="position" className="text-center">
            Where does this leave us?
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
