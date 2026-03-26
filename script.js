/* ══════════════════════════════════════════════════════
   script.js  —  Yussif Mubarik | World-Class Portfolio
   1.  Custom Cursor
   2.  Hero — Space Scene (Stars, Planets, Bubbles + Burst)
   3.  About — Shooting Stars & Constellation Field
   4.  Biography — Floating Light Orbs
   5.  Skills — Energy Particles
   6.  Projects — Meteor Shower
   7.  Gallery — Drifting Clouds
   8.  Certificates — Spider Web Neural Network
   9.  Contact — Aurora / Northern Lights
   10. Hamburger / Mobile Drawer
   11. Nav Scroll State & Active Highlight
   12. Scroll Reveal
   13. 3D Tilt Cards
   14. Magnetic Buttons
   15. Skill Bar Animation
   16. Animated Counters
   17. Contact Form — EmailJS
   18. Particle Trail on Click
   19. Gallery Filter + Lightbox
   20. Personal AI Chatbot
   21. Auto Welcome Chatbot
══════════════════════════════════════════════════════ */


/* ══════════════════════════════════════════════════════
   1. CUSTOM CURSOR
══════════════════════════════════════════════════════ */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .tilt-card, .chip, .clink').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

document.addEventListener('mousedown', () => cursorRing.classList.add('click'));
document.addEventListener('mouseup',   () => cursorRing.classList.remove('click'));


/* ══════════════════════════════════════════════════════
   2. HERO — SPACE SCENE (Stars, Planets, Bubbles + Burst)
══════════════════════════════════════════════════════ */
const canvas = document.getElementById('bubbleCanvas');
const ctx    = canvas.getContext('2d');

let W = canvas.width  = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

const PAL = ['rgba(255,217,74,', 'rgba(255,107,53,', 'rgba(0,201,167,', 'rgba(255,255,255,'];

/* ── Stars ── */
class Star {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x       = Math.random() * W;
    this.y       = init ? Math.random() * H : Math.random() * H;
    this.r       = 0.3 + Math.random() * 1.8;
    this.alpha   = 0.3 + Math.random() * 0.7;
    this.twinkle = Math.random() * Math.PI * 2;
    this.speed   = 0.004 + Math.random() * 0.018;
    this.color   = Math.random() > 0.85
      ? `rgba(255,220,180,`   // warm orange-white
      : Math.random() > 0.7
        ? `rgba(180,210,255,` // cool blue-white
        : `rgba(255,255,255,`; // pure white
    this.hasCross = this.r > 1.4 && Math.random() > 0.5; // bright stars get cross sparkle
  }
  update() {
    this.twinkle += this.speed;
    this.alpha = 0.2 + (Math.sin(this.twinkle) + 1) / 2 * 0.8;
  }
  draw() {
    ctx.save();
    const glow = (Math.sin(this.twinkle) + 1) / 2;

    // Outer glow halo
    const halo = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 6);
    halo.addColorStop(0,   this.color + (this.alpha * 0.6) + ')');
    halo.addColorStop(0.4, this.color + (this.alpha * 0.15) + ')');
    halo.addColorStop(1,   this.color + '0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();

    // Core bright dot
    ctx.shadowBlur  = 8 + glow * 8;
    ctx.shadowColor = this.color + (this.alpha * 0.9) + ')';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + (this.alpha * 0.95) + ')';
    ctx.fill();

    // Cross sparkle for brighter stars
    if (this.hasCross) {
      const len = this.r * 4 + glow * 4;
      const a   = this.alpha * 0.5;
      ctx.lineWidth = 0.5;

      // Horizontal spike
      const hg = ctx.createLinearGradient(this.x - len, this.y, this.x + len, this.y);
      hg.addColorStop(0,   this.color + '0)');
      hg.addColorStop(0.5, this.color + a + ')');
      hg.addColorStop(1,   this.color + '0)');
      ctx.beginPath();
      ctx.moveTo(this.x - len, this.y);
      ctx.lineTo(this.x + len, this.y);
      ctx.strokeStyle = hg;
      ctx.stroke();

      // Vertical spike
      const vg = ctx.createLinearGradient(this.x, this.y - len, this.x, this.y + len);
      vg.addColorStop(0,   this.color + '0)');
      vg.addColorStop(0.5, this.color + a + ')');
      vg.addColorStop(1,   this.color + '0)');
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - len);
      ctx.lineTo(this.x, this.y + len);
      ctx.strokeStyle = vg;
      ctx.stroke();

      // Diagonal spikes (smaller)
      const dl = len * 0.5;
      const dg = ctx.createLinearGradient(this.x - dl, this.y - dl, this.x + dl, this.y + dl);
      dg.addColorStop(0,   this.color + '0)');
      dg.addColorStop(0.5, this.color + (a * 0.5) + ')');
      dg.addColorStop(1,   this.color + '0)');
      ctx.beginPath();
      ctx.moveTo(this.x - dl, this.y - dl);
      ctx.lineTo(this.x + dl, this.y + dl);
      ctx.strokeStyle = dg; ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.x + dl, this.y - dl);
      ctx.lineTo(this.x - dl, this.y + dl);
      ctx.strokeStyle = dg; ctx.stroke();
    }
    ctx.restore();
  }
}

/* ── Planets ── */
class Planet {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x         = Math.random() * W;
    this.y         = init ? Math.random() * H : H + 120;
    this.r         = 12 + Math.random() * 28;
    this.speedY    = 0.05 + Math.random() * 0.1;
    this.speedX    = (Math.random() - 0.5) * 0.06;
    this.rot       = Math.random() * Math.PI * 2;
    this.rotSpeed  = (Math.random() - 0.5) * 0.002;
    this.hasRing   = Math.random() > 0.4;
    this.ringTilt  = 0.2 + Math.random() * 0.35;
    this.ringAngle = Math.random() * Math.PI;
    this.cloudSpeed = 0.001 + Math.random() * 0.002;
    this.cloudOff   = Math.random() * Math.PI * 2;

