<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Agent Architecture & Context Guide — Desa Simoketawang CMS

This document provides context for AI agents working on this project.

## Architecture Pattern
1. **Framework:** Next.js App Router (`src/app/`)
2. **Database:** SQLite managed via **Prisma ORM** (`prisma/schema.prisma`)
3. **Data Fetching:** Uses Next.js **Server Actions** (`src/actions/*.ts`) for ALL database queries and mutations
4. **Styling:** Tailwind CSS v4 using PostCSS
5. **Icons:** `lucide-react`

## Important Rules for AI Agents
- **No Hardcoded Data:** ALL dynamic data MUST come from the database via Server Actions. Never hardcode text, statistics, names, or any content.
- **Client vs Server:** Keep pages as Server Components by default. Add `"use client"` ONLY for interactivity (forms, modals, state, hooks, uploads).
- **Server Actions are the ONLY gateway to database.** Never call Prisma directly from a Client Component.

## CMS Data Flow (MANDATORY)

```
Database (SQLite)
    ↓
Prisma ORM (schema.prisma)
    ↓
Server Actions (src/actions/*.ts)
    ↓
Server Components (default) — fetch & render
    ↓
Client Components ("use client") — form, state, interactivity only
```

## Key Models for CMS

### `PageSection` — CMS Engine
Controls every section on every page. Content stored as JSON blob.
```
page    → "home", "profil", "layanan"
section → "cta", "gallery-heading", "services-heading", "overview-heading", "welcome-heading"
content → JSON: { title, subtitle, button1Text, button1Href, ... }
isVisible → Boolean (admin can toggle on/off)
```
**Actions:** `src/actions/sections.ts` — `getPageSection()`, `upsertPageSection()`, `toggleSectionVisibility()`

### `VillageService` — Dynamic Layanan
Replaces all hardcoded service arrays. Admin can CRUD via `/admin/layanan`.
```
title, description, href, icon (lucide name), color (tailwind class), isVisible, order
```
**Actions:** `src/actions/layanan.ts`

### `VillageProfile` — Enhanced Fields
Now includes: `luasWilayah`, `jumlahDusun`, `koordinatLat`, `koordinatLng`, `bpdInfo`

## Admin Routes Map

| Admin Route | Function |
|---|---|
| `/admin` | Dashboard |
| `/admin/beranda` | Hero & tampilan beranda |
| `/admin/beranda/sections` | **CMS Section Editor** (semua section beranda) |
| `/admin/profil` | Profil desa, sejarah, visi misi |
| `/admin/profil/bpd` | Susunan anggota BPD |
| `/admin/layanan` | **CRUD Layanan Publik** |
| `/admin/layanan/create` | Form tambah/edit layanan |
| `/admin/berita` | Berita & pengumuman |
| `/admin/penduduk` | Data kependudukan |
| `/admin/apbdes` | Anggaran APBDes |
| `/admin/potensi` | UMKM & wisata |
| `/admin/dokumen` | Dokumen publik |
| `/admin/aduan` | Aduan masyarakat |

## Public Routes → Admin Control

| Halaman Publik | Dikendalikan dari Admin |
|---|---|
| Beranda (Hero) | `/admin/beranda` → `SiteSetting` |
| Beranda (Section headings, CTA) | `/admin/beranda/sections` → `PageSection` |
| Beranda (Layanan Cepat cards) | `/admin/layanan` → `VillageService` |
| Profil Desa | `/admin/profil` → `VillageProfile` |
| BPD | `/admin/profil/bpd` → `VillageOfficial` (type=BPD) |
| Berita | `/admin/berita` → `News` |
| Pengumuman | `/admin/berita` → `Announcement` |
| UMKM | `/admin/potensi` → `UMKM` + `Product` |
| Wisata | `/admin/potensi` → `Tourism` |
| APBDes | `/admin/apbdes` → `APBDes` |
| Galeri | *(admin galeri)* → `GalleryImage` |
| Penduduk | `/admin/penduduk` → `Resident` |

## Seed Data
Run `npx prisma db seed` to populate with Desa Simoketawang data:
- Site Settings, Village Profile, Officials (Perangkat + BPD)
- 5 Berita, 3 Pengumuman, 4 UMKM, 3 Wisata
- APBDes 2025, 8 Gallery Images, 4 Development Projects
- 8 VillageServices, 5 PageSections

## Project Domain Knowledge
- **Desa:** Simoketawang, Kecamatan Wonoayu, Kabupaten Sidoarjo, Jawa Timur
- **Tesseract.js OCR:** Used in `/admin/penduduk/kk/create` for scanning NIKs from photos
- **Windows note:** After schema changes, restart `npm run dev` to avoid EPERM errors with Prisma Client
