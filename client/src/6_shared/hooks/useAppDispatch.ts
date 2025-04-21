import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/5_entities/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();