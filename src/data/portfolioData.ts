export interface ProjectItem {
  id: string;
  title: string;
  shortDesc: string;
  challengeAndDetails: string;
  techStack: string[];
  githubUrl: string;
  features: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  techUsed: string[];
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  education: string;
  summary: string;
  email: string;
  githubUrl: string;
  githubHandle: string;
  linkedinUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  /**
   * Nomor WhatsApp format internasional tanpa "+" / spasi, contoh: "6281234567890".
   * Tombol WhatsApp otomatis disembunyikan selama nilai ini kosong.
   */
  whatsappNumber: string;
  cvUrl: string;
}

export const PROFILE: Profile = {
  name: "Marco Siregar",
  shortName: "Marco",
  role: "Full-Stack Web Developer",
  education: "Mahasiswa S1 Informatika",
  summary:
    "Membangun aplikasi web end-to-end yang cepat, rapi, dan skalabel — mulai dari perancangan REST API dan relasi database MySQL dengan Sequelize, hingga antarmuka modern dengan React & TypeScript.",
  email: "chrissrgr2611@gmail.com",
  githubUrl: "https://github.com/marcosiregar26",
  githubHandle: "marcosiregar26",
  linkedinUrl: "https://linkedin.com/in/marcosiregar",
  instagramUrl: "https://www.instagram.com/marccsrg/",
  instagramHandle: "marccsrg",
  whatsappNumber: "",
  cvUrl: "/cv-marco.pdf",
};

export const TECH_STACK = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "Sequelize ORM", category: "Database" },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Backend / Web Developer Intern",
    company: "Divisi TI & Sistem Akademik",
    period: "2025 - Sekarang",
    description:
      "Berfokus pada pengembangan arsitektur layanan backend, integrasi antarmuka aplikasi web, dan optimalisasi manajemen basis data untuk kebutuhan portal akademik.",
    achievements: [
      "Merancang dan mengimplementasikan endpoint CRUD REST API yang aman dan terstruktur menggunakan Express.js dan Node.js.",
      "Mengelola skema dan relasi database (One-to-Many & Many-to-Many) di MySQL menggunakan Sequelize ORM beserta migrasi datanya.",
      "Membangun dan mengintegrasikan fitur-fitur krusial pada Portal Mahasiswa untuk mempercepat proses administrasi akademik.",
    ],
    techUsed: ["Node.js", "Express.js", "MySQL", "Sequelize ORM", "REST API"],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "wa-broadcast-otp",
    title: "Sistem Broadcast WhatsApp & Layanan OTP",
    shortDesc:
      "Platform automasi pengiriman pesan massal dan verifikasi kode OTP secara real-time dengan integrasi manajemen sesi langsung di browser.",
    challengeAndDetails:
      "Tantangan utama pada proyek ini adalah menangani koneksi asinkron antara engine WhatsApp di sisi server dengan antarmuka pengguna. Saya merancang mekanisme streaming sesi sehingga QR Code autentikasi dari backend dapat dirender dan diperbarui secara langsung (real-time) di UI frontend tanpa perlu memuat ulang halaman.",
    features: [
      "Render QR Code autentikasi perangkat secara langsung pada antarmuka Frontend",
      "REST API khusus untuk generate dan validasi kode OTP berbatas waktu (TTL)",
      "Antrean pengiriman pesan broadcast (rate-limiting) untuk mencegah pemblokiran nomor",
      "Manajemen log pengiriman pesan di MySQL dengan Sequelize ORM",
    ],
    techStack: ["React", "TypeScript", "Express.js", "Node.js", "Sequelize ORM", "MySQL"],
    githubUrl: "https://github.com/marcosiregar26",
  },
  {
    id: "room-booking-system",
    title: "Sistem Informasi Booking Ruangan",
    shortDesc:
      "Aplikasi web reservasi ruangan terpusat dengan sistem validasi jadwal otomatis untuk mencegah bentrok waktu peminjaman.",
    challengeAndDetails:
      "Tantangan teknis terbesar adalah mencegah kondisi 'double-booking' saat dua pengguna mengajukan peminjaman di slot waktu yang beririsan. Solusinya adalah merancang query validasi interval waktu di level database menggunakan Sequelize ORM serta menampilkan status ketersediaan ruangan secara reaktif di sisi klien.",
    features: [
      "Deteksi otomatis bentrok jadwal (conflict detection) di sisi REST API",
      "Alur persetujuan (approval workflow) berjenjang antara Peminjam dan Admin",
      "Filter pencarian ruangan berdasarkan kapasitas, fasilitas, dan tanggal",
      "Dashboard riwayat peminjaman dan status reservasi real-time",
    ],
    techStack: ["React", "Tailwind CSS", "Node.js", "Express.js", "MySQL", "Sequelize ORM"],
    githubUrl: "https://github.com/marcosiregar26",
  },
];
