// Semua grafik kanvas situs — digambar tanpa pustaka, satu file satu tugas.
// Grafik garis dipakai dua kali (PDB/inflasi dan tren sosial) lewat satu
// penggambar umum; grafik batang ekspor-impor digambar berkelompok per tahun.
import { GROWTH, TRENDS, TRADE } from "./data.js";

const fmt = (n, digits = 1) =>
  n.toLocaleString("id-ID", { minimumFractionDigits: digits, maximumFractionDigits: digits });

// ---------- Penggambaran garis umum ----------
function drawLineSeries(canvas, years, values, estimateYears, color) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const padL = 52, padR = 18, padT = 18, padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const lo = Math.min(0, ...values) - 0.5;
  const hi = Math.max(...values) + 0.5;
  const xAt = (i) => padL + (i / (years.length - 1)) * plotW;
  const yAt = (v) => padT + ((hi - v) / (hi - lo)) * plotH;

  ctx.clearRect(0, 0, W, H);
  ctx.font = "12px -apple-system, 'Segoe UI', Roboto, sans-serif";
  ctx.strokeStyle = "#e5e7eb";
  ctx.fillStyle = "#6b7280";
  ctx.lineWidth = 1;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  const step = hi - lo > 14 ? 4 : 2;
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) {
    const y = yAt(v);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.fillText(`${fmt(v, 0)}%`, padL - 8, y);
  }
  ctx.strokeStyle = "#9ca3af";
  ctx.beginPath();
  ctx.moveTo(padL, yAt(0));
  ctx.lineTo(W - padR, yAt(0));
  ctx.stroke();

  const grad = ctx.createLinearGradient(0, padT, 0, H - padB);
  grad.addColorStop(0, color + "2e");
  grad.addColorStop(1, color + "05");
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(xAt(i), yAt(v)) : ctx.lineTo(xAt(i), yAt(v))));
  ctx.lineTo(xAt(values.length - 1), H - padB);
  ctx.lineTo(xAt(0), H - padB);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(xAt(i), yAt(v)) : ctx.lineTo(xAt(i), yAt(v))));
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  const points = values.map((v, i) => ({ x: xAt(i), y: yAt(v), value: v, year: years[i] }));
  points.forEach((p) => {
    const estimated = estimateYears.includes(p.year);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = estimated ? "#ffffff" : color;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });

  ctx.fillStyle = "#6b7280";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  years.forEach((y, i) => ctx.fillText(String(y), xAt(i), H - padB + 8));
  return points;
}

function wireTooltip(canvas, tip, getPoints, getLabel, getUnit, estimateYears) {
  const show = (e) => {
    const points = getPoints();
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const my = (e.clientY - rect.top) * (canvas.height / rect.height);
    let best = null;
    let bestDist = 28;
    for (const p of points) {
      const d = Math.hypot(p.x - mx, p.y - my);
      if (d < bestDist) { bestDist = d; best = p; }
    }
    if (!best) { tip.hidden = true; return; }
    const est = estimateYears.includes(best.year) ? " (estimasi)" : "";
    tip.textContent = `${best.year} · ${getLabel()}: ${fmt(best.value, 2)}${getUnit()}${est}`;
    tip.style.left = `${(best.x / canvas.width) * 100}%`;
    tip.style.top = `${(best.y / canvas.height) * 100}%`;
    tip.hidden = false;
  };
  canvas.addEventListener("mousemove", show);
  canvas.addEventListener("mouseleave", () => { tip.hidden = true; });
}

function wireToggle(buttons, onPick) {
  buttons.forEach(([btn, key]) => {
    btn.addEventListener("click", () => {
      buttons.forEach(([b, k]) => {
        b.classList.toggle("active", k === key);
        b.setAttribute("aria-pressed", String(k === key));
      });
      onPick(key);
    });
  });
}

