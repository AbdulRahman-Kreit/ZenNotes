import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, editNote } from '../features/notes/notesSlice';
import { useNavigate, useParams } from 'react-router-dom';

const initialState = {
    title: '',
    content: '',
    tag: 'Untagged',
};

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
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        });
    };

    const selectTag = (selectedTag) => {
        formDispatch({
            type: 'UPDATE_FIELD',
            field: 'tag',
            value: selectedTag
        });
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

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
    };

    return (
        <div className='relative flex flex-col min-h-screen max-w-7xl mx-auto w-full py-4 px-4'>
            <header className="flex w-full justify-between mb-8">
                <button onClick={handleOpenPopup} className="text-2xl save-btn hover:opacity-80 transition-opacity">
                    <i className="fa-solid fa-angle-left"></i>
                </button>

                <button onClick={handleSave} className="text-2xl py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors">
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
            </header>

            {/* Popup Backdrop & Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-zinc-700 transform transition-all flex flex-col items-center text-center space-y-6">
                        
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-xl">
                            <i className="fa-solid fa-circle-question"></i>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Save Changes?</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Do you want to save your progress before leaving?
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <button 
                                onClick={handleSave}
                                className="flex-1 py-2.5 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-md transition-all active:scale-95"
                            >
                                Save & Leave
                            </button>

                            <button 
                                onClick={() => navigate('/')}
                                className="flex-1 py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl border border-red-200 transition-all active:scale-95"
                            >
                                Discard
                            </button>

                            <button 
                                onClick={handleClosePopup}
                                className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-200 font-medium rounded-xl transition-all active:scale-95"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="space-y-4">
                {/* Title Input */}
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={state.title}
                    onChange={handleChange}
                    className="w-full text-4xl font-bold outline-none 
                    bg-transparent title border-b-2 border-blue-400 focus:border-blue-600"
                />
                
                {/* Date Display */}
                <p className="text-sm date">
                    {new Date().toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric',
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: true })}
                </p>

                {/* Tags Selector */}
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <button 
                            key={index} 
                            onClick={() => selectTag(tag)} 
                            className={`py-1 px-3 rounded-2xl border border-blue-400 transition-colors
                                ${state.tag === tag ? 
                                `bg-blue-400 text-white` : 
                                `bg-transparent text-blue-400`
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                
                {/* Content Textarea */}
                <textarea
                    name="content"
                    placeholder="Content..."
                    value={state.content}
                    onChange={handleChange}
                    className="w-full h-[60vh] text-lg outline-none 
                    bg-transparent resize-none content mt-4"
                />
            </main>
        </div>
    );
}