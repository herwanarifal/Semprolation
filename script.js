/* =============================== */
/* GLOBAL                          */
/* =============================== */
const cover = document.getElementById("cover");
const slides = document.querySelectorAll(".slide");
const body = document.body;
const music = document.getElementById("musik");
const musicBtn = document.getElementById("musicBtn");

/* =============================== */
/* CANVAS FLOWERS                  */
/* =============================== */
const canvas = document.getElementById("flowers");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* =============================== */
/* BUNGA SEDERHANA (DEMO)          */
/* =============================== */
let flowers = [];

for (let i = 0; i < 40; i++) {
    flowers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2
    });
}

function drawFlowers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(212,175,55,0.5)";

    flowers.forEach(f => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();

        f.y += f.speed;
        if (f.y > canvas.height) {
            f.y = -10;
            f.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(drawFlowers);
}
drawFlowers();

/* =============================== */
/* SAAT HALAMAN LOAD               */
/* =============================== */
document.addEventListener("DOMContentLoaded", () => {
    // Kunci scroll
    body.classList.add("lock");

    // Sembunyikan semua slide
    slides.forEach(slide => {
        slide.classList.remove("show");
    });
});

/* =============================== */
/* BUKA UNDANGAN                   */
/* =============================== */
function bukaUndangan() {
    // Animasi cover keluar
    cover.classList.add("hide");

    // Buka scroll
    body.classList.remove("lock");

    // Hapus cover setelah animasi
    setTimeout(() => {
        cover.style.display = "none";
    }, 600);

    // Tampilkan slide pertama
    setTimeout(() => {
        slides[0].classList.add("show");
    }, 700);

    // Autoplay musik
    if (music) {
        music.play().catch(() => {});
    }
}

/* =============================== */
/* TOGGLE MUSIK                    */
/* =============================== */
function toggleMusic() {
    if (!music) return;

    if (music.paused) {
        music.play();
        musicBtn.textContent = "🔊";
        musicBtn.classList.remove("pause");
    } else {
        music.pause();
        musicBtn.textContent = "🔇";
        musicBtn.classList.add("pause");
    }
}

/* =============================== */
/* ANIMASI SAAT SCROLL             */
/* =============================== */
window.addEventListener("scroll", () => {
    slides.forEach(slide => {
        const rect = slide.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            slide.classList.add("show");
        }
    });
});
