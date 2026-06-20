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
  Menu,
  PanelLeftClose,
  PanelRightOpen,
  PlusCircle,
  Repeat,
  Settings,
  Star,
  Type,
  User,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
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
  SidebarRail,
  SidebarSeparator,
  useSidebar,
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
  | "portfolio"
  | "visualAssets"
  | "marquee"
  | "contact";

interface AdminSidebarProps {
  activeTab: AdminTabId;
  onSelect: (tab: AdminTabId) => void;
  onLogout: () => void;
  children?: ReactNode | ((controls: { mobileMenuButton: ReactNode }) => ReactNode);
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
  {
    id: "portfolio",
    label: "Portfolio Sections",
    description: "Edit the portfolio section headings and card collections.",
    icon: LayoutGrid,
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
  {
    id: "visualAssets",
    label: "Visual Assets",
    description: "Edit portfolio image cards and gallery captions.",
    icon: LayoutGrid,
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
  const { isMobile, setOpenMobile } = useSidebar();

  function handleSelect() {
    onSelect(id);
    if (isMobile) setOpenMobile(false);
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={handleSelect}
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
    <SidebarGroup className="px-2 pt-2 group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Search CMS</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarInput
          placeholder="Find editor"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="border-sidebar-border bg-background text-foreground placeholder:text-muted-foreground"
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
    <SidebarGroup className="px-2 pt-4 group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Quick actions</SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="grid gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              onClick={() => onSelect(action.tab)}
              className="justify-start border-sidebar-border bg-transparent text-xs text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
    <div className="overflow-hidden rounded-2xl border border-sidebar-border bg-card p-3 text-card-foreground group-data-[collapsible=icon]:rounded-lg group-data-[collapsible=icon]:border-transparent group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0">
      <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
        <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-sidebar-border bg-background p-1 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:rounded-lg">
          <img src={logo} alt="AlphaNexis" className="h-full w-full object-contain" />
        </div>
        <div className="min-w-0 group-data-[collapsible=icon]:hidden">
          <p className="text-sm font-semibold">Alphanexis Admin</p>
          <p className="text-xs text-muted-foreground">Portfolio control</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 group-data-[collapsible=icon]:hidden">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View site
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-3 py-2 text-xs font-medium text-foreground hover:bg-muted"
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

function AdminSidebarToggle() {
  const { state, toggleSidebar, isMobile, openMobile } = useSidebar();
  const collapsed = isMobile ? !openMobile : state === "collapsed";
  const Icon = collapsed ? PanelRightOpen : PanelLeftClose;

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="relative z-30 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sidebar-border bg-sidebar-accent/70 text-sidebar-foreground shadow-sm transition hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 group-data-[collapsible=icon]:mx-auto"
      aria-label={collapsed ? "Open sidebar" : "Collapse sidebar"}
      title={collapsed ? "Open sidebar" : "Collapse sidebar"}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
function MobileSidebarOpenButton() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <button
      type="button"
      onClick={() => setOpenMobile(true)}
      disabled={openMobile}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-foreground shadow-sm transition hover:bg-muted disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:hidden"
      aria-label="Open admin sidebar"
      title="Open sidebar"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
function AdminSidebarLayout({ activeTab, onSelect, onLogout, children }: AdminSidebarProps) {
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
    <>
      <Sidebar className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground" collapsible="icon">
        <SidebarHeader className="flex min-h-16 items-center justify-between gap-3 overflow-hidden border-b border-sidebar-border px-4 py-4 group-data-[collapsible=icon]:min-h-16 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-3">
          <div className="flex min-w-0 items-center gap-3 group-data-[collapsible=icon]:hidden">
            <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-sidebar-border bg-background p-1">
              <img src={logo} alt="AlphaNexis" className="h-full w-full object-contain" />
            </span>
            <span className="min-w-0 space-y-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">CMS Console</p>
              <p className="truncate font-display text-base font-semibold">Alphanexis Studio</p>
            </span>
          </div>
          <AdminSidebarToggle />
        </SidebarHeader>
        <SidebarRail className="after:bg-sidebar-border/60 hover:after:bg-accent" />

        <SidebarContent className="px-0 pb-4 pt-3">
          <SidebarSearch value={search} onChange={setSearch} />
          <SidebarSeparator />

          {filteredGroups.length === 0 ? (
            <div className="p-4 text-xs text-muted-foreground">No matching sections.</div>
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

        <SidebarFooter className="px-3 pb-4 pt-4 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:pb-3 group-data-[collapsible=icon]:pt-2">
          <UserPanel onLogout={onLogout} />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-background p-0 text-foreground">
        {typeof children === "function" ? children({ mobileMenuButton: <MobileSidebarOpenButton /> }) : children}
      </SidebarInset>
    </>
  );
}









export function AdminSidebar(props: AdminSidebarProps) {
  return (
    <SidebarProvider defaultOpen>
      <AdminSidebarLayout {...props} />
    </SidebarProvider>
  );
}


