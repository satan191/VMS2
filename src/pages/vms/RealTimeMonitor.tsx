import { useState } from 'react'
import DeviceTree from '@/components/vms/DeviceTree'
import VideoGrid from '@/components/vms/VideoGrid'
import PTZControl from '@/components/vms/PTZControl'
import { Camera, VideoLayout } from '@/types'

/**
 * VMS 实时监控面板
 * VMS-01~VMS-05: 实时监控主界面
 */
export default function RealTimeMonitor() {
  // 当前选中的摄像机
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null)
  // 视频播放区的摄像机列表
  const [activeCameras, setActiveCameras] = useState<(Camera | null)[]>(Array(16).fill(null))
  // 当前视频布局 (1/4/9/16 画面)
  const [layout, setLayout] = useState<VideoLayout>(4)

  /**
   * 处理从设备树拖拽摄像机到视频窗口
   */
  const handleCameraDrop = (camera: Camera, gridIndex: number) => {
    const newCameras = [...activeCameras]
    newCameras[gridIndex] = camera
    setActiveCameras(newCameras)
  }

  /**
   * 选中某个视频窗口
   */
  const handleSelectCamera = (camera: Camera | null) => {
    setSelectedCamera(camera)
  }

  return (
    <div className="h-full flex">
      {/* VMS-02: 设备树 */}
      <DeviceTree onCameraSelect={handleSelectCamera} />

      {/* 中间主区域 */}
      <div className="flex-1 flex flex-col">
        {/* VMS-03: 视频播放区 */}
        <VideoGrid
          cameras={activeCameras}
          layout={layout}
          onLayoutChange={setLayout}
          onCameraDrop={handleCameraDrop}
          onCameraSelect={handleSelectCamera}
          selectedCamera={selectedCamera}
        />
      </div>

      {/* VMS-05: PTZ 控制面板 */}
      {selectedCamera && selectedCamera.type === 'ptz' && (
        <PTZControl camera={selectedCamera} />
      )}
    </div>
  )
}