// ---------- Grafik 1: pertumbuhan PDB / inflasi ----------
export function initGrowthChart() {
  const canvas = document.querySelector("#growthChart");
  const tip = document.querySelector("#chartTip");
  let current = "pdb";
  const draw = () => {
    const meta = current === "pdb"
      ? { values: GROWTH.pdb, label: "Pertumbuhan PDB", unit: "%" }
      : { values: GROWTH.inflasi, label: "Inflasi", unit: "%" };
    canvas.dataset.series = meta.label;
    const points = drawLineSeries(canvas, GROWTH.years, meta.values, GROWTH.estimateYears, "#1d4ed8");
    tip.hidden = true;
    return { points, meta };
  };
  let state = draw();
  wireTooltip(canvas, tip, () => state.points, () => state.meta.label, () => state.meta.unit, GROWTH.estimateYears);
  wireToggle(
    [[document.querySelector("#btnPdb"), "pdb"], [document.querySelector("#btnInflasi"), "inflasi"]],
    (key) => {
      current = key;
      state = draw();
      tip.hidden = true;
    }
  );
  // redraw() menggambar ulang DAN memperbarui titik tooltip (misalnya
  // setelah tampilan staged memperpendek kanvas).
  return { redraw: () => { state = draw(); } };
}

// ---------- Grafik 2: tren pengangguran / kemiskinan ----------
export function initTrendChart() {
  const canvas = document.querySelector("#trendChart");
  const tip = document.querySelector("#trendTip");
  let current = "pengangguran";
  const draw = () => {
    const meta = current === "pengangguran"
      ? { values: TRENDS.pengangguran, label: "Pengangguran", unit: "%" }
      : { values: TRENDS.kemiskinan, label: "Kemiskinan", unit: "%" };
    canvas.dataset.series = meta.label;
    const points = drawLineSeries(canvas, TRENDS.years, meta.values, TRENDS.estimateYears, "#0e7490");
    tip.hidden = true;
    return { points, meta };
  };
  let state = draw();
  wireTooltip(canvas, tip, () => state.points, () => state.meta.label, () => state.meta.unit, TRENDS.estimateYears);
  wireToggle(
    [[document.querySelector("#btnUnemp"), "pengangguran"], [document.querySelector("#btnPoverty"), "kemiskinan"]],
    (key) => {
      current = key;
      state = draw();
      tip.hidden = true;
    }
  );
  return { redraw: () => { state = draw(); } };
}

// ---------- Grafik 3: ekspor vs impor, batang berkelompok ----------
// Satu grup per tahun: batang biru ekspor, batang teal impor.
export function drawTradeChart() {
  const canvas = document.querySelector("#tradeChart");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const padL = 52, padR = 18, padT = 18, padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const max = 320;
  const yAt = (v) => padT + ((max - v) / max) * plotH;
  const n = TRADE.years.length;
  const groupW = plotW / n;
  const barW = Math.min(34, groupW * 0.32);

  ctx.clearRect(0, 0, W, H);
  ctx.font = "12px -apple-system, 'Segoe UI', Roboto, sans-serif";
  ctx.strokeStyle = "#e5e7eb";
  ctx.fillStyle = "#6b7280";
  ctx.lineWidth = 1;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let v = 0; v <= 300; v += 100) {
    const y = yAt(v);
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(W - padR, y);
    ctx.stroke();
    ctx.fillText(`US$${v} M`, padL - 8, y);
  }
  TRADE.years.forEach((year, i) => {
    const cx = padL + groupW * (i + 0.5);
    const pairs = [
      [TRADE.ekspor[i], "#1d4ed8"],
      [TRADE.impor[i], "#0e7490"],
    ];
    pairs.forEach(([value, color], j) => {
      const x = cx + (j === 0 ? -barW - 3 : 3);
      const y = yAt(value);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, barW, H - padB - y);
      ctx.fillStyle = "#111827";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(fmt(value, 0), x + barW / 2, y - 4);
    });
    ctx.fillStyle = "#6b7280";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(String(year), cx, H - padB + 8);
  });
}

// ---------- Batang horizontal (DOM) ----------
export function renderBars(el, rows, valueKey, formatValue) {
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
