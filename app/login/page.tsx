"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated" && session) {
      const callbackUrl = searchParams.get("callbackUrl") || "/admin"
      console.log("Already authenticated, redirecting to:", callbackUrl)
      router.push(callbackUrl)
    }
  }, [session, status, router, searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const callbackUrl = searchParams.get("callbackUrl") || "/admin"
      console.log("Attempting login with callbackUrl:", callbackUrl)
      
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: callbackUrl,
      })

      console.log("SignIn result:", result)

      if (result?.error) {
        toast.error("Login failed. Please check your credentials.")
      } else if (result?.ok) {
        toast.success("Login successful!")
        console.log("Login successful, redirecting to:", callbackUrl)
        
        // Force redirect after successful login with a delay
        setTimeout(() => {
          window.location.href = callbackUrl
        }, 1500)
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("An error occurred during login.")
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-transparent border-t-gray-400 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <div className="absolute top-4 right-4">
      </div>

      <Link href="/" className="flex items-center gap-2 mb-8">
        <Image
          src="/Logo.svg"
          alt="IKASI JABAR Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="text-xl font-bold">IKASI JABAR</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </Label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
                 <CardFooter className="flex flex-col">
           <div className="mt-2 text-center text-sm text-muted-foreground">
             <Link href="/" className="hover:text-primary">
               Return to public site
             </Link>
           </div>
           <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
             <p className="text-xs text-gray-600 mb-1">Demo Account:</p>
             <p className="text-xs text-gray-700">Email: <span className="font-mono">jabardigitalacademy@anggar-jabar.com</span></p>
             <p className="text-xs text-gray-700">Password: <span className="font-mono">12345678</span></p>
           </div>
         </CardFooter>
      </Card>
    </div>
  )
}
