// Run Club Fest — one-pager interactions

// A snapshot of real, independent LA run clubs (not affiliated with Run Club Fest).
// Sourced from public run club directories as of Sept 2026.
const CLUBS = [
  { name: "LA Cinephile Run Club", theme: "Runs to real LA film & TV shooting locations", url: "https://www.instagram.com/lacinephilerunclub/" },
  { name: "LA Frontrunners", theme: "LGBTQ+ inclusive running, since 1974", url: "https://www.lafrontrunners.com/" },
  { name: "Midnight Runners LA", theme: "After-dark, high-energy group runs", url: "https://www.midnightrunners.com/cities/los-angeles" },
  { name: "Koreatown Run Club", theme: "Neighborhood crew, Thursday nights", url: "https://koreatownrunclub.com/" },
  { name: "Venice Run Club", theme: "Laid-back coastal running", url: "https://venicerunclub.co/" },
  { name: "Skid Row Running Club", theme: "Community-built, 6am starts downtown", url: "https://www.skidrowrunningclub.com/" },
  { name: "Sawtelle Run Club", theme: "West LA neighborhood pride", url: "https://sawtellerunclub.com/" },
  { name: "Eagle Rock Run Club", theme: "Local routes, familiar faces", url: "https://www.instagram.com/eaglerockrunclub/" },
  { name: "South Bay Runners Club", theme: "Competitive pace groups, Manhattan Beach", url: "https://www.instagram.com/southbayrunnersclub/" },
  { name: "Boyle Heights Bridge Runners", theme: "Eastside community running crew", url: "https://www.boyleheightsbr.org/" },
  { name: "Friday Donut Run Club", theme: "Weekly run, weekly reward", url: "https://www.instagram.com/fridaydonutrunclub_burbank/" },
  { name: "Wolf Pack Runners", theme: "Crew-focused, accountability-driven", url: "https://www.instagram.com/wolf_packrunners/" },
  { name: "Run Happy Los Angeles", theme: "Pace-agnostic, all-welcome", url: "https://www.instagram.com/runhappylosangeles/" },
  { name: "L.A. Leggers", theme: "Santa Monica marathon training since the '80s", url: "https://www.laleggers.org/" },
  { name: "Los Feliz Flyers", theme: "Track and tempo-focused", url: "http://losfelizflyers.org/" },
  { name: "Downtown LA Running Group", theme: "For busy DTLA professionals", url: "https://www.facebook.com/groups/DTLARunning/" },
  { name: "Santa Monica Mountain Goats", theme: "Trail running club since 1982", url: "https://www.facebook.com/santamonicamountaingoats" },
  { name: "Pasadena Pacers", theme: "Free, all fitness levels", url: "https://www.pasadenapacers.org/" },
  { name: "Shoreline Frontrunners of Long Beach", theme: "LGBTQ+ inclusive since 1984", url: "https://wp.shorelinefrontrunners.org/" },
  { name: "323 Runners", theme: "DTLA crew, El Pino runs", url: "https://larunningclubs.com/" },
];

function renderClubs() {
  const grid = document.getElementById("club-grid");
  if (!grid) return;
  grid.innerHTML = CLUBS.map(
    (c) => `
    <div class="club-card">
      <a class="club-name" href="${escapeHtml(c.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(c.name)} ↗</a>
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
