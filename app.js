/**
 * Pharma & Business Suite - Core Application Logic
 * Clean, offline-first, zero-friction productivity platform.
 */

// ==================== 1. DATABASE & DICTIONARIES ====================

const MEDICINE_DATABASE = [
  { name: "Amoxicillin & Potassium Clavulanate (Augmentin / Clavam / Moxikind-CV)", salt: "Amoxicillin + Clavulanic Acid", category: "Antibiotic", schedule: "Schedule H1", strengths: "625mg, 375mg, 1g, Syrup 228.5mg/5ml" },
  { name: "Pantoprazole & Domperidone (Pantocid-D / Pan-D / Pantop-D)", salt: "Pantoprazole 40mg + Domperidone 30mg SR", category: "Gastrointestinal / PPI", schedule: "Schedule H", strengths: "40mg/30mg Capsule, Injection 40mg" },
  { name: "Paracetamol (Dolo 650 / Calpol / Crocin)", salt: "Paracetamol (Acetaminophen)", category: "Analgesic / Antipyretic", schedule: "OTC", strengths: "500mg, 650mg, Drops 100mg/ml, Syrup 120mg/5ml" },
  { name: "Azithromycin (Azee / Azithral)", salt: "Azithromycin", category: "Antibiotic", schedule: "Schedule H1", strengths: "250mg, 500mg, Syrup 200mg/5ml" },
  { name: "Telmisartan & Hydrochlorothiazide (Telma-H / Telmikind-H)", salt: "Telmisartan 40mg + Hydrochlorothiazide 12.5mg", category: "Antihypertensive", schedule: "Schedule H", strengths: "40mg/12.5mg, 80mg/12.5mg" },
  { name: "Metformin Hydrochloride (Glycomet / Gluconorm)", salt: "Metformin HCl", category: "Antidiabetic", schedule: "Schedule H", strengths: "500mg SR, 850mg, 1000mg SR" },
  { name: "Ceftriaxone Sodium Injection (Monocef / Oframax)", salt: "Ceftriaxone Sodium (Sterile)", category: "Antibiotic / Injectable", schedule: "Schedule H1", strengths: "250mg, 500mg, 1g, 2g Vial + WFI" },
  { name: "Montelukast & Levocetirizine (Montair-LC / Telekast-L)", salt: "Montelukast 10mg + Levocetirizine 5mg", category: "Antiallergic / Respiratory", schedule: "Schedule H", strengths: "10mg/5mg Tablet, Syrup" },
  { name: "Cefixime (Zifi / Taxim-O / Mahacef)", salt: "Cefixime Trihydrate", category: "Antibiotic", schedule: "Schedule H1", strengths: "100mg, 200mg, DT, Dry Syrup 50mg/5ml" },
  { name: "Aceclofenac & Paracetamol & Serratiopeptidase (Zerodol-SP / Aceclo-SP)", salt: "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg", category: "NSAID / Anti-inflammatory", schedule: "Schedule H", strengths: "Tablet" },
  { name: "Rabeprazole & Levosulpiride (Razo-L / Rabekind-L)", salt: "Rabeprazole 20mg + Levosulpiride 75mg SR", category: "Gastrointestinal", schedule: "Schedule H", strengths: "Capsule" },
  { name: "Atorvastatin (Atorva / Lipicure)", salt: "Atorvastatin Calcium", category: "Cardiovascular / Statin", schedule: "Schedule H", strengths: "10mg, 20mg, 40mg, 80mg" },
  { name: "Ofloxacin & Ornidazole (Oflomac-OZ / Zenflox-OZ)", salt: "Ofloxacin 200mg + Ornidazole 500mg", category: "Antimicrobial / Antidiarrheal", schedule: "Schedule H1", strengths: "Tablet, Suspension" },
  { name: "Ibuprofen & Paracetamol (Combiflam / Ibugesic Plus)", salt: "Ibuprofen 400mg + Paracetamol 325mg", category: "Analgesic / Antipyretic", schedule: "Schedule H", strengths: "Tablet, Syrup" },
  { name: "Cough Formula (Ascoril-D / Grilinctus / Benadryl)", salt: "Dextromethorphan + Chlorpheniramine + Phenylephrine", category: "Cough & Cold", schedule: "Schedule H", strengths: "Syrup 100ml" },
  { name: "Diclofenac Sodium Injection (Dynapar AQ / Voveran)", salt: "Diclofenac Sodium 75mg/1ml", category: "Analgesic / Injectable", schedule: "Schedule H", strengths: "1ml Ampoule" },
  { name: "Omeprazole (Omez / Ocid)", salt: "Omeprazole", category: "Gastrointestinal / PPI", schedule: "Schedule H", strengths: "20mg, 40mg Capsule" },
  { name: "Metoprolol Succinate (Betaloc / Metolar-XR)", salt: "Metoprolol Succinate", category: "Cardiovascular / Beta Blocker", schedule: "Schedule H", strengths: "25mg, 50mg, 100mg ER" },
  { name: "Glimepiride & Metformin (Amaryl-M / Glycomet-GP)", salt: "Glimepiride 1mg/2mg + Metformin 500mg SR", category: "Antidiabetic", schedule: "Schedule H", strengths: "1mg/500mg, 2mg/500mg" },
  { name: "Vildagliptin & Metformin (Galvus Met / Jalra-M)", salt: "Vildagliptin 50mg + Metformin 500mg/850mg", category: "Antidiabetic", schedule: "Schedule H", strengths: "50mg/500mg, 50mg/1000mg" }
];

