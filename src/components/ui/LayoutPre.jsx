import ParallaxStarsBG from "../background/ParallaxStarsBG";

import LandingHandler from "../LandingHandler";
import Navbar from "./Navbar";

export default function Layout({children}) {
  return (
    <>
      <ParallaxStarsBG client:only="react" />
      <section className="h-full overflow-hidden pb-20">
        {children}
      </section>
    </>
  );
}


