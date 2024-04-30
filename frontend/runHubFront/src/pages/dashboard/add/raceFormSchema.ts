import * as Yup from "yup";

export const advancedSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Nazwa użytkownika musi mieć minimum 3 litery")
    .required("Pole wymagane"),
  jobType: Yup.string()
    .oneOf(["designer", "developer", "manager", "other"], "Wybierz zawód")
    .required("Pole wymagane"),
  acceptedTos: Yup.boolean().oneOf([true], "Proszę zaznacz pole."),
});

export const raceValidationSchema = Yup.object().shape({
  name: Yup.string().required("Nazwa biegu jest wymagana"),
  description: Yup.string().required("Opis biegu jest wymagany"),
  registrationEndDate: Yup.date()
    .max(
      Yup.ref("startDateRace"),
      "Data zakończenia rejestracji musi być przed datą rozpoczęcia"
    )
    .min(new Date(), "Data zakończenia rejestracji nie może być z przeszłości")
    .required("Data zakończenia rejestracji jest wymagana"),
  startDateRace: Yup.date()
    .min(new Date(), "Data rozpoczęcia biegu nie może być z przeszłości")
    .required("Data rozpoczęcia biegu jest wymagana"),
  endDateRace: Yup.date()
    .min(
      Yup.ref("startDateRace"),
      "Data zakończenia biegu musi być późniejsza niż data rozpoczęcia"
    )
    .min(new Date(), "Data zakończenia biegu nie może być z przeszłości")
    .required("Data zakończenia biegu jest wymagana"),
  image: Yup.string(),
  raceStatus: Yup.number().required("Status biegu jest wymagany"),
  raceType: Yup.number().required("Typ biegu jest wymagany"),
  addressDto: Yup.object().shape({
    city: Yup.string().required("Miasto jest wymagane"),
    street: Yup.string().required("Ulica jest wymagana"),
    postalCode: Yup.string(),
  }),
  distances: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Pole nazwa jest wymagane"),
        description: Yup.string().required("Pole opis jest wymagane"),
        lengthInKilometers: Yup.number()
          .typeError("Niewłaściwy format liczby dla pola długość w kilometrach")
          .required("Pole długość w kilometrach jest wymagane"),
        availableSlots: Yup.number()
          .required("Pole dostępne miejsca jest wymagane")
          .min(0, "Dostępne miejsca nie mogą być mniejsze niż 0")
          .test(
            "available-slots",
            "Dostępne miejsca nie mogą być większe niż łączna liczba miejsc",
            function (value) {
              return value <= this.parent.totalSlots;
            }
          ),
        totalSlots: Yup.number().required(
          "Pole łączna liczba miejsc jest wymagane"
        ),
        price: Yup.number().required("Pole cena jest wymagane"),
      })
    )
    .required("Przynajmniej jeden dystans jest wymagany")
    .min(1, "Przynajmniej jeden dystans jest wymagany"),
  sponsors: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Nazwa jest wymagana"),
      logo: Yup.string(),
      description: Yup.string(),
      webPageUrl: Yup.string().required(
        "Adres URL strony internetowej jest wymagany"
      ),
      amount: Yup.number()
        .required("Kwota jest wymagana")
        .min(0, "Kwota nie może być ujemna"),
      supportType: Yup.string().required("Rodzaj wsparcia jest wymagany"),
    })
  ),
});
