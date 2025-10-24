'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bell, 
  X, 
  MessageSquare, 
  UserPlus, 
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

interface Notification {
  id: string
  type: 'intro_received' | 'intro_replied' | 'connected' | 'system'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
  actionText?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  // const { user } = useUser() // Removed for build compatibility
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    // if (!user?.id) return

    // Load notifications from localStorage
    const key = `notifications_demo_user`
    const stored = localStorage.getItem(key)
    
    if (stored) {
      setNotifications(JSON.parse(stored))
    }
  }, []) // Removed user?.id dependency

  useEffect(() => {
    // if (!user?.id) return

    // Save notifications to localStorage
    const key = `notifications_demo_user`
    localStorage.setItem(key, JSON.stringify(notifications))
  }, [notifications, user?.id])

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false
    }
    
    setNotifications(prev => [newNotification, ...prev])
    
    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification(newNotification.title, {
        body: newNotification.message,
        icon: '/favicon.ico'
      })
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export function NotificationBell() {
  const { unreadCount } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <NotificationDropdown onClose={() => setIsOpen(false)} />
      )}
    </div>
  )
}

function NotificationDropdown({ onClose }: { onClose: () => void }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'intro_received':
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case 'intro_replied':
        return <UserPlus className="h-4 w-4 text-green-600" />
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'intro_received':
        return 'border-l-blue-500'
      case 'intro_replied':
        return 'border-l-green-500'
      case 'connected':
        return 'border-l-green-500'
      default:
        return 'border-l-gray-500'
    }
  }

  return (
    <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-l-4 ${getNotificationColor(notification.type)} ${
                !notification.isRead ? 'bg-blue-50' : 'bg-white'
              } hover:bg-gray-50 transition-colors`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {notification.actionUrl && notification.actionText && (
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          markAsRead(notification.id)
                          window.location.href = notification.actionUrl!
                        }}
                      >
                        {notification.actionText}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Notification triggers for different events
export function useNotificationTriggers() {
  const { addNotification } = useNotifications()

  const triggerIntroReceived = (senderName: string, projectTitle: string) => {
    addNotification({
      type: 'intro_received',
      title: 'New Introduction',
      message: `${senderName} sent you an introduction for ${projectTitle}`,
      actionUrl: '/inbox',
      actionText: 'View Message'
    })
  }

  const triggerIntroReplied = (senderName: string) => {
    addNotification({
      type: 'intro_replied',
      title: 'Reply Received',
      message: `${senderName} replied to your introduction`,
      actionUrl: '/inbox',
      actionText: 'View Reply'
    })
  }

  const triggerConnected = (partnerName: string, projectTitle: string) => {
    addNotification({
      type: 'connected',
      title: 'Connection Made!',
      message: `You're now connected with ${partnerName} for ${projectTitle}`,
      actionUrl: '/inbox',
      actionText: 'View Conversation'
    })
  }

  const triggerSystemNotification = (title: string, message: string) => {
    addNotification({
      type: 'system',
      title,
      message
    })
  }

  return {
    triggerIntroReceived,
    triggerIntroReplied,
    triggerConnected,
    triggerSystemNotification
  }
}
