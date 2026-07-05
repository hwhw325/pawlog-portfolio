"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, PawPrint } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a real app, this would save to Supabase
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-6 bg-primary/5 min-h-screen">
      <div className="flex items-center justify-center mb-8">
        <PawPrint className="w-12 h-12 text-primary" />
      </div>
      
      <Card className="border-none shadow-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">Welcome to PawLog</CardTitle>
          <CardDescription>Let's set up your pet's profile.</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Photo Upload Mock */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-zinc-100 border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center text-zinc-400 cursor-pointer hover:bg-zinc-50 transition-colors">
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Add Photo</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Pet Name</Label>
                <Input id="name" placeholder="e.g. Max" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="species">Species</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Dog</SelectItem>
                      <SelectItem value="cat">Cat</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age (Years)</Label>
                <Input id="age" type="number" placeholder="e.g. 3" required />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={loading}>
              {loading ? "Saving..." : "Start Journaling"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
