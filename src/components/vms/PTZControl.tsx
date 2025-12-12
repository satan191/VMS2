import { useState } from 'react'
import { ZoomIn, ZoomOut, Focus, BookmarkPlus, MapPin } from 'lucide-react'
import { Camera, PTZPreset } from '@/types'
import { cn } from '@/utils/cn'

interface PTZControlProps {
  camera: Camera
}

/**
 * VMS-05: PTZ 云台控制面板
 * 提供方向控制、变倍、预置位功能
 */
export default function PTZControl({ camera }: PTZControlProps) {
  const [activePreset, setActivePreset] = useState<number | null>(null)
  const [showAddPreset, setShowAddPreset] = useState(false)
  const [newPresetName, setNewPresetName] = useState('')

  // 模拟预置位数据
  const [presets, setPresets] = useState<PTZPreset[]>([
    { id: 1, name: '大门入口', position: { pan: 0, tilt: 0, zoom: 1 } },
    { id: 2, name: '停车位A', position: { pan: 45, tilt: -15, zoom: 2 } },
    { id: 3, name: '通道全景', position: { pan: 90, tilt: 0, zoom: 1 } },
  ])

  const handlePTZControl = (direction: string) => {
    console.log(`PTZ 控制: ${direction}`, camera.id)
    // 实际应用中这里会调用 API 控制云台
  }

  const handleZoom = (type: 'in' | 'out') => {
    console.log(`变倍: ${type}`, camera.id)
  }

  const handlePresetGo = (preset: PTZPreset) => {
    setActivePreset(preset.id)
    console.log('调用预置位:', preset)
    // 实际应用中这里会调用 API 移动到预置位
  }

  const handleAddPreset = () => {
    if (newPresetName.trim()) {
      const newPreset: PTZPreset = {
        id: presets.length + 1,
        name: newPresetName.trim(),
        position: { pan: 0, tilt: 0, zoom: 1 }
      }
      setPresets([...presets, newPreset])
      setNewPresetName('')
      setShowAddPreset(false)
    }
  }

  return (
    <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
      {/* 标题栏 */}
      <div className="h-12 flex items-center px-4 border-b border-gray-800">
        <MapPin className="w-5 h-5 text-blue-500 mr-2" />
        <span className="text-white font-semibold">PTZ 控制</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* 方向控制盘 */}
        <div>
          <div className="text-sm text-gray-400 mb-3">方向控制</div>
          <div className="relative w-48 h-48 mx-auto">
            {/* 圆形底盘 */}
            <div className="absolute inset-0 bg-gray-800 rounded-full border-2 border-gray-700" />
            
            {/* 中心按钮 */}
            <button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              onClick={() => handlePTZControl('center')}
            >
              <Focus className="w-5 h-5 text-gray-400 mx-auto" />
            </button>

            {/* 上 */}
            <button
              className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors"
              onMouseDown={() => handlePTZControl('up')}
              aria-label="向上"
            >
              <span className="text-white">↑</span>
            </button>

            {/* 下 */}
            <button
              className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors"
              onMouseDown={() => handlePTZControl('down')}
              aria-label="向下"
            >
              <span className="text-white">↓</span>
            </button>

            {/* 左 */}
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors"
              onMouseDown={() => handlePTZControl('left')}
              aria-label="向左"
            >
              <span className="text-white">←</span>
            </button>

            {/* 右 */}
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors"
              onMouseDown={() => handlePTZControl('right')}
              aria-label="向右"
            >
              <span className="text-white">→</span>
            </button>

            {/* 左上 */}
            <button
              className="absolute top-6 left-6 w-8 h-8 bg-blue-700 hover:bg-blue-600 rounded-full transition-colors"
              onMouseDown={() => handlePTZControl('up-left')}
              aria-label="左上"
            >
              <span className="text-white text-xs">↖</span>
            </button>

            {/* 右上 */}
            <button
              className="absolute top-6 right-6 w-8 h-8 bg-blue-700 hover:bg-blue-600 rounded-full transition-colors"
              onMouseDown={() => handlePTZControl('up-right')}
              aria-label="右上"
            >
              <span className="text-white text-xs">↗</span>
            </button>

            {/* 左下 */}
            <button
              className="absolute bottom-6 left-6 w-8 h-8 bg-blue-700 hover:bg-blue-600 rounded-full transition-colors"
              onMouseDown={() => handlePTZControl('down-left')}
              aria-label="左下"
            >
              <span className="text-white text-xs">↙</span>
            </button>

            {/* 右下 */}
            <button
              className="absolute bottom-6 right-6 w-8 h-8 bg-blue-700 hover:bg-blue-600 rounded-full transition-colors"
              onMouseDown={() => handlePTZControl('down-right')}
              aria-label="右下"
            >
              <span className="text-white text-xs">↘</span>
            </button>
          </div>
        </div>

        {/* 变倍控制 */}
        <div>
          <div className="text-sm text-gray-400 mb-3">变倍控制</div>
          <div className="flex gap-2">
            <button
              onMouseDown={() => handleZoom('in')}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ZoomIn className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-300">放大</span>
            </button>
            <button
              onMouseDown={() => handleZoom('out')}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ZoomOut className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-300">缩小</span>
            </button>
          </div>
        </div>

        {/* 预置位 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">预置位</span>
            <button
              onClick={() => setShowAddPreset(!showAddPreset)}
              className="text-xs text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <BookmarkPlus className="w-3 h-3" />
              添加
            </button>
          </div>

          {/* 添加预置位表单 */}
          {showAddPreset && (
            <div className="mb-3 p-3 bg-gray-800 rounded-lg">
              <input
                type="text"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                placeholder="预置位名称"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddPreset()}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleAddPreset}
                  className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs text-white transition-colors"
                >
                  确定
                </button>
                <button
                  onClick={() => {
                    setShowAddPreset(false)
                    setNewPresetName('')
                  }}
                  className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {/* 预置位列表 */}
          <div className="space-y-2">
            {presets.map(preset => (
              <button
                key={preset.id}
                onClick={() => handlePresetGo(preset)}
                className={cn(
                  'w-full px-3 py-2 rounded-lg text-sm text-left transition-colors',
                  activePreset === preset.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{preset.name}</span>
                  <span className="text-xs opacity-70">#{preset.id}</span>
                </div>
              </button>
            ))}
          </div>

          {presets.length === 0 && (
            <div className="text-center py-8 text-sm text-gray-500">
              暂无预置位
            </div>
          )}
        </div>
      </div>

      {/* 底部信息 */}
      <div className="h-12 border-t border-gray-800 px-4 flex items-center">
        <div className="text-xs text-gray-500">
          <span className="font-medium text-gray-400">{camera.name}</span>
        </div>
      </div>
    </div>
  )
}
