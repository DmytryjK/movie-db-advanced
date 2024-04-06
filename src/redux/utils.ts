/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from '@reduxjs/toolkit';

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

type ActionHandlers<S> = {
    [key: string]: (state: S, action: any) => S;
};

export const createReducer = <TState>(
    initialState: TState,
    handlers: ActionHandlers<TState>,
) => {
    return (state: TState, action: Action) => {
        state ??= initialState;
        const handler = handlers[action.type];
        return handler?.(state, action) ?? state;
    };
};
