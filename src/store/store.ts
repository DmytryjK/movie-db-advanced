import { legacy_createStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

const store = legacy_createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;
