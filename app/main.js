import { META, KPI, GROWTH, SECTORS, ISLANDS, PROVINCES, NATIONAL, ESTIMATE_NOTE } from "./data.js";

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const fmt = (n, digits = 1) =>
  n.toLocaleString("id-ID", { minimumFractionDigits: digits, maximumFractionDigits: digits });

// ---------- KPI cards ----------
function renderKpi() {
  const grid = $("#kpiGrid");
  grid.innerHTML = KPI.map(
    (k) => `
    <article class="kpi">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-sub">${k.sub}</div>
      <div class="kpi-change">${k.change} <span class="src">· ${k.source}</span></div>
    </article>`
  ).join("");
}

// ---------- Line chart (canvas, no libraries) ----------
let currentSeries = "pdb";
let chartPoints = [];

function seriesMeta() {
  return currentSeries === "pdb"
    ? { values: GROWTH.pdb, label: "Pertumbuhan PDB", unit: "%" }
    : { values: GROWTH.inflasi, label: "Inflasi", unit: "%" };
}

function drawChart() {
  const canvas = $("#growthChart");
  const ctx = canvas.getContext("2d");
  const { values, label } = seriesMeta();
  const W = canvas.width;
  const H = canvas.height;
  const padL = 52, padR = 18, padT = 18, padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const lo = Math.min(-4, ...values) - 0.4;
  const hi = Math.max(6, ...values) + 0.4;
  const xAt = (i) => padL + (i / (GROWTH.years.length - 1)) * plotW;
  const yAt = (v) => padT + ((hi - v) / (hi - lo)) * plotH;

  ctx.clearRect(0, 0, W, H);
  ctx.font = "12px -apple-system, 'Segoe UI', Roboto, sans-serif";

  // Gridlines + y labels
  ctx.strokeStyle = "#e5e7eb";
  ctx.fillStyle = "#6b7280";
  ctx.lineWidth = 1;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let v = -4; v <= 6; v += 2) {
    const y = yAt(v);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.fillText(`${fmt(v, 0)}%`, padL - 8, y);
  }
  // Zero line stronger
  ctx.strokeStyle = "#9ca3af";
  ctx.beginPath();
  ctx.moveTo(padL, yAt(0));
  ctx.lineTo(W - padR, yAt(0));
  ctx.stroke();

  // Area fill under the line
  const grad = ctx.createLinearGradient(0, padT, 0, H - padB);
  grad.addColorStop(0, "rgba(29,78,216,.18)");
  grad.addColorStop(1, "rgba(29,78,216,.02)");
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(xAt(i), yAt(v)) : ctx.lineTo(xAt(i), yAt(v))));
  ctx.lineTo(xAt(values.length - 1), H - padB);
  ctx.lineTo(xAt(0), H - padB);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(xAt(i), yAt(v)) : ctx.lineTo(xAt(i), yAt(v))));
  ctx.strokeStyle = "#1d4ed8";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  // Points (hollow ring marks the 2025 estimate)
  chartPoints = values.map((v, i) => ({ x: xAt(i), y: yAt(v), value: v, year: GROWTH.years[i] }));
  chartPoints.forEach((p) => {
    const estimated = GROWTH.estimateYears.includes(p.year);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = estimated ? "#ffffff" : "#1d4ed8";
    ctx.fill();
    ctx.strokeStyle = "#1d4ed8";
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });

  // X labels
  ctx.fillStyle = "#6b7280";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  GROWTH.years.forEach((y, i) => ctx.fillText(String(y), xAt(i), H - padB + 8));

  canvas.dataset.series = label;
}

