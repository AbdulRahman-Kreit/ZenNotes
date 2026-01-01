import React from 'react'
import Heading from './Heading';
import Controls from './Controls';
import NoteList from './NoteList';
import AddButton from './AddButton';

export default function Overview() {

    return (
        <div className='relative min-h-screen max-w-7xl w-full mx-auto'>
            <Heading />
            <Controls />
            <NoteList />
            <AddButton />
        </div>
    )
}
