/* =============================== */
/* GLOBAL                          */
/* =============================== */
const cover = document.getElementById("cover");
const slides = document.querySelectorAll(".slide");
const body = document.body;
const music = document.getElementById("musik");
const musicBtn = document.getElementById("musicBtn");

/* =============================== */
/* KUNCI SCROLL SAAT LOAD          */
/* =============================== */
document.addEventListener("DOMContentLoaded", () => {
    body.classList.add("lock");
    slides.forEach(slide => slide.classList.remove("show"));
});

/* =============================== */
/* BUKA UNDANGAN                   */
/* =============================== */
function bukaUndangan() {
    cover.classList.add("hide");
    body.classList.remove("lock");

    setTimeout(() => {
        cover.style.display = "none";
    }, 600);

    slides.forEach((slide, i) => {
        setTimeout(() => slide.classList.add("show"), i * 200);
    });

    if (music) music.play().catch(() => {});
}

/* =============================== */
/* TOGGLE MUSIK                    */
/* =============================== */
function toggleMusic() {
    if (!music) return;

    if (music.paused) {
        music.play();
        musicBtn.textContent = "🔊";
    } else {
        music.pause();
        musicBtn.textContent = "🔇";
    }
}

/* =============================== */
/* ANIMASI SLIDE SAAT SCROLL       */
/* =============================== */
window.addEventListener("scroll", () => {
    slides.forEach(slide => {
        const rect = slide.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            slide.classList.add("show");
        }
    });
});

/* ================================================= */
/* 🌸 BACKGROUND KELopak SAKURA JATUH                */
/* ================================================= */
const canvas = document.getElementById("flowers");
const ctx = canvas.getContext("2d");

let w, h;
function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const petals = [];
const PETAL_COUNT = 45;

class SakuraPetal {
    constructor() {
        this.reset();
        this.y = Math.random() * h;
    }

    reset() {
        this.x = Math.random() * w;
        this.y = -30;
        this.size = Math.random() * 8 + 12;
        this.speedY = Math.random() * 1 + 0.6;
        this.speedX = Math.random() * 1 - 0.5;
        this.rotate = Math.random() * Math.PI * 2;
        this.rotateSpeed = Math.random() * 0.02 - 0.01;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) + this.speedX;
        this.rotate += this.rotateSpeed;

        if (this.y > h + 40) this.reset();
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate);
        ctx.globalAlpha = this.opacity;

        ctx.fillStyle = "#f6b1c3";
        ctx.beginPath();

        // BENTUK KELopak SAKURA (BUKAN BULAT)
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(
            this.size * 0.8, -this.size * 0.6,
            this.size * 0.8, this.size * 0.6,
            0, this.size
        );
        ctx.bezierCurveTo(
            -this.size * 0.8, this.size * 0.6,
            -this.size * 0.8, -this.size * 0.6,
            0, -this.size
        );

        ctx.fill();
        ctx.restore();
    }
}

/* =============================== */
/* START SAKURA                    */
/* =============================== */
for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(new SakuraPetal());
}

function animateSakura() {
    ctx.clearRect(0, 0, w, h);
    petals.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateSakura);
}
animateSakura();
