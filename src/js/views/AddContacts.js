import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "/workspaces/alondragerke-fspt53-contactlist-react/src/js/store/appContext.js";
import "../../styles/home.css";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";
import injectContext from "../store/appContext";


const AddContacts = () => {

	const { actions, store } = useContext(Context);
	const navigate = useNavigate();
	const { id } = useParams();

	const existingContact = store.contacts.find(contact => contact.id === id) || {};

	const [contactData, setContactData] = useState({
        full_name: existingContact.full_name || "",
        email: existingContact.email || "",
        address: existingContact.address || "",
        phone: existingContact.phone || "",
	});

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
				// Si hay un ID, significa que estamos actualizando un contacto existente
				await actions.updateContact({ ...contactData, id: existingContact.id });
			} else {
				// Si no hay un ID, estamos creando un nuevo contacto
				await actions.createContact(contactData);
			}
	
			// Redirige al usuario a la página de contactos
			navigate("/contacts");
		} catch (error) {
			console.error("Error saving contact:", error);
		}
	};

	return (
		<Container className="m-5">
			<h2 className="align-items-center text-center">Add a new contact</h2>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="full_name">
					<Form.Label>Full Name</Form.Label>
					<Form.Control 
						type="text" 
						placeholder="Enter your full name"
						value={contactData.full_name}
						onChange={handleChange}
					/>
				</Form.Group>		
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control 
						type="email" 
						placeholder="Enter your email"
						value={contactData.email}
						onChange={handleChange}  
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control 
						type="address" 
						placeholder="Enter your address"
						value={contactData.address}
						onChange={handleChange} 
					/>
				<Form.Group className="mb-3" controlId="phone">
					<Form.Label>Phone</Form.Label>
					<Form.Control 
						type="phone" 
						placeholder="Enter your phone number"
						value={contactData.phone}
						onChange={handleChange}  
					/>
				</Form.Group>
				</Form.Group>
				<div className="my-3 text-center">
					<Button variant="primary" type="submit" className="mx-2">
						Save
					</Button>
					<Button variant="primary" type="button" className="mx-2" onClick={() => navigate("/contacts")}>
						Back to contacts
					</Button>
				</div>
			</Form>
		</Container>
	);
}

export default injectContext(AddContacts);
