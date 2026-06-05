/**
 * Unveils the main digital wedding invitation card from the cover page layer,
 * activates the background loop tracker music track safely under user interaction gestures.
 */
function openInvitation() {
    const music = document.getElementById('bg-music');
    music.volume = 0.8;
    music.play().catch(err => console.log("Audio waiting for core gesture tap:", err));

    const cover = document.getElementById('cover-page');
    const mainContent = document.getElementById('main-content');
    
    // Step 1: Smoothly fade out the landing page cover
    cover.style.opacity = '0';
    
    setTimeout(function() {
        cover.classList.add('hidden');
        
        // Step 2: Display the underlying document block layouts
        mainContent.classList.remove('hidden');
        
        // Step 3: Trigger structural CSS fade-in slide up animations smoothly
        setTimeout(function() {
            mainContent.classList.add('reveal-active');
        }, 50);
        
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, 800); 
}

// Attach the click trigger callback onto the main cover screen envelope wrapper
document.getElementById('envelope-trigger').addEventListener('click', openInvitation);

// TARGET WEDDING TIMER CLOCK CONFIGURATION STAMP TARGET: JULY 7, 2026
const weddingDate = new Date("July 7, 2026 16:00:00").getTime();

setInterval(function() {
    const rightNow = new Date().getTime();
    const timeLeft = weddingDate - rightNow;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    if(document.getElementById("days")) {
        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }
}, 1000);
