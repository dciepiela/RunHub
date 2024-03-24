import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendeesList = ({ raceId, distanceId }) => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get(
          `/api/distances/${raceId}/${distanceId}/attendees`
        );
        setAttendees(response.data.attendeesDto);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendees:", error);
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [raceId, distanceId]);

  return (
    <div>
      <h2>Attendees List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : attendees.length === 0 ? (
        <p>No attendees found for this distance.</p>
      ) : (
        <ul>
          {attendees.map((attendee, index) => (
            <li key={index}>
              Username: {attendee.userName}, DisplayName: {attendee.displayName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendeesList;
