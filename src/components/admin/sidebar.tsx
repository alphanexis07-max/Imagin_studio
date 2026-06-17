import { type ComponentType, type ReactNode, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  Briefcase,
  ExternalLink,
  Film,
  LayoutGrid,
  Mail,
  PlusCircle,
  Repeat,
  Settings,
  Star,
  Type,
  User,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export type AdminTabId =
  | "reels"
  | "site"
  | "capabilities"
  | "process"
  | "cases"
  | "engagements"
  | "testimonials"
  | "stats"
  | "marquee"
  | "contact";

interface AdminSidebarProps {
  activeTab: AdminTabId;
  onSelect: (tab: AdminTabId) => void;
  onLogout: () => void;
  children?: ReactNode;
}

interface SidebarItemProps {
  id: AdminTabId;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

const CONTENT_ITEMS: SidebarItemProps[] = [
  {
    id: "reels",
    label: "Film Reels",
    description: "Manage the video reel library and playback showcase.",
    icon: Film,
  },
  {
    id: "site",
    label: "Hero & Site",
    description: "Update landing hero, about, and brand content.",
    icon: Settings,
  },
];

const COLLECTION_ITEMS: SidebarItemProps[] = [
  {
    id: "capabilities",
    label: "Capabilities",
    description: "Edit feature cards, metrics, and positioning.",
    icon: LayoutGrid,
  },
  {
    id: "process",
    label: "Process",
    description: "Shape the service workflow and delivery milestones.",
    icon: GitBranch,
  },
  {
    id: "cases",
    label: "Case Studies",
    description: "Curate case stories, outcomes, and sector tags.",
    icon: Briefcase,
  },
  {
    id: "engagements",
    label: "Engagements",
    description: "Adjust offerings, packages, and engagement details.",
    icon: Repeat,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Publish client quotes and social proof.",
    icon: Star,
  },
  {
    id: "stats",
    label: "Stats",
    description: "Maintain brand performance counters and KPIs.",
    icon: BarChart2,
  },
];

const SUPPORT_ITEMS: SidebarItemProps[] = [
  {
    id: "marquee",
    label: "Marquee",
    description: "Edit the animated marquee messaging.",
    icon: Type,
  },
  {
    id: "contact",
    label: "Contact & Footer",
    description: "Update contact details and footer copy.",
    icon: Mail,
  },
];

function SidebarItem({ id, label, description, icon: Icon, active, onSelect }: SidebarItemProps & { active: boolean; onSelect: (tab: AdminTabId) => void }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => onSelect(id)}
        isActive={active}
        tooltip={description}
        className="justify-start"
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SidebarSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <SidebarGroup className="px-2 pt-2">
      <SidebarGroupLabel>Search CMS</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarInput
          placeholder="Find editor"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="border-white/15 bg-[#0f172a]/90 text-cream placeholder:text-cream/50"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function QuickActions({ onSelect }: { onSelect: (tab: AdminTabId) => void }) {
  const actions = [
    { label: "Add Reel", icon: PlusCircle, tab: "reels" as const },
    { label: "Hero Setup", icon: ArrowRight, tab: "site" as const },
    { label: "Proof Points", icon: Star, tab: "testimonials" as const },
  ];

  return (
    <SidebarGroup className="px-2 pt-4">
      <SidebarGroupLabel>Quick actions</SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="grid gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => onSelect(action.tab)}
              className="justify-start text-xs text-cream"
            >
              <action.icon className="h-3.5 w-3.5" />
              {action.label}
            </Button>
          ))}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function UserPanel({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cream text-ink font-display text-base font-semibold">
          A
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">Alphanexis Admin</p>
          <p className="text-xs text-cream/70">Enterprise control</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0f172a]/80 px-3 py-2 text-xs font-medium text-cream hover:bg-white/5"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View site
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-xs font-medium text-cream hover:bg-white/5"
        >
          <User className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </div>
  );
}

function CarouselNavigationGroup({ activeTab, onSelect }: { activeTab: AdminTabId; onSelect: (tab: AdminTabId) => void }) {
  const items: SidebarItemProps[] = [
    {
      id: "reels",
      label: "Film Reels",
      description: "Manage the animated reel carousel feed.",
      icon: Film,
    },
    {
      id: "cases",
      label: "Case Studies",
      description: "Organize case story cards and storytelling stacks.",
      icon: Briefcase,
    },
  ];

  return (
    <SidebarGroup className="px-2 pt-4">
      <SidebarGroupLabel>Carousel navigation</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              {...item}
              active={activeTab === item.id}
              onSelect={onSelect}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AdminSidebar({ activeTab, onSelect, onLogout, children }: AdminSidebarProps) {
  const [search, setSearch] = useState("");

  const groups = useMemo(
    () => [
      { label: "Content", items: CONTENT_ITEMS },
      { label: "Collections", items: COLLECTION_ITEMS },
      { label: "Support", items: SUPPORT_ITEMS },
    ],
    [],
  );

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return groups;

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.label.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, search]);

  return (
    <SidebarProvider defaultOpen>
      <Sidebar className="bg-[#020617] text-cream" collapsible="icon">
        <SidebarHeader className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.35em] text-cream/60">CMS Console</p>
            <p className="font-display text-base font-semibold">Alphanexis Studio</p>
          </div>
          <SidebarTrigger />
        </SidebarHeader>

        <SidebarContent className="px-0 pb-4 pt-3">
          <SidebarSearch value={search} onChange={setSearch} />
          <SidebarSeparator />

          {filteredGroups.length === 0 ? (
            <div className="p-4 text-xs text-cream/60">No matching sections.</div>
          ) : (
            filteredGroups.map((group) => (
              <SidebarGroup key={group.label} className="px-2 pt-4">
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarItem
                        key={item.id}
                        {...item}
                        active={activeTab === item.id}
                        onSelect={onSelect}
                      />
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          )}

          <CarouselNavigationGroup activeTab={activeTab} onSelect={onSelect} />
          <QuickActions onSelect={onSelect} />
        </SidebarContent>

        <SidebarFooter className="px-3 pb-4 pt-4">
          <UserPanel onLogout={onLogout} />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-background p-0">{children}</SidebarInset>
    </SidebarProvider>
  );
}
