import React, { FunctionComponent, useContext } from "react";

import {ContactForm} from './ContactForm'
import { useParams,useNavigate } from "react-router-dom";
import { ContactContext } from "./ContactContext";

export const ContactEdit: FunctionComponent=() =>{
    const { getContactById,editContact} = useContext(ContactContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const onSubmit = (values:any) =>{
        editContact(parseInt(id!), values.name, values.description);
        navigate(`/contacts/${id}`)

    };
    return <ContactForm defaultValues={getContactById(parseInt(id!))} onSubmit={onSubmit}/>;
}