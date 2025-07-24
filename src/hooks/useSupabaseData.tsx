import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
  created_at: string;
}

export interface Quotation {
  id: string;
  quotation_number: string;
  customer_id: string;
  amount: number;
  status: string;
  date: string;
  valid_until: string;
  items: any[];
  notes?: string;
  customer?: Customer;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  quotation_id?: string;
  amount: number;
  status: string;
  date: string;
  due_date: string;
  items: any[];
  notes?: string;
  customer?: Customer;
}

export const useSupabaseData = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch customers
      const { data: customersData } = await supabase
        .from("customers")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Fetch quotations with customer data
      const { data: quotationsData } = await supabase
        .from("quotations")
        .select(`
          *,
          customer:customers(*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Fetch invoices with customer data
      const { data: invoicesData } = await supabase
        .from("invoices")
        .select(`
          *,
          customer:customers(*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setCustomers(customersData || []);
      setQuotations((quotationsData || []).map(q => ({
        ...q,
        items: Array.isArray(q.items) ? q.items : []
      })));
      setInvoices((invoicesData || []).map(i => ({
        ...i,
        items: Array.isArray(i.items) ? i.items : []
      })));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const addCustomer = async (customerData: Omit<Customer, "id" | "created_at">) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from("customers")
      .insert([{ ...customerData, user_id: user.id }])
      .select()
      .single();

    if (!error && data) {
      setCustomers(prev => [data, ...prev]);
      return data;
    }
    return null;
  };

  const addQuotation = async (quotationData: Omit<Quotation, "id" | "quotation_number">) => {
    if (!user) return null;

    // Generate quotation number
    const quotationNumber = `QUO-${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabase
      .from("quotations")
      .insert([{ 
        ...quotationData, 
        user_id: user.id,
        quotation_number: quotationNumber 
      }])
      .select(`
        *,
        customer:customers(*)
      `)
      .single();

    if (!error && data) {
      const processedData = {
        ...data,
        items: Array.isArray(data.items) ? data.items : []
      };
      setQuotations(prev => [processedData, ...prev]);
      return processedData;
    }
    return null;
  };

  const addInvoice = async (invoiceData: Omit<Invoice, "id" | "invoice_number">) => {
    if (!user) return null;

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabase
      .from("invoices")
      .insert([{ 
        ...invoiceData, 
        user_id: user.id,
        invoice_number: invoiceNumber 
      }])
      .select(`
        *,
        customer:customers(*)
      `)
      .single();

    if (!error && data) {
      const processedData = {
        ...data,
        items: Array.isArray(data.items) ? data.items : []
      };
      setInvoices(prev => [processedData, ...prev]);
      return processedData;
    }
    return null;
  };

  const convertQuotationToInvoice = async (quotationId: string) => {
    const quotation = quotations.find(q => q.id === quotationId);
    if (!quotation) return null;

    const invoiceData = {
      customer_id: quotation.customer_id,
      quotation_id: quotation.id,
      amount: quotation.amount,
      status: "draft",
      date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      items: quotation.items,
      notes: quotation.notes
    };

    return await addInvoice(invoiceData);
  };

  const updateQuotationStatus = async (quotationId: string, status: string) => {
    const { data, error } = await supabase
      .from("quotations")
      .update({ status })
      .eq("id", quotationId)
      .select(`
        *,
        customer:customers(*)
      `)
      .single();

    if (!error && data) {
      const processedData = {
        ...data,
        items: Array.isArray(data.items) ? data.items : []
      };
      setQuotations(prev => prev.map(q => q.id === quotationId ? processedData : q));
      return processedData;
    }
    return null;
  };

  const deleteCustomer = async (customerId: string) => {
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", customerId);

    if (!error) {
      setCustomers(prev => prev.filter(c => c.id !== customerId));
      return true;
    }
    return false;
  };

  const deleteQuotation = async (quotationId: string) => {
    const { error } = await supabase
      .from("quotations")
      .delete()
      .eq("id", quotationId);

    if (!error) {
      setQuotations(prev => prev.filter(q => q.id !== quotationId));
      return true;
    }
    return false;
  };

  const deleteInvoice = async (invoiceId: string) => {
    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", invoiceId);

    if (!error) {
      setInvoices(prev => prev.filter(i => i.id !== invoiceId));
      return true;
    }
    return false;
  };

  return {
    customers,
    quotations,
    invoices,
    loading,
    addCustomer,
    addQuotation,
    addInvoice,
    convertQuotationToInvoice,
    updateQuotationStatus,
    deleteCustomer,
    deleteQuotation,
    deleteInvoice,
    refreshData: fetchData
  };
};