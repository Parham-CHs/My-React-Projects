
import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from '../features/workflows/workflowSlice';

export const store = configureStore({
    reducer: {
        workflow: workflowReducer,
    },
});

// Infer types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