const SIG_DICTIONARY = [
  { code: "OD", meaning: "Once a day (एक बार प्रतिदिन)" },
  { code: "BD / BID", meaning: "Twice a day - Morning & Night (दिन में दो बार)" },
  { code: "TDS / TID", meaning: "Three times a day - Morning, Noon & Night (दिन में तीन बार)" },
  { code: "QID", meaning: "Four times a day (दिन में चार बार)" },
  { code: "SOS", meaning: "As needed in emergency/pain (आवश्यकता पड़ने पर)" },
  { code: "HS / QHS", meaning: "At bedtime / Night (रात को सोते समय)" },
  { code: "AC", meaning: "Before food / meals (भोजन से पहले / खाली पेट)" },
  { code: "PC", meaning: "After food / meals (भोजन के बाद)" },
  { code: "STAT", meaning: "Immediately / Single initial dose (तुरंत)" },
  { code: "PO", meaning: "By mouth / Orally (मुंह से)" },
  { code: "PRN", meaning: "As needed / when necessary (जब ज़रूरत हो)" },
  { code: "BBF", meaning: "Before Breakfast (नाश्ते से पहले)" },
  { code: "Q4H / Q6H", meaning: "Every 4 hours / Every 6 hours" },
  { code: "IM / IV", meaning: "Intramuscular (in muscle) / Intravenous (in vein)" },
  { code: "GTT", meaning: "Drops (बूंदें)" }
];

// ==================== 2. STATE MANAGEMENT ====================

let currentTheme = localStorage.getItem("pharmasuite_theme") || "dark";
let savedInvoices = JSON.parse(localStorage.getItem("pharmasuite_invoices") || "[]");
let storeProfile = JSON.parse(localStorage.getItem("pharmasuite_store_profile") || JSON.stringify({
  name: "Kwality Pharma & Chemists",
  address: "Majitha Road, Amritsar, Punjab - 143001",
  phone: "9876543210",
  email: "support@kwalitypharma.com",
  gstin: "03AAACK6458M1ZB",
  dl: "PB-ASR-20B-10492 / 21B-10493"
}));

// ==================== 3. INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTabs();
  initPharmacyModule();
  initGSTModule();
  initShopifyModule();
  initSettingsModule();
  registerServiceWorker();
});

// Toast notification helper
function showToast(message, isDanger = false) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.borderLeftColor = isDanger ? "var(--danger)" : "var(--primary)";
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2800);
}

// ==================== 4. THEME & NAVIGATION ====================

function initTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeButtonUI();

  document.getElementById("themeToggleBtn").addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("pharmasuite_theme", currentTheme);
    updateThemeButtonUI();
  });
}

function updateThemeButtonUI() {
  const icon = document.getElementById("themeIcon");
  const text = document.getElementById("themeText");
  if (currentTheme === "dark") {
    icon.textContent = "☀️";
    text.textContent = "Light";
  } else {
    icon.textContent = "🌙";
    text.textContent = "Dark";
  }
}

function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add("active");
    });
  });
}

// ==================== 5. PHARMACY MODULE ====================

