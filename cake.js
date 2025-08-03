function initializeDifficultySelector() {
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    const difficultyInfo = document.getElementById('difficultyInfo');
    
    const recipes = {
    easy: {
        title: "Easy Vanilla Cake",
        description: "Perfect for beginners! Uses box mix and simple ingredients.",
        time: "45 minutes",
        tips: "Just stick to the box instructions, and for a little extra flavor, mix in some vanilla extract."
    },
    medium: {
        title: "Classic Vanilla Cake",
        description: "From scratch recipe with basic baking techniques.",
        time: "1.5 hours",
        tips: "Make sure your ingredients are at room temperature—they blend together much better. And remember, gently mix the batter so it stays fluffy."
    },
    hard: {
        title: "Professional Layered Cake",
        description: "Multiple layers with buttercream frosting and decorations.",
        time: "3+ hours",
        tips: "For perfect layers, measure your ingredients with a kitchen scale. Also, let each cake layer cool completely before adding frosting to keep it from melting or sliding."
    }
};

    
    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            difficultyButtons.forEach(btn => btn.classList.remove('selected'));
            
            button.classList.add('selected');
            
            const level = button.getAttribute('data-level');
            const recipe = recipes[level];
            
            difficultyInfo.innerHTML = `
                <h4>${recipe.title}</h4>
                <p><strong>Description:</strong> ${recipe.description}</p>
                <p><strong>Total Time:</strong> ${recipe.time}</p>
                <p><strong>Pro Tip:</strong> ${recipe.tips}</p>
            `;
            
            if (level === 'easy') {
                difficultyInfo.style.borderLeftColor = '#28a745';
                difficultyInfo.style.backgroundColor = '#d4edda';
            } else if (level === 'medium') {
                difficultyInfo.style.borderLeftColor = '#ffc107';
                difficultyInfo.style.backgroundColor = '#fff3cd';
            } else {
                difficultyInfo.style.borderLeftColor = '#dc3545';
                difficultyInfo.style.backgroundColor = '#f8d7da';
            }
            
            difficultyInfo.style.transform = 'scale(0.95)';
            setTimeout(() => {
                difficultyInfo.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function initializeFlavorMixer() {
    const flavorInput = document.getElementById('flavorInput');
    const flavorDisplay = document.getElementById('flavorDisplay');
    const flavorPreview = document.getElementById('flavorPreview');
    
    let currentFlavor = 'vanilla';
    
    flavorInput.addEventListener('input', (event) => {
        currentFlavor = event.target.value.trim();
        
        if (currentFlavor === '') {
            flavorDisplay.textContent = 'mystery';
            flavorDisplay.style.color = '#6c757d';
        } else {
            flavorDisplay.textContent = currentFlavor;
            flavorDisplay.style.color = '#d1477a';
        }
        
        if (currentFlavor.length > 10) {
            flavorPreview.style.fontSize = '0.9em';
            flavorPreview.style.backgroundColor = '#fff3cd';
        } else {
            flavorPreview.style.fontSize = '1.2em';
            flavorPreview.style.backgroundColor = '#ffe4e1';
        }
        
        const specialFlavors = ['chocolate', 'strawberry', 'lemon', 'vanilla'];
        if (specialFlavors.includes(currentFlavor.toLowerCase())) {
            flavorDisplay.style.fontWeight = 'bold';
            flavorDisplay.style.textShadow = '1px 1px 2px rgba(0,0,0,0.3)';
        } else {
            flavorDisplay.style.fontWeight = 'normal';
            flavorDisplay.style.textShadow = 'none';
        }
    });
    
    flavorDisplay.textContent = currentFlavor;
}

function initializeCakeImageSlider() {
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
        
        sliderImages[index].style.transform = 'scale(1.05) rotate(2deg)';
        setTimeout(() => {
            sliderImages[index].style.transform = 'scale(1) rotate(0deg)';
        }, 400);
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
    
    setInterval(nextSlide, 5000);
    
    showSlide(0);
}

function initializeCakeDecorator() {
    const changeColorBtn = document.getElementById('changeColor');
    const addSprinklesBtn = document.getElementById('addSprinkles');
    const resetCakeBtn = document.getElementById('resetCake');
    const cakeDecoration = document.getElementById('cakeDecoration');
    const cakeBase = document.querySelector('.cake-base');
    
    let colorIndex = 0;
    let hasSprinkles = false;
    
    const cakeColors = ['#ffd1dc', '#ffb6c1', '#dda0dd', '#98fb98', '#f0e68c', '#ffa07a'];
    const cakeEmojis = ['🎂', '🧁', '🍰', '🎂'];
    
    function changeColor() {
        colorIndex = (colorIndex + 1) % cakeColors.length;
        const newColor = cakeColors[colorIndex];
        
        cakeDecoration.style.backgroundColor = newColor;
        cakeDecoration.style.transition = 'all 0.5s ease';
        
        cakeBase.style.transform = `rotate(${colorIndex * 45}deg)`;
        cakeBase.style.transition = 'transform 0.5s ease';
        
        if (colorIndex % 2 === 0) {
            const emojiIndex = Math.floor(colorIndex / 2) % cakeEmojis.length;
            cakeBase.textContent = cakeEmojis[emojiIndex];
        }
    }
    
    function addSprinkles() {
        if (!hasSprinkles) {
            cakeBase.classList.add('sprinkles');
            hasSprinkles = true;
            addSprinklesBtn.textContent = 'Remove Sprinkles';
            addSprinklesBtn.style.backgroundColor = '#28a745';
            
            cakeBase.style.animation = 'pulse 2s infinite';
        } else {
            cakeBase.classList.remove('sprinkles');
            hasSprinkles = false;
            addSprinklesBtn.textContent = 'Add Sprinkles';
            addSprinklesBtn.style.backgroundColor = '';
            cakeBase.style.animation = 'none';
        }
    }
    
    function resetCake() {
        colorIndex = 0;
        hasSprinkles = false;
        
        cakeDecoration.style.backgroundColor = '#ffe4e1';
        cakeBase.style.transform = 'rotate(0deg)';
        cakeBase.style.animation = 'none';
        cakeBase.textContent = '🎂';
        cakeBase.classList.remove('sprinkles');
        
        addSprinklesBtn.textContent = 'Add Sprinkles';
        addSprinklesBtn.style.backgroundColor = '';
        
        cakeDecoration.style.transform = 'scale(0.8)';
        setTimeout(() => {
            cakeDecoration.style.transform = 'scale(1)';
        }, 200);
    }
    
    changeColorBtn.addEventListener('click', changeColor);
    addSprinklesBtn.addEventListener('click', addSprinkles);
    resetCakeBtn.addEventListener('click', resetCake);
}

function initializeTipGenerator() {
    const tipButton = document.getElementById('tipButton');
    const tipDisplay = document.getElementById('tipDisplay');
    
    const bakingTips = [
    "Preheat your oven for at least 15 minutes so it’s nice and hot before you start baking.",
    "Bring your ingredients to room temperature—this helps them blend smoothly.",
    "Avoid opening the oven door during most of the baking time to keep the heat steady.",
    "Line your pans with parchment paper to stop sticking and make cleanup easy.",
    "When measuring flour, spoon it into the cup and level it off instead of scooping.",
    "Check if your cake is done by sticking a toothpick in the center—it should come out clean.",
    "Let your cake cool in the pan for about 10 minutes before taking it out to prevent breaking.",
    "Sift your dry ingredients first for a lighter and fluffier cake texture.",
    "Add a little vanilla extract to almost any cake—it boosts the overall flavor.",
    "Keep your cakes at room temperature for the best, soft texture."
];

    let lastTipIndex = -1;
    
    tipButton.addEventListener('click', () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * bakingTips.length);
        } while (randomIndex === lastTipIndex && bakingTips.length > 1);
        
        lastTipIndex = randomIndex;
        const tip = bakingTips[randomIndex];
        
        tipDisplay.style.opacity = '0.5';
        tipDisplay.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            tipDisplay.innerHTML = `<p><strong>💡 Tip #${randomIndex + 1}:</strong> ${tip}</p>`;
            tipDisplay.style.opacity = '1';
            tipDisplay.style.transform = 'translateY(0)';
            
            if (randomIndex < 3) {
                tipDisplay.style.borderLeftColor = '#28a745';
            } else if (randomIndex < 6) {
                tipDisplay.style.borderLeftColor = '#ffc107';
            } else {
                tipDisplay.style.borderLeftColor = '#17a2b8';
            }
        }, 300);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDifficultySelector();
    initializeFlavorMixer();
    initializeCakeImageSlider();
    initializeCakeDecorator();
    initializeTipGenerator();
});
