/* =====================================================
   ADAM MORGAN PORTFOLIO — INTERACTION ENGINE
===================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

const cards = document.querySelectorAll(".card");
const revealCards = document.querySelectorAll(".reveal");
const hero = document.querySelector(".hero");
const typingElement = document.getElementById("typing");
const timeline = document.getElementById("timeline-card");
const projectsButton = document.getElementById("projects-button");
const yearButtons = document.querySelectorAll(".year-buttons button");
const projectGrid = document.querySelector(".project-grid");
const cpuField = document.getElementById("cpu-field");

/* =====================================================
   CARD REVEAL (scroll-aware, falls back to load if IO unsupported)
===================================================== */

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("active"), i * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealCards.forEach((card) => revealObserver.observe(card));
} else {
  window.addEventListener("load", () => {
    revealCards.forEach((card, index) => {
      setTimeout(() => card.classList.add("active"), index * 120);
    });
  });
}

/* =====================================================
   TYPEWRITER
===================================================== */

const typingWords = [
  "32-bit pipelined RISC-V cores...",
  "synthesizable RTL architectures...",
  "FPGA hardware systems...",
  "processor microarchitecture...",
  "high-performance digital logic..."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {
  if (!typingElement) return;

  const current = typingWords[wordIndex];

  if (!deleting) {
    charIndex++;
    typingElement.textContent = current.substring(0, charIndex);

    if (charIndex >= current.length) {
      deleting = true;
      setTimeout(typeWriter, 1500);
      return;
    }
  } else {
    charIndex--;
    typingElement.textContent = current.substring(0, charIndex);

    if (charIndex <= 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }

  setTimeout(typeWriter, deleting ? 35 : 70);
}

if (prefersReducedMotion) {
  if (typingElement) typingElement.textContent = typingWords[0].replace("...", "");
} else {
  typeWriter();
}

/* =====================================================
   CURSOR GLOW — only animates while the pointer is over a card
===================================================== */

if (!isTouchDevice && !prefersReducedMotion) {
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });
}

/* =====================================================
   HERO PARALLAX
===================================================== */

if (hero && !prefersReducedMotion) {
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    hero.style.transform = `perspective(1200px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(-3px)`;
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.transform = "";
  });
}

/* =====================================================
   TERMINAL DOT INTERACTION
===================================================== */

document.querySelectorAll(".terminal-dots span").forEach((dot) => {
  dot.addEventListener("mouseenter", () => {
    dot.style.transform = "scale(1.35) rotate(15deg)";
  });
  dot.addEventListener("mouseleave", () => {
    dot.style.transform = "scale(1) rotate(0deg)";
  });
});

/* =====================================================
   PROJECT DATABASE
===================================================== */

const projects = {
  2026: [
    {
      title: "32-Bit Pipelined RISC-V CPU Core",
      text: "Designed a custom SystemVerilog processor architecture with a 5-stage pipeline, hazard detection, forwarding logic, and verification."
    },
    {
      title: "RTL Verification Environment",
      text: "Created simulation workflows using ModelSim, GTKWave, and Icarus Verilog for waveform analysis and debugging."
    },
    {
      title: "Computer Architecture Research",
      text: "Exploring instruction pipelines, datapaths, control units, memory systems, and processor optimization."
    }
  ],
  2025: [
    {
      title: "Digital Systems Development",
      text: "Developed foundations in digital logic, programming, electronics, and hardware design."
    },
    {
      title: "Engineering Applications",
      text: "Applied mathematics, physics, and programming toward engineering problems."
    },
    {
      title: "Hardware Exploration",
      text: "Started exploring FPGA systems, embedded hardware, and processor design."
    }
  ],
  2024: [
    {
      title: "Programming Foundation",
      text: "Built programming fundamentals and problem-solving skills through technical projects."
    },
    {
      title: "Engineering Curiosity",
      text: "Explored computer systems, electronics, and modern technology."
    }
  ]
};

/* =====================================================
   PROJECT LOADER
===================================================== */