function initPharmacyModule() {
  // Populate Sig Reference Table
  const sigTableBody = document.getElementById("sigTableBody");
  sigTableBody.innerHTML = "";
  SIG_DICTIONARY.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td><strong>${item.code}</strong></td><td>${item.meaning}</td>`;
    sigTableBody.appendChild(tr);
  });

  // Sig Decoder live test
  document.getElementById("btnDecodeSig").addEventListener("click", decodeSigInput);
  document.getElementById("sigInput").addEventListener("keyup", (e) => {
    if (e.key === "Enter") decodeSigInput();
  });

  // Drug Search
  const searchInput = document.getElementById("drugSearchInput");
  const searchResults = document.getElementById("drugSearchResults");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      searchResults.style.display = "none";
      return;
    }

    const matches = MEDICINE_DATABASE.filter(m => 
      m.name.toLowerCase().includes(query) || 
      m.salt.toLowerCase().includes(query) ||
      m.category.toLowerCase().includes(query)
    );

    searchResults.innerHTML = "";
    if (matches.length === 0) {
      searchResults.innerHTML = `<div style="padding: 10px; font-size: 13px; color: var(--text-muted);">No exact match found in offline database.</div>`;
    } else {
      matches.slice(0, 8).forEach(item => {
        const div = document.createElement("div");
        div.className = "search-item";
        div.innerHTML = `
          <div>
            <div class="search-item-title">${item.name}</div>
            <div class="search-item-salt">${item.salt} • <span style="color: var(--primary);">${item.category}</span></div>
          </div>
          <span class="badge ${item.schedule === 'Schedule H1' ? 'badge-schedule-h1' : item.schedule === 'Schedule H' ? 'badge-schedule-h' : 'badge-otc'}">${item.schedule}</span>
        `;
        div.addEventListener("click", () => selectDrug(item));
        searchResults.appendChild(div);
      });
    }
    searchResults.style.display = "block";
  });

  // Scratchpad initial row
  addRxRow();
  document.getElementById("btnAddRxRow").addEventListener("click", () => addRxRow());

  // Copy Scratchpad Clean Text
  document.getElementById("btnCopyScratchpad").addEventListener("click", copyScratchpadText);
  document.getElementById("btnWhatsAppScratchpad").addEventListener("click", shareScratchpadWhatsApp);
  document.getElementById("btnClearScratchpad").addEventListener("click", clearScratchpad);
}

function decodeSigInput() {
  const input = document.getElementById("sigInput").value.trim().toUpperCase();
  const resDiv = document.getElementById("sigDecodedResult");
  if (!input) {
    resDiv.textContent = "Please enter an abbreviation (e.g. BD PC, TID, SOS, HS).";
    return;
  }

  const parts = input.split(/[\s,]+/);
  let explanations = [];

  parts.forEach(part => {
    const found = SIG_DICTIONARY.find(s => s.code.split("/").map(c => c.trim()).includes(part));
    if (found) {
      explanations.push(`<strong>${part}:</strong> ${found.meaning}`);
    } else {
      explanations.push(`<strong>${part}:</strong> (Custom / Unlisted)`);
    }
  });

  resDiv.innerHTML = explanations.join("<br>");
}

let selectedDrugCache = null;
function selectDrug(drug) {
  selectedDrugCache = drug;
  document.getElementById("drugSearchResults").style.display = "none";
  document.getElementById("detDrugName").textContent = drug.name;
  document.getElementById("detDrugSalt").textContent = drug.salt;
  document.getElementById("detDrugCategory").textContent = drug.category;
  document.getElementById("detDrugStrengths").textContent = drug.strengths;
  
  const schedBadge = document.getElementById("detDrugSchedule");
  schedBadge.textContent = drug.schedule;
  schedBadge.className = `badge ${drug.schedule === 'Schedule H1' ? 'badge-schedule-h1' : drug.schedule === 'Schedule H' ? 'badge-schedule-h' : 'badge-otc'}`;

  document.getElementById("selectedDrugDetails").style.display = "block";

  document.getElementById("btnAddToScratchpad").onclick = () => {
    addRxRow(drug.name, "Tab / Cap", "1 tab BD after meals", "5 days");
    showToast(`Added ${drug.name.split('(')[0].trim()} to scratchpad!`);
  };
}

function addRxRow(medName = "", form = "Tab", dir = "1 tab BD PC", duration = "5 days") {
  const tbody = document.getElementById("rxTableBody");
  const rowIndex = tbody.children.length + 1;
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${rowIndex}</td>
    <td><input type="text" class="form-control rx-med" value="${medName}" placeholder="e.g. Pantocid 40mg"></td>
    <td>
      <select class="form-control rx-form">
        <option value="Tab" ${form.includes('Tab') ? 'selected' : ''}>Tablet</option>
        <option value="Cap" ${form.includes('Cap') ? 'selected' : ''}>Capsule</option>
        <option value="Syp" ${form.includes('Syp') ? 'selected' : ''}>Syrup</option>
        <option value="Inj" ${form.includes('Inj') ? 'selected' : ''}>Injection</option>
        <option value="Oint" ${form.includes('Oint') ? 'selected' : ''}>Ointment</option>
        <option value="Drops" ${form.includes('Drops') ? 'selected' : ''}>Drops</option>
      </select>
    </td>
    <td><input type="text" class="form-control rx-dir" value="${dir}" placeholder="e.g. 1 cap BD before food"></td>
    <td><input type="text" class="form-control rx-dur" value="${duration}" placeholder="e.g. 5 days"></td>
    <td><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove(); renumberRxRows();">✕</button></td>
  `;
  tbody.appendChild(tr);
}

