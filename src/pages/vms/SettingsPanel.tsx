import { useState } from 'react'
import { Save, Bell, Monitor, Settings as SettingsIcon, User } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * VMS 系统设置面板
 * VMS-11: 系统参数配置、用户管理等
 */
export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<'general' | 'alarm' | 'video' | 'user'>('general')

  const tabs = [
    { id: 'general' as const, label: '常规设置', icon: SettingsIcon },
    { id: 'alarm' as const, label: '告警设置', icon: Bell },
    { id: 'video' as const, label: '视频设置', icon: Monitor },
    { id: 'user' as const, label: '用户管理', icon: User },
  ]

  const handleSave = () => {
    alert('保存设置成功！')
  }

  return (
    <div className="flex h-full bg-gray-950 text-white">
      {/* 左侧标签页 */}
      <div className="w-64 border-r border-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5" />
          系统设置
        </h2>
        <div className="space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              )}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* 常规设置 */}
          {activeTab === 'general' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">常规设置</h3>
              <div className="space-y-6 max-w-2xl">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h4 className="font-medium mb-4">显示设置</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">语言</label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>简体中文</option>
                        <option>English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">时间格式</label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>24小时制</option>
                        <option>12小时制</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 告警设置 */}
          {activeTab === 'alarm' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">告警设置</h3>
              <div className="space-y-6 max-w-2xl">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h4 className="font-medium mb-4">告警通知</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">启用声音告警</div>
                        <div className="text-xs text-gray-400 mt-1">收到告警时播放提示音</div>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">启用弹窗提示</div>
                        <div className="text-xs text-gray-400 mt-1">收到告警时弹出通知窗口</div>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 视频设置 */}
          {activeTab === 'video' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">视频设置</h3>
              <div className="space-y-6 max-w-2xl">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h4 className="font-medium mb-4">默认视频参数</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">默认布局</label>
                      <select defaultValue="4" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="1">1画面</option>
                        <option value="4">4画面</option>
                        <option value="9">9画面</option>
                        <option value="16">16画面</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 用户管理 */}
          {activeTab === 'user' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">用户管理</h3>
              <div className="space-y-6 max-w-3xl">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">用户列表</h4>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm transition-colors">
                      添加用户
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'admin', role: '管理员' },
                      { name: 'operator', role: '操作员' },
                      { name: 'viewer', role: '查看者' },
                    ].map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-400">{user.role}</div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-white transition-colors">
                          编辑
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 保存按钮 */}
          <div className="flex justify-end mt-8 max-w-2xl">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
