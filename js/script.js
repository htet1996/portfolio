/* ============================================================
   Nikko PORTFOLIO — JavaScript
   ============================================================ */

// Global projects data to be accessible by case study functions
window.projects = [
  {
    name: 'SagaNote',
    lang: 'TypeScript',
    cls: 'ts',
    desc: 'AI Voice → Notion — flagship SaaS for Myanmar.',
    url: 'https://github.com/htet1996/SagaNote',
    thumb: 'linear-gradient(135deg,#4f8cff,#7c5cfc)',
    mark: '◈',
    caseStudy: {
      problem: 'Myanmar teams lose meeting decisions because manual note-taking is slow and English AI tools mis-transcribe local speech.',
      solution: 'A voice-first pipeline using Gemini 2.5 Flash for transcription and Burmese translation, then auto-formatting and saving minutes to Notion.',
      outcome: 'Reduced documentation time from hours to minutes (approx. 80% efficiency gain), enabling searchable, AI-powered knowledge bases for local businesses.'
    }
  },
  {
    name: 'ZayFlow',
    lang: 'TypeScript',
    cls: 'ts',
    desc: 'Offline-first business management PWA.',
    url: '#',
    thumb: 'linear-gradient(135deg,#3178c6,#4f8cff)',
    mark: 'AI',
    caseStudy: {
      problem: 'Retail businesses in Myanmar need reliable accounting but lack stable internet, making cloud-only tools unusable.',
      solution: 'Built an offline-first architecture using Dexie.js (IndexedDB) for local source of truth, with an optimized repository pattern for fast queries.',
      outcome: '100% availability for core business functions regardless of connectivity, significantly reducing data loss for small vendors.'
    }
  },
  {
    name: 'Cash Book',
    lang: 'JavaScript',
    cls: 'js',
    desc: 'Simplified accounting with Excel-like UX.',
    url: '#',
    thumb: 'linear-gradient(135deg,#7c5cfc,#b07cff)',
    mark: '⌘',
    caseStudy: {
      problem: 'Professional accounting software is too complex for non-financial users who prefer the simplicity of Excel.',
      solution: 'Implemented a "spreadsheet-first" interface in vanilla JS with automatic balance tracking and a flexible JSON import/export system.',
      outcome: 'A zero-install, high-performance tool that allows users to manage finance with zero learning curve.'
    }
  },
  {
    name: 'ai-agency-fullstack',
    lang: 'TypeScript',
    cls: 'ts',
    desc: 'Full-stack AI agency with Next.js + Supabase.',
    url: 'https://github.com/htet1996/ai-agency-fullstack',
    thumb: 'linear-gradient(135deg,#3ecf8e,#4f8cff)',
    mark: '⛁',
    caseStudy: {
      problem: 'Agencies need a scalable way to manage AI client workflows and billing.',
      solution: 'Next.js App Router combined with Supabase for real-time state and secure authentication.',
      outcome: 'Scalable boilerplate for AI-powered services with integrated user management.'
    }
  },
  {
    name: 'Business-Bot',
    lang: 'Python',
    cls: 'py',
    desc: 'Business automation Telegram bot.',
    url: 'https://github.com/htet1996/Business-Bot',
    thumb: 'linear-gradient(135deg,#4582ec,#2bb0e0)',
    mark: '⌬',
    caseStudy: {
      problem: 'Manual handling of VPN service purchases and user management was time-consuming.',
      solution: 'Automated the entire funnel using Python and SQLite, integrating payment verification and user access controls.',
      outcome: 'Eliminated 90% of manual administrative work, allowing the business to scale automatically.'
    }
  },
  {
    name: 'Finance-Bot',
    lang: 'Python',
    cls: 'py',
    desc: 'Financial tracking & analytics Telegram bot.',
    url: 'https://github.com/htet1996/Finance-Bot',
    thumb: 'linear-gradient(135deg,#f7931a,#ffc04d)',
    mark: '₿',
    caseStudy: {
      problem: 'Lack of real-time crypto and financial monitoring tailored for the Myanmar market context.',
      solution: 'Integrated real-time data feeds with a conversational Telegram interface for portfolio tracking.',
      outcome: 'Provided users with a low-friction way to monitor assets without needing a full trading app.'
    }
  },
  {
    name: 'vpn-store',
    lang: 'Python',
    cls: 'py',
    desc: 'VPN service store & management app.',
    url: 'https://github.com/htet1996/vpn-store',
    thumb: 'linear-gradient(135deg,#16a34a,#4ade80)',
    mark: '⛨',
    caseStudy: {
      problem: 'Managing VPN subscriptions and access keys manually was error-prone.',
      solution: 'Created a dedicated store management app to automate key generation and subscription expiry.',
      outcome: 'Reduced subscription errors to near zero and streamlined the delivery of VPN services.'
    }
  }
];

