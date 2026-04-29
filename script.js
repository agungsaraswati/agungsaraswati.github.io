// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', next);
});

// ── MOBILE NAV TOGGLE ──
const menuBtn = document.getElementById('menuBtn');
const navEl = document.querySelector('nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navEl.classList.toggle('open');
    menuBtn.textContent = navEl.classList.contains('open') ? '✕' : '☰';
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navEl.classList.remove('open');
      menuBtn.textContent = '☰';
    });
  });
}

// ── CTF ACCORDION TOGGLE ──
function toggleCTF(btn) {
  const detail = btn.nextElementSibling;
  const isOpen = detail.classList.contains('open');
  detail.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.innerHTML = isOpen
    ? '<i class="ctf-toggle-icon">›</i> View Write-Up'
    : '<i class="ctf-toggle-icon">›</i> Close Write-Up';
}

// ── SCROLL-TRIGGERED FADE-UP ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── TERMINAL TYPEWRITER ──
const termLines = [
  { type: 'cmd',  prompt: 'diah@kali:~$', text: 'whoami' },
  { type: 'out',  text: 'i-gusti-agung-diah-saraswati' },
  { type: 'cmd',  prompt: 'diah@kali:~$', text: 'cat findings.txt' },
  { type: 'hi',   text: '[HIGH]  Metabase JWT Token Exposure    CVSS: 8.1' },
  { type: 'hi',   text: '[HIGH]  Broken Access Control – BAC    CVSS: 8.1' },
  { type: 'hi',   text: '[HIGH]  S3 Bucket Public Exposure       CVSS: 7.5' },
  { type: 'out',  text: '[MED]   PII Exposure – Member List      CVSS: 6.5' },
  { type: 'cmd',  prompt: 'diah@kali:~$', text: 'nmap -sV --open target.corp' },
  { type: 'ok',   text: 'Responsible disclosure complete ✓' },
  { type: 'cmd',  prompt: 'diah@kali:~$', text: '' },
];

(function runTerminal() {
  const body = document.getElementById('term-body');
  if (!body) return;
  let li = 0, ci = 0;

  function build() {
    let html = '';
    for (let i = 0; i < li; i++) {
      const l = termLines[i];
      if (l.type === 'cmd') {
        html += `<div class="t-line"><span class="t-prompt">${l.prompt}</span>&nbsp;<span class="t-cmd">${l.text}</span></div>`;
      } else {
        const cls = l.type === 'hi' ? 't-hi' : l.type === 'ok' ? 't-ok' : 't-out';
        html += `<div class="${cls}">${l.text}</div>`;
      }
    }
    if (li < termLines.length) {
      const cur = termLines[li];
      if (cur.type === 'cmd') {
        html += `<div class="t-line"><span class="t-prompt">${cur.prompt}</span>&nbsp;<span class="t-cmd">${cur.text.slice(0, ci)}</span><span class="t-cursor"></span></div>`;
      }
    }
    body.innerHTML = html;
  }

  function tick() {
    if (li >= termLines.length) return;
    const cur = termLines[li];
    if (cur.type === 'cmd') {
      if (ci < cur.text.length) {
        ci++; build();
        setTimeout(tick, 60 + Math.random() * 35);
      } else {
        setTimeout(() => { li++; ci = 0; build(); setTimeout(tick, 120); }, 400);
      }
    } else {
      li++; build();
      setTimeout(tick, 160);
    }
  }
  setTimeout(tick, 1000);
})();

// ── CTF TOGGLE (event delegation, removes need for inline onclick) ──
document.querySelectorAll('.ctf-toggle').forEach(btn => {
  btn.addEventListener('click', () => toggleCTF(btn));
});

// ── EMAIL DECODE (anti-scraper: reconstructs mailto from data attributes) ──
document.querySelectorAll('.js-email').forEach(el => {
  const email = el.dataset.m + '@' + el.dataset.d;
  el.href = 'mailto:' + email;
  const val = el.querySelector('.js-email-val');
  if (val) val.textContent = email;
});

// ── BACK TO TOP ──
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
