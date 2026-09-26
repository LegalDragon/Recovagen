/* ============================================================
   Recovagen — main.js
   Scroll animations + Chart.js amino acid chart
   ============================================================ */

// ---- Scroll Fade Animations (Intersection Observer) ----
(function initScrollAnimations() {
  // Hero elements: trigger immediately on load
  document.querySelectorAll('.hero .fade-in').forEach(function(el) {
    requestAnimationFrame(function() {
      el.classList.add('visible');
    });
  });

  // Everything else: trigger on scroll
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.fade-up').forEach(function(el) {
    observer.observe(el);
  });
})();


// ---- Stagger child cards ----
(function staggerCards() {
  var selectors = ['.collagen-types', '.benefits-grid', '.sourcing-pillars', '.product-features'];
  selectors.forEach(function(sel) {
    var container = document.querySelector(sel);
    if (!container) return;
    var children = container.querySelectorAll('.collagen-card, .benefit-card, .pillar, .pf-item');
    children.forEach(function(child, i) {
      child.style.transitionDelay = (i * 0.1) + 's';
    });
  });
})();


// ---- Nav scroll behavior ----
(function initNav() {
  var nav = document.querySelector('.nav');
  var lastScroll = 0;
  window.addEventListener('scroll', function() {
    var currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      nav.style.background = 'rgba(10,10,15,0.95)';
    } else {
      nav.style.background = 'rgba(10,10,15,0.8)';
    }
    lastScroll = currentScroll;
  }, { passive: true });
})();


// ---- Email signup (UI only) ----
(function initSignup() {
  var form = document.getElementById('signupForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn = form.querySelector('.form-btn');
    var span = btn.querySelector('span');
    span.textContent = 'You\'re on the list!';
    btn.style.background = '#7c3aed';
    btn.disabled = true;
    form.querySelectorAll('.form-input').forEach(function(inp) {
      inp.disabled = true;
    });
  });
})();


// ---- Chart.js: Amino Acid Profile ----
(function initChart() {
  var canvas = document.getElementById('aminoChart');
  if (!canvas) return;

  var aminoAcids = ['Glycine', 'Proline', 'Hydroxyproline', 'Glutamic Acid', 'Alanine'];

  // Values in mg per 10g serving (illustrative, based on published profiles)
  var recovagen  = [2800, 1350, 1100,  850, 920];
  var bovine     = [2300, 1180,  820,  780, 840];
  var marine     = [2100,  980,  750,  670, 610];

  var ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: aminoAcids,
      datasets: [
        {
          label: 'Recovagen',
          data: recovagen,
          backgroundColor: 'rgba(0,212,170,0.75)',
          borderColor: 'rgba(0,212,170,1)',
          borderWidth: 1,
          borderRadius: 4,
          borderSkipped: false
        },
        {
          label: 'Bovine Collagen',
          data: bovine,
          backgroundColor: 'rgba(124,58,237,0.65)',
          borderColor: 'rgba(124,58,237,1)',
          borderWidth: 1,
          borderRadius: 4,
          borderSkipped: false
        },
        {
          label: 'Marine Collagen',
          data: marine,
          backgroundColor: 'rgba(6,182,212,0.65)',
          borderColor: 'rgba(6,182,212,1)',
          borderWidth: 1,
          borderRadius: 4,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(13,13,20,0.95)',
          borderColor: 'rgba(0,212,170,0.2)',
          borderWidth: 1,
          titleColor: '#e8e8f0',
          bodyColor: '#8888a8',
          padding: 10,
          callbacks: {
            label: function(context) {
              return ' ' + context.dataset.label + ': ' + context.parsed.y + ' mg';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255,255,255,0.04)',
            drawBorder: false
          },
          ticks: {
            color: '#8888a8',
            font: { size: 12, family: 'Inter' }
          }
        },
        y: {
          grid: {
            color: 'rgba(255,255,255,0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#8888a8',
            font: { size: 11, family: 'Inter' },
            callback: function(val) { return val + ' mg'; }
          },
          beginAtZero: true
        }
      }
    }
  });
})();
