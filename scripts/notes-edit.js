const title = document.querySelector("#note-title");
const body = document.querySelector("#note-body");
const btn = document.querySelector("#remove-note");
const btnReturn = document.querySelector("#link");
const time = document.querySelector("#time");
const noteId = location.hash.substring(1);
let notes = getSavedNotes();

// const editionTime;

let note = notes.find((note) => {
    return note.id === noteId;
})
if (note === undefined) {
    location.assign("/index.html")
}

title.value = note.title;
body.value = note.body;

generateLastEdited(note.createdAt, note.editedAt, time);


title.addEventListener("input", (input) => {
    note.title = input.target.value;
    note.editedAt = moment().valueOf();
    generateLastEdited(note.createdAt, note.editedAt, time);
    saveNotes(notes);
});
body.addEventListener("input", (textarea) => {
    note.body = textarea.target.value;
    note.editedAt = moment().valueOf(); //.format("DD-MM-YYYYr. HH:mm:ss");
    generateLastEdited(note.createdAt, note.editedAt, time);
    saveNotes(notes);
});

btn.addEventListener("click", () => {
    removeNote(note.id);
    saveNotes(notes);
    location.assign("/index.html");
})
btnReturn.addEventListener("click", () => {
    location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        notes === JSON.parse(e.newValue);
        notes = getSavedNotes();
        note = notes.find((note) => {
            return note.id === noteId;
        })
        if (note === undefined) {
            location.assign("/index.html")
        }

        title.value = note.title;
        body.value = note.body;
    }
});