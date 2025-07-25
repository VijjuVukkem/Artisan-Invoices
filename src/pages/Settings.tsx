import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Settings as SettingsIcon, Building, Mail, Phone, MapPin } from "lucide-react";

const Settings = () => {
  const [companySettings, setCompanySettings] = useState({
    name: "Your Company Name",
    email: "info@yourcompany.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, City, State 12345",
    website: "www.yourcompany.com",
    taxNumber: "123-456-789",
    logo: ""
  });

  const [invoiceSettings, setInvoiceSettings] = useState({
    prefix: "INV",
    quotationPrefix: "QUO",
    defaultTerms: "Payment is due within 30 days of invoice date.",
    defaultNotes: "Thank you for your business!",
    currency: "USD"
  });

  const { toast } = useToast();

  const handleCompanyChange = (field: string, value: string) => {
    setCompanySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleInvoiceChange = (field: string, value: string) => {
    setInvoiceSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveCompany = async () => {
    // In a real app, this would save to database
    localStorage.setItem('companySettings', JSON.stringify(companySettings));
    toast({
      title: "Company Settings Saved",
      description: "Your company information has been updated."
    });
  };

  const handleSaveInvoice = async () => {
    // In a real app, this would save to database
    localStorage.setItem('invoiceSettings', JSON.stringify(invoiceSettings));
    toast({
      title: "Invoice Settings Saved",
      description: "Your invoice settings have been updated."
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanySettings(prev => ({ ...prev, logo: e.target?.result as string }));
        toast({
          title: "Logo Uploaded",
          description: "Your company logo has been uploaded."
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Favicon Uploaded",
        description: "Your favicon has been uploaded and will be applied."
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companySettings.name}
                onChange={(e) => handleCompanyChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="companyEmail">Email</Label>
              <Input
                id="companyEmail"
                type="email"
                value={companySettings.email}
                onChange={(e) => handleCompanyChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="companyPhone">Phone</Label>
              <Input
                id="companyPhone"
                value={companySettings.phone}
                onChange={(e) => handleCompanyChange("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="companyWebsite">Website</Label>
              <Input
                id="companyWebsite"
                value={companySettings.website}
                onChange={(e) => handleCompanyChange("website", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="taxNumber">Tax Number</Label>
              <Input
                id="taxNumber"
                value={companySettings.taxNumber}
                onChange={(e) => handleCompanyChange("taxNumber", e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="companyAddress">Address</Label>
            <Textarea
              id="companyAddress"
              value={companySettings.address}
              onChange={(e) => handleCompanyChange("address", e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="logo">Company Logo</Label>
            <div className="flex items-center space-x-4">
              {companySettings.logo && (
                <img src={companySettings.logo} alt="Company Logo" className="h-16 w-16 object-contain border rounded" />
              )}
              <Button
                variant="outline"
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="favicon">Favicon</Label>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => document.getElementById('favicon-upload')?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Favicon
              </Button>
              <input
                id="favicon-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFaviconUpload}
              />
              <span className="text-sm text-muted-foreground">Upload PNG/JPG file (ICO not supported)</span>
            </div>
          </div>

          <Button onClick={handleSaveCompany}>Save Company Information</Button>
        </CardContent>
      </Card>

      {/* Invoice Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice & Quotation Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
              <Input
                id="invoicePrefix"
                value={invoiceSettings.prefix}
                onChange={(e) => handleInvoiceChange("prefix", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="quotationPrefix">Quotation Prefix</Label>
              <Input
                id="quotationPrefix"
                value={invoiceSettings.quotationPrefix}
                onChange={(e) => handleInvoiceChange("quotationPrefix", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={invoiceSettings.currency}
                onChange={(e) => handleInvoiceChange("currency", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="defaultTerms">Default Payment Terms</Label>
            <Textarea
              id="defaultTerms"
              value={invoiceSettings.defaultTerms}
              onChange={(e) => handleInvoiceChange("defaultTerms", e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="defaultNotes">Default Notes</Label>
            <Textarea
              id="defaultNotes"
              value={invoiceSettings.defaultNotes}
              onChange={(e) => handleInvoiceChange("defaultNotes", e.target.value)}
              rows={2}
            />
          </div>

          <Button onClick={handleSaveInvoice}>Save Invoice Settings</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications when invoices are paid</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Payment Reminders</Label>
              <p className="text-sm text-muted-foreground">Automatically send payment reminders</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;