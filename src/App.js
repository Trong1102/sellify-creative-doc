import { useState } from "react";

const STEPS = [
  {
    id: 1,
    emoji: "📥",
    title: "Tiếp nhận đầu vào",
    subtitle: "Bất kỳ dạng dữ liệu nào bạn có sẵn",
    color: "#3b82f6",
    business: [
      { icon: "🌐", label: "Link sản phẩm", desc: "Shopee, Lazada, TikTok Shop, website riêng..." },
      { icon: "🖼️", label: "Ảnh sản phẩm", desc: "Ảnh thô, ảnh studio, ảnh chụp điện thoại đều dùng được" },
      { icon: "🎬", label: "Video sản phẩm", desc: "Clip review, unboxing, video quảng cáo cũ..." },
    ],
    tech: [
      { name: "REST API Gateway", desc: "Điểm tiếp nhận duy nhất cho mọi loại đầu vào (link, file upload)" },
      { name: "FastAPI (Python)", desc: "Backend nhẹ, xử lý request nhanh, dễ scale" },
      { name: "Celery + Redis", desc: "Task queue — đưa mọi job vào hàng chờ, xử lý bất đồng bộ" },
      { name: "Multipart Upload", desc: "Cho phép upload file lớn (video) ổn định, có thể resume nếu mất kết nối" },
    ],
    note: "💡 Người dùng chỉ cần dán link hoặc kéo thả file — mọi thứ còn lại tự động.",
  },
  {
    id: 2,
    emoji: "🕷️",
    title: "Thu thập & trích xuất",
    subtitle: "Hệ thống tự quét, không cần thao tác thủ công",
    color: "#f97316",
    business: [
      { icon: "📸", label: "Tự lấy toàn bộ ảnh", desc: "Quét trang sản phẩm, lấy hết ảnh trong trang" },
      { icon: "🎥", label: "Tự tải video", desc: "Bao gồm video thumbnail, video review nhúng trong trang" },
      { icon: "📝", label: "Đọc thông tin sản phẩm", desc: "Tên, giá, mô tả, tính năng, đánh giá khách hàng" },
      { icon: "🔍", label: "Loại bỏ trùng lặp", desc: "Tự động phát hiện ảnh/video giống nhau, không lưu thừa" },
    ],
    tech: [
      { name: "Playwright / Puppeteer", desc: "Headless browser — render đầy đủ trang JS, bypass lazy-load" },
      { name: "Scrapy", desc: "Crawl nhanh với nhiều link cùng lúc, có rate limiting tránh bị block" },
      { name: "BrightData Proxy", desc: "Rotating proxy — tránh bị chặn IP khi scrape Shopee, Lazada" },
      { name: "pHash (Perceptual Hash)", desc: "So sánh ảnh bằng hash thị giác — phát hiện ảnh trùng dù khác kích thước" },
      { name: "yt-dlp / FFmpeg", desc: "Tải video từ nhiều nguồn nhúng khác nhau" },
    ],
    note: "⏱️ Toàn bộ bước này chạy ngầm, thường mất 1–3 phút tùy trang sản phẩm.",
  },
  {
    id: 3,
    emoji: "🗄️",
    title: "Lưu trữ có tổ chức",
    subtitle: "Kho tài nguyên thông minh, tìm kiếm trong vài giây",
    color: "#22c55e",
    business: [
      { icon: "📁", label: "Thư mục riêng mỗi sản phẩm", desc: "Ảnh gốc, video gốc, biến thể AI — tất cả gắn đúng sản phẩm" },
      { icon: "🏷️", label: "Gắn nhãn tự động", desc: "Ảnh nền trắng, ảnh lifestyle, video ngắn, video dài..." },
      { icon: "🔎", label: "Tìm kiếm thông minh", desc: "Gõ 'ảnh lifestyle son môi đỏ' → ra đúng ảnh cần dùng" },
      { icon: "🌐", label: "Tải nhanh toàn cầu", desc: "CDN phân phối — tải ảnh/video nhanh bất kể ở đâu" },
    ],
    tech: [
      { name: "AWS S3", desc: "Object storage — lưu raw assets & AI variants, có versioning" },
      { name: "PostgreSQL", desc: "Metadata DB — index asset, trạng thái xử lý, tag, score" },
      { name: "Qdrant (Vector DB)", desc: "Lưu embedding ảnh/text — cho phép tìm kiếm semantic (ý nghĩa, không chỉ từ khóa)" },
      { name: "CloudFront CDN", desc: "Phân phối assets tốc độ cao, giảm latency khi export sang ad platforms" },
      { name: "CLIP Embeddings", desc: "Chuyển ảnh thành vector số — nền tảng cho tìm kiếm thông minh" },
    ],
    note: "📦 Cấu trúc: /products/{id}/raw/ — /variants/ — /metadata/ — rõ ràng, dễ audit.",
  },
  {
    id: 4,
    emoji: "✨",
    title: "AI tạo biến thể creative",
    subtitle: "Từ 1 ảnh gốc → 20–30 creative sẵn sàng chạy quảng cáo",
    color: "#6c63ff",
    business: [
      { icon: "🎨", label: "Biến thể ảnh", desc: "Đổi nền, thêm chữ, thay phong cách, crop nhiều tỉ lệ" },
      { icon: "🎬", label: "Biến thể video", desc: "Cắt clip 15s/30s, thêm phụ đề, chuyển sang dọc cho Reels" },
      { icon: "✍️", label: "Nội dung quảng cáo", desc: "AI viết tiêu đề, mô tả, CTA phù hợp từng góc tiếp cận" },
      { icon: "💡", label: "Nhiều góc creative", desc: "Góc nỗi đau, góc lợi ích, góc review, góc viral, góc FOMO..." },
    ],
    tech: [
      { name: "GPT-4o Vision", desc: "Phân tích ảnh sản phẩm → extract tính năng → sinh copy quảng cáo đa góc" },
      { name: "Stable Diffusion XL + ControlNet", desc: "Tạo biến thể ảnh: đổi nền, style transfer, giữ nguyên sản phẩm" },
      { name: "Remove.bg API / SAM2", desc: "Tách nền sản phẩm chính xác — nền tảng cho mọi biến thể ảnh" },
      { name: "RunwayML Gen-3 / Kling AI", desc: "Tạo video AI mới từ ảnh sản phẩm tĩnh" },
      { name: "Whisper (OpenAI)", desc: "Tự động phụ đề video, hỗ trợ đa ngôn ngữ VI/EN/TH" },
      { name: "FFmpeg", desc: "Xử lý video: cắt, ghép, chuyển tỉ lệ, nén đúng spec" },
      { name: "CLIP Aesthetic Scorer", desc: "Chấm điểm chất lượng visual — lọc ra creative đẹp nhất" },
    ],
    note: "🚀 Pipeline chạy song song — Image AI, Video AI, Copy AI xử lý cùng lúc để tiết kiệm thời gian.",
  },
  {
    id: 5,
    emoji: "📤",
    title: "Export & chạy quảng cáo",
    subtitle: "Một click — đúng nền tảng, đúng kích thước, đúng spec",
    color: "#ec4899",
    business: [
      { icon: "📘", label: "Facebook & Instagram", desc: "Ảnh feed, Story, Reels — đúng kích thước, dung lượng" },
      { icon: "🎵", label: "TikTok Ads", desc: "Video 9:16, caption đúng chuẩn, không bị từ chối" },
      { icon: "🔍", label: "Google Ads", desc: "Banner đủ kích thước, responsive display ads" },
      { icon: "📚", label: "Creative Library", desc: "Thư viện nội bộ — tìm, duyệt, tái sử dụng mọi lúc" },
    ],
    tech: [
      { name: "Meta Marketing API", desc: "Push creative thẳng lên Ad Account, tạo ad set tự động" },
      { name: "TikTok Ads API", desc: "Upload video + caption, tạo campaign theo template" },
      { name: "Google Ads API", desc: "Upload assets cho Performance Max, Responsive Display" },
      { name: "Webhook System", desc: "Thông báo real-time khi creative mới sẵn sàng" },
      { name: "REST / GraphQL API", desc: "Cho phép media buyer / tool khác gọi creative programmatically" },
    ],
    note: "✅ Không còn resize thủ công hay bị từ chối vì sai spec — hệ thống tự điều chỉnh.",
  },
];

