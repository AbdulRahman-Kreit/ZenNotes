import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortNotes, setSearchQuery } from '../features/notes/notesSlice';

export default function Controls() {
    const { searchQuery, sortBy } = useSelector(state => state.notes);
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isDropdownOpen, handleClickOutside]);

    const handleSort = (type) => {
        dispatch(sortNotes(type));
        setIsDropdownOpen(false);
    }
    
    return (
        <div className='flex justify-between items-center py-12 relative'>
            {/* Search Section */}
            <div className="flex items-center">
                <label htmlFor="search-bar" className='absolute left-3 top-1/2 -translate-y-1/2 
                text-2xl text-blue-400 focus:text-blue-600 inline-flex'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </label>
                <input 
                    type="text" 
                    id="search-bar"
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    className='relative h-10 w-11/12 md:w-80 bg-transparent border-2 
                    border-blue-400 focus:border-blue-600 outline-none 
                    rounded-xl pl-12 px-4 transition-all' 
                    placeholder='Enter Note Name'
                />
            </div>

            <div className="relative" ref={dropdownRef}> 
                <button onClick={toggleDropdown} className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <i className="fa-solid fa-arrow-down-wide-short"></i>
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                        <button 
                            onClick={() => handleSort('Oldest')} 
                            className={`w-full text-left px-4 py-3 transition-colors border-b border-gray-100
                            ${sortBy === 'Oldest' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
                        >
                            <i className={`fa-solid fa-clock-rotate-left mr-2 ${sortBy === 'Oldest' ? 'text-white' : 'opacity-50'}`}></i>
                            Oldest First
                        </button>

                        <button 
                            onClick={() => handleSort('Newest')} 
                            className={`w-full text-left px-4 py-3 transition-colors
                            ${sortBy === 'Newest' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
                        >
                            <i className={`fa-solid fa-clock mr-2 ${sortBy === 'Newest' ? 'text-white' : 'opacity-50'}`}></i>
                            Newest First
                        </button>

                        <button 
                            onClick={() => handleSort('Alphabetically')} 
                            className={`w-full text-left px-4 py-3 transition-colors
                            ${sortBy === 'Alphabetically' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
                        >
                            <i className={`fa-solid fa-arrow-down-a-z mr-2 ${sortBy === 'Alphabetically' ? 'text-white' : 'opacity-50'}`}></i>
                            Alphabetically
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}