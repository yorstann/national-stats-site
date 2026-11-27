# Statistik Nasional — Indonesia dalam Angka

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/yorstann/national-stats-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/yorstann/national-stats-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Portal statistik nasional Indonesia: penduduk, PDB, inflasi, pengangguran, kemiskinan,
PDB per kapita, ekspor, dan IPM dalam 8 kartu KPI; sorotan tiga temuan utama; grafik garis
pertumbuhan PDB 2016–2025 dengan sakelar PDB/Inflasi dan tooltip; grafik tren pengangguran
dan kemiskinan; grafik batang ekspor-impor 2020–2025; diagram batang sektor, penduduk per
pulau, dan struktur umur; alat banding dua provinsi; serta tabel seluruh 38 provinsi yang
bisa diurutkan, dicari, dan diklik untuk detail (termasuk PDRB per kapita dan IPM). Semua
data berasal dari BPS dan Bank Indonesia; angka 2025 dan angka provinsi adalah estimasi.

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
