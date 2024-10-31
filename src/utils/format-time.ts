export function formatMinutesToTime(minutes) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hours}:${mins}`;
}

export function convertTimeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function handleTimeInput(value) {
  // Remove caracteres não numéricos exceto ":"
  value = value.replace(/[^0-9:]/g, "");

  // Adiciona ":" automaticamente
  if (value.length >= 3 && !value.includes(":")) {
    value = value.slice(0, 2) + ":" + value.slice(2);
  }

  // Limita a entrada a 5 caracteres (hh:mm)
  if (value.length > 5) {
    value = value.slice(0, 5);
  }

  return value;
}
