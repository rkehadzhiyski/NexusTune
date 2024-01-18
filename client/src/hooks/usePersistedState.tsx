import { useState, Dispatch, SetStateAction } from 'react';

type PersistedState<T> = [T, Dispatch<SetStateAction<T>>];

export default function usePersistedState<T>(key: string, defaultValue: T): PersistedState<T> {
    const [state, setState] = useState(() => {
        const persistedState = localStorage.getItem(key);

        if (persistedState) {
            return JSON.parse(persistedState);
        }

        return defaultValue;
    });

    const setPersistedState: Dispatch<SetStateAction<T>> = (value) => {
        setState(value);

        let serializedValue;
        if (typeof value === 'function') {
            serializedValue = JSON.stringify((value as (prevState: T) => T)(state));
        } else {
            serializedValue = JSON.stringify(value);
        }

        localStorage.setItem(key, serializedValue);
    };

    return [
        state,
        setPersistedState,
    ];
}