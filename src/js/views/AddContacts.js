import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "/workspaces/alondragerke-fspt53-contactlist-react/src/js/store/appContext.js";
import "../../styles/home.css";

import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';

const AddContacts = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [contactData, setContactData] = useState({
        full_name: "",
        email: "",
        address: "",
        id: "",
        phone: "",
    });

    const loadContactData = (id) => {
        const existingContact = store.contacts.find(contact => contact.id === id) || {};
        setContactData({
            full_name: existingContact.full_name || "",
            email: existingContact.email || "",
            address: existingContact.address || "",
            id: existingContact.id || "",
            phone: existingContact.phone || "",
        });
    };

    useEffect(() => {
        if (id) {
            loadContactData(id);
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContactData({
            ...contactData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                console.log("Updating Contact:", { ...contactData, id });
                await actions.updateContact(id, contactData);

                actions.getAllContacts();
            } else {
                console.log("Creating Contact:", contactData);
                await actions.createContact(contactData);

                actions.getAllContacts();
            }

            navigate("/contacts");
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    return (
        <Container className="m-5 mx-auto" style={{ minHeight: '100vh' }}>
            <h2 className="align-items-center text-center">{id ? 'Edit' : 'Add'} a new contact</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 mt-4" controlId="full_name">
                    <InputGroup>
                        <InputGroup.Text className="input-text">Full name</InputGroup.Text>
                        <Form.Control 
                            type="text" 
                            placeholder="Grace Kensington"
                            value={contactData.full_name || ''}
                            onChange={handleChange}
                            className="form"  
                        />
                    </InputGroup>
                </Form.Group>	

                <Form.Group className="mb-3" controlId="email">
                    <InputGroup>
                        <InputGroup.Text className="input-text">Email</InputGroup.Text>
                        <Form.Control 
                            type="email" 
                            placeholder="grace.k@example.com"
                            value={contactData.email || ''}
                            onChange={handleChange}
                            className="form"  
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                    <InputGroup>
                        <InputGroup.Text className="input-text">Address</InputGroup.Text>
                        <Form.Control 
                            type="address" 
                            placeholder="123 Peaceful Street, Cityville, United Kingdom"
                            value={contactData.address || ''}
                            onChange={handleChange} 
                            className="form"  
                        />
                    </InputGroup>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="phone">
                    <InputGroup>
                        <InputGroup.Text className="input-text">Phone number</InputGroup.Text>
                        <Form.Control 
                            type="phone" 
                            placeholder="+44 20 1234 5678"
                            value={contactData.phone || ''}
                            onChange={handleChange}  
                            className="form"  
                        />
                    </InputGroup>
                </Form.Group>

                <div className="my-3 text-center">
                    <button type="button" className="mx-2 navbar-btn btn" onClick={() => navigate("/contacts")}>
                        Back to contacts
                    </button>
                    <button type="submit" className="mx-2 navbar-btn btn">
                        Save
                    </button>
                </div>
            </Form>
        </Container>
    );
}

export default AddContacts;

