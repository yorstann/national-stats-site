// Data statistik nasional Indonesia — semua angka dibulatkan.
// Angka 2025 dan angka provinsi adalah estimasi. Sumber dicantumkan per dataset.
export const META = {
  title: "Statistik Nasional",
  subtitle: "Indonesia dalam Angka",
  updated: "Data per Desember 2025",
  sourcesNote: "Sumber utama: BPS · Bank Indonesia. Angka dibulatkan; estimasi ditandai.",
};

export const SOURCES = {
  bps: "BPS",
  bi: "Bank Indonesia",
};

export const KPI = [
  {
    id: "penduduk",
    label: "Penduduk",
    value: "284,4 jt",
    sub: "jiwa · proyeksi 2025",
    change: "+0,9% / thn",
    changeDir: "up",
    source: "BPS",
    note: "Estimasi 2025",
  },
  {
    id: "pdb",
    label: "PDB 2024",
    value: "Rp22.139 T",
    sub: "harga berlaku",
    change: "+5,03% riil",
    changeDir: "up",
    source: "BPS",
    note: "Tumbuh 5,03% pada 2024",
  },
  {
    id: "inflasi",
    label: "Inflasi 2024",
    value: "1,57%",
    sub: "yoy · IHK Desember",
    change: "dari 2,61% (2023)",
    changeDir: "down",
    source: "BPS",
    note: "Inflasi melandai dari 2023",
  },
  {
    id: "pengangguran",
    label: "Pengangguran",
    value: "4,91%",
    sub: "TPT · Agustus 2024",
    change: "dari 5,32% (2023)",
    changeDir: "down",
    source: "BPS",
    note: "Tingkat pengangguran terbuka",
  },
  {
    id: "kemiskinan",
    label: "Kemiskinan",
    value: "8,47%",
    sub: "Maret 2025",
    change: "dari 9,03% (2024)",
    changeDir: "down",
    source: "BPS",
    note: "Persentase penduduk miskin",
  },
  {
    id: "pdb-kapita",
    label: "PDB per Kapita",
    value: "Rp78,6 jt",
    sub: "2024 · ±US$4.900",
    change: "+4,0% riil",
    changeDir: "up",
    source: "BPS (estimasi)",
    note: "PDB per kapita 2024",
  },
  {
    id: "ekspor",
    label: "Ekspor 2024",
    value: "US$264,7 M",
    sub: "miliar dolar AS",
    change: "+2,2% yoy",
    changeDir: "up",
    source: "BPS",
    note: "Surplus perdagangan berlanjut",
  },
  {
    id: "ipm",
    label: "IPM 2024",
    value: "75,0",
    sub: "Indeks Pembangunan Manusia",
    change: "+0,6 poin",
    changeDir: "up",
    source: "BPS",
    note: "Kategori tinggi",
  },
];

// Pertumbuhan PDB (riil, % yoy) dan inflasi (IHK, % yoy). 2025 = estimasi.
export const GROWTH = {
  source: "BPS; 2025 estimasi",
  years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  pdb: [5.0, 5.1, 5.2, 5.0, -2.07, 3.7, 5.3, 5.1, 5.0, 5.1],
  inflasi: [3.0, 3.6, 3.1, 2.7, 1.7, 1.9, 5.5, 2.6, 1.6, 1.6],
  estimateYears: [2025],
};

// Tren sosial 2016–2025: pengangguran/TPT (%) dan kemiskinan (%). 2025 = estimasi.
export const TRENDS = {
  source: "BPS; 2025 estimasi",
  years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  pengangguran: [5.61, 5.5, 5.34, 5.28, 7.07, 6.49, 5.86, 5.32, 4.91, 4.8],
  kemiskinan: [10.7, 10.64, 9.66, 9.22, 10.19, 9.71, 9.57, 9.36, 9.03, 8.47],
  estimateYears: [2025],
};

// Ekspor dan impor barang, 2020–2025 (miliar dolar AS). 2025 = estimasi.
export const TRADE = {
  source: "BPS · Bank Indonesia; 2025 estimasi",
  years: [2020, 2021, 2022, 2023, 2024, 2025],
  ekspor: [163.2, 231.6, 291.9, 258.8, 264.7, 270.0],
  impor: [141.6, 196.2, 237.4, 221.9, 233.7, 240.0],
  estimateYears: [2025],
};

// Pangsa PDB menurut lapangan usaha, 2024 (%). Sumber: BPS.
export const SECTORS = {
  source: "BPS, 2024",
  unit: "%",
  rows: [
    { name: "Industri Pengolahan", share: 19.0 },
    { name: "Perdagangan", share: 13.0 },
    { name: "Pertanian, Kehutanan & Perikanan", share: 13.0 },
    { name: "Konstruksi", share: 10.0 },
    { name: "Pertambangan & Penggalian", share: 8.1 },
    { name: "Transportasi & Pergudangan", share: 5.9 },
    { name: "Informasi & Komunikasi", share: 5.8 },
    { name: "Jasa Keuangan & Asuransi", share: 4.6 },
    { name: "Akomodasi & Makan Minum", share: 3.0 },
    { name: "Lapangan Usaha Lainnya", share: 18.0 },
  ],
};

// Penduduk menurut pulau, estimasi 2025 (juta jiwa). Sumber: BPS (estimasi).
export const ISLANDS = {
  source: "BPS, estimasi 2025",
  unit: "juta jiwa",
  rows: [
    { name: "Jawa", pop: 156 },
    { name: "Sumatra", pop: 62 },
    { name: "Sulawesi", pop: 21 },
    { name: "Kalimantan", pop: 18 },
    { name: "Bali & Nusa Tenggara", pop: 16 },
    { name: "Papua", pop: 7.0 },
    { name: "Maluku", pop: 3.5 },
  ],
};

// Struktur umur penduduk dan urbanisasi, 2024 (%). Sumber: BPS.
export const AGE = {
  source: "BPS, 2024",
  unit: "% penduduk",
  rows: [
    { name: "0–14 tahun (anak)", pop: 24.0 },
    { name: "15–64 tahun (produktif)", pop: 69.0 },
    { name: "65+ tahun (lansia)", pop: 7.0 },
  ],
  urban: 58.6,
  urbanNote: "58,6% penduduk tinggal di perkotaan (2024)",
};

// Fakta moneter dari Bank Indonesia.
export const MONETARY = {
  source: "Bank Indonesia",
  reserves: "US$155,7 M",
  reservesNote: "Cadangan devisa, Des 2024",
  rupiah: "Rp16.160",
  rupiahNote: "per dolar AS, akhir 2024",
  policyRate: "6,00%",
  policyRateNote: "BI-Rate, Des 2024",
};

export const NATIONAL = {
  pop: 284.4,
  pdb: 22139,
  unemp: 4.91,
  poverty: 8.47,
  ipm: 75.0,
  exports: 264.7,
};

// Catatan umum yang dipakai di beberapa tempat di halaman.
export const ESTIMATE_NOTE =
  "Angka 2025 dan angka provinsi adalah estimasi yang dibulatkan. Sumber: BPS; Bank Indonesia.";
