const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const getNotes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/notes`);
        const responseJson = await response.json();
        
        if (responseJson.error) {
            showResponseMessage(responseJson.message);
        } else {
            renderNotes(responseJson.notes);
        }
    } catch (error) {
        showResponseMessage(error);
    }
};

// const insertNote = async (note) => {
//     try {
//         const options = {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(note)
//         };
    
//         const response = await fetch(`${BASE_URL}/notes`, options);
//         const responseJson = await response.json();
//         showResponseMessage(responseJson.message);
//         getNotes();
//     } catch (error) {
//       showResponseMessage(error);
//     }
// };

function addNote() {
    const titleInput = document.querySelector('custom-input[label="Judul"]');
    const title = titleInput.shadowRoot.querySelector('input').value.trim();
    const titleError = titleInput.shadowRoot.querySelector('small');

    const bodyInput = document.querySelector('custom-textarea[label="Catatan"]');
    const body = bodyInput.shadowRoot.querySelector('textarea').value.trim();
    const bodyError = bodyInput.shadowRoot.querySelector('small');

    if (title === '') {
        titleError.style.display = 'block';
        return;
    } else {
        titleError.style.display = 'none';
    }

    if (body === '') {
        bodyError.style.display = 'block';
        return;
    } else {
        bodyError.style.display = 'none';
    }

    const noteObject = {
        //id: `notes-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 9)}`, 
        title: title, 
        body: body, 
        //createdAt: new Date().toISOString(), 
        archived: false,
    };

//     try {
//         const options = {
//             method: 'POST',
//             headers: {
//             'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(note)
//         };
    
//         const response = await fetch(`${BASE_URL}/notes`, options);
//         const responseJson = await response.json();
//         showResponseMessage(responseJson.message);
//         getNotes();
//     } catch (error) {
//       showResponseMessage(error);
//     }

    resetForm();
    notesData.push(noteObject);
    renderNotes();
}

function resetForm() {
    document.querySelector('custom-input[label="Judul"]').shadowRoot.querySelector('input').value = '';
    document.querySelector('custom-textarea[label="Catatan"]').shadowRoot.querySelector('textarea').value = '';
}

class CustomInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const label = this.getAttribute('label') || 'Label';
        const placeholder = this.getAttribute('placeholder') || 'Placeholder';
        const required = this.getAttribute('required') !== null;

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', placeholder);

        const labelElement = document.createElement('label');
        labelElement.textContent = label;

        const errorMessage = document.createElement('small');
        errorMessage.textContent = 'Harap isi bidang ini';
        errorMessage.style.color = 'red';
        errorMessage.style.display = 'none';

        shadow.appendChild(labelElement);
        shadow.appendChild(input);
        shadow.appendChild(errorMessage);

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                margin: 8px 0;
            }
            label {
                font-weight: bold;
            }
            input {
                border: 1px solid #6C757D;
                border-radius: 5px;
                box-sizing: border-box;
                font-size: 15px;
                padding: 12px;
                width: 100%;
            }
        `;
        shadow.appendChild(style);

        if (required) {
            input.setAttribute('required', '');
            this.setAttribute('required', '');
        }

        input.addEventListener('input', () => {
            if (required && input.value.trim() === '') {
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
            }
        });
    }

    get required() {
        return this.getAttribute('required');
    }

    set required(value) {
        if (value) {
            this.setAttribute('required', '');
        } else {
            this.removeAttribute('required');
        }
    }
}
customElements.define('custom-input', CustomInput);

class CustomTextarea extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const label = this.getAttribute('label') || 'Label';
        const placeholder = this.getAttribute('placeholder') || 'Placeholder';
        const required = this.getAttribute('required') !== null;

        const textarea = document.createElement('textarea');
        textarea.setAttribute('placeholder', placeholder);

        const labelElement = document.createElement('label');
        labelElement.textContent = label;

        const errorMessage = document.createElement('small');
        errorMessage.textContent = 'Harap isi bidang ini';
        errorMessage.style.color = 'red';
        errorMessage.style.display = 'none';

        shadow.appendChild(labelElement);
        shadow.appendChild(textarea);
        shadow.appendChild(errorMessage);

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                margin: 8px 0;
            }
            label {
                font-weight: bold;
            }
            textarea {
                border: 1px solid #6C757D;
                border-radius: 5px;
                box-sizing: border-box;
                font-size: 15px;
                padding: 12px;
                width: 100%;
                height: 200px;
            }
        `;
        shadow.appendChild(style);

        if (required) {
            textarea.setAttribute('required', '');
            this.setAttribute('required', '');
        }

        textarea.addEventListener('input', () => {
            if (required && textarea.value.trim() === '') {
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
            }
        });
    }

    get required() {
        return this.getAttribute('required');
    }

    set required(value) {
        if (value) {
            this.setAttribute('required', '');
        } else {
            this.removeAttribute('required');
        }
    }
}
customElements.define('custom-textarea', CustomTextarea);

class CustomButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const button = document.createElement('button');
        button.textContent = this.textContent || 'Submit';
        button.addEventListener('click', addNote);

        shadow.appendChild(button);

        const style = document.createElement('style');
        style.textContent = `
            button {
                background-color: transparent;
                border: 1px solid white;
                border-radius: 5px;
                box-sizing: border-box;
                color: white;
                cursor: pointer;
                display: block;
                font-size: 18px;
                font-weight: bold;
                margin-top: 20px;
                padding: 15px;
                width: 100%;
            }
            button:disabled {
                cursor: not-allowed;
            }
            button:hover {
                background-color: #26677E;
            }
        `;
        shadow.appendChild(style);
    }
}
customElements.define('custom-button', CustomButton);

function searchNote() {
    let search = document.querySelector('#searchNoteTitle').value;
    let returnSearch = document.getElementsByClassName('containerNotes');

    for (const noteItem of returnSearch) {
        let titleNote = noteItem.querySelector('h3').innerText.toUpperCase();
        let searchNote = titleNote.search(search.toUpperCase());
        if (searchNote != -1) {
            noteItem.style.display = '';
        } else {
            noteItem.style.display = 'none';
        }
    }
}

function renderNotes(notes) {
    const notesContainer = document.getElementById('allNoteList');
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('containerNotes');
        noteElement.innerHTML = `
            <div class="noteContent">
                <h3>${note.title}</h3>
                <small>${new Date(note.createdAt).toLocaleString()}</small>
                <p>${note.body}</p>
            </div>
            <div class="deleteButton">
                <button class="remove" onclick="removeNote('${note.id}')"><i class="fa fa-trash"></i></button>
                <button class="archived" onclick="archivedNote('${note.id}')"><i class="fa fa-archive"></i></button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputNote');
    const searchForm = document.getElementById('searchNote');
    
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addNote();
    });

    searchForm.addEventListener("input", (event) => {
        event.preventDefault();
        searchNote();
    });

    getNotes();
});

//renderNotes();