// Boot situs: merangkai kartu KPI, sorotan, grafik, tabel, dan banding provinsi.
// Logika berat tinggal di modulnya masing-masing (charts.js, table.js);
// file ini hanya memanggil mereka dalam urutan yang benar.
import { META, KPI, SECTORS, ISLANDS, AGE, MONETARY } from "./data.js";
import { EXTREMES, HIGHLIGHTS } from "./provinces.js";
import { initGrowthChart, initTrendChart, drawTradeChart, renderBars } from "./charts.js";
import { renderTable, initTableSearch, initModal, initCompare } from "./table.js";

const $ = (sel) => document.querySelector(sel);
const fmt = (n, digits = 1) =>
  n.toLocaleString("id-ID", { minimumFractionDigits: digits, maximumFractionDigits: digits });

// ---------- Kartu KPI ----------
function renderKpi() {
  $("#kpiGrid").innerHTML = KPI.map(
    (k) => `
    <article class="kpi">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-sub">${k.sub}</div>
      <div class="kpi-change">${k.change} <span class="src">· ${k.source}</span></div>
    </article>`
  ).join("");
}

// ---------- Sorotan dan sekilas daerah (tampilan ringkasan) ----------
function renderHighlights() {
  $("#highlightGrid").innerHTML = HIGHLIGHTS.map(
    (h) => `
    <article class="highlight">
      <h3>${h.title}</h3>
      <p>${h.text}</p>
      <p class="highlight-src">${h.source}</p>
    </article>`
  ).join("");
  $("#quickFacts").innerHTML = [
    ["Penduduk terbanyak", EXTREMES.popTop.name, EXTREMES.popTop.value],
    ["PDRB terbesar", EXTREMES.pdrbTop.name, EXTREMES.pdrbTop.value],
    ["PDRB/kapita tertinggi", EXTREMES.percapitaTop.name, EXTREMES.percapitaTop.value],
    ["IPM tertinggi", EXTREMES.ipmTop.name, EXTREMES.ipmTop.value],
    ["Kemiskinan tertinggi", EXTREMES.povertyTop.name, EXTREMES.povertyTop.value],
  ].map(
    ([label, name, value]) => `
    <div class="fact">
      <span class="fact-label">${label}</span>
      <strong>${name}</strong>
      <span class="fact-value">${value}</span>
    </div>`
  ).join("");
}

// ---------- Fakta moneter di kartu perdagangan ----------
function renderMonetary() {
  $("#monetaryFacts").innerHTML = [
    [MONETARY.reserves, MONETARY.reservesNote],
    [MONETARY.rupiah, MONETARY.rupiahNote],
    [MONETARY.policyRate, MONETARY.policyRateNote],
  ].map(
    ([value, note]) => `
    <div class="fact">
      <span class="fact-value">${value}</span>
      <span class="fact-label">${note}</span>
    </div>`
  ).join("");
}

// ---------- Tampilan staged untuk screenshot ----------
// ?shot=overview | charts | table — tiap tampilan hanya menunjukkan
// bagiannya sendiri supaya tidak ada yang terpotong di tepi viewport.
const STAGED_SHOT = (() => {
  const shot = new URLSearchParams(location.search).get("shot");
  return ["overview", "charts", "table"].includes(shot) ? shot : null;
})();

function applyShotView() {
  if (!STAGED_SHOT) {
    window.__shotReady = true;
    return;
  }
  document.body.dataset.shot = STAGED_SHOT;
  const map = { overview: "ringkasan", charts: "grafik", table: "provinsi" };
  document.querySelectorAll(".site-nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === map[STAGED_SHOT]);
  });
  if (STAGED_SHOT === "charts") {
    // Kanvas lebih pendek supaya grafik garis + kedua kartu batang muat 720px.
    // Penggambar ulang terjadi di boot, setelah tampilan diterapkan.
    $("#growthChart").height = 170;
  }
  window.__shotReady = true;
}

function initNav() {
  document.querySelectorAll(".site-nav a").forEach((a) => {
    a.addEventListener("click", () => {
      document.querySelectorAll(".site-nav a").forEach((x) => x.classList.remove("active"));
      a.classList.add("active");
    });
  });
}

// ---------- Boot ----------
document.title = `${META.title} — ${META.subtitle}`;
renderKpi();
renderHighlights();
renderMonetary();
const growth = initGrowthChart();
const trend = initTrendChart();
drawTradeChart();
renderBars($("#sectorBars"), SECTORS.rows, "share", (r) => `${fmt(r.share)}%`);
renderBars($("#islandBars"), ISLANDS.rows, "pop", (r) => `${fmt(r.pop)} jt`);
renderBars($("#ageBars"), AGE.rows, "pop", (r) => `${fmt(r.pop)}%`);
renderTable();
initTableSearch();
initModal();
initCompare();
initNav();
applyShotView();
// Simpan penggambar ulang untuk tampilan staged (kanvas diperpendek).
if (STAGED_SHOT === "charts") {
  growth.redraw();
  trend.redraw();
}
