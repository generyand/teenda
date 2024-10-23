import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: ShoppingBasket,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: FileText,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setOpen && setOpen(false);
  };

  return (
    <nav className="flex flex-col gap-1 mt-8">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;
        return (
          <button
            key={menuItem.id}
            onClick={() => handleNavigation(menuItem.path)}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <menuItem.icon size={20} />
            <span>{menuItem.label}</span>
            {isActive && <ChevronRight size={16} className="ml-auto" />}
          </button>
        );
      })}
    </nav>
  );
};

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b">
              <SheetTitle asChild>
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="flex items-center gap-2 text-left"
                >
                  <ChartNoAxesCombined size={24} />
                  <span className="text-xl font-bold">Admin Panel</span>
                </button>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 px-3 py-4 overflow-auto">
              <MenuItems setOpen={setOpen} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="flex-col hidden w-64 border-r lg:flex bg-background">
        <div className="p-4 border-b">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-xl font-bold"
          >
            <ChartNoAxesCombined size={24} />
            <span>Admin Panel</span>
          </button>
        </div>
        <div className="flex-1 px-3 py-4 overflow-auto">
          <MenuItems />
        </div>
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
