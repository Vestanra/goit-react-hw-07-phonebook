import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact} from "./operations";

export const contactsInitialState = {
    items: [],
    isLoading: false,
    error: null,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlise = createSlice({
    name: 'contacts',
    initialState: contactsInitialState,
    extraReducers: {
        [fetchContacts.pending]: handlePending,
        [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [fetchContacts.rejected]: handleRejected,
        [addContact.pending]: handlePending,
        [addContact.fulfilled](state, action) {
            state.items.unshift(action.payload);
            state.isLoading = false;
            state.error = null;
        },
        [addContact.rejected]: handleRejected,
        [deleteContact.pending]: handlePending,
        [deleteContact.fulfilled](state, action) {
            return {
                ...state,
                items: state.items.filter(contact => contact.id !== action.payload.id),
                isLoading: false,
                error: null,
            };
        },
        [deleteContact.rejected]: handleRejected,
    }
});


export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const contactsReducer = contactsSlise.reducer;