(function () {
  'use strict';
  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 2. BOOT → SITE TRANSITION ---------- */
  let booted = false;
  function finishBoot() {
    if (booted) return; booted = true;
    $('#boot').classList.add('done');
    document.body.style.overflow = '';
    try { sessionStorage.setItem('nikko_booted', '1'); } catch (e) {}
    startTerminalIntro();
    revealObserve();
  }
  let seen = false;
  try { seen = sessionStorage.getItem('nikko_booted') === '1'; } catch (e) {}
  const BOOT_MS = (seen || reduceMotion) ? 350 : 1600;
  window.addEventListener('load', () => { setTimeout(finishBoot, BOOT_MS); });
  ['click', 'keydown', 'touchstart'].forEach(ev =>
    $('#boot').addEventListener(ev, finishBoot, { passive: true }));
  document.body.style.overflow = 'hidden';

  /* ---------- 4. INTERACTIVE PARTICLE BG ---------- */
  let mouseX = 0, mouseY = 0;
  let tMouseX = 0, tMouseY = 0;
  window.addEventListener('mousemove', (e) => {
    tMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    tMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    const g = $('#cursorGlow');
    if (g) { g.style.setProperty('--mx', e.clientX + 'px'); g.style.setProperty('--my', e.clientY + 'px'); }
  });

  (function particles() {
    if (typeof THREE === 'undefined' || reduceMotion) return;
    const canvas = $('#bg3d');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cam.position.z = 320;
    const N = 300, geo = new THREE.BufferGeometry(), pos = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 720;
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ size: 2.4, color: 0x7c9cff, transparent: true, opacity: 0.4, depthWrite: false });
    const pts = new THREE.Points(geo, mat); scene.add(pts);
    function anim() {
      mouseX += (tMouseX - mouseX) * 0.05;
      mouseY += (tMouseY - mouseY) * 0.05;
      pts.rotation.y += 0.0004;
      cam.position.x += (mouseX * 70 - cam.position.x) * 0.05;
      cam.position.y += (-mouseY * 70 - cam.position.y) * 0.05;
      cam.lookAt(scene.position);
      renderer.render(scene, cam);
      requestAnimationFrame(anim);
    }
    anim();
    window.addEventListener('resize', () => {
      cam.aspect = window.innerWidth / window.innerHeight; cam.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  })();

  /* ---------- 5. INTERACTIVE TERMINAL ---------- */
  const termBody = $('#termBody');
  const introLines = [
    { html: '<span class="term-prompt">&gt;</span> <span class="c">system.boot()</span>', d: 60 },
    { html: '<span class="m">Welcome to <span class="e">Nikko</span> portfolio v2.0</span>', d: 40 },
    { html: '<span class="m">Type <span class="c">\'help\'</span> for commands or scroll down</span>', d: 40 },
  ];
  function appendLine(html) {
    const div = document.createElement('div');
    div.className = 'term-line'; div.innerHTML = html;
    termBody.appendChild(div); termBody.scrollTop = termBody.scrollHeight;
    return div;
  }
  function typeLine(html, speed) {
    return new Promise(res => {
      const div = appendLine('');
      let i = 0; const tmp = document.createElement('div'); tmp.innerHTML = html;
      const text = tmp.textContent;
      const ti = setInterval(() => {
        i++;
        div.textContent = text.slice(0, i);
        termBody.scrollTop = termBody.scrollHeight;
        if (i >= text.length) { clearInterval(ti); div.innerHTML = html; res(); }
      }, speed || 22);
    });
  }
  let promptDiv = null;
  async function startTerminalIntro() {
    for (const l of introLines) { await typeLine(l.html, 18); await wait(120); }
    makePrompt();
  }
  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  function makePrompt() {
    const line = document.createElement('div');
    line.className = 'term-line term-inline';
    line.innerHTML = '<span class="term-prompt">$</span>';
    const input = document.createElement('input');
    input.className = 'term-input'; input.setAttribute('spellcheck', 'false');
    input.setAttribute('autocomplete', 'off'); input.setAttribute('aria-label', 'terminal input');
    line.appendChild(input); termBody.appendChild(line);
    termBody.scrollTop = termBody.scrollHeight;
    promptDiv = line;
    input.focus();
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        line.innerHTML = '<span class="term-prompt">$</span> ' + escapeHtml(input.value);
        promptDiv = null;
        runCommand(val);
      }
    });
  }
  function escapeHtml(s) { return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])); }

  const commands = {
    help() {
      appendLine('<span class="c">Available commands:</span>');
      appendLine('  <span class="e">help</span>      — show this list');
      appendLine('  <span class="e">whoami</span>    — about the developer');
      appendLine('  <span class="e">projects</span>  — jump to projects');
      appendLine('  <span class="e">skills</span>    — jump to skills');
      appendLine('  <span class="e">contact</span>   — jump to contact');
      appendLine('  <span class="e">resume</span>   — view CV & experience');
      appendLine('  <span class="e">clear</span>     — clear the terminal');
      appendLine('  <span class="m">try also: </span><span class="w">sudo</span>, <span class="w">matrix</span>, <span class="w">date</span>');
    },
    whoami() {
      appendLine('<span class="e">Htet Min Paing (Nikko)</span>');
      appendLine('<span class="m">Full Stack Developer · Myanmar 🇲🇲</span>');
    },
    projects() { appendLine('<span class="m">→ scrolling to projects…</span>'); goTo('#projects'); },
    skills()   { appendLine('<span class="m">→ scrolling to skills…</span>');   goTo('#skills'); },
    contact()  { appendLine('<span class="m">→ scrolling to contact…</span>');  goTo('#contact'); },
    about()    { appendLine('<span class="m">→ scrolling to about…</span>');    goTo('#about'); },
    resume() {
      appendLine('<span class="e">📄 Htet Min Paing — Full Stack Developer</span>');
      appendLine('<span class="m">→ scrolling to CV section…</span>');
      goTo('#cv');
    },
    clear() { termBody.innerHTML = ''; },
    sudo() {
      appendLine('<span class="err">[sudo] password for nikko:</span> ********');
      appendLine('<span class="w">nikko is not in the sudoers file.</span>');
      appendLine('<span class="err">This incident will be reported. 🚨</span>');
      appendLine('<span class="m">…just kidding. You have all the power here. 😎</span>');
    },
    matrix() {
      appendLine('<span class="e">Wake up, Neo… 🐇</span>');
      appendLine('<span class="m">The Matrix has you. Follow the cyan rabbit.</span>');
      document.documentElement.scrollTop = 0;
    },
    date() { appendLine('<span class="m">' + new Date().toString() + '</span>'); },
    ls() { appendLine('<span class="c">about/  cv/  projects/  skills/  contact/  secrets.txt</span>'); },
    cat() { appendLine('<span class="m">cat: usage: try `cat secrets.txt`</span>'); },
    echo(args) { appendLine('<span class="m">' + escapeHtml(args.join(' ')) + '</span>'); },
    hello() { appendLine('<span class="e">👋 Hello there!</span>'); }
  };
  commands['secrets.txt'] = commands.cat;

  function runCommand(raw) {
    if (!raw) { makePrompt(); return; }
    const [cmd, ...args] = raw.split(/\s+/);
    const key = cmd.toLowerCase();
    if (key === 'cat' && args[0] === 'secrets.txt') {
      appendLine('<span class="e">🤫 The secret: ship small, ship often. Built for Myanmar. 🇲🇲</span>');
    } else if (commands[key]) {
      commands[key](args);
    } else {
      appendLine('<span class="err">command not found: ' + escapeHtml(cmd) + '</span> <span class="m">— type \'help\'</span>');
    }
    makePrompt();
  }

  function goTo(sel) {
    const el = $(sel); if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
  $('#termCard').addEventListener('click', () => { if (promptDiv) $('.term-input', promptDiv) && $('.term-input', promptDiv).focus(); });

  /* ---------- 6. PROJECTS RENDER ---------- */
  function renderProjects() {
    const grid = $('#projGrid');
    if (!grid) return;
    grid.innerHTML = window.projects.map((p, i) => `
      <div class="proj-card reveal" onclick="openCaseStudy(${i})">
        <div class="proj-thumb" style="--thumb: ${p.thumb}">
          <div class="pt-mark">${p.mark}</div>
          <div class="pt-lang">${p.lang}</div>
        </div>
        <div class="proj-top">
          <span class="proj-folder">📁 project</span>
          <span class="proj-langtag ${p.cls}"><span class="dot"></span>${p.lang}</span>
        </div>
        <div class="proj-name">${p.name}</div>
        <div class="proj-desc">${p.desc}</div>
        <a href="${p.url}" target="_blank" rel="noopener" class="proj-link">view source ↗</a>
      </div>
    `).join('');
  }
  renderProjects();

  /* ---------- 7. GITHUB ACTIVITY ---------- */
  (function githubFeed() {
    const GH_USER = 'htet1996';
    const el = $('#ghFeed');
    if (!el) return;
    const repoSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C6.5 0 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z"/></svg>`;

    function ago(date) {
      const s = Math.floor((new Date() - new Date(date)) / 1000);
      const u = [[2592000, 'month'], [604800, 'week'], [86400, 'day'], [3600, 'hour'], [60, 'minute']];
      for (const [sec, name] of u) {
        const n = Math.floor(s / sec);
        if (n >= 1) return n + ' ' + name + (n > 1 ? 's' : '') + ' ago';
      }
      return 'just now';
    }
    function describe(e) {
      const repo = e.repo.name.split('/')[1] || e.repo.name;
      let action = e.type.replace(/Event$/, '');
      if (e.type === 'PushEvent') action = `Pushed ${e.payload.commits ? e.payload.commits.length : ''} commit${e.payload.commits && e.payload.commits.length === 1 ? '' : 's'} to ${e.payload.ref ? e.payload.ref.split('/').pop() : 'main'}`;
      else if (e.type === 'CreateEvent') action = `Created ${e.payload.ref_type}`;
      else if (e.type === 'WatchEvent') action = 'Starred';
      else if (e.type === 'PullRequestEvent') action = `${e.payload.action} a pull request`;
      else if (e.type === 'IssuesEvent') action = `${e.payload.action} an issue`;
      else if (e.type === 'ForkEvent') action = 'Forked';
      return { repo, meta: `${action} · ${ago(e.created_at)}`, url: 'https://github.com/' + e.repo.name };
    }
    function row(name, meta, url) {
      return `<a class="feed-item" href="${url}" target="_blank" rel="noopener" style="text-decoration:none">
        <div class="feed-ico">${repoSvg}</div>
        <div><div class="feed-name">${name}</div><div class="feed-meta">${meta}</div></div>
      </a>`;
    }
    function renderFallback() {
      el.innerHTML =
        row('SagaNote', 'AI Voice → Notion · flagship', 'https://github.com/htet1996/SagaNote') +
        row('nexushub-store', 'Next.js e-commerce', 'https://github.com/htet1996/nexushub-store') +
        row('Finance-Bot', 'Crypto tracking bot', 'https://github.com/htet1996/Finance-Bot');
    }

    fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=12`)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(events => {
        if (!Array.isArray(events) || !events.length) return renderFallback();
        const seen = new Set(), rows = [];
        for (const e of events) {
          const d = describe(e);
          if (seen.has(d.repo)) continue;
          seen.add(d.repo); rows.push(row(d.repo, d.meta, d.url));
          if (rows.length >= 4) break;
        }
        el.innerHTML = rows.length ? rows.join('') : '';
        if (!rows.length) renderFallback();
      })
      .catch(() => renderFallback());
  })();

  /* ---------- 9. SCROLL REVEAL ---------- */
  function revealObserve() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          if (en.target.id === 'skillbars') {
            $$('.fill', en.target).forEach(f => f.style.width = f.dataset.w);
          }
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(e => io.observe(e));
    const sb = $('#skillbars'); if (sb) io.observe(sb);
  }

  /* ---------- 10. NAV ---------- */
  const nav = $('#nav');
  const progress = $('#scrollProgress');
  const navAnchors = $$('.nav-links a[href^="#"]');
  const sections = navAnchors.map(a => $(a.getAttribute('href'))).filter(Boolean);
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + '%';
    const mark = y + window.innerHeight * 0.4;
    let current = sections[0];
    for (const s of sections) { if (s.offsetTop <= mark) current = s; }
    navAnchors.forEach(a => a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id));
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); }
  });
  onScroll();
  const burger = $('#burger'), navLinks = $('#navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open'); navLinks.classList.toggle('open'); document.body.classList.toggle('nav-open');
  });
  $$('[data-link]').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open'); navLinks.classList.remove('open'); document.body.classList.remove('nav-open');
  }));

  /* ---------- 11. CONTACT ---------- */
  (function contactForm() {
    const form = $('#contactForm'); if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#cfName').value.trim();
      const email = $('#cfEmail').value.trim();
      const msg = $('#cfMsg').value.trim();
      if (!name || !email || !msg) return;
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:htetminpaing.96@gmail.com?subject=${subject}&body=${body}`;
      const btn = $('.form-submit', form);
      const original = btn.innerHTML;
      btn.innerHTML = 'Opening your email app…';
      setTimeout(() => { btn.innerHTML = original; }, 3000);
    });
  })();

  window.copyEmail = function(e) {
    e.preventDefault();
    navigator.clipboard.writeText('htetminpaing.96@gmail.com').then(() => {
      const toast = $('#copyToast');
      const label = $('#emailLabel');
      label.textContent = 'Copied!';
      toast.style.opacity = '1';
      setTimeout(() => {
        toast.style.opacity = '0';
        label.textContent = 'Email me';
      }, 2000);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = 'htetminpaing.96@gmail.com';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      const label = $('#emailLabel');
      label.textContent = 'Copied!';
      setTimeout(() => { label.textContent = 'Email me'; }, 2000);
    });
  };

  $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- 13. PULL-CORD ---------- */
  (function pullCord() {
    const wrap = $('#pullCord'); if (!wrap) return;
    const inner = $('.cord-inner', wrap);
    const knob = $('#cordKnob');
    let dragging = false, startY = 0, pull = 0, moved = false;
    const MAX = 150, THRESH = 80;
    const setPull = v => { pull = Math.max(0, Math.min(MAX, v)); wrap.style.setProperty('--pull', pull + 'px'); };
    const getY = e => (e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY);
    function sway() { if (!inner) return; inner.classList.remove('swaying'); void inner.offsetWidth; inner.classList.add('swaying'); }
    function down(e) {
      if (e.type === 'mousedown') e.preventDefault();
      dragging = true; moved = false; startY = getY(e); wrap.classList.add('grabbing');
    }
    function move(e) {
      if (!dragging) return;
      if (e.cancelable) e.preventDefault();
      const d = getY(e) - startY; if (d > 4) moved = true; setPull(d);
    }
    function up() {
      if (!dragging) return; dragging = false; wrap.classList.remove('grabbing');
      if (pull >= THRESH) reveal();
      setPull(0);
      sway();
    }
    function reveal() {
      const ps = $('#projects'); if (!ps) return;
      ps.scrollIntoView({ behavior: 'smooth' });
      ps.classList.remove('revealed'); void ps.offsetWidth; ps.classList.add('revealed');
    }
    knob.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    knob.addEventListener('touchstart', down, { passive: false });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
    knob.addEventListener('click', e => { e.preventDefault(); if (!moved) reveal(); });
    const tuck = () => wrap.classList.toggle('tucked', window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', tuck, { passive: true });
    tuck();
    setTimeout(sway, 1900);
  })();

})();

function openCaseStudy(i) {
  const p = window.projects[i];
  const modal = $('#caseModal');
  const title = $('#modalTitle');
  const content = $('#modalContent');
  const link = $('#modalLink');

  title.textContent = p.name;
  link.href = p.url;
  content.innerHTML = `
    <div class="case-section">
      <h4><span>⚡</span> The Problem</h4>
      <p>${p.caseStudy.problem}</p>
    </div>
    <div class="case-section">
      <h4><span>🛠️</span> The Solution</h4>
      <p>${p.caseStudy.solution}</p>
    </div>
    <div class="case-section">
      <h4><span>🚀</span> The Outcome</h4>
      <p>${p.caseStudy.outcome}</p>
    </div>
  `;
  modal.classList.add('open');
}

function closeCaseStudy() {
  $('#caseModal').classList.remove('open');
}
