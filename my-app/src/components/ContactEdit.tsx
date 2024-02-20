import React, { FunctionComponent, useContext, useEffect, useState } from "react";

import {ContactForm} from './ContactForm'
import { useParams,useNavigate } from "react-router-dom";
import { ContactContext } from "./ContactContext";

export const ContactEdit: FunctionComponent=() =>{
    const[contact, setContact] = useState<any>();
    const { getContactById,editContact} = useContext(ContactContext);
    const {id} = useParams();
    const navigate = useNavigate();
    const onSubmit = (values:any) =>{
        editContact(parseInt(id!), values.name, values.description);
        navigate(`/contacts/${id}`)

    };
    const handleFetch = async () =>{
        const newContact = await getContactById(id!);
        setContact(newContact);
    };

    useEffect(()=>{
        handleFetch();

    });
    return <ContactForm defaultValues=  {contact} onSubmit={onSubmit}/>;
}