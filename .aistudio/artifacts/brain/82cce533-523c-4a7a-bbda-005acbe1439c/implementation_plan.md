# Calc Quest: Game Edukasi Petualangan Kalkulus

Calc Quest adalah web game edukasi kalkulus interaktif yang menerapkan prinsip *learning by playing* untuk menguasai konsep Limit, Turunan, dan Integral melalui jalur petualangan bertahap (soal mentah angka menuju soal cerita kontekstual) dengan sistem reward istirahat 5 menit dan estetika antarmuka taktil terinspirasi Duolingo.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Ringkasan keputusan produk berdasarkan jawaban klarifikasi Phase 1 yang telah dikonfirmasi:

- **Struktur Materi & Soal**: Terdapat 3 materi utama (Limit, Turunan, Integral). Setiap materi memiliki tepat 3 soal dengan kurva kesulitan bertahap: 2 soal pertama berupa soal mentah angka (aljabar & komputasi dasar-menengah), dan soal ketiga berupa soal cerita kontekstual dengan ilustrasi *hand-drawn* simpel.
- **Sistem Istirahat 5 Menit**: Pemain yang menjawab 3 soal dalam satu materi dengan benar secara berturut-turut berhak mendapatkan jeda istirahat 5 menit. Layar istirahat dilengkapi visual relaksasi/latihan napas, tips peregangan mata/otot, timer hitung mundur, serta tombol lewati sukarela (*Skip to Next Adventure*).
- **Format Input Jawaban**: Pilihan ganda interaktif (*multiple choice*) dengan kartu opsi tebal berbatas bawah timbul (*chunky 3D bottom border* ala Duolingo), status pemilihan taktil, serta dukungan pintasan keyboard (`1`, `2`, `3`, `4`).
- **Mekanisme Nyawa / Kesalahan**: Soal mentah angka (Soal 1 & 2) **tidak memiliki batas nyawa** (pemain bebas mencoba ulang dengan petunjuk tanpa takut gagal). Khusus soal cerita (Soal 3 / Boss Question), pemain dibekali **sistem 3 nyawa** yang memberikan tantangan kontekstual nyata.
- **Bahasa & Pedagogi**: Bahasa Indonesia yang segar dan ramah siswa, menyajikan pembahasan langkah demi langkah terurai (*step-by-step breakdown*) serta tips & trik konsep matematika inti.

---

## 1. Overview & Core Concept

- **Tujuan Permainan**: Membantu siswa dan pembelajar memahami kalkulus bukan sebagai hafalan rumus kaku, melainkan sebagai alat untuk memahami perubahan di dunia nyata.
- **Target Pengguna**: Siswa SMA/SMK, mahasiswa tingkat pertama kalkulus dasar/matematika rekayasa, serta pembelajar mandiri yang ingin mengasah intuisi kalkulus.
- **Nilai Tambah & Diferensiasi**:
  - Transisi mulus dari komputasi murni (*raw numbers*) ke aplikasi dunia nyata (*applied word problems*).
  - Menghilangkan *burnout* belajar melalui siklus reward istirahat 5 menit (terbukti meningkatkan retensi memori secara saintifik).
  - Feedback instan dengan visual ilustrasi *hand-drawn* yang komunikatif, bukan gambar generik yang membingungkan.

---

## 2. User Experience & Visual Design

### A. Konsep Visual "Duolingo-Inspired" (Anti-AI Slop)
Desain mengadopsi estetika ramah dan taktil yang disukai pengguna, dengan disiplin desain ketat:
- **Taktil & Chunky**: Tombol dan kartu opsi menggunakan border bawah tebal 3D (`border-b-4 hover:border-b-2 active:border-b-0 active:translate-y-1 transition-all`), memberikan kepuasan sentuh seperti menekan tombol fisik.
- **Anti-Slop Discipline**:
  - Tanpa gradasi ungu/pink generik; menggunakan palet warna bersih dengan kontras tinggi (Emerald `#10B981` untuk kesuksesan, Indigo/Sky `#0284C7` untuk antarmuka netral, Amber `#F59E0B` untuk streak/reward, Rose `#E11D48` untuk kesalahan).
  - Tanpa kapsul badge bertumpuk (*zero-pill metadata*); teks status disajikan bersih dengan pemisah tipografi natural (`·`).
  - Tanpa bayangan gelap kotor (*muddy drop shadows*); kontras dibangun dengan garis batas presisi (*crisp borders*) dan kedalaman warna solid.
