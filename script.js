// Target: February 7, 2027 at midnight
const targetDate = new Date('2027-02-07T00:00:00').getTime();

// Reference start date for progress calculation
const startDate = new Date('2026-11-03T00:00:00').getTime();
const totalDuration = targetDate - startDate;

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 25; i++) {
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
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        messageEl.classList.add('show');

        // Hearts meet in the center
        leftHeart.style.left = 'calc(50% - 50px)';
        leftHeart.style.right = 'auto';
        rightHeart.style.right = 'calc(50% - 50px)';
        rightHeart.style.left = 'auto';
        leftHeart.classList.add('met');
        rightHeart.classList.add('met');
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');

    // Progress from 0 (start) to 1 (target date)
    const elapsed = Math.max(0, now - startDate);
    const progress = Math.min(1, elapsed / totalDuration);

    // Move hearts closer: from ~7% to ~42%
    const startPos = 7;
    const endPos = 42;
    const currentPos = startPos + (endPos - startPos) * progress;

    leftHeart.style.left = currentPos + '%';
    rightHeart.style.right = currentPos + '%';
}

createParticles();
updateCountdown();
setInterval(updateCountdown, 1000);