    // Realistic planet color schemes
    const types = [
      // Earth-like — blue/green
      { base:'30,80,180',   mid:'20,130,80',  dark:'15,50,120',  atmo:'100,180,255', ring:'150,200,255' },
      // Mars-like — red/orange
      { base:'180,80,30',   mid:'220,120,60', dark:'120,40,20',  atmo:'255,160,80',  ring:'200,120,80'  },
      // Saturn-like — golden
      { base:'200,170,80',  mid:'230,200,120',dark:'140,110,40', atmo:'255,220,140', ring:'210,180,100' },
      // Ice giant — teal/blue
      { base:'40,160,180',  mid:'60,200,210', dark:'20,100,130', atmo:'150,230,240', ring:'100,200,220' },
      // Purple gas giant
      { base:'120,60,180',  mid:'160,90,220', dark:'70,30,130',  atmo:'200,150,255', ring:'180,130,230' },
      // Lava world — deep red
      { base:'160,30,10',   mid:'220,80,20',  dark:'100,10,5',   atmo:'255,100,40',  ring:'200,80,50'   },
    ];
    this.type = types[Math.floor(Math.random() * types.length)];
    this.opacity = 0.55 + Math.random() * 0.35;
    this.cloudT  = 0;
  }

  update() {
    this.y      += this.speedY;
    this.x      += this.speedX;
    this.rot    += this.rotSpeed;
    this.cloudT += this.cloudSpeed;
    if (this.y - this.r > H + 120) this.reset();
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    const T = this.type;

    // ── Planet sphere with atmosphere gradient ──
    const sphere = ctx.createRadialGradient(
      this.x - this.r * 0.35, this.y - this.r * 0.35, this.r * 0.05,
      this.x, this.y, this.r
    );
    sphere.addColorStop(0,    `rgba(${T.atmo},0.95)`);
    sphere.addColorStop(0.25, `rgba(${T.mid},0.95)`);
    sphere.addColorStop(0.65, `rgba(${T.base},0.95)`);
    sphere.addColorStop(1,    `rgba(${T.dark},0.98)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = sphere;
    ctx.fill();

    // ── Surface bands (latitude lines) ──
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.clip();
    for (let i = 0; i < 4; i++) {
      const by = this.y - this.r + (i + 0.5) * (this.r * 2 / 4);
      const bw = Math.sqrt(Math.max(0, this.r * this.r - Math.pow(by - this.y, 2)));
      ctx.beginPath();
      ctx.ellipse(
        this.x + Math.cos(this.cloudT + i) * this.r * 0.08,
        by, bw, this.r * 0.06, 0, 0, Math.PI * 2
      );
      ctx.fillStyle = `rgba(${T.dark},${0.08 + i * 0.03})`;
      ctx.fill();
    }
    ctx.restore();

    // ── Cloud swirls ──
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.clip();
    for (let i = 0; i < 3; i++) {
      const angle = this.cloudT * (i % 2 === 0 ? 1 : -1) + (i * Math.PI * 2 / 3) + this.cloudOff;
      const cx2   = this.x + Math.cos(angle) * this.r * 0.45;
      const cy2   = this.y + Math.sin(angle) * this.r * 0.25;
      const cg    = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, this.r * 0.4);
      cg.addColorStop(0,   `rgba(255,255,255,0.12)`);
      cg.addColorStop(0.5, `rgba(255,255,255,0.05)`);
      cg.addColorStop(1,   `rgba(255,255,255,0)`);
      ctx.beginPath();
      ctx.ellipse(cx2, cy2, this.r * 0.4, this.r * 0.18, angle, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    }
    ctx.restore();

    // ── Atmosphere rim glow ──
    const rim = ctx.createRadialGradient(this.x, this.y, this.r * 0.75, this.x, this.y, this.r * 1.25);
    rim.addColorStop(0,   `rgba(${T.atmo},0)`);
    rim.addColorStop(0.6, `rgba(${T.atmo},0.12)`);
    rim.addColorStop(1,   `rgba(${T.atmo},0)`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 1.25, 0, Math.PI * 2);
    ctx.fillStyle = rim;
    ctx.fill();

    // ── Light side specular glint ──
    const glint = ctx.createRadialGradient(
      this.x - this.r * 0.38, this.y - this.r * 0.38, 0,
      this.x - this.r * 0.3,  this.y - this.r * 0.3,  this.r * 0.45
    );
    glint.addColorStop(0,   'rgba(255,255,255,0.35)');
    glint.addColorStop(0.5, 'rgba(255,255,255,0.08)');
    glint.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = glint;
    ctx.fill();

    // ── Dark shadow side ──
    const shadow = ctx.createRadialGradient(
      this.x + this.r * 0.5, this.y + this.r * 0.5, this.r * 0.2,
      this.x + this.r * 0.3, this.y + this.r * 0.3, this.r * 1.1
    );
    shadow.addColorStop(0,   'rgba(0,0,0,0.55)');
    shadow.addColorStop(0.5, 'rgba(0,0,0,0.25)');
    shadow.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = shadow;
    ctx.fill();

    // ── Saturn-style rings ──
    if (this.hasRing) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.ringAngle);
      ctx.scale(1, this.ringTilt);

      const ringColors = [
        `rgba(${T.ring},0.55)`,
        `rgba(${T.ring},0.3)`,
        `rgba(${T.ring},0.15)`,
      ];
      const ringRadii = [
        [this.r * 1.25, this.r * 1.55],
        [this.r * 1.58, this.r * 1.8],
        [this.r * 1.83, this.r * 1.95],
      ];

      ringRadii.forEach((pair, i) => {
        const rg = ctx.createRadialGradient(0, 0, pair[0], 0, 0, pair[1]);
        rg.addColorStop(0,   ringColors[i]);
        rg.addColorStop(0.5, ringColors[i].replace(/[\d.]+\)$/, '0.8)'));
        rg.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(0, 0, pair[1], 0, Math.PI * 2);
        ctx.arc(0, 0, pair[0], 0, Math.PI * 2, true);
        ctx.fillStyle = rg;
        ctx.fill();
      });

      // Ring gap line
      ctx.beginPath();
      ctx.arc(0, 0, this.r * 1.56, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();

      // Planet overlaps front of ring
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      const reapply = ctx.createRadialGradient(
        this.x - this.r * 0.35, this.y - this.r * 0.35, this.r * 0.05,
        this.x, this.y, this.r
      );
      reapply.addColorStop(0,    `rgba(${T.atmo},0.95)`);
      reapply.addColorStop(0.25, `rgba(${T.mid},0.95)`);
      reapply.addColorStop(0.65, `rgba(${T.base},0.95)`);
      reapply.addColorStop(1,    `rgba(${T.dark},0.98)`);
      ctx.fillStyle = reapply;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

/* ── Bubbles ── */
class Bubble {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x         = Math.random() * W;
    this.y         = init ? Math.random() * H : H + 80;
    this.r         = 6 + Math.random() * 30;
    this.speedY    = 0.22 + Math.random() * 0.65;
    this.speedX    = (Math.random() - 0.5) * 0.38;
    this.opacity   = 0.06 + Math.random() * 0.18;
    this.color     = PAL[Math.floor(Math.random() * PAL.length)];
    this.wobble    = Math.random() * Math.PI * 2;
    this.wobbleSpd = 0.008 + Math.random() * 0.012;
    this.wobbleAmp = 0.5 + Math.random() * 1.5;
  }
  update() {
    this.y -= this.speedY; this.wobble += this.wobbleSpd;
    this.x += Math.sin(this.wobble) * this.wobbleAmp + this.speedX;
    if (this.y + this.r < -20) this.reset();
  }
  draw() {
    ctx.save();
    const g = ctx.createRadialGradient(
      this.x - this.r * 0.3, this.y - this.r * 0.3, this.r * 0.1,
      this.x, this.y, this.r
    );
    g.addColorStop(0,   this.color + (this.opacity * 1.8) + ')');
    g.addColorStop(0.6, this.color + (this.opacity * 0.8) + ')');
    g.addColorStop(1,   this.color + '0)');
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.strokeStyle = this.color + (this.opacity * 1.2) + ')';
    ctx.lineWidth = 0.8; ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.x - this.r * 0.3, this.y - this.r * 0.3, this.r * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.opacity * 1.5})`; ctx.fill();
    ctx.restore();
  }
}

