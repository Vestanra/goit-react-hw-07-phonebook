import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://652d62b7f9afa8ef4b275d90.mockapi.io";

export const fetchContacts = createAsyncThunk("contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }    
});

export const addContact = createAsyncThunk("contacts/addContact",
    async ({ name, phone }, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", { name, phone});
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)

export const deleteContact = createAsyncThunk("contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactId}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
)





// fetchContacts - одержання масиву контактів (метод GET) запитом. Базовий тип екшену "contacts/fetchAll".
// addContact - додавання контакту (метод POST). Базовий тип екшену "contacts/addContact".
// deleteContact - видалення контакту (метод DELETE). Базовий тип екшену "contacts/deleteContact".