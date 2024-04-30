import { FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";

interface DownloadBtnProps {
  data: any[];
  fileName?: string;
}

const DownloadBtn = ({ data = [], fileName }: DownloadBtnProps) => {
  return (
    <button
      className="inline-flex items-center justify-center text-sm py-1.5 px-3 border border-transparent rounded-md"
      onClick={() => {
        const datas = data?.length
          ? data.map(
              ({
                place,
                time,
                firstName,
                lastName,
                club,
                placeGender,
                gender,
              }) => ({
                Miejsce: place,
                Imie: firstName,
                Nazwisko: lastName,
                Klub: club,
                "Czas (h:m:s)": time,
                "Miejsce (K/M)": placeGender,
                Płeć: gender,
              })
            )
          : [];

        const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Arkusz1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xls` : "data.xlsx");
      }}
    >
      <FaDownload className="mr-2 w-5 h-5 text-deepBlack" />
      Pobierz
    </button>
  );
};

export default DownloadBtn;
