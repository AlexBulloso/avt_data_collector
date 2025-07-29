import React, { useState, useEffect, useRef, useCallback } from "react";
import Timer from "./timer";
import ClinicGroup from "./clinicGroup";

const InfoDropdown = ({
  name,
  dropdownOptions,
  updateTimeDataLocal,
  value,
}) => {
  const handleChange = (e) => {
    updateTimeDataLocal(name, e.target.value);
  };
  return (
    <form className="pr-[1rem] pl-[1rem] mt-[0.5rem] mb-[0.5rem]">
      <h3>{name}</h3>
      <select
        className="w-full justify-center align-middle items-center bg-gray-50 border border-gray-300 text-gray-900"
        value={value || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Choose
        </option>
        {dropdownOptions.map((opt) => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </form>
  );
};

const TimerGroup = ({ groupId, updateTimeData }) => {
  const [running, setRunning] = useState(false);
  const [focusState, setFocusState] = useState("");

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const [timeDataLocal, setTimeDataLocal] = useState({});

  const updateTimeDataLocal = useCallback(
    (name, value) => {
      setTimeDataLocal((prev) => {
        if (prev[name] == value) {
          return prev;
        }
        return { ...prev, [name]: value };
      });
    },
    [groupId, updateTimeData]
  );

  useEffect(() => {
    updateTimeData(groupId, timeDataLocal);
  }, [groupId, updateTimeData, timeDataLocal]);
  return (
    <div className="border p-4 m-4 flex-1">
      <div className="border flex flex-row justify-center items-center margin-0">
        <h2 className="flex-1 flex justify-center items-center">{groupId}</h2>
        <h2 className="flex-1 flex justify-center items-center">
          Start: {" \n"}
          {startTime ? startTime.toLocaleTimeString() : "None"}
        </h2>
        <h2 className="flex-1 flex justify-center items-center">
          End:{" \n"}
          {endTime ? endTime.toLocaleTimeString() : "None"}
        </h2>
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="">
          <InfoDropdown
            name={"Remote?"}
            dropdownOptions={["Remote", "Face-to-face"]}
            updateTimeDataLocal={updateTimeDataLocal}
            value={timeDataLocal["Remote?"] ?? ""}
          />
          <InfoDropdown
            name={"Consult Type"}
            dropdownOptions={["New", "Followup", "Treatment", "Diagnosis"]}
            updateTimeDataLocal={updateTimeDataLocal}
            value={timeDataLocal["Consult Type"] ?? ""}
          />
          <InfoDropdown
            name={"Fluency Use"}
            dropdownOptions={["Yes", "No"]}
            updateTimeDataLocal={updateTimeDataLocal}
            value={timeDataLocal["Fluency Use"] ?? ""}
          />
          <InfoDropdown
            name={"Template Use"}
            dropdownOptions={["Yes", "No"]}
            updateTimeDataLocal={updateTimeDataLocal}
            value={timeDataLocal["Template Use"] ?? ""}
          />
          <InfoDropdown
            name={"Complexity"}
            dropdownOptions={["1", "2", "3"]}
            updateTimeDataLocal={updateTimeDataLocal}
            value={timeDataLocal["Complexity"] ?? ""}
          />
          <div className="mt-2.5 mb-2.5 flex flex-col items-center">
            <label>Notes</label>
            <input
              type="text"
              onChange={(e) => {
                updateTimeDataLocal("notes", e.target.value);
              }}
              id="notes"
              className="resize-none w-[7rem] l-[5rem] bg-gray-50 border border-gray-300 text-gray-900"
            ></input>
          </div>
        </div>
        <div>
          {[
            "Pre-clinic",
            "Contact",
            "Letter",
            "Note",
            "Order",
            "Conclusion",
            "Post-clinic",
            "End Consultation",
          ].map((name) => (
            <Timer
              key={name}
              name={name}
              state={name}
              running={running}
              setRunning={setRunning}
              focusState={focusState}
              setFocusState={setFocusState}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              startTimeRef={startTimeRef}
              endTimeRef={endTimeRef}
              updateTimeDataLocal={updateTimeDataLocal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TimerManager = () => {
  const [allTimeData, setAllTimeData] = useState({});
  const [clinicData, setClinicData] = useState({
    specialty: "",
    subspec: "",
    obsID: "",
    clinicCode: "",
    clinicianID: "",
  });

  const updateClinicData = (name, value) => {
    setClinicData((prev) => ({ ...prev, [name]: value }));
  };

  const timeData = useCallback(
    (patientId, values) => {
      setAllTimeData((prev) => ({
        ...prev,
        [patientId]: { ...clinicData, ...values },
      }));
    },
    [clinicData]
  );

  const exportCSV = () => {
    const cols = Array.from(
      new Set(Object.values(allTimeData).flatMap((g) => Object.keys(g)))
    );

    var csv = "Patient," + cols.join(",") + "\n";
    for (const [patientId, col] of Object.entries(allTimeData)) {
      const row = [patientId, ...cols.map((r) => col[r] ?? 0)];
      csv += row.join(",") + "\n";
    }
    console.log(csv);
    const saveDate = new Date().toISOString().split(":").join("-");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `AVT-results-${saveDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full">
      <button
        className=" ml-5 mr-5 mt-5"
        onClick={() => {
          exportCSV();
          // console.log(allTimeData);
        }}
      >
        Click to Download All Data (CSV file)
      </button>
      <ClinicGroup
        clinicData={clinicData}
        updateClinicData={updateClinicData}
      />
      <div className="flex flex-row flex-wrap justify-center">
        {[
          ...Array(12)
            .keys()
            .map((x) => x + 1),
        ].map((num) => {
          return (
            <TimerGroup
              key={num}
              groupId={`Patient ${num}`}
              updateTimeData={timeData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TimerManager;