const stars   = Array.from({ length: 140 }, () => new Star());
const planets = Array.from({ length: 7   }, () => new Planet());
const bubbles = Array.from({ length: 45  }, () => new Bubble());

/* ── Burst particles ── */
const bursts = [];
function spawnBurst(x, y, r, color) {
  for (let i = 0; i < 14; i++) {
    const ang = (i / 14) * Math.PI * 2;
    const spd = 1.5 + Math.random() * 3.5;
    bursts.push({ x, y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
      r: 2 + Math.random() * 3, alpha: 1, color });
  }
  bursts.push({ x, y, ringR: r, alpha: 1, color, isRing: true });
}

function drawBursts() {
  for (let i = bursts.length - 1; i >= 0; i--) {
    const b = bursts[i];
    if (b.isRing) {
      b.ringR += 5; b.alpha -= 0.065;
      ctx.save(); ctx.beginPath(); ctx.arc(b.x, b.y, b.ringR, 0, Math.PI * 2);
      ctx.strokeStyle = b.color + b.alpha + ')'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    } else {
      b.x += b.vx; b.y += b.vy; b.vy += 0.09; b.alpha -= 0.05;
      ctx.save(); ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.color + b.alpha + ')';
      ctx.shadowBlur = 6; ctx.shadowColor = b.color + '0.8)'; ctx.fill(); ctx.restore();
    }
    if (b.alpha <= 0) bursts.splice(i, 1);
  }
}

function animateBubbles() {
  ctx.clearRect(0, 0, W, H);
  stars.forEach(s => { s.update(); s.draw(); });
  planets.forEach(p => { p.update(); p.draw(); });
  bubbles.forEach(b => { b.update(); b.draw(); });
  drawBursts();
  requestAnimationFrame(animateBubbles);
}
animateBubbles();
/* ── Bubble Burst on Click ── */
canvas.style.cursor = 'crosshair';
canvas.style.pointerEvents = 'auto';
canvas.style.zIndex = '1';

// Listen on the whole document instead so nothing blocks it
document.addEventListener('click', e => {
  // Only burst if clicking on hero section area
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;
  const heroRect = heroSection.getBoundingClientRect();
  if (
    e.clientX < heroRect.left || e.clientX > heroRect.right ||
    e.clientY < heroRect.top  || e.clientY > heroRect.bottom
  ) return;

  const mx = e.clientX;
  const my = e.clientY;

  let burst = false;
  bubbles.forEach((b, i) => {
    if (Math.hypot(b.x - mx, b.y - my) < b.r + 15) {
      spawnBurst(b.x, b.y, b.r, b.color);
      bubbles[i].reset();
      bubbles[i].y = H + 80;
      burst = true;
    }
  });
});


/* ══════════════════════════════════════════════════════
   3. ABOUT — SHOOTING STARS & CONSTELLATION FIELD
══════════════════════════════════════════════════════ */
(function () {
  const sec = document.getElementById('about');
  if (!sec) return;
  const c = document.createElement('canvas');
  c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.5;';
  sec.style.position = 'relative'; sec.style.overflow = 'hidden';
  sec.insertBefore(c, sec.firstChild);
  const cx = c.getContext('2d');
  let AW, AH, fieldStars = [];

  function resize() { AW = c.width = sec.offsetWidth; AH = c.height = sec.offsetHeight; }

  function makeField() {
    fieldStars = Array.from({ length: 90 }, () => ({
      x: Math.random() * AW, y: Math.random() * AH,
      r: 0.4 + Math.random() * 1.2,
      twinkle: Math.random() * Math.PI * 2,
      spd: 0.01 + Math.random() * 0.02,
      op: 0.15 + Math.random() * 0.5,
    }));
  }

  function drawConstellations() {
    const maxD = 80;
    for (let i = 0; i < fieldStars.length; i++) {
      for (let j = i + 1; j < fieldStars.length; j++) {
        const d = Math.hypot(fieldStars[i].x - fieldStars[j].x, fieldStars[i].y - fieldStars[j].y);
        if (d < maxD) {
          const a = (1 - d / maxD) * 0.12;
          cx.beginPath();
          cx.moveTo(fieldStars[i].x, fieldStars[i].y);
          cx.lineTo(fieldStars[j].x, fieldStars[j].y);
          cx.strokeStyle = `rgba(255,217,74,${a})`; cx.lineWidth = 0.5; cx.stroke();
        }
      }
    }
  }

  const shooters = [];
  function spawnShooter() {
    if (shooters.length < 4) {
      shooters.push({
        x: Math.random() * AW, y: Math.random() * AH * 0.4,
        spd: 5 + Math.random() * 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        alpha: 1, tail: [],
      });
    }
    setTimeout(spawnShooter, 1800 + Math.random() * 3000);
  }
  spawnShooter();

  function drawShooters() {
    for (let i = shooters.length - 1; i >= 0; i--) {
      const s = shooters[i];
      s.x += Math.cos(s.angle) * s.spd;
      s.y += Math.sin(s.angle) * s.spd;
      s.alpha -= 0.018;
      s.tail.unshift({ x: s.x, y: s.y });
      if (s.tail.length > 18) s.tail.pop();
      cx.save();
      s.tail.forEach((pt, idx) => {
        const a = (1 - idx / s.tail.length) * s.alpha * 0.85;
        cx.beginPath(); cx.arc(pt.x, pt.y, 1.2 - idx * 0.06, 0, Math.PI * 2);
        cx.fillStyle = `rgba(255,255,255,${a})`; cx.fill();
      });
      cx.shadowBlur = 10; cx.shadowColor = 'rgba(255,217,74,0.9)';
      cx.beginPath(); cx.arc(s.x, s.y, 2, 0, Math.PI * 2);
      cx.fillStyle = `rgba(255,217,74,${s.alpha})`; cx.fill();
      cx.restore();
      if (s.alpha <= 0 || s.x > AW + 100 || s.y > AH + 100) shooters.splice(i, 1);
    }
  }

  function draw() {
    cx.clearRect(0, 0, AW, AH);
    drawConstellations();
    fieldStars.forEach(s => {
      s.twinkle += s.spd;
      const op = s.op * ((Math.sin(s.twinkle) + 1) / 2 * 0.6 + 0.4);
      cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      cx.fillStyle = `rgba(255,255,255,${op})`; cx.fill();
    });
    drawShooters();
    requestAnimationFrame(draw);
  }

  resize(); makeField(); draw();
  window.addEventListener('resize', () => { resize(); makeField(); });
})();


