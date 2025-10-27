const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Define galleries
const galleries = {
    sodtools: [
        "assets/sod-preview.png",
        "assets/sod1.png",
        "assets/sod2.png",
        "assets/sod3.png",
        "assets/sod4.png",
        "assets/sod5.png",
        "assets/sod6.png",
        "assets/sod7.png",
    ],
    pam: [
        "assets/pam1.png",
        "assets/pam2.png",
        "assets/pam3.png",
        "assets/pam4.png",
        "assets/pam5.png",
        "assets/pam6.png"
    ],
    ule: [
        "assets/ule1.png",
        "assets/ule2.png",
        "assets/ule3.png",
        "assets/ule4.png",
        "assets/ule5.png"
    ],
    websites: [
        "assets/websites1.png",
        "assets/websites2.png",
        "assets/websites3.png"
    ]
};

let currentGallery = [];
let currentIndex = 0;

function showImage(index) {
    if (index < 0) index = currentGallery.length - 1;
    if (index >= currentGallery.length) index = 0;
    currentIndex = index;
    modalImage.src = currentGallery[currentIndex];
}

function openModal(galleryKey, startIndex) {
    currentGallery = galleries[galleryKey];
    currentIndex = startIndex;
    showImage(currentIndex);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

window.closeModal = function () {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
};

// Arrows
prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

// Bind previews
document.querySelectorAll('[data-gallery]').forEach((img) => {
    const galleryKey = img.getAttribute('data-gallery');
    const index = parseInt(img.getAttribute('data-index'), 10);
    img.addEventListener('click', () => openModal(galleryKey, index));
});

// Background click closes
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Keyboard
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
});

// Swipe
let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) showImage(currentIndex + 1); // swipe left -> next
        else showImage(currentIndex - 1);          // swipe right -> prev
    }
});