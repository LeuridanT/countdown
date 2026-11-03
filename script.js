// Target: February 7, 2027 at midnight
const targetDate = new Date('2027-02-07T00:00:00').getTime();
const startDate = new Date('2026-11-03T00:00:00').getTime();
const totalDuration = targetDate - startDate;

const phrases = [
    "I choose you, still.",
    "Closer every day.",
    "This heart is yours.",
    "Waiting for you.",
    "Forever, if you'll have me."
];

let ornamentClicks = 0;
const secretThreshold = 5;

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 6 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 15 + 12) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(p);
    }
}

function showWhisper(text, x, y) {
    const whisper = document.getElementById('whisper');
    whisper.textContent = text;
    whisper.style.left = (x - 80) + 'px';
    whisper.style.top = (y - 40) + 'px';
    whisper.classList.add('show');
    setTimeout(() => whisper.classList.remove('show'), 1800);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const messageEl = document.getElementById('message');
    const leftHeart = document.getElementById('heartLeft');
    const rightHeart = document.getElementById('heartRight');

    if (distance <= 0) {
        if (daysEl) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            messageEl.classList.add('show');
        }
        leftHeart.style.left = 'calc(50% - 45px)';
        leftHeart.style.right = 'auto';
        rightHeart.style.right = 'calc(50% - 45px)';
        rightHeart.style.left = 'auto';
        leftHeart.classList.add('met');
        rightHeart.classList.add('met');
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    if (daysEl) {
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
    }

    const elapsed = Math.max(0, now - startDate);
    const progress = Math.min(1, elapsed / totalDuration);

    const startPos = 6;
    const endPos = 40;
    const currentPos = startPos + (endPos - startPos) * progress;

    leftHeart.style.left = currentPos + '%';
    rightHeart.style.right = currentPos + '%';
}

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// Heart interactions
document.getElementById('heartLeft')?.addEventListener('click', (e) => {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    showWhisper(phrase, e.clientX, e.clientY);
});

document.getElementById('heartRight')?.addEventListener('click', (e) => {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    showWhisper(phrase, e.clientX, e.clientY);
});

// Easter egg
function handleOrnamentClick() {
    ornamentClicks++;
    if (ornamentClicks >= secretThreshold) {
        document.getElementById('secret').classList.add('show');
        setTimeout(() => document.getElementById('secret').classList.remove('show'), 4000);
        ornamentClicks = 0;
    }
}

document.getElementById('ornament1')?.addEventListener('click', handleOrnamentClick);
document.getElementById('ornament2')?.addEventListener('click', handleOrnamentClick);

// Mouse influence on hearts
document.addEventListener('mousemove', (e) => {
    const hearts = document.querySelectorAll('.heart');
    const centerX = window.innerWidth / 2;
    const deltaX = (e.clientX - centerX) / centerX;
    hearts.forEach(heart => {
        if (!heart.classList.contains('met')) {
            heart.style.transform = `translateY(-50%) rotate(${deltaX * 3}deg)`;
        }
    });
});

// Checklist with localStorage
function initChecklist() {
    const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
    const saved = JSON.parse(localStorage.getItem('travelChecklist') || '{}');

    checkboxes.forEach(cb => {
        const item = cb.dataset.item;
        if (saved[item]) {
            cb.checked = true;
            cb.parentElement.classList.add('checked');
        }
        cb.addEventListener('change', () => {
            saved[item] = cb.checked;
            localStorage.setItem('travelChecklist', JSON.stringify(saved));
            cb.parentElement.classList.toggle('checked', cb.checked);
        });
    });

    document.getElementById('resetChecklist')?.addEventListener('click', () => {
        localStorage.removeItem('travelChecklist');
        checkboxes.forEach(cb => {
            cb.checked = false;
            cb.parentElement.classList.remove('checked');
        });
    });
}

createParticles();
updateCountdown();
setInterval(updateCountdown, 1000);
initChecklist();