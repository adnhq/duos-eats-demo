'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Plus, Edit2, Trash2, X, Star, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { Spline_Sans } from "next/font/google"

const splineSans = Spline_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] })

type MenuItem = {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
  isPopular: boolean
  extraParams: ExtraParam[]
}

type ExtraParam = {
  name: string
  options: string[]
}

export default function CreateMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<string[]>(['Popular'])
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null)
  const [extraParams, setExtraParams] = useState<ExtraParam[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [categoryInput, setCategoryInput] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddItem = (item: MenuItem) => {
    if (isEditing) {
      setMenuItems(menuItems.map(i => i.id === item.id ? item : i))
    } else {
      setMenuItems([...menuItems, { ...item, id: Date.now() }])
    }
    if (item.category && !categories.includes(item.category)) {
      setCategories([...categories, item.category])
    }
    setCurrentItem(null)
    setIsEditing(false)
    setIsDialogOpen(false)
    setCategoryInput('')
  }

  const handleEditItem = (item: MenuItem) => {
    setCurrentItem(item)
    setExtraParams(item.extraParams)
    setCategoryInput(item.category)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id))
  }

  const handleAddExtraParam = () => {
    setExtraParams([...extraParams, { name: '', options: [''] }])
  }

  const handleExtraParamChange = (index: number, field: 'name' | 'options', value: string | string[]) => {
    const newParams = [...extraParams]
    if (field === 'name') {
      newParams[index].name = value as string
    } else {
      newParams[index].options = value as string[]
    }
    setExtraParams(newParams)
  }

  const handleRemoveExtraParam = (index: number) => {
    setExtraParams(extraParams.filter((_, i) => i !== index))
  }

  const handleAddOption = (paramIndex: number) => {
    const newParams = [...extraParams]
    newParams[paramIndex].options.push('')
    setExtraParams(newParams)
  }

  const getFilteredCategories = (input: string) => {
    if (!input) return []
    const lowercasedInput = input.toLowerCase()
    return categories.filter(category => 
      category.toLowerCase().includes(lowercasedInput)
    )
  }

  const handleRemoveOption = (paramIndex: number, optionIndex: number) => {
    const newParams = [...extraParams]
    newParams[paramIndex].options = newParams[paramIndex].options.filter((_, i) => i !== optionIndex)
    setExtraParams(newParams)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentItem(prev => prev ? { ...prev, image: reader.result as string } : null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTogglePopular = (id: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, isPopular: !item.isPopular } : item
    ))
  }

  const handleCategorySelect = (selectedCategory: string) => {
    setCategoryInput(selectedCategory)
    setIsPopoverOpen(false)
  }

  // Filter categories based on input, with null check
  const filteredCategories = categoryInput
    ? categories.filter(category =>
        category.toLowerCase().includes(categoryInput.toLowerCase())
      )
    : []

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className={`text-2xl md:text-3xl font-bold mb-6 ${splineSans.className}`}>Add Menu Items</h1>
      
      <div className="space-y-8">
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto" onClick={() => {
                setCurrentItem(null)
                setExtraParams([])
                setCategoryInput('')
                setIsEditing(false)
              }}>
                <Plus className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[80vh] overflow-y-auto">
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const newItem: MenuItem = {
                    id: currentItem?.id || Date.now(),
                    name: formData.get('name') as string,
                    price: parseFloat(formData.get('price') as string),
                    description: formData.get('description') as string,
                    image: currentItem?.image || '',
                    category: categoryInput,
                    isPopular: currentItem?.isPopular || false,
                    extraParams: extraParams
                  }
                  handleAddItem(newItem)
                }}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={currentItem?.name}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        defaultValue={currentItem?.price}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                    `<Label htmlFor="category">Category</Label>
                    <div className="relative mt-1">
                      <Input
                        id="category"
                        value={categoryInput}
                        onChange={(e) => {
                          setCategoryInput(e.target.value)
                          setIsPopoverOpen(true)
                        }}
                        className="w-full"
                        placeholder="Type a category name..."
                      />
                      {categoryInput && isPopoverOpen && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md border shadow-lg z-10">
                          <div className="py-1">
                            {getFilteredCategories(categoryInput).map((category) => (
                              <div
                                key={category}
                                onClick={() => {
                                  setCategoryInput(category)
                                  setIsPopoverOpen(false)
                                }}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-muted cursor-pointer"
                              >
                                <Check
                                  className={`h-4 w-4 ${
                                    category === categoryInput ? "opacity-100" : "opacity-0"
                                  }`}
                                />
                                <span>{category}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={currentItem?.description}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Image</Label>
                      <Input
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleImageUpload}
                        className="mt-1"
                        ref={fileInputRef}
                      />
                      {currentItem?.image && (
                        <div className="mt-2 relative w-full h-40">
                          <Image
                            src={currentItem.image}
                            alt="Preview"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="rounded-md object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <Label>Extra Parameters</Label>
                      {extraParams.map((param, paramIndex) => (
                        <div key={paramIndex} className="mt-2 p-2 border rounded-md">
                          <div className="flex gap-2 mb-2">
                            <Input
                              placeholder="Parameter Name"
                              value={param.name}
                              onChange={(e) => handleExtraParamChange(paramIndex, 'name', e.target.value)}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveExtraParam(paramIndex)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          {param.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex gap-2 mt-2">
                              <Input
                                placeholder="Option"
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...param.options]
                                  newOptions[optionIndex] = e.target.value
                                  handleExtraParamChange(paramIndex, 'options', newOptions)
                                }}
                              />
                              <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveOption(paramIndex, optionIndex)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button type="button" variant="outline" className="mt-2 w-full" onClick={() => handleAddOption(paramIndex)}>
                            <Plus className="h-4 w-4 mr-2" /> Add Option
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" className="mt-2 w-full" onClick={handleAddExtraParam}>
                        <Plus className="h-4 w-4 mr-2" /> Add Parameter
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 w-full">{isEditing ? 'Update Item' : 'Add Item'}</Button>
                </form>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <h2 className={`text-xl font-semibold mb-4 ${splineSans.className}`}>Menu Items</h2>
          <ScrollArea className="h-[300px] md:h-[400px] w-full rounded-md border p-4">
            {menuItems.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleTogglePopular(item.id)}>
                      <Star className={`h-4 w-4 ${item.isPopular ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Price: Tk {item.price.toFixed(2)} | Category: {item.category}
                  </p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </div>

        <div>
          <h2 className={`text-xl font-semibold mb-4 ${splineSans.className}`}>Menu Preview</h2>
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
                    .filter((item) => category === 'Popular' ? item.isPopular : item.category === category)
                    .map((item) => (
                      <div key={item.id} className="flex items-start space-x-4 rounded-md border p-4">
                        <div className="flex-shrink-0 relative w-20 h-20">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                          <p className="text-sm font-semibold mt-1">Tk {item.price.toFixed(2)}</p>
                          {item.extraParams.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-semibold">Extra Options:</p>
                              <ul className="text-xs text-muted-foreground">
                                {item.extraParams.map((param, index) => (
                                  <li key={index}>{param.name}: {param.options.join(', ')}</li>
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
  )
}