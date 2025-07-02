// src/context/BlindBoxContext.ts
import { createContext } from 'react';
import type { BlindBoxContextType } from '../types/blindBox';

export const BlindBoxContext = createContext<BlindBoxContextType | undefined>(undefined);
