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
                        
                    const prevStore = getStore();

                    setStore({
                        ...prevStore,
                        contacts: contactData,
                    });
                        
                    return contactData;
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                    throw error;
                }
            },
            createContact: async (newContact) => {
                try {
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
                    
                    setStore(prevStore => ({
                        ...prevStore,
                        contacts: [...prevStore.contacts, data],
                    }));
                } catch (error) {
                    console.error("Error creando el contacto:", error);
                }
            },
            
            updateContact: async (id, contactData) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "full_name": contactData.full_name,
                            "email": contactData.email,
                            "agenda_slug": "alondragerke",
                            "address": contactData.address,
                            "phone": contactData.phone,
                        }),
                    });
            
                    if (!response.ok) {
                        throw new Error('Error updating contact');
                    }
            
                    setStore(prevStore => ({
                        ...prevStore,
                        contacts: prevStore.contacts.map(contact => (contact.id === id ? { ...contact, ...contactData } : contact)),
                    }));            
                } catch (error) {
                    console.error('Error updating contact:', error);
                }
            },

            deleteContact: async (id) => {
                try {
                    if (id !== undefined && id !== null) {
                        confirmDeleteContact(id);
                    } else {
                        console.error("Error: No contact selected for deletion.");
                    }
                } catch (error) {
                    console.error("Error preparing to delete contact: ", error);
                }
            },
            confirmDeleteContact: async (id) => {
                try {
                    if (id !== null) {
                        const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
                            method: 'DELETE',
                        });
        
                        if (!response.ok) {
                            console.error(`Error deleting contact. Status: ${response.status}`);
                            return;
                        }
        
                        setStore(prevStore => ({
                            ...prevStore,
                            contacts: prevStore.contacts.filter(contact => contact.id !== id),
                            contactToDelete: null,
                        }));
                    } else {
                        console.error("Error: No contact selected for deletion.");
                    }
                } catch (error) {
                    console.error("Error deleting contact: ", error);
                }
            },
        
        }
    };
};

export default getState;

     