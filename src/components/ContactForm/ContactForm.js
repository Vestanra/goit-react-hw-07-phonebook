import { Formik, Field } from 'formik';
import {Button, ErrorMsg, FormWrapper, InputWrapper} from './ContactForms.styled'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectIsLoading } from 'redux/contactsSlice';
import { addContact } from 'redux/operations';


const phoneRegExp = /^\d{3}-\d{3}-\d{4}$/;

const SignupSchema = Yup.object().shape({
   name: Yup.string()
     .min(1, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   phone: Yup.string()
     .matches(phoneRegExp, 'Incorrect phone, example(111-111-1111)')
     .required('Required'),
 });

export const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const isLoading = useSelector(selectIsLoading);
    return (
        <Formik
            initialValues={{ name: "", phone: "" }}
            validationSchema={SignupSchema}
            
            onSubmit={(value, action) => {
                if (contacts.some(el => el.name === value.name)) {
                    return alert(`${value.name} is already in contacts.`);
                    }
                dispatch(addContact(value));
                action.resetForm();
            }}
        >
            <FormWrapper>
                <InputWrapper>
                    Name
                    <Field name="name" type="text" />
                    <ErrorMsg component="span" name="name" />
                </InputWrapper>
                <InputWrapper>
                    Number
                    <Field name="phone" type="tel"placeholder="000-000-0000"/>
                    <ErrorMsg component="span" name="phone" />
                </InputWrapper>
                <Button type="submit" disabled={isLoading}>Add contact</Button>
            </FormWrapper>
        </Formik>
    )
}
