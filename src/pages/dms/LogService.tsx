import { useState } from 'react'
import { Search, Download, Filter, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { mockLogs } from '@/data/mockData'
import { LogEntry } from '@/types'
import { cn } from '@/utils/cn'

/**
 * 日志维护面板（深色主题）
 * DMS-05~DMS-06: 日志查询、详情展示
 */
export default function LogService() {
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)
  const [filterLevel, setFilterLevel] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const filteredLogs = mockLogs.filter(log => {
    if (filterLevel !== 'all' && log.level !== filterLevel) return false
    if (filterCategory !== 'all' && log.category !== filterCategory) return false
    if (searchKeyword && !log.message.toLowerCase().includes(searchKeyword.toLowerCase())) return false
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
      case 'error': return 'bg-red-100 text-red-700 border-red-200'
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'info': return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  const handleExportLogs = () => {
    alert('导出日志功能：将当前筛选的日志导出为CSV文件')
  }

  return (
    <div className="p-6 bg-gray-950">
      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800">
        {/* DMS-05: 日志查询区 */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-4">日志查询</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 时间范围 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">开始时间</label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">结束时间</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 日志级别 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">日志级别</label>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>

            {/* 日志类型 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">日志类型</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部</option>
                <option value="device">设备运行</option>
                <option value="event">事件触发</option>
                <option value="operation">操作行为</option>
                <option value="system">系统日志</option>
              </select>
            </div>
          </div>

          {/* 关键词搜索 */}
          <div className="mt-4">
            <label className="block text-sm text-gray-400 mb-1">关键词搜索</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="输入关键词搜索日志..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleExportLogs}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                导出日志
              </button>
            </div>
          </div>
        </div>

        {/* DMS-06: 日志详情列表 */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">
              日志列表 <span className="text-sm text-gray-400 font-normal">({filteredLogs.length} 条记录)</span>
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterLevel('all')}
                className={cn(
                  'px-3 py-1 rounded text-sm transition-colors',
                  filterLevel === 'all' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                )}
              >
                全部
              </button>
              <button
                onClick={() => setFilterLevel('info')}
                className={cn(
                  'px-3 py-1 rounded text-sm transition-colors',
                  filterLevel === 'info' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                )}
              >
                Info
              </button>
              <button
                onClick={() => setFilterLevel('warning')}
                className={cn(
                  'px-3 py-1 rounded text-sm transition-colors',
                  filterLevel === 'warning' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                )}
              >
                Warning
              </button>
              <button
                onClick={() => setFilterLevel('error')}
                className={cn(
                  'px-3 py-1 rounded text-sm transition-colors',
                  filterLevel === 'error' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                )}
              >
                Error
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredLogs.map(log => (
              <div
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className="p-4 border border-gray-800 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3">
                  {getLevelIcon(log.level)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
                        getLevelColor(log.level)
                      )}>
                        {log.level.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {log.timestamp.toLocaleString('zh-CN')}
                      </span>
                      {log.deviceId && (
                        <span className="text-xs text-gray-400 font-mono">
                          设备: {log.deviceId}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        类型: {log.category}
                      </span>
                    </div>
                    <div className="text-sm text-gray-200">{log.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <div>没有找到匹配的日志记录</div>
            </div>
          )}
        </div>
      </div>

      {/* 日志详情弹窗 */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">日志详情</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-500 hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">时间戳</div>
                  <div className="text-base text-gray-200 mt-1">
                    {selectedLog.timestamp.toLocaleString('zh-CN')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">日志级别</div>
                  <div className="mt-1">
                    <span className={cn(
                      'inline-flex items-center px-3 py-1 rounded text-sm font-medium border',
                      getLevelColor(selectedLog.level)
                    )}>
                      {selectedLog.level.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">日志类型</div>
                  <div className="text-base text-gray-200 mt-1">
                    {selectedLog.category === 'device' && '设备运行日志'}
                    {selectedLog.category === 'event' && '事件触发日志'}
                    {selectedLog.category === 'operation' && '操作行为日志'}
                    {selectedLog.category === 'system' && '系统日志'}
                  </div>
                </div>
                {selectedLog.deviceId && (
                  <div>
                    <div className="text-sm text-gray-400">设备ID</div>
                    <div className="text-base text-gray-200 mt-1 font-mono">
                      {selectedLog.deviceId}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-400 mb-2">日志消息</div>
                <div className="text-base text-gray-200 bg-gray-800 p-3 rounded">
                  {selectedLog.message}
                </div>
              </div>

              {selectedLog.details && (
                <div className="pt-4 border-t border-gray-800">
                  <div className="text-sm text-gray-400 mb-2">详细信息 (JSON)</div>
                  <pre className="text-sm text-gray-200 bg-gray-800 p-3 rounded overflow-x-auto">
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
