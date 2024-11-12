"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { addMenuItem, getSession } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";

import { JWTPayload } from "jose";
import { Check, Edit2, InfoIcon, Plus, Star, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z
    .string({
      required_error: "Price field can't be empty",
    })
    .regex(/^[1-9]\d*$/, {
      message: "Please provide a valid price",
    }),
  description: z.string().optional(),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
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

type MenuItem = FormValues & { imageUrl?: string };

export default function CreateMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(["Popular"]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [restaurantId, setRestaurantId] = useState<string | unknown>("");

  useEffect(() => {
    async function getRestaurantId() {
      const { id } = (await getSession()) as JWTPayload;
      setRestaurantId(id);
    }

    getRestaurantId();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
      popular: false,
      extraParams: [],
    },
  });

  // Rest of the handlers remain the same
  const handleAddItem = (values: FormValues) => {
    const newItem: MenuItem = {
      ...values,
      imageUrl: values.image ? URL.createObjectURL(values.image) : undefined,
    };
    if (isEditing && editingIndex !== null) {
      const updatedItems = [...menuItems];
      updatedItems[editingIndex] = newItem;
      setMenuItems(updatedItems);
    } else {
      setMenuItems([...menuItems, newItem]);
    }
    if (values.category && !categories.includes(values.category)) {
      setCategories([...categories, values.category]);
    }
    setIsEditing(false);
    setEditingIndex(null);
    setIsDialogOpen(false);
    form.reset();
  };

  const handleEditItem = (index: number) => {
    const item = menuItems[index];
    form.reset(item);
    setIsEditing(true);
    setEditingIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const handleAddExtraParam = () => {
    const currentExtraParams = form.getValues("extraParams") || [];
    form.setValue("extraParams", [
      ...currentExtraParams,
      { name: "", options: [{ name: "", price: "" }] },
    ]);
  };

  const handleRemoveExtraParam = (index: number) => {
    const currentExtraParams = form.getValues("extraParams") || [];
    form.setValue(
      "extraParams",
      currentExtraParams.filter((_, i) => i !== index)
    );
  };

  const handleAddOption = (paramIndex: number) => {
    const currentExtraParams = form.getValues("extraParams") || [];
    const updatedParams = [...currentExtraParams];
    updatedParams[paramIndex].options.push({ name: "", price: "" });
    form.setValue("extraParams", updatedParams);
  };

  const handleRemoveOption = (paramIndex: number, optionIndex: number) => {
    const currentExtraParams = form.getValues("extraParams") || [];
    const updatedParams = [...currentExtraParams];
    updatedParams[paramIndex].options = updatedParams[
      paramIndex
    ].options.filter((_, i) => i !== optionIndex);
    form.setValue("extraParams", updatedParams);
  };

  const handleTogglePopular = (index: number) => {
    const updatedItems = [...menuItems];
    updatedItems[index].popular = !updatedItems[index].popular;
    setMenuItems(updatedItems);
  };

  const getFilteredCategories = (input: string) => {
    if (!input) return [];
    const lowercasedInput = input.toLowerCase();
    return categories.filter((category) =>
      category.toLowerCase().includes(lowercasedInput)
    );
  };

  async function handleSubmit() {
    startTransition(async () => {
      try {
        // Map menu items to an array of promises
        const promises = menuItems.map((menuItem) => {
          const formData = new FormData();

          // Add menu item data to formData
          Object.entries(menuItem).forEach(([key, value]) => {
            if (key === "extraParams") {
              formData.append(key, JSON.stringify(value));
            } else if (value !== null) {
              formData.append(key, value);
            }
            formData.append("restaurantId", restaurantId as string);
          });

          // Return the promise from addMenuItem
          return addMenuItem(formData);
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        // Check if all requests were successful
        const allSuccessful = results.every((result) => result.success);

        if (allSuccessful) {
          toast({
            title: "Success",
            description: "All menu items added successfully",
          });
          setMenuItems([]);
        } else {
          throw new Error("Failed to add some menu items");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: (error as Error).message,
          variant: "destructive",
        });
      } finally {
        setMenuItems([]);
      }
    });
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className={`text-2xl md:text-3xl font-bold mb-6`}>Add Menu Items</h1>

      <div className="space-y-8">
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="w-full md:w-auto"
                onClick={() => {
                  form.reset({
                    name: "",
                    price: "",
                    description: "",
                    category: "",
                    popular: false,
                    extraParams: [],
                  });
                  setIsEditing(false);
                  setEditingIndex(null);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="pl-2">
                  {isEditing ? "Edit Menu Item" : "Add New Menu Item"}
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[80vh] overflow-y-auto">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleAddItem)}
                    className="space-y-4 px-2"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter item name"
                              className="focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background"
                            />
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
                              className="focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value);
                              }}
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
                                className="focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background"
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
                              className="focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background"
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
                              className="focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background"
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
                          {value && (
                            <div className="mt-2 relative w-full h-40">
                              <Image
                                src={URL.createObjectURL(value)}
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
                              {form
                                .watch("extraParams")
                                ?.map((param, paramIndex) => (
                                  <div
                                    key={paramIndex}
                                    className="mt-2 p-2 border rounded-md"
                                  >
                                    <div className="flex gap-2 mb-2">
                                      <Input
                                        placeholder="Parameter Name"
                                        className="focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background"
                                        value={param.name}
                                        onChange={(e) => {
                                          const newParams = [
                                            ...(form.getValues("extraParams") ||
                                              []),
                                          ];
                                          newParams[paramIndex].name =
                                            e.target.value;
                                          form.setValue(
                                            "extraParams",
                                            newParams
                                          );
                                        }}
                                      />
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                          handleRemoveExtraParam(paramIndex)
                                        }
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    {param.options.map(
                                      (option, optionIndex) => (
                                        <div
                                          key={optionIndex}
                                          className="flex gap-2 mt-2"
                                        >
                                          <Input
                                            placeholder="Option"
                                            value={option.name}
                                            onChange={(e) => {
                                              const newParams = [
                                                ...(form.getValues(
                                                  "extraParams"
                                                ) || []),
                                              ];
                                              newParams[paramIndex].options[
                                                optionIndex
                                              ].name = e.target.value;
                                              form.setValue(
                                                "extraParams",
                                                newParams
                                              );
                                            }}
                                          />
                                          <Input
                                            type="number"
                                            placeholder="Price"
                                            value={option.price}
                                            onChange={(e) => {
                                              const newParams = [
                                                ...(form.getValues(
                                                  "extraParams"
                                                ) || []),
                                              ];
                                              newParams[paramIndex].options[
                                                optionIndex
                                              ].price = e.target.value;
                                              form.setValue(
                                                "extraParams",
                                                newParams
                                              );
                                            }}
                                          />
                                          <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                              handleRemoveOption(
                                                paramIndex,
                                                optionIndex
                                              )
                                            }
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      )
                                    )}
                                    <Button
                                      type="button"
                                      variant="outline"
                                      className="mt-2 w-full"
                                      onClick={() =>
                                        handleAddOption(paramIndex)
                                      }
                                    >
                                      <Plus className="h-4 w-4 mr-2" /> Add
                                      Option
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
                    <Button type="submit" className="w-full">
                      {isEditing ? "Update Item" : "Add Item"}
                    </Button>
                  </form>
                </Form>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <h2 className={`text-xl font-semibold mb-4`}>Menu Items</h2>
          <ScrollArea className="h-[300px] md:h-[400px] w-full rounded-md border p-4">
            {menuItems.map((item, index) => (
              <Card key={index} className="mb-4">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTogglePopular(index)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          item.popular ? "text-yellow-400 fill-yellow-400" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditItem(index)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Price: Tk {Number(item.price).toFixed(2)} | Category:{" "}
                    {item.category}
                  </p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </div>

        {menuItems.length > 0 && (
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? "Submitting..." : "Confirm"}
            </Button>
          </div>
        )}

        <div>
          <h2 className={`text-xl font-semibold mb-4`}>Menu Preview</h2>
          <Tabs defaultValue={categories[0]} className="w-full">
            <ScrollArea className="w-full pb-4">
              <TabsList className="inline-flex space-x-2 rounded-full bg-muted p-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-full px-3 py-1.5 text-xs md:text-sm font-medium transition-all whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-4">
                  {menuItems
                    .filter((item) =>
                      category === "Popular"
                        ? item.popular
                        : item.category === category
                    )
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 rounded-md border p-4"
                      >
                        <div className="flex-shrink-0 relative w-20 h-20">
                          <Image
                            src={
                              item.imageUrl ||
                              "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                          <p className="text-sm font-semibold mt-1">
                            Tk {Number(item.price).toFixed(2)}
                          </p>
                          {item.extraParams && item.extraParams.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-semibold">
                                Extra Options:
                              </p>
                              <ul className="text-xs text-muted-foreground">
                                {item.extraParams.map((param, paramIndex) => (
                                  <li key={paramIndex}>
                                    {param.name}:
                                    {param.options.map(
                                      (option, optionIndex) => (
                                        <span key={optionIndex}>
                                          {option.name} (Tk{" "}
                                          {Number(option.price).toFixed(2)})
                                          {optionIndex <
                                          param.options.length - 1
                                            ? ", "
                                            : ""}
                                        </span>
                                      )
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
