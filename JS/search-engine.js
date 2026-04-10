// =============================================
// A* SEARCH ENGINE — search-engine.js
// Syllabus topic: Informed Search / A*
// =============================================

/**
 * g(n) — Actual cost already paid to reach this node.
 * Here: how much capacity is wasted (larger room than needed = higher cost).
 * A room with 20 seats for 15 people wastes 5 seats → g = 5 × 0.5 = 2.5
 *
 * @param {object} room
 * @param {object} req
 * @returns {number}
 */
function gCost(room, req) {
  return (room.capacity - req.attendees) * 0.5;
}

/**
 * h(n) — Heuristic estimate of remaining cost to reach the goal.
 * Lower h = better match. Penalises:
 *   - Missing nice-to-have features (+3 each)
 *   - Wrong floor              (+5)
 *   - Lower-priority room      (+priority × 0.5)
 *
 * @param {object} room
 * @param {object} req
 * @returns {number}
 */
function heuristic(room, req) {
  let h = 0;

  // Missing nice-to-have features
  const niceToHave = req.niceToHave || [];
  niceToHave.forEach(f => {
    if (!room.features.includes(f)) h += 3;
  });

  // Floor mismatch
  if (req.preferredFloor !== 0 && room.floor !== req.preferredFloor) {
    h += 5;
  }

  // Room priority (1 = preferred, higher = less preferred)
  h += room.priority * 0.5;

  return h;
}

/**
 * A* Search: finds and ranks all eligible rooms by f = g + h.
 * Rooms are first filtered by CSP (hard constraints),
 * then scored and sorted by total cost f.
 *
 * @param {Array}  rooms  — full room list
 * @param {object} req    — meeting request
 * @returns {Array}       — ranked nodes [ { room, g, h, f, rank, ruleResults } ]
 */
function aStarSearch(rooms, req) {
  // Step 1: CSP prunes illegal states
  const eligible = cspFilter(rooms, req);
  if (eligible.length === 0) return [];

  // Step 2: Score each eligible room
  const nodes = eligible.map(room => {
    const g = gCost(room, req);
    const h = heuristic(room, req);
    return {
      room,
      g,
      h,
      f: g + h,
      ruleResults: applyRules(room, req).results
    };
  });

  // Step 3: Sort open list by f (A* priority)
  nodes.sort((a, b) => a.f - b.f);

  // Step 4: Return ranked list
  return nodes.map((node, i) => ({ ...node, rank: i + 1 }));
}