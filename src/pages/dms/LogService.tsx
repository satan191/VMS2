import { useState } from 'react'
import { Search, Download, Filter, AlertCircle, Info, AlertTriangle, User, Monitor, Server } from 'lucide-react'
import { mockLogs } from '@/data/mockData'
import { LogEntry } from '@/types'
import { cn } from '@/utils/cn'

/**
 * 日志维护面板
 * DMS-05~DMS-06: 日志查询、详情展示
 */
export default function LogService() {
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)
  const [filterDeviceId, setFilterDeviceId] = useState('')
  const [filterEvent, setFilterEvent] = useState('')
  const [logType, setLogType] = useState<'all' | 'device' | 'system' | 'user'>('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const filteredLogs = mockLogs.filter(log => {
    // 区分日志类型
    if (logType === 'device' && !['device', 'event'].includes(log.category)) return false
    if (logType === 'system' && log.category !== 'system') return false
    if (logType === 'user' && log.category !== 'operation') return false

    // 设备ID筛选
    if (filterDeviceId && log.deviceId && !log.deviceId.toLowerCase().includes(filterDeviceId.toLowerCase())) return false
    
    // 事件筛选 (关键词)
    if (filterEvent && !log.message.toLowerCase().includes(filterEvent.toLowerCase())) return false

    // 时间范围
    if (startDate) {
      const start = new Date(startDate)
      if (log.timestamp < start) return false
    }
    if (endDate) {
      const end = new Date(endDate)
      if (log.timestamp > end) return false
    }

    return true
  })

  const getLevelIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'info': return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return 'text-red-400 bg-red-900/30 border-red-800'
      case 'warning': return 'text-yellow-400 bg-yellow-900/30 border-yellow-800'
      case 'info': return 'text-blue-400 bg-blue-900/30 border-blue-800'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'device': return '设备运行'
      case 'event': return '事件触发'
      case 'operation': return '用户操作'
      case 'system': return '系统运行'
      default: return category
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">
      {/* 顶部筛选区 */}
      <div className="p-4 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">日志维护</h2>
          
          {/* 日志类型切换 tabs */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setLogType('all')}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                logType === 'all' ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              全部日志
            </button>
            <button
              onClick={() => setLogType('device')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                logType === 'device' ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <Monitor className="w-4 h-4" />
              设备日志
            </button>
            <button
              onClick={() => setLogType('system')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                logType === 'system' ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <Server className="w-4 h-4" />
              系统日志
            </button>
            <button
              onClick={() => setLogType('user')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                logType === 'user' ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <User className="w-4 h-4" />
              用户日志
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div>
            <label className="block text-sm text-gray-400 mb-1">设备ID</label>
            <input
              type="text"
              value={filterDeviceId}
              onChange={(e) => setFilterDeviceId(e.target.value)}
              placeholder="输入设备ID..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">事件/关键词</label>
            <input
              type="text"
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              placeholder="搜索日志内容..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">开始时间</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">结束时间</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
            />
          </div>
        </div>
      </div>

      {/* 日志列表 (表格样式) */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full border border-gray-800 rounded-lg bg-gray-900 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800 sticky top-0">
              <tr>
                <th className="px-6 py-3">时间</th>
                <th className="px-6 py-3">级别</th>
                <th className="px-6 py-3">类别</th>
                <th className="px-6 py-3">设备ID</th>
                <th className="px-6 py-3">事件/消息</th>
                <th className="px-6 py-3">详情</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredLogs.map(log => (
                <tr 
                  key={log.id} 
                  className="hover:bg-gray-800 cursor-pointer transition-colors"
                  onClick={() => setSelectedLog(log)}
                >
                  <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                    {log.timestamp.toLocaleString('zh-CN')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border uppercase",
                      getLevelColor(log.level)
                    )}>
                      {getLevelIcon(log.level)}
                      {log.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {getCategoryLabel(log.category)}
                  </td>
                  <td className="px-6 py-4 text-gray-300 font-mono">
                    {log.deviceId || '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {log.message}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-400 hover:text-blue-300 text-xs">查看</button>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Filter className="w-8 h-8 mb-2 opacity-50" />
                      没有找到匹配的日志记录
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 日志详情弹窗 */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">日志详情</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">时间戳</div>
                  <div className="text-base mt-1 text-gray-200">
                    {selectedLog.timestamp.toLocaleString('zh-CN')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">日志级别</div>
                  <div className="mt-1">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border uppercase",
                      getLevelColor(selectedLog.level)
                    )}>
                      {selectedLog.level}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">类别</div>
                  <div className="text-base mt-1 text-gray-200">
                    {getCategoryLabel(selectedLog.category)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">设备ID</div>
                  <div className="text-base mt-1 font-mono text-gray-200">
                    {selectedLog.deviceId || '-'}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-400 mb-2">日志消息</div>
                <div className="bg-gray-800 p-3 rounded text-gray-200">
                  {selectedLog.message}
                </div>
              </div>

              {selectedLog.details && (
                <div className="pt-4 border-t border-gray-800">
                  <div className="text-sm text-gray-400 mb-2">详细信息 (JSON)</div>
                  <pre className="text-sm text-gray-200 bg-gray-800 p-3 rounded overflow-x-auto font-mono">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
