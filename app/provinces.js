// Data 38 provinsi Indonesia — semua angka dibulatkan, estimasi.
// Sumber: BPS (angka provinsi adalah estimasi yang dibulatkan).
// Kolom: penduduk (juta jiwa), PDRB (Rp triliun, harga berlaku 2024),
// PDRB per kapita (Rp juta), pengangguran/TPT (%), kemiskinan (%), IPM 2024.
export const PROVINCES = {
  source: "BPS, estimasi",
  columns: [
    { key: "name", label: "Provinsi" },
    { key: "pop", label: "Penduduk (jt)" },
    { key: "pdrb", label: "PDRB (Rp T)" },
    { key: "percapita", label: "PDRB/kapita (Rp jt)" },
    { key: "unemp", label: "Pengangguran (%)" },
    { key: "poverty", label: "Kemiskinan (%)" },
    { key: "ipm", label: "IPM" },
  ],
  rows: [
    { name: "Jawa Barat", capital: "Bandung", pop: 49.9, pdrb: 2900, percapita: 58, unemp: 6.5, poverty: 7.0, ipm: 74.5 },
    { name: "Jawa Timur", capital: "Surabaya", pop: 41.8, pdrb: 3400, percapita: 81, unemp: 4.8, poverty: 10.3, ipm: 75.5 },
    { name: "Jawa Tengah", capital: "Semarang", pop: 37.9, pdrb: 1800, percapita: 48, unemp: 5.4, poverty: 10.5, ipm: 74.5 },
    { name: "Sumatera Utara", capital: "Medan", pop: 15.6, pdrb: 1000, percapita: 64, unemp: 5.8, poverty: 8.0, ipm: 75.5 },
    { name: "Banten", capital: "Serang", pop: 12.5, pdrb: 900, percapita: 72, unemp: 6.7, poverty: 5.7, ipm: 76.5 },
    { name: "DKI Jakarta", capital: "Jakarta", pop: 10.6, pdrb: 3600, percapita: 340, unemp: 6.2, poverty: 4.1, ipm: 82.5 },
    { name: "Sulawesi Selatan", capital: "Makassar", pop: 9.4, pdrb: 700, percapita: 74, unemp: 4.6, poverty: 8.3, ipm: 75.0 },
    { name: "Lampung", capital: "Bandar Lampung", pop: 9.4, pdrb: 500, percapita: 53, unemp: 4.3, poverty: 11.4, ipm: 73.0 },
    { name: "Sumatera Selatan", capital: "Palembang", pop: 9.0, pdrb: 700, percapita: 78, unemp: 4.7, poverty: 11.0, ipm: 73.5 },
    { name: "Riau", capital: "Pekanbaru", pop: 6.8, pdrb: 900, percapita: 132, unemp: 4.0, poverty: 6.7, ipm: 75.0 },
    { name: "Kalimantan Barat", capital: "Pontianak", pop: 6.0, pdrb: 300, percapita: 50, unemp: 4.5, poverty: 9.0, ipm: 71.5 },
    { name: "Sumatera Barat", capital: "Padang", pop: 5.9, pdrb: 300, percapita: 51, unemp: 5.5, poverty: 5.5, ipm: 75.5 },
    { name: "Nusa Tenggara Timur", capital: "Kupang", pop: 5.7, pdrb: 100, percapita: 18, unemp: 3.5, poverty: 19.0, ipm: 66.5 },
    { name: "Nusa Tenggara Barat", capital: "Mataram", pop: 5.6, pdrb: 200, percapita: 36, unemp: 3.0, poverty: 12.5, ipm: 72.0 },
    { name: "Aceh", capital: "Banda Aceh", pop: 5.6, pdrb: 200, percapita: 36, unemp: 5.6, poverty: 14.5, ipm: 74.0 },
    { name: "Bali", capital: "Denpasar", pop: 4.4, pdrb: 300, percapita: 68, unemp: 3.0, poverty: 5.2, ipm: 78.0 },
    { name: "Kalimantan Selatan", capital: "Banjarmasin", pop: 4.2, pdrb: 300, percapita: 71, unemp: 4.0, poverty: 4.5, ipm: 74.5 },
    { name: "Kalimantan Timur", capital: "Samarinda", pop: 3.9, pdrb: 900, percapita: 231, unemp: 4.9, poverty: 6.0, ipm: 79.5 },
    { name: "Jambi", capital: "Jambi", pop: 3.7, pdrb: 300, percapita: 81, unemp: 4.5, poverty: 7.0, ipm: 74.5 },
    { name: "DI Yogyakarta", capital: "Yogyakarta", pop: 3.7, pdrb: 200, percapita: 54, unemp: 3.5, poverty: 11.0, ipm: 81.0 },
    { name: "Sulawesi Tengah", capital: "Palu", pop: 3.1, pdrb: 300, percapita: 97, unemp: 3.5, poverty: 12.0, ipm: 72.0 },
    { name: "Sulawesi Utara", capital: "Manado", pop: 2.8, pdrb: 200, percapita: 71, unemp: 6.2, poverty: 7.5, ipm: 76.0 },
    { name: "Sulawesi Tenggara", capital: "Kendari", pop: 2.8, pdrb: 200, percapita: 71, unemp: 3.5, poverty: 11.0, ipm: 73.5 },
    { name: "Kalimantan Tengah", capital: "Palangka Raya", pop: 2.8, pdrb: 200, percapita: 71, unemp: 4.0, poverty: 5.5, ipm: 74.0 },
    { name: "Kepulauan Riau", capital: "Tanjung Pinang", pop: 2.2, pdrb: 300, percapita: 136, unemp: 6.0, poverty: 5.5, ipm: 79.0 },
    { name: "Bengkulu", capital: "Bengkulu", pop: 2.1, pdrb: 100, percapita: 48, unemp: 3.5, poverty: 13.0, ipm: 74.0 },
    { name: "Maluku", capital: "Ambon", pop: 1.9, pdrb: 50, percapita: 26, unemp: 6.0, poverty: 16.0, ipm: 72.5 },
    { name: "Sulawesi Barat", capital: "Mamuju", pop: 1.6, pdrb: 50, percapita: 31, unemp: 3.0, poverty: 11.0, ipm: 70.0 },
    { name: "Papua Pegunungan", capital: "Wamena", pop: 1.5, pdrb: 30, percapita: 20, unemp: 3.0, poverty: 33.0, ipm: 60.0 },
    { name: "Bangka Belitung", capital: "Pangkal Pinang", pop: 1.5, pdrb: 100, percapita: 67, unemp: 4.0, poverty: 4.5, ipm: 74.5 },
    { name: "Maluku Utara", capital: "Sofifi", pop: 1.4, pdrb: 50, percapita: 36, unemp: 4.0, poverty: 6.0, ipm: 71.5 },
    { name: "Papua Tengah", capital: "Nabire", pop: 1.3, pdrb: 50, percapita: 38, unemp: 3.5, poverty: 25.0, ipm: 62.0 },
    { name: "Gorontalo", capital: "Gorontalo", pop: 1.2, pdrb: 50, percapita: 42, unemp: 4.0, poverty: 15.0, ipm: 71.0 },
    { name: "Papua", capital: "Jayapura", pop: 1.1, pdrb: 200, percapita: 182, unemp: 4.0, poverty: 22.0, ipm: 61.5 },
    { name: "Kalimantan Utara", capital: "Tanjung Selor", pop: 0.7, pdrb: 100, percapita: 143, unemp: 4.5, poverty: 6.5, ipm: 75.0 },
    { name: "Papua Barat", capital: "Manokwari", pop: 0.6, pdrb: 100, percapita: 167, unemp: 5.0, poverty: 20.0, ipm: 66.0 },
    { name: "Papua Barat Daya", capital: "Sorong", pop: 0.6, pdrb: 50, percapita: 83, unemp: 5.5, poverty: 18.0, ipm: 68.0 },
    { name: "Papua Selatan", capital: "Merauke", pop: 0.5, pdrb: 50, percapita: 100, unemp: 4.0, poverty: 20.0, ipm: 68.0 },
  ],
};

