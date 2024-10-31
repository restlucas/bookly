"use client";

import { getCalendar } from "@/utils/calendar";
import { getWeekDays } from "@/utils/get-week-days";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import {
  endOfMonth,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
} from "date-fns";
import { useState } from "react";

export function Calendar(schedule: any) {
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  const shortWeekDays = getWeekDays({ short: true });
  const calendarWeeks = getCalendar();

  function handleSelectDate() {
    setIsSelectedDate(true);
  }

  return (
    <div className="grid grid-cols-[70%_30%] gap-4">
      {/* Calendar */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">
            Outubro <span className="text-slate-400">2024</span>
          </h4>
          <div className="flex gap-2 text-slate-400">
            <button className="cursor-pointer rounded-sm border-none bg-none leading-[0] hover:text-slate-100 focus:shadow-md">
              <CaretLeft className="h-5 w-5" />
            </button>
            <button className="cursor-pointer rounded-sm border-none bg-none leading-[0] hover:text-slate-100 focus:shadow-md">
              <CaretRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <table className="w-full table-fixed border-spacing-1">
          <thead>
            <tr>
              {shortWeekDays.map((weekDay) => (
                <th className="text-xs" key={weekDay}>
                  {weekDay}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="before:block before:leading-3 before:text-transparent before:content-['.']">
            {calendarWeeks.map((week, index) => {
              return (
                <tr key={index} className="box-border">
                  {week.map((day, index) => {
                    return (
                      <td key={index} className="box-border">
                        <button
                          onClick={handleSelectDate}
                          disabled={day.disabled}
                          className={`aspect-square w-full cursor-pointer rounded-sm text-center text-sm ${day.disabled ? "disabled:text-slate-700" : "hover:bg-background-300/60"}`}
                        >
                          {getDate(new Date(day.date))}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {/* <tr>
              {Array.from({ length: 7 }).map((_, index) => {
                return (
                  <td key={index} className="box-border">
                    <button
                      onClick={handleSelectDate}
                      className="aspect-square w-full cursor-pointer rounded-sm bg-background-300 text-center text-sm hover:bg-background-300/60"
                    >
                      {index}
                    </button>
                  </td>
                );
              })}
            </tr>
            <tr>
              {Array.from({ length: 7 }).map((_, index) => {
                return (
                  <td key={index} className="box-border">
                    <button
                      disabled
                      className="aspect-square w-full cursor-pointer rounded-sm text-center text-sm disabled:text-slate-700"
                    >
                      {index}
                    </button>
                  </td>
                );
              })}
            </tr>
            <tr>
              {Array.from({ length: 7 }).map((_, index) => {
                return (
                  <td key={index} className="box-border">
                    <button className="aspect-square w-full cursor-pointer rounded-sm text-center text-sm">
                      {index}
                    </button>
                  </td>
                );
              })}
            </tr>
            <tr>
              {Array.from({ length: 7 }).map((_, index) => {
                return (
                  <td key={index} className="box-border">
                    <button className="aspect-square w-full cursor-pointer rounded-sm text-center text-sm">
                      {index}
                    </button>
                  </td>
                );
              })}
            </tr> */}
          </tbody>
        </table>
      </div>

      {/* Schedules */}
      <div
        className={`border-l-[1px] border-background-300 ${!isSelectedDate ? "flex items-center justify-center" : "pl-6"}`}
      >
        {!isSelectedDate ? (
          <h4 className="w-4/5 text-center text-sm text-slate-400/90">
            Selecione uma data para ver os horários disponíveis 😊
          </h4>
        ) : (
          <div className="flex h-full flex-col">
            <h4 className="mb-4 text-sm">
              terça feira, <br />{" "}
              <span className="text-vibrant-green-100">22 de outubro</span>
            </h4>

            <div className="relative flex-1">
              <div className="absolute bottom-0 right-0 top-0 flex w-full flex-col gap-2 overflow-y-scroll [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-vibrant-green-200 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-background-200 [&::-webkit-scrollbar]:w-1">
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <button
                      key={index}
                      className="cursor-pointer rounded-sm bg-background-300 py-1 hover:bg-background-300/60"
                    >
                      0{index}:00h
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