function renumberRxRows() {
  const rows = document.querySelectorAll("#rxTableBody tr");
  rows.forEach((row, i) => {
    row.children[0].textContent = i + 1;
  });
}

function generateScratchpadCleanText() {
  const patientRef = document.getElementById("rxPatientRef").value.trim() || "N/A";
  const docName = document.getElementById("rxDoctorName").value.trim() || "Attending Physician";
  const docReg = document.getElementById("rxDoctorReg").value.trim() || "";
  const notes = document.getElementById("rxNotes").value.trim();

  let text = `===============================\n`;
  text += `PRESCRIPTION DRAFT (INTERNAL ONLY)\n`;
  text += `Date: ${new Date().toLocaleDateString('en-IN')}\n`;
  text += `Patient Ref ID: ${patientRef}\n`;
  text += `Doctor: ${docName} ${docReg ? '(' + docReg + ')' : ''}\n`;
  text += `-------------------------------\n`;
  text += `Rx MEDICINES:\n`;

  const rows = document.querySelectorAll("#rxTableBody tr");
  let count = 0;
  rows.forEach((row, idx) => {
    const med = row.querySelector(".rx-med").value.trim();
    const form = row.querySelector(".rx-form").value;
    const dir = row.querySelector(".rx-dir").value.trim();
    const dur = row.querySelector(".rx-dur").value.trim();

    if (med) {
      count++;
      text += `${idx + 1}. [${form}] ${med}\n   Directions: ${dir} (${dur})\n`;
    }
  });

  if (count === 0) text += `(No medicines listed)\n`;
  if (notes) text += `\nSpecial Instructions:\n${notes}\n`;
  text += `===============================`;
  return text;
}

function copyScratchpadText() {
  const text = generateScratchpadCleanText();
  navigator.clipboard.writeText(text).then(() => {
    showToast("Prescription text copied to clipboard!");
  }).catch(() => {
    showToast("Copy failed, please copy manually.", true);
  });
}

