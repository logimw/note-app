const input = document.querySelector("#search-text");
const btn = document.querySelector("#create-note");
const selectFilter = document.querySelector("#filter-by");

let notes = getSavedNotes();

const filters = {
    searchText: "",
    sortBy: "byEdited"
}

renderNotes(notes, filters); // Initiate rendering

btn.addEventListener("click", () => {
    const timestamp = moment().valueOf()
    const id = uuidv4();
    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: timestamp, // Later u can use this: .format("DD-MM-YYYYr. HH:mm:ss"),
        editedAt: timestamp
    });
    saveNotes(notes);
    location.assign(`/edit.html#${id}`);
});

input.addEventListener("input", (e) => {
    filters.searchText = e.target.value;
    renderNotes(notes, filters); // Calling rendering
});

selectFilter.addEventListener("change", (e) => {
    filters.sortBy = e.target.value;
    renderNotes(notes, filters)
})

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters)
    }
});


