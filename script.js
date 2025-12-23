const musik = document.getElementById("musik");
const musicBtn = document.getElementById("musicBtn");

function bukaUndangan() {
    document.getElementById("cover").classList.add("hide");

    document.querySelectorAll(".slide").forEach(slide => {
        slide.style.display = "flex";
    });

    document.body.classList.remove("lock");

    musik.play();
    musicBtn.innerHTML = "🔊";

    animatePetals();
    window.scrollTo(0, 0);
}

/* TOGGLE MUSIK */
function toggleMusic() {
    if (musik.paused) {
        musik.play();
        musicBtn.innerHTML = "🔊";
        musicBtn.classList.remove("pause");
    } else {
        musik.pause();
        musicBtn.innerHTML = "🔇";
        musicBtn.classList.add("pause");
    }
}

/* COUNTDOWN - 29 Desember 2025 Pukul 11:00 WIB */
const target = new Date("2025-12-29T11:00:00+07:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const sisa = target - now;
    if (sisa <= 0) return;

    const d = Math.floor(sisa / (1000 * 60 * 60 * 24));
    const h = Math.floor((sisa / (1000 * 60 * 60)) % 24);
    const m = Math.floor((sisa / (1000 * 60)) % 60);
    const s = Math.floor((sisa / 1000) % 60);

    document.getElementById("countdown").innerHTML = `
        <div class="time-box"><span>${d}</span>Hari</div>
        <div class="time-box"><span>${h}</span>Jam</div>
        <div class="time-box"><span>${m}</span>Menit</div>
        <div class="time-box"><span>${s}</span>Detik</div>
    `;
}, 1000);


/* RSVP */
function kirimRSVP(e) {
    e.preventDefault();
    alert("Terima kasih atas konfirmasinya 🌸");
}

/* PARTIKEL BUNGA */
const canvas = document.getElementById("flowers");
const ctx = canvas.getContext("2d");
let w, h;
let petals = [];

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

for (let i = 0; i < 40; i++) {
    petals.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 6 + 4,
        d: Math.random() * 1 + 0.5,
        a: Math.random() * Math.PI * 2
    });
}

function animatePetals() {
    ctx.clearRect(0, 0, w, h);
    petals.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,182,193,0.8)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.d;
        p.x += Math.sin(p.a);
        p.a += 0.01;

        if (p.y > h) {
            p.y = -10;
            p.x = Math.random() * w;
        }
    });
    requestAnimationFrame(animatePetals);
}
