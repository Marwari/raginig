/**
 * Minimalist Academic Chemistry Portal — Dr. Ragini Gupta
 * Department of Chemistry, ITM Gorakhpur
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSyllabus();
  initNotes();
  initAssignments();
});

/* ==========================================================================
   1. Theme Toggle
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
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ==========================================================================
   Drive Icon & Helper Components
   ========================================================================== */
function getDriveIcon() {
  return `<svg class="drive-icon" width="18" height="18" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg"><path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/><path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z" fill="#00ac47"/><path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.95 10.3z" fill="#ea4335"/><path d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/><path d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h36.85c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/><path d="M73.4 26.5 60.65 3.3c-.8-1.4-1.95-2.5-3.3-3.3L43.6 25l16.15 28h27.5c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/></svg>`;
}

function getExtIcon() {
  return `<svg class="ext-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
}

function renderAccordion(container, data, itemKey, autoOpenId) {
  if (!container) return;

  container.innerHTML = data.map(branch => {
    const items = branch[itemKey] || [];
    const hasAnyUrl = items.some(i => i.url);

    const itemsHtml = items.map(item => {
      if (item.url) {
        return `
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="syllabus-link">
            ${getDriveIcon()}
            <span>${item.label}</span>
            ${getExtIcon()}
          </a>`;
      }
      return `
        <div class="syllabus-link syllabus-link--disabled">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>${item.label} — Coming Soon</span>
        </div>`;
    }).join('');

    return `
      <div class="syllabus-card ${hasAnyUrl ? '' : 'syllabus-card--pending'}" data-card-id="${branch.id}">
        <div class="syllabus-card-header">
          <div class="syllabus-card-left">
            <span class="syllabus-icon">${branch.icon}</span>
            <div>
              <h3 class="syllabus-branch">${branch.branch}</h3>
              <span class="syllabus-code">${branch.code}</span>
            </div>
          </div>
          <div class="syllabus-card-right">
            <span class="syllabus-status ${hasAnyUrl ? 'syllabus-status--available' : 'syllabus-status--pending'}">
              ${hasAnyUrl ? 'Available' : 'Coming Soon'}
            </span>
            <svg class="syllabus-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div class="syllabus-card-body">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.syllabus-card-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.syllabus-card').classList.toggle('syllabus-card--open');
    });
  });

  // Open all cards that have content by default
  container.querySelectorAll('.syllabus-card').forEach(card => {
    if (card.querySelector('.syllabus-status--available')) {
      card.classList.add('syllabus-card--open');
    }
  });
}

/* ==========================================================================
   2. AKTU Syllabus 2026
   ========================================================================== */
const SYLLABUS_DATA = [
  {
    id: 's-cse',
    branch: 'Computer Science Engineering (CSE)',
    code: 'B.Tech CSE',
    icon: '💻',
    docs: [
      { label: 'Theory Syllabus', url: 'https://drive.google.com/file/d/1eZNAB2L0EvQIDZFPYUgNXBVvt8PiVVgA/view?usp=sharing' },
      { label: 'Lab / Practical Syllabus', url: 'https://drive.google.com/file/d/1eCovf3N2LbxUmexXAm1hVM8L1_0_-j1I/view?usp=sharing' }
    ]
  },
  {
    id: 's-ece',
    branch: 'Electronics & Communication Engineering (ECE)',
    code: 'B.Tech ECE',
    icon: '📡',
    docs: [
      { label: 'Theory Syllabus', url: 'https://drive.google.com/file/d/1Bq1yx7iEJbE1hB0OxV0G2vgbXUlvQu2K/view?usp=sharing' },
      { label: 'Lab / Practical Syllabus', url: 'https://drive.google.com/file/d/1ARXVgSXew0c1XvsWHYNuwwrGwBPNL7lP/view?usp=sharing' }
    ]
  },
  {
    id: 's-me',
    branch: 'Mechanical Engineering (ME)',
    code: 'B.Tech ME',
    icon: '⚙️',
    docs: [
      { label: 'Theory Syllabus', url: 'https://drive.google.com/file/d/1_2t3jlHuPkUaWUTkRM-VbU4eN6trS6Jv/view?usp=sharing' },
      { label: 'Lab / Practical Syllabus', url: 'https://drive.google.com/file/d/1JKVURFfrU07FEpwf1vTGkeuDVEtDf-Z7/view?usp=sharing' }
    ]
  },
  {
    id: 's-ce',
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
  renderAccordion(document.getElementById('syllabus-grid'), SYLLABUS_DATA, 'docs', 's-cse');
}

/* ==========================================================================
   3. Course Lecture Notes
   ========================================================================== */
const NOTES_DATA = [
  {
    id: 'n-cse',
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
    id: 'n-ece',
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
    id: 'n-me',
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
    id: 'n-ce',
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
  renderAccordion(document.getElementById('notes-list'), NOTES_DATA, 'units', 'n-cse');
}

/* ==========================================================================
   4. Assignments
   ========================================================================== */
const ASSIGNMENTS_DATA = [
  {
    id: 'a-cse',
    branch: 'Computer Science Engineering (CSE)',
    code: 'B.Tech CSE',
    icon: '💻',
    assignments: [
      { label: 'Assignment 1', url: '' },
      { label: 'Assignment 2', url: '' },
      { label: 'Assignment 3', url: '' },
      { label: 'Assignment 4', url: '' }
    ]
  },
  {
    id: 'a-ece',
    branch: 'Electronics & Communication Engineering (ECE)',
    code: 'B.Tech ECE',
    icon: '📡',
    assignments: [
      { label: 'Assignment 1', url: '' },
      { label: 'Assignment 2', url: '' },
      { label: 'Assignment 3', url: '' },
      { label: 'Assignment 4', url: '' }
    ]
  },
  {
    id: 'a-me',
    branch: 'Mechanical Engineering (ME)',
    code: 'B.Tech ME',
    icon: '⚙️',
    assignments: [
      { label: 'Assignment 1', url: '' },
      { label: 'Assignment 2', url: '' },
      { label: 'Assignment 3', url: '' },
      { label: 'Assignment 4', url: '' }
    ]
  },
  {
    id: 'a-ce',
    branch: 'Civil Engineering (CE)',
    code: 'B.Tech CE',
    icon: '🏗️',
    assignments: [
      { label: 'Assignment 1', url: '' },
      { label: 'Assignment 2', url: '' },
      { label: 'Assignment 3', url: '' },
      { label: 'Assignment 4', url: '' }
    ]
  }
];

function initAssignments() {
  renderAccordion(document.getElementById('assignment-list'), ASSIGNMENTS_DATA, 'assignments', null);
}
