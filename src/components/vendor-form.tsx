"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAddTask } from "@/features/vendor/actions.ts/add-task";
import { useUpdateTask } from "@/features/vendor/actions.ts/update-task";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Pencil,
  Plus,
  Building2,
  User,
  FileText,
  Phone,
  Mail,
  MapPin,
  Shield,
  CheckCircle,
  AlertCircle,
  Package,
  Settings,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { vendorSchema, type Vendor } from "@/features/vendor/data/schema";
import FileUpload from "./file-upload";

// Keeping the fetcher for reference parity with the original code
export const fetcher = async (url: string, payload?: string) => {
  const options = {
    method: payload ? "POST" : "GET",
    ...(payload && { body: payload }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return fetch(url, options).then((r) => {
    if (!r.ok) {
      throw new Error(`HTTP error! status: ${r.status}`);
    }
    return r.json();
  });
};

// Form schema derived from vendorSchema, allowing id to be optional in the form
const FormSchema = vendorSchema.extend({
  id: z.number().optional(),
  vendor_code: z.string().min(1, {
    message: "Vendor name is required.",
  }),
  vendor_name: z.string().min(1, {
    message: "Vendor name is required.",
  }),
  msa: z.string().min(1, {
    message: "MSA is required.",
  }), //attachment
  supplier_evaluation_result: z.string().min(1, {
    message: "Supplier Evaluation is required.",
  }), //attachment
  supplier_evaluation: z.string().min(1, {
    message: "Suppluer Evaluation is required.",
  }), //attachment
  dti_sec: z.string().min(1, {
    message: "DTI/SEC is required.",
  }), //attachment
  bir: z.string().min(1, {
    message: "BIR is required.",
  }), //attachment
  business_mayor_peza: z.string().min(1, {
    message: "Business Mayor Peza is required.",
  }), //attachment
  qms_iso: z.string().min(1, {
    message: "QMS/ISO is required.",
  }), //attachment
  financial_statement: z.string().min(1, {
    message: "Financial Statement is required.",
  }), //attachment
  others: z.string().min(1, {
    message: "Others is required.",
  }), //attachment
  contact_person: z.string().min(1, {
    message: "Contact Person is required.",
  }),
  email: z.string().min(1, {
    message: "Vendor name is required.",
  }),
});

export function VendorCreatePage({
  taskData,
  action,
}: {
  taskData?: Partial<Vendor>;
  action: "create" | "update";
}) {
  const { trigger: addTaskMutation, isMutating: isAdding } = useAddTask();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: taskData?.id ?? 0,
      direct: taskData?.direct ?? "",
      plant: taskData?.plant ?? "",
      vendor_code: taskData?.vendor_code ?? "",
      vendor_name: taskData?.vendor_name ?? "",
      ios_account: taskData?.ios_account ?? "",
      is_active: taskData?.is_active ?? false,
      asl: taskData?.asl ?? false,
      critical: taskData?.critical ?? "",
      category: taskData?.category ?? "",
      products: taskData?.products ?? "",
      msa: taskData?.msa ?? "",
      supplier_evaluation_result: taskData?.supplier_evaluation_result ?? "",
      supplier_evaluation: taskData?.supplier_evaluation ?? "",
      dti_sec: taskData?.dti_sec ?? "",
      bir: taskData?.bir ?? "",
      business_mayor_peza: taskData?.business_mayor_peza ?? "",
      qms_iso: taskData?.qms_iso ?? "",
      financial_statement: taskData?.financial_statement ?? "",
      others: taskData?.others ?? "",
      contact_person: taskData?.contact_person ?? "",
      email: taskData?.email ?? "",
      phone_number: taskData?.phone_number ?? "",
      address: taskData?.address ?? "",
    },
  });

  const { trigger: updateTaskMutation, isMutating: isUpdating } = useUpdateTask(
    {
      taskID: taskData?.id,
    }
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (action === "create") {
      await addTaskMutation(data as Vendor);
    } else {
      await updateTaskMutation(data as Vendor);
    }
  }

  const isLoading = form.formState.isSubmitting || isAdding || isUpdating;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`p-3 rounded-xl ${action === "create" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}
            >
              {action === "create" ? (
                <Plus className="w-6 h-6" />
              ) : (
                <Pencil className="w-6 h-6" />
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                {action === "create" ? "Add New Vendor" : "Update Vendor"}
              </h1>
              <p className="text-lg  mt-1">
                {action === "create"
                  ? "Create a comprehensive vendor profile with all necessary details"
                  : "Update vendor information and maintain accurate records"}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-1">
            <Badge
              variant={action === "create" ? "default" : "secondary"}
              className="px-3 py-1"
            >
              {action === "create" ? "New Entry" : "Editing Mode"}
            </Badge>
            {taskData?.is_active && (
              <Badge
                variant="outline"
                className="px-3 py-1 border-emerald-200 text-emerald-700"
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                Active Vendor
              </Badge>
            )}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Card */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm py-0">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg py-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Building2 className="w-5 h-5 " />
                  Basic Information
                </CardTitle>
                <CardDescription className="">
                  Essential vendor identification and classification details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="vendor_name"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-base font-semibold ">
                          Vendor Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter official vendor name"
                            {...field}
                            className="h-12 text-base border-slate-200 focus:border-slate-400"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Official registered name of the vendor company
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vendor_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold ">
                          Vendor Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="VND-001"
                            {...field}
                            className="h-12 text-base border-slate-200 focus:border-slate-400"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Unique vendor identifier code
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold ">
                          Category
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Manufacturing, Services"
                            {...field}
                            className="h-12 text-base border-slate-200 focus:border-slate-400"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Business category classification
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="direct"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold ">
                          Direct
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Direct type or line"
                            {...field}
                            className="h-12 text-base border-slate-200 focus:border-slate-400"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Direct supply line or type
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="plant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold ">
                          Plant
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Plant assignment"
                            {...field}
                            className="h-12 text-base border-slate-200 focus:border-slate-400"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Assigned plant or facility
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status & Classification Card */}
            <Card className="shadow-2xl  border-0 bg-white/80 backdrop-blur-sm py-0">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-t-lg py-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Settings className="w-5 h-5 text-emerald-600" />
                  Status & Classification
                </CardTitle>
                <CardDescription className="">
                  Vendor status, approvals, and operational settings
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="ios_account"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold ">
                          IOS Account
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Internal account ID"
                            {...field}
                            className="h-12 text-base border-slate-200 focus:border-slate-400"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Internal operating system account
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="critical"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold ">
                          Critical Level
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="High, Medium, Low"
                            {...field}
                            className="h-12 text-base border-slate-200 focus:border-slate-400"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Business criticality assessment
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="is_active"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-xl border-2 border-slate-100 p-4 bg-slate-50/50">
                          <div className="space-y-1">
                            <FormLabel className="text-base font-semibold  flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Active Status
                            </FormLabel>
                            <FormDescription className="">
                              Enable vendor for operations
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              aria-label="Toggle Active Status"
                              className="data-[state=checked]:bg-emerald-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="asl"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-xl border-2 border-slate-100 p-4 bg-slate-50/50">
                          <div className="space-y-1">
                            <FormLabel className="text-base font-semibold  flex items-center gap-1">
                              <Shield className="w-4 h-4" />
                              ASL Approved
                            </FormLabel>
                            <FormDescription className="">
                              Approved Supplier List status
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              aria-label="Toggle ASL Status"
                              className="data-[state=checked]:bg-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products & Services Card */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm py-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg py-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Package className="w-5 h-5 text-blue-600" />
                  Products & Services
                </CardTitle>
                <CardDescription className="">
                  Detailed information about vendor offerings and location
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="products"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold ">
                          Products & Services
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the products and services offered by this vendor..."
                            {...field}
                            className="min-h-[120px] text-base border-slate-200 focus:border-slate-400 resize-none"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Comprehensive list of vendor capabilities
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold  flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Business Address
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter complete business address including city, state, and postal code..."
                            {...field}
                            className="min-h-[120px] text-base border-slate-200 focus:border-slate-400 resize-none"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Complete registered business address
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Documentation & Compliance Card */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm py-0">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-t-lg py-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <FileText className="w-5 h-5 text-amber-600" />
                  Documentation & Compliance
                </CardTitle>
                <CardDescription className="">
                  Legal documents, certifications, and compliance records
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-8">
                  {/* Legal Documents Section */}
                  <div>
                    <h4 className="text-lg font-semibold  mb-4 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Legal & Registration Documents
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="dti_sec"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium ">
                              DTI/SEC Registration
                            </FormLabel>
                            <FormControl>
                              <FileUpload />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bir"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium ">
                              BIR Registration
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Tax registration reference"
                                {...field}
                                className="h-10 border-slate-200 focus:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="business_mayor_peza"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium ">
                              Business Permits
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Mayor/PEZA permits"
                                {...field}
                                className="h-10 border-slate-200 focus:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Agreements & Evaluations Section */}
                  <div>
                    <h4 className="text-lg font-semibold  mb-4 flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      Agreements & Evaluations
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="msa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium ">
                              Master Service Agreement
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="MSA reference or URL"
                                {...field}
                                className="h-10 border-slate-200 focus:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="supplier_evaluation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium ">
                              Supplier Evaluation
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Evaluation document"
                                {...field}
                                className="h-10 border-slate-200 focus:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="supplier_evaluation_result"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium ">
                              Evaluation Result
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Result reference"
                                {...field}
                                className="h-10 border-slate-200 focus:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Certifications & Financial Section */}
                  <div>
                    <h4 className="text-lg font-semibold  mb-4 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Certifications & Financial
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="qms_iso"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium ">
                              QMS/ISO Certification
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Quality certification"
                                {...field}
                                className="h-10 border-slate-200 focus:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="financial_statement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium ">
                              Financial Statement
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Latest financial docs"
                                {...field}
                                className="h-10 border-slate-200 focus:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="others"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium ">
                              Other Documents
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Additional attachments"
                                {...field}
                                className="h-10 border-slate-200 focus:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information Card */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm py-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-lg py-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <User className="w-5 h-5 text-purple-600" />
                  Contact Information
                </CardTitle>
                <CardDescription className="">
                  Primary contact details for vendor communication
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="contact_person"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold  flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Contact Person
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Full name of contact person"
                            {...field}
                            className="h-12 text-base border-slate-200 focus:border-slate-400"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Primary point of contact
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold  flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="contact@vendor.com"
                            {...field}
                            className="h-12 text-base border-slate-200 focus:border-slate-400"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Primary email for communication
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold  flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+63 900 000 0000"
                            {...field}
                            className="h-12 text-base border-slate-200 focus:border-slate-400"
                          />
                        </FormControl>
                        <FormDescription className="">
                          Primary contact number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 pt-0">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="text-sm ">
                    {isLoading
                      ? "Processing your request..."
                      : "Ready to submit"}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="px-8 h-12 border-slate-200 hover:bg-slate-50"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      className={`px-8 h-12 font-semibold ${
                        action === "create"
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {action === "create"
                            ? "Adding Vendor..."
                            : "Updating Vendor..."}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          {action === "create" ? (
                            <>
                              <Plus className="w-4 h-4" />
                              Add Vendor
                            </>
                          ) : (
                            <>
                              <Pencil className="w-4 h-4" />
                              Update Vendor
                            </>
                          )}
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default VendorCreatePage;
