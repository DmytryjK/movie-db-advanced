import {
    UnknownAction,
    applyMiddleware,
    legacy_createStore,
} from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import { ThunkAction, thunk } from 'redux-thunk';

const composetEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = legacy_createStore(rootReducer, composetEnhancer);

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType> = ThunkAction<
    ReturnType,
    RootState,
    undefined,
    UnknownAction
>;

export type RootState = ReturnType<typeof store.getState>;

export default store;
