const imageModal = document.getElementById('imageModal');
const profileImage = document.getElementById('profileImage');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');

profileImage.addEventListener('click', function () {
    modalImage.src = this.src; // Use the same image source
    imageModal.classList.add('show');
});

closeModal.addEventListener('click', function () {
    imageModal.classList.remove('show');
});

window.addEventListener('click', function (event) {
    if (event.target === imageModal) {
        imageModal.classList.remove('show');
    }
});