function shareScratchpadWhatsApp() {
  const text = generateScratchpadCleanText();
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function clearScratchpad() {
  document.getElementById("rxPatientRef").value = "";
  document.getElementById("rxDoctorName").value = "";
  document.getElementById("rxDoctorReg").value = "";
  document.getElementById("rxNotes").value = "";
  document.getElementById("rxTableBody").innerHTML = "";
  addRxRow();
  showToast("Scratchpad cleared.");
}

// ==================== 6. GST INVOICING & BILLING ====================

function initGSTModule() {
  document.getElementById("invDate").value = new Date().toISOString().split("T")[0];
  document.getElementById("invNumber").value = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Default Rows
  addInvRow("Pantocid-D Cap (10s)", "3004", "PTD2611", "08/28", 2, 145.00, 0, 12);
  addInvRow("Dolo 650 Tab (15s)", "3004", "DL6504", "11/27", 3, 33.50, 0, 12);

  document.getElementById("btnAddInvRow").addEventListener("click", () => addInvRow());
  document.getElementById("invState").addEventListener("change", calculateGSTTotals);
  document.getElementById("btnPrintInvoice").addEventListener("click", printInvoice);
  document.getElementById("btnSaveInvoice").addEventListener("click", saveInvoiceToHistory);
  document.getElementById("btnWhatsAppInvoice").addEventListener("click", shareInvoiceWhatsApp);
  document.getElementById("btnNewInvoice").addEventListener("click", resetInvoiceForm);
  document.getElementById("searchHistoryInput").addEventListener("input", filterInvoiceHistory);

  calculateGSTTotals();
  renderInvoiceHistory();
}

function addInvRow(name = "", hsn = "3004", batch = "BT-01", exp = "12/28", qty = 1, rate = 0, disc = 0, gst = 12) {
  const tbody = document.getElementById("invTableBody");
  const rowIndex = tbody.children.length + 1;
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${rowIndex}</td>
    <td><input type="text" class="form-control inv-item-name" value="${name}" placeholder="Medicine Name & Pack"></td>
    <td><input type="text" class="form-control inv-item-hsn" value="${hsn}" style="width: 70px;"></td>
    <td><input type="text" class="form-control inv-item-batch" value="${batch}"></td>
    <td><input type="text" class="form-control inv-item-exp" value="${exp}" placeholder="MM/YY" style="width: 70px;"></td>
    <td><input type="number" class="form-control inv-item-qty" value="${qty}" min="1" style="width: 60px;"></td>
    <td><input type="number" class="form-control inv-item-rate" value="${rate}" step="0.01" style="width: 80px;"></td>
    <td><input type="number" class="form-control inv-item-disc" value="${disc}" min="0" max="100" style="width: 55px;"></td>
    <td>
      <select class="form-control inv-item-gst" style="width: 75px;">
        <option value="0" ${gst === 0 ? 'selected' : ''}>0%</option>
        <option value="5" ${gst === 5 ? 'selected' : ''}>5%</option>
        <option value="12" ${gst === 12 ? 'selected' : ''}>12%</option>
        <option value="18" ${gst === 18 ? 'selected' : ''}>18%</option>
        <option value="28" ${gst === 28 ? 'selected' : ''}>28%</option>
      </select>
    </td>
    <td><strong class="inv-row-total">₹0.00</strong></td>
    <td><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove(); calculateGSTTotals(); renumberInvRows();">✕</button></td>
  `;

  // Attach live recalculation events
  tr.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", calculateGSTTotals);
  });

  tbody.appendChild(tr);
  calculateGSTTotals();
}

function renumberInvRows() {
  const rows = document.querySelectorAll("#invTableBody tr");
  rows.forEach((row, i) => {
    row.children[0].textContent = i + 1;
  });
}

function calculateGSTTotals() {
  const rows = document.querySelectorAll("#invTableBody tr");
  const stateCode = document.getElementById("invState").value;
  const isIntraState = stateCode === "03"; // 03 is Punjab

  let totalTaxable = 0;
  let totalTax = 0;

  rows.forEach(row => {
    const qty = parseFloat(row.querySelector(".inv-item-qty").value) || 0;
    const rate = parseFloat(row.querySelector(".inv-item-rate").value) || 0;
    const disc = parseFloat(row.querySelector(".inv-item-disc").value) || 0;
    const gstRate = parseFloat(row.querySelector(".inv-item-gst").value) || 0;

    const lineGross = qty * rate;
    const lineDiscount = lineGross * (disc / 100);
    const lineTaxable = lineGross - lineDiscount;
    const lineTax = lineTaxable * (gstRate / 100);
    const lineTotal = lineTaxable + lineTax;

    row.querySelector(".inv-row-total").textContent = `₹${lineTotal.toFixed(2)}`;

    totalTaxable += lineTaxable;
    totalTax += lineTax;
  });

  const grossTotal = totalTaxable + totalTax;
  const roundedGrandTotal = Math.round(grossTotal);
  const roundOff = roundedGrandTotal - grossTotal;

  document.getElementById("lblTaxable").textContent = `₹${totalTaxable.toFixed(2)}`;

  if (isIntraState) {
    document.getElementById("cgstRow").style.display = "flex";
    document.getElementById("sgstRow").style.display = "flex";
    document.getElementById("igstRow").style.display = "none";
    document.getElementById("lblCGST").textContent = `₹${(totalTax / 2).toFixed(2)}`;
    document.getElementById("lblSGST").textContent = `₹${(totalTax / 2).toFixed(2)}`;
  } else {
    document.getElementById("cgstRow").style.display = "none";
    document.getElementById("sgstRow").style.display = "none";
    document.getElementById("igstRow").style.display = "flex";
    document.getElementById("lblIGST").textContent = `₹${totalTax.toFixed(2)}`;
  }

  document.getElementById("lblRoundOff").textContent = (roundOff >= 0 ? `+₹` : `-₹`) + Math.abs(roundOff).toFixed(2);
  document.getElementById("lblGrandTotal").textContent = `₹${roundedGrandTotal.toFixed(2)}`;
  document.getElementById("lblAmountInWords").textContent = numberToWordsIndian(roundedGrandTotal) + " Rupees Only";
}

// Indian Rupee Number to Words converter
function numberToWordsIndian(num) {
  if (num === 0) return "Zero";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convert(n) {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
    return convert(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convert(n % 10000000) : "");
  }

  return convert(Math.floor(num));
}

function printInvoice() {
  // Populate Print View
  document.getElementById("pStoreName").textContent = storeProfile.name;
  document.getElementById("pStoreAddress").textContent = storeProfile.address;
  document.getElementById("pStorePhone").textContent = storeProfile.phone;
  document.getElementById("pStoreEmail").textContent = storeProfile.email;
  document.getElementById("pStoreGSTIN").textContent = storeProfile.gstin;
  document.getElementById("pStoreDL").textContent = storeProfile.dl;

  document.getElementById("pInvNumber").textContent = document.getElementById("invNumber").value;
  document.getElementById("pInvDate").textContent = document.getElementById("invDate").value;
  
  const stateSelect = document.getElementById("invState");
  document.getElementById("pInvState").textContent = stateSelect.options[stateSelect.selectedIndex].text;

  document.getElementById("pCustomerName").textContent = document.getElementById("invCustomerName").value || "Walk-in Customer";
  document.getElementById("pCustomerPhone").textContent = document.getElementById("invCustomerPhone").value || "N/A";
  document.getElementById("pDoctorRef").textContent = document.getElementById("invDoctorRef").value || "Self / OTC";
  document.getElementById("pPaymentMode").textContent = document.getElementById("invPaymentMode").value;

  const pTbody = document.getElementById("pTableBody");
  pTbody.innerHTML = "";

  const rows = document.querySelectorAll("#invTableBody tr");
  rows.forEach((row, i) => {
    const name = row.querySelector(".inv-item-name").value;
    const hsn = row.querySelector(".inv-item-hsn").value;
    const batch = row.querySelector(".inv-item-batch").value;
    const exp = row.querySelector(".inv-item-exp").value;
    const qty = row.querySelector(".inv-item-qty").value;
    const rate = parseFloat(row.querySelector(".inv-item-rate").value).toFixed(2);
    const gst = row.querySelector(".inv-item-gst").value;
    const total = row.querySelector(".inv-row-total").textContent;

    if (name) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="padding: 4px; border: 1px solid #000; text-align: center;">${i + 1}</td>
        <td style="padding: 4px; border: 1px solid #000;">${name}</td>
        <td style="padding: 4px; border: 1px solid #000; text-align: center;">${hsn}</td>
        <td style="padding: 4px; border: 1px solid #000; text-align: center;">${batch}</td>
        <td style="padding: 4px; border: 1px solid #000; text-align: center;">${exp}</td>
        <td style="padding: 4px; border: 1px solid #000; text-align: center;">${qty}</td>
        <td style="padding: 4px; border: 1px solid #000; text-align: right;">${rate}</td>
        <td style="padding: 4px; border: 1px solid #000; text-align: center;">${gst}%</td>
        <td style="padding: 4px; border: 1px solid #000; text-align: right;">${total}</td>
      `;
      pTbody.appendChild(tr);
    }
  });

  // Totals
  document.getElementById("pTaxable").textContent = document.getElementById("lblTaxable").textContent;
  document.getElementById("pCGST").textContent = document.getElementById("lblCGST").textContent;
  document.getElementById("pSGST").textContent = document.getElementById("lblSGST").textContent;
  document.getElementById("pIGST").textContent = document.getElementById("lblIGST").textContent;
  document.getElementById("pRoundOff").textContent = document.getElementById("lblRoundOff").textContent;
  document.getElementById("pGrandTotal").textContent = document.getElementById("lblGrandTotal").textContent;
  document.getElementById("pAmountInWords").textContent = document.getElementById("lblAmountInWords").textContent;

  const isIntraState = document.getElementById("invState").value === "03";
  document.getElementById("pCgstRow").style.display = isIntraState ? "flex" : "none";
  document.getElementById("pSgstRow").style.display = isIntraState ? "flex" : "none";
  document.getElementById("pIgstRow").style.display = isIntraState ? "none" : "flex";

  window.print();
}

