document.addEventListener('DOMContentLoaded', () => {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const modal = document.getElementById('patrickModal');
    const closeBtn = document.querySelector('.close-btn');

    // Patrick Images
    const patrickImages = [
        'patrick.png',
        'patrick_eating.png',
        'patrick_sleeping.png',
        'patrick_selfie.png'
    ];

    // Open Modal
    surpriseBtn.addEventListener('click', () => {
        // Pick random image
        const randomImage = patrickImages[Math.floor(Math.random() * patrickImages.length)];
        const patrickImg = modal.querySelector('.patrick-img');
        patrickImg.src = randomImage;

        modal.style.display = 'flex';
        // Force reflow for transition
        void modal.offsetWidth;
        modal.classList.add('show');
    });

    // Close Modal
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match transition duration
    }

    closeBtn.addEventListener('click', closeModal);

    // Close on clicking background
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});
