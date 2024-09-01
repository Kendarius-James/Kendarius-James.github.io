function getMonthNumber(monthName) {
    month = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
    return month.indexOf(monthName) + 1;
}

function parseDateString(dateString){
    const [startDate, endDate] = dateString.split(" - ");
    const [startMonth, startYear] = startDate.split(" ");
    const [endMonth, endYear] = endDate.split(" ");

    const startMonthNumber = getMonthNumber(startMonth);
    const endMonthNumber = getMonthNumber(endMonth);
    
    return {
        startYear: parseInt(startYear),
        startMonth: startMonthNumber,
        endYear: parseInt(endYear),
        endMonth: endMonthNumber
    };
}

function compareDates(a, b, order) {
    // Compare by end year first
    if (a.endYear !== b.endYear) {
        return order === "Old to Recent" ? a.endYear - b.endYear : b.endYear - a.endYear;
    }
    // If end years are the same, compare by end month
    if (a.endMonth !== b.endMonth) {
        return order === "Old to Recent"
            ? a.endMonth - b.endMonth
            : b.endMonth - a.endMonth;
    }
    // If end months are the same, compare by start year
    if (a.startYear !== b.startYear) {
        return order === "Old to Recent"
            ? a.startYear - b.startYear
            : b.startYear - a.startYear;
    }
    // If start years are the same, compare by start month
    return order === "Old to Recent"
        ? a.startMonth - b.startMonth
        : b.startMonth - a.startMonth;
}

// Sorts card by Date and append card to container
function sortByDate(cards, container, sortBy){
    sortYear(cards, '.card-year', sortBy);
    container.innerHTML = '';
    cards.forEach(card => {
        container.appendChild(card);
    });
}

// Sort card by Name and append card to container
function sortByTitle(cards, container, sortBy) {
    if (sortBy === "AtoZ"){
        cards.sort((a, b) => {
            const headingA = a.querySelector(".card-heading").textContent.toLowerCase();
            const headingB = b.querySelector(".card-heading").textContent.toLowerCase();
            return headingA.localeCompare(headingB);
        });
    }
    if (sortBy === "ZtoA"){
        cards.sort((a, b) => {
            const headingA = a.querySelector(".card-heading").textContent.toLowerCase();
            const headingB = b.querySelector(".card-heading").textContent.toLowerCase();
            return headingB.localeCompare(headingA);
        });
    }
    container.innerHTML = "";
    cards.forEach(card => {
        container.appendChild(card);
    });
}

//  Sorts month and Year and return result
function sortYear(cards, elementClass, orderby){
    cards.sort((a, b) => {
        dateA = parseDateString(a.querySelector(elementClass).textContent);
        dateB = parseDateString(b.querySelector(elementClass).textContent);
        return compareDates(dateA, dateB, orderby);
    });
}

// Sorts cards based off of the results in dropdown menu
function sortCards() {
    // const workContainer = document.getElementById("workContainer");
    const personalContainer = document.getElementById("personalContainer");
    const courseContainer = document.getElementById("courseContainer");

    // const workCards = Array.from(workContainer.getElementsByClassName('card'));
    const personalCards = Array.from(personalContainer.getElementsByClassName('card'));
    const courseCards = Array.from(courseContainer.getElementsByClassName('card'));

    // console.log(workCards);
    // console.log(personalCards);
    const sortBy = document.getElementById("orderProjects").value;

    let dateA = "";
    let dateB = "";
    switch (sortBy) {

        case "AtoZ":
            // sortByTitle(workCards, workContainer, sortBy);
            sortByTitle(personalCards, personalContainer, sortBy);
            sortByTitle(courseCards, courseContainer, sortBy);
            break;
            
         case "ZtoA":
            // sortByTitle(workCards, workContainer, sortBy);
            sortByTitle(personalCards, personalContainer, sortBy);
            sortByTitle(courseCards, courseContainer, sortBy);
            break;

        case "Recent to Old":
            // sortByDate(workCards, workContainer, sortBy);
            sortByDate(personalCards,personalContainer, sortBy);
            sortByDate(courseCards, courseContainer, sortBy);
            break;

        case "Old to Recent":
            // sortByDate(workCards, workContainer, sortBy);
            sortByDate(personalCards,personalContainer, sortBy);
            sortByDate(courseCards, courseContainer, sortBy);
            break;

        default:
            console.log("This is not an option");
    }
}

// Searches for Project Name, Technology, or Tag in input box 
document.getElementById("searchProjects").addEventListener("input", function () {
    
    let searchTerm = "";
    // keep charaters under 50 and remove special charaters
    if (this.value.toLocaleLowerCase().length < 50){
        searchTerm = this.value.toLocaleLowerCase().trim();
        searchTerm = searchTerm.replace(/[^a-zA-Z0-9+#. ]/g, '');
    }
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardName = card.querySelector(".card-heading").textContent.toLocaleLowerCase();
        const cardCategory = card.dataset.category.toLowerCase();
        const cardTechnologies = card.dataset.technologies.toLowerCase();

        if (cardName.includes(searchTerm) || cardCategory.includes(searchTerm) || cardTechnologies.includes(searchTerm)) {
        card.classList.remove("hidden");
        }
        else {
            card.classList.add("hidden");
        }
    });

    headings = document.querySelectorAll(".heading-container");
    results = document.getElementById("results");
    const hiddenCards = document.querySelectorAll(".card.hidden");

    if (hiddenCards.length === cards.length){
        headings.forEach(heading => {
            heading.classList.add("hidden");
        })
        results.classList.remove("hidden");
    }
    else {
        headings.forEach(heading => {
            heading.classList.remove("hidden");
        })
        results.classList.add("hidden");
    }
});

window.onload = sortCards();