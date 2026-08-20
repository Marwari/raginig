/**
 * Minimalist Academic Chemistry Portal — Dr. Ragini Gupta
 * Department of Chemistry, ITM Gorakhpur
 * AKTU B.Tech Applied Chemistry (AAS102D/AAS202D & AAS102A/AAS202A)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSyllabus();
  initNotes();
  initAssignments();
});

/* ==========================================================================
   1. Theme Toggle (Clear & Intuitive)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const iconEl = document.getElementById('theme-icon');
  const labelEl = document.getElementById('theme-label');

  const saved = localStorage.getItem('ragini_portal_theme') || 'light';
  applyTheme(saved);

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('ragini_portal_theme', theme);

    if (theme === 'dark') {
      iconEl.textContent = '☀️';
      labelEl.textContent = 'Light Mode';
      toggleBtn.setAttribute('title', 'Switch to Light Theme');
    } else {
      iconEl.textContent = '🌙';
      labelEl.textContent = 'Dark Mode';
      toggleBtn.setAttribute('title', 'Switch to Dark Theme');
    }
  }

  toggleBtn.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} theme`);
  });
}

/* ==========================================================================
   2. Course Notes (The 2 Official Units)
   ========================================================================== */
const NOTES_DATA = [
  {
    id: 'unit-1-hardware',
    code: 'UNIT I &bull; AAS102D / AAS202D',
    title: 'Chemistry of Hardware Materials (Smart Systems)',
    desc: 'Silicon crystal structure, n-type & p-type doping, energy band theory, PCB FR-4 chemistry, copper etching (FeCl₃), soldering alloys (SAC305), flux mechanisms, dielectrics, and corrosion reliability.',
    filename: 'Unit_I_Chemistry_of_Hardware_Materials_Dr_Ragini_Gupta.pdf',
    summaryText: `AKTU Applied Chemistry for Smart Systems — Unit I: Chemistry of Hardware Materials. Covering Silicon bonding, Band theory, PCB manufacturing, Soldering chemistry, Dielectrics, and Electronic corrosion.`,
    body: `
      <p class="doc-badge">AKTU Applied Chemistry for Smart Systems &bull; Code: AAS102D/AAS202D</p>
      
      <h3>1. Basic Chemistry &amp; Materials Used in Hardware</h3>
      <p>Every component in hardware is constructed from atoms whose electronic structure dictates bonding, chemical stability, and electrical performance.</p>
      <ul>
        <li><strong>Silicon (Si):</strong> Diamond-cubic tetrahedral covalent semiconductor forming the foundation of microchips.</li>
        <li><strong>Copper (Cu):</strong> Metallic bonded conductor with delocalized mobile electrons for PCB tracks and component leads.</li>
        <li><strong>FR-4 Glass-Epoxy:</strong> Composite of woven silicate glass fibers in a cross-linked polymer network (β-hydroxy amine linkages) providing flame retardancy and mechanical isolation.</li>
        <li><strong>SAC Solder (Sn-Ag-Cu):</strong> Lead-free low-melting alloy (e.g. SAC305: 96.5% Sn, 3.0% Ag, 0.5% Cu) used to form reliable electrical joints.</li>
      </ul>

      <h3>2. Silicon &amp; Doping Chemistry</h3>
      <p>Pure (intrinsic) silicon has 4 valence electrons ($2, 8, 4$). Thermal generation creates equal electron and hole concentrations ($n = p = n_i$).</p>
      <div class="formula-box">
        Mass-Action Law: np = n_i² &nbsp;&bull;&nbsp; p = n_i² / n
      </div>
      <ul>
        <li><strong>n-type Doping (Donors):</strong> Doped with Group 15 elements (P, As, Sb). Four electrons form covalent bonds; the 5th electron easily enters the conduction band (electrons are majority carriers).</li>
        <li><strong>p-type Doping (Acceptors):</strong> Doped with Group 13 elements (B, Al, Ga). Three electrons form bonds, leaving an unfilled position called a hole (holes are majority carriers).</li>
      </ul>

      <h3>3. Electronic Energy Bands</h3>
      <div class="formula-box">
        Forbidden Energy Gap: E_g = E_c - E_v &nbsp;(in eV)
      </div>
      <ul>
        <li><strong>Conductors:</strong> Overlapping valence and conduction bands ($E_g \approx 0$).</li>
        <li><strong>Semiconductors:</strong> Small energy gap ($E_g \approx 1.12\\text{ eV}$ for Si at 300 K); carriers excited thermally.</li>
        <li><strong>Insulators:</strong> Large energy gap ($E_g > 5\\text{ eV}$); minimal conduction under ordinary fields.</li>
      </ul>

      <h3>4. PCB Chemistry &amp; Copper Etching</h3>
      <p>Copper tracks are formed by chemically dissolving unprotected copper using ferric chloride:</p>
      <div class="formula-box">
        Cu + 2FeCl₃ &rarr; CuCl₂ + 2FeCl₂ &nbsp;&bull;&nbsp; Oxidation: Cu &rarr; Cu²⁺ + 2e⁻
      </div>

      <h3>5. Soldering, Flux &amp; Intermetallic Layers</h3>
      <p>Flux removes copper surface oxide via organic acid reactions:</p>
      <div class="formula-box">
        CuO + 2RCOOH &rarr; Cu(RCOO)₂ + H₂O
      </div>
      <p>Wetting at the joint boundary forms a metallurgical copper-tin intermetallic compound layer ($\text{Cu}_6\text{Sn}_5$).</p>

      <h3>6. Insulators, Dielectrics &amp; Capacitance</h3>
      <div class="formula-box">
        C = (&epsilon;₀ &times; &epsilon;_r &times; A) / d &nbsp;&bull;&nbsp; &epsilon;_0 = 8.85 &times; 10⁻¹² F/m
      </div>

      <h3>7. Reliability &amp; Corrosion Processes</h3>
      <ul>
        <li><strong>Electrochemical Migration:</strong> Moisture + ionic residue + DC bias causes copper dissolution at the anode ($\text{Cu} \rightarrow \text{Cu}^{2+} + 2e^-$) and dendrite growth toward the cathode, causing short circuits.</li>
        <li><strong>Galvanic Corrosion:</strong> Occurs when dissimilar metals touch in the presence of an electrolyte film.</li>
      </ul>
    `
  },
  {
    id: 'unit-3-water',
    code: 'UNIT III &bull; AAS102A / AAS202A',
    title: 'Water Chemistry and Treatment (B.Tech Applied Chemistry)',
    desc: 'Hardness of water (temporary & permanent), EDTA complexometric titration, alkalinity (P & M titration), dissolved oxygen (Winkler method), BOD, COD, conventional water treatment, Zeolite/Permutit process, and Ion-Exchange demineralization with complete numericals.',
    filename: 'Unit_III_Water_Chemistry_and_Treatment_Dr_Ragini_Gupta.pdf',
    summaryText: `AKTU B.Tech Applied Chemistry — Unit III: Water Chemistry and Treatment. Covering Hardness calculations, Alkalinity, DO, BOD/COD, Coagulation, Zeolite process, and Ion-Exchange demineralization.`,
    body: `
      <p class="doc-badge">B.Tech First Year Applied Chemistry &bull; Code: AAS102A/AAS202A</p>

      <h3>1. Molecular Structure &amp; Hardness of Water</h3>
      <p>Water ($\text{H}_2\text{O}$) is a bent polar molecule ($104.5^\circ$ bond angle) with strong intermolecular hydrogen bonding.</p>
      <ul>
        <li><strong>Temporary Hardness (Carbonate):</strong> Due to $\text{Ca(HCO}_3)_2$ and $\text{Mg(HCO}_3)_2$. Removed by simple boiling:
          <br><code>Ca(HCO₃)₂ &rarr; CaCO₃&darr; + CO₂&uarr; + H₂O</code></li>
        <li><strong>Permanent Hardness (Non-carbonate):</strong> Due to chlorides and sulfates ($\text{CaCl}_2, \text{MgCl}_2, \text{CaSO}_4, \text{MgSO}_4$). Cannot be removed by boiling.</li>
      </ul>

      <div class="formula-box">
        CaCO₃ Equivalent (mg/L) = [Mass of Salt &times; 50] / [Equivalent Mass of Salt]
      </div>

      <h3>2. Alkalinity of Water &amp; Titration (P &amp; M)</h3>
      <p>Alkalinity is determined by titrating with standard acid against Phenolphthalein ($P$, endpoint pH 8.3) and Methyl Orange ($M$, endpoint pH 4.5):</p>
      <ul>
        <li><code>P = 0</code>: Only Bicarbonate ($\text{HCO}_3^-$) present.</li>
        <li><code>P = M/2</code>: Only Carbonate ($\text{CO}_3^{2-}$) present.</li>
        <li><code>P &gt; M/2</code>: Hydroxide ($\text{OH}^-$) and Carbonate ($\text{CO}_3^{2-}$) present.</li>
        <li><code>P = M</code>: Only Hydroxide ($\text{OH}^-$) present.</li>
      </ul>

      <h3>3. Dissolved Oxygen (DO), BOD &amp; COD</h3>
      <ul>
        <li><strong>Winkler Iodometric Method for DO:</strong>
          <br><code>2Mn(OH)₂ + O₂ &rarr; 2MnO(OH)₂</code>
          <br><code>MnO(OH)₂ + 2I⁻ + 4H⁺ &rarr; Mn²⁺ + I₂ + 3H₂O</code>
          <br><code>I₂ + 2S₂O₃²⁻ &rarr; 2I⁻ + S₄O₆²⁻</code>
          <br><code>DO (mg/L) = [V(thiosulphate) &times; N &times; 8000] / V(sample)</code>
        </li>
        <li><strong>BOD (Biochemical Oxygen Demand):</strong> Oxygen consumed by aerobic microbes over 5 days at 20&deg;C in the dark.</li>
        <li><strong>COD (Chemical Oxygen Demand):</strong> Total oxygen required to chemically oxidize organic and inorganic pollutants with hot acidic $\text{K}_2\text{Cr}_2\text{O}_7$.</li>
      </ul>

      <h3>4. Conventional Water Treatment</h3>
      <p>Standard purification sequence: <strong>Aeration &rarr; Coagulation (Alum) &rarr; Flocculation &rarr; Sedimentation &rarr; Rapid Sand Filtration &rarr; Disinfection (Chlorination / UV / Ozone)</strong>.</p>
      <div class="formula-box">
        Alum Coagulation: Al₂(SO₄)₃&middot;18H₂O + 3Ca(HCO₃)₂ &rarr; 2Al(OH)₃&darr; + 3CaSO₄ + 6CO₂ + 18H₂O
      </div>

      <h3>5. Zeolite / Permutit Softening Process</h3>
      <p>Hydrated sodium alumino-silicate ($\text{Na}_2\text{Z}$) exchanges $\text{Na}^+$ ions for $\text{Ca}^{2+}$ and $\text{Mg}^{2+}$:</p>
      <div class="formula-box">
        Softening: Ca(HCO₃)₂ + Na₂Z &rarr; CaZ + 2NaHCO₃<br>
        Regeneration: CaZ + 2NaCl (10% brine) &rarr; Na₂Z + CaCl₂
      </div>

      <h3>6. Ion-Exchange (Demineralization) Process</h3>
      <p>Produces completely demineralized / deionized water (< 2 ppm hardness):</p>
      <ul>
        <li><strong>Cation Resin ($RH$):</strong> <code>2RH + CaSO₄ &rarr; R₂Ca + H₂SO₄</code> (Regenerated with dilute $\text{HCl}$ or $\text{H}_2\text{SO}_4$)</li>
        <li><strong>Anion Resin ($R'OH$):</strong> <code>R'OH + Cl⁻ &rarr; R'Cl + OH⁻</code> (Regenerated with dilute $\text{NaOH}$)</li>
        <li><code>H⁺ + OH⁻ &rarr; H₂O</code></li>
      </ul>
    `
  }
];