const FLOW = [
  { emoji: "🔗", label: "Input", color: "#3b82f6" },
  { emoji: "🕷️", label: "Thu thập", color: "#f97316" },
  { emoji: "🗄️", label: "Lưu trữ", color: "#22c55e" },
  { emoji: "✨", label: "AI tạo", color: "#6c63ff" },
  { emoji: "📤", label: "Export", color: "#ec4899" },
];

export default function App() {
  const [openStep, setOpenStep] = useState(null);
  const [showTech, setShowTech] = useState({});
  const [tab, setTab] = useState("app"); // "app" | "doc"

  const toggleTech = (id, e) => {
    e.stopPropagation();
    setShowTech(p => ({ ...p, [id]: !p[id] }));
  };

  const docMd = `# SellifyX – Creative Collection & Auto-Generation System
## Tài liệu Kiến trúc Hệ thống | Architecture Design Document

> **Mục tiêu:** Tự động hóa toàn bộ quy trình thu thập, lưu trữ và tạo creative quảng cáo cho sản phẩm — từ đầu vào thô đến creative sẵn sàng chạy ads.

---

## 1. Bối cảnh & Vấn đề

Hiện tại, để có đủ creative cho một chiến dịch quảng cáo, team cần:
- Thu thập ảnh/video thủ công từ nhiều nguồn
- Nhờ designer tạo từng biến thể (nền khác nhau, tỉ lệ khác nhau)
- Viết copy thủ công cho từng góc tiếp cận
- Resize/chuyển đổi format cho từng nền tảng

**Hệ thống này giải quyết toàn bộ chuỗi đó tự động.**

---

## 2. Làm rõ Yêu cầu – Input & Output

### Đầu vào (Input)

| Loại | Dạng dữ liệu | Ví dụ cụ thể |
|---|---|---|
| Product Link | URL chuỗi | https://shopee.vn/product/... |
| Ảnh có sẵn | File upload | JPG, PNG, WebP, HEIC – tối đa 20MB/file |
| Video có sẵn | File upload | MP4, MOV, AVI – tối đa 500MB/file |
| Kết hợp | Link + File | Vừa nhập link vừa upload thêm ảnh/video bổ sung |

> **Điều kiện tối thiểu:** Chỉ cần 1 trong 3 loại đầu vào là đủ để hệ thống chạy.

### Đầu ra (Output)

| Loại output | Mô tả | Số lượng ước tính |
|---|---|---|
| Ảnh biến thể | Nền khác nhau, tỉ lệ khác nhau, style khác nhau | 15–30 ảnh/sản phẩm |
| Video biến thể | Cắt ngắn, phụ đề, đổi tỉ lệ, AI-generated clip | 5–10 video/sản phẩm |
| Copy quảng cáo | Tiêu đề, mô tả, CTA theo từng góc tiếp cận | 10–20 bộ copy/sản phẩm |
| Creative đóng gói | Ảnh/video đã gắn text overlay, đúng spec platform | 10–20 file/sản phẩm |
| Metadata | Thông tin sản phẩm, tag, score chất lượng | 1 file JSON/sản phẩm |

### Ràng buộc & Kỳ vọng chất lượng

| Tiêu chí | Yêu cầu |
|---|---|
| Thời gian xử lý | Dưới 5 phút cho 1 sản phẩm thông thường |
| Chất lượng ảnh output | Tối thiểu 1080px cạnh dài, không vỡ nét |
| Spec platform | Tự động đúng spec Meta / TikTok / Google — không cần chỉnh tay |
| Ngôn ngữ copy | Tiếng Việt mặc định, có thể mở rộng EN/TH/ID |
| Định dạng export | PNG, JPG, MP4 – tương thích tải thẳng lên ad platform |

---

## 3. Kiến trúc Tổng quan (5 Layer)

\`\`\`
[INPUT] → [CRAWL & EXTRACT] → [STORAGE] → [AI GENERATION] → [OUTPUT / AD READY]
\`\`\`

---

## 3. Chi tiết từng Layer

### Layer 1 – Input
**Mục tiêu:** Tiếp nhận mọi dạng đầu vào từ người dùng.

| Đầu vào | Mô tả |
|---|---|
| Product Link | URL từ Shopee, Lazada, TikTok Shop, website riêng |
| Ảnh upload | JPG, PNG, WebP, HEIC |
| Video upload | MP4, MOV, AVI |

**Tech stack:**
- **FastAPI** – REST API backend tiếp nhận request
- **Celery + Redis** – Task queue xử lý bất đồng bộ
- **Multipart Upload** – Hỗ trợ file lớn, có thể resume

---

### Layer 2 – Crawl & Extract
**Mục tiêu:** Tự động thu thập toàn bộ media từ product page.

**Luồng xử lý:**
1. Nhận URL → đưa vào crawl queue
2. Playwright render trang đầy đủ (bao gồm JS lazy-load)
3. Extract tất cả img/video URL từ DOM
4. Scrape metadata: tên, giá, mô tả, specs, reviews
5. pHash deduplication trước khi lưu

**Tech stack:**
- **Playwright** – Headless browser, xử lý trang JS động
- **Scrapy** – Crawl song song nhiều URL
- **BrightData Proxy** – Rotating proxy, tránh bị block
- **pHash** – Perceptual hashing để dedup ảnh
- **yt-dlp / FFmpeg** – Tải và xử lý video

---

### Layer 3 – Storage
**Mục tiêu:** Lưu trữ có cấu trúc, tìm kiếm nhanh, phân phối toàn cầu.

**Cấu trúc thư mục S3:**
\`\`\`
s3://sellify-creatives/
└── products/
    └── {product_id}/
        ├── raw/
        │   ├── images/
        │   └── videos/
        ├── variants/
        │   ├── images/
        │   └── videos/
        └── metadata/
            ├── product.json
            └── assets.json
\`\`\`

**Tech stack:**
- **AWS S3** – Object storage cho raw assets & AI variants
- **PostgreSQL** – Metadata DB: index, tags, trạng thái, score
- **Qdrant (Vector DB)** – Semantic search bằng CLIP embedding
- **CloudFront CDN** – Phân phối tốc độ cao tới ad platforms

---

### Layer 4 – AI Generation (3 Pipeline song song)

#### 4a. Image AI Pipeline
| Bước | Công cụ | Output |
|---|---|---|
| Background Removal | Remove.bg / SAM2 | Transparent PNG |
| Background Swap | SD XL Inpainting | 8–10 scene variants |
| Style Transfer | ControlNet + SDXL | Lifestyle / Studio / Minimal |
| Format Variants | Sharp / Pillow | 1:1, 9:16, 4:5, 16:9 |
| Text Overlay | Canvas + GPT-4o copy | Ad-ready banners |

#### 4b. Video AI Pipeline
| Bước | Công cụ | Output |
|---|---|---|
| Scene Detection | PySceneDetect | Individual clips |
| Auto-cut | FFmpeg + ML | 15s / 30s / 60s cuts |
| Caption Generation | Whisper | Subtitled video |
| AI Video Gen | RunwayML / Kling | New showcase clips |
| Format Convert | FFmpeg | 9:16, 1:1, 16:9 |

#### 4c. Copy AI Pipeline
| Bước | Công cụ | Output |
|---|---|---|
| Product Analysis | GPT-4o Vision | Feature extraction |
| Angle Generation | GPT-4o | Pain point / Benefit / UGC / FOMO |
| Headline Variants | GPT-4o | 5–10 hooks/angle |
| CTA Generation | GPT-4o | Platform-specific CTAs |
| Localization | DeepL + GPT-4o | VI / EN / TH / ID |

**Quality Control:** CLIP Aesthetic Scorer chấm điểm và xếp hạng tất cả creative trước khi export.

---

### Layer 5 – Output & Ad Export
**Mục tiêu:** Creative sẵn sàng chạy ads, đúng spec từng platform.

| Platform | Tích hợp | Spec tự động |
|---|---|---|
| Meta (FB/IG) | Marketing API | Feed, Story, Reels |
| TikTok | TikTok Ads API | 9:16 video, caption |
| Google | Google Ads API | Responsive Display, PMax |

**Thêm:**
- Creative Library – browse, filter, tag, tái sử dụng
- Webhook – thông báo real-time khi creative mới sẵn sàng
- REST/GraphQL API – cho phép tích hợp với tool khác

---

## 4. Tư duy Thiết kế

### Tại sao kiến trúc 5 layer?
Mỗi layer có thể **scale độc lập**: nếu AI generation bị bottleneck, chỉ cần scale layer 4 — không ảnh hưởng storage hay input.

### Tại sao dùng task queue (Celery)?
Crawling và AI generation là tác vụ nặng, không thể xử lý đồng bộ. Queue cho phép:
- Retry tự động khi thất bại
- Ưu tiên job theo sản phẩm
- Parallel processing nhiều sản phẩm cùng lúc

### Tại sao cần Vector DB?
Keyword search không đủ cho creative assets. Vector DB cho phép tìm "ảnh lifestyle màu sáng, tone ấm" — tìm theo **ý nghĩa**, không chỉ tên file.

`;

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter',sans-serif", padding: "20px 16px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>🚀</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>SellifyX – Creative System</h1>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Kiến trúc hệ thống thu thập & tạo creative tự động</p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, background: "#e2e8f0", borderRadius: 10, padding: 4 }}>
          {[{ id: "app", label: "🗺️ Sơ đồ tương tác" }, { id: "doc", label: "📄 Tài liệu đính kèm" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: "none", background: tab === t.id ? "#fff" : "transparent", color: tab === t.id ? "#1e293b" : "#64748b", fontWeight: tab === t.id ? 700 : 500, fontSize: 13, cursor: "pointer", boxShadow: tab === t.id ? "0 1px 4px #00000015" : "none", transition: "all 0.2s" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── APP TAB ── */}
        {tab === "app" && (
          <>
            {/* Flow bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
              {FLOW.map((f, i) => (
                <span key={f.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ background: `${f.color}15`, border: `1px solid ${f.color}40`, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, color: f.color }}>
                    {f.emoji} {f.label}
                  </span>
                  {i < FLOW.length - 1 && <span style={{ color: "#cbd5e1", fontSize: 16 }}>→</span>}
                </span>
              ))}
            </div>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {STEPS.map(step => {
                const isOpen = openStep === step.id;
                const techOpen = showTech[step.id];
                return (
                  <div key={step.id} style={{ background: "#fff", borderRadius: 14, border: `1px solid ${isOpen ? step.color : "#e2e8f0"}`, overflow: "hidden", boxShadow: isOpen ? `0 4px 18px ${step.color}20` : "0 1px 3px #0000000a", transition: "all 0.2s" }}>

                    {/* Header row */}
                    <div onClick={() => setOpenStep(isOpen ? null : step.id)}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "15px 18px", cursor: "pointer" }}>
                      <div style={{ minWidth: 34, height: 34, borderRadius: "50%", background: isOpen ? step.color : `${step.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: isOpen ? "#fff" : step.color, transition: "all 0.2s" }}>
                        {step.id}
                      </div>
                      <span style={{ fontSize: 18 }}>{step.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>{step.title}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8" }}>{step.subtitle}</div>
                      </div>
                      <span style={{ color: "#cbd5e1", fontSize: 20, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none" }}>›</span>
                    </div>

                    {/* Expanded */}
                    {isOpen && (
                      <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${step.color}20` }}>

                        {/* Business cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 9, marginTop: 14 }}>
                          {step.business.map((b, i) => (
                            <div key={i} style={{ background: `${step.color}08`, border: `1px solid ${step.color}22`, borderRadius: 10, padding: "11px 13px" }}>
                              <div style={{ fontSize: 18, marginBottom: 5 }}>{b.icon}</div>
                              <div style={{ fontWeight: 600, fontSize: 12, color: "#1e293b", marginBottom: 3 }}>{b.label}</div>
                              <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>{b.desc}</div>
                            </div>
                          ))}
                        </div>

                        {/* Note */}
                        <div style={{ marginTop: 12, background: `${step.color}10`, borderLeft: `3px solid ${step.color}`, borderRadius: 8, padding: "9px 13px", fontSize: 12, color: "#475569" }}>
                          {step.note}
                        </div>

                        {/* Tech stack toggle */}
                        <button onClick={e => toggleTech(step.id, e)}
                          style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 7, background: techOpen ? "#1e293b" : "#f1f5f9", border: `1px solid ${techOpen ? "#1e293b" : "#e2e8f0"}`, borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: techOpen ? "#fff" : "#475569", transition: "all 0.2s" }}>
                          <span>⚙️</span>
                          {techOpen ? "Ẩn Tech Stack" : "Xem Tech Stack chi tiết"}
                          <span style={{ fontSize: 10, opacity: 0.6 }}>{techOpen ? "▲" : "▼"}</span>
                        </button>

                        {/* Tech stack cards */}
                        {techOpen && (
                          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 8 }}>
                            {step.tech.map((t, i) => (
                              <div key={i} style={{ background: "#0f172a", borderRadius: 10, padding: "11px 13px", border: "1px solid #1e293b" }}>
                                <div style={{ fontWeight: 700, fontSize: 12, color: step.color, marginBottom: 4, fontFamily: "monospace" }}>{t.name}</div>
                                <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5 }}>{t.desc}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Design principles */}
            <div style={{ marginTop: 24, background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: 20 }}>
              <p style={{ margin: "0 0 14px", fontWeight: 700, fontSize: 12, color: "#94a3b8", letterSpacing: 1 }}>TƯ DUY THIẾT KẾ</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                {[
                  { icon: "🔌", title: "Modular & Scale độc lập", desc: "Mỗi layer scale riêng — AI nặng hơn chỉ cần thêm worker layer 4, không đụng phần còn lại." },
                  { icon: "⚡", title: "Async-first", desc: "Celery queue giúp crawl & AI generation không block UI. Retry tự động khi lỗi." },
                  { icon: "🧠", title: "Semantic Search", desc: "Vector DB cho phép tìm creative theo ý nghĩa, không chỉ tên file hay tag thủ công." },
                  { icon: "🔄", title: "Platform-agnostic Export", desc: "Một creative gốc → tự động tạo đúng spec cho Meta, TikTok, Google mà không cần can thiệp." },
                ].map((p, i) => (
                  <div key={i} style={{ background: "#f8fafc", borderRadius: 10, padding: 14, border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: 22, marginBottom: 7 }}>{p.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "#1e293b", marginBottom: 5 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── DOC TAB ── */}
        {tab === "doc" && (
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden" }}>
            {/* Doc toolbar */}
            <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>📄</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#1e293b" }}>Architecture Design Document.md</span>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(docMd); }}
                style={{ background: "#1e293b", color: "#fff", border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                📋 Copy Markdown
              </button>
            </div>

            {/* Rendered doc */}
            <div style={{ padding: "24px 28px", maxHeight: 600, overflowY: "auto" }}>
              {docMd.split("\n").map((line, i) => {
                if (line.startsWith("# ")) return <h1 key={i} style={{ fontSize: 20, fontWeight: 800, color: "#1e293b", margin: "0 0 6px", borderBottom: "2px solid #6c63ff", paddingBottom: 8 }}>{line.slice(2)}</h1>;
                if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "22px 0 8px", borderLeft: "3px solid #6c63ff", paddingLeft: 10 }}>{line.slice(3)}</h2>;
                if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: 14, fontWeight: 700, color: "#334155", margin: "16px 0 6px" }}>{line.slice(4)}</h3>;
                if (line.startsWith("#### ")) return <h4 key={i} style={{ fontSize: 13, fontWeight: 700, color: "#6c63ff", margin: "12px 0 5px" }}>{line.slice(5)}</h4>;
                if (line.startsWith("> ")) return <blockquote key={i} style={{ margin: "10px 0", padding: "8px 14px", background: "#f0f9ff", borderLeft: "3px solid #3b82f6", borderRadius: 6, fontSize: 13, color: "#475569", fontStyle: "italic" }}>{line.slice(2)}</blockquote>;
                if (line.startsWith("```")) return <div key={i} style={{ height: 2 }} />;
                if (line.startsWith("|")) {
                  const cells = line.split("|").filter(c => c.trim() && !c.trim().match(/^[-:]+$/));
                  if (!cells.length) return null;
                  const isHeader = docMd.split("\n")[i + 1]?.includes("---");
                  return (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gap: 0, borderBottom: "1px solid #e2e8f0" }}>
                      {cells.map((c, j) => (
                        <div key={j} style={{ padding: "7px 10px", fontSize: 12, fontWeight: isHeader ? 700 : 400, color: isHeader ? "#1e293b" : "#475569", background: isHeader ? "#f8fafc" : "#fff", borderRight: j < cells.length - 1 ? "1px solid #e2e8f0" : "none" }}>{c.trim()}</div>
                      ))}
                    </div>
                  );
                }
                if (line.startsWith("- **")) {
                  const match = line.match(/- \*\*(.+?)\*\* – (.+)/);
                  if (match) return <div key={i} style={{ display: "flex", gap: 8, margin: "4px 0", fontSize: 12 }}><span style={{ color: "#6c63ff", fontWeight: 700, minWidth: 140, fontFamily: "monospace" }}>{match[1]}</span><span style={{ color: "#475569" }}>{match[2]}</span></div>;
                }
                if (line.startsWith("- ")) return <div key={i} style={{ display: "flex", gap: 8, padding: "3px 0", fontSize: 12, color: "#475569" }}><span style={{ color: "#6c63ff" }}>•</span>{line.slice(2)}</div>;
                if (line.startsWith("---")) return <hr key={i} style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "16px 0" }} />;
                if (line.match(/^\d+\./)) return <div key={i} style={{ fontSize: 12, color: "#475569", padding: "3px 0 3px 16px" }}>{line}</div>;
                if (line.trim().startsWith("s3://") || line.trim().startsWith("└") || line.trim().startsWith("├") || line.trim().startsWith("│")) return <div key={i} style={{ fontFamily: "monospace", fontSize: 11, color: "#22c55e", background: "#0f172a", padding: "2px 14px", lineHeight: 1.8 }}>{line}</div>;
                if (line.trim() === "") return <div key={i} style={{ height: 8 }} />;
                return <p key={i} style={{ fontSize: 13, color: "#475569", margin: "4px 0", lineHeight: 1.7 }}>{line}</p>;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}