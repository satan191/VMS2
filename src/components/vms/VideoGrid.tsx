import { useState } from 'react'
import { Maximize2, Grid3x3, LayoutGrid, MonitorPlay, Video } from 'lucide-react'
import { Camera, VideoLayout, StreamType } from '@/types'
import { cn } from '@/utils/cn'

interface VideoGridProps {
  cameras: (Camera | null)[]
  layout: VideoLayout
  onLayoutChange: (layout: VideoLayout) => void
  onCameraDrop: (camera: Camera, gridIndex: number) => void
  onCameraSelect: (camera: Camera | null) => void
  selectedCamera: Camera | null
}

/**
 * VMS-03: 视频播放区组件
 * 支持 1/4/9/16 画面布局切换、拖拽、双击全屏、双码流切换
 */
export default function VideoGrid({
  cameras,
  layout,
  onLayoutChange,
  onCameraDrop,
  onCameraSelect,
  selectedCamera
}: VideoGridProps) {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)
  const [streamTypes, setStreamTypes] = useState<Record<number, StreamType>>({})

  const layouts: { value: VideoLayout; icon: typeof Grid3x3; label: string }[] = [
    { value: 1, icon: MonitorPlay, label: '单画面' },
    { value: 4, icon: LayoutGrid, label: '4画面' },
    { value: 9, icon: Grid3x3, label: '9画面' },
    { value: 16, icon: Grid3x3, label: '16画面' },
  ]

  const gridClass = {
    1: 'grid-cols-1 grid-rows-1',
    4: 'grid-cols-2 grid-rows-2',
    9: 'grid-cols-3 grid-rows-3',
    16: 'grid-cols-4 grid-rows-4',
  }

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    const cameraData = e.dataTransfer.getData('camera')
    if (cameraData) {
      const camera = JSON.parse(cameraData) as Camera
      onCameraDrop(camera, index)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDoubleClick = (index: number) => {
    if (fullscreenIndex === index) {
      setFullscreenIndex(null)
    } else {
      setFullscreenIndex(index)
    }
  }

  const toggleStreamType = (index: number) => {
    setStreamTypes(prev => ({
      ...prev,
      [index]: prev[index] === 'sub' ? 'main' : 'sub'
    }))
  }

  const getStreamType = (index: number): StreamType => {
    return streamTypes[index] || 'main'
  }

  const visibleCount = fullscreenIndex !== null ? 1 : layout

  return (
    <div className="flex-1 flex flex-col bg-gray-950">
      {/* 工具栏 */}
      <div className="h-12 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">布局:</span>
          {layouts.map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => onLayoutChange(value)}
              className={cn(
                'p-2 rounded transition-colors',
                layout === value
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )}
              title={label}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="ml-auto text-sm text-gray-400">
          拖拽摄像机到窗口开始播放
        </div>
      </div>

      {/* 视频网格 */}
      <div className="flex-1 p-2">
        <div 
          className={cn(
            'grid gap-2 h-full',
            fullscreenIndex !== null ? 'grid-cols-1 grid-rows-1' : gridClass[layout]
          )}
        >
          {Array.from({ length: visibleCount }).map((_, index) => {
            const actualIndex = fullscreenIndex !== null ? fullscreenIndex : index
            const camera = cameras[actualIndex]
            const isSelected = selectedCamera?.id === camera?.id
            const streamType = getStreamType(actualIndex)

            return (
              <div
                key={actualIndex}
                onDrop={(e) => handleDrop(e, actualIndex)}
                onDragOver={handleDragOver}
                onClick={() => onCameraSelect(camera)}
                onDoubleClick={() => handleDoubleClick(actualIndex)}
                className={cn(
                  'relative bg-gray-900 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer',
                  isSelected ? 'border-blue-500' : 'border-gray-800 hover:border-gray-700'
                )}
              >
                {camera ? (
                  <>
                    {/* 模拟视频画面 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <MonitorPlay className="w-16 h-16 mx-auto mb-2" />
                        <div className="text-sm">视频流播放中...</div>
                        <div className="text-xs mt-1">{camera.name}</div>
                      </div>
                    </div>

                    {/* OSD 信息 */}
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-white font-medium text-sm">{camera.name}</div>
                          <div className="text-gray-300 text-xs mt-0.5">
                            {camera.resolution} | {streamType === 'main' ? '主码流' : '子码流'}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={cn(
                            'w-2 h-2 rounded-full',
                            camera.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                          )} />
                        </div>
                      </div>
                    </div>

                    {/* 底部控制栏 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleStreamType(actualIndex)
                          }}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800/80 hover:bg-gray-700 text-xs text-white transition-colors"
                        >
                          <Video className="w-3 h-3" />
                          {streamType === 'main' ? '切换流畅' : '切换高清'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDoubleClick(actualIndex)
                          }}
                          className="p-1 rounded bg-gray-800/80 hover:bg-gray-700 text-white transition-colors"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* 空窗口提示 */
                  <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-800">
                    <div className="text-center text-gray-600">
                      <div className="text-sm">窗口 {actualIndex + 1}</div>
                      <div className="text-xs mt-1">拖拽摄像机到此处</div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
