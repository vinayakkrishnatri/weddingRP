document.getElementById('open-btn').addEventListener('click', function() {
    const music = document.getElementById('bg-music');
    music.volume = 0.8;

    music.play().then(function() {
        console.log("Audio playing seamlessly.");
    }).catch(function(error) {
        console.log("Audio stream context noted:", error);
    });

    const cover = document.getElementById('cover-page');
    cover.style.opacity = '0';
    
    setTimeout(function() {
        cover.classList.add('hidden');
        
        const mainContent = document.getElementById('main-content');
        mainContent.classList.remove('hidden');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
});

// UPDATED TARGET TIMESTAMP: JULY 7, 2026
const weddingDate = new Date("July 7, 2026 16:00:00").getTime();

const countdownTracker = setInterval(function() {
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

    if (timeLeft < 0) {
        clearInterval(countdownTracker);
        document.getElementById("timer").innerHTML = "<h3 style='font-family: var(--font-script); font-size: 2rem;'>The Big Day is Here!</h3>";
    }
}, 1000);