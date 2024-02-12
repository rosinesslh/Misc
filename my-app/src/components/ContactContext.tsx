import React, {useState, createContext, FunctionComponent, PropsWithChildren } from "react";


interface IContact{
    name: string;
    description: string; 
    id:number;
}
interface IContactContext{
    contacts: IContact[];
    deletContact: (id: number) => void;
    editContact: (id: number ,name: string, description:string) => void;
    addContact: (name:string, description: string) => number;
    getContactById: (id:number) => IContact | undefined;
}

const initialContacts:IContact[] = [
    {name: 'John', description:'Guitarisrt', id:1},
    {name: 'Sally', description:'singer', id:2},
]
export const ContactContext = createContext<IContactContext>({
    deletContact:() =>{},
    editContact: () => { },
    addContact: () => -1,
    contacts: initialContacts,
    getContactById: () => undefined,
});

export const ContactProvider:FunctionComponent<PropsWithChildren> = ({children}) =>
{
    const [contacts, setContacts] = useState<IContact[]>(initialContacts);
    
    //get one user by id
    const getContactById = (id: number) => {
        return contacts.find((contact) => contact.id === id);
    };

    const addContact = (name:string, description: string):number =>{
        const id = contacts.length+1;
        setContacts([...contacts,{name, description, id}])
        return id;
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

