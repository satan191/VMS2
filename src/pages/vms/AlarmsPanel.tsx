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
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchKeyword, setSearchKeyword] = useState('')

  // 筛选告警
  const filteredAlarms = mockAlarms.filter(alarm => {
    if (filterType !== 'all' && alarm.type !== filterType) return false
    if (filterStatus === 'unhandled' && alarm.handled) return false
    if (filterStatus === 'handled' && !alarm.handled) return false
    if (searchKeyword) {
      const camera = mockCameras.find(c => c.id === alarm.cameraId)
      const cameraName = camera?.name || ''
      return cameraName.toLowerCase().includes(searchKeyword.toLowerCase())
    }
    return true
  })

  // 未处理告警数量
  const unhandledCount = mockAlarms.filter(a => !a.handled).length

  const getAlarmIcon = (type: AlarmEvent['type']) => {
    switch (type) {
      case 'motion': return <AlertCircle className="w-5 h-5 text-blue-500" />
      case 'intrusion': return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'line_cross': return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case 'face': return <Bell className="w-5 h-5 text-purple-500" />
      case 'vehicle': return <Bell className="w-5 h-5 text-green-500" />
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

  const getSeverityColor = (severity: AlarmEvent['severity']) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200'
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
            <div className="text-sm text-gray-400 mt-1">
              共 {mockAlarms.length} 条告警，
              <span className="text-red-400 font-medium"> {unhandledCount} 条未处理</span>
            </div>
          </div>
        </div>

        {/* 筛选区域 */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-400 mb-1">告警类型</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm text-gray-400 mb-1">处理状态</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部状态</option>
              <option value="unhandled">未处理</option>
              <option value="handled">已处理</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">搜索设备</label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="输入设备名称..."
                className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 告警列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredAlarms.map(alarm => {
            const camera = mockCameras.find(c => c.id === alarm.cameraId)
            return (
              <div
                key={alarm.id}
                onClick={() => setSelectedAlarm(alarm)}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all cursor-pointer',
                  selectedAlarm?.id === alarm.id
                    ? 'bg-gray-800 border-blue-500'
                    : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                )}
              >
                <div className="flex items-start gap-3">
                  {getAlarmIcon(alarm.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{getAlarmTypeName(alarm.type)}</span>
                      <span className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
                        getSeverityColor(alarm.severity)
                      )}>
                        {alarm.severity === 'high' && '高'}
                        {alarm.severity === 'medium' && '中'}
                        {alarm.severity === 'low' && '低'}
                      </span>
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
                    </div>
                    <div className="text-sm text-gray-400 space-y-1">
                      <div>设备: {camera?.name || '未知设备'}</div>
                      <div>时间: {alarm.timestamp.toLocaleString('zh-CN')}</div>
                    </div>
                  </div>
                  {!alarm.handled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAlarm(alarm.id)
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm transition-colors"
                    >
                      处理
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {filteredAlarms.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <div>没有找到匹配的告警记录</div>
          </div>
        )}
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
                  <div className="text-sm text-gray-400">告警类型</div>
                  <div className="text-base mt-1">{getAlarmTypeName(selectedAlarm.type)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">严重程度</div>
                  <div className="mt-1">
                    <span className={cn(
                      'inline-flex items-center px-3 py-1 rounded text-sm font-medium border',
                      getSeverityColor(selectedAlarm.severity)
                    )}>
                      {selectedAlarm.severity === 'high' && '高'}
                      {selectedAlarm.severity === 'medium' && '中'}
                      {selectedAlarm.severity === 'low' && '低'}
                    </span>
                  </div>
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
                <div className="col-span-2">
                  <div className="text-sm text-gray-400">触发设备</div>
                  <div className="text-base mt-1">
                    {mockCameras.find(c => c.id === selectedAlarm.cameraId)?.name || '未知设备'}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-400 mb-2">告警快照</div>
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <div className="text-gray-600">告警快照占位符</div>
                  <div className="text-xs text-gray-700 mt-1">实际项目需接入图片URL</div>
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
