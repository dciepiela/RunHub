import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { IDistanceDto } from "../../../../app/models/distance";
import { useState } from "react";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { Profile } from "../../../../app/models/profile";

interface Props {
  distance: IDistanceDto;
  attendees: Profile[];
}

export default observer(function AttendeesList({ attendees, distance }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const attendeesPerPage = 10;

  if (attendees.length == 0) {
    return (
      <div className="mt-2 flex justify-center">
        Nikt jeszcze nie jest zapisany na ten dystans {distance.name}.
      </div>
    );
  }

  const totalPages = Math.ceil(attendees.length / attendeesPerPage);

  const indexOfLastAttendee = currentPage * attendeesPerPage;
  const indexOfFirstAttendee = indexOfLastAttendee - attendeesPerPage;
  const currentAttendees = attendees.slice(
    indexOfFirstAttendee,
    indexOfLastAttendee
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage((prev) => prev - 1);
  const goToNextPage = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className="">
      <div className="bg-white shadow-md rounded-md p-4 mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">
          {distance.description} - lista startowa
        </h2>
        {/* Desktop view */}
        <div className="">
          <table className="w-full mx-auto text-xs md:text-sm border-collapse border border-gray-300">
            <thead>
              <tr className="bg-lightYellow">
                <th className="px-4 py-2 border ">Nr. startowy</th>
                <th className="px-4 py-2 border">Imię i Nazwisko</th>
                <th className="px-4 py-2 border hidden sm:table-cell">Klub</th>
                <th className="px-4 py-2 border hidden sm:table-cell">
                  Rok urodzenia
                </th>
                <th className="px-4 py-2 border hidden sm:table-cell">Płeć</th>
                {/* <th className="px-4 py-2 border">Punkty</th> */}
              </tr>
            </thead>
            <tbody className="mx-auto">
              {currentAttendees.map((attendee, index) => (
                <tr className="border border-gray-300 text-center" key={index}>
                  <td className="px-4 py-2 border">
                    {/* {indexOfFirstAttendee + index + 1} */}
                    {attendee.raceBib ? attendee.raceBib : ""}
                  </td>
                  <td className="px-4 py-2 border">
                    <Link
                      to={`/profiles/${attendee.userName}`}
                      className="flex gap-2"
                    >
                      <img
                        src={attendee.image || "https://via.placeholder.com/48"}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-gray-800 font-semibold flex items-center">
                        {attendee.firstName} {attendee.lastName}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-2 border hidden sm:table-cell">
                    {attendee.club || "Brak klubu"}
                  </td>
                  <td className="px-4 py-2 border hidden sm:table-cell">
                    {attendee.dateOfBirth}
                  </td>
                  <td className="px-4 py-2 border hidden sm:table-cell">
                    {attendee.gender}
                  </td>
                  {/* <td className="px-4 py-2 text-green-500 font-semibold border">
                    {attendee.userName}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination buttons */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={goToFirstPage}
          disabled={isFirstPage}
          className="mx-1 px-3 py-1 border bg-whiteNeutral"
        >
          <MdFirstPage />
        </button>
        <button
          onClick={goToPrevPage}
          disabled={isFirstPage}
          className="mx-1 px-3 py-1 border bg-whiteNeutral"
        >
          <MdNavigateBefore />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border ${
              currentPage === index + 1
                ? "bg-lightYellow font-bold"
                : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          disabled={isLastPage}
          className="mx-1 px-3 py-1 border bg-whiteNeutral"
        >
          <MdNavigateNext />
        </button>
        <button
          onClick={goToLastPage}
          disabled={isLastPage}
          className="mx-1 px-3 py-1 border bg-whiteNeutral"
        >
          <MdLastPage />
        </button>
      </div>
    </div>
  );
});
