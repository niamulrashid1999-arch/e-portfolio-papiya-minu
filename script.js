/**
 * E-Portfolio High-Performance Interactive Animation Engine
 * Profile: Papiya Yeasmin Minu - Senior Nursing Instructor & Healthcare Leader
 * Clean, Minimalist Architecture with Modern Visual Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleBackground();
  initScrollProgress();
  initCustomCursor();
  initDynamicTyping();
  initScrollReveal();
  initCounterAnimations();
  init3DCardTilt();
  initAudioVisualizer();
  initThemeToggle();
  initNavigation();
  initResumeTabs();
  initProjectModals();
  initContactForm();
  initScrollSpy();
  initCopyButtons();
  initMagneticButtons();
});

/* ==========================================================================
   1. Interactive Particle / Neural Constellation Background Canvas
   ========================================================================== */
function initParticleBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: null, y: null, radius: 140 };
  let isMouseInWindow = false;

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    isMouseInWindow = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    isMouseInWindow = false;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  });

  let particles = [];
  const particleDensity = Math.floor((width * height) / 14000); // Responsive count
  const particleCount = Math.min(Math.max(particleDensity, 40), 95);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.size = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive gravitational repulsion
      if (isMouseInWindow && mouse.x !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          let dirX = (dx / dist) * force * 2.5;
          let dirY = (dy / dist) * force * 2.5;
          this.x -= dirX;
          this.y -= dirY;
        }
      }
    }
    draw(isDark) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(56, 189, 248, ${this.baseAlpha * 0.7})`
        : `rgba(18, 18, 18, ${this.baseAlpha * 0.45})`;
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  createParticles();

  let isTabActive = true;
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
    if (isTabActive) requestAnimationFrame(render);
  });

  function render() {
    if (!isTabActive) return;

    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Draw connecting lines between close particles
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(isDark);

      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          let alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${alpha})`
            : `rgba(18, 18, 18, ${alpha * 0.8})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Draw subtle connecting line to cursor
      if (isMouseInWindow && mouse.x !== null) {
        let dx = particles[i].x - mouse.x;
        let dy = particles[i].y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let alpha = (1 - dist / mouse.radius) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${alpha})`
            : `rgba(18, 18, 18, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   2. Scroll Progress Bar
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}

/* ==========================================================================
   3. Custom Minimalist Smooth Cursor
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('custom-cursor-dot');
  if (!cursor || !dot) return;

  // Don't activate on touch screens
  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      document.body.classList.add('cursor-active');
      isMoving = true;
    }
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Lerp smoothing animation loop for the trailing ring
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states on interactive elements
  const interactives = document.querySelectorAll('a, button, input, textarea, .project-case-card, .pillar-card, .tab-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

/* ==========================================================================
   4. Dynamic Typing Effect for Hero Subtitle
   ========================================================================== */
function initDynamicTyping() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const phrases = [
    "Adult Critical Care & Trauma Nursing",
    "Evidence-Based Pressure Ulcer Research",
    "National Nurse Teachers' Curriculum Reform",
    "WHO Disaster Emergency Response",
    "Postgraduate Nursing Thesis Mentorship",
    "Advanced Midwifery & Obstetric Care"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseTime = 2200;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      target.textContent = currentPhrase.substring(0, charIndex);
    } else {
      charIndex++;
      target.textContent = currentPhrase.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }

    const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(typeLoop, currentSpeed);
  }

  typeLoop();
}

/* ==========================================================================
   5. Scroll-Triggered Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. Animated Number Counters
   ========================================================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetNum = parseInt(counter.getAttribute('data-target'), 10);
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeProgress * targetNum);

          counter.textContent = currentCount.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = targetNum.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(updateCount);
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   7. 3D Perspective Card Tilt with Specular Glare
   ========================================================================== */
function init3DCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const tiltCards = document.querySelectorAll('.pillar-card, .project-case-card, .edu-card, .hero-image-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    });
  });
}

/* ==========================================================================
   8. Video Player Audio Visualizer Equalizer Simulation
   ========================================================================== */
function initAudioVisualizer() {
  const container = document.getElementById('visualizer-bars');
  if (!container) return;

  // Generate 28 equalizer bars
  container.innerHTML = '';
  const barCount = 28;
  const bars = [];

  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'visualizer-bar';
    container.appendChild(bar);
    bars.push(bar);
  }

  const playBtn = document.getElementById('video-play-trigger');
  const videoPlayerContainer = document.querySelector('.video-player-container');
  let visualizerInterval = null;
  let isPlaying = false;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        videoPlayerContainer.classList.add('is-playing');
        visualizerInterval = setInterval(() => {
          bars.forEach((bar, idx) => {
            // Simulated rhythmic audio waveform with sine variations
            const wave = Math.sin(Date.now() / 150 + idx * 0.4);
            const randomJitter = Math.random() * 25;
            const height = Math.max(6, Math.min(48, Math.abs(wave * 35) + randomJitter));
            bar.style.height = `${height}px`;
          });
        }, 80);
      } else {
        videoPlayerContainer.classList.remove('is-playing');
        clearInterval(visualizerInterval);
        bars.forEach(bar => {
          bar.style.height = '8px';
        });
      }
    });
  }

  // Video timer simulation
  const timeDisplay = document.getElementById('video-timestamp');
  let seconds = 0;
  let timerInterval = null;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        playBtn.innerHTML = '❚❚';
        playBtn.setAttribute('title', 'Pause Video');
        timerInterval = setInterval(() => {
          seconds++;
          const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
          const secs = String(seconds % 60).padStart(2, '0');
          if (timeDisplay) timeDisplay.textContent = `${mins}:${secs} / 03:45`;
          if (seconds >= 225) {
            clearInterval(timerInterval);
            isPlaying = false;
            playBtn.innerHTML = '▶';
            videoPlayerContainer.classList.remove('is-playing');
          }
        }, 1000);
      } else {
        playBtn.innerHTML = '▶';
        playBtn.setAttribute('title', 'Play Video');
        clearInterval(timerInterval);
      }
    });
  }

  const transcriptToggle = document.getElementById('toggle-transcript-btn');
  const transcriptBody = document.getElementById('transcript-content');
  if (transcriptToggle && transcriptBody) {
    transcriptToggle.addEventListener('click', () => {
      const isHidden = transcriptBody.style.display === 'none';
      transcriptBody.style.display = isHidden ? 'block' : 'none';
      transcriptToggle.textContent = isHidden ? 'Hide Transcript ▲' : 'Read Full Transcript ▼';
    });
  }
}

/* ==========================================================================
   9. Magnetic Button Pull Effect
   ========================================================================== */
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta-btn, .theme-toggle-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        btn.style.transition = '';
      }, 400);
    });
  });
}

/* ==========================================================================
   10. Theme Toggle (Dark / Light Monochrome)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('portfolio-theme');

  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeBtn, currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(themeBtn, newTheme);
    });
  }
}

function updateThemeIcon(btn, theme) {
  if (!btn) return;
  if (theme === 'dark') {
    btn.innerHTML = '☀';
    btn.setAttribute('title', 'Switch to Light Mode');
    btn.setAttribute('aria-label', 'Switch to Light Mode');
  } else {
    btn.innerHTML = '☾';
    btn.setAttribute('title', 'Switch to Dark Mode');
    btn.setAttribute('aria-label', 'Switch to Dark Mode');
  }
}

/* ==========================================================================
   11. Responsive Navigation & Sticky State
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (mobileToggle) {
          mobileToggle.innerHTML = '☰';
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

/* ==========================================================================
   12. ScrollSpy for Active Navbar Links
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 240;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   13. Resume Tab Switcher
   ========================================================================== */
function initResumeTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.resume-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   14. Project Deep-Dive Modal Viewer
   ========================================================================== */
const projectData = {
  project1: {
    title: "Evidence-Based Pressure Ulcer Prevention Protocol for Hospitalized Adults",
    domain: "Clinical Research & Evidence-Based Nursing Practice",
    duration: "2013 – 2022 (Research, Publication & Curriculum Implementation)",
    lead: "Papiya Yeasmin Minu (Principal Investigator, Author & Master Instructor)",
    institutions: "Mahidol University (Thailand), Accademia, South Asian Nursing Journal, NITOR",
    problem: "Hospital-acquired pressure ulcers (HAPUs) represent a severe patient safety challenge resulting in increased hospitalization duration, systemic sepsis, and patient morbidity. In acute orthopedic and medical wards, standardized preventative protocols were historically inconsistent.",
    methodology: [
      "Conducted rigorous health assessments applying the Braden Risk Assessment Scale across adult inpatient cohorts.",
      "Synthesized multi-center clinical trials on microclimate control, 2-hour repositioning schedules, and viscoelastic mattress interfaces.",
      "Integrated nutritional parameters (serum albumin, protein supplementation) and barrier creams into routine care pathways.",
      "Engineered a streamlined, 4-tier clinical prevention workflow for bedridden and critically ill patients."
    ],
    outcomes: [
      "Published Master's Thesis at Mahidol University, Bangkok (2014).",
      "Published two peer-reviewed articles in Accademia (DOIs: 10.20935/Al.2885 & 10.20935/Al.3608) in 2021.",
      "Formulated national guidelines published in South Asian Nursing Journal (2022).",
      "Supervised postgraduate thesis at NITOR evaluating bedside nurse knowledge and compliance with prevention protocols."
    ],
    doi: "https://doi.org/10.20935/Al.2885"
  },
  project2: {
    title: "WHO International Disaster Relief & Epidemic Containment Mission – Pakistan Flood Crisis",
    domain: "Global Health Emergency, Disaster Response & Triage",
    duration: "2011 (40 Days Intensive Field Deployment)",
    lead: "Papiya Yeasmin Minu (Senior Staff Nurse & WHO Emergency Health Responder)",
    institutions: "World Health Organization (WHO), Sindh Provincial Health Authority, Hyderabad Emergency Team",
    problem: "Catastrophic mega-flooding in Sindh Province displaced millions, destroying clean water infrastructure and triggering rapid outbreak clusters of acute watery diarrhea, cholera, dysentery, severe dehydration, and pediatric malnutrition.",
    methodology: [
      "Rapid establishment of emergency triage stations and isolated diarrheal treatment centers in makeshift tent facilities.",
      "Standardized triage protocols: categorizing acute dehydration levels (Plan A, B, and C ORS / IV Ringer's Lactate infusion).",
      "Deployment of strict infection control, chlorine water disinfection, and sanitary waste handling protocols under field constraints.",
      "Cross-cultural maternal-infant rehydration counseling and pediatric triage in Urdu and regional dialects."
    ],
    outcomes: [
      "Stabilized and treated over 1,200 emergency patients during the critical peak outbreak window.",
      "Zero preventable mortality recorded in the designated WHO field treatment unit.",
      "Successful handover of sustained hygiene and rehydration protocols to local healthcare teams upon mission conclusion."
    ],
    doi: null
  },
  project3: {
    title: "National Nurse Teachers' Training (TWG) & Certificate Program Development",
    domain: "Academic Leadership, Nursing Pedagogy & Curriculum Reform",
    duration: "2023 – Ongoing",
    lead: "Papiya Yeasmin Minu (Technical Working Group Member, Course Architect & Master Trainer)",
    institutions: "Directorate General of Nursing and Midwifery (DGNM), ProNurse Project, College of Nursing Dhaka",
    problem: "Bridging the gap between traditional rote nursing education and modern interactive clinical pedagogy required a unified, standardized teacher training syllabus and objective clinical evaluation matrix across Bangladesh nursing colleges.",
    methodology: [
      "Analyzed national faculty competencies across 40+ nursing institutes and formulated gap assessments in clinical teaching methods.",
      "Co-authored detailed session plans, modular syllabi, and objective structured clinical examination (OSCE) evaluation grids.",
      "Embedded modern pedagogical strategies: simulation-based training, reflective clinical debriefs, and evidence-based assessment.",
      "Facilitated national consultative workshops with DGNM directors and international education advisors."
    ],
    outcomes: [
      "Standardized Certificate Training Program (CTP) officially adopted by DGNM for nurse educators.",
      "Trained and certified cohorts of nursing college instructors nationwide.",
      "Directly elevated teaching consistency and clinical assessment standards across national nursing programs."
    ],
    doi: null
  },
  project4: {
    title: "Specialized Orthopedic Trauma & Catheterization Care Protocol Integration",
    domain: "Advanced Clinical Practice, Surgical Rehabilitation & Invasive Procedures",
    duration: "2004 – 2015 (NITOR) & 2012 (Chiang Mai University Catheterization Lab)",
    lead: "Papiya Yeasmin Minu (Senior Staff Nurse & Specialized Clinical Specialist)",
    institutions: "National Institute of Traumatology and Orthopedic Rehabilitation (NITOR), Chiang Mai University (Thailand)",
    problem: "Managing high-volume trauma emergencies, open fractures, spinal cord lacerations, and post-cardiac catheterization complications requires meticulous stabilization, hemodynamic monitoring, and early mobilization protocols.",
    methodology: [
      "Completed 2-month intensive training in Cardiac Catheterization Lab Management at Chiang Mai University.",
      "Integrated standardized post-procedure arterial puncture monitoring to eliminate hematoma and hemorrhage risks.",
      "Developed inpatient spinal cord injury nursing checklists at NITOR in collaboration with CRP Savar.",
      "Mentored junior nursing cohorts on aseptic surgical dressings, skeletal traction maintenance, and pin-site infection prevention."
    ],
    outcomes: [
      "Managed thousands of acute orthopedic trauma patients over an 11-year clinical tenure at Bangladesh's premier trauma center.",
      "Significantly lowered post-surgical site infection rates in monitored orthopedic wards.",
      "Built institutional knowledge by training newly appointed nurses on orthopedic and critical care workflows."
    ],
    doi: null
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalContainer = document.getElementById('modal-details-body');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggerBtns = document.querySelectorAll('.open-project-modal-btn');

  if (!modalOverlay || !modalContainer) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      modalContainer.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">
          ${data.domain} • ${data.duration}
        </div>
        <h2 style="font-size: 1.55rem; font-weight: 800; line-height: 1.3; color: var(--text-primary); margin-bottom: 1rem;">
          ${data.title}
        </h2>
        <div style="display: inline-block; padding: 0.4rem 0.8rem; background: var(--bg-secondary); border-left: 3px solid var(--border-primary); font-size: 0.85rem; font-weight: 600; margin-bottom: 1.5rem;">
          Role: ${data.lead}
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem; color: var(--text-primary);">
            Institutions & Partners
          </h4>
          <p style="font-size: 0.92rem; color: var(--text-secondary);">${data.institutions}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem; color: var(--text-primary);">
            Clinical / Educational Challenge & Context
          </h4>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7;">${data.problem}</p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem; color: var(--text-primary);">
            Systematic Methodology & Decision Making
          </h4>
          <ul style="padding-left: 1.2rem; list-style: square; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65;">
            ${data.methodology.map(m => `<li style="margin-bottom: 0.4rem;">${m}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem; color: var(--text-primary);">
            Verified Outcomes & Sustainable Impact
          </h4>
          <ul style="padding-left: 1.2rem; list-style: disc; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65;">
            ${data.outcomes.map(o => `<li style="margin-bottom: 0.4rem;">${o}</li>`).join('')}
          </ul>
        </div>

        ${data.doi ? `
          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--border-light);">
            <a href="${data.doi}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 700; color: var(--text-primary); text-decoration: underline;">
              ↗ View Peer-Reviewed Publication (DOI: ${data.doi.replace('https://doi.org/', '')})
            </a>
          </div>
        ` : ''}
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   15. Contact Form Handler (Validation & Simulated Dispatch)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showStatus('Please fill in all required fields.', '#ef4444');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus('Please provide a valid email address.', '#ef4444');
      return;
    }

    // Simulate dispatch
    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'TRANSMITTING MESSAGE...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      form.reset();
      showStatus('✓ Thank you! Your message has been sent successfully.', '#10b981');
    }, 800);
  });

  function showStatus(msg, color) {
    if (!statusMsg) return;
    statusMsg.textContent = msg;
    statusMsg.style.color = color;
    statusMsg.style.display = 'block';
    setTimeout(() => {
      statusMsg.style.display = 'none';
    }, 6000);
  }
}

/* ==========================================================================
   16. Copy To Clipboard (Email & Phone)
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = 'COPIED!';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Copy failed: ', err);
      });
    });
  });
}
