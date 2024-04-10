import axios from "axios";
import { useState } from "react";

export default function TestErrors() {
  const [errors, setErrors] = useState(null);

  function handleNotFound() {
    axios.get("buggy/not-found").catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios.get("buggy/bad-request").catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios.get("buggy/server-error").catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    axios.get("buggy/unauthorised").catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios.get("races/notaid").catch((err) => console.log(err.response));
  }

  function handleValidationError() {
    axios.post("account/registerCompetitor", {}).catch((err) => setErrors(err));
  }

  return (
    <div className=" w-full bg-whiteNeutral">
      <div className="md:min-h-[70vh] grid gap-5 items-center">
        <div className="max-w-[1240px] mx-auto text-black mt-44 ">
          <h1 className="text-2xl font-bold text-center mb-4">
            Test Error component
          </h1>
          <div className="grid grid-cols-6 gap-2">
            <button onClick={handleNotFound}>Not Found</button>
            <button onClick={handleBadRequest}>Bad Request</button>
            <button onClick={handleValidationError}>Validation Error</button>
            <button onClick={handleServerError}>Server Error</button>
            <button onClick={handleUnauthorised}>Unauthorised</button>
            <button onClick={handleBadGuid}>Bad Guid</button>
          </div>
        </div>
        {/* {errors && <ValidationError errors={errors} />} */}
      </div>
    </div>
  );
}
