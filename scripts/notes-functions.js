// Read existing notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem("notes");
    try {
        return notesJSON ? JSON.parse(notesJSON) : [];
    } catch (error) {
        return []
    }
}
// Save the note to local storage
const saveNotes = (notes) => {
    return localStorage.setItem("notes", JSON.stringify(notes));
}

// Remove a note from the list

const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
    }
}
// Generate last edited

const generateLastEdited = (created, edited, container) => {
    if (created === edited) {
        container.textContent = `Created at ${moment(created).format("DD-MM-YYYYr. HH:mm:ss")}`

    } else if (created < edited) {
        container.textContent = `Last updated ${moment(edited).fromNow()}`
    }
}

// Generate the DOM Structure for a note
const generateDOM = (note) => {
    const noteEl = document.createElement("a");
    const textEl = document.createElement("p");
    const statusEl = document.createElement("p")
    // const button = document.createElement("button");

    // // Setup remove note button
    // button.textContent = "x";
    // button.addEventListener("click", () => {
    //     removeNote(note.id);
    //     saveNotes(notes);
    //     renderNotes(notes, filters);

    // });
    // noteEl.appendChild(button);

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = "Unnamed note"
    }
    textEl.classList.add("list-item__title");
    //textEl.setAttribute("href", `/edit.html#${note.id}`);
    noteEl.appendChild(textEl);

    // Setup the link
    noteEl.setAttribute("href", `/edit.html#${note.id}`);
    noteEl.classList.add("list-item")

    // Setup the status message
    statusEl.textContent = generateLastEdited(note.createdAt);
    statusEl.classList.add("list-item__subtitle");
    noteEl.appendChild(statusEl);
    return noteEl;
}

// Sort notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.editedAt > b.editedAt) {
                return -1;
            } else if (a.editedAt < b.editedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === "alphabetical") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }
}

// Render application notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const noteContainer = document.querySelector("#notes")
    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    noteContainer.innerHTML = "";

    if (filteredNotes.length > 0) {
        filteredNotes.forEach(note => {
            const noteEl = generateDOM(note);
            noteContainer.appendChild(noteEl);
        });
    } else {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No notes to show.";
        emptyMessage.classList.add("empty-message")
        noteContainer.appendChild(emptyMessage);
    }


}

