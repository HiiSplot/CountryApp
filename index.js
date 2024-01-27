const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
let countriesData = [];
let sortMethod = "maxToMin";

async function fetchCountries() {
    await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countriesData = data));

        console.log(countriesData);
        countriesDisplay();
}

function countriesDisplay() {
    countriesContainer.innerHTML = countriesData
    .filter(
        (country) => country.name.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
        )
    .sort((a, b) => {
        if (sortMethod === "maxToMin") {
            return b.population - a.population;
        } else if (sortMethod === "minToMax") {
            return a.population - b.population;
        } else if (sortMethod === "alpha") {
            return a.name.common.localeCompare(b.name.common)
        }

})
    .slice(0, inputRange.value)
    .map(
        (country) =>
            `
            <li class="card">
                <h2>${country.name.common}</h2>
                <h4>${country.capital}</h4>
                <p>Population : ${country.population.toLocaleString()}</p>
                <img src=${country.flags.png} alt="${country.alt}">
            </li>
            `
        ).join("")
    };

window.addEventListener('load', fetchCountries);
inputSearch.addEventListener('input', countriesDisplay);
inputRange.addEventListener('input', () => {
    countriesDisplay();
    rangeValue.textContent = inputRange.value;
    // Connecter l'input range et le span qui indique le nombre
})

btnSort.forEach((btn) => {
    btn.addEventListener('click', (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
    });
});
