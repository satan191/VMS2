import { Outlet, Link, useLocation } from 'react-router-dom'
import { Server, LayoutDashboard, FileText, Settings } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * DMS 设备管理系统主布局组件
 * 包含顶部导航栏和内容区域
 */
export default function DMSLayout() {
  const location = useLocation()

  const navItems = [
    { path: '/dms/dashboard', label: '资产总览', icon: LayoutDashboard },
    { path: '/dms/logs', label: '日志维护', icon: FileText },
    { path: '/dms/settings', label: '系统配置', icon: Settings },
  ]

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* 顶部导航栏 */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
        <div className="flex items-center gap-2 mr-8">
          <Server className="w-6 h-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">BQ-Pro DMS</span>
        </div>
        
        <nav className="flex gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleString('zh-CN')}
          </span>
          <Link
            to="/vms/real-time"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            切换到 VMS →
          </Link>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
