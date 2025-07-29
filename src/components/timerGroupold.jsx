import React, { useState, useEffect, useRef, useCallback } from "react";

const Timer = ({
  name,
  state,
  running,
  focusState,
  setRunning,
  setFocusState,
  setStartTime,
  iFC,
  setiFC,
  updateValue,
}) => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const startTimeRef = useRef(null);

  // start time for patient contact
  useEffect(() => {
    if (
      name === "patient contact" &&
      running &&
      focusState === state &&
      !startTimeRef.current
    ) {
      startTimeRef.current = new Date();
    }
  }, [name, running, focusState, state]);

  useEffect(() => {
    let interval;
    if (running && focusState === state) {
      interval = setInterval(() => {
        setTime(({ minutes, seconds }) => {
          if (seconds === 59) return { minutes: minutes + 1, seconds: 0 };
          return { minutes, seconds: seconds + 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, focusState, state]);

  // send updated value to parent
  const decimalised = (time.minutes + time.seconds / 60).toFixed(2);
  useEffect(() => {
    updateValue(name, decimalised);
  }, [decimalised, name, updateValue]);

  return (
    <div className="flex flex-row m-[1rem]">
      <div className="mr-[1rem]">
        <h2>{name}</h2>
        <h3>{decimalised} minutes</h3>
      </div>
      <button
        onClick={() => {
          setRunning(true);
          setFocusState(state);
          if (name === "contact" && iFC) {
            setiFC(false);
            setStartTime(new Date());
          }
        }}
      >
        Start
      </button>
    </div>
  );
};


const TimerGroup = ({ groupId, reportGroupValues }) => {
  const [running, setRunning] = useState(false);
  const [focusState, setFocusState] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [isFirstContact, setiFC] = useState(true);
  const [localValues, setLocalValues] = useState({});

  // ✅ Stable callback prevents infinite re-render
  const updateValue = useCallback(
    (timerName, value) => {
      setLocalValues((prev) => {
        if (prev[timerName] === value) return prev; // ✅ prevents re-render loop
        const updated = { ...prev, [timerName]: value };
        reportGroupValues(groupId, updated);
        return updated;
      });
    },
    [groupId, reportGroupValues]
  );

  return (
    <div className="border p-4 m-4">
      <h2>
        Group {groupId} | start time:{" "}
        {startTime ? startTime.toLocaleTimeString() : "None"}
      </h2>
      {[
        "preclinic",
        "contact",
        "letter",
        "note",
        "order",
        "conclusion",
        "postclin",
      ].map((name) => (
        <Timer
          key={name}
          name={name}
          state={name}
          running={running}
          focusState={focusState}
          setRunning={setRunning}
          setFocusState={setFocusState}
          setStartTime={setStartTime}
          iFC={isFirstContact}
          setiFC={setiFC}
          updateValue={updateValue}
        />
      ))}
    </div>
  );
};

const TimerManager = () => {
  const [allGroupValues, setAllGroupValues] = useState({});

  // ✅ Stable reference
  const reportGroupValues = useCallback((groupId, values) => {
    setAllGroupValues((prev) => ({ ...prev, [groupId]: values }));
  }, []);
  // export all groups
  const exportAllToCSV = () => {
    // ✅ Get all timer names (union of keys from all groups)
    const allTimerNames = Array.from(
      new Set(Object.values(allGroupValues).flatMap((g) => Object.keys(g)))
    );

    // ✅ Header row
    let csv = "Group," + allTimerNames.join(",") + "\n";

    // ✅ Each group as one row
    for (const [groupId, timers] of Object.entries(allGroupValues)) {
      const row = [groupId, ...allTimerNames.map((t) => timers[t] ?? "0")];
      csv += row.join(",") + "\n";
    }

    // ✅ Download file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "all_timer_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Multi-Group Timer</h1>

      {/* Create multiple groups */}
      <TimerGroup groupId="Group1" reportGroupValues={reportGroupValues} />
      <TimerGroup groupId="Group2" reportGroupValues={reportGroupValues} />
      <TimerGroup groupId="Group3" reportGroupValues={reportGroupValues} />

      {/* Export all */}
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={exportAllToCSV}
      >
        Export ALL Groups CSV
      </button>
    </div>
  );
};

export default TimerManager;
