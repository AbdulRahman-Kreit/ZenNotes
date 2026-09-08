import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddButton() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/add');
    }
    
    return (
        <button onClick={handleNavigate} 
        title='Add Note'
        className='absolute bottom-10 right-0 
        lg:right-0 w-13 h-13 md:w-15 md:h-15 rounded-lg bg-blue-500 
        text-2xl md:text-3xl text-white'>
            <i className="fa-solid fa-plus"></i>
        </button>
    )
}
