import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, editNote } from '../features/notes/notesSlice';
import { useNavigate, useParams } from 'react-router-dom';

const initialState = {
    title: '',
    content: ''
}

function formReducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
}

export default function AddNotes() {
    const reduxDispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const existingNote = useSelector(state => 
        state.notes.items.find(note => note.id === id)
    );

    const [state, formDispatch] = useReducer(formReducer, {
        title: existingNote ? existingNote.title : '',
        content: existingNote ? existingNote.content : ''
    });

    const handleChange = (e) => {
        formDispatch({
            type: 'UPDATE_FIELD',
            field: e.target.name,
            value: e.target.value
        })
    }

    const handleSave = () => {
        if (state.title.trim() && state.content.trim()) {
            if (id) {
                reduxDispatch(editNote({
                    id: id,
                    title: state.title,
                    content: state.content,
                    date: new Date().toLocaleDateString('en-GB', { 
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit', hour12: true 
                    })
                }));
            } else {
                reduxDispatch(addNote(state.title, state.content));
            }
            navigate('/');
        } else {
            alert("Please fill in both title and content");
        }
    }

    return (
        <div className='relative min-h-screen max-w-7xl w-full mx-auto py-4'>
            <header className="flex mb-8">
                <button onClick={handleSave} className="text-2xl save-btn">
                    <i className="fa-solid fa-angle-left"></i>
                </button>
            </header>

            <main className="space-y-4">
                {/* Title */}
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={state.title}
                    onChange={handleChange}
                    className="w-full text-4xl font-bold outline-none 
                    bg-transparent title"
                />
                
                {/* Date */}
                <p className="text-sm date">
                    {new Date().toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric',
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: true })}
                </p>
                
                {/* Content */}
                <textarea
                    name="content"
                    placeholder="Content..."
                    value={state.content}
                    onChange={handleChange}
                    className="w-full h-[60vh] text-lg outline-none 
                    bg-transparent resize-none content"
                />
            </main>
        </div>
    )
}