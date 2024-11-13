import { motion } from "framer-motion";
import { tex } from "../Katex";
import { makeSlide } from "../hooks";
import { appear, useSlide } from "../slides";
import { H } from "../common";

import DTU from "../assets/DTU2.png";

export const sIntro = makeSlide(3, () => {
  const { step } = useSlide();

  return (
    <div className="flex justify-center flex-col items-center">
      <appear.div to={1} exit className="text-8xl mb-12">
        Probabilistic programs and{" "}
      </appear.div>
      {/* <appear.div from={2} className="text-4xl ml-10 mb-10 place-self-start">
        The main <H>theorem</H> says that the <H>expected reward</H> is equal to
        the <H>weakest pre-expectation</H>.
      </appear.div> */}
      <motion.div
        layout
        className={step == 0 ? "text-5xl" : "text-6xl"}
      >{tex`\\MinER(\\orew_X, \\state{C}{\\sigma}) = \\dwp{C}{X}(\\sigma)`}</motion.div>
      <appear.div from={2} className="text-5xl mt-10 italic">
        The <H className="not-italic">expected reward</H> is equal to the{" "}
        <H className="not-italic">weakest pre-expectation</H>.
      </appear.div>
      <appear.div to={1} exit className="text-5xl mt-32">
        Oliver Emil Bøving
      </appear.div>
      <appear.div to={1} exit className="text-3xl mt-10 text-center">
        As part of DFF project AuRoRA <br /> with Christoph Matheja
      </appear.div>
      <appear.img to={1} src={DTU} className="w-12 mt-10" />
    </div>
  );
});
