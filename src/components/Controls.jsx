import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortNotes, setSearchQuery, filterNotes, toggleLayout } from '../features/notes/notesSlice';

export default function Controls() {
    const { searchQuery, sortBy, filter, layout } = useSelector(state => state.notes);
    
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const sortDropdownRef = useRef(null);
    const filterDropdownRef = useRef(null);
    const dispatch = useDispatch();

    const toggleSortDropdown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
    }

    const toggleFilterDropdown = () => {
        setIsFilterDropdownOpen(!isFilterDropdownOpen);
    }

    const handleClickOutside = useCallback((event) => {
        if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
            setIsSortDropdownOpen(false);
        }
        if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
            setIsFilterDropdownOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isSortDropdownOpen || isFilterDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isSortDropdownOpen, isFilterDropdownOpen, handleClickOutside]);

    const handleSort = (type) => {
        dispatch(sortNotes(type));
        setIsSortDropdownOpen(false);
    }

    const handleFilter = (type) => {
        dispatch(filterNotes(type));
        setIsFilterDropdownOpen(false);
    }
    
    return (
        <div className='flex justify-between items-center py-12 relative gap-4'>
            {/* Search Section */}
            <div className="flex items-center relative">
                <label htmlFor="search-bar" className='absolute left-3 top-1/2 -translate-y-1/2 
                text-2xl text-blue-400 focus:text-blue-600 inline-flex'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </label>
                <input 
                    type="text" 
                    id="search-bar"
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    className='relative h-10 w-full md:w-80 bg-transparent border-2 
                    border-blue-400 focus:border-blue-600 outline-none 
                    rounded-xl pl-12 px-4 transition-all' 
                    placeholder='Enter Note Name'
                />
            </div>

            {/* Buttons Container */}
            <div className="flex flex-row items-center gap-x-4 w-fit">
                <button
                    type="button"
                    onClick={() => dispatch(toggleLayout())}
                    title={layout === 'grid' ? 'Switch to List' : 'Switch to Grid'}
                    className="py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors z-10 flex items-center justify-center"
                >
                    <i className={`fa-solid ${layout === 'grid' ? 'fa-list' : 'fa-grip'} 
                    text-2xl`}></i>
                </button>

                {/* Sort Dropdown Button */}
                <div className="relative" ref={sortDropdownRef}> 
                    <button 
                        onClick={toggleSortDropdown} 
                        title='Sort notes'
                        className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <i className="fa-solid fa-arrow-down-wide-short"></i>
                    </button>

                    {isSortDropdownOpen && (
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

                {/* Filter Dropdown Button */}
                <div className="relative" ref={filterDropdownRef}> 
                    <button 
                        onClick={toggleFilterDropdown} 
                        title='Filter notes'
                        className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <i className="fa-solid fa-filter"></i>
                    </button>

                    {isFilterDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                            <button 
                                onClick={() => handleFilter('All')} 
                                className={`w-full text-left px-4 py-3 transition-colors border-b border-gray-100
                                ${filter === 'All' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
                            >
                                <i className={`fa-solid fa-note-sticky mr-2 ${filter === 'All' ? 'text-white' : 'opacity-50'}`}></i>
                                All Notes
                            </button>
                            
                            <button 
                                onClick={() => handleFilter('Untagged')} 
                                className={`w-full text-left px-4 py-3 transition-colors border-b border-gray-100
                                ${filter === 'Untagged' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
                            >
                                <i className={`fa-solid fa-circle-xmark mr-2 ${filter === 'Untagged' ? 'text-white' : 'opacity-50'}`}></i>
                                Untagged
                            </button>

                            <button 
                                onClick={() => handleFilter('Personal')} 
                                className={`w-full text-left px-4 py-3 transition-colors
                                ${filter === 'Personal' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
                            >
                                <i className={`fa-solid fa-person mr-2 ${filter === 'Personal' ? 'text-white' : 'opacity-50'}`}></i>
                                Personal
                            </button>

                            <button 
                                onClick={() => handleFilter('Health')} 
                                className={`w-full text-left px-4 py-3 transition-colors
                                ${filter === 'Health' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
                            >
                                <i className={`fa-solid fa-apple-whole mr-2 ${filter === 'Health' ? 'text-white' : 'opacity-50'}`}></i>
                                Health
                            </button>

                            <button 
                                onClick={() => handleFilter('Work')} 
                                className={`w-full text-left px-4 py-3 transition-colors
                                ${filter === 'Work' ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}
                            >
                                <i className={`fa-solid fa-briefcase mr-2 ${filter === 'Work' ? 'text-white' : 'opacity-50'}`}></i>
                                Work
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}