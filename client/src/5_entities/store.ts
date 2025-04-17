import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { boardsReducer } from './boards/boardsSlice';
import { tasksReducer } from './tasks/tasksSlice';

const rootReducer = combineReducers({
    'boards': boardsReducer,
    'tasks': tasksReducer,

});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;