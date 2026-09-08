import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddButton() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/add');
    }
    
    return (
        <button 
            onClick={handleNavigate} 
            title='Add Note'
            className='fixed bottom-6 right-4 md:bottom-8 md:right-8 
            lg:right-40 w-12 h-12 md:w-14 md:h-14 rounded-xl accent-bg 
            text-2xl md:text-3xl text-white shadow-xl transition-all 
            hover:scale-105 active:scale-95 flex items-center justify-center z-30'
        >
            <i className="fa-solid fa-plus"></i>
        </button>
    )
}