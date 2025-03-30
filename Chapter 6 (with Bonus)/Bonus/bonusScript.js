// DOM elements
const colorToGuessEl = document.getElementById('colorToGuess');
const livesEl = document.querySelector('#lives span');
const scoreEl = document.querySelector('#score span');
const colorGridEl = document.querySelector('.color-grid');
const messageEl = document.getElementById('message');
const gameOverEl = document.getElementById('gameOver');
const finalScoreEl = document.getElementById('finalScore');
const newGameBtn = document.getElementById('newGame');
const playAgainBtn = document.getElementById('playAgain');

// Game state variables
let correctColor = '';
let lives = 3;
let score = 0;
let numberOfOptions = 3; // Default number of color options

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);

// Initialize a new game
function initGame() {
    // Reset game state
    lives = 3;
    score = 0;
    
    // Update UI
    livesEl.textContent = lives;
    scoreEl.textContent = score;
    
    // Hide game over screen if visible
    gameOverEl.classList.add('hidden');
    
    // Start the first round
    startNewRound();
    
    // Show welcome message
    showMessage('Choose a color', '');
}

// Start a new round of the game
function startNewRound() {
    // Generate a random RGB color
    correctColor = generateRandomColor();
    
    // Update the color to guess display
    colorToGuessEl.textContent = correctColor;
    
    // Generate color options (including the correct one)
    generateColorOptions();
    
    // Reset the message to "Choose a color"
    showMessage('Choose a color', '');
}

// Generate a random RGB color string
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `RGB(${r}, ${g}, ${b})`;
}

// Generate color options for the player to choose from
function generateColorOptions() {
    // Clear previous options
    colorGridEl.innerHTML = '';
    
    // Create array of options with the correct color
    const options = [correctColor];
    
    // Add additional random (incorrect) color options
    for (let i = 1; i < numberOfOptions; i++) {
        let newColor;
        do {
            newColor = generateRandomColor();
        } while (options.includes(newColor)); // Ensure no duplicate colors
        
        options.push(newColor);
    }
    
    // Shuffle options to randomize position of correct answer
    shuffleArray(options);
    
    // Create color option elements
    options.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = color;
        
        // Add click event listener
        colorOption.addEventListener('click', () => handleColorSelection(color));
        
        // Add to grid
        colorGridEl.appendChild(colorOption);
    });
}

// Handle player's color selection
function handleColorSelection(selectedColor) {
    // Check if the selected color is correct
    if (selectedColor.toUpperCase() === correctColor.toUpperCase()) {
        // Correct guess
        score += 1;
        scoreEl.textContent = score;
        
        // Show success message
        showMessage('Correct!', 'success');
        
        // Show confetti effect
        createConfetti();
        
        // Start a new round after a short delay
        setTimeout(() => {
            startNewRound();
        }, 1500);
    } else {
        // Incorrect guess
        lives -= 1;
        livesEl.textContent = lives;
        
        // Show error message
        showMessage('Wrong! Try again', 'error');
        
        // Check if game over
        if (lives <= 0) {
            endGame();
        } else {
            // Reset message after a short delay if the game continues
            setTimeout(() => {
                showMessage('Choose a color', '');
            }, 1500);
        }
    }
}

// Display a message to the player
function showMessage(text, className) {
    messageEl.textContent = text;
    messageEl.className = ''; // Clear previous classes
    
    if (className) {
        messageEl.classList.add(className);
    }
    
    // Show message
    messageEl.classList.remove('hidden');
}

// End the game
function endGame() {
    // Update final score
    finalScoreEl.textContent = score;
    
    // Show game over screen
    gameOverEl.classList.remove('hidden');
}

// Fisher-Yates shuffle algorithm to randomize array elements
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Confetti effect function
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    // Generate confetti pieces
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                   '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
                   '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    // Create 50 confetti pieces
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Between 2-5 seconds
        confetti.style.opacity = Math.random() + 0.5; // Between 0.5-1.5
        
        // Random size between 5px and 10px
        const size = Math.random() * 5 + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation completes
    setTimeout(() => {
        confettiContainer.remove();
    }, 2500);
}

// Event listeners for buttons
newGameBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

// Make the game progressively harder as the player scores more points
// (Increase number of options every 5 points)
function updateDifficulty() {
    if (score > 0 && score % 5 === 0) {
        numberOfOptions = Math.min(numberOfOptions + 1, 6); // Max 6 options
    }
}