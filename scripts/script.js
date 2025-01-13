const container = document.querySelector("main");

const cards = Array.from(container.querySelectorAll(".websitecard"));

const stateOrder = {
    "state-error": 1,
    "state-warning": 2,
    "state-info": 3,
    "state-success": 4
};

cards.sort((a, b) => {
    const stateA = Array.from(a.classList).find(cls => cls.startsWith("state-"));
    const stateB = Array.from(b.classList).find(cls => cls.startsWith("state-"));
    const stateComparison = stateOrder[stateA] - stateOrder[stateB];

    if (stateComparison !== 0) return stateComparison;

    const valueA = parseInt(a.querySelector("meter").getAttribute("value"), 10);
    const valueB = parseInt(b.querySelector("meter").getAttribute("value"), 10);
    return valueA - valueB;
});

cards.forEach(card => container.appendChild(card));