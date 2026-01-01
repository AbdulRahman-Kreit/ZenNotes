import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../features/notes/notesSlice';
import { useNavigate } from 'react-router-dom';

const NoteCard = memo(({ id, title, content, date }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.stopPropagation();
        if(window.confirm("Are you sure you want to delete this note?")) {
            dispatch(deleteNote(id));
        }
    }

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/edit/${id}`);
    };

    const buttonStyleClass = 'w-12 h-12 mx-2 transition-colors duration-300 rounded-full text-white text-md text-center'

    return (
        <div className="bg-[#5da3fa] p-5 rounded-3xl shadow-sm flex flex-col 
        justify-between h-48 text-white group relative overflow-hidden">
            <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 line-clamp-1">{title}</h3>
                <p className="text-md md:text-lg opacity-90 line-clamp-2">{content}</p>
            </div>
            <p className="text-xs md:text-sm mt-4 opacity-80">{date}</p>
            {/* Buttons Container */}
            <div className="absolute inset-0 bg-gray-500/90 flex flex-row 
                justify-center items-center opacity-0 group-hover:opacity-100 
                transition-all duration-500 transform translate-y-full 
                group-hover:translate-y-0">
                {/* Edite Button */}
                <button 
                    onClick={handleEdit}
                    className={`${buttonStyleClass} bg-white/20 
                    hover:bg-white/40`}
                    title="Edit Note"
                >
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                {/* Delete Button */}
                <button 
                    onClick={handleDelete}
                    className={`${buttonStyleClass} bg-red-500/20 
                    hover:bg-red-500/60 `}
                    title="Delete Note"
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
        
    )
});

export default NoteCard;