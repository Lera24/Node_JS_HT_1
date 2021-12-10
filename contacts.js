const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');
const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async() => {
  try {
    const data = await fs.readFile(contactsPath);
    const allContacts = JSON.parse(data);
    return allContacts;
  } catch (error) {
    console.error(error.message);
  }
  }
  
 const getContactById = async(contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if(!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.error(error.message);
  }
}
  
const addContact = async(data) => {
  try {
    const newContact = {id: shortid.generate(), ...data};
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
  }

  const removeContact = async(contactId) => {
    try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1) {
      return null;
    }
    const removeContact = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removeContact;
  } catch (error) {
    console.error(error.message);
  }
    }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }