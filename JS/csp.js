// =============================================
// CSP — CONSTRAINT SATISFACTION — csp.js
// Syllabus topic: CSP / Hard Constraints
// =============================================

/**
 * CSP Filter: returns only rooms that pass ALL hard constraints.
 * This is the "constraint satisfaction" step — it prunes the search space
 * before A* runs, eliminating any state that violates a hard rule.
 *
 * @param {Array} rooms   — full room list from knowledge base
 * @param {object} req    — meeting request object
 * @returns {Array}       — rooms satisfying all constraints
 */
function cspFilter(rooms, req) {
  return rooms.filter(room => {
    const { passed } = applyRules(room, req);
    return passed;
  });
}