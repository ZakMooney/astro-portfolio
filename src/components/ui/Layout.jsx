import ParallaxStarsBG from "../background/ParallaxStarsBG";

import LandingHandler from "../LandingHandler";
import Navbar from "./Navbar";

export default function Layout({children}) {
  return (
    <>
      <ParallaxStarsBG client:only="react" />
      <LandingHandler client:only="react">
        <div className="dot-grid fixed backdrop-blur-xs h-full w-full" />
        <Navbar client:only="react" transition:persist transition:name="navbar" />
        <section className="h-full overflow-hidden pb-20">
          {children}
        </section>
      </LandingHandler>
    </>
  );
}


