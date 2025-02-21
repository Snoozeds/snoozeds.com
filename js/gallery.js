let currentImageIndex = 1;
const maxImagesULE = 5;
const maxImagesPAM = 4;
const maxImagesWeb = 2;

function getCurrentMaxImages() {
    const currentImageType = getCurrentImageType();
    if (currentImageType === 'ule') {
        return maxImagesULE;
    } else if (currentImageType === 'pam') {
        return maxImagesPAM;
    } else if (currentImageType === 'websites') {
        return maxImagesWeb;
    }
}

function changeImage(delta, maxImages) {
    currentImageIndex += delta;
    if (currentImageIndex < 1) {
        currentImageIndex = maxImages;
    } else if (currentImageIndex > maxImages) {
        currentImageIndex = 1;
    }
    const fullImageSrc = `assets/${getCurrentImageType()}${currentImageIndex}.png`;
    document.getElementById('fullImage').src = fullImageSrc;
    updateImageCounter(maxImages);
    toggleArrows();
}

function updateImageCounter(maxImages) {
    const counterElement = document.getElementById('imageCounter');
    const hasMultipleImages = maxImages > 1;
    if (hasMultipleImages) {
        counterElement.textContent = `Image ${currentImageIndex} of ${maxImages}`;
        counterElement.style.display = 'block';
    } else {
        counterElement.style.display = 'none';
    }
}

let currentImageType;
const portfolioImages = document.querySelectorAll('.portfolio-image');

portfolioImages.forEach(image => {
    image.addEventListener('click', function() {
        const fullImageSrc = this.getAttribute('data-src');
        document.getElementById('fullImage').src = fullImageSrc;
        document.getElementById('overlay').style.display = 'flex';
        currentImageIndex = 1;
        toggleArrows();
        currentImageType = getCurrentImageType();
        let maxImages;
        if (currentImageType === 'ule') {
            maxImages = maxImagesULE;
        } else if (currentImageType === 'pam') {
            maxImages = maxImagesPAM;
        } else if (currentImageType === 'websites') {
            maxImages = maxImagesWeb;
        }
        updateImageCounter(maxImages);
    });
});

function getCurrentImageType() {
    const fullImageSrc = document.getElementById('fullImage').src;
    if (fullImageSrc.includes('ule')) {
        return 'ule';
    } else if (fullImageSrc.includes('pam')) {
        return 'pam';
    } else if (fullImageSrc.includes('websites')) {
        return 'websites';
    }
}

document.getElementById('overlay').addEventListener('click', function(e) {
    if (e.target.id === 'overlay') {
        this.style.display = 'none';
    }
});

function toggleArrows() {
    const hasMultipleImages = getCurrentMaxImages() > 1;
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach(arrow => {
        arrow.style.display = hasMultipleImages ? 'block' : 'none';
    });
}

document.addEventListener('keydown', function(event) {
    const overlay = document.getElementById('overlay');
    const fullImageSrc = document.getElementById('fullImage').src.toLowerCase();
    const hasMultipleImages = overlay.style.display === 'flex' &&
        (fullImageSrc.includes('ule') || fullImageSrc.includes('pam') || fullImageSrc.includes('websites'));

    const currentType = getCurrentImageType();
    const maxImages = currentType === 'ule' ? maxImagesULE :
                      currentType === 'pam' ? maxImagesPAM :
                      maxImagesWeb;

    if (hasMultipleImages) {
        if (event.key === 'ArrowLeft') {
            changeImage(-1, maxImages);
        } else if (event.key === 'ArrowRight') {
            changeImage(1, maxImages);
        }
    }
});

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 30;

document.getElementById('fullImage').addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
});

document.getElementById('fullImage').addEventListener('touchmove', function(event) {
    touchEndX = event.touches[0].clientX;
});

document.getElementById('fullImage').addEventListener('touchend', function() {
    const deltaX = touchEndX - touchStartX;
    if (deltaX > swipeThreshold) {
        changeImage(-1, getCurrentMaxImages());
    } else if (deltaX < -swipeThreshold) {
        changeImage(1, getCurrentMaxImages());
    }
});
