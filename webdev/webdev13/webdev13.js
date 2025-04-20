document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const cards = document.querySelectorAll('.card');
    const cardsContainer = document.querySelector('.cards-container');
    
    // Define card colors
    const redCards = ['card2', 'card4', 'card6', 'card8', 'card10']; // Hearts and Diamonds
    const blackCards = ['card1', 'card5', 'card9']; // Spades
    const greenCards = ['card3', 'card7']; // Clubs
    
    // Initialize cards as stacked
    let cardsDistributed = false;
    let isDealing = false;
    cardsContainer.classList.add('stacked');
    
    // Hide all cards initially
    cards.forEach(card => {
        card.style.display = 'none';
    });
    
    // Show only the top card of the stack
    if (cards.length > 0) {
        cards[0].style.display = 'block';
    }
    
    // Function to deal cards with cascade animation
    function dealCards() {
        isDealing = true;
        
        // Show all cards
        cards.forEach(card => {
            card.style.display = 'block';
        });
        
        // Reset any previous animations
        cards.forEach(card => {
            card.classList.remove('dealt', 'fan-dealt', 'cascade-dealt');
            card.style.animationDelay = '0s';
            card.style.transform = '';
        });
        
        // Remove stacked class to allow cards to be positioned
        cardsContainer.classList.remove('stacked');
        
        // Deal cards one by one with delays
        cards.forEach((card, index) => {
            // Set a delay for each card
            card.style.animationDelay = `${index * 0.15}s`;
            
            // Add the cascade-dealt class to trigger animation
            setTimeout(() => {
                card.classList.add('cascade-dealt');
            }, 50);
        });
        
        // After all cards are dealt, distribute them in a grid
        setTimeout(() => {
            cardsContainer.classList.add('distributed');
            isDealing = false;
            cardsDistributed = true;
        }, cards.length * 150 + 1500);
    }
    
    // Function to distribute cards with fan animation
    const distributeCards = (withFanAnimation = false) => {
        if (!cardsDistributed) {
            // Show all cards
            cards.forEach(card => {
                card.style.display = 'block';
            });
            
            cardsContainer.classList.remove('stacked');
            
            if (withFanAnimation) {
                // First show the fan animation
                cardsContainer.classList.add('fan-animation');
                
                // Add fan animation with delay for each card
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('fan-dealt');
                    }, index * 50);
                });
                
                // After the fan animation completes, transition to grid layout
                setTimeout(() => {
                    cardsContainer.classList.remove('fan-animation');
                    cardsContainer.classList.add('distributed');
                    
                    // Remove the fan animation class
                    cards.forEach(card => {
                        card.classList.remove('fan-dealt');
                    });
                }, 2000);
            } else {
                // Use the regular distribution
                cardsContainer.classList.add('distributed');
            }
            
            cardsDistributed = true;
        }
    };
    
    // Function to stack cards
    const stackCards = () => {
        if (cardsDistributed) {
            cardsContainer.classList.remove('distributed');
            cardsContainer.classList.remove('fan-animation');
            cardsContainer.classList.add('stacked');
            
            cards.forEach(card => {
                card.classList.remove('dealt');
                card.classList.remove('fan-dealt');
                card.classList.remove('cascade-dealt');
            });
            
            // Hide all cards except the top one
            cards.forEach((card, index) => {
                if (index === 0) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            cardsDistributed = false;
        }
    };
    
    // Function to toggle flip on cards
    const flipCards = () => {
        cards.forEach(card => {
            const cardInner = card.querySelector('.card-inner');
            cardInner.style.transform = 
                cardInner.style.transform === 'rotateY(0deg)' 
                    ? 'rotateX(0deg)' 
                    : 'rotateY(180deg)';
        });
    };
    
    // Function to shuffle cards
    const shuffleCards = () => {
        // Ensure cards are distributed first
        if (!cardsDistributed) {
            distributeCards();
        }
        
        // Add shuffle animation
        cards.forEach(card => {
            card.classList.add('shuffle-animation');
        });
        
        // Remove shuffle animation after it completes
        setTimeout(() => {
            cards.forEach(card => {
                card.classList.remove('shuffle-animation');
            });
        }, 1000);
    };
    
    // Function to perform shuffle animation
    const performShuffle = () => {
        // Create a temporary array to store card order
        const cardArray = Array.from(cards);
        
        // Shuffle the array
        for (let i = cardArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
        }
        
        // Reorder the cards in the DOM
        cardArray.forEach(card => {
            cardsContainer.appendChild(card);
        });
    };
    
    // Function to filter cards by color
    const filterCardsByColor = (colorArray) => {
        // Ensure cards are distributed first
        if (!cardsDistributed) {
            distributeCards();
        }
        
        // Hide all cards first
        cards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show only cards of the specified color
        colorArray.forEach(color => {
            const card = document.getElementById(color);
            if (card) {
                card.style.display = 'block';
                // Add a subtle entrance animation
                card.style.animation = 'fadeIn 0.5s ease forwards';
            }
        });
    };
    
    // Function to perform filtering animation
    const performFiltering = (colorArray) => {
        // Hide all cards with a fade out animation
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.3s ease';
        });
        
        // After fade out, show only the filtered cards
        setTimeout(() => {
            cards.forEach(card => {
                card.style.display = 'none';
            });
            
            colorArray.forEach(color => {
                const card = document.getElementById(color);
                if (card) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    
                    // Trigger reflow
                    void card.offsetWidth;
                    
                    // Fade in the filtered cards
                    card.style.opacity = '1';
                }
            });
        }, 300);
    };
    
    // Function to show all cards
    const showAllCards = () => {
        // Ensure cards are distributed first
        if (!cardsDistributed) {
            distributeCards();
        } else {
            cards.forEach(card => {
                card.style.display = 'block';
                // Add a subtle entrance animation
                card.style.animation = 'fadeIn 0.5s ease forwards';
            });
        }
    };
    
    // Add a function to handle the green cards
    const filterGreenCards = () => {
        filterCardsByColor(greenCards);
    };
    
    // Add click event listeners
    cardsContainer.addEventListener('click', flipCards);
    shuffleBtn.addEventListener('click', shuffleCards);
    filterRedBtn.addEventListener('click', () => filterCardsByColor(redCards));
    filterBlackBtn.addEventListener('click', () => filterCardsByColor(blackCards));
    filterGreenBtn.addEventListener('click', () => filterCardsByColor(greenCards));
    showAllBtn.addEventListener('click', showAllCards);
    stackBtn.addEventListener('click', () => {
        if (cardsDistributed) {
            stackCards();
        } else {
            dealCards(); // Use cascade animation
        }
    });
    
    // Add click on the container to distribute/stack cards
    cardsContainer.addEventListener('click', (e) => {
        // If click is directly on the container and cards are stacked, distribute with cascade animation
        if (e.target === cardsContainer && !cardsDistributed && !isDealing) {
            dealCards();
        }
    });
    
    // Add initial click handler for each card to distribute cards
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // If cards are stacked, distribute them with cascade animation
            if (!cardsDistributed && !isDealing) {
                dealCards();
                return; // Exit early
            }
            
            // Prevent event from bubbling if click on card details
            if (e.target.closest('.card-details') || 
                e.target.tagName === 'BUTTON') {
                return;
            }
            
            const cardInner = card.querySelector('.card-inner');
            cardInner.style.transform = 
                cardInner.style.transform === 'rotateY(180deg)' 
                    ? 'rotateY(0deg)' 
                    : 'rotateY(180deg)';
        });
    });
    
    // Add sparkle effect on hover
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Only add sparkle effect if cards are distributed
            if (cardsDistributed) {
                const symbol = card.querySelector('.symbol');
                symbol.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)';
                
                // Add a subtle scale effect
                card.style.transform = 'scale(1.05)';
                card.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const symbol = card.querySelector('.symbol');
            symbol.style.textShadow = '';
            
            // Remove scale effect
            card.style.transform = 'scale(1)';
        });
    });
}); 