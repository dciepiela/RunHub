import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message =
    location.state?.message ||
    "Transakcja przebiegła pomyślnie, zostałeś zapisany na bieg!";
  return (
    <div className="success-page flex items-center justify-center min-h-[70vh] bg-whiteNeutral">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0  ">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <h1 className="flex justify-center text-2xl mb-4">Sukces!</h1>
          <p>{message}</p>
          <button
            className="mt-4 px-2 py-2"
            onClick={() => {
              navigate(`/`);
            }}
          >
            Przejdź do strony głównej
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
