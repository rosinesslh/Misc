import React, { FunctionComponent, useContext } from "react";
import {useForm} from "react-hook-form";
import {Button,FormControl, FormErrorMessage, FormLabel, Input, VStack} from "@chakra-ui/react";
import { ContactContext } from "./ContactContext";
import { useNavigate } from "react-router-dom";

interface IContactForm{
    onSubmit: (values: any) => void;
    defaultValues?:{
        name: string;
        description: string;
    };
}

export const ContactForm:FunctionComponent<IContactForm> = ({defaultValues, onSubmit}) => {
    const{
        handleSubmit,
        register,
        formState:{errors},
    } = useForm({
        defaultValues,
        // defaultValues:{
        //     name: '',
        //     description: '',
        // }
    });

    // const {addContact} = useContext(ContactContext);

    // const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={2}>
            <FormControl isRequired>
                <FormLabel>Full name</FormLabel>
                <Input 
                placeholder='Full name' 
                {...register('name',{
                    required: "This is required",
                    //minLength:{value:4, message:'Minum length should be 4'}
                })}
                />
                <FormErrorMessage>
                    {errors?.name?.message?.toString()}
                </FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input 
                placeholder='Description' 
                {...register('description',{
                    required: "This is required",
                    //minLength:{value:4, message:'Minum length should be 4'}
                })}
                />
                <FormErrorMessage>
                    {errors?.description?.message?.toString()}
                </FormErrorMessage>
            </FormControl>
            <Button colorScheme="blue" size ="lg" width="100%" type="submit">Submit</Button>
            </VStack>
        </form>
    );
};