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



    // Magic Conch Logic
    const askConchBtn = document.getElementById('askConchBtn');
    const conchInput = document.getElementById('conchQuestion');
    const conchAnswer = document.getElementById('conchAnswer');
    const conchIcon = document.querySelector('.conch-icon');

    async function askTheConch() {
        const question = conchInput.value.trim();
        if (!question) {
            alert('You must ask a question!');
            return;
        }

        // Animation
        conchIcon.style.transform = 'scale(0.9) rotate(5deg)';
        setTimeout(() => {
            conchIcon.style.transform = '';
        }, 150);

        try {
            conchAnswer.classList.remove('visible');
            conchAnswer.textContent = 'Consulting the shell...';
            conchAnswer.classList.add('visible');

            const response = await fetch('http://localhost:5000/api/magic-conch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });

            const data = await response.json();

            // Artificial delay for suspense
            setTimeout(() => {
                conchAnswer.textContent = `"${data.answer}"`;
            }, 800);

        } catch (error) {
            console.error('Error:', error);
            conchAnswer.textContent = "The Magic Conch is sleeping (Server Error)";
        }
    }

    askConchBtn.addEventListener('click', askTheConch);
    conchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            askTheConch();
        }
    });

});