function saveInvoiceToHistory() {
  const invNumber = document.getElementById("invNumber").value;
  const date = document.getElementById("invDate").value;
  const customer = document.getElementById("invCustomerName").value || "Walk-in";
  const phone = document.getElementById("invCustomerPhone").value;
  const total = document.getElementById("lblGrandTotal").textContent;
  const payment = document.getElementById("invPaymentMode").value;

  const invoiceRecord = {
    id: Date.now(),
    number: invNumber,
    date: date,
    customer: customer,
    phone: phone,
    total: total,
    payment: payment,
    timestamp: new Date().toISOString()
  };

  savedInvoices.unshift(invoiceRecord);
  localStorage.setItem("pharmasuite_invoices", JSON.stringify(savedInvoices));
  renderInvoiceHistory();
  showToast(`Invoice ${invNumber} saved locally!`);
}

function renderInvoiceHistory(filtered = null) {
  const list = filtered || savedInvoices;
  const tbody = document.getElementById("historyTableBody");
  tbody.innerHTML = "";

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No invoices found.</td></tr>`;
    return;
  }

  list.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.number}</strong></td>
      <td>${item.date}</td>
      <td>${item.customer}</td>
      <td><strong>${item.total}</strong></td>
      <td><span class="badge badge-otc">${item.payment}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="printSavedInvoice('${item.number}')">🖨️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteSavedInvoice(${item.id})">✕</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterInvoiceHistory() {
  const query = document.getElementById("searchHistoryInput").value.trim().toLowerCase();
  if (!query) {
    renderInvoiceHistory();
    return;
  }
  const filtered = savedInvoices.filter(i => 
    i.number.toLowerCase().includes(query) || 
    i.customer.toLowerCase().includes(query)
  );
  renderInvoiceHistory(filtered);
}

function deleteSavedInvoice(id) {
  savedInvoices = savedInvoices.filter(i => i.id !== id);
  localStorage.setItem("pharmasuite_invoices", JSON.stringify(savedInvoices));
  renderInvoiceHistory();
  showToast("Invoice deleted.");
}

function shareInvoiceWhatsApp() {
  const customerPhone = document.getElementById("invCustomerPhone").value.trim();
  const invNumber = document.getElementById("invNumber").value;
  const grandTotal = document.getElementById("lblGrandTotal").textContent;
  const storeName = storeProfile.name;

  let msg = `*🧾 TAX INVOICE - ${storeName}*\n`;
  msg += `Invoice No: ${invNumber}\n`;
  msg += `Date: ${document.getElementById("invDate").value}\n`;
  msg += `--------------------------------\n`;
  msg += `*Items:*\n`;

  const rows = document.querySelectorAll("#invTableBody tr");
  rows.forEach((row, i) => {
    const name = row.querySelector(".inv-item-name").value;
    const qty = row.querySelector(".inv-item-qty").value;
    const rate = row.querySelector(".inv-item-rate").value;
    const total = row.querySelector(".inv-row-total").textContent;
    if (name) {
      msg += `${i + 1}. ${name} (x${qty}) = ${total}\n`;
    }
  });

  msg += `--------------------------------\n`;
  msg += `*Grand Total: ${grandTotal}*\n`;
  msg += `Payment: ${document.getElementById("invPaymentMode").value}\n`;
  msg += `\n_Thank you for your visit! Stay healthy._`;

  let url = `https://wa.me/`;
  if (customerPhone) {
    const cleanPhone = customerPhone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone;
    url += `${formattedPhone}?text=${encodeURIComponent(msg)}`;
  } else {
    url += `?text=${encodeURIComponent(msg)}`;
  }

  window.open(url, "_blank");
}

