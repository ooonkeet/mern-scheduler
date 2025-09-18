import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Users,
  FileText,
  Settings
} from "lucide-react"
import { NavLink } from "react-router-dom"
// export default function Sidebar({ active }) {
  // const items = [
  //   { name: 'Universities', icon: BookOpen, path: '/universities' },
  //   { name: 'Programs', icon: Users, path: '/programs' },
  //   { name: 'Streams', icon: FileText, path: '/streams' },
  //   { name: 'Sections', icon: UserCheck, path: '/sections' },
  //   { name: 'Subjects', icon: BookOpen, path: '/subjects' },
  //   { name: 'Class Settings', icon: FileText, path: '/class-settings' },
  // ];
  const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Universities", icon: BookOpen, path: "/universities" },
  { name: "Programs", icon: Layers, path: "/programs" },
  { name: "Streams", icon: Users, path: "/streams" },
  { name: "Sections", icon: FileText, path: "/sections" },
  { name: "Subjects", icon: BookOpen, path: "/subjects" },
  { name: "Class Settings", icon: Settings, path: "/class-settings" }
]
export default function Sidebar() {
  return (
    
    <aside className="fixed left-0 top-0 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-purple-200 to-purple-300 shadow-lg">
      <div className="p-4 text-xl font-bold flex items-center gap-2 text-purple-900">
      <LayoutDashboard className="w-6 h-6 text-purple-700" />
      <span>Admin Panel</span>
    </div>

      <nav className="mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-purple-300 text-purple-900 font-semibold"
                  : "text-purple-700 hover:bg-purple-200"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? "text-purple-900" : "text-purple-600"
                  }`}
                />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
