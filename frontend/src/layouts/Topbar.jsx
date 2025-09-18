"use client"

export default function Topbar({ activeSection }) {
  const getSectionTitle = () => {
    switch (activeSection) {
      case "programs":
        return "Program Management"
      case "classSettings":
        return "Class Settings Management"
      default:
        return "Admin Dashboard"
    }
  }

  return (
    <div className="h-12 bg-muted border-b border-border flex items-center justify-center">
      <h2 className="text-lg font-semibold text-foreground">{getSectionTitle()}</h2>
    </div>
  )
}