function loadProjects(year) {
  if (!projectGrid) return;

  projectGrid.innerHTML = "";

  projects[year].forEach((project, index) => {
    const item = document.createElement("div");
    item.className = "project-item";
    item.style.animationDelay = `${index * 0.12}s`;

    const title = document.createElement("h4");
    title.textContent = project.title;

    const text = document.createElement("p");
    text.textContent = project.text;

    item.append(title, text);
    projectGrid.appendChild(item);
  });
}
/* =====================================================
   ENGINEERING JOURNEY EXPANSION SYSTEM
===================================================== */

const TIMELINE_COLLAPSE_DELAY = 3000;

let timelineCollapseTimer = null;
let selectedYear = localStorage.getItem("selectedYear") || "2026";


function cancelTimelineCollapse() {
  if (timelineCollapseTimer) {
    clearTimeout(timelineCollapseTimer);
    timelineCollapseTimer = null;
  }
}


function scheduleTimelineCollapse() {
  cancelTimelineCollapse();

  timelineCollapseTimer = setTimeout(() => {

    if (!timeline) return;

    timeline.classList.add("collapsing");

    setTimeout(() => {
      timeline.classList.remove("expanded");
      timeline.classList.remove("collapsing");
    }, 650);

  }, TIMELINE_COLLAPSE_DELAY);
}


function activateYear(button) {

  const year = button.dataset.year;

  selectedYear = year;

  localStorage.setItem("selectedYear", year);


  yearButtons.forEach((btn)=>{

    btn.classList.remove("active");
    btn.setAttribute("aria-selected","false");

  });


  button.classList.add("active");
  button.setAttribute("aria-selected","true");


  if(timeline){

    cancelTimelineCollapse();

    timeline.classList.add("expanded");

  }


  loadProjects(year);

}



function restoreSelectedYear(){

  const savedButton = document.querySelector(
    `.year-buttons button[data-year="${selectedYear}"]`
  );


  if(savedButton){

    activateYear(savedButton);

  }

}



yearButtons.forEach(button=>{


  button.addEventListener(
    "mouseenter",
    ()=>activateYear(button)
  );


  button.addEventListener(
    "click",
    ()=>activateYear(button)
  );


  button.addEventListener(
    "focus",
    ()=>activateYear(button)
  );


});



if(timeline){

timeline.addEventListener(
"mouseenter",
()=>{

cancelTimelineCollapse();

if(!timeline.classList.contains("expanded")){

restoreSelectedYear();

}

});


timeline.addEventListener(
"mouseleave",
()=>{

scheduleTimelineCollapse();

});


timeline.addEventListener(
"focusin",
cancelTimelineCollapse
);


timeline.addEventListener(
"focusout",
(e)=>{

if(!timeline.contains(e.relatedTarget)){

scheduleTimelineCollapse();

}

});

}


restoreSelectedYear();

/* =====================================================
   VIEW PROJECTS BUTTON
===================================================== */

function playTimelineGlow() {
  if (!timeline) return;

  timeline.classList.remove("project-active");
  void timeline.offsetWidth; // restart animation
  timeline.classList.add("project-active");

  setTimeout(() => timeline.classList.remove("project-active"), 7000);
}

if (projectsButton && timeline) {
  projectsButton.addEventListener("click", (e) => {
    e.preventDefault();
    timeline.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });

    setTimeout(() => {
      activateYear(yearButtons[0]);
      playTimelineGlow();
    }, 800);
  });
}

/* =====================================================
   PIPELINE ANIMATION — paused while tab is hidden
===================================================== */

const pipelineStages = document.querySelectorAll(".pipeline div");
let pipelineIndex = 0;
let pipelineInterval = null;

function stepPipeline() {
  pipelineStages.forEach((stage) => {
    stage.style.boxShadow = "";
    stage.style.color = "";
  });

  pipelineStages[pipelineIndex].style.boxShadow = "0 0 25px rgba(0,234,255,.5)";
  pipelineStages[pipelineIndex].style.color = "#00ff88";

  pipelineIndex = (pipelineIndex + 1) % pipelineStages.length;
}

function startPipeline() {
  if (!pipelineStages.length || pipelineInterval || prefersReducedMotion) return;
  pipelineInterval = setInterval(stepPipeline, 1200);
}

function stopPipeline() {
  clearInterval(pipelineInterval);
  pipelineInterval = null;
}

