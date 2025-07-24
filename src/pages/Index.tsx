import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import QuotationList from "@/components/QuotationList";
import InvoiceList from "@/components/InvoiceList";
import CustomerList from "@/components/CustomerList";
import { useSupabaseData } from "@/hooks/useSupabaseData";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { toast } = useToast();
  const {
    customers,
    quotations,
    invoices,
    addCustomer,
    addQuotation,
    addInvoice,
    convertQuotationToInvoice,
    updateQuotationStatus,
    deleteCustomer,
    deleteQuotation,
    deleteInvoice
  } = useSupabaseData();

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleCreateQuotation = async () => {
    if (customers.length === 0) {
      toast({
        title: "No customers available",
        description: "Please add a customer first before creating a quotation.",
        variant: "destructive"
      });
      return;
    }

    const newQuotation = await addQuotation({
      customer_id: customers[0].id,
      amount: 1000,
      status: "save",
      date: new Date().toISOString().split('T')[0],
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: "Sample item", quantity: 1, rate: 1000, amount: 1000 }]
    });

    if (newQuotation) {
      toast({
        title: "Quotation created",
        description: `Quotation ${newQuotation.quotation_number} has been created.`
      });
    }
  };

  const handleCreateInvoice = async () => {
    if (customers.length === 0) {
      toast({
        title: "No customers available",
        description: "Please add a customer first before creating an invoice.",
        variant: "destructive"
      });
      return;
    }

    const newInvoice = await addInvoice({
      customer_id: customers[0].id,
      amount: 1200,
      status: "draft",
      date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: "Sample service", quantity: 1, rate: 1200, amount: 1200 }]
    });

    if (newInvoice) {
      toast({
        title: "Invoice created",
        description: `Invoice ${newInvoice.invoice_number} has been created.`
      });
    }
  };

  const handleCreateCustomer = async () => {
    const customerName = `Customer ${customers.length + 1}`;
    const newCustomer = await addCustomer({
      name: customerName,
      email: `${customerName.toLowerCase().replace(' ', '')}@example.com`,
      company: `${customerName} Corp`
    });

    if (newCustomer) {
      toast({
        title: "Customer added",
        description: `${newCustomer.name} has been added to your customer list.`
      });
    }
  };

  const handleViewItem = (id: string) => {
    toast({
      title: "View Details",
      description: `Viewing details for item ${id}. Feature coming soon!`
    });
  };

  const handleQuotationToInvoice = async (quotationId: string) => {
    const newInvoice = await convertQuotationToInvoice(quotationId);
    if (newInvoice) {
      toast({
        title: "Invoice created",
        description: `Invoice ${newInvoice.invoice_number} has been created from quotation.`
      });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard quotations={quotations} invoices={invoices} customers={customers} />;
      case "quotations":
        return (
          <QuotationList 
            quotations={quotations}
            onCreateNew={handleCreateQuotation}
            onViewQuotation={handleViewItem}
            onQuotationToInvoice={handleQuotationToInvoice}
            onUpdateStatus={updateQuotationStatus}
            onDelete={deleteQuotation}
          />
        );
      case "invoices":
        return (
          <InvoiceList 
            invoices={invoices}
            onCreateNew={handleCreateInvoice}
            onViewInvoice={handleViewItem}
            onDelete={deleteInvoice}
          />
        );
      case "customers":
        return (
          <CustomerList 
            customers={customers}
            onCreateNew={handleCreateCustomer}
            onViewCustomer={handleViewItem}
            onDelete={deleteCustomer}
          />
        );
      case "settings":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <p className="text-muted-foreground">Settings page coming soon...</p>
          </div>
        );
      default:
        return <Dashboard quotations={quotations} invoices={invoices} customers={customers} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      {renderPage()}
    </Layout>
  );
};

export default Index;