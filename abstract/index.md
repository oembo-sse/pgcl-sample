---
title: Total expected reward equals the weakest pre-expectation
author: Oliver Emil Bøving
bibliography: lit.bib
---

The slides are located online here:

\begin{center}
\large
\url{https://oembo-sse.github.io/02913-Advanced-Analysis-Techniques-Jun-24/}
\end{center}

- The language and theory is based on a combination of @DBLP:phd/dnb/Kaminski19 and the unpublished PhD thesis of Kevin Batz.
- The stucture of the proof takes great inspiration from an unreleased paper by Kevin Batz, Benjamin Lucien Kaminski, Christoph Matheja, Tobias Winkler.
- The paper @GRETZ2014110 formalizes the same result as we are showing, but using a different approach, which some details missing that we attempt to formalize foundationally.
- The book @PrinciplesOfModelChecking is the go-to book for model checking and contains chapters on MDP's. One downside is that it mostly, if not only, concerns it self with finite models. This book formalizes notions of expected rewards in terms of paths and cylinder sets.
- The book @Puterman1994 contains much formalism of MDP's in-general. One interesting aspect, is that this book mostly concerns it self with _states_ while paths are mostly implicit. Additionally, its formalizations are mostly _backwards_, which is to say that it expresses expected reward using Bellman-operators.
- My fomalization is writting in Lean, see @DBLP:conf/cade/Moura021, and heavily uses the Mathlib4 library which has formalized many aspects of mathematics, see @Mathlib.

<!-- The notion of taking about values of a program at specific points, pop up in many different contexts. One way to do this, is to evaluate them for a while and look at their state. Most often we are interested in their values at the very end of execution, which means we will run them until completion. But for some programs, simply executing them is not feasable, as they might be _non-deterministic_ and/or _probabilistic_. This means that a single execution most likely wont be representative of all executions of the program. By executing the program more and more times, we can build up a better idea of what the values at the end will look like. If we want to be sure about their values, we have to not only run the program an arbitrary number of times, but rather look at all possible executions. Doing so concretly might work for smaller programs without too much branching, but as we increase the number of branches, the number of possible executions grows combinatorically. Even then, in some cases we might find that a program has an infinite number of executions, which can make talking about values at the end of the program completly nonsensical, but often we can actually quantifiable talk about even infinite executions. -->

# References
