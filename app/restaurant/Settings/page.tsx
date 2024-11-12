import EditRestaurantPassword from "@/components/EditRestaurantPassword";
import { RestaurantProfile } from "@/components/RestaurantProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRestaurant, getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if ((session as JWTPayload).role !== "restaurant") return redirect("/");
  const restaurant = await getRestaurant((session as JWTPayload).id);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <RestaurantProfile
            defaultValues={restaurant[0]}
            id={(session as JWTPayload).id}
          />
        </TabsContent>

        <TabsContent value="security">
          <EditRestaurantPassword id={(session as JWTPayload).id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
