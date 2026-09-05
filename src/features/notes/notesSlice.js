import { createSlice, nanoid } from '@reduxjs/toolkit';

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        items: [],
        searchQuery: '',
        sortBy: 'Newest',
    },
    reducers: {
        addNote: {
            reducer(state, action) {
                state.items.push(action.payload);
            },
            prepare(title, content, tag) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        }),
                        timestamp: new Date().toISOString(),
                        tag: tag || 'Untagged',
                    }
                }
            }
        },
        deleteNote: (state, action) => {
            state.items = state.items.filter(note => note.id !== action.payload);
        },
        editNote: (state, action) => {
            const { id, title, content, date, tag } = action.payload;
            const existingNote = state.items.find(note => note.id === id);
            
            if (existingNote) {
                existingNote.title = title;
                existingNote.content = content;
                existingNote.date = date;
                existingNote.timestamp = new Date().toISOString();
                existingNote.tag = tag;

                const type = state.sortBy;
                if (type === 'Newest') {
                    state.items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                } else if (type === 'Oldest') {
                    state.items.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                } else if (type === 'Alphabetically') {
                    state.items.sort((a, b) => a.title.localeCompare(b.title, 'en'));
                }
            }
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        sortNotes: (state, action) => {
            state.sortBy = action.payload
            const type = action.payload;
            if (type === 'Newest') {
                state.items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            } else if (type === 'Oldest') {
                state.items.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            } else if (type === 'Alphabetically') {
                state.items.sort((a, b) => a.title.localeCompare(b.title, 'en'));
            }
        }
    }
});

export const { addNote, deleteNote, editNote, sortNotes, setSearchQuery } = notesSlice.actions;
export default notesSlice.reducer;