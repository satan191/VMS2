import { useState } from 'react'
import { AlertCircle, AlertTriangle, Bell, Check, Filter, Search, X } from 'lucide-react'
import { mockAlarms, mockCameras } from '@/data/mockData'
import { AlarmEvent } from '@/types'
import { cn } from '@/utils/cn'

/**
 * VMS 告警管理面板
 * VMS-10: 告警列表、筛选、处理功能
 */
export default function AlarmsPanel() {
  const [selectedAlarm, setSelectedAlarm] = useState<AlarmEvent | null>(null)
  const [filterType, setFilterType] = useState<string>('all')
  const [filterDeviceId, setFilterDeviceId] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  // 筛选告警
  const filteredAlarms = mockAlarms.filter(alarm => {
    if (filterType !== 'all' && alarm.type !== filterType) return false
    if (filterDeviceId && !alarm.cameraId.toLowerCase().includes(filterDeviceId.toLowerCase())) return false
    
    if (startTime) {
      const start = new Date(startTime)
      if (alarm.timestamp < start) return false
    }
    
    if (endTime) {
      const end = new Date(endTime)
      if (alarm.timestamp > end) return false
    }
    
    return true
  })

  const getAlarmIcon = (type: AlarmEvent['type']) => {
    switch (type) {
      case 'motion': return <AlertCircle className="w-4 h-4 text-blue-500" />
      case 'intrusion': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'line_cross': return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case 'face': return <Bell className="w-4 h-4 text-purple-500" />
      case 'vehicle': return <Bell className="w-4 h-4 text-green-500" />
    }
  }

  const getAlarmTypeName = (type: AlarmEvent['type']) => {
    switch (type) {
      case 'motion': return '移动侦测'
      case 'intrusion': return '区域入侵'
      case 'line_cross': return '越界侦测'
      case 'face': return '人脸识别'
      case 'vehicle': return '车辆识别'
    }
  }

  const handleAlarm = (alarmId: string) => {
    alert(`标记告警 ${alarmId} 为已处理`)
  }

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">
      {/* 顶部统计栏 */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">告警管理</h2>
          </div>
        </div>

        {/* 筛选区域 */}
        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="block text-sm text-gray-400 mb-1">设备ID</label>
            <div className="relative">
              <input
                type="text"
                value={filterDeviceId}
                onChange={(e) => setFilterDeviceId(e.target.value)}
                placeholder="输入设备ID..."
                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">告警类型</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            >
              <option value="all">全部类型</option>
              <option value="motion">移动侦测</option>
              <option value="intrusion">区域入侵</option>
              <option value="line_cross">越界侦测</option>
              <option value="face">人脸识别</option>
              <option value="vehicle">车辆识别</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">开始时间</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">结束时间</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            />
          </div>
        </div>
      </div>

      {/* 告警列表 (表格样式) */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full border border-gray-800 rounded-lg bg-gray-900 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800 sticky top-0">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">事件时间</th>
                <th className="px-6 py-3">设备ID</th>
                <th className="px-6 py-3">类型</th>
                <th className="px-6 py-3">状态</th>
                <th className="px-6 py-3">推送数</th>
                <th className="px-6 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredAlarms.map(alarm => (
                <tr 
                  key={alarm.id} 
                  className="hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => setSelectedAlarm(alarm)}
                >
                  <td className="px-6 py-4 font-mono text-gray-300">{alarm.id}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {alarm.timestamp.toLocaleString('zh-CN')}
                  </td>
                  <td className="px-6 py-4 text-gray-300 font-mono">{alarm.cameraId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getAlarmIcon(alarm.type)}
                      <span className="text-gray-300">{getAlarmTypeName(alarm.type)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {alarm.handled ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400 border border-green-800">
                        <Check className="w-3 h-3" />
                        已处理
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-red-900/30 text-red-400 border border-red-800">
                        <X className="w-3 h-3" />
                        未处理
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{alarm.pushCount}</td>
                  <td className="px-6 py-4">
                    {!alarm.handled && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAlarm(alarm.id)
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs transition-colors"
                      >
                        处理
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredAlarms.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Filter className="w-8 h-8 mb-2 opacity-50" />
                      没有找到匹配的告警记录
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 告警详情弹窗 */}
      {selectedAlarm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">告警详情</h3>
              <button
                onClick={() => setSelectedAlarm(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">告警ID</div>
                  <div className="text-base mt-1 font-mono">{selectedAlarm.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">告警类型</div>
                  <div className="text-base mt-1">{getAlarmTypeName(selectedAlarm.type)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">触发时间</div>
                  <div className="text-base mt-1">
                    {selectedAlarm.timestamp.toLocaleString('zh-CN')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">处理状态</div>
                  <div className="mt-1">
                    {selectedAlarm.handled ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded text-sm bg-green-900/30 text-green-400 border border-green-800">
                        <Check className="w-4 h-4" />
                        已处理
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded text-sm bg-red-900/30 text-red-400 border border-red-800">
                        <X className="w-4 h-4" />
                        未处理
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">触发设备ID</div>
                  <div className="text-base mt-1 font-mono">
                    {selectedAlarm.cameraId}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">设备名称</div>
                  <div className="text-base mt-1">
                     {mockCameras.find(c => c.id === selectedAlarm.cameraId)?.name || '未知设备'}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-400 mb-2">描述</div>
                <div className="bg-gray-800 p-3 rounded text-gray-200">
                  {selectedAlarm.description}
                </div>
              </div>

              {!selectedAlarm.handled && (
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                  <button
                    onClick={() => setSelectedAlarm(null)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      handleAlarm(selectedAlarm.id)
                      setSelectedAlarm(null)
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                  >
                    标记已处理
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
