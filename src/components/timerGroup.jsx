import React, { useState, useEffect, useRef, useCallback } from "react";
import Timer from "./timer";
import InfoDropdown from "./infoDropdown";

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
    <div className="border p-4 m-4 flex-1/3">
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
            dropdownOptions={[
              "New",
              "Followup",
              "Treatment Planning",
              "Diagnostic Workup",
            ]}
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
            name={"Patient Consent"}
            dropdownOptions={["Yes", "No"]}
            updateTimeDataLocal={updateTimeDataLocal}
            value={timeDataLocal["Patient Consent"] ?? ""}
          />

          {/* <div className="mt-2.5 mb-2.5 flex flex-col items-center">
            <label>Scheduled Clinic End Time</label>
            <input
              pattern="^\d{2}:\d{2}$"
              title="Input must be in format HH:MM (24-hour)"
              type="text"
              onChange={(e) => {
                updateTimeDataLocal("scheduledClinicEndTime", e.target.value);
              }}
              id="scheduledClinicEndTime"
              className="resize-none w-[3rem] l-[5rem] bg-gray-50 border border-gray-300 text-gray-900"
            ></input>
          </div>

          <div className="mt-2.5 mb-2.5 flex flex-col items-center">
            <label>Actual Clinic End Time</label>
            <input
              pattern="^\d{2}:\d{2}$"
              title="Input must be in format HH:MM (24-hour)"
              type="text"
              onChange={(e) => {
                updateTimeDataLocal("actualClinicEndTime", e.target.value);
              }}
              id="actualClinicEndTime"
              className="resize-none w-[3rem] l-[5rem] bg-gray-50 border border-gray-300 text-gray-900"
            ></input>
          </div> */}

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
            "Note",
            "Conclusion",
            "Order",
            "Letter",
            "Misc.",
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

export default TimerGroup;
