// =============================================
// IF-THEN RULE ENGINE — rules-engine.js
// Syllabus topic: Reasoning / Inference
// =============================================

// Each rule has:
//   id       — unique identifier
//   name     — human-readable label shown in UI
//   test()   — returns true/false (the IF condition)
//   reason() — returns explanation string (shown in result card)

const RULES = [
  {
    id: "R1",
    name: "Capacity check",
    test: (room, req) => room.capacity >= req.attendees,
    reason: (room, req) =>
      `Capacity ${room.capacity} ≥ ${req.attendees} attendees`
  },
  {
    id: "R2",
    name: "Equipment check",
    test: (room, req) =>
      req.equipment.every(e => room.features.includes(e)),
    reason: (room, req) => {
      if (req.equipment.length === 0) return "No equipment required";
      const has = req.equipment.filter(e => room.features.includes(e));
      const missing = req.equipment.filter(e => !room.features.includes(e));
      return `Has: ${has.join(", ") || "none"} | Missing: ${missing.join(", ") || "none"}`;
    }
  },
  {
    id: "R3",
    name: "No double booking",
    test: (room, req) =>
      !hasConflict(room.id, req.date, req.startTime, req.endTime),
    reason: () => "No time conflict found"
  },
  {
    id: "R4",
    name: "Floor preference",
    test: (room, req) =>
      req.preferredFloor === 0 || room.floor === req.preferredFloor,
    reason: (room, req) => {
      if (req.preferredFloor === 0) return "No floor preference set";
      return `Floor ${room.floor} ${
        room.floor === req.preferredFloor ? "matches" : "does not match"
      } preference (Floor ${req.preferredFloor})`;
    }
  }
];

/**
 * Check if a room has a booking conflict for the given slot.
 * @param {string} roomId
 * @param {string} date
 * @param {string} start  — "HH:MM"
 * @param {string} end    — "HH:MM"
 * @returns {boolean}
 */
function hasConflict(roomId, date, start, end) {
  return BOOKINGS.some(
    b =>
      b.roomId === roomId &&
      b.date === date &&
      !(end <= b.startTime || start >= b.endTime)
  );
}

/**
 * Run all IF-THEN rules against a room for a given request.
 * @param {object} room
 * @param {object} req
 * @returns {{ passed: boolean, results: Array }}
 */
function applyRules(room, req) {
  const results = RULES.map(rule => ({
    id: rule.id,
    name: rule.name,
    passed: rule.test(room, req),
    reason: rule.reason(room, req)
  }));
  return {
    passed: results.every(r => r.passed),
    results
  };
}