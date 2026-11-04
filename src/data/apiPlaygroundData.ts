export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiEndpointDemo {
  id: string;
  method: HttpMethod;
  path: string;
  title: string;
  project: string;
  requestHeaders: Record<string, string>;
  requestBody?: unknown;
  status: number;
  statusText: string;
  responseHeaders: Record<string, string>;
  response: unknown;
}

/** Base URL lokal — menegaskan bahwa ini lingkungan simulasi, bukan server produksi. */
export const API_BASE_URL = "http://localhost:3000";

const JSON_HEADERS = { "Content-Type": "application/json" };
const EXPRESS_RESPONSE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "X-Powered-By": "Express",
};

/**
 * Kontrak API contoh yang meniru endpoint dari proyek di PROJECTS.
 * Seluruh respons dijalankan di sisi klien (mock), tidak ada request jaringan sungguhan.
 */
export const API_ENDPOINTS: ApiEndpointDemo[] = [
  {
    id: "otp-generate",
    method: "POST",
    path: "/api/otp/generate",
    title: "Generate kode OTP",
    project: "Broadcast WhatsApp & OTP",
    requestHeaders: JSON_HEADERS,
    requestBody: { phone: "6281234567890" },
    status: 200,
    statusText: "OK",
    responseHeaders: { ...EXPRESS_RESPONSE_HEADERS, "X-RateLimit-Remaining": "4" },
    response: {
      success: true,
      message: "Kode OTP berhasil dikirim via WhatsApp",
      data: {
        requestId: "otp_7f3a9c",
        phone: "62812****7890",
        channel: "whatsapp",
        expiresIn: 300,
      },
    },
  },
  {
    id: "otp-verify",
    method: "POST",
    path: "/api/otp/verify",
    title: "Validasi kode OTP (TTL)",
    project: "Broadcast WhatsApp & OTP",
    requestHeaders: JSON_HEADERS,
    requestBody: { requestId: "otp_7f3a9c", code: "482913" },
    status: 200,
    statusText: "OK",
    responseHeaders: EXPRESS_RESPONSE_HEADERS,
    response: {
      success: true,
      message: "Kode OTP valid",
      data: { verified: true, attemptsLeft: 2, verifiedAt: "2025-03-14T09:21:07.000Z" },
    },
  },
  {
    id: "rooms-list",
    method: "GET",
    path: "/api/rooms?capacity=30&date=2025-03-14",
    title: "Cari ruangan tersedia",
    project: "Booking Ruangan",
    requestHeaders: { Accept: "application/json" },
    status: 200,
    statusText: "OK",
    responseHeaders: EXPRESS_RESPONSE_HEADERS,
    response: {
      success: true,
      count: 2,
      data: [
        { id: 12, name: "Lab Komputer 2", capacity: 40, facilities: ["Proyektor", "AC"], available: true },
        { id: 7, name: "Ruang Seminar B", capacity: 60, facilities: ["Sound System", "AC"], available: true },
      ],
    },
  },
  {
    id: "booking-conflict",
    method: "POST",
    path: "/api/bookings",
    title: "Deteksi bentrok jadwal",
    project: "Booking Ruangan",
    requestHeaders: { ...JSON_HEADERS, Authorization: "Bearer <token>" },
    requestBody: { roomId: 12, date: "2025-03-14", startTime: "09:00", endTime: "11:00" },
    status: 409,
    statusText: "Conflict",
    responseHeaders: EXPRESS_RESPONSE_HEADERS,
    response: {
      success: false,
      error: "BOOKING_CONFLICT",
      message: "Ruangan sudah dipesan pada rentang waktu yang beririsan",
      conflictWith: { bookingId: 88, startTime: "10:00", endTime: "12:00", status: "approved" },
    },
  },
];

