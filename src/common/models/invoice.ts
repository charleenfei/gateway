import { InvoiceInvoiceData } from '../../../clients/centrifuge-node';

export interface Invoice extends InvoiceInvoiceData {
  _id?: string;
  collaborators?: string[];
}


export const invoiceHasCreditNote = (invoice) => {
  return Object.keys(invoice).filter(prop => prop.match(/^credit_/g)).length > 0;
}

export const invoiceHasShipTo = (invoice) => {
  return Object.keys(invoice).filter(prop => prop.match(/^ship_to_/g)).length > 0;
}

export const invoiceHasRemitTo = (invoice) => {
  return Object.keys(invoice).filter(prop => prop.match(/^remit_to_/g)).length > 0;
}
