import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import VMSLayout from './components/vms/VMSLayout'
import RealTimeMonitor from './pages/vms/RealTimeMonitor'
import PlaybackPanel from './pages/vms/PlaybackPanel'
import AlarmsPanel from './pages/vms/AlarmsPanel'
import SettingsPanel from './pages/vms/SettingsPanel'
import Dashboard from './pages/dms/Dashboard'
import LogService from './pages/dms/LogService'

/**
 * 主应用组件
 * 配置路由和页面导航
 * VMS整合了DMS功能，统一在一个平台中
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* 默认重定向到 VMS 实时监控 */}
        <Route path="/" element={<Navigate to="/vms/real-time" replace />} />
        
        {/* VMS 客户端路由（整合了DMS功能） */}
        <Route path="/vms" element={<VMSLayout />}>
          <Route index element={<Navigate to="/vms/real-time" replace />} />
          <Route path="real-time" element={<RealTimeMonitor />} />
          <Route path="playback" element={<PlaybackPanel />} />
          <Route path="alarms" element={<AlarmsPanel />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="logs" element={<LogService />} />
          <Route path="settings" element={<SettingsPanel />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
