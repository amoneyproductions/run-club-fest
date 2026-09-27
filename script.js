// Run Club Fest — one-pager interactions

// A snapshot of real, independent LA run clubs (not affiliated with Run Club Fest).
// Sourced from public run club directories as of Sept 2026.
const CLUBS = [
  { name: "LA Cinephile Run Club", theme: "Runs to real LA film & TV shooting locations" },
  { name: "LA Frontrunners", theme: "LGBTQ+ inclusive running, since 1974" },
  { name: "Midnight Runners LA", theme: "After-dark, high-energy group runs" },
  { name: "Koreatown Run Club", theme: "Neighborhood crew, Thursday nights" },
  { name: "Venice Run Club", theme: "Laid-back coastal running" },
  { name: "Skid Row Running Club", theme: "Community-built, 6am starts downtown" },
  { name: "Sawtelle Run Club", theme: "West LA neighborhood pride" },
  { name: "Eagle Rock Run Club", theme: "Local routes, familiar faces" },
  { name: "South Bay Runners Club", theme: "Competitive pace groups, Manhattan Beach" },
  { name: "Boyle Heights Bridge Runners", theme: "Eastside community running crew" },
  { name: "Friday Donut Run Club", theme: "Weekly run, weekly reward" },
  { name: "Wolf Pack Runners", theme: "Crew-focused, accountability-driven" },
  { name: "Run Happy Los Angeles", theme: "Pace-agnostic, all-welcome" },
  { name: "L.A. Leggers", theme: "Santa Monica marathon training since the '80s" },
  { name: "Los Feliz Flyers", theme: "Track and tempo-focused" },
  { name: "Downtown LA Running Group", theme: "For busy DTLA professionals" },
  { name: "Santa Monica Mountain Goats", theme: "Trail running club since 1982" },
  { name: "Pasadena Pacers", theme: "Free, all fitness levels" },
  { name: "Shoreline Frontrunners of Long Beach", theme: "LGBTQ+ inclusive since 1984" },
  { name: "323 Runners", theme: "DTLA crew, El Pino runs" },
];

function renderClubs() {
  const grid = document.getElementById("club-grid");
  if (!grid) return;
  grid.innerHTML = CLUBS.map(
    (c) => `
    <div class="club-card">
      <p class="club-name">${escapeHtml(c.name)}</p>
      <p class="club-theme">${escapeHtml(c.theme)}</p>
    </div>`
  ).join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function encodeForm(data) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

function initSignupForm() {
  const form = document.getElementById("signup-form");
  const success = document.getElementById("form-success");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => (payload[key] = value));

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm(payload),
    })
      .then(() => {
        form.hidden = true;
        if (success) success.hidden = false;
      })
      .catch(() => {
        // Fall back to a normal submit if the fetch fails (e.g. offline preview)
        form.submit();
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderClubs();
  setYear();
  initSignupForm();
});
