import React, { useState, useEffect, useRef, useCallback } from "react";

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

export default InfoDropdown;
