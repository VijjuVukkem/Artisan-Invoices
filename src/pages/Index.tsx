import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import QuotationList from "@/components/QuotationList";
import InvoiceList from "@/components/InvoiceList";
import CustomerList from "@/components/CustomerList";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleCreateNew = () => {
    console.log("Create new functionality to be implemented");
  };

  const handleViewItem = (id: string) => {
    console.log(`View item ${id} - functionality to be implemented`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "quotations":
        return (
          <QuotationList 
            onCreateNew={handleCreateNew}
            onViewQuotation={handleViewItem}
          />
        );
      case "invoices":
        return (
          <InvoiceList 
            onCreateNew={handleCreateNew}
            onViewInvoice={handleViewItem}
          />
        );
      case "customers":
        return (
          <CustomerList 
            onCreateNew={handleCreateNew}
            onViewCustomer={handleViewItem}
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
        return <Dashboard />;
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