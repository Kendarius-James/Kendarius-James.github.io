var isDarkTheme = true;

// Helper function for toggling class themes
function toggleTheme(element, lightTheme, darkTheme) {
    if (element.classList.contains(darkTheme) || element.classList.contains(lightTheme)){
        if (element.classList.contains(darkTheme)){
            element.classList.remove(darkTheme);
            element.classList.add(lightTheme);
        }
        else {
            element.classList.remove(lightTheme);
            element.classList.add(darkTheme);
        }
    }
}

// changes the element's display to dark/light mode
function toggleElementsDisplay(dark, light) {
    let theme = "." + dark + ",." + light;
    const elements = document.querySelectorAll(theme);
    elements.forEach((element) =>{
        toggleTheme(element, dark, light);
    })
}

// changes the social icons to correct foreground color
function toggleThemeIcons(){
    const socialElements = document.querySelectorAll(".socials");
    socialElements.forEach((element) => {
        element.classList.toggle("hidden");
    })
}

// loops through every element and switches background
function changeTheme(buttonId) {
    //changes the display for the webpage
    buttonId.addEventListener("click", () => {

    // Loops through all color classes and set them to light/dark display
    toggleElementsDisplay("body-dark", "body-light");
    toggleElementsDisplay("nav-color-dark", "nav-color-light");
    toggleElementsDisplay("nav-hover-dark", "nav-hover-light");
    toggleElementsDisplay("theme-dark", "theme-light");
    toggleElementsDisplay("drop-down-icon-dark", "drop-down-icon-light");
    toggleElementsDisplay("changeThemeButton-dark", "changeThemeButton-light");
    toggleElementsDisplay("overlay-dark", "overlay-light");
    toggleElementsDisplay("link-visited-dark", "link-visited-light");
    toggleElementsDisplay("hero-sub-title-reflection-dark", "hero-sub-title-reflection-light")
    toggleElementsDisplay("circle1-dark-theme", "circle1-light-theme");
    toggleElementsDisplay("circle2-dark-theme", "circle2-light-theme");
    toggleElementsDisplay("hero-dark", "hero-light");
    toggleElementsDisplay("section-divider-dark", "section-divider-light");
    toggleElementsDisplay("project-color-dark", "project-color-light");
    toggleElementsDisplay("big-screen-alert-dark", "big-screen-alert-light");
    toggleElementsDisplay("skill-dark", "skill-light");
    toggleElementsDisplay("top-arrow-dark", "top-arrow-light");
    toggleElementsDisplay("drop-down-dark", "drop-down-light");
    toggleElementsDisplay("input-dark", "input-light");
    toggleElementsDisplay("card-background-dark", "card-background-light");
    toggleElementsDisplay("skip-link-dark", "skip-link-light");
    toggleElementsDisplay("linkedin-icon-dark", "linkedin-icon-light");
    toggleElementsDisplay("github-icon-dark", "github-icon-light");
    toggleElementsDisplay("projects-visited-dark", "projects-visited-light");
    toggleElementsDisplay("project-deploy-dark", "project-deploy-light");
    toggleElementsDisplay("project-button-dark", "project-button-light");

    // changes theme for the bars
    const barLight = document.querySelectorAll("#barLight");
    const barDark = document.querySelectorAll("#barDark");
    barLight.forEach((bar) => {
        bar.classList.toggle("hidden");
    })
    barDark.forEach((bar) => {
        bar.classList.toggle("hidden");
    })

    if (isDarkTheme == true){
        isDarkTheme = false;
    }
    else {
        isDarkTheme = true;
    }

    // isDarkTheme = isDarkTheme == true ? false : true;
    toggleThemeIcons();
    localStorage.setItem('isDark', isDarkTheme);

    })
}

// clicks the button if user prefer theme is light
function updatePreferTheme(button) {
    // should only work if user is first returning to the site
    let storedTheme = localStorage.getItem('isDark');
    // console.log(storedTheme);
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light").matches){
        button.click();
    }
    // if (storedTheme !== isDarkTheme){
    //     button.click();
    // }
}

// check if first visit and stores it in local storage
function checkFirstVisit () {
    const hasVisited = localStorage.getItem('hasVisited');
    const desktopButton = document.getElementById("changeTheme");
    if (hasVisited === false) {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light").matches){
            desktopButton.click();
        }
        localStorage.setItem('hasVisited', true);
        localStorage.setItem('isDark', isDarkTheme);
    }
    else {
        let storedTheme = localStorage.getItem('isDark');
        if (storedTheme === "false") {
            desktopButton.click();
        }
    }
    setTimeout(() => {
        const body = document.getElementById("transition");
        body.classList.add("transition");
    }, 100);
}


//changes the display for the webpage
const desktopButton = document.getElementById("changeTheme");
const mobileButton = document.getElementById("changeThemeMobile");
changeTheme(desktopButton);
changeTheme(mobileButton);

//toggles dropdown for mobile devices
const dropDowns = document.querySelectorAll("#dropDown");
dropDowns.forEach((dropDown) => {
    dropDown.addEventListener("click", () => {
        const mobileNav = document.getElementById("mobileNav");
        const upButton = document.getElementById("scrollButton");
        setTimeout(() => {
            mobileNav.classList.toggle("mobile-nav-hidden");
            upButton.classList.toggle("hidden");
            if (mobileNav.classList.contains("mobile-nav-hidden")) {
                // makes it searchable to tabs and screen readers
                document.body.style.overflow = '';
            }
            else {
                document.body.style.overflow = 'hidden';
            }

        }, 100);
    })
})

// Up arrow navigation button
const upButton = document.getElementById("scrollButton");
upButton.addEventListener("click", () => {
    document.getElementById("navTop").scrollIntoView({ behavior: 'smooth'});
})

window.onload = checkFirstVisit();
updatePreferTheme(desktopButton);
