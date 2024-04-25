import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ServerError() {
  const { commonStore } = useStore();
  return (
    <div className=" bg-whiteNeutral min-h-screen flex flex-col justify-center items-center">
      <div className="w-full p-6 bg-whiteNeutral rounded-lg shadow-lg max-w-[1240px]">
        <h1 className="text-2xl font-bold text-center text-lightYellow mb-4">
          Błąd serwera
        </h1>
        {commonStore.error?.message && (
          <h5 className="text-black text-center font-bold mb-4">
            {commonStore.error.message}
          </h5>
        )}
        {commonStore.error?.details && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-lightYellow mb-2">
              Stack trace
            </h4>
            <code>{commonStore.error.details}</code>
          </div>
        )}
      </div>
    </div>
  );
});
