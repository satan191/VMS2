import { useState, useRef, useEffect } from 'react'
import { RecordingSegment, AlarmEvent } from '@/types'
import { cn } from '@/utils/cn'

interface TimelineControlProps {
  currentTime: number // 0-24
  onTimeChange: (time: number) => void
  recordings: RecordingSegment[]
  alarms: AlarmEvent[]
  onSelectRange?: (start: number, end: number) => void
}

/**
 * VMS-07: 录像时间轴控制组件
 * 显示24小时时间刻度、录像片段、告警事件
 */
export default function TimelineControl({
  currentTime,
  onTimeChange,
  recordings,
  alarms,
  onSelectRange
}: TimelineControlProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectionStart, setSelectionStart] = useState<number | null>(null)
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const getRecordingColor = (type: RecordingSegment['type']) => {
    switch (type) {
      case 'continuous': return 'bg-green-600'
      case 'event': return 'bg-red-600'
      case 'motion': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const getAlarmColor = (type: AlarmEvent['type']) => {
    switch (type) {
      case 'motion': return 'bg-yellow-500'
      case 'line_cross': return 'bg-red-500'
      case 'intrusion': return 'bg-orange-500'
      case 'face': return 'bg-blue-500'
      case 'vehicle': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return
    const rect = timelineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const time = (x / rect.width) * 24
    setSelectionStart(time)
    setSelectionEnd(time)
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return
    const rect = timelineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const time = Math.max(0, Math.min(24, (x / rect.width) * 24))
    setSelectionEnd(time)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (selectionStart !== null && selectionEnd !== null && onSelectRange) {
      const start = Math.min(selectionStart, selectionEnd)
      const end = Math.max(selectionStart, selectionEnd)
      onSelectRange(Math.floor(start), Math.ceil(end))
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return
    const rect = timelineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const time = (x / rect.width) * 24
    onTimeChange(time)
  }

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => setIsDragging(false)
      window.addEventListener('mouseup', handleGlobalMouseUp)
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging])

  return (
    <div className="p-4">
      {/* 时间刻度 */}
      <div className="flex justify-between mb-2 text-xs text-gray-500">
        {Array.from({ length: 25 }, (_, i) => (
          <span key={i} className="flex-1 text-center">
            {i < 24 ? `${i.toString().padStart(2, '0')}:00` : ''}
          </span>
        ))}
      </div>

      {/* 时间轴主体 */}
      <div
        ref={timelineRef}
        className="relative h-24 bg-gray-800 rounded cursor-pointer"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* 录像片段 */}
        <div className="absolute inset-0 flex items-center">
          {recordings.map((recording, index) => {
            const start = recording.startTime.getHours() + recording.startTime.getMinutes() / 60
            const end = recording.endTime.getHours() + recording.endTime.getMinutes() / 60
            const left = (start / 24) * 100
            const width = ((end - start) / 24) * 100

            return (
              <div
                key={index}
                className={cn(
                  'absolute h-8 rounded opacity-80',
                  getRecordingColor(recording.type)
                )}
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
                title={`${recording.type} - ${recording.startTime.toLocaleTimeString()} ~ ${recording.endTime.toLocaleTimeString()}`}
              />
            )
          })}
        </div>

        {/* 告警标记 */}
        <div className="absolute inset-0">
          {alarms.map((alarm, index) => {
            const time = alarm.timestamp.getHours() + alarm.timestamp.getMinutes() / 60
            const left = (time / 24) * 100

            return (
              <div
                key={index}
                className={cn(
                  'absolute w-1 h-full',
                  getAlarmColor(alarm.type)
                )}
                style={{ left: `${left}%` }}
                title={`${alarm.type} - ${alarm.timestamp.toLocaleTimeString()}`}
              />
            )
          })}
        </div>

        {/* 选择范围 */}
        {selectionStart !== null && selectionEnd !== null && (
          <div
            className="absolute h-full bg-blue-500 opacity-30 border-2 border-blue-400"
            style={{
              left: `${(Math.min(selectionStart, selectionEnd) / 24) * 100}%`,
              width: `${(Math.abs(selectionEnd - selectionStart) / 24) * 100}%`
            }}
          />
        )}

        {/* 当前时间指示器 */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
          style={{ left: `${(currentTime / 24) * 100}%` }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full" />
        </div>

        {/* 时间刻度线 */}
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gray-700"
            style={{ left: `${(i / 24) * 100}%` }}
          />
        ))}
      </div>

      {/* 图例 */}
      <div className="flex items-center gap-6 mt-3 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 bg-green-600 rounded" />
          <span>连续录像</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 bg-red-600 rounded" />
          <span>事件录像</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 bg-yellow-600 rounded" />
          <span>移动录像</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-red-500" />
          <span>告警事件</span>
        </div>
      </div>
    </div>
  )
}
