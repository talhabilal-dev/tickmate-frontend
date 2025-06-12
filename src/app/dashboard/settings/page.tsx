"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard-layout";
import ProfileSettings from "@/components/settings/profile-settings";
import SkillsSettings from "@/components/settings/skills-settings";
import NotificationSettings from "@/components/settings/notification-settings";
import SecuritySettings from "@/components/settings/security-settings";
import PreferencesSettings from "@/components/settings/preferences-settings";
import TeamSettings from "@/components/settings/team-settings";
import IntegrationsSettings from "@/components/settings/integrations-settings";
import {
  User,
  Zap,
  Bell,
  Shield,
  SettingsIcon,
  Users,
  Plug,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "skills", label: "Skills", icon: Zap },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
    { id: "team", label: "Team", icon: Users },
    { id: "integrations", label: "Integrations", icon: Plug },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-zinc-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-7 bg-zinc-900 border-zinc-800">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-zinc-400"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsSettings />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferencesSettings />
          </TabsContent>

          <TabsContent value="team">
            <TeamSettings />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsSettings />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
