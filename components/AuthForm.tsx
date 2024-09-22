"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { authFormSchema } from "@/lib/utils";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.action";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async(data: z.infer<typeof formSchema>)=>{
    setIsLoading(true);
    try {
      if(type === 'sign-up'){
        const newUser = await signUp(data)
        setUser(newUser)
      }
      if(type === 'sign-in'){
        const response = await signIn({
          email: data.email,
          password: data.password
        })
        if(response) router.push('/')
      }
    } catch (error) {
      console.error(error)
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer gap-1 flex items-center px-4">
          <Image
            src="/icons/logo.svg"
            alt="Horizon Logo"
            width={34}
            height={34}
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "SignIn" : "SignUp"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link to your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {type === "sign-up" && (
                <>
                  <div className="flex items-center gap-4">
                    <CustomInput
                      control={form.control}
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      label="First Name"
                    />
                    <CustomInput
                      control={form.control}
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      label="Last Name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    type="text"
                    name="address1"
                    placeholder="Enter your specific address"
                    label="Address"
                  />
                  <CustomInput
                    control={form.control}
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    label="City"
                  />
                  <div className="flex items-center gap-4">
                    <CustomInput
                      control={form.control}
                      type="text"
                      name="state"
                      placeholder="Example: NY"
                      label="State"
                    />
                    <CustomInput
                      control={form.control}
                      type="text"
                      name="postalCode"
                      placeholder="Example: 11101"
                      label="Postal Code"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <CustomInput
                      control={form.control}
                      type="date"
                      name="dateOfBirth"
                      placeholder="YYYY-MM-DD"
                      label="Date of Birth"
                    />
                    <CustomInput
                      control={form.control}
                      type="text"
                      name="ssn"
                      placeholder="Example: 1234"
                      label="SSN"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                type="text"
                name="email"
                placeholder="Enter your email"
                label="Email"
              />
              <CustomInput
                control={form.control}
                type="password"
                name="password"
                placeholder="Enter your password"
                label="Password"
              />
              <div className="flex flex-col gap-4">
                <Button disabled={isLoading} type="submit" className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Aleady have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