function resetInvoiceForm() {
  document.getElementById("invNumber").value = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  document.getElementById("invCustomerName").value = "";
  document.getElementById("invCustomerPhone").value = "";
  document.getElementById("invDoctorRef").value = "";
  document.getElementById("invTableBody").innerHTML = "";
  addInvRow();
  calculateGSTTotals();
  showToast("Invoice form reset.");
}

// ==================== 7. SHOPIFY MODULE ====================

function initShopifyModule() {
  document.getElementById("btnGenerateShopifyHTML").addEventListener("click", generateShopifyHTML);
  document.getElementById("btnCopyShopifyHTML").addEventListener("click", copyShopifyHTML);
  document.getElementById("btnGenerateSKU").addEventListener("click", generateSKUAndBarcode);
  document.getElementById("btnAddShopifyRow").addEventListener("click", () => addShopifyRow());
  document.getElementById("btnExportShopifyCSV").addEventListener("click", exportShopifyCSV);

  // Initial CSV row
  addShopifyRow("Organic Ashwagandha Extract (500mg)", "HERB-ASHWA-60CAP", 499.00, 799.00, 100, "Kwality Herbal");
  addShopifyRow("Pure Vitamin C Immune Support", "HERB-VITC-60CAP", 349.00, 599.00, 150, "Kwality Herbal");
}

function generateShopifyHTML() {
  const title = document.getElementById("shTitle").value.trim();
  const rawHighlights = document.getElementById("shHighlights").value.trim();
  const desc = document.getElementById("shDescription").value.trim();

  let html = `<div class="product-description-container">\n`;
  if (title) {
    html += `  <h3>${title}</h3>\n`;
  }
  if (rawHighlights) {
    html += `  <div class="product-highlights">\n    <h4>Key Features & Benefits:</h4>\n    <ul>\n`;
    rawHighlights.split("\n").forEach(line => {
      if (line.trim()) {
        html += `      <li><strong>${line.trim()}</strong></li>\n`;
      }
    });
    html += `    </ul>\n  </div>\n`;
  }
  if (desc) {
    html += `  <div class="product-details">\n    <h4>Product Details & Usage:</h4>\n    <p>${desc.replace(/\n/g, '<br>')}</p>\n  </div>\n`;
  }
  html += `</div>`;

  document.getElementById("shHtmlOutput").value = html;
  showToast("Shopify HTML generated!");
}

function copyShopifyHTML() {
  const output = document.getElementById("shHtmlOutput");
  if (!output.value) generateShopifyHTML();
  navigator.clipboard.writeText(output.value).then(() => {
    showToast("HTML code copied to clipboard!");
  });
}

