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
];

// Pertumbuhan PDB (riil, % yoy) dan inflasi (IHK, % yoy). 2025 = estimasi.
export const GROWTH = {
  source: "BPS; 2025 estimasi",
  years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  pdb: [5.0, 5.1, 5.2, 5.0, -2.07, 3.7, 5.3, 5.1, 5.0, 5.1],
  inflasi: [3.0, 3.6, 3.1, 2.7, 1.7, 1.9, 5.5, 2.6, 1.6, 1.6],
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

// 16 provinsi — angka estimasi, dibulatkan. Sumber: BPS.
export const PROVINCES = {
  source: "BPS, estimasi",
  columns: [
    { key: "name", label: "Provinsi" },
    { key: "pop", label: "Penduduk (jt)" },
    { key: "pdrb", label: "PDRB (Rp T)" },
    { key: "unemp", label: "Pengangguran (%)" },
    { key: "poverty", label: "Kemiskinan (%)" },
  ],
  rows: [
    { name: "Jawa Barat", capital: "Bandung", pop: 49.9, pdrb: 2900, unemp: 6.5, poverty: 7.0 },
    { name: "Jawa Timur", capital: "Surabaya", pop: 41.8, pdrb: 3400, unemp: 4.8, poverty: 10.3 },
    { name: "Jawa Tengah", capital: "Semarang", pop: 37.9, pdrb: 1800, unemp: 5.4, poverty: 10.5 },
    { name: "Sumatera Utara", capital: "Medan", pop: 15.6, pdrb: 1000, unemp: 5.8, poverty: 8.0 },
    { name: "Banten", capital: "Serang", pop: 12.5, pdrb: 900, unemp: 6.7, poverty: 5.7 },
    { name: "DKI Jakarta", capital: "Jakarta", pop: 10.6, pdrb: 3600, unemp: 6.2, poverty: 4.1 },
    { name: "Sulawesi Selatan", capital: "Makassar", pop: 9.4, pdrb: 700, unemp: 4.6, poverty: 8.3 },
    { name: "Lampung", capital: "Bandar Lampung", pop: 9.4, pdrb: 500, unemp: 4.3, poverty: 11.4 },
    { name: "Sumatera Selatan", capital: "Palembang", pop: 9.0, pdrb: 700, unemp: 4.7, poverty: 11.0 },
    { name: "Riau", capital: "Pekanbaru", pop: 6.8, pdrb: 900, unemp: 4.0, poverty: 6.7 },
    { name: "Kalimantan Barat", capital: "Pontianak", pop: 6.0, pdrb: 300, unemp: 4.5, poverty: 9.0 },
    { name: "Nusa Tenggara Timur", capital: "Kupang", pop: 5.7, pdrb: 100, unemp: 3.5, poverty: 19.0 },
    { name: "Aceh", capital: "Banda Aceh", pop: 5.6, pdrb: 200, unemp: 5.6, poverty: 14.5 },
    { name: "Bali", capital: "Denpasar", pop: 4.4, pdrb: 300, unemp: 3.0, poverty: 5.2 },
    { name: "Kalimantan Timur", capital: "Samarinda", pop: 3.9, pdrb: 900, unemp: 4.9, poverty: 6.0 },
    { name: "Sulawesi Utara", capital: "Manado", pop: 2.8, pdrb: 200, unemp: 6.2, poverty: 7.5 },
  ],
};

export const NATIONAL = {
  pop: 284.4,
  pdb: 22139,
  unemp: 4.91,
  poverty: 8.47,
};

// Catatan umum yang dipakai di beberapa tempat di halaman.
export const ESTIMATE_NOTE =
  "Angka 2025 dan angka provinsi adalah estimasi yang dibulatkan. Sumber: BPS; Bank Indonesia.";
