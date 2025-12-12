import { Outlet, Link, useLocation } from 'react-router-dom'
import { Play, AlertTriangle, Settings, LayoutDashboard, FileText, Monitor } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * VMS 客户端主布局组件
 * 包含顶部导航栏和内容区域
 * 整合了DMS功能：资产总览、日志维护
 */
export default function VMSLayout() {
  const location = useLocation()

  const navItems = [
    { path: '/vms/real-time', label: '实时监控', icon: Monitor },
    { path: '/vms/playback', label: '回放取证', icon: Play },
    { path: '/vms/alarms', label: '告警管理', icon: AlertTriangle },
    { path: '/vms/dashboard', label: '设备管理', icon: LayoutDashboard },
    { path: '/vms/logs', label: '日志', icon: FileText },
    { path: '/vms/settings', label: '系统设置', icon: Settings },
  ]

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      {/* VMS-01: 顶部导航栏 */}
      <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6 relative z-50">
        <div className="flex items-center gap-3 mr-8">
          <img 
            src="/logo.png" 
            alt="BQ-Pro Logo" 
            className="h-8 w-auto"
            onError={(e) => {
              // 如果logo.png不存在，尝试加载logo.svg
              const target = e.target as HTMLImageElement;
              if (target.src.endsWith('.png')) {
                target.src = '/logo.svg';
              }
            }}
          />
          <span className="text-xl font-bold text-white">BQ-Pro VMS</span>
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
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {new Date().toLocaleString('zh-CN')}
          </span>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
