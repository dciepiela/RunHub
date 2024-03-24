import aboutPhoto from "../../assets/aboutPhoto.jpg";

function About() {
  return (
    <div className="md:min-h-[80vh] grid md:grid-cols-2 gap-5 max-w-[1240px] mx-auto items-center">
      <div>
        <img src={aboutPhoto} alt="contact" />
      </div>

      <div className="mx-auto text-whiteNeutral relative text-center">
        <div className="px-2 md:pt-14 pb-16 max-w-[1240px]">
          <h2 className="text-3xl text-deepBlack uppercase pt-10 pb-5">
            O Nas
          </h2>
          <p className="text-sm sm:text-lg text-darkGray">
            Witaj w RunHub - Twoim centrum wydarzeń biegowych! <br />
            Jesteśmy zespołem entuzjastów biegania, którzy stworzyli tę
            platformę z myślą o wszystkich pasjonatach sportu i aktywnego stylu
            życia. Nasza misja to zapewnienie Ci nie tylko wygodnego i
            intuicyjnego sposobu rejestracji na wydarzenia biegowe, ale również
            budowanie społeczności, która inspirowałaby się nawzajem do
            osiągania coraz większych celów.
          </p>

          <h2 className="text-3xl text-deepBlack uppercase pt-10 pb-5">
            Nasza historia
          </h2>
          <p className=" text-sm sm:text-lg text-darkGray">
            RunHub powstał z pasji do biegania i z myślą o potrzebach biegaczy
            na całym świecie. Nasza historia zaczęła się od prostego pomysłu -
            stworzenia miejsca, w którym zarówno doświadczeni biegacze, jak i
            ci, którzy dopiero zaczynają swoją przygodę ze sportem, mogliby
            znaleźć wydarzenia, które spełnią ich oczekiwania. Od momentu
            powstania w 2024 roku nasz zespół stale rozwija i udoskonala
            platformę, aby zapewnić najlepsze doświadczenie użytkownika. Dzięki
            Waszym cennym opiniiom i zaangażowaniu, jesteśmy w stanie ciągle się
            rozwijać i dostarczać nowe funkcje oraz wydarzenia.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
