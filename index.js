import { program } from "commander";
import {
  addContact,
  removeContact,
  getContactById,
  listContacts,
} from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      const getContact = await getContactById(id);
      console.log(getContact);
      break;

    case "add":
      const newContact = await addContact(data);
      console.log(newContact);
      break;

    case "remove":
      const removeCont = await removeContact(id);
      console.log(removeCont);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