startPipeline();

/* =====================================================
   SCROLL PROGRESS BAR — rAF-throttled
===================================================== */

const scrollBar = document.createElement("div");
scrollBar.className = "scroll-progress";
document.body.appendChild(scrollBar);

let scrollTicking = false;

function updateScrollProgress() {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
  scrollBar.style.width = `${progress}%`;
  scrollTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateScrollProgress);
      scrollTicking = true;
    }
  },
  { passive: true }
);

/* =====================================================
   RANDOM FPGA SIGNAL FIELD — scaled for device/perf
===================================================== */

const isSmallScreen = window.innerWidth < 700;
const signalConfig = {
  initialCount: isSmallScreen ? 8 : 20,
  intervalMs: isSmallScreen ? 4500 : 2500,
  burstMin: isSmallScreen ? 1 : 2,
  burstMax: isSmallScreen ? 3 : 6
};

let signalInterval = null;
let burstTimeout = null;

function createSignal(initial = false) {
  if (!cpuField) return;

  const pulse = document.createElement("div");
  pulse.className = "cpu-pulse";

  const length = Math.random() * 250 + 150;
  const startX = Math.random() * 120 - 20;
  const startY = Math.random() * 120 - 20;
  const angle = Math.random() * 360;
  const distance = Math.random() * 600 + 500;
  const duration = Math.random() * 5 + 8;
  const opacity = Math.random() * 0.35 + 0.25;

  pulse.style.width = `${length}px`;
  pulse.style.left = `${startX}%`;
  pulse.style.top = `${startY}%`;
  pulse.style.opacity = opacity;
  pulse.style.setProperty("--angle", `${angle}deg`);
  pulse.style.setProperty("--distance", `${distance}px`);
  pulse.style.animationDuration = `${duration}s`;

  if (initial) pulse.style.animationDelay = `${Math.random() * 2}s`;

  cpuField.appendChild(pulse);

  setTimeout(() => pulse.remove(), (duration + 3) * 1000);
}

function randomBurst() {
  const amount = Math.floor(Math.random() * (signalConfig.burstMax - signalConfig.burstMin + 1)) + signalConfig.burstMin;

  for (let i = 0; i < amount; i++) {
    setTimeout(() => createSignal(), i * 250);
  }

  burstTimeout = setTimeout(randomBurst, Math.random() * 10000 + 10000);
}

function startSignalSystem() {
  if (!cpuField) return;

  for (let i = 0; i < signalConfig.initialCount; i++) createSignal(true);

  signalInterval = setInterval(createSignal, signalConfig.intervalMs);
  randomBurst();
}

function stopSignalSystem() {
  clearInterval(signalInterval);
  clearTimeout(burstTimeout);
  signalInterval = null;
}

if (!prefersReducedMotion) {
  startSignalSystem();
}

/* Pause ambient/background animation work when the tab isn't visible */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopPipeline();
    stopSignalSystem();
  } else {
    startPipeline();
    if (!prefersReducedMotion) startSignalSystem();
  }
});

/* =====================================================
   SYSTEM ONLINE
===================================================== */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  console.log("ADAM MORGAN PORTFOLIO — SYSTEM ONLINE (RISC-V / RTL / FPGA)");
});

/* =====================================================
   TOUCH FEEDBACK
===================================================== */

if (isTouchDevice) {
  cards.forEach((card) => {
    card.addEventListener("touchstart", () => card.classList.add("touch-active"), { passive: true });
    card.addEventListener(
      "touchend",
      () => setTimeout(() => card.classList.remove("touch-active"), 300),
      { passive: true }
    );
  });
}

/* =====================================================
   KEYBOARD SHORTCUTS — ignored while typing in a field
===================================================== */

document.addEventListener("keydown", (e) => {
  const tag = document.activeElement?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  if (e.key === "1" && yearButtons[0]) activateYear(yearButtons[0]);
  if (e.key === "2" && yearButtons[1]) activateYear(yearButtons[1]);
  if (e.key === "3" && yearButtons[2]) activateYear(yearButtons[2]);
});

/* =====================================================
   FOOTER YEAR
===================================================== */

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();