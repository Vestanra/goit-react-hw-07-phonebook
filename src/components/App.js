import { useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { GlobalStyle } from "./GlobalStyle";
import {Layout} from "./Layout.styled"
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "redux/operations";
import { selectError, selectIsLoading } from "redux/contactsSlice";
import { Oval } from 'react-loader-spinner'
import { selectVisibleContacts } from "redux/filterSlice";

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const visibleContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch]);

  return (<Layout>
      <h1>Phonebook</h1>
      <ContactForm/>
      <Filter/>
      <h2>Contacts ({visibleContacts.length})</h2>
      {isLoading && <Oval height={20}  color='#619191'/>}
      {error  && <p>Oops... Something went wrong</p>}
      <ContactList/>
      <GlobalStyle/>
    </Layout>)
};
