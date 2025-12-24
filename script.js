/* =============================== */
/* GLOBAL                          */
/* =============================== */
const cover = document.getElementById("cover");
const slides = document.querySelectorAll(".slide");
const body = document.body;
const music = document.getElementById("musik");
const musicBtn = document.getElementById("musicBtn");

/* =============================== */
/* SAAT HALAMAN LOAD               */
/* =============================== */
document.addEventListener("DOMContentLoaded", () => {
    // Kunci scroll saat cover tampil
    body.classList.add("lock");

    // Pastikan slide belum tampil
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

    // Hilangkan cover setelah animasi
    setTimeout(() => {
        cover.style.display = "none";
    }, 600);

    // Tampilkan slide satu per satu
    slides.forEach((slide, index) => {
        setTimeout(() => {
            slide.classList.add("show");
        }, index * 200);
    });

    // Auto play musik (jika ada)
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
        if (rect.top < window.innerHeight - 100) {
            slide.classList.add("show");
        }
    });
});
