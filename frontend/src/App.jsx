import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/layouts/Navbar';
import Sidebar from '@/layouts/Sidebar';
import Topbar from '@/layouts/Topbar';

// Import your pages
import Universities from './pages/Universities';
import Programs from './pages/programPage';
import Streams from './pages/Streams';
import Sections from './pages/Sections';
import Subjects from './pages/Subjects';
import ClassSettings from './pages/ClassSettings';
//import Streams from './pages/Streams';
//import Sections from './pages/Sections';
//import Subjects from './pages/Subjects';
//import ClassSettings from './pages/ClassSettings';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex flex-col bg-background text-foreground bg-cover bg-fixed">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar on the left */}
          <aside className="w-64 border-r border-sidebar-border bg-sidebar backdrop-blur-lg">
            <Sidebar />
          </aside>

          {/* Right side: Topbar + Main content */}
          <div className="flex-1 flex flex-col">
            <Topbar className="w-full border-b border-sidebar-border bg-sidebar backdrop-blur-lg"/>
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
                      <div className="rounded-2xl bg-card text-card-foreground shadow p-6">
                        <h2 className="text-lg font-semibold">Welcome 👋</h2>
                        <p className="text-sm text-muted-foreground mt-2">
                          to the admin dashboard. Use the sidebar to
                          navigate through different sections.
                        </p>
                      </div>
                    </div>} />
                <Route path="/universities" element={<Universities />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/streams" element={<Streams/>} />
                <Route path="/sections" element={<Sections/>} />
                <Route path="/subjects" element={<Subjects/>} />
                <Route path="/class-settings" element={<ClassSettings/>} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
