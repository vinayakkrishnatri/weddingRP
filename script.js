/* ==========================================================================
   1. AUTOMATIC SLIDING BOX PANEL ENVELOPE CONTROLLER
   ========================================================================== */
function openInvitation() {
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.7;
        music.play().catch(err => console.log("Audio pipeline securely ready:", err));
    }

    const leftDoor = document.getElementById('left-door');
    const rightDoor = document.getElementById('right-door');
    const sealTrigger = document.getElementById('envelope-trigger');
    const mainContent = document.getElementById('main-content');
    const coverPage = document.getElementById('cover-page');
    
    if (leftDoor && rightDoor && sealTrigger) {
        leftDoor.classList.add('open-slide-left');
        rightDoor.classList.add('open-slide-right');
        sealTrigger.classList.add('fade-out-seal');
        
        setTimeout(function() {
            if (mainContent && coverPage) {
                coverPage.classList.add('hidden');
                mainContent.classList.remove('hidden');
                
                if (typeof window.initScratchCanvas === 'function') {
                    window.initScratchCanvas();
                }
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const envelopeTrigger = document.getElementById('envelope-trigger');
    if (envelopeTrigger) {
        envelopeTrigger.addEventListener('click', openInvitation);
    }
});


/* ==========================================================================
   2. ACCURATE CHRONO COUNTDOWN CLOCK ENGINE (TARGETING 7 JULY 0:00 AM)
   ========================================================================== */
// Standardizes the wedding target to the exact start of July 7, 2026 (0:00 AM IST)
const weddingTargetTime = new Date("2026-07-07T00:00:00+05:30").getTime();

const countdownInterval = setInterval(function() {
    const timeNow = new Date().getTime();
    const metricsDelta = weddingTargetTime - timeNow;

    // If the countdown is complete, gracefully lock display metrics at zero
    if (metricsDelta <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const computeDays = Math.floor(metricsDelta / (1000 * 60 * 60 * 24));
    const computeHours = Math.floor((metricsDelta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const computeMinutes = Math.floor((metricsDelta % (1000 * 60 * 60)) / (1000 * 60));
    const computeSeconds = Math.floor((metricsDelta % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        daysEl.innerText = String(computeDays).padStart(2, '0');
        hoursEl.innerText = String(computeHours).padStart(2, '0');
        minutesEl.innerText = String(computeMinutes).padStart(2, '0');
        secondsEl.innerText = String(computeSeconds).padStart(2, '0');
    }
}, 1000);

/* ==========================================================================
   3. MOBILE-SECURE INTERACTIVE SCRATCH REVEAL CANCES ENGINE
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let isDrawing = false;
    
    window.initScratchCanvas = function() {
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return; 
        
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#e5c07b');
        gradient.addColorStop(0.3, '#dca134');
        gradient.addColorStop(0.7, '#f3d393'); 
        gradient.addColorStop(1, '#b38628');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        let fontConfig = 'italic 20px Cormorant Garamond';
        let instructionText = 'Scratch here to reveal the wedding countdown ✨';
        
        if (viewportWidth <= 500) {
            fontConfig = 'italic 15px Cormorant Garamond'; 
            instructionText = 'Scratch here to reveal the countdown ✨'; 
        }
        
        ctx.fillStyle = '#ffffff';
        ctx.font = fontConfig;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.shadowColor = 'rgba(139, 99, 23, 0.4)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 2;
        
        ctx.fillText(instructionText, canvas.width / 2, canvas.height / 2);
        
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    };

    window.initScratchCanvas();
    window.addEventListener('resize', window.initScratchCanvas);

    function scratch(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();
        
        checkRevealPercentage();
    }

    function checkRevealPercentage() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let clearedPixels = 0;
        
        for (let i = 3; i < pixels.length; i += 32) { 
            if (pixels[i] === 0) clearedPixels++;
        }
        
        const percentageCleared = (clearedPixels / (pixels.length / 32)) * 100;
        
        if (percentageCleared > 45) {
            canvas.style.transition = 'opacity 0.6s ease-out';
            canvas.style.opacity = '0';
            setTimeout(() => canvas.remove(), 600); 
        }
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    window.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);

    canvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        scratch(e);
    });
    window.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', (e) => {
        scratch(e);
    });
});
