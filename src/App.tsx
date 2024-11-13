import { GitHub } from "./assets/github";
import { s00 } from "./slides/s00";

export const App = () => {
  return <SlideShow />;
};

const SlideShow = () => {
  return (
    <>
      <div className="bg-white w-screen h-screen grid place-items-center text-fg-900 font-katex overflow-hidden">
        <div className="grid place-items-center gap-10">
          {s00(`tick := 0 ;
fail := 0 ; sent := 0 ;
while sent < 4 && fail < 2 {
  tick := tick + 1 ;
  { fail := 0 ; sent := sent + 1 } [1/2]
  { fail := fail + 1 }
}`).render({ step: 0 })}
        </div>
      </div>
      <div className="fixed top-2 right-2">
        <a href="https://github.com/oembo-sse/pgcl-sample" target="_blank">
          <GitHub className="text-sm" />
        </a>
      </div>
    </>
  );
};
