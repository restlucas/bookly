"use client";

import { useState } from "react";

export function RangeInput() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(500);
  const [selectedValue, setSelectedValue] = useState(500);

  function handleRangeValue(event: any) {
    setSelectedValue(event.target.value);
  }

  return (
    <div className="flex flex-col gap-2">
      <label>Valor do serviço</label>
      <div className="leading-3">
        <input
          className="w-full rounded-md border-2 border-slate-700 bg-background-300 p-2"
          type="range"
          min={minValue}
          max={maxValue}
          step={100}
          defaultValue={maxValue}
          onInput={handleRangeValue}
        />
        <div className="flex items-center justify-between">
          <span className="text-sm">R${minValue}</span>
          <span className="text-sm">R${selectedValue}</span>
        </div>
      </div>
    </div>
  );
}
