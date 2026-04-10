// =============================================
// PROBLEM SOLVING AGENT — agent.js
// Syllabus topic: Agent / Problem Solving
// =============================================

/**
 * The Meeting Room Agent follows a perceive → think → act loop:
 *
 *   PERCEIVE  — validate the incoming request
 *   THINK     — run CSP + A* to find the best room
 *   ACT       — return a structured decision (or failure with suggestions)
 *
 * @param {object} req — meeting request
 * @returns {{ success: boolean, ranked?: Array, suggestions?: Array, message?: string }}
 */
function meetingRoomAgent(req) {
  // ── PERCEIVE: basic validation ──────────────────────────────────────
  if (!req.date || !req.startTime || !req.endTime || !req.attendees) {
    return { success: false, message: "Incomplete request. Please fill all required fields." };
  }
  if (req.startTime >= req.endTime) {
    return { success: false, message: "End time must be after start time." };
  }

  // ── THINK: A* over CSP-filtered rooms ───────────────────────────────
  const ranked = aStarSearch(ROOMS, req);

  // ── ACT: return result ───────────────────────────────────────────────
  if (ranked.length === 0) {
    // No room found — relax capacity by 30% to show near-misses
    const relaxed = {
      ...req,
      attendees: Math.max(1, Math.ceil(req.attendees * 0.7))
    };
    const suggestions = cspFilter(ROOMS, relaxed);
    return { success: false, suggestions, message: "No room satisfies all constraints." };
  }

  return { success: true, ranked };
}

/**
 * Confirm and store a booking in the global BOOKINGS array.
 * @param {string} roomId
 * @param {object} req
 */
function confirmBooking(roomId, req) {
  BOOKINGS.push({
    roomId,
    date: req.date,
    startTime: req.startTime,
    endTime: req.endTime,
    meetingName: req.meetingName
  });
}