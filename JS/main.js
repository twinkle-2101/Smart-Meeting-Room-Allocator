// =============================================
// MAIN — main.js
// Entry point: wires UI events to agent logic
// =============================================

/**
 * Collect all form values and run the agent.
 * Called by "Find best room" button in the sidebar.
 */
function runAgent() {
  const req = {
    meetingName:    document.getElementById("meetingName").value.trim() || "Meeting",
    date:           document.getElementById("date").value,
    startTime:      document.getElementById("startTime").value,
    endTime:        document.getElementById("endTime").value,
    attendees:      parseInt(document.getElementById("attendees").value) || 1,
    preferredFloor: parseInt(document.getElementById("preferredFloor").value),
    equipment:      getSelected("req"),
    niceToHave:     getSelected("nice")
  };

  // Validate
  if (!req.date) {
    alert("Please select a date.");
    return;
  }
  if (req.startTime >= req.endTime) {
    alert("End time must be after start time.");
    return;
  }

  const result = meetingRoomAgent(req);
  renderResult(result, req);
}

/**
 * Confirm and store the booking, then re-run the agent
 * to refresh results (the booked room will now show a conflict).
 * @param {string} roomId
 */
function handleConfirm(roomId) {
  const req = window.currentReq;
  if (!req) return;

  confirmBooking(roomId, req);

  const room = ROOMS.find(r => r.id === roomId);
  alert(
    `✅ Room "${room ? room.name : roomId}" booked for "${req.meetingName}"\n` +
    `Date: ${req.date}  |  ${req.startTime} – ${req.endTime}`
  );

  // Re-run to show updated availability
  runAgent();
}

// ── INIT ────────────────────────────────────────────────────────────────────
// Runs once when the page loads
document.addEventListener("DOMContentLoaded", () => {
  buildChips();
  // Default date to today
  document.getElementById("date").valueAsDate = new Date();
});