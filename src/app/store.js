import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../features/notes/notesSlice';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('zennotes_data');
        if (serializedState === null) return undefined;

        const parsedData = JSON.parse(serializedState);

        if (parsedData && parsedData.notes && Array.isArray(parsedData.notes.items)) {
            return parsedData;
        }
        
        localStorage.removeItem('zennotes_data');
        return undefined;
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('zennotes_data', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
}

export const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveState({
        notes: store.getState().notes,
    });
});