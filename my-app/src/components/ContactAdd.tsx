import React, { FunctionComponent, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {ContactForm} from './ContactForm'
import { ContactContext } from "./ContactContext";

export const ContactAdd:FunctionComponent=() =>{
    const {addContact} = useContext(ContactContext);
    const navigate = useNavigate();
    const onSubmit = (values:any) =>{
        const id = addContact(values.name, values.description);
        navigate(`/contacts/${id}`);
    };
    return <ContactForm onSubmit={onSubmit}/>;
}