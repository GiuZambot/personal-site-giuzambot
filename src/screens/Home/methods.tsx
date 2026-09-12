export const updateClock = (clockElement: HTMLTimeElement) => {
  const now = new Date();
  clockElement.dateTime = now.toISOString();
  clockElement.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
