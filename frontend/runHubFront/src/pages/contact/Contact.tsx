import { observer } from "mobx-react-lite";
import contactPhoto from "../../assets/contactPhoto.jpg";
function Contact() {
  return (
    <div className="md:min-h-[80vh] grid md:grid-cols-2 gap-5 max-w-[1240px] mx-auto items-center">
      <div>
        <img src={contactPhoto} alt="contact" />
      </div>

      <div className="max-w-[1240px] mx-auto text-whiteNeutral relative">
        <div className="px-2 py-12">
          <h2 className="text-3xl pt-8 text-deepBlack text-center uppercase py-12">
            RunHub - portal dla sportowców
          </h2>
          <p className="py-4 text-2xl sm:text-3xl text-darkGray text-center">
            W razie pytań dotyczących rejestracji prosimy o kontakt pod adresem:
            <strong className="text-deepBlack"> contact@runhub.pl.</strong>{" "}
            Natomiast w kwestiach związanych z organizacją imprezy, zachęcamy do
            bezpośredniego kontaktu z organizatorem.
          </p>
        </div>
      </div>
    </div>
  );
}

export default observer(Contact);
