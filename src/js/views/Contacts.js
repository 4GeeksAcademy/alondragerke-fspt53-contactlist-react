import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import injectContext from "../store/appContext";

const Contacts = () => {
    const navigate = useNavigate();
    const context = useContext(Context);
    console.log("Contexto en Contacts:", context);
    const { store, actions } = context;
    const { confirmDeleteContact, cancelDeleteContact, deleteContact, getAllContacts  } = actions;

    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        // Set the ID for confirmation and show the modal
        setConfirmDeleteId(id);
    };

    const handleConfirmDelete = () => {
         // Realizar la eliminación después de la confirmación
        deleteContact(confirmDeleteId);
        // Llamar a confirmDeleteContact para realizar acciones adicionales si es necesario
        confirmDeleteContact();
        // Clear the confirmation ID and close the modal
        setConfirmDeleteId(null);
        cancelDeleteContact();
    };

    const handleCancelDelete = () => {
        // Clear the confirmation ID and close the modal on cancellation
        setConfirmDeleteId(null);
        cancelDeleteContact();
    };

    useEffect(() => {
        console.log("Efecto de obtener contactos ejecutado");

        const fetchData = async () => {
            try {
                await getAllContacts();

                // Imprime el estado solo si ha habido cambios
                console.log("Estado actualizado 1:", store.contacts);
            } catch (error) {
                console.error("Error al obtener contactos:", error);
            }
        };

        if (store.contacts.length === 0) {
            fetchData();
        }
    }, [store.contacts, getAllContacts]);

    useEffect(() => {
        // Imprime el estado solo si ha habido cambios
        console.log("Estado actualizado 2:", store.contacts);
    }, [store.contacts]);

    return (
        <div className="text-center mt-5">
            <h1>Contacts</h1>
            <div>
                <Button onClick={() => navigate("/add-contacts")} variant="primary">Add contact</Button>{' '}
            </div>
            <div>
                Contact list:
                <ul>
                    {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                        store.contacts.map((contact) => {
                            console.log("Iterando sobre el contacto:", contact);
                            return (
                                <li key={contact.id}>
                                    {contact.full_name} {contact.phone}
                                    <Button onClick={() => handleDeleteClick(contact.id)} variant="danger">
                                        Delete
                                    </Button>
                                </li>
                            );
                        })
                    ) : (
                        <li>{store.contacts.length === 0 ? "Contacts are loading..." : "No contacts available"}</li>
                    )}
                </ul>
            </div>

            {/* Confirmation Modal */}
            <Modal show={confirmDeleteId !== null} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this contact?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default injectContext(Contacts);