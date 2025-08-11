import React, { useState } from "react";

const ClinicGroup = ({ clinicData, updateClinicData }) => {
  // const [specialty, setSpecialty] = useState("GynOnc");
  // const [subspec, setSubSpec] = useState("1.1");

  const specialties = ["GynOnc", "GynMedOnc", "Onco", "Uro", "Haem", "Paeds"];
  const subspecs = {
    GynOnc: [1.1, 1.2],
    GynMedOnc: [1323.1, 123.2],
    Onco: [1.1231, 2.1],
    Uro: [123.1, 1.2],
    Haem: [1.1, 13.2],
    Paeds: [1.31, 1.2],
  };
  const clinicianIDs = [
    "D01",
    "D02",
    "D03",
    "D04",
    "D05",
    "D06",
    "D07",
    "D08",
    "D09",
    "D10",
    "D11",
    "D12",
    "D13",
    "D14",
    "D15",
    "D16",
    "D17",
    "D18",
    "D19",
    "D20",
    "N01",
    "N02",
    "N03",
    "N04",
    "N05",
    "N06",
    "N07",
    "N08",
    "N09",
    "N10",
    "N11",
    "N12",
    "N13",
    "N14",
    "N15",
    "R01",
    "R02",
    "R03",
    "R04",
    "R05",
    "R06",
    "R07",
    "R08",
    "R09",
    "R10",
    "R11",
    "R12",
    "R13",
    "R14",
    "R15",
    "R16",
    "R17",
    "R18",
    "R19",
    "R20",
  ];

  return (
    <form className="border m-4 mb-0 flex flex-row">
      <div className="flex-1/5 flex flex-col p-4 justify-center align-middle items-center">
        <label className="text-sm">Observer ID</label>
        <input
          type="text"
          value={clinicData.obsID}
          id="obsID"
          onChange={(e) => updateClinicData("obsID", e.target.value)}
          className="w-[6rem] justify-center align-middle items-center bg-gray-50 border border-gray-300 text-gray-900"
        ></input>
      </div>

      <div className="flex-1/5 flex flex-col p-4">
        <label className="text-sm">Specialty</label>
        <select
          className="justify-center align-middle items-center bg-gray-50 border border-gray-300 text-gray-900"
          value={clinicData.specialty}
          onChange={(e) => {
            updateClinicData("specialty", e.target.value);
            // setSpecialty(e.target.value);
            // setSubSpec("");
          }}
        >
          <option value="" disabled>
            Choose
          </option>
          {specialties.map((name) => {
            return (
              <option key={name} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex-1/5 flex flex-col p-4">
        <label className="text-sm">Sub-specialty</label>
        <select
          className="justify-center align-middle items-center bg-gray-50 border border-gray-300 text-gray-900"
          value={clinicData.subspec}
          onChange={(e) => {
            updateClinicData("subspec", e.target.value);
            //setSubSpec(e.target.value);
          }}
        >
          <option value="" disabled>
            Choose
          </option>
          {subspecs[clinicData.specialty]?.map((name) => {
            return (
              <option key={name} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex-1/5 flex flex-col p-4 justify-center align-middle items-center">
        <label className="text-sm">Sub-specialty Clinic Code</label>
        <input
          type="text"
          value={clinicData.clinicCode}
          id="clinicCode"
          onChange={(e) => updateClinicData("clinicCode", e.target.value)}
          className="w-[6rem] justify-center align-middle items-center bg-gray-50 border border-gray-300 text-gray-900"
        ></input>
      </div>
      <div className="flex-1/5 flex flex-col p-4 justify-center align-middle items-center">
        <label className="text-sm">Clinician ID</label>
        <select
          value={clinicData.clinicianID}
          onChange={(e) => updateClinicData("clinicianID", e.target.value)}
          className="justify-center align-middle items-center bg-gray-50 border border-gray-300 text-gray-900"
        >
          <option value="" disabled>
            Choose
          </option>
          {clinicianIDs.map((name) => {
            return (
              <option key={name} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex-1/5 flex flex-col p-4 justify-center align-middle items-center">
        <label className="text-sm"># of Clinic Patients</label>
        <input
          pattern="^[0-9]+$"
          title="Input must be an integer."
          type="text"
          value={clinicData.numPatientsSeen}
          id="numPatientsSeen"
          onChange={(e) => updateClinicData("numPatientsSeen", e.target.value)}
          className="w-[6rem] justify-center align-middle items-center bg-gray-50 border border-gray-300 text-gray-900"
        ></input>
      </div>
    </form>
  );
};

export default ClinicGroup;
