// CTF accordion toggle
function toggleCTF(btn) {
  const detail = btn.nextElementSibling;
  const isOpen = detail.classList.contains('open');
  detail.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.innerHTML = isOpen
    ? '<i class="ctf-toggle-icon">›</i> View Write-Up'
    : '<i class="ctf-toggle-icon">›</i> Close Write-Up';
}

// Scroll-triggered fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.fade-in').forEach((el, i) => {
        el.style.animationDelay = (i * 0.1) + 's';
        el.style.animation = 'fadeUp 0.5s forwards';
        el.style.opacity = '0';
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('section').forEach(s => observer.observe(s));
