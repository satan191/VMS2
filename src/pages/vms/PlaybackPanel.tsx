import { useState } from 'react'
import { Calendar, Download, Filter, Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { mockCameras, mockRecordings, mockAlarms } from '@/data/mockData'
import { Camera } from '@/types'
import { cn } from '@/utils/cn'
import TimelineControl from '@/components/vms/TimelineControl'

/**
 * VMS 回放与取证面板
 * VMS-06~VMS-09: 历史录像检索、回放和证据导出
 */
export default function PlaybackPanel() {
  const [selectedCamera, setSelectedCamera] = useState<Camera>(mockCameras[0])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // 0-24小时，单位：小时
  const [selectedAlarmTypes, setSelectedAlarmTypes] = useState<string[]>([])
  const [downloadStart, setDownloadStart] = useState<number | null>(null)
  const [downloadEnd, setDownloadEnd] = useState<number | null>(null)

  const alarmTypes = [
    { id: 'motion', label: '移动侦测', color: 'bg-yellow-500' },
    { id: 'line_cross', label: '越界报警', color: 'bg-red-500' },
    { id: 'intrusion', label: '区域入侵', color: 'bg-orange-500' },
    { id: 'face', label: '人脸识别', color: 'bg-blue-500' },
    { id: 'vehicle', label: '车辆检测', color: 'bg-green-500' },
  ]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeChange = (time: number) => {
    setCurrentTime(time)
  }

  const handleDownload = () => {
    if (downloadStart !== null && downloadEnd !== null) {
      console.log(`下载录像: ${downloadStart}:00 - ${downloadEnd}:00`)
      alert(`正在导出 ${downloadStart}:00 - ${downloadEnd}:00 的录像`)
    }
  }

  const toggleAlarmType = (typeId: string) => {
    setSelectedAlarmTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-950">
      {/* 顶部工具栏 */}
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6 gap-6">
        {/* VMS-06: 摄像机选择 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">摄像机:</span>
          <select
            value={selectedCamera.id}
            onChange={(e) => setSelectedCamera(mockCameras.find(c => c.id === e.target.value)!)}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-white focus:outline-none focus:border-blue-500"
          >
            {mockCameras.map(camera => (
              <option key={camera.id} value={camera.id}>
                {camera.name}
              </option>
            ))}
          </select>
        </div>

        {/* VMS-06: 日期选择 */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* VMS-09: 告警事件筛选 */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">筛选:</span>
          <div className="flex gap-2">
            {alarmTypes.map(type => (
              <button
                key={type.id}
                onClick={() => toggleAlarmType(type.id)}
                className={cn(
                  'px-2 py-1 rounded text-xs transition-colors',
                  selectedAlarmTypes.includes(type.id)
                    ? `${type.color} text-white`
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* 下载按钮 */}
        <button
          onClick={handleDownload}
          disabled={downloadStart === null || downloadEnd === null}
          className={cn(
            'ml-auto flex items-center gap-2 px-4 py-1.5 rounded transition-colors',
            downloadStart !== null && downloadEnd !== null
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-600 cursor-not-allowed'
          )}
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">导出录像</span>
        </button>
      </div>

      {/* 视频播放区 */}
      <div className="flex-1 p-4">
        <div className="h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-800 relative">
          {/* 模拟视频回放画面 */}
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center text-gray-600">
              <Play className="w-20 h-20 mx-auto mb-4" />
              <div className="text-lg font-medium">录像回放</div>
              <div className="text-sm mt-2">{selectedCamera.name}</div>
              <div className="text-xs mt-1">
                {selectedDate.toLocaleDateString('zh-CN')} {Math.floor(currentTime)}:00
              </div>
            </div>
          </div>

          {/* OSD 信息 */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 pointer-events-none">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-white font-medium">{selectedCamera.name}</div>
                <div className="text-gray-300 text-sm mt-1">
                  {selectedDate.toLocaleDateString('zh-CN')} {Math.floor(currentTime).toString().padStart(2, '0')}:
                  {Math.floor((currentTime % 1) * 60).toString().padStart(2, '0')}
                </div>
              </div>
              <div className="px-3 py-1 bg-red-600 rounded text-white text-xs font-medium">
                回放中
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VMS-07: 录像时间轴和播放控制 */}
      <div className="bg-gray-900 border-t border-gray-800">
        {/* 播放控制按钮 */}
        <div className="h-16 flex items-center justify-center gap-4 border-b border-gray-800">
          <button
            onClick={() => setCurrentTime(Math.max(0, currentTime - 1))}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={() => setCurrentTime(Math.min(24, currentTime + 1))}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
          <div className="ml-4 text-sm text-gray-400">
            速度: <span className="text-white">1x</span>
          </div>
        </div>

        {/* 时间轴组件 */}
        <TimelineControl
          currentTime={currentTime}
          onTimeChange={handleTimeChange}
          recordings={mockRecordings}
          alarms={mockAlarms.filter(alarm =>
            selectedAlarmTypes.length === 0 || selectedAlarmTypes.includes(alarm.type)
          )}
          onSelectRange={(start, end) => {
            setDownloadStart(start)
            setDownloadEnd(end)
          }}
        />
      </div>
    </div>
  )
}
