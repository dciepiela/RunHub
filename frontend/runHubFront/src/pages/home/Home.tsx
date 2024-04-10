import Hero from "../../components/Hero";
import AboutMain from "../../components/AboutMain";
import AllInOne from "../../components/AllInOne";
import Pricing from "../../components/Pricing";
import TopRaces from "../../components/TopRaces";
import { observer } from "mobx-react-lite";

export default observer(function Home() {
  return (
    <>
      <Hero />
      <AboutMain />
      <TopRaces />
      <Pricing />
      <AllInOne />
    </>
  );
});
