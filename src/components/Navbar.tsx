import { useState } from 'react';
import { Menu, X, FileText, Globe, Home, Network, Bot, BookOpen, FolderOpen, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/policy', label: '政策情报', icon: FileText },
  { path: '/sandbox', label: '沙盘推演', icon: Globe },
  { path: '/knowledge', label: '知识图谱', icon: Network },
];

const moreItems = [
  { path: '/agent', label: '智能推理', icon: Bot },
  { path: '/research', label: '政研报告', icon: BookOpen },
  { path: '/files', label: '文件管理', icon: FolderOpen }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const allItems = [...navItems, ...moreItems];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-800 hidden sm:block">能源政策情报系统</span>
          </a>

          <div className="hidden md:flex items-center">
            {navItems.map(item => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            ))}

            <div className="relative ml-2">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                  moreItems.some(item => location.pathname === item.path)
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>更多</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {moreItems.map(item => (
                    <a
                      key={item.path}
                      href={item.path}
                      onClick={() => setShowDropdown(false)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                        location.pathname === item.path
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden sm:flex md:hidden items-center gap-1">
            {allItems.map(item => (
              <a
                key={item.path}
                href={item.path}
                className={`p-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <button
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="sm:hidden py-3 border-t">
            {allItems.map(item => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}