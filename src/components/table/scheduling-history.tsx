"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";

export function SchedulingHistory() {
  return (
    <table className="font-regular w-full text-left text-sm shadow-md rtl:text-right">
      <thead className="bg-background-300 text-xs uppercase">
        <tr>
          <th className="px-6 py-3">Data</th>
          <th className="px-6 py-3">Profissional</th>
          <th className="px-6 py-3">Ocupação</th>
          <th className="px-6 py-3">Valor</th>
          <th className="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <tr
              key={index}
              className="border-b border-background-300 hover:bg-background-300"
            >
              <td className="px-6 py-4">22/10/2024</td>
              <td className="px-6 py-4">
                <Link
                  href="./professionals/1"
                  className="flex cursor-pointer items-center justify-start gap-2 duration-100 hover:underline"
                >
                  <span>Metro Boomin</span>
                  <ArrowUpRight size={20} weight="regular" fill="#FFF" />
                </Link>
              </td>
              <td className="px-6 py-4">Médico</td>
              <td className="px-6 py-4">R$200,00</td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-vibrant-green-100"></span>
                  <span>Concluído</span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
