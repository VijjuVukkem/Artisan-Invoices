import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Users, 
  Trash2,
  Mail,
  Phone,
  FileText,
  Receipt,
  Building
} from "lucide-react";

interface CustomerListProps {
  onCreateNew: () => void;
  onViewCustomer: (id: string) => void;
}

const CustomerList = ({ onCreateNew, onViewCustomer }: CustomerListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      id: "CUST-001",
      name: "Acme Corporation",
      email: "contact@acme.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, New York, NY 10001",
      type: "Business",
      totalQuotations: 3,
      totalInvoices: 2,
      totalAmount: 8950.00,
      lastActivity: "2024-01-15"
    },
    {
      id: "CUST-002",
      name: "TechStart Inc",
      email: "hello@techstart.com",
      phone: "+1 (555) 234-5678",
      address: "456 Startup Ave, San Francisco, CA 94102",
      type: "Business",
      totalQuotations: 2,
      totalInvoices: 1,
      totalAmount: 2400.00,
      lastActivity: "2024-01-16"
    },
    {
      id: "CUST-003",
      name: "Global Solutions Ltd",
      email: "info@globalsolutions.com",
      phone: "+1 (555) 345-6789",
      address: "789 Enterprise Blvd, Austin, TX 73301",
      type: "Enterprise",
      totalQuotations: 1,
      totalInvoices: 1,
      totalAmount: 11340.00,
      lastActivity: "2024-01-13"
    },
    {
      id: "CUST-004",
      name: "Digital Agency Pro",
      email: "team@digitalagency.com",
      phone: "+1 (555) 456-7890",
      address: "321 Creative Way, Los Angeles, CA 90210",
      type: "Business",
      totalQuotations: 0,
      totalInvoices: 1,
      totalAmount: 3200.00,
      lastActivity: "2024-01-14"
    },
    {
      id: "CUST-005",
      name: "StartupXYZ",
      email: "founders@startupxyz.com",
      phone: "+1 (555) 567-8901",
      address: "654 Innovation Dr, Seattle, WA 98101",
      type: "Startup",
      totalQuotations: 1,
      totalInvoices: 1,
      totalAmount: 1780.00,
      lastActivity: "2024-01-12"
    }
  ];

  const getTypeBadge = (type: string) => {
    const variants: Record<string, any> = {
      Business: { variant: "default", label: "Business" },
      Enterprise: { variant: "default", label: "Enterprise", className: "bg-primary text-primary-foreground" },
      Startup: { variant: "secondary", label: "Startup" },
      Individual: { variant: "outline", label: "Individual" }
    };
    
    const config = variants[type] || variants.Business;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onCreateNew}>
          <Users className="mr-2 h-4 w-4" />
          New Customer
        </Button>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quotations</TableHead>
                  <TableHead>Invoices</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-1 h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="mr-1 h-3 w-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(customer.type)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                        {customer.totalQuotations}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Receipt className="mr-1 h-4 w-4 text-muted-foreground" />
                        {customer.totalInvoices}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${customer.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>{customer.lastActivity}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => onViewCustomer(customer.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Create Quotation
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Receipt className="mr-2 h-4 w-4" />
                            Create Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{filteredCustomers.length}</div>
            <p className="text-xs text-muted-foreground">Total Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">
              {filteredCustomers.filter(c => c.type === "Enterprise").length}
            </div>
            <p className="text-xs text-muted-foreground">Enterprise Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              ${filteredCustomers
                .reduce((sum, c) => sum + c.totalAmount, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-muted-foreground">
              {(filteredCustomers.reduce((sum, c) => sum + c.totalAmount, 0) / filteredCustomers.length).toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">Avg. Customer Value</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerList;