document.addEventListener("DOMContentLoaded", () => {
	const dropCap = document.querySelector(".drop-cap");
	const natureElements = document.querySelector(".nature-elements");

	// Create nature elements
	const elements = ["🍃", "🌿", "🍂", "🌱", "🦋", "🐞"];
	for (let i = 0; i < 20; i++) {
		const element = document.createElement("span");
		element.textContent = elements[Math.floor(Math.random() * elements.length)];
		element.style.cssText = `
      position: absolute;
      font-size: ${Math.random() * 20 + 10}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      opacity: 0.7;
      transform: rotate(${Math.random() * 360}deg);
      animation: float ${Math.random() * 5 + 3}s infinite ease-in-out;
    `;
		natureElements.appendChild(element);
	}

	// Animate drop cap on hover
	dropCap.addEventListener("mouseover", () => {
		dropCap.style.animation = "grow 0.5s forwards";
	});

	dropCap.addEventListener("mouseout", () => {
		dropCap.style.animation = "shrink 0.5s forwards";
	});
});

// Add these styles to the CSS
document.head.insertAdjacentHTML(
	"beforeend",
	`
  <style>
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }

    @keyframes grow {
      to { transform: scale(1.1); color: #4a8c74; }
    }

    @keyframes shrink {
      from { transform: scale(1.1); color: #4a8c74; }
      to { transform: scale(1); color: #2c5e4c; }
    }
  </style>
`
);
