export default function DashboardListRaces() {
  return (
    <div className="w-full pr-2">
      <div className="ml-[250px] max-w-[full] p-6 bg-white rounded-lg shadow-md grid">
        <h1 className="mb-5 text-center text-3xl font-bold">Lista biegów</h1>
        <div className="grid grid-cols-1 md:grid-cols- gap-4">
          {/* Race Details - Column 1 */}
          {/* <div className="col-span-1"> */}
          <div className="mb-4">
            <p>jeden</p>
          </div>

          <div className="mb-4">
            <p>dwa</p>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
