import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

import { Command } from "commander/esm.mjs";
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      listContacts().then((r) => console.table(r));
      break;

    case "get":
      // ... id
      getContactById(Number(id)).then((r) => console.log(r));
      break;

    case "add":
      // ... name email phone

      switch (undefined) {
        case name:
          console.warn("Name required");
          return;
        case email:
          console.warn("Email required");
          return;
        case phone:
          console.warn("Phone required");
          return;
      }

      addContact(name, email, phone);
      break;

    case "remove":
      // ... id
      removeContact(Number(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
