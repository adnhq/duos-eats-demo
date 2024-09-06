// components/Deals.tsx

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Deal } from "@/lib/types";

type DealsProps = {
  deals: Deal[];
};

const RestaurantDeals: React.FC<DealsProps> = ({ deals }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-4">Available deals</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {deals.map((deal, index) => (
        <Card
          key={index}
          className={deal.type === "PRO" ? "bg-purple-100" : "bg-pink-100"}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {deal.type === "PRO" && (
                <span className="bg-purple-700 text-white text-xs font-bold px-2 py-1 rounded">
                  PRO
                </span>
              )}
              {deal.discount}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{deal.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default RestaurantDeals;
