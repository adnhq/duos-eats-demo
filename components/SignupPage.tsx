"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/lib/actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phoneNumber: z
      .string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(/^\d{10}$/, "Phone number must contain only digits")
      .refine((value) => value !== "0000000000", {
        message: "Phone number cannot be all zeros",
      }),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const verificationSchema = z.object({
  otp: z.string(),
});

type SignupFormData = z.infer<typeof signupSchema>;
type VerificationFormData = z.infer<typeof verificationSchema>;

const BackgroundSVG = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >
    <path
      fill="rgb(255, 237, 213)"
      fillOpacity="0.5"
      d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,112C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
    <path
      fill="rgb(254, 215, 170)"
      fillOpacity="0.5"
      d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,218.7C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
    <path
      fill="rgb(251, 146, 60)"
      fillOpacity="0.3"
      d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,213.3C672,203,768,213,864,224C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    ></path>
  </svg>
);

const SignupPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [formData, setFormData] = React.useState<SignupFormData | null>(null);
  const [generatedOTP, setGeneratedOTP] = React.useState<string>("");
  const [otpValue, setOtpValue] = React.useState("");
  const { toast } = useToast();
  const router = useRouter();

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const verificationForm = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const onSignupSubmit = async (values: SignupFormData) => {
    try {
      const otp = generateOTP();
      setGeneratedOTP(otp);
      setFormData(values);

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          otp: otp,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }

      setIsVerifying(true);
      toast({
        title: "Verification Code Sent",
        description: "Please check your email for the verification code.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onVerificationSubmit = async () => {
    try {
      if (otpValue !== generatedOTP) {
        toast({
          title: "Error",
          description: "Invalid verification code. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (!formData) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const submitFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && key !== "confirmPassword") {
          submitFormData.append(key, value);
        }
      });

      const result = await registerUser(submitFormData);

      if (result.success) {
        toast({
          title: "Registration Successful!",
          description: "Your account has been created successfully.",
        });

        setIsVerifying(false);
        setFormData(null);
        setGeneratedOTP("");
        setOtpValue("");
        signupForm.reset();
        verificationForm.reset();

        //redirect
        router.push("/login");
      } else {
        throw new Error("Failed to create account. Please try again.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const resendVerificationCode = async () => {
    if (!formData) return;

    try {
      const newOTP = generateOTP();
      setGeneratedOTP(newOTP);

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          otp: newOTP,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend verification code");
      }

      toast({
        title: "Verification Code Resent",
        description: "Please check your email for the new verification code.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend verification code. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col justify-center items-center relative bg-gradient-to-b from-white to-orange-50 py-16 md:py-0">
      <BackgroundSVG />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 mt-20">
        <Card className="backdrop-blur-sm shadow-xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-center mb-2">
              {isVerifying ? "Verify Email" : "Create Account"}
            </CardTitle>
            <p className="text-gray-600 text-center">
              {isVerifying
                ? "Enter the verification code sent to your email"
                : "Join us for a delicious journey"}
            </p>
          </CardHeader>
          <CardContent>
            {!isVerifying ? (
              <Form {...signupForm}>
                <form
                  onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                              +880
                            </span>
                            <Input
                              placeholder="123456789"
                              {...field}
                              type="tel"
                              className="flex-1 rounded-l-none"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="you@example.com"
                            {...field}
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="••••••••"
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? (
                                <Eye className="h-5 w-5" />
                              ) : (
                                <EyeOff className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="••••••••"
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showConfirmPassword ? (
                                <Eye className="h-5 w-5" />
                              ) : (
                                <EyeOff className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={signupForm.formState.isSubmitting}
                  >
                    {signupForm.formState.isSubmitting ? (
                      <>
                        <span>Sending otp</span>
                        <span className="animate-spin">
                          <Loader2 className="h-4 w-4" />
                        </span>
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <Form {...verificationForm}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onVerificationSubmit();
                  }}
                  className="space-y-4"
                >
                  <FormField
                    control={verificationForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verification Code</FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            onChange={(value) => {
                              field.onChange(value);
                              setOtpValue(value);
                            }}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={verificationForm.formState.isSubmitting}
                  >
                    {verificationForm.formState.isSubmitting ? (
                      <>
                        <span className="">Verifying</span>
                        <span className="animate-spin">
                          <Loader2 className="h-4 w-4" />
                        </span>
                      </>
                    ) : (
                      "Verify and Create Account"
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={resendVerificationCode}
                      className="text-sm text-amber-600 hover:text-amber-700"
                    >
                      Resend verification code
                    </button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-amber-500 hover:text-amber-600"
                >
                  Sign in
                </Link>
              </p>
            </div>
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-amber-500 flex items-center justify-center gap-2 mx-auto"
            >
              ← Back to home
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-around">
        {["🍔", "🍕", "🍣", "🥗", "🍰"].map((emoji, index) => (
          <span
            key={index}
            className="text-4xl md:text-5xl lg:text-6xl opacity-30"
          >
            {emoji}
          </span>
        ))}
      </div>
    </main>
  );
};

export default SignupPage;
