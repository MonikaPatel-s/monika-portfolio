/* ============================================
   MONIKA PATEL PORTFOLIO — script.js
   ============================================ */

// ===== SPLASH INTRO SCREEN =====
const splashHellos = [
    'Hello', 'नमस्ते', 'Hola', 'Bonjour', 'Ciao',
    'مرحبا', 'こんにちは', '안녕하세요', 'Olá', 'Hallo',
    'Привет', 'Merhaba', '你好'
];
const splashEl   = document.getElementById('splashScreen');
const splashText = document.getElementById('splashHello');

function runSplash() {
    let i = 0;
    // show first word
    splashText.textContent = splashHellos[0];
    splashText.classList.add('show');

    // 1000ms total / 13 words ≈ 77ms each
    const interval = setInterval(() => {
        splashText.classList.remove('show');
        splashText.classList.add('hide');

        setTimeout(() => {
            i++;
            if (i >= splashHellos.length) {
                clearInterval(interval);
                splashEl.classList.add('hidden');
                document.body.style.overflow = '';
                return;
            }
            splashText.classList.remove('hide');
            splashText.textContent = splashHellos[i];
            splashText.classList.add('show');
        }, 30);
    }, 77);
}

// Lock scroll while splash is showing
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
    setTimeout(runSplash, 200);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    cursor.classList.add('visible');
});
document.addEventListener('mouseleave', () => cursor.classList.remove('visible'));
document.querySelectorAll('a, button, .email-copy, .stack-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ===== PARTICLE NETWORK =====
(function() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const COUNT = 60, LINK_DIST = 140, COLOR = 'rgba(180,140,100,';

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x: Math.random() * W, y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = COLOR + '0.5)';
            ctx.fill();
        });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < LINK_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = COLOR + (1 - dist / LINK_DIST) * 0.3 + ')';
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// ===== HELLO IN DIFFERENT LANGUAGES =====
const hellos = [
    'Hello', 'नमस्ते', 'Hola', 'Bonjour', 'Ciao',
    'مرحبا', 'こんにちは', '안녕하세요', 'Olá', 'Hallo',
    'Привет', 'Merhaba', '你好', 'Salut', 'Sawubona'
];
let helloIndex = 0;
const helloEl = document.getElementById('helloText');

function cycleHello() {
    helloIndex = (helloIndex + 1) % hellos.length;
    helloEl.style.opacity = '0';
    helloEl.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        helloEl.textContent = hellos[helloIndex];
        helloEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        helloEl.style.opacity = '1';
        helloEl.style.transform = 'translateY(0)';
    }, 300);
}
helloEl.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
setInterval(cycleHello, 400);

// ===== GLITCH / SCRAMBLE TEXT EFFECT =====
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

function scramble(el, finalText, duration = 1400) {
    let start = null;
    const totalFrames = Math.floor(duration / 16);
    let frame = 0;

    function step(timestamp) {
        if (!start) start = timestamp;
        frame++;
        const progress = frame / totalFrames;
        const revealCount = Math.floor(progress * finalText.length);

        let display = '';
        for (let i = 0; i < finalText.length; i++) {
            if (finalText[i] === ' ' || finalText[i] === '.') {
                display += finalText[i];
            } else if (i < revealCount) {
                display += finalText[i];
            } else {
                display += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        el.textContent = display;

        if (frame < totalFrames) {
            requestAnimationFrame(step);
        } else {
            el.textContent = finalText;
        }
    }
    requestAnimationFrame(step);
}

// Run scramble on page load
window.addEventListener('load', () => {
    const first = document.getElementById('firstName');
    const last  = document.getElementById('lastName');
    if (first) scramble(first, 'MONIKA', 1200);
    if (last)  setTimeout(() => scramble(last, 'PATEL.', 1400), 400);
});

// ===== SCROLL FADE LINES (WHO AM I) =====
function updateFadeLines() {
    const lines = document.querySelectorAll('.fade-line');
    const vh = window.innerHeight;
    lines.forEach(line => {
        const rect = line.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        // active if center of line is in middle 60% of viewport
        if (center > vh * 0.15 && center < vh * 0.85) {
            line.classList.add('active');
        } else {
            line.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', updateFadeLines, { passive: true });
updateFadeLines();

// ===== ACCORDION =====
document.querySelectorAll('.accordion-header').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        const isOpen = item.classList.contains('open');
        // close all
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
        // open clicked if it was closed
        if (!isOpen) item.classList.add('open');
    });
});

// ===== PROJECT HOVER PREVIEW =====
const previewCard = document.getElementById('previewCard');
const previewFrame = document.getElementById('previewFrame');
let previewTimeout;

document.querySelectorAll('.project-row[data-preview]').forEach(row => {
    row.addEventListener('mouseenter', () => {
        const url = row.getAttribute('data-preview');
        previewFrame.src = url;
        clearTimeout(previewTimeout);
        previewCard.classList.add('visible');
    });

    row.addEventListener('mousemove', e => {
        const cardW = 420, cardH = 280;
        const margin = 20;
        let x = e.clientX + margin;
        let y = e.clientY - cardH / 2;

        // Keep within viewport
        if (x + cardW > window.innerWidth) x = e.clientX - cardW - margin;
        if (y < 10) y = 10;
        if (y + cardH > window.innerHeight - 10) y = window.innerHeight - cardH - 10;

        previewCard.style.left = x + 'px';
        previewCard.style.top  = y + 'px';
    });

    row.addEventListener('mouseleave', () => {
        previewCard.classList.remove('visible');
        previewTimeout = setTimeout(() => { previewFrame.src = ''; }, 400);
    });
});

// ===== LOCAL TIME =====
function updateTime() {
    const el = document.getElementById('localTime');
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: 'Asia/Kolkata'
    }) + ' IST';
}
updateTime();
setInterval(updateTime, 1000);

// ===== COPY EMAIL =====
const emailBox = document.getElementById('emailCopy');
if (emailBox) {
    emailBox.addEventListener('click', () => {
        navigator.clipboard.writeText('monikasame26@gmail.com').then(() => {
            emailBox.classList.add('copied');
            setTimeout(() => emailBox.classList.remove('copied'), 2500);
        });
    });
}

// ===== CHAR COUNT =====
const textarea = document.querySelector('textarea[name="message"]');
const charCount = document.querySelector('.char-count');
if (textarea && charCount) {
    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        charCount.textContent = `${len} / 30 minimum characters`;
        charCount.style.color = len >= 30 ? '#c0392b' : '#bbb';
    });
}

// ===== FORM SUBMIT =====
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('.send-btn');
        btn.textContent = 'MESSAGE SENT ✓';
        btn.style.background = '#c0392b';
        setTimeout(() => {
            btn.textContent = 'SEND MESSAGE   PROCEED →';
            btn.style.background = '';
            form.reset();
            if (charCount) charCount.textContent = '0 / 30 minimum characters';
        }, 3000);
    });
}

console.log('Monika Patel Portfolio — Loaded');
