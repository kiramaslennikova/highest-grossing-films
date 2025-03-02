document.addEventListener("DOMContentLoaded", () => {
    fetch("films.json")
        .then(response => response.json())
        .then(data => {
            window.filmsData = data;
            displayFilms(data);
        });

    document.getElementById("search").addEventListener("input", filterFilms);
});

function displayFilms(films) {
    const table = document.getElementById("films-table");
    table.innerHTML = "";
    films.forEach(film => {
        const row = `<tr>
            <td>${film.id}</td>
            <td>${film.title}</td>
            <td>${film.year}</td>
            <td>${film.director}</td>
            <td>${film["box office"]}</td>
            <td>${film.country}</td>
        </tr>`;
        table.innerHTML += row;
    });
}

function filterFilms() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const filteredFilms = window.filmsData.filter(film =>
        film.title.toLowerCase().includes(searchQuery)
    );
    displayFilms(filteredFilms);
}

function sortTable(n) {
    const table = document.getElementById("films-table");
    let rows = Array.from(table.rows);
    const isAscending = table.dataset.sortOrder !== "asc";
    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[n].innerText;
        let cellB = rowB.cells[n].innerText;

        if (!isNaN(cellA) && !isNaN(cellB)) {
            return isAscending ? cellA - cellB : cellB - cellA;
        } else {
            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        }
    });
    table.dataset.sortOrder = isAscending ? "asc" : "desc";
    table.innerHTML = "";
    rows.forEach(row => table.appendChild(row));
}
