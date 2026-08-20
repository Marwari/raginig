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
   2. Course Lecture Notes — Branch-wise, Unit-wise (Google Drive)
   ========================================================================== */
const NOTES_DATA = [
  {
    id: 'notes-cse',
    branch: 'Computer Science Engineering (CSE)',
    code: 'B.Tech CSE',
    icon: '💻',
    units: [
      { label: 'Unit I', url: 'https://drive.google.com/file/d/1DFsjHJqvgUFmBlJ3sFL6Itu3xK3K8L_P/view?usp=sharing' },
      { label: 'Unit II', url: '' },
      { label: 'Unit III', url: '' },
      { label: 'Unit IV', url: '' }
    ]
  },
  {
    id: 'notes-ece',
    branch: 'Electronics & Communication Engineering (ECE)',
    code: 'B.Tech ECE',
    icon: '📡',
    units: [
      { label: 'Unit I', url: 'https://drive.google.com/file/d/1Iv2wHpl_ZsVEAbQtisaSoJXfAXwHh7h8/view?usp=sharing' },
      { label: 'Unit II', url: '' },
      { label: 'Unit III', url: '' },
      { label: 'Unit IV', url: '' }
    ]
  },
  {
    id: 'notes-me',
    branch: 'Mechanical Engineering (ME)',
    code: 'B.Tech ME',
    icon: '⚙️',
    units: [
      { label: 'Unit I', url: '' },
      { label: 'Unit II', url: '' },
      { label: 'Unit III', url: '' },
      { label: 'Unit IV', url: '' }
    ]
  },
  {
    id: 'notes-ce',
    branch: 'Civil Engineering (CE)',
    code: 'B.Tech CE',
    icon: '🏗️',
    units: [
      { label: 'Unit I', url: '' },
      { label: 'Unit II', url: '' },
      { label: 'Unit III', url: 'https://drive.google.com/file/d/1TGJvs2V6pk_N6-4V0IuPAZobnAPq_B9i/view?usp=sharing' },
      { label: 'Unit IV', url: '' }
    ]
  }
];

function initNotes() {
  const list = document.getElementById('notes-list');
  if (!list) return;

  list.innerHTML = NOTES_DATA.map(branch => {
    const hasAnyUrl = branch.units.some(u => u.url);

    const unitsHtml = branch.units.map(unit => {
      if (unit.url) {
        return `
          <a href="${unit.url}" target="_blank" rel="noopener noreferrer" class="syllabus-link">
            <svg class="drive-icon" width="18" height="18" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="n${branch.id}${unit.label.replace(/\s/g,'')}" width="168" height="154" x="12" y="18" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#b43333" d="M63.09 37c14.626-25.333 51.193-25.334 65.819 0l45.033 78c14.626 25.334-3.657 57.001-32.91 57.001H50.967c-29.253 0-47.536-31.667-32.91-57.001z"/></mask><g mask="url(#n${branch.id}${unit.label.replace(/\s/g,'')})"><path fill="url(#nb${branch.id}${unit.label.replace(/\s/g,'')})" d="M206.905 172.02h-91.888l-19.015-32.934 45.944-79.578z"/><path fill="url(#nc${branch.id}${unit.label.replace(/\s/g,'')})" d="M-14.919 172.006 50.04 59.494v.002L31.032 92.422h38.02L115 172.004l-129.918.001z"/><path fill="url(#nd${branch.id}${unit.label.replace(/\s/g,'')})" d="M96.007-20.085 141.954 59.5l-19.011 32.928H31.048z"/></g><defs><linearGradient id="nb${branch.id}${unit.label.replace(/\s/g,'')}" x1="193.6" x2="103.09" y1="165.6" y2="111.21" gradientUnits="userSpaceOnUse"><stop offset=".09" stop-color="#ffe921"/><stop offset="1" stop-color="#fec700"/></linearGradient><linearGradient id="nc${branch.id}${unit.label.replace(/\s/g,'')}" x1="114.4" x2="15.53" y1="181.61" y2="121.8" gradientUnits="userSpaceOnUse"><stop offset=".15" stop-color="#a9a8ff"/><stop offset=".33" stop-color="#6d97ff"/><stop offset=".48" stop-color="#3186ff"/></linearGradient><linearGradient id="nd${branch.id}${unit.label.replace(/\s/g,'')}" x1="128.88" x2="28.7" y1="37.88" y2="84.64" gradientUnits="userSpaceOnUse"><stop offset=".55" stop-color="#0ebc5f"/><stop offset=".85" stop-color="#78c9ff"/></linearGradient></defs></svg>
            ${unit.label}
            <svg class="ext-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>`;
      } else {
        return `
          <div class="syllabus-link syllabus-link--disabled">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${unit.label} — Coming Soon
          </div>`;
      }
    }).join('');

    return `
      <div class="syllabus-card ${hasAnyUrl ? '' : 'syllabus-card--pending'}">
        <div class="syllabus-card-header" data-notes="${branch.id}">
          <div class="syllabus-card-left">
            <span class="syllabus-icon">${branch.icon}</span>
            <div>
              <h3 class="syllabus-branch">${branch.branch}</h3>
              <span class="syllabus-code">${branch.code}</span>
            </div>
          </div>
          <div class="syllabus-card-right">
            ${hasAnyUrl ? `<span class="syllabus-status syllabus-status--available">Available</span>` : `<span class="syllabus-status syllabus-status--pending">Coming Soon</span>`}
            <svg class="syllabus-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div class="syllabus-card-body" id="notes-body-${branch.id}">
          ${unitsHtml}
        </div>
      </div>
    `;
  }).join('');

  // Accordion toggle
  list.querySelectorAll('.syllabus-card-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.syllabus-card');
      card.classList.toggle('syllabus-card--open');
    });
  });

  // Auto-expand CSE since it has notes uploaded
  const cseCard = list.querySelector('[data-notes="notes-cse"]')?.closest('.syllabus-card');
  if (cseCard) cseCard.classList.add('syllabus-card--open');
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
