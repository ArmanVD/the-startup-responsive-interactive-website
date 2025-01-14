document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("main");
    const cards = Array.from(container.querySelectorAll(".websitecard"));

    const stateOrder = {
        "state-error": 1,
        "state-warning": 2,
        "state-info": 3,
        "state-success": 4
    };

    cards.sort((a, b) => {
        const stateA = Array.from(a.classList).find(cls => cls.startsWith("state-")) || "";
        const stateB = Array.from(b.classList).find(cls => cls.startsWith("state-")) || "";

        const stateComparison = (stateOrder[stateA] || 0) - (stateOrder[stateB] || 0);
        if (stateComparison !== 0) return stateComparison;

        const valueA = parseInt(a.querySelector("meter")?.getAttribute("value") || "0", 10);
        const valueB = parseInt(b.querySelector("meter")?.getAttribute("value") || "0", 10);
        return valueA - valueB;
    });

    const fragment = document.createDocumentFragment();
    cards.forEach(card => fragment.appendChild(card));
    container.appendChild(fragment);

    const meters = container.querySelectorAll(".meterwrapper");
    const baseAnimationSpeed = 2000;

    meters.forEach(wrapper => {
        const meter = wrapper.querySelector("meter");
        const value = parseInt(meter.getAttribute("value"), 10) || 0;
        const max = parseInt(meter.getAttribute("max"), 10) || 100;
        const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "progress-ring");
        svg.setAttribute("width", "80");
        svg.setAttribute("height", "80");
        svg.setAttribute("viewBox", "0 0 80 80");

        const backgroundCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        backgroundCircle.setAttribute("class", "progress-ring__background");
        backgroundCircle.setAttribute("cx", "40");
        backgroundCircle.setAttribute("cy", "40");
        backgroundCircle.setAttribute("r", "35");
        svg.appendChild(backgroundCircle);

        const progressCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        progressCircle.setAttribute("class", "progress-ring__circle");
        progressCircle.setAttribute("cx", "40");
        progressCircle.setAttribute("cy", "40");
        progressCircle.setAttribute("r", "35");
        svg.appendChild(progressCircle);

        const circumference = 2 * Math.PI * 35;
        progressCircle.style.strokeDasharray = `${circumference}`;
        progressCircle.style.strokeDashoffset = `${circumference}`;

        wrapper.insertBefore(svg, wrapper.firstChild);

        const animationDuration = (percentage / 100) * baseAnimationSpeed;
        progressCircle.style.transition = `stroke-dashoffset ${animationDuration}ms ease-out`;

        setTimeout(() => {
            progressCircle.style.strokeDashoffset = `${circumference - (percentage / 100) * circumference}`;
        }, 100);

        const percentageText = wrapper.querySelector(".percentage");
        if (percentageText) {
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
        }
    });

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const greetingElement = document.querySelector(".inimessage .small-text");

    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours >= 6 && hours < 12) {
            return "Goedemorgen";
        } else if (hours >= 12 && hours < 18) {
            return "Goedemiddag";
        } else if (hours >= 18 && hours < 24) {
            return "Goedenavond";
        } else {
            return "Goedenacht";
        }
    };

    const greeting = getGreeting();
    greetingElement.textContent = `${greeting}, Arman`;
});
