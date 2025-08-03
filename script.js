function calculateIngredients() {
    const servingsInput = document.getElementById('servings');
    const ingredientList = document.getElementById('ingredientList');
    const servings = parseInt(servingsInput.value);
    
    const baseIngredients = [
        { name: 'flour', amount: 2, unit: 'cups' },
        { name: 'sugar', amount: 2, unit: 'tablespoons' },
        { name: 'baking powder', amount: 2, unit: 'teaspoons' },
        { name: 'salt', amount: 0.5, unit: 'teaspoon' },
        { name: 'eggs', amount: 2, unit: '' },
        { name: 'milk', amount: 1.75, unit: 'cups' },
        { name: 'melted butter', amount: 0.5, unit: 'cup' }
    ];
    
    const multiplier = servings / 4;
    let newHtml = '';
    
    baseIngredients.forEach(ingredient => {
        const newAmount = (ingredient.amount * multiplier).toFixed(2);
        const displayAmount = newAmount % 1 === 0 ? parseInt(newAmount) : newAmount;
        newHtml += `<li>${displayAmount} ${ingredient.unit} ${ingredient.name}</li>`;
    });
    
    ingredientList.innerHTML = newHtml;
    
    ingredientList.style.transform = 'scale(1.05)';
    setTimeout(() => {
        ingredientList.style.transform = 'scale(1)';
    }, 200);
}

function initializeStepNavigator() {
    const steps = [
        "Mix all dry ingredients in a large bowl.",
        "In another bowl, whisk together eggs, milk, and melted butter.",
        "Pour wet ingredients into dry ingredients and stir until just combined.",
        "Preheat your waffle iron according to manufacturer instructions.",
        "Pour batter onto hot waffle iron and cook until golden brown.",
        "Serve immediately with your favorite toppings!"
    ];
    
    let currentStepIndex = 0;
    const stepContent = document.getElementById('stepContent');
    const currentStepSpan = document.getElementById('currentStep');
    const prevButton = document.getElementById('prevStep');
    const nextButton = document.getElementById('nextStep');
    
    function updateStep() {
        stepContent.innerHTML = `<p>${steps[currentStepIndex]}</p>`;
        currentStepSpan.textContent = currentStepIndex + 1;
        
        if (currentStepIndex === 0) {
            prevButton.style.opacity = '0.5';
            prevButton.disabled = true;
        } else {
            prevButton.style.opacity = '1';
            prevButton.disabled = false;
        }
        
        if (currentStepIndex === steps.length - 1) {
            nextButton.style.opacity = '0.5';
            nextButton.disabled = true;
            stepContent.style.backgroundColor = '#d4edda';
        } else {
            nextButton.style.opacity = '1';
            nextButton.disabled = false;
            stepContent.style.backgroundColor = '#ffe4e1';
        }
    }
    
    prevButton.addEventListener('click', () => {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            updateStep();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            updateStep();
        }
    });
    
    updateStep();
}

function initializeImageSlider() {
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = sliderImages.length;
    
    function showSlide(index) {
        sliderImages.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        sliderImages[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
        
        sliderImages[index].style.transform = 'scale(1.02)';
        setTimeout(() => {
            sliderImages[index].style.transform = 'scale(1)';
        }, 300);
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    setInterval(nextSlide, 4000);
    
    showSlide(0);
}

function initializeCookingTimer() {
    let timerInterval;
    let timeLeft = 180;
    let isTimerRunning = false;
    
    const timerDisplay = document.getElementById('timerDisplay');
    const startButton = document.getElementById('startTimer');
    const resetButton = document.getElementById('resetTimer');
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    function updateDisplay() {
        timerDisplay.textContent = formatTime(timeLeft);
        
        if (timeLeft <= 30 && timeLeft > 0) {
            timerDisplay.style.color = '#ff4757';
            timerDisplay.style.animation = 'pulse 0.5s infinite';
        } else if (timeLeft === 0) {
            timerDisplay.style.color = '#ff3838';
            timerDisplay.style.backgroundColor = '#ffebee';
        } else {
            timerDisplay.style.color = '#d1477a';
            timerDisplay.style.animation = 'none';
            timerDisplay.style.backgroundColor = '#ffe4e1';
        }
    }
    
    function startTimer() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            startButton.textContent = 'Timer Running...';
            startButton.style.backgroundColor = '#28a745';
            
            timerInterval = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    isTimerRunning = false;
                    startButton.textContent = 'Timer Done!';
                    startButton.style.backgroundColor = '#dc3545';
                    alert('Your waffles are ready!');
                }
            }, 1000);
        }
    }
    
    function resetTimer() {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timeLeft = 180;
        startButton.textContent = 'Start 3-minute Timer';
        startButton.style.backgroundColor = '';
        updateDisplay();
    }
    
    startButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);
    
    updateDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculateBtn').addEventListener('click', calculateIngredients);
    initializeStepNavigator();
    initializeImageSlider();
    initializeCookingTimer();
});
