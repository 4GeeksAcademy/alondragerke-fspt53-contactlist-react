const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
            contactToDelete: null
		},
        actions: {
            getAllContacts: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/alondragerke");
                    const contactData = await response.json();
            
                    console.log("Contactos obtenidos:", contactData);
            
                    setStore(prevStore => ({
                        ...prevStore,
                        contacts: [...prevStore.contacts, ...contactData],  // Concatenar nuevos contactos al estado existente
                    }));
            
                    console.log("Contacto añadido al estado:", contactData);
            
                    return contactData;
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                    throw error;
                }
            },
            createContact: async (newContact) => {
                try {
                    // Validar los datos antes de enviar la solicitud
                    if (!newContact.full_name || !newContact.email || !newContact.address || !newContact.phone) {
                        console.error("Por favor, complete todos los campos antes de crear el contacto.");
                        return;
                    }

                    const response = await fetch("https://playground.4geeks.com/apis/fake/contact", {
                        method: 'POST',
                        body: JSON.stringify({
                            "full_name": newContact.full_name,
                            "email": newContact.email,
                            "agenda_slug": "alondragerke",
                            "address": newContact.address,
                            "phone": newContact.phone,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
        
                    if (!response.ok) {
                        console.error(`Error creando el contacto. Estado: ${response.status}`);
                        return;
                    }
        
                    const data = await response.json();

                    // Log para verificar que se está recibiendo el nuevo contacto correctamente
                    console.log("Nuevo contacto creado:", data);
                    
                    setStore(prevStore => ({
                        ...prevStore,
                        contacts: data,
                    }));
                } catch (error) {
                    console.error("Error creando el contacto:", error);
                }
            },
            
            updateContact: async (updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${updatedContact.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(updatedContact),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
        
                    if (!response.ok) {
                        console.error(`Error actualizando el contacto con ID ${updatedContact.id}. Estado: ${response.status}`);
                        return;
                    }
        
                    // Extraer datos de la respuesta
                    const updatedContactData = await response.json();
                    console.log("Datos del contacto actualizado:", updatedContactData);
        
                    // Actualizar el estado
                    setStore((prevStore) => {
                        const updatedContacts = prevStore.contacts.map(contact =>
                            contact.id === updatedContactData.id ? updatedContactData : contact
                        );
                        return {
                            ...prevStore,
                            contacts: updatedContacts,
                        };
                    });
                } catch (error) {
                    console.error("Error actualizando el contacto: ", error);
                }
            },

            deleteContact: async (id) => {
                try {
                    setStore(prevStore => ({
                        ...prevStore,
                        contactToDelete: id
                    }));
                } catch (error) {
                    console.error("Error preparing to delete contact: ", error);
                }
            },
            confirmDeleteContact: async () => {
                try {
                    const id = getStore().contactToDelete;
            
                    // Realizar la eliminación en la API
                    const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
                        method: 'DELETE',
                    });
            
                    if (!response.ok) {
                        console.error(`Error deleting contact. Status: ${response.status}`);
                        return;
                    }
            
                    // Actualizar el estado de manera segura
                    setStore(prevStore => {
                        const newContacts = prevStore.contacts.filter(contact => contact.id !== id);
                        return {
                            ...prevStore,
                            contacts: newContacts,
                            contactToDelete: null,
                        };
                    });
                } catch (error) {
                    console.error("Error deleting contact: ", error);
                }
            },            
            cancelDeleteContact: () => {
                setStore({
                    contactToDelete: null
                });
            },
        }
    };
};

export default getState;

     