/* ══════════════════════════════════════════════════════
   4. BIOGRAPHY — FLOATING LIGHT ORBS
══════════════════════════════════════════════════════ */
(function () {
  const sec = document.querySelector('.bio-section');
  if (!sec) return;
  const c = document.createElement('canvas');
  c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.4;';
  sec.style.position = 'relative'; sec.style.overflow = 'hidden';
  sec.insertBefore(c, sec.firstChild);
  const cx = c.getContext('2d');
  let BW, BH, orbs = [];

  function resize() { BW = c.width = sec.offsetWidth; BH = c.height = sec.offsetHeight; }

  function makeOrbs() {
    orbs = Array.from({ length: 18 }, () => ({
      x: Math.random() * BW, y: Math.random() * BH,
      r: 30 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? '255,217,74' : '0,201,167',
      pulse: Math.random() * Math.PI * 2,
      pulseSpd: 0.008 + Math.random() * 0.015,
    }));
  }

  function draw() {
    cx.clearRect(0, 0, BW, BH);
    orbs.forEach(o => {
      o.x += o.vx; o.y += o.vy; o.pulse += o.pulseSpd;
      if (o.x < -o.r || o.x > BW + o.r) o.vx *= -1;
      if (o.y < -o.r || o.y > BH + o.r) o.vy *= -1;
      const glow = (Math.sin(o.pulse) + 1) / 2;
      const g = cx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * (1 + glow * 0.3));
      g.addColorStop(0,   `rgba(${o.hue},${0.12 + glow * 0.1})`);
      g.addColorStop(0.5, `rgba(${o.hue},${0.04 + glow * 0.04})`);
      g.addColorStop(1,   `rgba(${o.hue},0)`);
      cx.beginPath(); cx.arc(o.x, o.y, o.r * (1 + glow * 0.3), 0, Math.PI * 2);
      cx.fillStyle = g; cx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize(); makeOrbs(); draw();
  window.addEventListener('resize', () => { resize(); makeOrbs(); });
})();


/* ══════════════════════════════════════════════════════
   5. SKILLS — ENERGY PARTICLES
══════════════════════════════════════════════════════ */
(function () {
  const sec = document.getElementById('skills');
  if (!sec) return;
  const c = document.createElement('canvas');
  c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.45;';
  sec.style.position = 'relative'; sec.style.overflow = 'hidden';
  sec.insertBefore(c, sec.firstChild);
  const cx = c.getContext('2d');
  let SW, SH, particles = [];

  function resize() { SW = c.width = sec.offsetWidth; SH = c.height = sec.offsetHeight; }

  function newParticle() {
    return {
      x: Math.random() * SW, y: SH + 10,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -0.3 - Math.random() * 0.6,
      r: 1 + Math.random() * 2.5,
      alpha: 0.3 + Math.random() * 0.6,
      color: ['255,217,74', '0,201,167', '255,107,53'][Math.floor(Math.random() * 3)],
      life: 1, decay: 0.003 + Math.random() * 0.005,
    };
  }

  function makeParticles() { particles = Array.from({ length: 55 }, () => { const p = newParticle(); p.y = Math.random() * SH; return p; }); }

  function draw() {
    cx.clearRect(0, 0, SW, SH);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.life -= p.decay;
      p.vx += (Math.random() - 0.5) * 0.04;
      if (p.life <= 0) { particles[i] = newParticle(); return; }
      cx.save();
      cx.shadowBlur = 8; cx.shadowColor = `rgba(${p.color},0.8)`;
      cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      cx.fillStyle = `rgba(${p.color},${p.alpha * p.life})`; cx.fill();
      cx.restore();
    });
    requestAnimationFrame(draw);
  }

  resize(); makeParticles(); draw();
  window.addEventListener('resize', () => { resize(); makeParticles(); });
})();


/* ══════════════════════════════════════════════════════
   6. PROJECTS — METEOR SHOWER
══════════════════════════════════════════════════════ */
(function () {
  const sec = document.querySelector('.projects-section');
  if (!sec) return;
  const c = document.createElement('canvas');
  c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.5;';
  sec.style.position = 'relative'; sec.style.overflow = 'hidden';
  sec.insertBefore(c, sec.firstChild);
  const cx = c.getContext('2d');
  let MW, MH, meteors = [], bgStars = [];

  function resize() { MW = c.width = sec.offsetWidth; MH = c.height = sec.offsetHeight; }

  function makeBgStars() {
    bgStars = Array.from({ length: 60 }, () => ({
      x: Math.random() * MW, y: Math.random() * MH,
      r: 0.4 + Math.random() * 1, op: 0.1 + Math.random() * 0.35,
    }));
  }

  function spawnMeteor() {
    meteors.push({
      x: Math.random() * MW * 1.5, y: -20,
      spd: 6 + Math.random() * 7,
      angle: Math.PI * 0.35 + (Math.random() - 0.5) * 0.25,
      alpha: 1,
      color: ['255,217,74', '255,107,53', '0,201,167'][Math.floor(Math.random() * 3)],
      tail: [],
    });
  }

  setInterval(() => { if (meteors.length < 5) spawnMeteor(); }, 1000 + Math.random() * 1500);

  function draw() {
    cx.clearRect(0, 0, MW, MH);
    bgStars.forEach(s => {
      cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      cx.fillStyle = `rgba(255,255,255,${s.op})`; cx.fill();
    });
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += Math.cos(m.angle) * m.spd; m.y += Math.sin(m.angle) * m.spd;
      m.alpha -= 0.014;
      m.tail.unshift({ x: m.x, y: m.y });
      if (m.tail.length > 22) m.tail.pop();
      m.tail.forEach((pt, idx) => {
        const a = (1 - idx / m.tail.length) * m.alpha * 0.9;
        cx.beginPath(); cx.arc(pt.x, pt.y, Math.max(2.5 - idx * 0.1, 0.2), 0, Math.PI * 2);
        cx.fillStyle = `rgba(${m.color},${a})`; cx.fill();
      });
      cx.save(); cx.shadowBlur = 14; cx.shadowColor = `rgba(${m.color},0.9)`;
      cx.beginPath(); cx.arc(m.x, m.y, 2.5, 0, Math.PI * 2);
      cx.fillStyle = `rgba(255,255,255,${m.alpha})`; cx.fill(); cx.restore();
      if (m.alpha <= 0 || m.x > MW + 100 || m.y > MH + 100) meteors.splice(i, 1);
    }
    requestAnimationFrame(draw);
  }

  resize(); makeBgStars(); draw();
  window.addEventListener('resize', () => { resize(); makeBgStars(); });
})();


