function AboutMain() {
  return (
    <div className="w-full my-32">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-bold">
            Setki osób zaufało naszej misji
          </h2>
          <p className="text-3xl py-6 text-gray-500">
            Przyłącz się do naszej społeczności i odkryj bogactwo możliwości,
            które dla Ciebie przygotowaliśmy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-6xl font-bold text-lightYellow">100%</p>
            <p className="text-mediumGray-400 mt-2">Zadowolenia</p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-6xl font-bold text-lightYellow">24/7</p>
            <p className="text-mediumGray-400 mt-2">Dostępności systemu</p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-6xl font-bold text-lightYellow">1000</p>
            <p className="text-mediumGray-400 mt-2">Użytkowników</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMain;
