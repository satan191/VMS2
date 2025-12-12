import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Activity, AlertCircle, CheckCircle, XCircle, Download, Upload, Plus, Trash2 } from 'lucide-react'
import { mockCameras } from '@/data/mockData'
import { Camera } from '@/types'
import { cn } from '@/utils/cn'
import 'leaflet/dist/leaflet.css'

/**
 * 设备管理面板（深色主题）
 * DMS-01~DMS-04: 运营指标、GIS地图、资产清单
 */
export default function Dashboard() {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedDevices, setSelectedDevices] = useState<Set<string>>(new Set())
  const [showAddDevice, setShowAddDevice] = useState(false)

  const stats = {
    total: mockCameras.length,
    online: mockCameras.filter(c => c.status === 'online').length,
    offline: mockCameras.filter(c => c.status === 'offline').length,
    error: mockCameras.filter(c => c.status === 'error').length,
  }

  const filteredCameras = mockCameras.filter(camera => {
    if (filterStatus === 'all') return true
    return camera.status === filterStatus
  })

  const toggleDeviceSelection = (deviceId: string) => {
    const newSelection = new Set(selectedDevices)
    if (newSelection.has(deviceId)) {
      newSelection.delete(deviceId)
    } else {
      newSelection.add(deviceId)
    }
    setSelectedDevices(newSelection)
  }

  const handleBatchUpgrade = () => {
    if (selectedDevices.size === 0) {
      alert('请先选择设备')
      return
    }
    alert(`准备为 ${selectedDevices.size} 台设备升级固件`)
  }

  const handleAddDevice = () => {
    setShowAddDevice(true)
  }

  const handleDeleteDevice = (deviceId: string, deviceName: string) => {
    if (confirm(`确定要删除设备 "${deviceName}" 吗？`)) {
      console.log('删除设备ID:', deviceId)
      alert(`设备 "${deviceName}" 已删除`)
      // 这里实际项目中应该调用API删除设备
    }
  }

  const handleSubmitNewDevice = (e: React.FormEvent) => {
    e.preventDefault()
    alert('新设备添加成功！')
    setShowAddDevice(false)
    // 这里实际项目中应该调用API添加设备
  }

  return (
    <div className="p-6 space-y-6 bg-gray-950">
      {/* DMS-01: 运营指标卡 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">设备总数</div>
              <div className="text-3xl font-bold text-white mt-2">{stats.total}</div>
            </div>
            <Activity className="w-12 h-12 text-blue-500 opacity-80" />
          </div>
        </div>

        <div 
          className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-800 cursor-pointer hover:border-green-600 transition-all"
          onClick={() => setFilterStatus('online')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">在线设备</div>
              <div className="text-3xl font-bold text-green-600 mt-2">{stats.online}</div>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500 opacity-80" />
          </div>
        </div>

        <div 
          className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-800 cursor-pointer hover:border-gray-500 transition-all"
          onClick={() => setFilterStatus('offline')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">离线设备</div>
              <div className="text-3xl font-bold text-gray-400 mt-2">{stats.offline}</div>
            </div>
            <XCircle className="w-12 h-12 text-gray-500 opacity-80" />
          </div>
        </div>

        <div 
          className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-800 cursor-pointer hover:border-red-600 transition-all"
          onClick={() => setFilterStatus('error')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">故障设备</div>
              <div className="text-3xl font-bold text-red-600 mt-2">{stats.error}</div>
            </div>
            <AlertCircle className="w-12 h-12 text-red-500 opacity-80" />
          </div>
        </div>
      </div>

      {/* DMS-02: GIS 地图视图 */}
      <div className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-4">设备分布地图</h2>
        <div className="h-64 rounded-lg overflow-hidden border border-gray-700">
          <MapContainer
            center={[31.2304, 121.4737]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mockCameras.map(camera => (
              <Marker
                key={camera.id}
                position={[camera.location.lat, camera.location.lng]}
              >
                <Popup>
                  <div>
                    <div className="font-semibold">{camera.name}</div>
                    <div className="text-sm text-gray-600">{camera.ip}</div>
                    <div className={cn(
                      'text-sm mt-1',
                      camera.status === 'online' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {camera.status === 'online' ? '在线' : camera.status === 'offline' ? '离线' : '故障'}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* DMS-03: 设备清单 */}
      <div className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-white">设备清单</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={cn(
                  'px-3 py-1 rounded text-sm transition-colors',
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                )}
              >
                全部
              </button>
              <button
                onClick={() => setFilterStatus('online')}
                className={cn(
                  'px-3 py-1 rounded text-sm transition-colors',
                  filterStatus === 'online'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                )}
              >
                在线
              </button>
              <button
                onClick={() => setFilterStatus('offline')}
                className={cn(
                  'px-3 py-1 rounded text-sm transition-colors',
                  filterStatus === 'offline'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                )}
              >
                离线
              </button>
              <button
                onClick={() => setFilterStatus('error')}
                className={cn(
                  'px-3 py-1 rounded text-sm transition-colors',
                  filterStatus === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                )}
              >
                故障
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddDevice}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              新增设备
            </button>
          </div>
        </div>

        {selectedDevices.size > 0 && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={handleBatchUpgrade}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm"
              >
                <Upload className="w-4 h-4" />
                批量升级固件 ({selectedDevices.size})
              </button>
              <button
                onClick={() => setSelectedDevices(new Set())}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm"
              >
                取消选择
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-800">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDevices.size === filteredCameras.length && filteredCameras.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDevices(new Set(filteredCameras.map(c => c.id)))
                      } else {
                        setSelectedDevices(new Set())
                      }
                    }}
                    className="w-4 h-4"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">设备名称</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">IP地址</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">类型</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">分组</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">分辨率</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">固件版本</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">状态</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredCameras.map(camera => (
                <tr
                  key={camera.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedDevices.has(camera.id)}
                      onChange={() => toggleDeviceSelection(camera.id)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-200 font-medium">{camera.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-400 font-mono">{camera.ip}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {camera.type === 'ptz' ? 'PTZ云台' : '固定'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{camera.group}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{camera.resolution}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{camera.firmware}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                      camera.status === 'online' && 'bg-green-900 text-green-400 border border-green-700',
                      camera.status === 'offline' && 'bg-gray-800 text-gray-400 border border-gray-700',
                      camera.status === 'error' && 'bg-red-900 text-red-400 border border-red-700'
                    )}>
                      {camera.status === 'online' ? '在线' : camera.status === 'offline' ? '离线' : '故障'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedCamera(camera)}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        详情
                      </button>
                      <button
                        onClick={() => handleDeleteDevice(camera.id, camera.name)}
                        className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DMS-04: 设备详情侧边栏 */}
      {selectedCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">设备详情</h3>
              <button
                onClick={() => setSelectedCamera(null)}
                className="text-gray-500 hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">设备名称</div>
                  <div className="text-base font-medium text-white mt-1">{selectedCamera.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">IP地址</div>
                  <div className="text-base font-mono text-gray-200 mt-1">{selectedCamera.ip}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">设备类型</div>
                  <div className="text-base text-gray-200 mt-1">
                    {selectedCamera.type === 'ptz' ? 'PTZ云台摄像机' : '固定摄像机'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">分组</div>
                  <div className="text-base text-gray-200 mt-1">{selectedCamera.group}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">分辨率</div>
                  <div className="text-base text-gray-200 mt-1">{selectedCamera.resolution}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">固件版本</div>
                  <div className="text-base text-gray-200 mt-1">{selectedCamera.firmware}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">状态</div>
                  <div className="mt-1">
                    <span className={cn(
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      selectedCamera.status === 'online' && 'bg-green-900 text-green-400 border border-green-700',
                      selectedCamera.status === 'offline' && 'bg-gray-800 text-gray-400 border border-gray-700',
                      selectedCamera.status === 'error' && 'bg-red-900 text-red-400 border border-red-700'
                    )}>
                      {selectedCamera.status === 'online' ? '在线' : selectedCamera.status === 'offline' ? '离线' : '故障'}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">最后在线时间</div>
                  <div className="text-base text-gray-200 mt-1">{selectedCamera.lastOnline}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="text-sm text-gray-400 mb-2">位置信息</div>
                <div className="text-base text-gray-200">
                  纬度: {selectedCamera.location.lat} / 经度: {selectedCamera.location.lng}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
                  <Upload className="w-4 h-4 inline mr-2" />
                  升级固件
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors">
                  <Download className="w-4 h-4 inline mr-2" />
                  导出配置
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 新增设备弹窗 */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">新增设备</h3>
              <button
                onClick={() => setShowAddDevice(false)}
                className="text-gray-500 hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitNewDevice}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">设备名称 *</label>
                    <input
                      type="text"
                      required
                      placeholder="请输入设备名称"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">IP地址 *</label>
                    <input
                      type="text"
                      required
                      placeholder="192.168.1.100"
                      pattern="^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">设备类型 *</label>
                    <select
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">请选择</option>
                      <option value="fixed">固定摄像机</option>
                      <option value="ptz">PTZ云台摄像机</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">分组 *</label>
                    <select
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">请选择</option>
                      <option value="一楼大厅">一楼大厅</option>
                      <option value="停车场">停车场</option>
                      <option value="办公区域">办公区域</option>
                      <option value="周界">周界</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">分辨率</label>
                    <select
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="1920x1080">1920x1080</option>
                      <option value="2560x1440">2560x1440</option>
                      <option value="3840x2160">3840x2160</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">固件版本</label>
                    <input
                      type="text"
                      placeholder="v2.1.0"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">纬度</label>
                    <input
                      type="number"
                      step="0.000001"
                      placeholder="31.230416"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">经度</label>
                    <input
                      type="number"
                      step="0.000001"
                      placeholder="121.473701"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                  >
                    确认添加
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddDevice(false)}
                    className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
