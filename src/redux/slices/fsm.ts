/**
 * The idea here is to try to compose reducer functionality
 * across multiple slices into one slice.
 *
 * Why, in order to try to ensure that certain actions
 * are only reduced when state object is in a certain state,
 * much like a finite state machine.
 */

import { createSlice, createAction, configureStore, PayloadAction } from "@reduxjs/toolkit";

interface FieldError {
  field: string;
  errors: string[];
}

const initialState = {
  state: 'idle' as 'idle' | 'errors',
  person: {
    name: 'John',
    age: 30,
  },
  address: {
    street: 'Kungsgatan',
    city: 'Stockholm',
  },
  errors: [] as FieldError[],
};

type State = typeof initialState;

// One action to rule them all
// All reducers will use this action to update state
type FsmUpdatePayload = Omit<Partial<State>, 'state'>;
export const fsmUpdateAction = createAction<FsmUpdatePayload>("fsm/update");

const personSlice = createSlice({
  name: 'fsmPerson',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fsmUpdateAction, (state, action) => {
      if (action.payload.person === undefined) return;

      state.person = action.payload.person;

      state.errors.push({ field: 'person', errors: ['person error'] });
    });
  },
});

const addressSlice = createSlice({
  name: 'fsmAddress',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fsmUpdateAction, (state, action) => {
      if (action.payload.address === undefined) return;

      state.address = action.payload.address;

      state.errors.push({ field: 'errors', errors: ['address error'] });
    });
  },
});

// /////////////////////////////////////////////////////////////////

export const fsmSlice = createSlice({
  name: 'fsm',
  initialState,
  reducers: {
    fsmUpdateState: (state, action: PayloadAction<State['state']>) => {
      state.state = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fsmUpdateAction, (state, action) => {
      if (state.state === 'idle') {
        personSlice.reducer(state, action);
        addressSlice.reducer(state, action);
      }
    });
  },
});

export const fsmReducer = fsmSlice.reducer;

export const { fsmUpdateState } = fsmSlice.actions;

export const fsmStore = configureStore({
  reducer: {
    fsm: fsmReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type FsmState = ReturnType<typeof fsmStore.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type FsmDispatch = typeof fsmStore.dispatch