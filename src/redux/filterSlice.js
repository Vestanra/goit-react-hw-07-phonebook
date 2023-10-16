import { createSelector, createSlice } from "@reduxjs/toolkit";
import { selectContacts} from "./contactsSlice";

export const filterInitialState = {
    value: '',
};

const filterSlise = createSlice({
    name: 'filter',
    initialState: filterInitialState,
    reducers: {
        changeFilter(state, action) {
            state.value = action.payload;
        }
    }
});

export const selectFilter = state => state.filter.value;
export const selectVisibleContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) => {
        return contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()));
    }
)

export const filterReducer = filterSlise.reducer;
export const { changeFilter } = filterSlise.actions;