/* ══════════════════════════════════════════════════════
   7. GALLERY — DRIFTING CLOUDS
══════════════════════════════════════════════════════ */
(function () {
  const sec = document.querySelector('.gallery-section');
  if (!sec) return;
  const c = document.createElement('canvas');
  c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.18;';
  sec.style.position = 'relative'; sec.style.overflow = 'hidden';
  sec.insertBefore(c, sec.firstChild);
  const cx = c.getContext('2d');
  let GW, GH, clouds = [];

  function resize() { GW = c.width = sec.offsetWidth; GH = c.height = sec.offsetHeight; }

  function makeCloud(startX) {
    const r = 40 + Math.random() * 60;
    return {
      x: startX !== undefined ? startX : Math.random() * GW,
      y: 40 + Math.random() * GH * 0.65,
      r, spd: 0.18 + Math.random() * 0.25,
      opacity: 0.5 + Math.random() * 0.5,
      blobs: Array.from({ length: 5 + Math.floor(Math.random() * 4) }, () => ({
        ox: (Math.random() - 0.5) * r * 1.6,
        oy: (Math.random() - 0.5) * r * 0.5,
        r:  r * (0.5 + Math.random() * 0.7),
      })),
    };
  }

  function makeClouds() { clouds = Array.from({ length: 10 }, () => makeCloud()); }

  function drawCloud(cloud) {
    cx.save(); cx.globalAlpha = cloud.opacity;
    cloud.blobs.forEach(b => {
      const g = cx.createRadialGradient(
        cloud.x + b.ox - b.r * 0.2, cloud.y + b.oy - b.r * 0.2, b.r * 0.1,
        cloud.x + b.ox, cloud.y + b.oy, b.r
      );
      g.addColorStop(0,   'rgba(255,255,255,0.55)');
      g.addColorStop(0.5, 'rgba(200,220,255,0.25)');
      g.addColorStop(1,   'rgba(200,220,255,0)');
      cx.beginPath(); cx.arc(cloud.x + b.ox, cloud.y + b.oy, b.r, 0, Math.PI * 2);
      cx.fillStyle = g; cx.fill();
    });
    cx.restore();
  }

  function draw() {
    cx.clearRect(0, 0, GW, GH);
    clouds.forEach((cloud, i) => {
      cloud.x += cloud.spd;
      if (cloud.x - cloud.r * 2 > GW + 200) clouds[i] = makeCloud(-cloud.r * 2);
      drawCloud(cloud);
    });
    requestAnimationFrame(draw);
  }

  resize(); makeClouds(); draw();
  window.addEventListener('resize', () => { resize(); makeClouds(); });
})();


