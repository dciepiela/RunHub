import axiosInstance from "../api/axiosInstance";

const distanceService = {
  updateAttendance: async (raceId: number, distanceId: number) => {
    await axiosInstance.post<void>(
      `/distances/${raceId}/${distanceId}/attend`,
      {}
    );
  },
};

export default distanceService;
