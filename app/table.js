// Tabel 38 provinsi, detail modal, dan alat banding dua provinsi.
// Satu file satu tugas: semua interaksi tabel tinggal di sini.
import { PROVINCES } from "./provinces.js";
import { NATIONAL, ESTIMATE_NOTE } from "./data.js";

const $ = (sel) => document.querySelector(sel);
const fmt = (n, digits = 1) =>
  n.toLocaleString("id-ID", { minimumFractionDigits: digits, maximumFractionDigits: digits });

// Baris tabel dibatasi hanya pada tampilan staged (lihat main.js).
const STAGED_SHOT = new URLSearchParams(location.search).get("shot");
const TABLE_SHOT_ROWS = 8;

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
  return STAGED_SHOT === "table" ? sorted.slice(0, TABLE_SHOT_ROWS) : sorted;
}

export function renderTable() {
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
  const colCount = PROVINCES.columns.length;
  if (rows.length === 0) {
    body.innerHTML = `<tr class="empty-row"><td colspan="${colCount}">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>`;
  } else {
    body.innerHTML = rows.map((r) => `
      <tr data-prov="${r.name}" tabindex="0">
        <td><span class="prov-name">${r.name}</span><span class="prov-cap">Ibu kota: ${r.capital}</span></td>
        <td>${fmt(r.pop)}</td>
        <td>${r.pdrb.toLocaleString("id-ID")}</td>
        <td>${r.percapita.toLocaleString("id-ID")}</td>
        <td>${fmt(r.unemp)}</td>
        <td>${fmt(r.poverty)}</td>
        <td>${fmt(r.ipm)}</td>
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

export function initTableSearch() {
  $("#provSearch").addEventListener("input", renderTable);
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
    <div><dt>PDRB per kapita</dt><dd>Rp${p.percapita.toLocaleString("id-ID")} jt</dd></div>
    <div><dt>Pangsa PDRB nasional</dt><dd>${fmt(pdrbShare)}% dari Rp${NATIONAL.pdb.toLocaleString("id-ID")} T</dd></div>
    <div><dt>Pengangguran</dt><dd>${fmt(p.unemp)}% (${unempDiff >= 0 ? "+" : ""}${fmt(unempDiff)} poin vs nasional ${fmt(NATIONAL.unemp)}%)</dd></div>
    <div><dt>Kemiskinan</dt><dd>${fmt(p.poverty)}% (nasional ${fmt(NATIONAL.poverty)}%)</dd></div>
    <div><dt>IPM</dt><dd>${fmt(p.ipm)} (nasional ${fmt(NATIONAL.ipm)})</dd></div>`;
  $("#modalNote").textContent = ESTIMATE_NOTE;
  $("#modalBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}

function closeModal() {
  $("#modalBackdrop").hidden = true;
  document.body.style.overflow = "";
}

export function initModal() {
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#modalBackdrop").hidden) closeModal();
  });
}

// ---------- Bandingkan dua provinsi ----------
// Metrik yang dibandingkan, dengan label dan cara menampilkannya.
const COMPARE_METRICS = [
  { key: "pop", label: "Penduduk (jt jiwa)", format: (v) => `${fmt(v)} jt` },
  { key: "pdrb", label: "PDRB (Rp T)", format: (v) => `Rp${v.toLocaleString("id-ID")} T` },
  { key: "percapita", label: "PDRB per kapita (Rp jt)", format: (v) => `Rp${v.toLocaleString("id-ID")} jt` },
  { key: "unemp", label: "Pengangguran (%) — lebih rendah lebih baik", format: (v) => `${fmt(v)}%` },
  { key: "poverty", label: "Kemiskinan (%) — lebih rendah lebih baik", format: (v) => `${fmt(v)}%` },
  { key: "ipm", label: "IPM — lebih tinggi lebih baik", format: (v) => fmt(v) },
];

function compareWinner(a, b) {
  // Hitung siapa unggul di tiap metrik (rendah menang untuk pengangguran/kemiskinan).
  let winsA = 0, winsB = 0;
  for (const m of COMPARE_METRICS) {
    const lowWins = m.key === "unemp" || m.key === "poverty";
    if (a[m.key] === b[m.key]) continue;
    const aBetter = lowWins ? a[m.key] < b[m.key] : a[m.key] > b[m.key];
    if (aBetter) winsA += 1; else winsB += 1;
  }
  if (winsA === winsB) return "Kedua provinsi berimbang: masing-masing unggul di separuh metrik.";
  const winner = winsA > winsB ? a : b;
  const wins = Math.max(winsA, winsB);
  return `${winner.name} unggul di ${wins} dari ${COMPARE_METRICS.length} metrik.`;
}

export function renderCompare() {
  const selA = $("#cmpA");
  const selB = $("#cmpB");
  const a = PROVINCES.rows.find((r) => r.name === selA.value);
  const b = PROVINCES.rows.find((r) => r.name === selB.value);
  if (!a || !b) return;
  $("#cmpResult").innerHTML = COMPARE_METRICS.map((m) => {
    const max = Math.max(a[m.key], b[m.key]);
    const bar = (p, color) => {
      const pct = Math.max(3, (p[m.key] / max) * 100);
      return `<span class="bar-track"><span class="bar-fill" style="width:${pct.toFixed(1)}%;background:${color}"></span></span>
        <span class="bar-val">${m.format(p[m.key])}</span>`;
    };
    return `
    <div class="cmp-metric">
      <div class="cmp-label">${m.label}</div>
      <div class="cmp-row"><span class="cmp-name">${a.name}</span>${bar(a, "#1d4ed8")}</div>
      <div class="cmp-row"><span class="cmp-name">${b.name}</span>${bar(b, "#0e7490")}</div>
    </div>`;
  }).join("");
  $("#cmpVerdict").textContent = a.name === b.name
    ? "Pilih dua provinsi yang berbeda untuk membandingkan."
    : compareWinner(a, b);
}

export function initCompare() {
  const selA = $("#cmpA");
  const selB = $("#cmpB");
  const options = PROVINCES.rows.map((r) => `<option value="${r.name}">${r.name}</option>`).join("");
  selA.innerHTML = options;
  selB.innerHTML = options;
  selA.value = "DKI Jakarta";
  selB.value = "Jawa Barat";
  selA.addEventListener("change", renderCompare);
  selB.addEventListener("change", renderCompare);
  renderCompare();
}
