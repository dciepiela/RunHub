import * as Yup from "yup"

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 characters, 1 upper case letter, 1 lower case letter


export const advancedSchema = Yup.object().shape({
    username: Yup
        .string()
        .min(3, "Nazwa użytkownika musi mieć minimum 3 litery")
        .required("Pole wymagane"),
    jobType: Yup
        .string()
        .oneOf(["designer", "developer", "manager", "other"], "Wybierz zawód")
        .required("Pole wymagane"),
    acceptedTos: Yup
        .boolean()
        .oneOf([true], "Proszę zaznacz pole.")
    
})


export const raceValidationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    registrationEndDate: Yup.date().required("Required"),
    startDateRace: Yup.date().required("Required"),
    endDateRace: Yup.date().required("Required"),
    image: Yup.string(),
    raceStatus: Yup.number().required("Required"),
    raceType: Yup.number().required("Required"),
    addressDto: Yup.object().shape({
      city: Yup.string().required("Required"),
      street: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      postalCode: Yup.string().required("Required"),
    }),
    distances: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        lengthInKilometers: Yup.number().required("Required"),
        description: Yup.string().required("Required"),
        availableSlots: Yup.number().required("Required"),
        totalSlots: Yup.number().required("Required"),
        price: Yup.number().required("Required"),
      })
    ),
    sponsors: Yup.array().of(
      Yup.object().shape({
        // sponsorId: Yup.number().required("Required"),
        name: Yup.string().required("Required"),
        logo: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        webPageUrl: Yup.string().required("Required"),
        amount: Yup.number().required("Required"),
        supportType: Yup.string().required("Required"),
      })
    ),
  });