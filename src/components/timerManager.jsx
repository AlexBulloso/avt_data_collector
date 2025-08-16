import React, { useState, useEffect, useRef, useCallback } from "react";

import ClinicGroup from "./clinicGroup";

import TimerGroup from "./timerGroup";

const TimerManager = () => {
  const [allTimeData, setAllTimeData] = useState({});
  const [clinicData, setClinicData] = useState({
    obsID: "",
    specialty: "",
    subspec: "",
    clinicCode: "",
    clinicianID: "",
    scheduledClinicEndTimeHr: "",
    scheduledClinicEndTimeMin: "",
    scheduledClinicEndTimeM: "",
    actualClinicEndTimeHr: "",
    actualClinicEndTimeMin: "",
    actualClinicEndTimeM: "",
    numPatientsSeen: "",
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
    const excludeClinicEndTimes = [
      "scheduledClinicEndTimeHr",
      "scheduledClinicEndTimeMin",
      "scheduledClinicEndTimeM",
      "actualClinicEndTimeHr",
      "actualClinicEndTimeMin",
      "actualClinicEndTimeM",
    ];

    const cols = Array.from(
      new Set(Object.values(allTimeData).flatMap((g) => Object.keys(g)))
    ).filter((col) => !excludeClinicEndTimes.includes(col));

    var csv =
      "Patient," +
      cols.join(",") +
      ",scheduledClinicEndTime,actualClinicEndTime\n";

    for (const [patientId, col] of Object.entries(allTimeData)) {
      const row = [patientId, ...cols.map((r) => col[r] ?? 0)];
      const scheduledClinicEndTime =
        (col.scheduledClinicEndTimeHr ?? "00").toString() +
        ":" +
        (col.scheduledClinicEndTimeMin ?? "00").toString() +
        (col.scheduledClinicEndTimeM ?? "");

      const actualClinicEndTime =
        (col.actualClinicEndTimeHr ?? "00").toString() +
        ":" +
        (col.actualClinicEndTimeMin ?? "00").toString() +
        (col.actualClinicEndTimeM ?? "");

      csv +=
        row.join(",") + `,${scheduledClinicEndTime},${actualClinicEndTime}\n`;
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