/* ══════════════════════════════════════════════════════
   8. CERTIFICATES — SPIDER WEB NEURAL NETWORK
══════════════════════════════════════════════════════ */
(function () {
  const sec = document.querySelector('.certificates-section');
  if (!sec) return;
  const c = document.createElement('canvas');
  c.id = 'webCanvas';
  c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  sec.style.position = 'relative'; sec.style.overflow = 'hidden';
  sec.insertBefore(c, sec.firstChild);
  const cx = c.getContext('2d');
  let CW, CH, nodes = [];

  const WC = {
    node:  'rgba(255,217,74,',
    line:  'rgba(0,201,167,',
    pulse: 'rgba(255,107,53,',
    web:   'rgba(255,255,255,',
  };

  function resize() { CW = c.width = sec.offsetWidth; CH = c.height = sec.offsetHeight; }

  function makeNodes() {
    nodes = Array.from({ length: Math.floor((CW * CH) / 12000) + 10 }, () => ({
      x: Math.random() * CW, y: Math.random() * CH,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: 1.5 + Math.random() * 2.5,
      pulse: Math.random() * Math.PI * 2,
      homeX: Math.random() * CW,
      homeY: Math.random() * CH,
    }));
  }

  const pulses = [];
  setInterval(() => {
    if (nodes.length < 2) return;
    const a = nodes[Math.floor(Math.random() * nodes.length)];
    const closest = [...nodes].filter(o => o !== a)
      .sort((x, y) => Math.hypot(x.x - a.x, x.y - a.y) - Math.hypot(y.x - a.x, y.y - a.y))[0];
    if (closest) pulses.push({ ax: a.x, ay: a.y, bx: closest.x, by: closest.y, t: 0 });
  }, 500);

  function draw() {
    cx.clearRect(0, 0, CW, CH);
    const maxD = 190;

    nodes.forEach(n => {
      const nearby = [...nodes]
        .filter(o => o !== n && Math.hypot(o.x - n.x, o.y - n.y) < maxD)
        .sort((a, b) => Math.hypot(a.x - n.x, a.y - n.y) - Math.hypot(b.x - n.x, b.y - n.y))
        .slice(0, 5);

      nearby.forEach(o => {
        const d  = Math.hypot(o.x - n.x, o.y - n.y);
        const a  = (1 - d / maxD) * 0.2;
        const mx = (n.x + o.x) / 2 + (Math.random() - 0.5) * 6;
        const my = (n.y + o.y) / 2 + (Math.random() - 0.5) * 6;
        cx.beginPath(); cx.moveTo(n.x, n.y);
        cx.quadraticCurveTo(mx, my, o.x, o.y);
        cx.strokeStyle = `${WC.web}${a})`; cx.lineWidth = (1 - d / maxD) * 0.9; cx.stroke();
        if (d < 110) {
          cx.beginPath(); cx.moveTo(n.x, n.y);
          cx.quadraticCurveTo(mx, my, o.x, o.y);
          cx.strokeStyle = `${WC.line}${a * 0.55})`; cx.lineWidth = 0.4; cx.stroke();
        }
      });
    });

    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i]; p.t += 0.022;
      const px = p.ax + (p.bx - p.ax) * p.t;
      const py = p.ay + (p.by - p.ay) * p.t;
      cx.save(); cx.shadowBlur = 12; cx.shadowColor = `${WC.pulse}0.9)`;
      cx.beginPath(); cx.arc(px, py, 3, 0, Math.PI * 2);
      cx.fillStyle = `${WC.pulse}${1 - p.t})`; cx.fill(); cx.restore();
      if (p.t >= 1) pulses.splice(i, 1);
    }

    nodes.forEach(n => {
      n.pulse += 0.022;
      const glow = (Math.sin(n.pulse) + 1) / 2;
      const g = cx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
      g.addColorStop(0,   `${WC.node}${0.3 + glow * 0.4})`);
      g.addColorStop(0.4, `${WC.node}${0.06 + glow * 0.08})`);
      g.addColorStop(1,   `${WC.node}0)`);
      cx.beginPath(); cx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
      cx.fillStyle = g; cx.fill();
      cx.save(); cx.shadowBlur = 8; cx.shadowColor = `${WC.node}0.8)`;
      cx.beginPath(); cx.arc(n.x, n.y, n.r + glow * 0.8, 0, Math.PI * 2);
      cx.fillStyle = `${WC.node}${0.65 + glow * 0.35})`; cx.fill(); cx.restore();
      n.x += n.vx + (n.homeX - n.x) * 0.0007;
      n.y += n.vy + (n.homeY - n.y) * 0.0007;
      if (n.x < 0 || n.x > CW) n.vx *= -1;
      if (n.y < 0 || n.y > CH) n.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  resize(); makeNodes(); draw();
  window.addEventListener('resize', () => { resize(); makeNodes(); });
})();


/* ══════════════════════════════════════════════════════
   9. CONTACT — AURORA / NORTHERN LIGHTS
══════════════════════════════════════════════════════ */
(function () {
  const sec = document.querySelector('.contact-section');
  if (!sec) return;
  const c = document.createElement('canvas');
  c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.35;';
  sec.style.position = 'relative'; sec.style.overflow = 'hidden';
  sec.insertBefore(c, sec.firstChild);
  const cx = c.getContext('2d');
  let OW, OH, t = 0;

  function resize() { OW = c.width = sec.offsetWidth; OH = c.height = sec.offsetHeight; }

  const waves = Array.from({ length: 5 }, (_, i) => ({
    amp:   50 + i * 20,
    freq:  0.003 + i * 0.001,
    speed: 0.008 + i * 0.003,
    y:     0.2 + i * 0.12,
    color: ['0,201,167', '255,217,74', '0,150,255', '255,107,53', '100,255,200'][i],
    phase: i * 1.2,
  }));

  function draw() {
    cx.clearRect(0, 0, OW, OH);
    t += 0.01;
    waves.forEach(w => {
      cx.beginPath(); cx.moveTo(0, OH);
      for (let x = 0; x <= OW; x += 4) {
        const y = OH * w.y
          + Math.sin(x * w.freq + t * w.speed * 10 + w.phase) * w.amp
          + Math.sin(x * w.freq * 1.7 + t * w.speed * 6) * (w.amp * 0.4);
        cx.lineTo(x, y);
      }
      cx.lineTo(OW, 0); cx.lineTo(0, 0); cx.closePath();
      const g = cx.createLinearGradient(0, 0, 0, OH);
      g.addColorStop(0,   `rgba(${w.color},0)`);
      g.addColorStop(0.4, `rgba(${w.color},0.07)`);
      g.addColorStop(0.7, `rgba(${w.color},0.12)`);
      g.addColorStop(1,   `rgba(${w.color},0.04)`);
      cx.fillStyle = g; cx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize(); draw();
  window.addEventListener('resize', resize);
})();


/* ══════════════════════════════════════════════════════
   10. HAMBURGER / MOBILE DRAWER
══════════════════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('drawer');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
});

drawer.addEventListener('click', e => {
  if (e.target === drawer) {
    hamburger.classList.remove('open'); drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
});

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open'); drawer.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ══════════════════════════════════════════════════════
   11. NAV SCROLL STATE & ACTIVE HIGHLIGHT
══════════════════════════════════════════════════════ */
const mainNav    = document.getElementById('mainNav');
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('[data-nav]');

window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 40);
  let currentId = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 150) currentId = sec.id; });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${currentId}` ? 'var(--yellow)' : '';
  });
});


/* ══════════════════════════════════════════════════════
   12. SCROLL REVEAL
══════════════════════════════════════════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), parseInt(entry.target.dataset.delay || 0));
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


/* ══════════════════════════════════════════════════════
   13. 3D TILT CARDS
══════════════════════════════════════════════════════ */
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    card.style.transform  = `perspective(800px) rotateX(${-dy * 12}deg) rotateY(${dx * 12}deg) translateZ(6px)`;
    card.style.transition = 'transform 0.08s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
  });
});


/* ══════════════════════════════════════════════════════
   14. MAGNETIC BUTTONS
══════════════════════════════════════════════════════ */
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    el.style.transform  = `translate(${(e.clientX - rect.left - rect.width  / 2) * 0.28}px,${(e.clientY - rect.top - rect.height / 2) * 0.28}px)`;
    el.style.transition = 'transform 0.15s ease';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform  = 'translate(0,0)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
  });
});


/* ══════════════════════════════════════════════════════
   15. SKILL BAR ANIMATION
══════════════════════════════════════════════════════ */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width      = entry.target.dataset.bar + '%';
      entry.target.style.background = entry.target.dataset.color;
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.sbar[data-bar]').forEach(bar => barObs.observe(bar));


/* ══════════════════════════════════════════════════════
   16. ANIMATED COUNTERS
══════════════════════════════════════════════════════ */
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target, target = parseInt(el.dataset.target), total = Math.ceil(1800 / 16);
      let count = 0;
      const timer = setInterval(() => {
        count++;
        el.textContent = Math.round((1 - Math.pow(1 - count / total, 3)) * target);
        if (count >= total) { el.textContent = target; clearInterval(timer); }
      }, 16);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));


/* ══════════════════════════════════════════════════════
   17. CONTACT FORM — EmailJS
══════════════════════════════════════════════════════ */
const EMAILJS_SERVICE_ID  = 'service_axbhcwp';
const EMAILJS_TEMPLATE_ID = 'template_37emx4b';
const EMAILJS_PUBLIC_KEY  = 'NNvAxJU4w-cZToAlr';
emailjs.init(EMAILJS_PUBLIC_KEY);

document.getElementById('sendBtn').addEventListener('click', () => {
  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();
  const btn   = document.getElementById('sendBtn');

  if (!name || !email || !msg) {
    const form = document.querySelector('.cform');
    form.style.transform = 'translateX(-8px)';
    setTimeout(() => { form.style.transition = 'transform 0.4s'; form.style.transform = 'translateX(0)'; }, 50);
    alert('Please fill in all fields! 😊'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email! 📧'); return; }

  btn.disabled = true; btn.innerHTML = '<span>Sending...</span>';
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: name, from_email: email, message: msg, to_name: 'Mubarik Yussif'
  }).then(() => {
    btn.innerHTML = '<span>Message Sent! 🎉</span>';
    btn.style.background = 'linear-gradient(135deg,#4ade80,#22c55e)';
    btn.disabled = false;
    ['fname','femail','fmsg'].forEach(id => document.getElementById(id).value = '');
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
      btn.style.background = '';
    }, 3000);
  }).catch(() => {
    btn.innerHTML = '<span>Failed — Try Again 😔</span>';
    btn.style.background = 'linear-gradient(135deg,#f87171,#ef4444)';
    btn.disabled = false;
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
      btn.style.background = '';
    }, 3000);
  });
});


/* ══════════════════════════════════════════════════════
   18. PARTICLE TRAIL ON CLICK
══════════════════════════════════════════════════════ */
document.addEventListener('click', e => {
  if (e.target.closest('a,button,input,textarea,canvas')) return;
  const COLS = ['#FFD94A','#FF6B35','#00C9A7','#ffffff'];
  for (let i = 0; i < 10; i++) {
    const p   = document.createElement('div');
    const ang = (i / 10) * Math.PI * 2;
    const vel = 50 + Math.random() * 60;
    const sz  = 4 + Math.random() * 6;
    const col = COLS[Math.floor(Math.random() * COLS.length)];
    const dur = 500 + Math.random() * 400;
    p.style.cssText = `position:fixed;z-index:9997;pointer-events:none;width:${sz}px;height:${sz}px;border-radius:50%;background:${col};left:${e.clientX}px;top:${e.clientY}px;transform:translate(-50%,-50%);box-shadow:0 0 6px ${col};`;
    document.body.appendChild(p);
    p.animate([
      { transform:'translate(-50%,-50%) scale(1)', opacity:1 },
      { transform:`translate(calc(-50% + ${Math.cos(ang)*vel}px),calc(-50% + ${Math.sin(ang)*vel}px)) scale(0)`, opacity:0 }
    ], { duration:dur, easing:'cubic-bezier(0,0,0.2,1)', fill:'forwards' });
    setTimeout(() => p.remove(), dur + 50);
  }
});

/* ══════════════════════════════════════════════════════
   GALLERY SLIDER — Multiple photos per card
══════════════════════════════════════════════════════ */
document.querySelectorAll('.gitem-slider').forEach(slider => {
  const slides   = slider.querySelector('.gitem-slides');
  const imgs     = slides.querySelectorAll('.gitem-img');
  const dotsWrap = slider.querySelector('.slide-dots');
  const prevBtn  = slider.querySelector('.slide-prev');
  const nextBtn  = slider.querySelector('.slide-next');
  let current    = 0;
  const total    = imgs.length;

  slides.style.width   = `${total * 100}%`;
  slides.style.display = 'flex';
  slides.style.height  = '100%';

  imgs.forEach(img => {
    img.style.width      = `${100 / total}%`;
    img.style.minWidth   = `${100 / total}%`;
    img.style.flexShrink = '0';
    img.style.height     = '100%';
    img.style.objectFit  = 'cover';
  });

  if (total <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }

  imgs.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', e => { e.stopPropagation(); goTo(i); });
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    slides.style.transform = `translateX(-${current * (100 / total)}%)`;
    dotsWrap.querySelectorAll('.slide-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', e => { e.stopPropagation(); goTo(current + 1); });

  let startX = 0;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
});


/* ══════════════════════════════════════════════════════
   19. GALLERY FILTER + LIGHTBOX
══════════════════════════════════════════════════════ */
const filterBtns   = document.querySelectorAll('.gfbtn');
const galleryItems = document.querySelectorAll('.gitem');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
      item.classList.toggle('visible-item', match);
    });
  });
  galleryItems.forEach(item => item.classList.add('visible-item'));
});

const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');
let currentIndex = 0, visibleItems = [];

function openLightbox(index) {
  visibleItems = [...document.querySelectorAll('.gitem.visible-item')];
  currentIndex = index; showLightboxItem(currentIndex);
  lightbox.classList.add('open'); document.body.style.overflow = 'hidden';
}

function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }

function showLightboxItem(index) {
  const item  = visibleItems[index];
  const img   = item.querySelector('.gitem-img');
  const title = item.querySelector('.gitem-overlay-title');
  const desc  = item.querySelector('.gitem-overlay-desc');
  lbImg.style.opacity = '0'; lbImg.style.transform = 'scale(0.95)';
  setTimeout(() => {
    lbImg.src = img ? img.src : '';
    lbCaption.textContent = (title ? title.textContent : '') + (desc ? ' — ' + desc.textContent : '');
    lbImg.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    lbImg.style.opacity = '1'; lbImg.style.transform = 'scale(1)';
  }, 150);
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    visibleItems = [...document.querySelectorAll('.gitem.visible-item')];
    const vIndex = visibleItems.indexOf(item);
    if (vIndex !== -1) openLightbox(vIndex);
  });
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', e => { e.stopPropagation(); currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showLightboxItem(currentIndex); });
lbNext.addEventListener('click', e => { e.stopPropagation(); currentIndex = (currentIndex + 1) % visibleItems.length; showLightboxItem(currentIndex); });
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % visibleItems.length; showLightboxItem(currentIndex); }
  if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; showLightboxItem(currentIndex); }
});


/* ══════════════════════════════════════════════════════
   20. PERSONAL AI CHATBOT
══════════════════════════════════════════════════════ */
const YUSSIF_SYSTEM_PROMPT = `
You are a friendly, enthusiastic personal AI assistant for Mubarik Yussif.
Answer questions about Yussif warmly and concisely (2-4 sentences).
For general knowledge questions outside of Yussif's profile, use your 
best knowledge but always clarify your training data may not be current.
If asked about current events or recent news, say: 
"My knowledge has a cutoff date so I may not have the latest info — 
I'd recommend checking a news source for the most current update! 
But here's what I know: ..."