// Ringkasan ekstrem untuk strip "Sekilas daerah" di halaman ringkasan.
export const EXTREMES = {
  popTop: { name: "Jawa Barat", value: "49,9 jt jiwa" },
  pdrbTop: { name: "DKI Jakarta", value: "Rp3.600 T" },
  percapitaTop: { name: "DKI Jakarta", value: "Rp340 jt/kapita" },
  ipmTop: { name: "DKI Jakarta", value: "82,5" },
  povertyTop: { name: "Papua Pegunungan", value: "33,0%" },
};

// Tiga temuan utama untuk kartu Sorotan di halaman ringkasan.
export const HIGHLIGHTS = [
  {
    title: "Kemiskinan terendah sepanjang sejarah",
    text: "8,47% pada Maret 2025, turun dari 9,03% setahun sebelumnya. Tapi jurang antar daerah masih lebar: Papua Pegunungan 33,0% dan NTT 19,0%.",
    source: "BPS, Maret 2025",
  },
  {
    title: "Jawa menampung 55% penduduk",
    text: "156 juta jiwa tinggal di Pulau Jawa — sekitar 7% luas daratan. Jawa Barat saja 49,9 juta jiwa, lebih besar dari kebanyakan negara.",
    source: "BPS, estimasi 2025",
  },
  {
    title: "Ekspor pulih, industri tetap motor",
    text: "Ekspor 2024 mencapai US$264,7 miliar dengan surplus berlanjut. Industri pengolahan menyumbang 19,0% PDB, terbesar di antara lapangan usaha.",
    source: "BPS · Bank Indonesia, 2024",
  },
];
