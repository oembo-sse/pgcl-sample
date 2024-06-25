import { AnimatePresence } from "framer-motion";
import { makeSlide } from "../hooks";
import { appear, useSlide } from "../slides";
import { operationalSemantics } from "../semantics";
import { tex } from "../Katex";

// const points = [
//   <>{tex`(n + n) \\mod (n + 1) = n - 1`}</>,
//   <>{tex`(n + n - (n - 1)) \\mod (n + 1) = n - 1`}</>,
// ];

export const s80 = makeSlide(1, () => {
  const { step } = useSlide();
  return (
    <div className="flex justify-center flex-col items-center">
      <AnimatePresence>
        <appear.div>
          <div className="text-7xl font-katex">More demos?</div>
        </appear.div>
        {/* <AnimatePresence>
          {points.map((point, idx) => (
            <appear.div key={idx} from={idx + 1} className="text-4xl">
              {point}
            </appear.div>
          ))}
        </AnimatePresence> */}
      </AnimatePresence>
    </div>
  );
});
