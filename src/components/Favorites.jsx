import React from 'react'
import Controls from './Controls';
import FavList from './FavList';
import AddButton from './AddButton';

export default function Favorites() {

    return (
        <div className='relative min-h-screen max-w-7xl w-full mx-auto'>
            <Controls />
            <FavList />
            <AddButton />
        </div>
    )
}
