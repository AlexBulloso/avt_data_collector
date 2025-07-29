import React, { useState, useEffect, useRef, useCallback } from "react";
const Timer = ({
  name,
  state,
  running,
  focusState,
  setRunning,
  setFocusState,
  setStartTime,
  setEndTime,
  startTimeRef,
  endTimeRef,
  updateTimeDataLocal,
}) => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    if (
      name == "Contact" &&
      running &&
      focusState == state &&
      !startTimeRef.current
    ) {
      startTimeRef.current = new Date();
      updateTimeDataLocal(
        "startTime",
        startTimeRef.current.toLocaleTimeString()
      );
    }
  }, [name, running, focusState, state]);

  useEffect(() => {
    if (
      name == "End Consultation" &&
      running &&
      focusState == state &&
      !endTimeRef.current
    ) {
      endTimeRef.current = new Date();
      updateTimeDataLocal("endTime", endTimeRef.current.toLocaleTimeString());
    }
  }, [name, running, focusState, state]);

  const [elapsed, setElapsed] = useState(0);
  const [start, setStart] = useState(Date.now());
  useEffect(() => {
    let animFrameID;
    const tick = () => {
      const now = Date.now();
      setTime({ minutes: 0, seconds: (elapsed + (now - start)) / 1000 });
      animFrameID = requestAnimationFrame(tick);
    };

    if (running && focusState == state && name != "End Consultation") {
      animFrameID = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(animFrameID);
  }, [running, focusState, state]);

  // useEffect(() => {
  //   let interval;
  //   if (running && focusState == state && name != "End Consultation") {
  //     interval = setInterval(() => {
  //       setTime(({ minutes, seconds }) => {
  //         if (seconds == 59.9) {
  //           return { minutes: minutes + 1, seconds: 0 };
  //         } else {
  //           return { minutes: minutes, seconds: seconds + 0.1 };
  //         }
  //       });
  //     }, 100);
  //   }

  //   return () => clearInterval(interval);
  // });

  useEffect(() => {
    if (focusState != state && start) {
      setElapsed((prev) => prev + (Date.now() - start));
      setStart(null);
    }
  }, [running, focusState, state, start]);

  const decimalised = (time.minutes + time.seconds / 60).toFixed(2);
  const decimalRaw = time.minutes + time.seconds / 60;
  useEffect(() => {
    updateTimeDataLocal(name, decimalRaw);
  }, [decimalRaw, name, updateTimeDataLocal]);

  return (
    <div className="flex flex-row m-[1rem] justify-center align-middle">
      {name != "End Consultation" ? (
        <div className="mr-[1rem]">
          <h2>{name}</h2>
          <h3>{decimalised} mins</h3>
        </div>
      ) : null}

      <button
        onClick={() => {
          setStart(Date.now());
          setRunning(true);
          setFocusState(state);
          if (name == "Contact" && !startTimeRef.current) {
            setStartTime(new Date());
          }
          if (name == "End Consultation" && !endTimeRef.current) {
            setEndTime(new Date());
          }
        }}
      >
        {name == "End Consultation" ? name : "Start"}
      </button>
    </div>
  );
};

export default Timer;