function chartTooltip(e) {
  const canvas = $("#growthChart");
  const tip = $("#chartTip");
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const mx = (e.clientX - rect.left) * scaleX;
  const my = (e.clientY - rect.top) * (canvas.height / rect.height);
  let best = null;
  let bestDist = 28;
  for (const p of chartPoints) {
    const d = Math.hypot(p.x - mx, p.y - my);
    if (d < bestDist) { bestDist = d; best = p; }
  }
  if (!best) { tip.hidden = true; return; }
  const { label, unit } = seriesMeta();
  const est = GROWTH.estimateYears.includes(best.year) ? " (estimasi)" : "";
  tip.textContent = `${best.year} · ${label}: ${fmt(best.value, 2)}${unit}${est}`;
  tip.style.left = `${(best.x / canvas.width) * 100}%`;
  tip.style.top = `${(best.y / canvas.height) * 100}%`;
  tip.hidden = false;
}

function initChart() {
  drawChart();
  const canvas = $("#growthChart");
  canvas.addEventListener("mousemove", chartTooltip);
  canvas.addEventListener("mouseleave", () => { $("#chartTip").hidden = true; });
  const btnPdb = $("#btnPdb");
  const btnInflasi = $("#btnInflasi");
  const setSeries = (series) => {
    currentSeries = series;
    btnPdb.classList.toggle("active", series === "pdb");
    btnInflasi.classList.toggle("active", series === "inflasi");
    btnPdb.setAttribute("aria-pressed", String(series === "pdb"));
    btnInflasi.setAttribute("aria-pressed", String(series === "inflasi"));
    $("#chartTip").hidden = true;
    drawChart();
  };
  btnPdb.addEventListener("click", () => setSeries("pdb"));
  btnInflasi.addEventListener("click", () => setSeries("inflasi"));
}

// ---------- Horizontal bars ----------
function renderBars(el, rows, valueKey, formatValue) {
  const max = Math.max(...rows.map((r) => r[valueKey]));
  el.innerHTML = rows.map((r) => {
    const pct = Math.max(2.5, (r[valueKey] / max) * 100);
    return `
    <div class="bar-row" role="listitem">
      <span class="bar-name">${r.name}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${pct.toFixed(1)}%"></span></span>
      <span class="bar-val">${formatValue(r)}</span>
    </div>`;
  }).join("");
}

// ---------- Province table ----------
let sortKey = "pop";
let sortDir = -1; // default: penduduk terbanyak dulu

function visibleRows() {
  const q = $("#provSearch").value.trim().toLowerCase();
  const rows = PROVINCES.rows.filter(
    (r) => !q || r.name.toLowerCase().includes(q) || r.capital.toLowerCase().includes(q)
  );
  const sorted = [...rows].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    if (typeof av === "string") return sortDir * av.localeCompare(bv, "id");
    return sortDir * (av - bv);
  });
  // Staged table shot: cap the rows so the card ends inside the viewport.
  return STAGED_SHOT === "table" ? sorted.slice(0, TABLE_SHOT_ROWS) : sorted;
}

function renderTable() {
  const head = $("#provHead");
  head.innerHTML = PROVINCES.columns.map((c) => {
    const arrow = c.key === sortKey ? (sortDir === 1 ? " ▲" : " ▼") : "";
    return `<th data-key="${c.key}" scope="col">${c.label}<span class="arrow">${arrow}</span></th>`;
  }).join("");
  head.querySelectorAll("th").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      if (sortKey === key) sortDir *= -1;
      else { sortKey = key; sortDir = key === "name" ? 1 : -1; }
      renderTable();
    });
  });

  const rows = visibleRows();
  const body = $("#provBody");
  if (rows.length === 0) {
    body.innerHTML = `<tr class="empty-row"><td colspan="5">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>`;
  } else {
    body.innerHTML = rows.map((r) => `
      <tr data-prov="${r.name}" tabindex="0">
        <td><span class="prov-name">${r.name}</span><span class="prov-cap">Ibu kota: ${r.capital}</span></td>
        <td>${fmt(r.pop)}</td>
        <td>${r.pdrb.toLocaleString("id-ID")}</td>
        <td>${fmt(r.unemp)}</td>
        <td>${fmt(r.poverty)}</td>
      </tr>`).join("");
  }
  body.querySelectorAll("tr[data-prov]").forEach((tr) => {
    tr.addEventListener("click", () => openModal(tr.dataset.prov));
    tr.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(tr.dataset.prov); }
    });
  });
  $("#rowCount").textContent = `${rows.length} dari ${PROVINCES.rows.length} provinsi ditampilkan.`;
}

