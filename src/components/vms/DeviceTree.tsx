import { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight, Video, Circle } from 'lucide-react'
import { mockCameras } from '@/data/mockData'
import { Camera } from '@/types'
import { cn } from '@/utils/cn'

interface DeviceTreeProps {
  onCameraSelect: (camera: Camera) => void
}

/**
 * VMS-02: 设备树组件
 * 展示所有摄像机的树状结构,支持拖拽
 */
export default function DeviceTree({ onCameraSelect }: DeviceTreeProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['一楼', '二楼', '三楼', '室外']))

  // 按组分类摄像机
  const groupedCameras = useMemo(() => {
    const groups: Record<string, Camera[]> = {}
    mockCameras.forEach(camera => {
      const group = camera.group || '未分组'
      if (!groups[group]) {
        groups[group] = []
      }
      groups[group].push(camera)
    })
    return groups
  }, [])

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(group)) {
      newExpanded.delete(group)
    } else {
      newExpanded.add(group)
    }
    setExpandedGroups(newExpanded)
  }

  const handleDragStart = (e: React.DragEvent, camera: Camera) => {
    e.dataTransfer.setData('camera', JSON.stringify(camera))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const getStatusColor = (status: Camera['status']) => {
    switch (status) {
      case 'online': return 'text-green-500'
      case 'offline': return 'text-gray-500'
      case 'error': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusText = (status: Camera['status']) => {
    switch (status) {
      case 'online': return '在线'
      case 'offline': return '离线'
      case 'error': return '故障'
      default: return '未知'
    }
  }

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* 标题栏 */}
      <div className="h-12 flex items-center px-4 border-b border-gray-800">
        <Video className="w-5 h-5 text-blue-500 mr-2" />
        <span className="text-white font-semibold">设备列表</span>
      </div>

      {/* 设备树内容 */}
      <div className="flex-1 overflow-y-auto p-2">
        {Object.entries(groupedCameras).map(([group, cameras]) => {
          const isExpanded = expandedGroups.has(group)
          
          return (
            <div key={group} className="mb-2">
              {/* 分组标题 */}
              <button
                onClick={() => toggleGroup(group)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-800 transition-colors text-gray-300"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="font-medium">{group}</span>
                <span className="text-xs text-gray-500 ml-auto">({cameras.length})</span>
              </button>

              {/* 摄像机列表 */}
              {isExpanded && (
                <div className="ml-4 mt-1">
                  {cameras.map(camera => (
                    <div
                      key={camera.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, camera)}
                      onClick={() => onCameraSelect(camera)}
                      className={cn(
                        'flex items-center gap-2 px-2 py-1.5 rounded cursor-move',
                        'hover:bg-gray-800 transition-colors group'
                      )}
                      title={`${camera.name} (${camera.ip})`}
                    >
                      <Circle className={cn('w-2 h-2 fill-current', getStatusColor(camera.status))} />
                      <Video className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-300 truncate">{camera.name}</div>
                        <div className="text-xs text-gray-500 truncate">{camera.ip}</div>
                      </div>
                      <span className={cn('text-xs', getStatusColor(camera.status))}>
                        {getStatusText(camera.status)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 统计信息 */}
      <div className="h-16 border-t border-gray-800 px-4 py-2">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-green-500 font-semibold">
              {mockCameras.filter(c => c.status === 'online').length}
            </div>
            <div className="text-gray-500">在线</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 font-semibold">
              {mockCameras.filter(c => c.status === 'offline').length}
            </div>
            <div className="text-gray-500">离线</div>
          </div>
          <div className="text-center">
            <div className="text-red-500 font-semibold">
              {mockCameras.filter(c => c.status === 'error').length}
            </div>
            <div className="text-gray-500">故障</div>
          </div>
        </div>
      </div>
    </div>
  )
}
