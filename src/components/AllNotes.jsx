import React from 'react'
import Controls from './Controls';
import NoteList from './NoteList';
import AddButton from './AddButton';

export default function AllNotes() {

    return (
        <div className='relative min-h-screen max-w-7xl w-full mx-auto'>
            <Controls />
            <NoteList />
            <AddButton />
        </div>
    )
}