== ABOUT YUSSIF MUBARIK ==
Full Name: Mubarik Yussif
Location: Ghana
Currently: Computer Science Student
Nationality: Ghanaian
Home Town: Wa, Upper West Region

== ROLES & WORK ==
1. STEM Facilitator at STEAMerChamps Academy
   - Designs and leads hands-on STEM sessions for young learners
   - Makes complex STEM concepts engaging and accessible

2. Technical Coach — Ghana Science & Technology Explorer Prize (GSTEP)
   - Mentors student teams to build competitive tech projects
   - Guides students to pitch and present their innovations nationally

== STUDENT PROJECTS COACHED (GSTEP) ==
1. Automatic Vehicle Fire Extinguisher — Team Competition Crushers
   - ESP32-based fire detection and suppression system for vehicles
   - Sends SMS alert to nearest fire station automatically

2. Smart Student Crossing System — Team Critical Thinkers
   - Intelligent traffic light system to help students cross safely
   - Uses ESP32 and sensors to detect and control traffic flow

3. AquaSmart Fish Feeder — Team Aqua Smart Engineers
   - Automated fish feeding + water quality monitoring system
   - Sends real-time alerts to farmers via ESP32

4. FamilyTrade Book Swap Platform — Team Family Trade
   - Flutter app for community book swapping
   - AI assistant powered by Groq and LLaMA
   - Hotspot map to find nearby swap locations

