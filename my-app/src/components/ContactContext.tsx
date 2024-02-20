import React, {useState, createContext, FunctionComponent, PropsWithChildren } from "react";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore"; 
import {db} from "../utils/firebase"


interface IContact{
    name: string;
    description: string; 
    id:number;
}
interface IContactContext{
    contacts: IContact[];
    deletContact: (id: number) => void;
    editContact: (id: number ,name: string, description:string) => void;
    addContact: (name:string, description: string) => Promise<string>;
    getContactById: (id:string) => Promise<IContact | undefined>;
}

const initialContacts:IContact[] = [
    {name: 'John', description:'Guitarisrt', id:1},
    {name: 'Sally', description:'singer', id:2},
]
export const ContactContext = createContext<IContactContext>({
    deletContact:() =>{},
    editContact: () => { },
    addContact: () => new Promise(resolve => resolve('')),
    contacts: initialContacts,
    getContactById: () => new Promise(resolve => resolve(undefined)),
});

export const ContactProvider:FunctionComponent<PropsWithChildren> = ({children}) =>
{
    const [contacts, setContacts] = useState<IContact[]>(initialContacts);
    
    //get one user by id
    const getContactById = async(id: string) => {
        const docRef = doc(db, "contacts", id);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) return;
        return docSnapshot.data() as IContact;      
        //return contacts.find((contact) => contact.id === id);
    };

    const addContact = async (name:string, description: string):Promise<string> =>{
        // const id = contacts.length+1;
        // setContacts([...contacts,{name, description, id}])
        // return id;
        const contactRef = await addDoc(collection(db, "contacts"), {
            name,
            description,
            createdAt:serverTimestamp(),
            updatedAt:serverTimestamp(),
          });
        return contactRef.id;
    }; //api
    
    const editContact = (id:number, name:string,description:string):void =>{
        setContacts([
            ...contacts.filter(contact => contact.id !== id),
            {id,name,description},
        ]);
    }; //give me a  new list without the id I pass down 

    const deletContact= (id:number) => {
        setContacts([
            ...contacts.filter(contact => contact.id !== id),
        ])

    };

    return <ContactContext.Provider value = {{contacts, getContactById, addContact, editContact,deletContact}}>{children}</ContactContext.Provider>
};



