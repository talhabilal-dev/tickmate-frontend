"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "./signin-form";
import SigninForm from "./signup-form";

export default function AuthTabs() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Welcome</h1>
        <p className="text-zinc-400">
          Sign in to your account or create a new one
        </p>
      </div>

      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border-zinc-800">
          <TabsTrigger
            value="signin"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-zinc-400"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-zinc-400"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="mt-6">
          <SigninForm />
        </TabsContent>

        <TabsContent value="signup" className="mt-6">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
