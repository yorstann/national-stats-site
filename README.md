# Statistik Nasional — Indonesia dalam Angka

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/yorstann/national-stats-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/yorstann/national-stats-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Portal statistik nasional Indonesia: penduduk, PDB, inflasi, pengangguran, kemiskinan,
dan PDB per kapita dalam 6 kartu KPI, grafik garis pertumbuhan PDB 2016–2025 dengan
sakelar PDB/Inflasi dan tooltip, diagram batang sektor dan penduduk per pulau, serta
tabel 16 provinsi yang bisa diurutkan, dicari, dan diklik untuk detail. Semua data
berasal dari BPS dan Bank Indonesia; angka 2025 dan angka provinsi adalah estimasi.

## Menjalankan

```bash
node serve.ts
# buka http://localhost:8080
```

## Build dossier

```bash
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Situs statis (HTML + CSS + vanilla JS, tanpa dependensi dan tanpa muatan jaringan).