- **Ilustrasi Hand-Drawn Simpel**: Format SVG kustom bergaya goresan tangan (*sketched vector*) untuk ketiga soal cerita:
  1. *Limit*: Roket/kendaraan yang meluncur mendekati titik pengamatan dengan garis delta waktu mendekati nol.
  2. *Turunan*: Grafik kurva laju perubahan kecepatan terhadap waktu dengan garis singgung (*tangent line*) dan penunjuk kemiringan percepatan.
  3. *Integral*: Grafik area di bawah kurva kecepatan dinamis yang diarsir (*shaded region*) membentuk total akumulasi jarak.

### B. Alur Pengguna (User Flow)
1. **Layar Peta Petualangan (Quest Map)**:
   - Menampilkan 3 stasiun materi: `01. Limit Fungsi`, `02. Turunan (Derivatif)`, `03. Integral & Akumulasi`.
   - Node progres interaktif dengan indikator bintang, status terkunci/terbuka, dan penanda streak.
   - Header ringkas menampilkan skor akumulasi, streak berturut-turut, dan toggle audio SFX.
2. **Layar Latihan Soal (Question Deck)**:
   - Baris atas: Tombol kembali, progress bar per materi (3 segmen), dan indikator 3 nyawa (khusus Soal 3).
   - Area Soal: Pernyataan soal dengan format matematis bersih (`f(x)`, limit, notasi $\int$, $dy/dx$). Pada Soal 3, muncul panel ilustrasi *hand-drawn* yang interaktif.
   - 4 Kartu Opsi Pilihan Ganda: Label A/B/C/D yang jelas, penekanan tombol keyboard 1-4.
   - Bottom Action Bar: Tombol "Periksa Jawaban" tebal yang menjadi "Lanjut" setelah evaluasi.
   - Banner Feedback: Banner hijau (jika benar) dengan sound effect positif, atau banner merah/oranye (jika salah) dengan pembahasan langkah terurai dan tips konsep.
3. **Layar Istirahat 5 Menit (Mindful Break Zone)**:
   - Terpicu otomatis jika pemain berhasil menyelesaikan 3 soal per materi tanpa gagal beruntun.
   - Animasi lingkaran pernapasan terpandu (*guided breathing circle* 4-4-4-4).
   - Timer hitung mundur 05:00 yang presisi dengan tips relaksasi fisik (istirahat mata 20-20-20, peregangan leher, hidrasi).
   - Tombol sukarela: `"Lewati Istirahat & Lanjut Petualangan"`.

---

## 3. Key Product Decisions & Kurikulum Soal

Setiap soal dirancang dengan kunci jawaban pasti (*deterministic*), pembahasannya siap tampil, dan tidak ada ambiguitas nilai:

### Modul 1: Limit Fungsi
- **Soal 1 (Mentah Angka Dasar)**:
  - Soal: Hitung nilai $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$.
  - Pembahasan: Faktorkan pembilang $(x-3)(x+3)/(x-3) = x+3$. Substitusi $x=3 \implies 3+3=6$.
  - Kunci: **6**.
- **Soal 2 (Mentah Angka Menengah)**:
  - Soal: Tentukan nilai $\lim_{x \to 0} \frac{\sqrt{4 + x} - 2}{x}$.
  - Pembahasan: Kalikan dengan akar sekawan $(\sqrt{4+x}+2)$. Diperoleh $x / [x(\sqrt{4+x}+2)] = 1/(\sqrt{4}+2) = 1/4$.
  - Kunci: **1/4 (atau 0,25)**.
