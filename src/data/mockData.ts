import { Camera, RecordingSegment, AlarmEvent, LogEntry } from '@/types';

/**
 * 模拟摄像机数据
 */
export const mockCameras: Camera[] = [
  {
    id: 'cam-001',
    name: '大门入口',
    ip: '192.168.1.101',
    status: 'online',
    type: 'ptz',
    location: { lat: 31.2304, lng: 121.4737 },
    group: '一楼',
    resolution: '1920x1080',
    firmware: 'v2.1.3',
    lastOnline: '2025-11-12 12:30:00'
  },
  {
    id: 'cam-002',
    name: '停车场东侧',
    ip: '192.168.1.102',
    status: 'online',
    type: 'fixed',
    location: { lat: 31.2308, lng: 121.4740 },
    group: '室外',
    resolution: '2560x1440',
    firmware: 'v2.1.3',
    lastOnline: '2025-11-12 12:30:00'
  },
  {
    id: 'cam-003',
    name: '办公区走廊',
    ip: '192.168.1.103',
    status: 'online',
    type: 'fixed',
    location: { lat: 31.2306, lng: 121.4735 },
    group: '二楼',
    resolution: '1920x1080',
    firmware: 'v2.1.2',
    lastOnline: '2025-11-12 12:29:00'
  },
  {
    id: 'cam-004',
    name: '仓库入口',
    ip: '192.168.1.104',
    status: 'offline',
    type: 'ptz',
    location: { lat: 31.2302, lng: 121.4742 },
    group: '一楼',
    resolution: '1920x1080',
    firmware: 'v2.0.8',
    lastOnline: '2025-11-12 10:15:00'
  },
  {
    id: 'cam-005',
    name: '会议室A',
    ip: '192.168.1.105',
    status: 'online',
    type: 'fixed',
    location: { lat: 31.2305, lng: 121.4738 },
    group: '三楼',
    resolution: '1920x1080',
    firmware: 'v2.1.3',
    lastOnline: '2025-11-12 12:30:00'
  },
  {
    id: 'cam-006',
    name: '后门出口',
    ip: '192.168.1.106',
    status: 'error',
    type: 'fixed',
    location: { lat: 31.2301, lng: 121.4736 },
    group: '一楼',
    resolution: '1920x1080',
    firmware: 'v2.1.1',
    lastOnline: '2025-11-12 11:45:00'
  },
  {
    id: 'cam-007',
    name: '停车场西侧',
    ip: '192.168.1.107',
    status: 'online',
    type: 'ptz',
    location: { lat: 31.2307, lng: 121.4734 },
    group: '室外',
    resolution: '2560x1440',
    firmware: 'v2.1.3',
    lastOnline: '2025-11-12 12:30:00'
  },
  {
    id: 'cam-008',
    name: '电梯厅',
    ip: '192.168.1.108',
    status: 'online',
    type: 'fixed',
    location: { lat: 31.2304, lng: 121.4739 },
    group: '二楼',
    resolution: '1920x1080',
    firmware: 'v2.1.3',
    lastOnline: '2025-11-12 12:30:00'
  },
];

/**
 * 模拟录像片段数据
 */
export const mockRecordings: RecordingSegment[] = [
  {
    id: 'rec-001',
    cameraId: 'cam-001',
    startTime: new Date('2025-11-12 00:00:00'),
    endTime: new Date('2025-11-12 06:00:00'),
    type: 'continuous',
    size: 2048576000
  },
  {
    id: 'rec-002',
    cameraId: 'cam-001',
    startTime: new Date('2025-11-12 08:30:00'),
    endTime: new Date('2025-11-12 08:35:00'),
    type: 'motion',
    size: 102400000
  },
  {
    id: 'rec-003',
    cameraId: 'cam-001',
    startTime: new Date('2025-11-12 14:20:00'),
    endTime: new Date('2025-11-12 14:25:00'),
    type: 'event',
    size: 102400000
  },
];

/**
 * 模拟告警事件数据
 */
export const mockAlarms: AlarmEvent[] = [
  {
    id: 'alarm-001',
    cameraId: 'cam-001',
    type: 'motion',
    timestamp: new Date('2025-11-12 08:32:15'),
    severity: 'medium',
    description: '检测到运动物体',
    handled: false
  },
  {
    id: 'alarm-002',
    cameraId: 'cam-002',
    type: 'line_cross',
    timestamp: new Date('2025-11-12 09:15:42'),
    severity: 'high',
    description: '越界警戒线',
    handled: false
  },
  {
    id: 'alarm-003',
    cameraId: 'cam-001',
    type: 'face',
    timestamp: new Date('2025-11-12 10:20:33'),
    severity: 'low',
    description: '人脸识别',
    handled: true
  },
  {
    id: 'alarm-004',
    cameraId: 'cam-007',
    type: 'vehicle',
    timestamp: new Date('2025-11-12 11:05:18'),
    severity: 'medium',
    description: '车辆检测',
    handled: true
  },
];

/**
 * 模拟日志数据
 */
export const mockLogs: LogEntry[] = [
  {
    id: 'log-001',
    timestamp: new Date('2025-11-12 12:30:15'),
    deviceId: 'cam-001',
    level: 'info',
    category: 'device',
    message: '设备在线状态正常',
    details: { cpu: '15%', memory: '45%', temperature: '42°C' }
  },
  {
    id: 'log-002',
    timestamp: new Date('2025-11-12 11:45:22'),
    deviceId: 'cam-006',
    level: 'error',
    category: 'device',
    message: '设备连接失败',
    details: { errorCode: 'TIMEOUT', retry: 3 }
  },
  {
    id: 'log-003',
    timestamp: new Date('2025-11-12 10:15:08'),
    deviceId: 'cam-004',
    level: 'warning',
    category: 'device',
    message: '设备离线',
    details: { lastSeen: '2025-11-12 10:14:50' }
  },
  {
    id: 'log-004',
    timestamp: new Date('2025-11-12 09:30:45'),
    level: 'info',
    category: 'operation',
    message: '管理员登录系统',
    details: { username: 'admin', ip: '192.168.1.50' }
  },
  {
    id: 'log-005',
    timestamp: new Date('2025-11-12 08:20:12'),
    deviceId: 'cam-003',
    level: 'info',
    category: 'event',
    message: '运动检测触发录像',
    details: { duration: '5min', size: '102MB' }
  },
];
