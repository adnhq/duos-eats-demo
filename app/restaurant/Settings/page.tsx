import EditRestaurantPassword from "@/components/EditRestaurantPassword";
import { RestaurantProfile } from "@/components/RestaurantProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRestaurant, getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";

export default async function Page() {
  try {
    const session = await getSession();
    
    if (!session) {
      // Redirect to login or show unauthorized message
      redirect("/login"); // Adjust this path to your login route
    }

    const { id } = session as JWTPayload;
    const restaurantData = await getRestaurant(id);

    // Check if restaurant data exists
    if (!restaurantData || restaurantData.length === 0) {
      throw new Error("Restaurant data not found");
    }

    return (
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <RestaurantProfile defaultValues={restaurantData[0]} id={id} />
          </TabsContent>

          <TabsContent value="security">
            <EditRestaurantPassword id={id} />
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Settings page error:", error);

    // Return an error state component
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Unable to load settings
          </h2>
          <p className="text-red-700">
            Please try refreshing the page. If the problem persists, make sure you are logged in.
          </p>
        </div>
      </div>
    );
  }
}