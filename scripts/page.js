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