import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Receipt, 
  Users, 
  DollarSign,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,567",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Active Quotations",
      value: "8",
      change: "+3",
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "Pending Invoices",
      value: "12",
      change: "-2",
      icon: Receipt,
      color: "text-warning"
    },
    {
      title: "Total Customers",
      value: "47",
      change: "+5",
      icon: Users,
      color: "text-muted-foreground"
    }
  ];

  const recentQuotations = [
    { id: "QUO-001", customer: "Acme Corp", amount: "$2,450", status: "sent", date: "2024-01-15" },
    { id: "QUO-002", customer: "TechStart Inc", amount: "$1,200", status: "draft", date: "2024-01-14" },
    { id: "QUO-003", customer: "Global Solutions", amount: "$5,670", status: "accepted", date: "2024-01-13" },
  ];

  const recentInvoices = [
    { id: "INV-001", customer: "Acme Corp", amount: "$2,450", status: "paid", date: "2024-01-15" },
    { id: "INV-002", customer: "Digital Agency", amount: "$3,200", status: "pending", date: "2024-01-14" },
    { id: "INV-003", customer: "StartupXYZ", amount: "$890", status: "overdue", date: "2024-01-10" },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      draft: { variant: "secondary", label: "Draft" },
      sent: { variant: "outline", label: "Sent" },
      accepted: { variant: "default", label: "Accepted" },
      paid: { variant: "default", label: "Paid", className: "bg-success text-success-foreground" },
      pending: { variant: "secondary", label: "Pending" },
      overdue: { variant: "destructive", label: "Overdue" }
    };
    
    const config = variants[status] || variants.draft;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quotations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Recent Quotations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuotations.map((quotation) => (
                <div key={quotation.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium">{quotation.id}</p>
                    <p className="text-sm text-muted-foreground">{quotation.customer}</p>
                    <p className="text-xs text-muted-foreground">{quotation.date}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-semibold">{quotation.amount}</p>
                    {getStatusBadge(quotation.status)}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                View All Quotations
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="mr-2 h-5 w-5" />
              Recent Invoices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.customer}</p>
                    <p className="text-xs text-muted-foreground">{invoice.date}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-semibold">{invoice.amount}</p>
                    {getStatusBadge(invoice.status)}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                View All Invoices
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>Create Quotation</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Receipt className="h-6 w-6" />
              <span>Create Invoice</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>Add Customer</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;