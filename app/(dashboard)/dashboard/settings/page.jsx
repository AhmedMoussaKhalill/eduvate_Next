"use client"

import { useState } from "react"
import { Bell, User, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/components/icons"

export default function SettingsPage() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [theme, setTheme] = useState("light")

  const handleSave = () => {
    // Here you would typically send the updated settings to your backend
    console.log("Settings saved:", { name, email, emailNotifications, pushNotifications, theme })
  }

  return (
    <div className="container mx-auto p-5 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icons.user className="mr-2 size-7" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your account details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name">Name</label>
              <Input className="h-10 rounded-full" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input className="h-10 rounded-full" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icons.apperance className="mr-2 size-7" />
              Appearance
            </CardTitle>
            <CardDescription>Customize the look of your application.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label htmlFor="theme">Theme</label>
              <Select  value={theme} onValueChange={setTheme}>
                <SelectTrigger className="h-10 rounded-full" id="theme">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-end">
          <Button onClick={handleSave} className="rounded-full">Save Changes</Button>
        </CardFooter>
      </div>
    </div>
  )
}

