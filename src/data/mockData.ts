import { Camera, RecordingSegment, AlarmEvent, LogEntry, User, UserApp } from '@/types';

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
    handled: false,
    pushCount: 1
  },
  {
    id: 'alarm-002',
    cameraId: 'cam-002',
    type: 'line_cross',
    timestamp: new Date('2025-11-12 09:15:42'),
    severity: 'high',
    description: '越界警戒线',
    handled: false,
    pushCount: 2
  },
  {
    id: 'alarm-003',
    cameraId: 'cam-001',
    type: 'face',
    timestamp: new Date('2025-11-12 10:20:33'),
    severity: 'low',
    description: '人脸识别',
    handled: true,
    pushCount: 0
  },
  {
    id: 'alarm-004',
    cameraId: 'cam-007',
    type: 'vehicle',
    timestamp: new Date('2025-11-12 11:05:18'),
    severity: 'medium',
    description: '车辆检测',
    handled: true,
    pushCount: 1
  },
  {
    id: 'alarm-005',
    cameraId: 'cam-003',
    type: 'motion',
    timestamp: new Date('2025-11-12 13:45:22'),
    severity: 'low',
    description: '走廊有人移动',
    handled: true,
    pushCount: 0
  },
  {
    id: 'alarm-006',
    cameraId: 'cam-004',
    type: 'intrusion',
    timestamp: new Date('2025-11-12 14:10:05'),
    severity: 'high',
    description: '仓库禁区闯入',
    handled: false,
    pushCount: 3
  },
  {
    id: 'alarm-007',
    cameraId: 'cam-002',
    type: 'vehicle',
    timestamp: new Date('2025-11-12 15:30:00'),
    severity: 'medium',
    description: '停车场车辆违停',
    handled: false,
    pushCount: 1
  },
  {
    id: 'alarm-008',
    cameraId: 'cam-005',
    type: 'face',
    timestamp: new Date('2025-11-12 16:20:11'),
    severity: 'medium',
    description: '陌生人脸识别',
    handled: true,
    pushCount: 0
  },
  {
    id: 'alarm-009',
    cameraId: 'cam-001',
    type: 'line_cross',
    timestamp: new Date('2025-11-12 17:05:44'),
    severity: 'low',
    description: '大门越界检测',
    handled: true,
    pushCount: 0
  },
  {
    id: 'alarm-010',
    cameraId: 'cam-008',
    type: 'motion',
    timestamp: new Date('2025-11-12 18:15:33'),
    severity: 'medium',
    description: '电梯厅异常逗留',
    handled: false,
    pushCount: 2
  },
  {
    id: 'alarm-011',
    cameraId: 'cam-006',
    type: 'intrusion',
    timestamp: new Date('2025-11-12 19:40:20'),
    severity: 'high',
    description: '后门区域入侵',
    handled: false,
    pushCount: 4
  },
  {
    id: 'alarm-012',
    cameraId: 'cam-002',
    type: 'vehicle',
    timestamp: new Date('2025-11-12 20:10:15'),
    severity: 'low',
    description: '车辆进入停车场',
    handled: true,
    pushCount: 0
  },
  {
    id: 'alarm-013',
    cameraId: 'cam-003',
    type: 'face',
    timestamp: new Date('2025-11-12 21:00:00'),
    severity: 'high',
    description: '黑名单人脸报警',
    handled: false,
    pushCount: 5
  },
  {
    id: 'alarm-014',
    cameraId: 'cam-001',
    type: 'motion',
    timestamp: new Date('2025-11-12 22:30:45'),
    severity: 'medium',
    description: '夜间大门移动侦测',
    handled: false,
    pushCount: 1
  },
  {
    id: 'alarm-015',
    cameraId: 'cam-007',
    type: 'line_cross',
    timestamp: new Date('2025-11-12 23:15:10'),
    severity: 'medium',
    description: '周界越界侦测',
    handled: true,
    pushCount: 0
  }
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
  {
    id: 'log-006',
    timestamp: new Date('2025-11-12 07:15:30'),
    level: 'warning',
    category: 'system',
    message: '存储空间使用率超过85%',
    details: { total: '10TB', used: '8.5TB' }
  },
  {
    id: 'log-007',
    timestamp: new Date('2025-11-12 06:00:00'),
    level: 'info',
    category: 'system',
    message: '系统自动备份完成',
    details: { size: '256MB', duration: '120s' }
  },
  {
    id: 'log-008',
    timestamp: new Date('2025-11-12 05:30:22'),
    deviceId: 'cam-002',
    level: 'error',
    category: 'device',
    message: '视频流信号丢失',
    details: { streamType: 'main' }
  },
  {
    id: 'log-009',
    timestamp: new Date('2025-11-12 04:10:15'),
    level: 'info',
    category: 'operation',
    message: '操作员operator1登录',
    details: { username: 'operator1', ip: '192.168.1.55' }
  },
  {
    id: 'log-010',
    timestamp: new Date('2025-11-12 03:00:00'),
    deviceId: 'cam-005',
    level: 'info',
    category: 'device',
    message: '设备固件升级成功',
    details: { version: 'v2.1.3' }
  },
  {
    id: 'log-011',
    timestamp: new Date('2025-11-12 02:45:10'),
    level: 'warning',
    category: 'operation',
    message: '多次登录失败尝试',
    details: { username: 'unknown', ip: '192.168.1.200', count: 5 }
  },
  {
    id: 'log-012',
    timestamp: new Date('2025-11-12 01:20:33'),
    deviceId: 'cam-008',
    level: 'info',
    category: 'event',
    message: '检测到移动物体',
    details: { area: 'elevator_hall' }
  },
  {
    id: 'log-013',
    timestamp: new Date('2025-11-12 00:10:05'),
    level: 'error',
    category: 'system',
    message: '数据库连接超时',
    details: { db: 'main_db', latency: '5000ms' }
  },
  {
    id: 'log-014',
    timestamp: new Date('2025-11-11 23:55:00'),
    deviceId: 'cam-001',
    level: 'info',
    category: 'device',
    message: '夜间模式自动开启',
    details: { mode: 'ir_auto' }
  },
  {
    id: 'log-015',
    timestamp: new Date('2025-11-11 22:30:00'),
    level: 'info',
    category: 'operation',
    message: '管理员导出日志',
    details: { username: 'admin', range: '24h' }
  }
];

