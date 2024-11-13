import { AnimatePresence } from "framer-motion";
import { makeSlide } from "../hooks";
import { appear, useSlide } from "../slides";

import DTU from "../assets/DTU2.png";
import { H } from "../common";

export const s90 = makeSlide(1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center">
      <AnimatePresence>
        <appear.div>
          <H className="text-8xl mt-48">The end</H>
        </appear.div>
        {/* <ul className="text-3xl list-disc list-inside w-96">
          <AnimatePresence>
            {points.map((point, idx) => (
              <appear.li key={idx} from={idx + 1}>
                {point}
              </appear.li>
            ))}
          </AnimatePresence>
        </ul> */}
        <appear.div to={1} exit className="text-5xl mt-20">
          Oliver Emil Bøving
        </appear.div>
        <appear.div to={1} exit className="text-3xl mt-10 text-center">
          As part of DFF project AuRoRA <br /> with Christoph Matheja
        </appear.div>
        <appear.img to={1} src={DTU} className="w-12 mt-10" />
      </AnimatePresence>
    </div>
  );
});
