import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url"; // in Browser, the URL in native accessible on window

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const contacts = (await fs.readFile(contactsPath)).toString();
  return JSON.parse(contacts);
}

// export function listContacts() {
//   const contacts = fs.readFile(contactsPath).toString();
//   return JSON.parse(contacts);
// }

export async function getContactById(contactId) {
  const contacts = await listContacts();
  return (
    contacts.find((contact) => contact.id === contactId) || "no such contact"
  );
}

export async function removeContact(contactId) {
  const contacts = await listContacts();

  const check = contacts.find((contact) => contact.id === contactId);

  if (!check) {
    console.log("no such contact");
    return;
  }

  const updContacts = contacts.filter((contact) => contact.id !== contactId);
  // contacts.sort((a, b) => a.id - b.id);

  fs.writeFile(contactsPath, JSON.stringify(updContacts));
}

export async function addContact(name, email, phone) {
  const contact = { name, email, phone };
  const contacts = await listContacts();

  for (let i = 0; i < contacts.length + 1; i++) {
    if (contacts[i]?.id !== i + 1) {
      contacts.push({ id: i + 1, ...contact });
      break;
    }
  }
  contacts.sort((a, b) => a.id - b.id);

  // contact.push(contact);

  fs.writeFile(contactsPath, JSON.stringify(contacts));
}
