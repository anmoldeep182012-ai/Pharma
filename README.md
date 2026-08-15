# Pharma & Business Suite

A zero-friction, cross-platform productivity application designed for Indian pharmacy data entry, GST tax invoicing, and Shopify e-commerce catalog management.

---

## 🚀 Features

* **💊 Pharmacy Data Helper:**
  * Fuzzy search across 500+ Indian generic salts, brand names, and formulations.
  * Prescription "Sig" shorthand decoder (`OD`, `BD`, `TID`, `QID`, `SOS`, `HS`, `AC`, `PC`, `STAT`).
  * Structured prescription scratchpad with 1-click text formatting and direct WhatsApp sharing.
* **🧾 GST Invoicing & Chemist Billing:**
  * Full Indian GST tax engine with automatic intra-state (CGST + SGST) and inter-state (IGST) calculations.
  * Itemized rows with Drug Name, HSN (`3004`), Batch No, Expiry Date (`MM/YY`), Qty, Rate, Discount %, and GST %.
  * Clean, professional A4 print view ready to print or save to PDF with zero extra software.
  * Local invoice history log with quick search and re-printing.
* **🛍️ Shopify Store Helper:**
  * Product title and feature list to clean, high-converting HTML converter.
  * Standardized SKU and 13-digit EAN barcode generator with valid checksum calculation.
  * Bulk catalog CSV builder for 1-click import into Shopify Admin.
* **⚡ Modern & Lightweight:**
  * Clean Slate design with instant Dark / Light mode toggle.
  * 100% offline capable (Service Worker PWA).
  * 100% private: all data is stored on-device in local storage with JSON backup/restore.

---

## 📦 How to Deploy on Vercel (Free & Instant)

1. **Option A: Via GitHub (Recommended)**
   * Create a new repository on GitHub (e.g. `pharma-suite`).
   * Push these files (`index.html`, `styles.css`, `app.js`, `manifest.json`, `sw.js`, `vercel.json`) to your repository.
   * Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
   * Select your GitHub repository and click **Deploy**.
   * Vercel will instantly provide an HTTPS URL (e.g. `https://pharma-suite.vercel.app`).

2. **Option B: Via Vercel CLI**
   * Open your terminal in this folder.
   * Run:
     ```bash
     npx vercel
     ```
   * Follow the default prompts to deploy in seconds.

---

## 📱 How to Use on Devices (Zero Server Commands)

* **On Windows Laptop:**
  * Open the Vercel URL in Google Chrome or Microsoft Edge.
  * Click the **"Install"** button (⊕ icon in the browser address bar).
  * The app is now installed on your Windows desktop and launches like a native PC program.
* **On iPhone:**
  * Open the Vercel URL in Safari.
  * Tap the **Share** button (box with upward arrow) $\rightarrow$ select **"Add to Home Screen"**.
  * The app now launches from your home screen in full screen and works offline.
