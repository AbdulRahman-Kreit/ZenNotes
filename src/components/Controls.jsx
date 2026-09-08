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
        <div className='flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-6 md:py-10 relative gap-4'>
            {/* Search Section */}
            <div className="flex items-center relative w-full sm:w-auto flex-1 max-w-lg">
                <label htmlFor="search-bar" className='absolute left-3 top-1/2 -translate-y-1/2 
                text-xl md:text-2xl accent-text inline-flex'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </label>
                <input 
                    type="text" 
                    id="search-bar"
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    className='relative h-11 w-full bg-transparent border-2 
                    accent-border accent-focus outline-none 
                    rounded-xl pl-11 pr-4 transition-all' 
                    placeholder='Enter Note Name'
                />
            </div>

            {/* Buttons Container */}
            <div className="flex flex-row items-center justify-end gap-x-2 sm:gap-x-4 w-full sm:w-auto">
                <button
                    type="button"
                    onClick={() => dispatch(toggleLayout())}
                    title={layout === 'grid' ? 'Switch to List' : 'Switch to Grid'}
                    className="py-2.5 px-3.5 accent-bg text-white rounded-xl transition-colors z-10 flex items-center justify-center min-w-[42px]"
                >
                    <i className={`fa-solid ${layout === 'grid' ? 'fa-list' : 'fa-grip'} text-xl`}></i>
                </button>

                {/* Sort Dropdown Button */}
                <div className="relative" ref={sortDropdownRef}> 
                    <button 
                        onClick={toggleSortDropdown} 
                        title='Sort notes'
                        className="py-2.5 px-4 accent-bg text-white rounded-xl transition-colors flex items-center justify-center min-w-[42px]"
                    >
                        <i className="fa-solid fa-arrow-down-wide-short text-xl"></i>
                    </button>

                    {isSortDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 overflow-hidden">
                            <button 
                                onClick={() => handleSort('Oldest')} 
                                className={`w-full text-left text-sm px-4 py-3 transition-colors border-b border-gray-100 dark:border-zinc-700
                                ${sortBy === 'Oldest' ? 'accent-bg text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200'}`}
                            >
                                <i className={`fa-solid fa-clock-rotate-left mr-2 ${sortBy === 'Oldest' ? 'text-white' : 'opacity-50'}`}></i>
                                Oldest First
                            </button>

                            <button 
                                onClick={() => handleSort('Newest')} 
                                className={`w-full text-left text-sm px-4 py-3 transition-colors border-b border-gray-100 dark:border-zinc-700
                                ${sortBy === 'Newest' ? 'accent-bg text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200'}`}
                            >
                                <i className={`fa-solid fa-clock mr-2 ${sortBy === 'Newest' ? 'text-white' : 'opacity-50'}`}></i>
                                Newest First
                            </button>

                            <button 
                                onClick={() => handleSort('Alphabetically')} 
                                className={`w-full text-left text-sm px-4 py-3 transition-colors
                                ${sortBy === 'Alphabetically' ? 'accent-bg text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200'}`}
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
                        className="py-2.5 px-4 accent-bg text-white rounded-xl transition-colors flex items-center justify-center min-w-[42px]"
                    >
                        <i className="fa-solid fa-filter text-xl"></i>
                    </button>

                    {isFilterDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 overflow-hidden">
                            <button 
                                onClick={() => handleFilter('All')} 
                                className={`w-full text-left text-sm px-4 py-3 transition-colors border-b border-gray-100 dark:border-zinc-700
                                ${filter === 'All' ? 'accent-bg text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200'}`}
                            >
                                <i className={`fa-solid fa-note-sticky mr-2 ${filter === 'All' ? 'text-white' : 'opacity-50'}`}></i>
                                All Notes
                            </button>
                            
                            <button 
                                onClick={() => handleFilter('Untagged')} 
                                className={`w-full text-left text-sm px-4 py-3 transition-colors border-b border-gray-100 dark:border-zinc-700
                                ${filter === 'Untagged' ? 'accent-bg text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200'}`}
                            >
                                <i className={`fa-solid fa-circle-xmark mr-2 ${filter === 'Untagged' ? 'text-white' : 'opacity-50'}`}></i>
                                Untagged
                            </button>

                            <button 
                                onClick={() => handleFilter('Personal')} 
                                className={`w-full text-left text-sm px-4 py-3 transition-colors border-b border-gray-100 dark:border-zinc-700
                                ${filter === 'Personal' ? 'accent-bg text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200'}`}
                            >
                                <i className={`fa-solid fa-person mr-2 ${filter === 'Personal' ? 'text-white' : 'opacity-50'}`}></i>
                                Personal
                            </button>

                            <button 
                                onClick={() => handleFilter('Health')} 
                                className={`w-full text-left text-sm px-4 py-3 transition-colors border-b border-gray-100 dark:border-zinc-700
                                ${filter === 'Health' ? 'accent-bg text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200'}`}
                            >
                                <i className={`fa-solid fa-apple-whole mr-2 ${filter === 'Health' ? 'text-white' : 'opacity-50'}`}></i>
                                Health
                            </button>

                            <button 
                                onClick={() => handleFilter('Work')} 
                                className={`w-full text-left text-sm px-4 py-3 transition-colors
                                ${filter === 'Work' ? 'accent-bg text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-200'}`}
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