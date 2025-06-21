
import { Home, History, Settings, User, Brain, HeartHandshake, Users, TrendingUp, BarChart3, BookOpen } from "lucide-react";

export const personalMenuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Journal",
    url: "/journal",
    icon: Settings,
  },
  {
    title: "CBT Tools",
    url: "/cbt-tools",
    icon: Brain,
  },
  {
    title: "Support",
    url: "/support",
    icon: HeartHandshake,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export const organizationMenuItemsAdmin = [
  {
    title: "Team Overview",
    url: "/admin",
    icon: Users,
  },
  {
    title: "Mood Trends",
    url: "/admin/trends",
    icon: TrendingUp,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: User,
  },
  {
    title: "Journals Overview",
    url: "/admin/journals",
    icon: BookOpen,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export const organizationMenuItemsUser = [
  {
    title: "Team Wellness",
    url: "/team/wellness",
    icon: Users,
  },
  {
    title: "Mood Summary",
    url: "/team/summary",
    icon: TrendingUp,
  },
  {
    title: "Group Check-ins",
    url: "/team/checkins",
    icon: HeartHandshake,
  },
  {
    title: "Peer Insights",
    url: "/team/insights",
    icon: Brain,
  },
];