function generateSKUAndBarcode() {
  const prefix = document.getElementById("skuPrefix").value.trim().toUpperCase() || "SKU";
  const product = document.getElementById("skuProduct").value.trim().toUpperCase() || "PROD";
  const variant = document.getElementById("skuVariant").value.trim().toUpperCase() || "STD";

  const sku = `${prefix}-${product}-${variant}`;
  document.getElementById("lblGeneratedSKU").textContent = sku;

  // 13-digit EAN Barcode with Checksum
  const base12 = "890" + Math.floor(100000000 + Math.random() * 900000000); // 890 is India GS1 country code
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(base12[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  const barcode = base12 + checkDigit;

  document.getElementById("lblGeneratedBarcode").textContent = barcode;
  showToast("SKU & EAN-13 generated!");
}

function addShopifyRow(title = "", sku = "", price = 0, comparePrice = 0, qty = 10, vendor = "My Store") {
  const tbody = document.getElementById("shopifyCsvTableBody");
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="text" class="form-control sh-title" value="${title}" placeholder="Product Title"></td>
    <td><input type="text" class="form-control sh-sku" value="${sku}" placeholder="SKU"></td>
    <td><input type="number" class="form-control sh-price" value="${price}" step="0.01"></td>
    <td><input type="number" class="form-control sh-compare" value="${comparePrice}" step="0.01"></td>
    <td><input type="number" class="form-control sh-qty" value="${qty}" min="0"></td>
    <td><input type="text" class="form-control sh-vendor" value="${vendor}"></td>
    <td><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove();">✕</button></td>
  `;
  tbody.appendChild(tr);
}

function exportShopifyCSV() {
  const rows = document.querySelectorAll("#shopifyCsvTableBody tr");
  let csvContent = "Handle,Title,Body (HTML),Vendor,Type,Tags,Published,Variant SKU,Variant Price,Variant Compare At Price,Variant Inventory Qty\n";

  rows.forEach(row => {
    const title = row.querySelector(".sh-title").value.trim();
    const sku = row.querySelector(".sh-sku").value.trim();
    const price = row.querySelector(".sh-price").value;
    const compare = row.querySelector(".sh-compare").value;
    const qty = row.querySelector(".sh-qty").value;
    const vendor = row.querySelector(".sh-vendor").value.trim();

    if (title) {
      const handle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const bodyHtml = `"<p>${title} manufactured with high quality ingredients.</p>"`;
      csvContent += `"${handle}","${title}",${bodyHtml},"${vendor}","Health & Wellness","Pharma,Supplement",TRUE,"${sku}",${price},${compare},${qty}\n`;
    }
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `shopify_products_bulk_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Shopify CSV exported!");
}

// ==================== 8. SETTINGS & DATA BACKUP ====================

function initSettingsModule() {
  // Load saved profile
  document.getElementById("setStoreName").value = storeProfile.name;
  document.getElementById("setStoreAddress").value = storeProfile.address;
  document.getElementById("setStorePhone").value = storeProfile.phone;
  document.getElementById("setStoreEmail").value = storeProfile.email;
  document.getElementById("setStoreGSTIN").value = storeProfile.gstin;
  document.getElementById("setStoreDL").value = storeProfile.dl;

  document.getElementById("btnSaveStoreProfile").addEventListener("click", () => {
    storeProfile = {
      name: document.getElementById("setStoreName").value.trim(),
      address: document.getElementById("setStoreAddress").value.trim(),
      phone: document.getElementById("setStorePhone").value.trim(),
      email: document.getElementById("setStoreEmail").value.trim(),
      gstin: document.getElementById("setStoreGSTIN").value.trim(),
      dl: document.getElementById("setStoreDL").value.trim()
    };
    localStorage.setItem("pharmasuite_store_profile", JSON.stringify(storeProfile));
    showToast("Store profile saved successfully!");
  });

  // Export JSON Backup
  document.getElementById("btnExportBackup").addEventListener("click", () => {
    const backupData = {
      theme: currentTheme,
      storeProfile: storeProfile,
      invoices: savedInvoices,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pharmasuite_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Backup JSON downloaded!");
  });

  // Import JSON Backup
  document.getElementById("importBackupFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.storeProfile) {
          storeProfile = data.storeProfile;
          localStorage.setItem("pharmasuite_store_profile", JSON.stringify(storeProfile));
        }
        if (data.invoices) {
          savedInvoices = data.invoices;
          localStorage.setItem("pharmasuite_invoices", JSON.stringify(savedInvoices));
          renderInvoiceHistory();
        }
        showToast("Backup restored successfully!");
      } catch (err) {
        showToast("Invalid backup JSON file.", true);
      }
    };
    reader.readAsText(file);
  });

  // Clear all data
  document.getElementById("btnClearAllData").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all saved invoices and reset preferences?")) {
      localStorage.clear();
      savedInvoices = [];
      renderInvoiceHistory();
      showToast("All data cleared.");
    }
  });
}

// ==================== 9. SERVICE WORKER ====================

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("Service Worker registered for offline use."))
      .catch((err) => console.log("Service Worker registration skipped:", err));
  }
}
