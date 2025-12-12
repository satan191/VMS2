import { useState } from 'react'
import { Filter, Search, User as UserIcon, Smartphone, Check, X, FileText } from 'lucide-react'
import { mockUsers, mockUserApps } from '@/data/mockData'
import { User, UserApp } from '@/types'
import { cn } from '@/utils/cn'

/**
 * 用户管理面板
 * 包含用户列表和用户APP列表
 */
export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<'users' | 'apps'>('users')

  return (
    <div className="flex flex-col h-full bg-gray-950 text-white">
      {/* 顶部标题和Tabs */}
      <div className="p-4 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">用户管理</h2>
          
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('users')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeTab === 'users' ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <UserIcon className="w-4 h-4" />
              用户列表
            </button>
            <button
              onClick={() => setActiveTab('apps')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeTab === 'apps' ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              <Smartphone className="w-4 h-4" />
              用户APP列表
            </button>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'users' ? <UserList /> : <UserAppList />}
      </div>
    </div>
  )
}

function UserList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [filterUserId, setFilterUserId] = useState('')
  const [filterLoginName, setFilterLoginName] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredUsers = mockUsers.filter(user => {
    if (filterUserId && !user.userId.toLowerCase().includes(filterUserId.toLowerCase())) return false
    if (filterLoginName && !user.loginName.toLowerCase().includes(filterLoginName.toLowerCase())) return false
    if (filterName && !user.name.toLowerCase().includes(filterName.toLowerCase())) return false
    if (filterStatus !== 'all' && user.status !== filterStatus) return false
    return true
  })

  return (
    <div className="flex flex-col h-full p-4">
      {/* 筛选区 */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">用户ID</label>
          <input
            type="text"
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            placeholder="输入用户ID..."
            className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">登录名</label>
          <input
            type="text"
            value={filterLoginName}
            onChange={(e) => setFilterLoginName(e.target.value)}
            placeholder="输入登录名..."
            className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">姓名</label>
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="输入姓名..."
            className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">状态</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          >
            <option value="all">全部</option>
            <option value="active">启用</option>
            <option value="disabled">禁用</option>
          </select>
        </div>
      </div>

      {/* 列表区 */}
      <div className="flex-1 overflow-hidden border border-gray-800 rounded-lg bg-gray-900">
        <div className="h-full overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800 sticky top-0">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">用户ID</th>
                <th className="px-6 py-3">登录名</th>
                <th className="px-6 py-3">姓名</th>
                <th className="px-6 py-3">地区</th>
                <th className="px-6 py-3">类型</th>
                <th className="px-6 py-3">状态</th>
                <th className="px-6 py-3">时间</th>
                <th className="px-6 py-3">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-gray-300">{user.id}</td>
                  <td className="px-6 py-4 text-gray-300 font-mono">{user.userId}</td>
                  <td className="px-6 py-4 text-gray-300">{user.loginName}</td>
                  <td className="px-6 py-4 text-gray-300">{user.name}</td>
                  <td className="px-6 py-4 text-gray-300">{user.region}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {user.type === 'admin' && '管理员'}
                    {user.type === 'operator' && '操作员'}
                    {user.type === 'viewer' && '访客'}
                  </td>
                  <td className="px-6 py-4">
                    {user.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400 border border-green-800">
                        <Check className="w-3 h-3" /> 启用
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-red-900/30 text-red-400 border border-red-800">
                        <X className="w-3 h-3" /> 禁用
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {user.createTime.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" /> 详情
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                    <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    没有找到匹配的用户
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-lg border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">用户详情</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <div className="text-sm text-gray-400">用户ID</div>
                   <div className="text-gray-200">{selectedUser.userId}</div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-400">登录名</div>
                   <div className="text-gray-200">{selectedUser.loginName}</div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-400">姓名</div>
                   <div className="text-gray-200">{selectedUser.name}</div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-400">地区</div>
                   <div className="text-gray-200">{selectedUser.region}</div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-400">类型</div>
                   <div className="text-gray-200">{selectedUser.type}</div>
                 </div>
                 <div>
                   <div className="text-sm text-gray-400">创建时间</div>
                   <div className="text-gray-200">{selectedUser.createTime.toLocaleDateString()}</div>
                 </div>
               </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function UserAppList() {
  const [filterLoginName, setFilterLoginName] = useState('')

  const filteredApps = mockUserApps.filter(app => {
    if (filterLoginName && !app.loginName.toLowerCase().includes(filterLoginName.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex flex-col h-full p-4">
      {/* 筛选区 */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/4">
          <label className="block text-sm text-gray-400 mb-1">登录名</label>
          <input
            type="text"
            value={filterLoginName}
            onChange={(e) => setFilterLoginName(e.target.value)}
            placeholder="输入登录名..."
            className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          />
        </div>
      </div>

      {/* 列表区 */}
      <div className="flex-1 overflow-hidden border border-gray-800 rounded-lg bg-gray-900">
        <div className="h-full overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-800 sticky top-0">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">登录名</th>
                <th className="px-6 py-3">姓名</th>
                <th className="px-6 py-3">内容</th>
                <th className="px-6 py-3">类型</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 text-gray-300">{app.id}</td>
                  <td className="px-6 py-4 text-gray-300">{app.loginName}</td>
                  <td className="px-6 py-4 text-gray-300">{app.name}</td>
                  <td className="px-6 py-4 text-gray-300">{app.content}</td>
                  <td className="px-6 py-4">
                    {app.type === 'enabled' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400 border border-green-800">
                        <Check className="w-3 h-3" /> 启用
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-red-900/30 text-red-400 border border-red-800">
                        <X className="w-3 h-3" /> 禁用
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    没有找到匹配的APP用户
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
