import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Receipt, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  Menu,
  X
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout = ({ children, currentPage, onPageChange }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", icon: BarChart3, key: "dashboard" },
    { name: "Quotations", icon: FileText, key: "quotations" },
    { name: "Invoices", icon: Receipt, key: "invoices" },
    { name: "Customers", icon: Users, key: "customers" },
    { name: "Settings", icon: Settings, key: "settings" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-bold text-primary">InvoiceFlow</h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <Button
              key={item.key}
              variant={currentPage === item.key ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                onPageChange(item.key);
                setSidebarOpen(false);
              }}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-card border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-semibold text-foreground capitalize">
                {currentPage}
              </h2>
            </div>
            
            <div className="flex items-center space-x-2">
              {(currentPage === "quotations" || currentPage === "invoices") && (
                <Button onClick={() => onPageChange(`new-${currentPage.slice(0, -1)}`)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New {currentPage.slice(0, -1)}
                </Button>
              )}
              {currentPage === "customers" && (
                <Button onClick={() => onPageChange("new-customer")}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Customer
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;