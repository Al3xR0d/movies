import { Genres } from '../../types/types';
import { createContext } from 'react';

export const GenresContext = createContext<Genres[]>([]);
