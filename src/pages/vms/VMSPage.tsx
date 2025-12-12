import { useState } from 'react'
import { Monitor, Play } from 'lucide-react'
import { cn } from '@/utils/cn'
import RealTimeMonitor from './RealTimeMonitor'
import PlaybackPanel from './PlaybackPanel'

/**
 * VMS 综合监控页面
 * 合并了实时监控和回放取证功能
 */
export default function VMSPage() {
  const [activeTab, setActiveTab] = useState<'realtime' | 'playback'>('realtime')

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">
      {/* 顶部 Tabs */}
      <div className="h-12 bg-gray-900 border-b border-gray-800 flex items-center px-4">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('realtime')}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              activeTab === 'realtime' 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
            )}
          >
            <Monitor className="w-4 h-4" />
            实时监控
          </button>
          <button
            onClick={() => setActiveTab('playback')}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              activeTab === 'playback' 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
            )}
          >
            <Play className="w-4 h-4" />
            回放取证
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden relative">
        {/* 使用 display: none 而不是条件渲染，以保持组件状态（如视频连接） */}
        <div className={cn("absolute inset-0 w-full h-full", activeTab === 'realtime' ? 'block' : 'hidden')}>
          <RealTimeMonitor />
        </div>
        <div className={cn("absolute inset-0 w-full h-full", activeTab === 'playback' ? 'block' : 'hidden')}>
          <PlaybackPanel />
        </div>
      </div>
    </div>
  )
}