// ---------- Detail modal ----------
function openModal(name) {
  const p = PROVINCES.rows.find((r) => r.name === name);
  if (!p) return;
  const rank = [...PROVINCES.rows].sort((a, b) => b.pop - a.pop).findIndex((r) => r.name === name) + 1;
  const share = (p.pop / NATIONAL.pop) * 100;
  const pdrbShare = (p.pdrb / NATIONAL.pdb) * 100;
  const unempDiff = p.unemp - NATIONAL.unemp;
  $("#modalTitle").textContent = p.name;
  $("#modalCapital").textContent = `Ibu kota: ${p.capital}`;
  $("#modalFacts").innerHTML = `
    <div><dt>Peringkat penduduk</dt><dd>#${rank} dari ${PROVINCES.rows.length}</dd></div>
    <div><dt>Pangsa nasional</dt><dd>${fmt(share)}% penduduk</dd></div>
    <div><dt>Penduduk</dt><dd>${fmt(p.pop)} jt jiwa</dd></div>
    <div><dt>PDRB</dt><dd>Rp${p.pdrb.toLocaleString("id-ID")} T</dd></div>
    <div><dt>Pangsa PDRB nasional</dt><dd>${fmt(pdrbShare)}% dari Rp${NATIONAL.pdb.toLocaleString("id-ID")} T</dd></div>
    <div><dt>Pengangguran</dt><dd>${fmt(p.unemp)}% (${unempDiff >= 0 ? "+" : ""}${fmt(unempDiff)} poin vs nasional ${fmt(NATIONAL.unemp)}%)</dd></div>
    <div><dt>Kemiskinan</dt><dd>${fmt(p.poverty)}% (nasional ${fmt(NATIONAL.poverty)}%)</dd></div>`;
  $("#modalNote").textContent = ESTIMATE_NOTE;
  $("#modalBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}

function closeModal() {
  $("#modalBackdrop").hidden = true;
  document.body.style.overflow = "";
}

function initModal() {
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#modalBackdrop").hidden) closeModal();
  });
}

// ---------- Staged shot views + nav ----------
// Which staged view (if any) this load is showing — read once, up front,
// so the table can cap its rows before its first render.
const STAGED_SHOT = (() => {
  const shot = new URLSearchParams(location.search).get("shot");
  return ["overview", "charts", "table"].includes(shot) ? shot : null;
})();
// In the table shot the card must end inside the viewport: show 8 rows.
const TABLE_SHOT_ROWS = 8;
function applyShotView() {
  const active = STAGED_SHOT;
  if (active) {
    document.body.dataset.shot = active;
    document.querySelectorAll(".site-nav a").forEach((a) => {
      const map = { overview: "ringkasan", charts: "grafik", table: "provinsi" };
      a.classList.toggle("active", a.dataset.nav === map[active]);
    });
    if (active === "charts") {
      // Shorter canvas so the line chart plus both bar cards fit in 720px.
      const canvas = $("#growthChart");
      canvas.height = 170;
      drawChart();
    }
  }
  // Hide the table caption row-count note from staged shots is unnecessary;
  // keep everything visible so no content is cut at the viewport edge.
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
initChart();
renderBars($("#sectorBars"), SECTORS.rows, "share", (r) => `${fmt(r.share)}%`);
renderBars($("#islandBars"), ISLANDS.rows, "pop", (r) => `${fmt(r.pop)} jt`);
renderTable();
$("#provSearch").addEventListener("input", renderTable);
initModal();
initNav();
applyShotView();
