/* ==========================================================================
   1. DIGITAL ENVELOPE OPENING ENGINE & SOUNDTRACK INITIALIZATION
   ========================================================================== */
function openInvitation() {
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.7;
        music.play().catch(err => console.log("Audio pipeline safely deferred:", err));
    }

    const cover = document.getElementById('cover-page');
    const mainContent = document.getElementById('main-content');
    
    if (cover && mainContent) {
        cover.style.opacity = '0';
        
        setTimeout(function() {
            cover.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            /* CRITICAL LAYOUT RE-RENDER: Recalculates canvas dimensions 
               the split second the hidden wrapper falls away */
            if (typeof window.initScratchCanvas === 'function') {
                window.initScratchCanvas();
            }
            
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 800);
    }
}

// Secure early binding for the envelope click trigger
document.addEventListener('DOMContentLoaded', () => {
    const envelopeTrigger = document.getElementById('envelope-trigger');
    if (envelopeTrigger) {
        envelopeTrigger.addEventListener('click', openInvitation);
    }
});


/* ==========================================================================
   2. LIVE CHRONO WEDDING COUNTDOWN TIMER CLOCK
   ========================================================================== */
const weddingTargetTime = new Date("July 7, 2026 16:00:00").getTime();

setInterval(function() {
    const timeNow = new Date().getTime();
    const metricsDelta = weddingTargetTime - timeNow;

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
   3. INTERACTIVE GOLD METALLIC SCRATCH REVEAL MODULE ENGINE (UNIFIED BLOCK)
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let isDrawing = false;
    
    /**
     * Dynamically handles scaling for the larger combined card canvas frame.
     */
    window.initScratchCanvas = function() {
        if (!canvas.offsetParent) return; 
        
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Premium textured gold layout gradient matrix
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#e5c07b');
        gradient.addColorStop(0.3, '#dca134');
        gradient.addColorStop(0.7, '#f3d393'); // Adds an inner metallic sheen line
        gradient.addColorStop(1, '#b38628');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // FIX: Larger, clearer typography layout settings for the canvas overlay text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'italic 20px Cormorant Garamond'; // Bumped up from 16px to 20px
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Drops an elegant shadow under the canvas instruction string for readability
        ctx.shadowColor = 'rgba(139, 99, 23, 0.4)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 2;
        
        ctx.fillText('Scratch here to reveal the wedding countdown ✨', canvas.width / 2, canvas.height / 2);
        
        // Clear shadow parameters so it doesn't bleed into eraser strokes
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
        ctx.arc(x, y, 26, 0, Math.PI * 2); // Scratch diameter widened to 26px for smoother reveals
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
        
        // Clean snap fade-away when 45% of the overall combined area is scratched
        if (percentageCleared > 45) {
            canvas.style.transition = 'opacity 0.7s ease-out';
            canvas.style.opacity = '0';
            setTimeout(() => canvas.remove(), 700);
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