- **Soal 3 (Soal Cerita - Menghitung Kecepatan Sesaat)**:
  - Soal: Sebuah wahana roket mini diluncurkan dengan posisi ketinggian terhadap waktu dirumuskan $s(t) = 5t^2 + 10t$ (meter). Hitung kecepatan sesaat roket tepat pada detik $t = 2$ menggunakan konsep limit $\lim_{\Delta t \to 0} \frac{s(2+\Delta t) - s(2)}{\Delta t}$.
  - Visual: Ilustrasi hand-drawn roket mini dengan grafik $s(t)$ dan garis singgung di $t=2$.
  - Pembahasan: $s(2) = 5(4)+20 = 40$. $s(2+\Delta t) = 5(2+\Delta t)^2 + 10(2+\Delta t) = 20 + 20\Delta t + 5(\Delta t)^2 + 20 + 10\Delta t = 40 + 30\Delta t + 5(\Delta t)^2$. Maka $(s(2+\Delta t)-s(2))/\Delta t = 30 + 5\Delta t$. Saat $\Delta t \to 0$, kecepatan sesaat $= 30\text{ m/s}$.
  - Kunci: **30 m/s**.

### Modul 2: Turunan (Derivatif)
- **Soal 1 (Mentah Angka Dasar)**:
  - Soal: Jika $f(x) = 4x^3 - 5x^2 + 7x - 9$, tentukan turunan pertama $f'(x)$.
  - Pembahasan: Aturan pangkat $d(x^n)/dx = n \cdot x^{n-1}$. $f'(x) = 12x^2 - 10x + 7$.
  - Kunci: **$12x^2 - 10x + 7$**.
- **Soal 2 (Mentah Angka Menengah)**:
  - Soal: Tentukan gradien garis singgung kurva $y = 2x^3 - 3x + 1$ pada titik berabsis $x = 2$.
  - Pembahasan: $y' = 6x^2 - 3$. Substitusikan $x = 2 \implies m = 6(2^2) - 3 = 24 - 3 = 21$.
  - Kunci: **21**.
- **Soal 3 (Soal Cerita - Perubahan Kecepatan (y) terhadap Waktu (x))**:
  - Soal: Kecepatan sebuah mobil balap listrik tercatat memenuhi fungsi $v(t) = 3t^2 - 4t + 10$ (dalam m/s, $t$ dalam detik). Tentukan laju perubahan kecepatan terhadap waktu (percepatan sesaat $a(t) = \frac{dv}{dt}$) saat $t = 4$ detik.
  - Visual: Ilustrasi hand-drawn mobil balap di lintasan dengan vektor akselerasi dan grafik $v$ vs $t$.
  - Pembahasan: $a(t) = v'(t) = \frac{d}{dt}(3t^2 - 4t + 10) = 6t - 4$. Pada $t = 4$, $a(4) = 6(4) - 4 = 24 - 4 = 20\text{ m/s}^2$.
  - Kunci: **20 m/s²**.

### Modul 3: Integral & Akumulasi
- **Soal 1 (Mentah Angka Dasar)**:
  - Soal: Hitung hasil integral tak tentu $\int (6x^2 - 4x + 5) \, dx$.
  - Pembahasan: $\int x^n dx = \frac{x^{n+1}}{n+1} + C$. Diperoleh $\frac{6x^3}{3} - \frac{4x^2}{2} + 5x + C = 2x^3 - 2x^2 + 5x + C$.
  - Kunci: **$2x^3 - 2x^2 + 5x + C$**.
- **Soal 2 (Mentah Angka Menengah - Tentu)**:
  - Soal: Hitung nilai integral tentu $\int_{1}^{3} (3x^2 + 2x) \, dx$.
  - Pembahasan: Antiturunan $F(x) = [x^3 + x^2]_{1}^{3}$. $F(3) = (27 + 9) = 36$. $F(1) = (1 + 1) = 2$. Hasil $= 36 - 2 = 34$.
  - Kunci: **34**.
- **Soal 3 (Soal Cerita - Akumulasi Kecepatan untuk Jarak Tempuh)**:
  - Soal: Sebuah drone ekspedisi bergerak dengan kecepatan dinamis $v(t) = 6t + 2$ (m/s) selama selang waktu dari $t = 0$ hingga $t = 5$ detik. Hitung total jarak tempuh yang diakumulasikan drone tersebut menggunakan integral $s = \int_{0}^{5} v(t) \, dt$.
  - Visual: Ilustrasi hand-drawn drone terbang di atas lanskap dengan kurva kecepatan dan arsir area jarak tempuh.
  - Pembahasan: $s = \int_{0}^{5} (6t + 2) \, dt = [3t^2 + 2t]_{0}^{5} = (3(25) + 2(5)) - 0 = 75 + 10 = 85\text{ meter}$.
  - Kunci: **85 meter**.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                               Calc Quest App                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ State Store: Active Module, Question Index, Lives (3/3), Streak  │  │
