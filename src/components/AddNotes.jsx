import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, editNote } from '../features/notes/notesSlice';
import { useNavigate, useParams } from 'react-router-dom';

const initialState = {
    title: '',
    content: '',
    tag: 'Untagged',
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

const tags = ['Untagged', 'Personal', 'Work', 'Health'];

export default function AddNotes() {
    const reduxDispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const existingNote = useSelector(state => 
        state.notes.items.find(note => note.id === id)
    );

    const [state, formDispatch] = useReducer(formReducer, {
        title: existingNote ? existingNote.title : '',
        content: existingNote ? existingNote.content : '',
        tag: existingNote ? (existingNote.tag || 'Untagged') : 'Untagged',
    });

    const handleChange = (e) => {
        formDispatch({
            type: 'UPDATE_FIELD',
            field: e.target.name,
            value: e.target.value
        })
    }

    const selectTag = (selectedTag) => {
        formDispatch({
            type: 'UPDATE_FIELD',
            field: 'tag',
            value: selectedTag
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
                    }),
                    tag: state.tag
                }));
            } else {
                reduxDispatch(addNote(state.title, state.content, state.tag));
            }
            navigate('/');
        } else {
            alert("Please fill in both title and content");
        }
    }


    return (
        <div className='flex flex-col min-h-screen max-w-7xl mx-auto w-full py-4'>
            <header className="flex w-full justify-between mb-8">
                <button onClick={handleSave} className="text-2xl save-btn">
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                <button onClick={handleSave} className="text-2xl py-2 px-4 bg-blue-400 rounded-md">
                    <i className="fa-solid fa-floppy-disk"></i>
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
                    bg-transparent title border-b-2 border-blue-400 focus:border-blue-600"
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

                {/* Tags */}
                
                {tags.map((tag, index) => {
                    return(
                        <button key={index} onClick={() => selectTag(tag)} 
                        className={`py-1 px-2 mr-4 rounded-2xl border border-blue-400
                            ${state.tag === tag ? 
                            `bg-blue-400 text-white` : 
                            `bg-transparent text-blue-400`
                        }`}>
                            {tag}
                        </button>
                    );
                })}
                
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