/**
 * 模拟用户数据
 */
export const mockUsers: User[] = [
  {
    id: '1',
    userId: 'U001',
    loginName: 'admin',
    name: '系统管理员',
    region: '总部',
    type: 'admin',
    status: 'active',
    createTime: new Date('2024-01-01')
  },
  {
    id: '2',
    userId: 'U002',
    loginName: 'operator1',
    name: '操作员张三',
    region: '上海分部',
    type: 'operator',
    status: 'active',
    createTime: new Date('2024-03-15')
  },
  {
    id: '3',
    userId: 'U003',
    loginName: 'viewer1',
    name: '访客李四',
    region: '北京分部',
    type: 'viewer',
    status: 'disabled',
    createTime: new Date('2024-05-20')
  },
  {
    id: '4',
    userId: 'U004',
    loginName: 'operator2',
    name: '操作员王五',
    region: '广州分部',
    type: 'operator',
    status: 'active',
    createTime: new Date('2024-06-10')
  },
  {
    id: '5',
    userId: 'U005',
    loginName: 'admin2',
    name: '副管理员赵六',
    region: '总部',
    type: 'admin',
    status: 'active',
    createTime: new Date('2024-02-28')
  },
  {
    id: '6',
    userId: 'U006',
    loginName: 'viewer2',
    name: '访客陈七',
    region: '深圳分部',
    type: 'viewer',
    status: 'active',
    createTime: new Date('2024-07-15')
  },
  {
    id: '7',
    userId: 'U007',
    loginName: 'operator3',
    name: '操作员孙八',
    region: '成都分部',
    type: 'operator',
    status: 'disabled',
    createTime: new Date('2024-08-01')
  },
  {
    id: '8',
    userId: 'U008',
    loginName: 'viewer3',
    name: '访客周九',
    region: '武汉分部',
    type: 'viewer',
    status: 'active',
    createTime: new Date('2024-09-12')
  },
  {
    id: '9',
    userId: 'U009',
    loginName: 'security_guard',
    name: '安保主管',
    region: '总部',
    type: 'operator',
    status: 'active',
    createTime: new Date('2024-01-15')
  },
  {
    id: '10',
    userId: 'U010',
    loginName: 'temp_user',
    name: '临时用户',
    region: '上海分部',
    type: 'viewer',
    status: 'disabled',
    createTime: new Date('2024-10-01')
  },
  {
    id: '11',
    userId: 'U011',
    loginName: 'sys_monitor',
    name: '系统监控员',
    region: '总部',
    type: 'admin',
    status: 'active',
    createTime: new Date('2024-03-20')
  }
];

/**
 * 模拟用户APP数据
 */
export const mockUserApps: UserApp[] = [
  {
    id: '1',
    loginName: 'operator1',
    name: '操作员张三',
    content: '移动端监控权限',
    type: 'enabled'
  },
  {
    id: '2',
    loginName: 'viewer1',
    name: '访客李四',
    content: '仅查看权限',
    type: 'disabled'
  },
  {
    id: '3',
    loginName: 'operator2',
    name: '操作员王五',
    content: '全面监控权限',
    type: 'enabled'
  },
  {
    id: '4',
    loginName: 'admin2',
    name: '副管理员赵六',
    content: '系统管理权限',
    type: 'enabled'
  },
  {
    id: '5',
    loginName: 'viewer2',
    name: '访客陈七',
    content: '移动端查看',
    type: 'enabled'
  },
  {
    id: '6',
    loginName: 'operator3',
    name: '操作员孙八',
    content: '区域监控权限',
    type: 'disabled'
  },
  {
    id: '7',
    loginName: 'viewer3',
    name: '访客周九',
    content: '临时访问权限',
    type: 'enabled'
  },
  {
    id: '8',
    loginName: 'security_guard',
    name: '安保主管',
    content: '紧急调度权限',
    type: 'enabled'
  },
  {
    id: '9',
    loginName: 'temp_user',
    name: '临时用户',
    content: '受限访问',
    type: 'disabled'
  },
  {
    id: '10',
    loginName: 'sys_monitor',
    name: '系统监控员',
    content: '服务器监控权限',
    type: 'enabled'
  }
];
