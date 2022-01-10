import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("db/contacts.json");

export async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  return (
    contacts.find((contact) => Number(contact.id) === contactId) ||
    "no such contact"
  );
}

export async function removeContact(contactId) {
  const contacts = await listContacts();

  const check = contacts.find((contact) => Number(contact.id) === contactId);

  if (!check) {
    console.log("no such contact");
    return;
  }

  const updContacts = contacts.filter(
    (contact) => Number(contact.id) !== contactId
  );

  fs.writeFile(contactsPath, JSON.stringify(updContacts));
}

export async function addContact(name, email, phone) {
  const contact = { name, email, phone };
  const contacts = await listContacts();

  for (let i = 0; i < contacts.length + 1; i++) {
    if (+contacts[i]?.id !== i + 1) {
      contacts.push({ id: `${i + 1}`, ...contact });
      break;
    }
  }
  contacts.sort((a, b) => a.id - b.id);

  fs.writeFile(contactsPath, JSON.stringify(contacts));
}
