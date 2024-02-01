import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import Modal from 'react-bootstrap/Modal';
import { FaTrash } from "react-icons/fa";
import { BsPersonCircle, BsGeoAltFill, BsFillTelephoneFill, BsFillEnvelopeAtFill, BsFillPencilFill  } from "react-icons/bs";


const Contacts = () => {
    const navigate = useNavigate();
    const context = useContext(Context);
    const { store, actions } = context;

    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setConfirmDeleteId(id);
    };

    const handleConfirmDelete = () => {
        actions.confirmDeleteContact(confirmDeleteId);
        setConfirmDeleteId(null);
    };

    const handleCancelDelete = () => {
        setConfirmDeleteId(null);
    };

    useEffect(() => {
        actions.getAllContacts();
    }, [actions]);

    return (
        <div className="text-center mt-5">
            <div className="contacts-title">
                <h1>My contacts</h1>
                <button onClick={() => navigate("/add-contacts")} className="navbar-btn btn addcontact">Add contact</button>{' '}
            </div>
            <div>
                <ul className="font-size" >
                    {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                        store.contacts.map((contact) => {
                            return (
                                <li key={contact.id} className="contact-item">
                                    <div className="contact-info">
                                        <div className="contact-photo">
                                            <BsPersonCircle className="photo-icon" />
                                        </div>
                                        <div className="contact-details">
                                            <h3>{contact.full_name}</h3>
                                            <p><BsGeoAltFill />{contact.address}</p>
                                            <p><BsFillTelephoneFill />{contact.phone}</p>
                                            <p><BsFillEnvelopeAtFill />{contact.email}</p>
                                        </div>
                                    </div>
                                    <div className="contact-actions">
                                        <Link to={`/edit-contact/${contact.id}`} className="navbar-btn btn link">
                                            <BsFillPencilFill />
                                        </Link>
                                        <button onClick={() => handleDeleteClick(contact.id)} className="navbar-btn btn">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <li className="no-contacts">No contacts available</li>
                    )}
                </ul>
            </div>

            <Modal show={confirmDeleteId !== null} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    Are you sure you want to delete this contact?
                </Modal.Body>
                <Modal.Footer>
                    <button className="navbar-btn btn" onClick={handleCancelDelete}>
                        Cancel
                    </button>
                    <button className="navbar-btn btn delete" onClick={handleConfirmDelete}>
                        Confirm Delete
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Contacts;
