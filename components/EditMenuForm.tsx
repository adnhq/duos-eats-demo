"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, InfoIcon, Loader2, Pencil, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useToast } from "@/hooks/use-toast";
import { editMenuItem } from "@/lib/actions";
import duosLogo from "../duos-lg.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .string({
      required_error: "Price field can't be empty",
    })
    .regex(/^[1-9]\d*$/, {
      message: "Please provide a valid price",
    }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  description: z.string().optional(),
  image: z.any().optional(),
  popular: z.boolean().default(false),
  extraParams: z
    .array(
      z.object({
        name: z.string().min(1, "Parameter name is required"),
        options: z.array(
          z.object({
            name: z.string().min(1, "Option name cannot be empty"),
            price: z
              .string({
                required_error: "Price field can't be empty",
              })
              .regex(/^[0-9]\d*$/, {
                message: "Please provide a valid price",
              }),
          })
        ),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditMenuItemForm({
  initialData = {},
  editMenuId = "",
}: {
  initialData?: Partial<FormValues>;
  editMenuId: string;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      extraParams: [],
      popular: false,
      ...initialData,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "extraParams") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null) {
          formData.append(key, value);
        }

        formData.append("editMenuId", editMenuId);
      });

      const editRes = await editMenuItem(formData);

      if (editRes.success) {
        toast({
          title: "Item updated",
          description: "The item has been updated successfully",
        });
      } else {
        throw new Error("Failed to update item");
      }
    } catch (error) {
      toast({
        title: "Item update failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleAddExtraParam = () => {
    const currentParams = form.getValues("extraParams") || [];
    form.setValue("extraParams", [
      ...currentParams,
      { name: "", options: [{ name: "", price: "" }] },
    ]);
  };

  const handleRemoveExtraParam = (index: number) => {
    const currentParams = form.getValues("extraParams") || [];
    form.setValue(
      "extraParams",
      currentParams.filter((_, i) => i !== index)
    );
  };

  const handleAddOption = (paramIndex: number) => {
    const currentParams = form.getValues("extraParams") || [];
    currentParams[paramIndex].options.push({ name: "", price: "" });
    form.setValue("extraParams", currentParams);
  };

  const handleRemoveOption = (paramIndex: number, optionIndex: number) => {
    const currentParams = form.getValues("extraParams") || [];
    currentParams[paramIndex].options = currentParams[
      paramIndex
    ].options.filter((_, i) => i !== optionIndex);
    form.setValue("extraParams", currentParams);
  };

  const getFilteredCategories = (input: string) => {
    const categories = ["Appetizers", "Main Course", "Desserts", "Drinks"];
    return categories.filter((category) =>
      category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <Card className="ml-4">
      <CardHeader>
        <CardTitle>Editing Item#{editMenuId}</CardTitle>
        <CardDescription>
          Update the below details to update the menu item
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter item name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Type a category name..."
                        onChange={(e) => {
                          field.onChange(e);
                          setIsPopoverOpen(true);
                        }}
                      />
                      {field.value && isPopoverOpen && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md border shadow-lg z-10">
                          <div className="py-1">
                            {getFilteredCategories(field.value).map(
                              (category) => (
                                <div
                                  key={category}
                                  onClick={() => {
                                    field.onChange(category);
                                    setIsPopoverOpen(false);
                                  }}
                                  className="flex items-center gap-2 px-4 py-2 hover:bg-muted cursor-pointer"
                                >
                                  <Check
                                    className={`h-4 w-4 ${
                                      category === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  <span>{category}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter item description (optional)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                      {...field}
                      ref={fileInputRef}
                    />
                  </FormControl>
                  {value && value instanceof File ? (
                    <div className="mt-2 relative w-full h-40">
                      <Image
                        src={URL.createObjectURL(value)}
                        alt="Preview"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="rounded-md object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mt-2 relative w-full h-40">
                      <Image
                        src={value === "undefined" ? duosLogo : value}
                        alt="Preview"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="popular"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Popular</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      This item will be marked as popular on the menu.
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extraParams"
              render={() => (
                <FormItem>
                  <FormLabel>Extra Parameters</FormLabel>
                  <FormDescription className="flex items-center gap-2">
                    <InfoIcon className="h-4 w-4" />
                    Please enter 0 for the price if the option is free
                  </FormDescription>
                  <FormControl>
                    <div>
                      {form.watch("extraParams")?.map((param, paramIndex) => (
                        <div
                          key={paramIndex}
                          className="mt-2 p-2 border rounded-md"
                        >
                          <div className="flex gap-2 mb-2">
                            <Input
                              placeholder="Parameter Name"
                              value={param.name}
                              onChange={(e) => {
                                const newParams = [
                                  ...(form.getValues("extraParams") || []),
                                ];
                                newParams[paramIndex].name = e.target.value;
                                form.setValue("extraParams", newParams);
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleRemoveExtraParam(paramIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          {param.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex gap-2 mt-2">
                              <Input
                                placeholder="Option"
                                value={option.name}
                                onChange={(e) => {
                                  const newParams = [
                                    ...(form.getValues("extraParams") || []),
                                  ];
                                  newParams[paramIndex].options[
                                    optionIndex
                                  ].name = e.target.value;
                                  form.setValue("extraParams", newParams);
                                }}
                              />
                              <Input
                                type="number"
                                placeholder="Price"
                                value={`${option.price}`}
                                onChange={(e) => {
                                  const newParams = [
                                    ...(form.getValues("extraParams") || []),
                                  ];

                                  newParams[paramIndex].options[
                                    optionIndex
                                  ].price = e.target.value;
                                  form.setValue("extraParams", newParams);
                                }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                  handleRemoveOption(paramIndex, optionIndex)
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-2 w-full"
                            onClick={() => handleAddOption(paramIndex)}
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Option
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-2 w-full"
                        onClick={handleAddExtraParam}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Parameter
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <span className="">Updating</span>
                  <span className="animate-spin">
                    <Loader2 className="h-4 w-4" />
                  </span>
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4" /> Update Item
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
