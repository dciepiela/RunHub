export default observer(function RaceDistanceRow() ({
  distance,
  isCancelled,
  raceStatus,
  registrationEndDate,
  isLoggedIn,
  togglePaymentForm,
  navigate,
  setSelectedDistance,
  toggleAttendeesList,
  selectedPaymentDistanceId,
  selectedAttendeesDistanceId,
}) => {
  return (
    <tr
      key={distance.distanceId}
      className={isCancelled(distance) ? "bg-red-500 text-gray-500" : ""}
    >
      <td className="border px-2 md:px-4 py-2 bg-gray-100">
        {!isCancelled(distance) ? (
          <span>{distance.name}</span>
        ) : (
          <span className="font-bold text-red-600">ODWOŁANY</span>
        )}
      </td>
      <td className="border px-2 md:px-4 py-2 hidden md:table-cell">
        {distance.description}
      </td>
      <td className="border px-2 md:px-4 py-2 text-center">
        {distance.lengthInKilometers}
      </td>
      <td className="border px-2 md:px-4 py-2 text-center hidden md:table-cell">
        {distance.availableSlots}/{distance.totalSlots}
      </td>
      <td className="border px-2 md:px-4 py-2 text-center">
        {distance.price} zł
      </td>

      {/* PAYMENT */}
      {raceStatus === RaceStatus.RegistrationOpen && (
        <td className="border px-2 md:px-4 py-2 text-center">
          {!isCancelled(distance) &&
          distance.availableSlots > 0 &&
          (!registrationEndDate ||
            new Date(registrationEndDate) > new Date()) ? (
            <button
              onClick={() => {
                if (isLoggedIn) {
                  togglePaymentForm(distance.distanceId!);
                } else {
                  // Navigate to login page
                  navigate("/login"); // assuming you have access to history object
                }
              }}
              className={`text-deepBlack font-bold py-2 px-4 rounded w-full whitespace-nowrap ${
                selectedPaymentDistanceId === distance.distanceId
                  ? "bg-mediumGray"
                  : ""
              } ${distance.isGoing ? "no-hover" : ""}`}
              disabled={distance.isGoing}
            >
              {selectedPaymentDistanceId === distance.distanceId
                ? "Schowaj"
                : distance.isGoing
                ? "Jesteś już zapisany"
                : "Zapisz się"}
            </button>
          ) : (
            <span className="text-red-500 font-bold">
              {registrationEndDate &&
              new Date(registrationEndDate) <= new Date()
                ? "Zamknięte zapisy"
                : "Brak miejsc"}
            </span>
          )}
        </td>
      )}
      <td className="border px-2 md:px-4 py-2 text-center">
        {!isCancelled(distance) && (
          <button
            onClick={() => {
              setSelectedDistance(distance.distanceId!);
              toggleAttendeesList(distance.distanceId!);
            }}
            className={`text-deepBlack font-bold py-2 px-4 rounded w-full mt-2 ${
              selectedAttendeesDistanceId === distance.distanceId
                ? "bg-mediumGray"
                : ""
            }`}
            style={{ whiteSpace: "nowrap" }}
          >
            {selectedAttendeesDistanceId === distance.distanceId
              ? "Ukryj listę startową"
              : "Pokaż listę startową"}
          </button>
        )}
      </td>
    </tr>
  );
});

