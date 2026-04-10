// =============================================
// UI RENDERER — ui.js
// Handles all DOM rendering and display logic
// =============================================

/**
 * Build equipment chip toggles in the sidebar.
 * Called once on page load.
 */
function buildChips() {
  const requiredEquip = ["projector", "whiteboard", "video_conf", "ac", "mic"];
  const niceEquip     = ["tv_screen", "computer_lab", "mic", "ac"];

  const eqContainer   = document.getElementById("equipChips");
  const niceContainer = document.getElementById("niceChips");

  requiredEquip.forEach(e => eqContainer.appendChild(makeChip(e, "req")));
  niceEquip.forEach(e     => niceContainer.appendChild(makeChip(e, "nice")));
}

/**
 * Create a single toggleable chip element.
 * @param {string} label  — equipment key (e.g. "projector")
 * @param {string} group  — "req" or "nice"
 * @returns {HTMLElement}
 */
function makeChip(label, group) {
  const div = document.createElement("div");
  div.className    = "chip";
  div.dataset.group = group;
  div.dataset.val  = label;
  div.textContent  = label.replace(/_/g, " ");
  div.onclick = () => div.classList.toggle("selected");
  return div;
}

/**
 * Read selected chip values for a given group.
 * @param {string} group — "req" or "nice"
 * @returns {string[]}
 */
function getSelected(group) {
  return [...document.querySelectorAll(`.chip[data-group="${group}"].selected`)]
    .map(c => c.dataset.val);
}

/**
 * Render the full result panel after agent runs.
 * @param {object} result — agent output
 * @param {object} req    — original meeting request
 */
function renderResult(result, req) {
  const panel = document.getElementById("mainPanel");

  if (!result.success) {
    panel.innerHTML = `
      <h2>Search result</h2>
      <div class="no-result">
        <strong>No room found</strong>
        <p>${result.message || "No room satisfies all constraints."}</p>
        ${
          result.suggestions && result.suggestions.length > 0
            ? `<p class="suggestions">
                Nearby options (relaxed capacity):
                <strong>${result.suggestions.map(r => r.name).join(", ")}</strong>
               </p>`
            : ""
        }
      </div>
      ${renderBookingsTable()}
    `;
    return;
  }

  const maxF   = Math.max(...result.ranked.map(n => n.f)) || 1;
  const cards  = result.ranked.map((node, i) => renderCard(node, i, maxF, req)).join("");

  panel.innerHTML = `
    <h2>Results for "<span>${req.meetingName}</span>"</h2>
    ${cards}
    ${renderBookingsTable()}
  `;

  // Store current request so confirmBooking() can access it
  window.currentReq = req;
}

/**
 * Render a single room result card.
 * @param {object} node   — ranked A* node
 * @param {number} index  — 0-based rank index
 * @param {number} maxF   — highest f score in results (for bar scaling)
 * @param {object} req    — request (used for confirm button)
 * @returns {string}      — HTML string
 */
function renderCard(node, index, maxF, req) {
  const isBest       = index === 0;
  const scorePercent = Math.round((1 - node.f / (maxF + 5)) * 100);

  const featureChips = node.room.features
    .map(f => `<span class="feat">${f.replace(/_/g, " ")}</span>`)
    .join("");

  const ruleRows = node.ruleResults
    .map(r => `
      <div class="rule-row">
        <span class="rule-icon ${r.passed ? "rule-pass" : "rule-fail"}">
          ${r.passed ? "✓" : "✗"}
        </span>
        <strong class="rule-name">${r.name}</strong>
        <span class="rule-reason">${r.reason}</span>
      </div>
    `)
    .join("");

  const confirmBtn = isBest
    ? `<button class="confirm-btn" onclick="handleConfirm('${node.room.id}')">
         Confirm booking
       </button>`
    : "";

  return `
    <div class="result-card ${isBest ? "best" : ""}">
      <div class="result-header">
        <div>
          <div class="room-name">
            ${node.room.name}
            <span class="room-id">· ${node.room.id}</span>
          </div>
          <div class="room-sub">
            Floor ${node.room.floor}
            &nbsp;·&nbsp; Capacity ${node.room.capacity}
            &nbsp;·&nbsp; A* score: ${node.f.toFixed(1)}
          </div>
        </div>
        <span class="badge ${isBest ? "badge-best" : "badge-alt"}">
          ${isBest ? "Best match" : "Alt #" + index}
        </span>
      </div>

      <div class="features">${featureChips}</div>

      <div class="astar-bar">
        <div class="astar-label">
          <span>A* fit score</span>
          <span>${scorePercent}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${scorePercent}%"></div>
        </div>
      </div>

      <div class="rules-list">${ruleRows}</div>

      ${confirmBtn}
    </div>
  `;
}

/**
 * Render the current bookings as an HTML table.
 * Returns empty string if no bookings exist yet.
 * @returns {string}
 */
function renderBookingsTable() {
  if (BOOKINGS.length === 0) return "";

  const rows = BOOKINGS.map(b => {
    const room = ROOMS.find(r => r.id === b.roomId);
    return `
      <tr>
        <td>${b.meetingName}</td>
        <td>${b.roomId} — ${room ? room.name : "Unknown"}</td>
        <td>${b.date}</td>
        <td>${b.startTime} – ${b.endTime}</td>
      </tr>
    `;
  }).join("");

  return `
    <div class="section-title">Current bookings</div>
    <table class="bookings-table">
      <thead>
        <tr>
          <th>Meeting</th>
          <th>Room</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}