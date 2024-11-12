import { ArrowUpDown, DollarSign, Plus, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUnapprovedRestaurants } from "@/lib/actions";
import Link from "next/link";
import RestaurantApproval from "./RestaurantApproval";

// interface Restaurant {
//   id: number;
//   name: string;
//   pendingDues: number;
//   lastPayment: string;
//   status: string;
// }

// Mock data
// const restaurantsData: Restaurant[] = [
//   {
//     id: 1,
//     name: "Tasty Bites",
//     pendingDues: 2500,
//     lastPayment: "2023-05-15",
//     status: "active",
//   },
//   {
//     id: 2,
//     name: "Spice Haven",
//     pendingDues: 1800,
//     lastPayment: "2023-05-20",
//     status: "active",
//   },
//   {
//     id: 3,
//     name: "Burger Palace",
//     pendingDues: 3200,
//     lastPayment: "2023-05-10",
//     status: "active",
//   },
//   {
//     id: 4,
//     name: "Sushi Express",
//     pendingDues: 900,
//     lastPayment: "2023-05-22",
//     status: "active",
//   },
//   {
//     id: 5,
//     name: "Pizza Paradise",
//     pendingDues: 1500,
//     lastPayment: "2023-05-18",
//     status: "active",
//   },
// ];

// const pendingApplications: Application[] = [
//   {
//     id: 101,
//     restaurantName: "Green Leaf Cafe",
//     email: "green@leaf.com",
//     password: "********",
//     phone: "+880123456789",
//     cuisine: "Vegan",
//     address: "123 Green St",
//     location: "Dhaka",
//     appliedOn: "2023-05-25",
//   },
//   {
//     id: 102,
//     restaurantName: "Taco Town",
//     email: "taco@town.com",
//     password: "********",
//     phone: "+880123456790",
//     cuisine: "Mexican",
//     address: "45 Taco Ave",
//     location: "Dhaka",
//     appliedOn: "2023-05-26",
//   },
// ];

const platformStats = [
  { name: "Total Fees", value: 0 },
  { name: "Active Restaurants", value: 0 },
  { name: "New Sign-ups", value: 0 },
  { name: "Avg. Order Value", value: 0 },
];

export default async function AdminDashboard() {
  const unApprovedRestaurants = await getUnapprovedRestaurants();

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">Manage restaurants and applications</p>
          </div>
          <Button asChild>
            <Link href={"/registration"}>
              <Plus className="mr-2 h-4 w-4" /> Add New Restaurant
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {platformStats.map((stat, index) => (
            <Card
              key={index}
              className={`shadow-lg ${
                index === 0
                  ? "bg-gradient-to-br from-blue-500 to-blue-600"
                  : index === 1
                  ? "bg-gradient-to-br from-green-500 to-green-600"
                  : index === 2
                  ? "bg-gradient-to-br from-purple-500 to-purple-600"
                  : "bg-gradient-to-br from-orange-500 to-orange-600"
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {stat.name}
                </CardTitle>
                {index === 0 ? (
                  <DollarSign className="h-4 w-4 text-white" />
                ) : index === 1 ? (
                  <Store className="h-4 w-4 text-white" />
                ) : index === 2 ? (
                  <Plus className="h-4 w-4 text-white" />
                ) : (
                  <ArrowUpDown className="h-4 w-4 text-white" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-xl md:text-2xl font-bold text-white">
                  {index === 0 || index === 3
                    ? `BDT ${stat.value.toLocaleString()}`
                    : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Applications Section */}
        <Card className="shadow-md">
          <CardHeader className="md:pl-10 sm:pl-4">
            <CardTitle className="text-lg font-semibold">
              Pending Applications
            </CardTitle>
            <CardDescription>
              Review new restaurant applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RestaurantApproval unApprovedRestaurants={unApprovedRestaurants} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
{
  // Mobile-friendly card view component for applications
  // Mobile-friendly card view component for restaurants
  // const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
  //   <Card className="mb-4">
  //     <CardHeader className="pb-2">
  //       <div className="flex justify-between items-start">
  //         <CardTitle className="text-lg font-semibold">
  //           {restaurant.name}
  //         </CardTitle>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem>Edit Information</DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>View Payment History</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </div>
  //     </CardHeader>
  //     <CardContent>
  //       <div className="space-y-2">
  //         <div className="flex justify-between">
  //           <span className="text-sm text-muted-foreground">Pending Dues:</span>
  //           <span className="font-medium">
  //             BDT {restaurant.pendingDues.toLocaleString()}
  //           </span>
  //         </div>
  //         <div className="flex justify-between">
  //           <span className="text-sm text-muted-foreground">Last Payment:</span>
  //           <span>{restaurant.lastPayment}</span>
  //         </div>
  //         <div className="flex justify-between items-center">
  //           <span className="text-sm text-muted-foreground">Status:</span>
  //           <Badge variant="outline" className="bg-green-100 text-green-800">
  //             {restaurant.status}
  //           </Badge>
  //         </div>
  //       </div>
  //     </CardContent>
  //   </Card>
  // );
  /* <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Restaurant List</CardTitle>
            <CardDescription>Manage restaurants and their pending dues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center py-4">
              <Input
                placeholder="Search restaurants..."
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
         
            <div className="md:hidden space-y-4">
              {restaurantsData
                .filter(restaurant => 
                  restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>

            <div className="hidden md:block overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Pending Dues</th>
                    <th className="text-left py-3 px-4">Last Payment</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantsData
                    .filter(restaurant => 
                      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(restaurant => (
                      <tr key={restaurant.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{restaurant.name}</td>
                        <td className="py-3 px-4">BDT {restaurant.pendingDues.toLocaleString()}</td>
                        <td className="py-3 px-4">{restaurant.lastPayment}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {restaurant.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit Information</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Payment History</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Payment History</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card> */
}
