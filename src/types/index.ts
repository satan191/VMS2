/**
 * 摄像机设备类型定义
 */
export interface Camera {
  id: string;
  name: string;
  ip: string;
  status: 'online' | 'offline' | 'error';
  type: 'fixed' | 'ptz';
  location: {
    lat: number;
    lng: number;
  };
  group?: string;
  resolution?: string;
  firmware?: string;
  lastOnline?: string;
}

/**
 * 录像类型枚举
 */
export type RecordingType = 'continuous' | 'event' | 'motion';

/**
 * 录像片段类型定义
 */
export interface RecordingSegment {
  id: string;
  cameraId: string;
  startTime: Date;
  endTime: Date;
  type: RecordingType;
  size: number;
}

/**
 * 告警事件类型定义
 */
export interface AlarmEvent {
  id: string;
  cameraId: string;
  type: 'motion' | 'line_cross' | 'intrusion' | 'face' | 'vehicle';
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  thumbnail?: string;
  description: string;
  handled: boolean;
  pushCount: number; // 新增推送数
}

/**
 * 用户类型定义
 */
export interface User {
  id: string;
  userId: string;
  loginName: string;
  name: string;
  region: string;
  type: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'disabled';
  createTime: Date;
}

/**
 * 用户APP类型定义
 */
export interface UserApp {
  id: string;
  loginName: string;
  name: string;
  content: string;
  type: 'enabled' | 'disabled';
}

/**
 * 日志条目类型定义
 */
export interface LogEntry {
  id: string;
  timestamp: Date;
  deviceId?: string;
  level: 'info' | 'warning' | 'error';
  category: 'device' | 'event' | 'operation' | 'system';
  message: string;
  details?: Record<string, any>;
}

/**
 * 设备统计数据类型定义
 */
export interface DeviceStats {
  total: number;
  online: number;
  offline: number;
  error: number;
}

/**
 * PTZ 预置位类型定义
 */
export interface PTZPreset {
  id: number;
  name: string;
  position: {
    pan: number;
    tilt: number;
    zoom: number;
  };
}

/**
 * 视频布局类型
 */
export type VideoLayout = 1 | 4 | 9 | 16;

/**
 * 视频流类型
 */
export type StreamType = 'main' | 'sub';