│  │ Sound FX Generator (Web Audio API Synthesizer), LocalStorage Sync│  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                   │
│        ┌───────────────────────────┼───────────────────────────┐       │
│        ▼                           ▼                           ▼       │
│ ┌───────────────┐         ┌─────────────────┐         ┌──────────────┐ │
│ │  Quest Map    │         │  Question Deck  │         │  Break View  │ │
│ │  - 3 Modules  │         │  - Numeric (Q1) │         │  - 5-Min CD  │ │
│ │  - Mastery    │         │  - Numeric (Q2) │         │  - Breathing │ │
│ │  - Streak HUD │         │  - Story Boss Q │         │  - Skip CTA  │ │
│ └───────────────┘         │    + Hand-drawn │         └──────────────┘ │
│                           │    + 3 Lives    │                          │
│                           └─────────────────┘                          │
│                                    │                                   │
│                                    ▼                                   │
│                           ┌─────────────────┐                          │
│                           │ Feedback Drawer │                          │
│                           │ - Correct Chime │                          │
│                           │ - Step Solution │                          │
│                           │ - Concept Tips  │                          │
│                           └─────────────────┘                          │
└────────────────────────────────────────────────────────────────────────┘
```

### Komponen & Modul yang Dibangun:
1. `src/types/game.ts`: Definisi tipe data soal, status opsi, topik kalkulus, dan state mesin.
2. `src/data/calculusData.ts`: Database soal terverifikasi (Limit, Turunan, Integral) dengan pembahasan bertahap dan opsi jawaban yang seimbang.
3. `src/utils/audio.ts`: Generator suara audio sintetik native (*Web Audio API*) tanpa file eksternal (chime benar, thud salah, klik tombol, reward fanfare).
4. `src/components/HandDrawnIllustration.tsx`: Komponen visual SVG ilustrasi hand-drawn interaktif untuk soal cerita (kecepatan sesaat roket, laju perubahan mobil balap, akumulasi jarak drone).
5. `src/components/QuestMap.tsx`: Jalur peta petualangan dengan node modul, status penyelesaian, dan indikator streak.
6. `src/components/QuestionCard.tsx`: Tampilan soal, rumus matematika jelas, opsi Duolingo-style taktil (`border-b-4`), indikator nyawa 3 hati untuk soal cerita, dan drawer pembahasan bertahap.
7. `src/components/BreakModal.tsx`: Layar istirahat 5 menit dengan timer hidup, latihan napas terpadu, tips kesehatan visual, dan tombol lewati.
8. `src/components/GameHUD.tsx`: Header game responsif menampilkan logo Calc Quest, XP/Skor, Streak, dan kontrol volume audio.
9. `src/App.tsx`: State orchestrator menghubungkan penyimpanan lokal, navigasi peta, sesi soal, transisi istirahat, dan ringkasan penyelesaian.

---

## 5. Verification Plan

1. **Pengujian Fungsionalitas Alur**:
   - Menjawab Soal 1 dan 2 (tanpa batas nyawa) memastikan opsi bisa dipilih, divalidasi, dan jika salah diberikan kesempatan melihat pembahasan langkah.
   - Menjawab Soal 3 (soal cerita): memastikan sistem 3 nyawa berkurang saat salah, dan jika habis dapat mengulang soal cerita tersebut.
   - Menjawab 3 soal berturut-turut dengan benar memicu layar istirahat 5 menit.
   - Tombol "Lewati Istirahat" berfungsi langsung membawa pemain ke materi berikutnya atau peta level.
2. **Pengujian Responsivitas Mobile**:
   - Memastikan tombol pilihan ganda memiliki touch target $\ge 44\text{px}$.
   - Memastikan bar aksi bawah menempel (*sticky*) dengan rapi tanpa menutupi konten soal.
3. **Kompilasi & Linting**:
   - Menjalankan `compile_applet` dan `lint_applet` untuk menjamin zero type error dan integrasi bersih.
