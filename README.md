# Agentic QR Code Generator

A web-based QR code generator with style customization, logo embedding, save/gallery, and export features. Built on Payload CMS 3 + Next.js 16.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [How It Works](#how-it-works)
    - [QR Generation](#qr-generation)
    - [Style Customization](#style-customization)
    - [Save & Gallery](#save--gallery)
    - [Features](#features)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Build a full-stack QR code generator with Payload CMS backend, PostgreSQL database, and Cloudflare R2 file storage — supporting style customization, logo embedding, save/gallery, and shareable links.

### Screenshot

![](/public/screenshot-app.png)

### Links

- Solution URL: [https://github.com/traez/agentic-qr-code-generator](https://github.com/traez/agentic-qr-code-generator)
- Live Site URL: [https://agentic-qr-code-generator.vercel.app/](https://agentic-qr-code-generator.vercel.app/)

## Built with

- **Next.js 16** — framework (App Router)
- **Payload CMS 3.85** — backend / CMS
- **PostgreSQL** — database (via `@payloadcms/db-postgres`)
- **Cloudflare R2** — file storage (via `@payloadcms/storage-s3`)
- **Tailwind CSS v4** — utility-first styling
- **react-qrcode-logo** — QR code generation (client-side Canvas)

## How It Works

### QR Generation

Uses `react-qrcode-logo`'s `<QRCode>` component to render QR codes directly in the browser via Canvas. Supports text/URL input with adjustable size. Server stores input data and style configuration only — images are generated client-side and never persisted as image files.

### Style Customization

Foreground and background hex color pickers, three dot styles (Squares / Rounded / Fluid), and four error correction levels (L / M / Q / H). Optional logo upload (PNG, SVG, JPEG) is embedded inline via the `logoImage` prop; error correction auto-bumps to M when a logo is added to maintain scannability.

### Save & Gallery

"Generate & Save" calls a Server Action (`saveQRCode`) that persists the input text, style config, and optional logo (uploaded to Media → R2) as a `qr-codes` record in PostgreSQL. The gallery (`QRCodeGallery`) fetches all saved codes via `listQRCodes` and displays them in a responsive grid. Clicking a card opens a detail modal with download, clipboard copy, and a shareable hash link (`/#qr-{shareId}`).

### Features

- **Real-time QR rendering** — live preview on every input change
- **Style customization** — colors, dot styles, error correction level
- **Logo embedding** — upload logo, auto-bump EC, inline rendering
- **Save to gallery** — persist to PostgreSQL via Server Actions
- **Download PNG** — one-click download via `react-qrcode-logo`'s `downloadQRCode`
- **Copy to clipboard** — `generateBlob` + `ClipboardItem` for image/png
- **Share via link** — URL hash `#qr-{shareId}` auto-opens matching QR in gallery

## Continued development

- More projects; increased competence!

## Useful resources

YouTube  
Google  
Artificial Intelligence

## Author

- Website — [Zeeofor Technologies](https://zeeofor.tech)

## Acknowledgments

- Jehovah that keeps breath in my lungs
