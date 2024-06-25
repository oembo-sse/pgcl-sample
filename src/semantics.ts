import { tex } from "./Katex";

export const grammar = [
  tex`\\begin{array}{rcl}
    C &::=& \\skip \\\\
      &|& \\assign{x}{A} \\\\
      &|& \\seq{C_1}{C_2} \\\\
      &|& \\prob{C_1}{p}{C_2} \\\\
      &|& \\nondet{C_1}{C_2} \\\\
      &|& \\ite{B}{C_1}{C_2} \\\\
      &|& \\loop{B}{C} \\\\
      &|& \\tick{A}
      % &|& \\observe{B}
  \\end{array}`,
];

export const operationalSemantics = [
  tex`\\dfrac{}{\\operation{\\state{\\skip}{\\sigma}}{N,1}{\\state{\\sink}{\\sigma}}}`,
  tex`\\dfrac{}{\\operation{\\state{\\assign{x}{A}}{\\sigma}}{N,1}{\\state{\\sink}{\\sigma[x \\mapsto A(\\sigma)]}}}`,
  [
    tex`\\dfrac{\\operation{\\state{C_1}{\\sigma}}{\\alpha,p}{\\state{\\sink}{\\sigma'}}}{\\operation{\\state{\\seq{C_1}{C_2}}{\\sigma}}{\\alpha,p}{\\state{C_2}{\\sigma'}}}`,
    tex`\\dfrac{\\operation{\\state{C_1'}{\\sigma}}{\\alpha,p}{\\state{\\sink}{\\sigma'}}}{\\operation{\\state{\\seq{C_1}{C_2}}{\\sigma}}{\\alpha,p}{\\state{\\seq{C_1'}{C_2}}{\\sigma'}}}`,
  ],
  [
    tex`\\dfrac{}{\\operation{\\state{\\prob{C_1}{p}{C_2}}{\\sigma}}{N,p(\\sigma)}{\\state{C_1}{\\sigma}}}`,
    tex`\\dfrac{}{\\operation{\\state{\\prob{C_1}{p}{C_2}}{\\sigma}}{N,1-p(\\sigma)}{\\state{C_2}{\\sigma}}}`,
    tex`\\dfrac{}{\\operation{\\state{\\prob{C}{p}{C}}{\\sigma}}{N,1}{\\state{C}{\\sigma}}}`,
  ],
  [
    tex`\\dfrac{}{\\operation{\\state{\\nondet{C_1}{C_2}}{\\sigma}}{L,1}{\\state{C_1}{\\sigma}}}`,
    tex`\\dfrac{}{\\operation{\\state{\\nondet{C_1}{C_2}}{\\sigma}}{R,1}{\\state{C_2}{\\sigma}}}`,
  ],
  [
    tex`\\dfrac{\\sigma \\models B}{\\operation{\\state{\\ite{B}{C_1}{C_2}}{\\sigma}}{N,1}{\\state{C_1}{\\sigma}}}`,
    tex`\\dfrac{\\sigma \\models ¬B}{\\operation{\\state{\\ite{B}{C_1}{C_2}}{\\sigma}}{N,1}{\\state{C_2}{\\sigma}}}`,
  ],
  [
    tex`\\dfrac{\\sigma \\models B}{\\operation{\\state{\\loop{B}{C}}{\\sigma}}{N,1}{\\state{\\seq{C}{\\loop{B}{C}}}{\\sigma}}}`,
    tex`\\dfrac{\\sigma \\models ¬B}{\\operation{\\state{\\loop{B}{C}}{\\sigma}}{N,1}{\\state{\\sink}{\\sigma}}}`,
  ],
  tex`\\dfrac{}{\\operation{\\state{\\tick{A}}{\\sigma}}{N,1}{\\state{\\sink}{\\sigma}}}`,
  // tex`\\dfrac{}{\\operation{\\state{\\sink}{\\sigma}}{N,1}{\\state{\\sink}{\\sigma}}}`,
  [
    tex`\\dfrac{}{\\operation{\\state{\\sink}{\\sigma}}{N,1}{\\bot}}`,
    tex`\\dfrac{}{\\operation{\\bot}{N,1}{\\bot}}`,
  ],
];

// noncomputable def pGCL.dwp (C : pGCL ϖ) (X : Expr ϖ) : Expr ϖ := match C with
//   | .skip => X
//   -- NOTE: non-standard
//   | .sink => X
//   | .assign x A => X.subst x A
//   | .seq C₁ C₂ => C₁.dwp (C₂.dwp X)
//   | .prob C₁ p C₂ => p.val * C₁.dwp X + (1 - p.val) * C₂.dwp X
//   | .nonDet C₁ C₂ => C₁.dwp X ⊓ C₂.dwp X
//   | .ite B C₁ C₂ => B.probOf * C₁.dwp X + B.not.probOf * C₂.dwp X
//   | .loop B C' => lfp λY => B.probOf * C'.dwp Y + B.not.probOf * X
//   | .tick e => e + X

export const weakestPre = [
  tex`\\dwp{\\assign{x}{A}}{X} = X[x \\setminus A]`,
  [tex`\\dwp{\\skip}{X} = X`, tex`\\dwp{\\sink}{X} = X`],
  tex`\\dwp{\\seq{C_1}{C_2}}{X} = \\dwp{C_1}{\\dwp{C_2}{X}}`,
  tex`\\dwp{\\prob{C_1}{p}{C_2}}{X} = p \\cdot \\dwp{C_1}{X} + (1 - p) \\cdot \\dwp{C_2}{X}`,
  tex`\\dwp{\\nondet{C_1}{C_2}}{X} = \\dwp{C_1}{X} \\sqcap \\dwp{C_2}{X}`,
  tex`\\dwp{\\ite{B}{C_1}{C_2}}{X} = B \\cdot \\dwp{C_1}{X} + \\neg B \\cdot \\dwp{C_2}{X}`,
  tex`\\dwp{\\loop{B}{C}}{X} = \\text{lfp} \\: \\lambda Y.\\: B \\cdot \\dwp{C}{Y} + \\neg B \\cdot X`,
  tex`\\dwp{\\tick{A}}{X} = A + X`,
];
