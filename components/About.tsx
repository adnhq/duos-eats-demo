import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Search, Star, Utensils, Zap } from "lucide-react";
import { Bebas_Neue } from "next/font/google";

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 py-24 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="space-y-2">
            <span className={`block text-6xl font-semibold`}>Welcome to</span>
            <span
              className={`block text-7xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 ${bebas_neue.className}`}
            >
              Duos Eats
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Transform your dining experience with exclusive savings at the best
            restaurants across the country. Duos Eats brings you a seamless way
            to enjoy premium dining while keeping more money in your pocket.
          </p>
        </section>

        {/* Features Section */}
        <section className="space-y-12">
          <h2 className={`text-4xl font-semibold text-center tracking-tight`}>
            Why Choose Duos Eats?
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {[
              {
                title: "Exclusive Discounts",
                icon: Zap,
                description:
                  "Save more than 10% on every dine-in experience at our carefully selected partner restaurants.",
              },
              {
                title: "Premium Experience",
                icon: Star,
                description:
                  "Free membership signup, instant access to all offers, and no hidden fees or commitments.",
              },
              {
                title: "Effortless Dining",
                icon: Utensils,
                description:
                  "Skip the wait and enjoy a modernized dining experience with our one-tap ordering system.",
              },
              {
                title: "Curated Selection",
                icon: Search,
                description:
                  "Access exclusive deals at top-rated restaurants and discover hidden gems.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border rounded-xl border-gray-200 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <CardTitle
                    className={`text-xl font-bold group-hover:text-primary transition-colors duration-300`}
                  >
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Steps Section */}
        <section className="space-y-12">
          <h2 className={`text-4xl font-bold text-center tracking-tight`}>
            Getting Started is Simple
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Sign Up Free",
                steps: [
                  "Create your account in seconds",
                  "No credit card required",
                  "Instant access to all offers",
                ],
              },
              {
                title: "Explore & Choose",
                steps: [
                  "Browse nearby partner restaurants",
                  "View real-time offers and discounts",
                  "Check menus and availability",
                ],
              },
              {
                title: "Order & Enjoy",
                steps: [
                  "Place orders directly from your table",
                  "Skip the wait with digital ordering",
                  "Track your savings with every visit",
                ],
              },
              {
                title: "Savor & Save",
                steps: [
                  "Enjoy premium dining experiences",
                  "Earn rewards with every visit",
                  "Share the experience with friends and family",
                ],
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="border rounded-xl border-gray-200 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out"
              >
                <CardHeader>
                  <CardTitle className={`flex items-center text-xl font-bold`}>
                    <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mr-3 text-lg font-bold group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {index + 1}
                    </span>
                    <span className="group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {step.steps.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
