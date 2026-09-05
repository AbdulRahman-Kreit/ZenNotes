import React from 'react';
import { useSelector } from 'react-redux';
import NoteCard from './NoteCard';

export default function NoteList() {
    const { items, searchQuery } = useSelector(state => state.notes);

    const filteredNotes = (items || []).filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <>
            {filteredNotes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredNotes.map((note) => (
                        <NoteCard 
                            key={note.id} 
                            id={note.id} 
                            title={note.title} 
                            content={note.content} 
                            date={note.date} 
                        />
                    ))}
                </div>
                ) : (
                    <div className="text-center mt-20 text-gray-400 text-lg 
                    md:text-2xl">
                        <p className='start-msg'>
                            No notes yet. Click the + button to add one!
                        </p>
                    </div>
                )}
        </>
    )
}
