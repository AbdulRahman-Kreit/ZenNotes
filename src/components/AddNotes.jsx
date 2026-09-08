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

                <button onClick={handleSave} className="text-2xl py-2 px-4 accent-bg text-white rounded-md transition-colors">
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
            </header>

            {/* Popup Backdrop & Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-(--bg-color) border border-(--border-color) rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl transform transition-all flex flex-col items-center text-center space-y-6">
                        
                        {/* Dynamic Icon Badge */}
                        <div className="w-14 h-14 rounded-full accent-bg text-white flex items-center justify-center text-2xl shadow-md">
                            <i className="fa-solid fa-circle-question"></i>
                        </div>

                        {/* Title & Description */}
                        <div>
                            <h3 className="text-xl font-bold heading">Save Changes?</h3>
                            <p className="text-sm date mt-2">
                                Do you want to save your progress before leaving?
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <button 
                                onClick={handleSave}
                                className="flex-1 py-2.5 px-4 accent-bg text-white font-medium rounded-xl shadow-md transition-all active:scale-95"
                            >
                                Save & Leave
                            </button>

                            <button 
                                onClick={() => navigate('/')}
                                className="flex-1 py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-medium rounded-xl border border-red-500/30 transition-all active:scale-95"
                            >
                                Discard
                            </button>

                            <button 
                                onClick={handleClosePopup}
                                className="flex-1 py-2.5 px-4 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-xl border border-zinc-600 transition-all active:scale-95"
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
                    bg-transparent title border-b-2 accent-border"
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
                            className={`py-1 px-3 rounded-2xl border accent-border transition-colors
                                ${state.tag === tag ? 
                                `accent-bg text-white` : 
                                `bg-transparent accent-text`
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