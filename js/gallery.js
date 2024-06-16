let currentImageIndex = 1;
const maxImagesDankRPG = 4;
const maxImagesWebsites = 2;

function getCurrentMaxImages() {
    const currentImageType = getCurrentImageType();
    if (currentImageType === 'dankrpg') {
        return maxImagesDankRPG;
    } else if (currentImageType === 'websites') {
        return maxImagesWebsites;
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
    updateImageCounter(maxImages); // Update image counter
    toggleArrows(); // Toggle arrows visibility after image change
}

// Function to update image counter
function updateImageCounter(maxImages) {
    const counterElement = document.getElementById('imageCounter');
    const hasMultipleImages = maxImages > 1;
    if (hasMultipleImages) {
        counterElement.textContent = `Image ${currentImageIndex} of ${maxImages}`;
        counterElement.style.display = 'block'; // Show the counter if there are multiple images
    } else {
        counterElement.style.display = 'none'; // Hide the counter if there's only one image
    }
}

let currentImageType;
const portfolioImages = document.querySelectorAll('.portfolio-image');

portfolioImages.forEach(image => {
    image.addEventListener('click', function() {
        const fullImageSrc = this.getAttribute('data-src');
        document.getElementById('fullImage').src = fullImageSrc;
        document.getElementById('overlay').style.display = 'flex';
        currentImageIndex = 1; // Reset to first image when opening the overlay
        toggleArrows(); // Toggle arrows visibility after overlay opens
        currentImageType = getCurrentImageType(); // Update current image type
        let maxImages;
        if (currentImageType === 'dankrpg') {
            maxImages = maxImagesDankRPG;
        } else if (currentImageType === 'websites') {
            maxImages = maxImagesWebsites;
        } else if (currentImageType === 'yanta '){
            maxImages = 0;
        }
        updateImageCounter(maxImages); // Update image counter initially
    });
});

function getCurrentImageType() {
    const fullImageSrc = document.getElementById('fullImage').src;
    if (fullImageSrc.includes('dankrpg')) {
        return 'dankrpg';
    } else if (fullImageSrc.includes('websites')) {
        return 'websites';
    } else if (fullImageSrc.includes('yanta')) {
        return 'yanta';
    }
}


document.getElementById('overlay').addEventListener('click', function(e) {
    if (e.target.id === 'overlay') {
        this.style.display = 'none';
    }
});

function toggleArrows() {
    const hasMultipleImages = document.getElementById('fullImage').src.includes('dankrpg') || document.getElementById('fullImage').src.includes('websites');
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach(arrow => {
        arrow.style.display = hasMultipleImages ? 'block' : 'none';
    });
}

// Add event listener for keyboard arrow keys
document.addEventListener('keydown', function(event) {
    const overlay = document.getElementById('overlay');
    const hasMultipleImages = overlay.style.display === 'flex' && (document.getElementById('fullImage').src.includes('dankrpg') || document.getElementById('fullImage').src.includes('websites'));
    const maxImages = getCurrentImageType() === 'dankrpg' ? maxImagesDankRPG : maxImagesWebsites;

    if (hasMultipleImages) {
        if (event.key === 'ArrowLeft') {
            changeImage(-1, maxImages);
        } else if (event.key === 'ArrowRight') {
            changeImage(1, maxImages);
        }
    }
});

function getCurrentImageType() {
    const fullImageSrc = document.getElementById('fullImage').src;
    if (fullImageSrc.includes('dankrpg')) {
        return 'dankrpg';
    } else if (fullImageSrc.includes('websites')) {
        return 'websites';
    } else if (fullImageSrc.includes('yanta')) {
        return 'yanta';
    }
}

function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
}


// Mobile
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
        // Swipe right, go to previous image
        changeImage(-1, getCurrentMaxImages());
    } else if (deltaX < -swipeThreshold) {
        // Swipe left, go to next image
        changeImage(1, getCurrentMaxImages());
    }
});
