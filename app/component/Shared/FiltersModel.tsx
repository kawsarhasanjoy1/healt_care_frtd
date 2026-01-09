import { useState } from "react";

const FiltersModel = ({ setValue, setFilters, setIsFilterOpen }: any) => {
  const [localFee, setLocalFee] = useState(200); 

  return (
    <div className="absolute z-50 mt-5 left-1/2 -translate-x-1/2 md:w-[420px] w-full bg-white border rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Filter Options</h3>
        <button
          onClick={() => setIsFilterOpen(false)}
          className="text-red-500 font-semibold"
        >
          Close
        </button>
      </div>

      <div className="mb-5">
        <p className="font-semibold mb-2">Consultation Fee</p>
        <input
          type="range"
          min={200}
          max={2000}
          value={localFee}
          onChange={(e) => setLocalFee(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-1">
          
          <span>Max: ৳{localFee}</span>
        </div>
        <button
          onClick={() =>
            setFilters((prev: any) => ({ ...prev, appoinmentFee: localFee }))
          }
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Apply Fee
        </button>
      </div>

      <div className="mb-4">
        <p className="font-semibold mb-2">Gender</p>
        {["MALE", "FEMALE"].map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm mb-1">
            <input
              type="radio"
              name="gender"
              value={item}
              onChange={(e) => setValue(e.target.value)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FiltersModel;
