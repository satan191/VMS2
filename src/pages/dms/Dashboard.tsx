import React, { useState } from 'react'
import { Plus, Search, RotateCcw, ChevronRight, ChevronDown, Edit } from 'lucide-react'
import { mockDeviceGroups } from '@/data/mockData'
import { DeviceGroup } from '@/types'
import { cn } from '@/utils/cn'

/**
 * 设备管理面板
 * 优化后的设备清单展示，支持树形结构
 */
export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['g-1', 'g-1-1', 'g-1-1-1', 'g-2', 'g-2-1'])) // Default expand all for demo

  // 递归过滤函数 (如果有搜索词)
  const filterGroups = (groups: DeviceGroup[], term: string): DeviceGroup[] => {
    if (!term) return groups
    return groups.reduce((acc: DeviceGroup[], group) => {
      const matches = group.name.toLowerCase().includes(term.toLowerCase())
      const filteredChildren = group.children ? filterGroups(group.children, term) : []
      
      if (matches || filteredChildren.length > 0) {
        acc.push({
          ...group,
          children: filteredChildren.length > 0 ? filteredChildren : group.children
        })
      }
      return acc
    }, [])
  }

  const filteredGroups = filterGroups(mockDeviceGroups, searchTerm)

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId)
    } else {
      newExpanded.add(groupId)
    }
    setExpandedGroups(newExpanded)
  }

  const handleSearch = () => {
    console.log('Search triggered with:', searchTerm)
    // 实际项目中可能在这里触发后端搜索
  }

  const handleReset = () => {
    setSearchTerm('')
  }

  const handleNewPrimaryGroup = () => {
    alert('Create New Primary Group')
  }

  // 递归渲染行组件
  const renderRows = (groups: DeviceGroup[], level: number = 0) => {
    return groups.map(group => {
      const isExpanded = expandedGroups.has(group.id)
      const hasChildren = group.children && group.children.length > 0
      
      return (
        <React.Fragment key={group.id}>
          <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
            {/* Group Name (Tree Column) */}
            <td className="px-4 py-3 text-gray-200">
              <div 
                className="flex items-center gap-2" 
                style={{ paddingLeft: `${level * 24}px` }}
              >
                {hasChildren ? (
                  <button 
                    onClick={() => toggleGroup(group.id)}
                    className="p-0.5 hover:bg-gray-700 rounded text-gray-400"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                ) : (
                  <span className="w-5" /> // Spacer for alignment
                )}
                <span className={cn(
                  "text-sm", 
                  group.type === 'Group' ? "font-medium text-white" : "text-gray-300"
                )}>
                  {group.name}
                </span>
              </div>
            </td>

            {/* Packet Level */}
            <td className="px-4 py-3 text-sm text-gray-300">
              <span className={cn(
                "px-2 py-0.5 rounded text-xs border",
                group.packetLevel === 'Primary' && "bg-blue-900/30 text-blue-400 border-blue-800",
                group.packetLevel === 'Secondary' && "bg-purple-900/30 text-purple-400 border-purple-800",
                group.packetLevel === 'Tertiary' && "bg-indigo-900/30 text-indigo-400 border-indigo-800",
                group.packetLevel === 'Terminal' && "bg-gray-800 text-gray-400 border-gray-700"
              )}>
                {group.packetLevel}
              </span>
            </td>

            {/* Type */}
            <td className="px-4 py-3 text-sm text-gray-300">
              {group.type}
            </td>

            {/* Group Description */}
            <td className="px-4 py-3 text-sm text-gray-400 truncate max-w-[200px]" title={group.description}>
              {group.description || '/'}
            </td>

            {/* Sort */}
            <td className="px-4 py-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span>{group.sort}</span>
                <button 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  title="Edit Sort"
                >
                  <Edit className="w-3 h-3" />
                </button>
              </div>
            </td>

            {/* Number of Function */}
            <td className="px-4 py-3 text-sm text-gray-300 text-center">
              <span className="bg-gray-800 px-2 py-0.5 rounded-full text-xs">
                {group.functionCount || '/'}
              </span>
            </td>

            {/* Create Time */}
            <td className="px-4 py-3 text-sm text-gray-400">
              {group.createTime}
            </td>

            {/* Operation */}
            <td className="px-4 py-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <button className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  Edit
                </button>
                
                {group.type === 'Group' && (
                  <button className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-left">
                    New Sub Item
                  </button>
                )}

                <button className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-left">
                  Configuration Function
                </button>

                <button className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          
          {/* Recursively render children if expanded */}
          {isExpanded && group.children && renderRows(group.children, level + 1)}
        </React.Fragment>
      )
    })
  }

  return (
    <div className="p-6 h-full flex flex-col bg-gray-950">
      {/* 顶部操作栏 */}
      <div className="flex items-center justify-between mb-6 bg-gray-900 p-4 rounded-lg border border-gray-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search group name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600 w-64"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <button 
          onClick={handleNewPrimaryGroup}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Primary Group
        </button>
      </div>

      {/* 设备/分组 清单列表 */}
      <div className="flex-1 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-800 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[20%] min-w-[200px]">Group Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[100px]">Packet Level</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[80px]">Type</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[25%] min-w-[200px]">Group Description</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[80px] text-center">Sort</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[120px] text-center">Number of Function</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[120px]">Create Time</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-auto min-w-[250px]">Operation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredGroups.length > 0 ? (
                renderRows(filteredGroups)
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    No matching groups or devices found.
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
