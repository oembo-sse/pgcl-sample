import { AnimatePresence } from "framer-motion";
import { makeSlide } from "../hooks";
import { appear, useSlide } from "../slides";
import { operationalSemantics } from "../semantics";

const points = [<>Hello</>, <>World</>];

export const s90 = makeSlide(1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center">
      <AnimatePresence>
        <appear.div>
          <div className="text-7xl font-katex">The end</div>
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
      </AnimatePresence>
    </div>
  );
});
