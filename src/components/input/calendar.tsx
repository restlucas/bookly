export function CalendarInput() {
  return (
    <div className="flex flex-col gap-2">
      <label>Data de disponibilidade</label>
      <input
        className="rounded-md border-2 border-slate-700 bg-background-300 p-2"
        type="date"
      />
    </div>
  );
}