== SKILLS ==
- Programming: Python, JavaScript (85%)
- Web Development: HTML, CSS, JS frameworks (80%)
- STEM Education & Facilitation (95%)
- Robotics & Electronics — Arduino, sensors (75%)
- Coaching & Mentoring (90%)
- Creative Problem Solving (88%)
- Public Speaking (85%)

== CERTIFICATES ==
- GSTEP Certificate — Ghana Science & Technology Explorer Prize
- Introduction to Cybersecurity — Cisco Networking Academy
- Youth Summit Certificate — World Bank Group
- Responsive Web Design — freeCodeCamp
- A2 English for Developers — freeCodeCamp
- STEMpedia Certificate — STEMpedia

== STATS ==
- 50+ students mentored
- 3+ years in STEM education
- Based in Ghana

== CONTACT ==
- Email: pelpuon@gmail.com
- Twitter: @YussifMubarik
- LinkedIn: linkedin.com/in/pelnum
- GitHub: github.com/Numbu-bit

== PERSONALITY ==
Yussif is passionate, energetic, creative, and deeply committed to using technology
to uplift communities in Ghana. He believes education is the most powerful tool for change.

== INSTRUCTIONS ==
- Be warm, friendly and enthusiastic
- Use emojis occasionally 😊
- If asked about hiring or collaboration, direct to pelpuon@gmail.com
- Never make up information not listed above
- For unknown info say: "I'm not sure, but ask Yussif directly at pelpuon@gmail.com!"
`;

const chatBubble      = document.getElementById('chatBubble');
const chatWindow      = document.getElementById('chatWindow');
const chatCloseBtn    = document.getElementById('chatCloseBtn');
const chatMessages    = document.getElementById('chatMessages');
const chatInput       = document.getElementById('chatInput');
const chatSendBtn     = document.getElementById('chatSendBtn');
const chatSuggestions = document.getElementById('chatSuggestions');

let chatOpen = false, chatHistory = [], chatIsTyping = false;

function toggleChat() {
  chatOpen = !chatOpen;
  chatBubble.classList.toggle('open', chatOpen);
  chatWindow.classList.toggle('open', chatOpen);
  if (chatOpen) setTimeout(() => chatInput.focus(), 400);
}

chatBubble.addEventListener('click', toggleChat);
chatCloseBtn.addEventListener('click', toggleChat);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && chatOpen) toggleChat(); });

document.querySelectorAll('.chat-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    if (chatSuggestions) chatSuggestions.style.display = 'none';
    sendChatMessage(chip.dataset.msg);
  });
});

chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } });
chatSendBtn.addEventListener('click', handleSend);

function handleSend() {
  const msg = chatInput.value.trim();
  if (!msg || chatIsTyping) return;
  chatInput.value = '';
  if (chatSuggestions) chatSuggestions.style.display = 'none';
  sendChatMessage(msg);
}

function addMessage(role, text) {
  const wrapper = document.createElement('div');
  wrapper.className = `chat-msg ${role}`;
  const avatar = document.createElement('div');
  avatar.className = 'chat-msg-avatar';
  avatar.textContent = role === 'bot' ? 'YM' : 'You';
  const bubble = document.createElement('div');
  bubble.className = 'chat-msg-bubble';
  bubble.textContent = text;
  wrapper.appendChild(avatar); wrapper.appendChild(bubble);
  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
  const w = document.createElement('div'); w.className = 'chat-typing'; w.id = 'typingIndicator';
  const a = document.createElement('div'); a.className = 'chat-msg-avatar'; a.textContent = 'YM';
  const d = document.createElement('div'); d.className = 'chat-typing-dots';
  d.innerHTML = '<span></span><span></span><span></span>';
  w.appendChild(a); w.appendChild(d); chatMessages.appendChild(w);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() { const el = document.getElementById('typingIndicator'); if (el) el.remove(); }

async function sendChatMessage(userText) {
  if (chatIsTyping) return;
  chatIsTyping = true; chatSendBtn.disabled = true;
  addMessage('user', userText);
  chatHistory.push({ role: 'user', content: userText });
  showTyping();

  try {
    const res = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    messages: [{ role: 'system', content: YUSSIF_SYSTEM_PROMPT }, ...chatHistory.slice(-6)]
  })
});
    const data = await res.json();
    removeTyping();
    const reply = data.choices?.[0]?.message?.content
      || "Sorry, I had trouble with that. Try again or contact Yussif directly! 😊";
    chatHistory.push({ role: 'assistant', content: reply });
    addMessage('bot', reply);
  } catch (err) {
    removeTyping();
    addMessage('bot', "Oops! Something went wrong 😅 Reach out at pelpuon@gmail.com");
  }

  chatIsTyping = false; chatSendBtn.disabled = false; chatInput.focus();
}


/* ══════════════════════════════════════════════════════
   21. AUTO WELCOME CHATBOT
══════════════════════════════════════════════════════ */
setTimeout(() => {
  chatBubble.classList.add('open');
  chatWindow.classList.add('open');
  chatOpen = true;

  setTimeout(() => {
    const w = document.createElement('div');
    w.className = 'chat-msg bot';
    w.innerHTML = `
      <div class="chat-msg-avatar">YM</div>
      <div class="chat-msg-bubble">
        👋 Welcome to Yussif's portfolio! I'm his personal AI assistant.<br><br>
        How can I help you today? Ask me anything about Yussif's background, projects, skills, or how to get in touch! 😊
      </div>`;
    chatMessages.appendChild(w);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(() => {
      chatBubble.classList.remove('open');
      chatWindow.classList.remove('open');
      chatOpen = false;
    }, 5000);
  }, 600);
}, 3000);