import {
  Home,
  Play,
  Puzzle,
  BarChart3,
  Settings,
  HelpCircle,
  Trophy,
  User,
  BookOpen,
  Bug,
  Smartphone,
  Layout,
} from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  icon: any;
  path?: string;
  children?: NavItem[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: Home,
    path: "/dashboard",
  },
  {
    id: "play",
    title: "Play",
    icon: Play,
    children: [
      {
        id: "vs-computer",
        title: "vs Computer",
        icon: Play,
        path: "/play/computer",
      },
      {
        id: "online",
        title: "Online Games",
        icon: Play,
        path: "/play/online",
      },
    ],
  },
  {
    id: "puzzles",
    title: "Puzzles",
    icon: Puzzle,
    children: [
      {
        id: "daily-puzzles",
        title: "Daily Puzzles",
        icon: Puzzle,
        path: "/puzzles/daily",
      },
      {
        id: "tactical",
        title: "Tactical",
        icon: Puzzle,
        path: "/puzzles/tactical",
      },
      {
        id: "endgame",
        title: "Endgame",
        icon: Puzzle,
        path: "/puzzles/endgame",
      },
    ],
  },
  {
    id: "progress",
    title: "Progress",
    icon: BarChart3,
    children: [
      {
        id: "overview",
        title: "Overview",
        icon: BarChart3,
        path: "/progress/overview",
      },
      {
        id: "achievements",
        title: "Achievements",
        icon: Trophy,
        path: "/progress/achievements",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    children: [
      {
        id: "preferences",
        title: "Preferences",
        icon: Settings,
        path: "/settings/preferences",
      },
      {
        id: "account",
        title: "Account",
        icon: User,
        path: "/settings/account",
      },
    ],
  },
  {
    id: "help",
    title: "Help",
    icon: HelpCircle,
    children: [
      {
        id: "tutorials",
        title: "Tutorials",
        icon: BookOpen,
        path: "/help/tutorials",
      },
      {
        id: "contact",
        title: "Contact",
        icon: HelpCircle,
        path: "/help/contact",
      },
    ],
  },
  {
    id: "debug",
    title: "Debug",
    icon: Bug,
    children: [
      {
        id: "responsive-chess-game",
        title: "Responsive Game",
        icon: Layout, 
        path: "/debug/responsive-chess-game"
      }
    ],
  },
];
