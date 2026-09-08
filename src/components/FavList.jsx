import React from 'react'
import { useSelector } from 'react-redux';
import NoteCard from './NoteCard';

export default function FavList() {
    const { items, searchQuery, sortBy, filter, layout } = useSelector(state => state.notes);

    const filteredNotes = (items || []).filter(note => {

        if (!note.isFavorite) return false;

        if (filter && filter !== 'All' && note.tag !== filter) {
            return false;
        }

        const query = (searchQuery || '').toLowerCase();
        const titleMatch = (note.title || '').toLowerCase().includes(query);
        const contentMatch = (note.content || '').toLowerCase().includes(query);
        const tagMatch = (note.tag || '').toLowerCase().includes(query);

        return titleMatch || contentMatch || tagMatch;
    });

    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (sortBy === 'Newest') {
            return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
        }
        if (sortBy === 'Oldest') {
            return new Date(a.timestamp || 0) - new Date(b.timestamp || 0);
        }
        if (sortBy === 'Alphabetically') {
            return (a.title || '').localeCompare(b.title || '', 'en');
        }
        return 0;
    });


    return (
        <>
            {sortedNotes.length > 0 ? (
                <div className={
                    layout === 'grid' ?
                    "grid grid-cols-2 lg:grid-cols-4 gap-6" : 
                    "flex flex-col gap-4 w-full"
                    }>
                    {sortedNotes.map((note) => (
                        <NoteCard 
                            key={note.id} 
                            id={note.id} 
                            title={note.title} 
                            content={note.content} 
                            date={note.date} 
                            tag={note.tag || 'Untagged'}
                            isFavorite={note.isFavorite}
                            layout={layout}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center mt-20 text-gray-400 text-lg md:text-2xl">
                    <p className="start-msg">
                        No notes yet. Click the + button to add one!
                    </p>
                </div>
            )}
        </>
    );
}