function initNotes() {
  const list = document.getElementById('notes-list');
  if (!list) return;

  list.innerHTML = NOTES_DATA.map(note => `
    <div class="note-item">
      <div class="note-info">
        <div class="note-meta">
          <span class="note-code">${note.code}</span>
        </div>
        <h3 class="note-title-text">${note.title}</h3>
        <p class="note-desc">${note.desc}</p>
      </div>
      <div class="note-actions">
        <button class="btn btn-outline btn-sm view-note-btn" data-id="${note.id}">View Online</button>
        <button class="btn btn-primary btn-sm dl-note-btn" data-id="${note.id}" data-file="${note.filename}">Download PDF</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.view-note-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openModal(id);
    });
  });

  list.querySelectorAll('.dl-note-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const note = NOTES_DATA.find(n => n.id === id);
      if (note) {
        downloadDocumentFile(note.filename, generateOfficialDocumentText(note));
      }
    });
  });

  initModal();
}

function initModal() {
  const modal = document.getElementById('note-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const tagEl = document.getElementById('modal-tag');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const printBtn = document.getElementById('modal-print-btn');
  const dlBtn = document.getElementById('modal-download-btn');

  let activeNote = null;

  window.openModal = function(id) {
    activeNote = NOTES_DATA.find(n => n.id === id);
    if (!activeNote) return;

    tagEl.innerHTML = activeNote.code;
    titleEl.textContent = activeNote.title;
    bodyEl.innerHTML = activeNote.body;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  printBtn.addEventListener('click', () => window.print());

  dlBtn.addEventListener('click', () => {
    if (activeNote) {
      downloadDocumentFile(activeNote.filename, generateOfficialDocumentText(activeNote));
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function generateOfficialDocumentText(note) {
  return `========================================================================
DR. RAGINI GUPTA — DEPARTMENT OF CHEMISTRY
INSTITUTE OF TECHNOLOGY & MANAGEMENT (ITM), GORAKHPUR
========================================================================
COURSE MODULE: ${note.title.toUpperCase()}
PAPER / SUBJECT CODE: ${note.code.replace('&bull;', '•')}
ACADEMIC SESSION: 2026–2027

OVERVIEW:
${note.desc}

CORE TOPICS COVERED:
1. Fundamental Definitions, Reaction Schemes & Molecular Principles
2. Detailed Reaction Mechanisms & Structural Chemistry
3. Engineering Applications & Process Flowsheets
4. Standard Governing Equations & Step-by-Step Solved Numericals
5. University Examination Review Checklist

Standard References Used:
- Shashi Chawla, Engineering Chemistry
- P. C. Jain & Monika Jain, Engineering Chemistry
- S. S. Dara & S. S. Umare, A Textbook of Engineering Chemistry
- Callister & Rethwisch, Materials Science and Engineering

(c) 2026 Dr. Ragini Gupta. Official course material for ITM Gorakhpur students.
========================================================================`;
}

/* ==========================================================================
   3. Assignments & Tutorial Problem Sheets
   ========================================================================== */
const ASSIGNMENTS_DATA = [
  {
    num: 'Problem Sheet #01 &bull; Unit III',
    title: 'Water Hardness, Zeolite Softening & Ion-Exchange Numericals',
    due: 'Topic: CaCO₃ Equivalents, NaCl Brine & Acid/Base Regeneration Calculations',
    file: 'ITM_Chemistry_Unit3_Water_Treatment_Numerical_Sheet.pdf'
  },
  {
    num: 'Problem Sheet #02 &bull; Unit I',
    title: 'Hardware Materials: Semiconductor Doping & Etching Stoichiometry',
    due: 'Topic: Copper Track Resistance (R = ρL/A), SAC305 Solder Mass & FeCl₃ Etching',
    file: 'ITM_Chemistry_Unit1_Hardware_Materials_Problem_Sheet.pdf'
  }
];

function initAssignments() {
  const list = document.getElementById('assignment-list');
  if (!list) return;

  list.innerHTML = ASSIGNMENTS_DATA.map(item => `
    <div class="assignment-item">
      <div class="assignment-info">
        <span class="assignment-num">${item.num}</span>
        <h3 class="assignment-title">${item.title}</h3>
        <p class="assignment-due">${item.due}</p>
      </div>
      <button class="btn btn-outline btn-sm dl-pset-btn" data-file="${item.file}" data-title="${item.title}">Download Sheet</button>
    </div>
  `).join('');

  list.querySelectorAll('.dl-pset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const file = e.currentTarget.getAttribute('data-file');
      const title = e.currentTarget.getAttribute('data-title');
      downloadDocumentFile(file, `========================================================================
DR. RAGINI GUPTA — DEPARTMENT OF CHEMISTRY, ITM GORAKHPUR
TUTORIAL & NUMERICAL PROBLEM SHEET
Topic: ${title}
========================================================================

INSTRUCTIONS FOR STUDENTS:
1. Solve all numerical problems with proper formulas, given data, units and conversions.
2. Submit completed handwritten tutorial sheets in the next scheduled chemistry class.
========================================================================`);
    });
  });
}

/* ==========================================================================
   4. AKTU Syllabus 2026 — Branch-wise
   ========================================================================== */
const SYLLABUS_DATA = [
  {
    id: 'cse',
    branch: 'Computer Science Engineering (CSE)',
    code: 'B.Tech CSE',
    icon: '💻',
    docs: [
      { label: 'Theory Syllabus', url: 'https://drive.google.com/file/d/1eZNAB2L0EvQIDZFPYUgNXBVvt8PiVVgA/view?usp=sharing' },
      { label: 'Lab / Practical Syllabus', url: 'https://drive.google.com/file/d/1eCovf3N2LbxUmexXAm1hVM8L1_0_-j1I/view?usp=sharing' }
    ]
  },
  {
    id: 'ece',
    branch: 'Electronics & Communication Engineering (ECE)',
    code: 'B.Tech ECE',
    icon: '📡',
    docs: [
      { label: 'Theory Syllabus', url: 'https://drive.google.com/file/d/1Bq1yx7iEJbE1hB0OxV0G2vgbXUlvQu2K/view?usp=sharing' },
      { label: 'Lab / Practical Syllabus', url: 'https://drive.google.com/file/d/1ARXVgSXew0c1XvsWHYNuwwrGwBPNL7lP/view?usp=sharing' }
    ]
  },
  {
    id: 'me',
    branch: 'Mechanical Engineering (ME)',
    code: 'B.Tech ME',
    icon: '⚙️',
    docs: [
      { label: 'Theory Syllabus', url: 'https://drive.google.com/file/d/1_2t3jlHuPkUaWUTkRM-VbU4eN6trS6Jv/view?usp=sharing' },
      { label: 'Lab / Practical Syllabus', url: 'https://drive.google.com/file/d/1JKVURFfrU07FEpwf1vTGkeuDVEtDf-Z7/view?usp=sharing' }
    ]
  },
  {
    id: 'ce',
    branch: 'Civil Engineering (CE)',
    code: 'B.Tech CE',
    icon: '🏗️',
    docs: [
      { label: 'Theory Syllabus', url: 'https://drive.google.com/file/d/1Qt5MhDMcg6OxjAusQvSYHVQis4Ud5b2J/view?usp=sharing' },
      { label: 'Lab / Practical Syllabus', url: 'https://drive.google.com/file/d/14g6EM_HwQOxsvm_Pf6YfkA6w8SSOt2up/view?usp=sharing' }
    ]
  }
];

function initSyllabus() {
  const grid = document.getElementById('syllabus-grid');
  if (!grid) return;

  grid.innerHTML = SYLLABUS_DATA.map(branch => {
    const hasDocs = branch.docs.length > 0;

    const docsHtml = hasDocs
      ? branch.docs.map(doc => `
          <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="syllabus-link">
            <svg class="drive-icon" width="18" height="18" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="a${doc.label.replace(/\s/g,'')}" width="168" height="154" x="12" y="18" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#b43333" d="M63.09 37c14.626-25.333 51.193-25.334 65.819 0l45.033 78c14.626 25.334-3.657 57.001-32.91 57.001H50.967c-29.253 0-47.536-31.667-32.91-57.001z"/></mask><g mask="url(#a${doc.label.replace(/\s/g,'')})"><path fill="url(#b${doc.label.replace(/\s/g,'')})" d="M206.905 172.02h-91.888l-19.015-32.934 45.944-79.578z"/><path fill="url(#c${doc.label.replace(/\s/g,'')})" d="M-14.919 172.006 50.04 59.494v.002L31.032 92.422h38.02L115 172.004l-129.918.001z"/><path fill="url(#d${doc.label.replace(/\s/g,'')})" d="M96.007-20.085 141.954 59.5l-19.011 32.928H31.048z"/></g><defs><linearGradient id="b${doc.label.replace(/\s/g,'')}" x1="193.6" x2="103.09" y1="165.6" y2="111.21" gradientUnits="userSpaceOnUse"><stop offset=".09" stop-color="#ffe921"/><stop offset="1" stop-color="#fec700"/></linearGradient><linearGradient id="c${doc.label.replace(/\s/g,'')}" x1="114.4" x2="15.53" y1="181.61" y2="121.8" gradientUnits="userSpaceOnUse"><stop offset=".15" stop-color="#a9a8ff"/><stop offset=".33" stop-color="#6d97ff"/><stop offset=".48" stop-color="#3186ff"/></linearGradient><linearGradient id="d${doc.label.replace(/\s/g,'')}" x1="128.88" x2="28.7" y1="37.88" y2="84.64" gradientUnits="userSpaceOnUse"><stop offset=".55" stop-color="#0ebc5f"/><stop offset=".85" stop-color="#78c9ff"/></linearGradient></defs></svg>
            ${doc.label}
            <svg class="ext-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        `).join('')
      : `<div class="syllabus-coming-soon">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
           Coming Soon — Syllabus will be uploaded shortly
         </div>`;

    return `
      <div class="syllabus-card ${hasDocs ? '' : 'syllabus-card--pending'}">
        <div class="syllabus-card-header" data-branch="${branch.id}">
          <div class="syllabus-card-left">
            <span class="syllabus-icon">${branch.icon}</span>
            <div>
              <h3 class="syllabus-branch">${branch.branch}</h3>
              <span class="syllabus-code">${branch.code}</span>
            </div>
          </div>
          <div class="syllabus-card-right">
            ${hasDocs ? `<span class="syllabus-status syllabus-status--available">Available</span>` : `<span class="syllabus-status syllabus-status--pending">Pending</span>`}
            <svg class="syllabus-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div class="syllabus-card-body" id="syllabus-body-${branch.id}">
          ${docsHtml}
        </div>
      </div>
    `;
  }).join('');

  // Accordion toggle
  grid.querySelectorAll('.syllabus-card-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.syllabus-card');
      card.classList.toggle('syllabus-card--open');
    });
  });

  // Auto-expand CSE since it has content
  const cseCard = grid.querySelector('[data-branch="cse"]')?.closest('.syllabus-card');
  if (cseCard) cseCard.classList.add('syllabus-card--open');
}

/* ==========================================================================
   5. Downloads Helper
   ========================================================================== */

function downloadDocumentFile(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Downloaded: ${filename}`);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
