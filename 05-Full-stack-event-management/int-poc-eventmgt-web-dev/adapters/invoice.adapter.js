export function mapInvoiceDetails(apiResponse) {
  const { invoice, items } = apiResponse;

  return {
    invoice_id: invoice.invoice_id,
    invoice_no: invoice.invoice_no,
    status: invoice.status,

    invoice_date: invoice.issued_date,
    due_date: invoice.due_date,

    sub_total: invoice.sub_total,
    tax_amount: invoice.tax_amount,
    fee_amount: invoice.fee_amount,
    total_amount: invoice.total_amount,

    note: invoice.notes,
    is_locked: invoice.status === "paid",

    bill_from: {
      name: invoice.bill_from_name,
      address: invoice.bill_from_address,
      email: invoice.bill_from_email,
      phone: invoice.bill_from_phone,
    },

    bill_to: {
      name: invoice.bill_to_name,
      address: invoice.bill_to_address,
      email: invoice.bill_to_email,
      phone: null,
    },

    items: items.map((i) => ({
      ticket_name: i.ticket_category,
      price: i.price,
      quantity: i.qty,
      line_total: i.amount,
    })),
  };
}
