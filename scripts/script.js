const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav");
const logo = document.querySelector(".logo");
const dropdownHeaders = document.querySelectorAll("nav section h2");

menuToggle.addEventListener("click", () => {
    const isOpened = menuToggle.classList.toggle("opened");
    menuToggle.setAttribute("aria-expanded", isOpened);
    navMenu.classList.toggle("visible");
    logo.classList.toggle("centered");

    dropdownHeaders.forEach(header => {
        header.classList.toggle("visible", navMenu.classList.contains("visible"));
    });
});

dropdownHeaders.forEach(header => {
    let rotationAngle = 0;

    header.addEventListener("click", () => {
        header.classList.toggle("open");

        const submenu = header.nextElementSibling;
        if (submenu) {
            submenu.classList.toggle("visible");
        }

        rotationAngle += 180;

        header.style.setProperty("--rotation", `${rotationAngle}deg`);
    });
});

const updateGreeting = () => {
    const greetingElement = document.querySelector(".inimessage .small-text");
    const hours = new Date().getHours();
    const greeting = hours >= 6 && hours < 12 ? "Goedemorgen" :
                     hours >= 12 && hours < 18 ? "Goedemiddag" :
                     hours >= 18 && hours < 24 ? "Goedenavond" : "Goedenacht";
    greetingElement.textContent = `${greeting}, Arman`;
};
updateGreeting();

const sortCards = (cards, stateOrder) => {
    return cards.sort((a, b) => {
        const stateA = Array.from(a.classList).find(cls => cls.startsWith("state-")) || "";
        const stateB = Array.from(b.classList).find(cls => cls.startsWith("state-")) || "";

        const stateComparison = (stateOrder[stateA] || 0) - (stateOrder[stateB] || 0);
        if (stateComparison !== 0) return stateComparison;

        const valueA = parseInt(a.querySelector("meter")?.value || 0, 10);
        const valueB = parseInt(b.querySelector("meter")?.value || 0, 10);
        return valueA - valueB;
    });
};

const container = document.querySelector("main");
const cards = Array.from(container.querySelectorAll(".websitecard"));
const stateOrder = {
    "state-error": 1,
    "state-warning": 2,
    "state-info": 3,
    "state-success": 4,
};

const sortedCards = sortCards(cards, stateOrder);
const fragment = document.createDocumentFragment();
sortedCards.forEach(card => fragment.appendChild(card));
container.appendChild(fragment);

const createProgressRing = (percentage, baseAnimationSpeed = 2000) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const circumference = 2 * Math.PI * 35;

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "progress-ring");
    svg.setAttribute("width", "80");
    svg.setAttribute("height", "80");
    svg.setAttribute("viewBox", "0 0 80 80");

    const backgroundCircle = document.createElementNS(svgNS, "circle");
    backgroundCircle.setAttribute("class", "progress-ring__background");
    backgroundCircle.setAttribute("cx", "40");
    backgroundCircle.setAttribute("cy", "40");
    backgroundCircle.setAttribute("r", "35");
    svg.appendChild(backgroundCircle);

    const progressCircle = document.createElementNS(svgNS, "circle");
    progressCircle.setAttribute("class", "progress-ring__circle");
    progressCircle.setAttribute("cx", "40");
    progressCircle.setAttribute("cy", "40");
    progressCircle.setAttribute("r", "35");
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;
    svg.appendChild(progressCircle);

    progressCircle.style.transition = `stroke-dashoffset ${(percentage / 100) * baseAnimationSpeed}ms ease-out`;
    setTimeout(() => {
        progressCircle.style.strokeDashoffset = `${circumference - (percentage / 100) * circumference}`;
    }, 100);

    return { svg, progressCircle };
};

const animatePercentageText = (wrapper, value, animationDuration) => {
    const percentageText = wrapper.querySelector(".percentage");
    if (!percentageText) return;

    const animationStepTime = 25;
    const totalSteps = Math.floor(animationDuration / animationStepTime);
    let currentStep = 0;

    const interval = setInterval(() => {
        const easedPercentage = easeOutCubic(currentStep / totalSteps) * value;
        percentageText.textContent = `${Math.round(easedPercentage)}%`;

        currentStep++;
        if (currentStep > totalSteps) {
            clearInterval(interval);
            percentageText.textContent = `${value}%`;
        }
    }, animationStepTime);
};

const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
};

const meters = container.querySelectorAll(".meterwrapper");
meters.forEach(wrapper => {
    const meter = wrapper.querySelector("meter");
    const value = meter?.value || 0;
    const max = meter?.max || 100;
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const { svg } = createProgressRing(percentage);
    wrapper.insertBefore(svg, wrapper.firstChild);
    animatePercentageText(wrapper, value, (percentage / 100) * 2000);
});

cards.forEach(card => {
    card.addEventListener("click", () => {
        const link = card.querySelector(".cardinfo a");
        if (link) {
            link.click();
        }
    });
});

const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
    });
  });