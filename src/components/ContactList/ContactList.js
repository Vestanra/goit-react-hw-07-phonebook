import { useDispatch, useSelector } from "react-redux";
import { Button, ContactInfo, ContactItem, ContactName, Text } from "./ContactList.styled"
import { selectVisibleContacts } from "redux/filterSlice";
import { deleteContact } from "redux/operations";
import { selectError, selectIsLoading } from "redux/contactsSlice";

export const ContactList = () => {
    const dispatch = useDispatch();
    const visibleContacts = useSelector(selectVisibleContacts);
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    return (
        <ul>
            {visibleContacts.map(({ id, name, phone }) =>
                <ContactItem key={id}>
                    <ContactInfo><ContactName>{name}:</ContactName>{phone}</ContactInfo>
                    <Button type="button" onClick={() => dispatch(deleteContact(id))} >Delete</Button>
                </ContactItem>)}
            { visibleContacts.length <= 0 && !error && !isLoading && <Text>You don't have contacts</Text>}
      </ul>
    )
}

