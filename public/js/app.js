// Get all DOM elements
const esay = document.getElementById("esay");
const medium = document.getElementById("medium");
const Harder = document.getElementById("Harder");
const esay1 = document.getElementById("esay1");
const medium1 = document.getElementById("medium1");
const Harder1 = document.getElementById("Harder1");
const div = document.getElementById("div");

// Game variables
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let currentLevel = null;

// Hide all game sections initially
esay1.style.display = "none";
medium1.style.display = "none";
Harder1.style.display = "none";

// Card flip function
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second click
    secondCard = this;
    checkForMatch();
}

// Check for match
function checkForMatch() {
    const isMatch = firstCard.querySelector('.card-back img').src === 
                   secondCard.querySelector('.card-back img').src;

    isMatch ? disableCards() : unflipCards();
}

// Disable cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

// Unflip cards
function unflipCards() {
    lockBoard = true;
    firstCard.classList.add('mismatched');
    secondCard.classList.add('mismatched');

    setTimeout(() => {
        firstCard.classList.remove('flipped', 'mismatched');
        secondCard.classList.remove('flipped', 'mismatched');
        resetBoard();
    }, 1500);
}

// Reset board
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Initialize game level
function initializeLevel(container) {
    const cards = container.querySelectorAll('.card');
    cards.forEach(card => {
        // Remove existing listener if any
        card.removeEventListener('click', flipCard);
        // Add new click listener
        card.addEventListener('click', flipCard);
        // Remove any existing classes
        card.classList.remove('flipped', 'matched', 'mismatched');
    });
    resetBoard();
}

// Show game section
function showGameSection(section) {
    // Hide menu and other sections
    div.style.display = "none";
    esay1.style.display = "none";
    medium1.style.display = "none";
    Harder1.style.display = "none";
    
    // Show selected section
    section.style.display = "block";
    currentLevel = section;
    
    // Initialize cards
    initializeLevel(section);
}

// Event listeners for difficulty buttons
esay.addEventListener("click", () => showGameSection(esay1));
medium.addEventListener("click", () => showGameSection(medium1));
Harder.addEventListener("click", () => showGameSection(Harder1));

// Back to menu button
const backButton = document.createElement('button');
backButton.innerHTML = '← Menu';
backButton.className = 'back-button';
document.body.appendChild(backButton);

backButton.addEventListener('click', () => {
    esay1.style.display = "none";
    medium1.style.display = "none";
    Harder1.style.display = "none";
    div.style.display = "flex";
});

// Add a back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});