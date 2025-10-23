'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Inbox,
  Send,
  CheckCircle,
  Clock,
  User,
  MessageSquare,
  Archive,
  Star,
  Reply,
  ArrowRight,
  Filter,
  Search,
  MoreHorizontal,
  Flag,
  Trash2
} from 'lucide-react'

interface Message {
  id: string
  threadId: string
  senderId: string
  senderName: string
  senderAvatar?: string
  recipientId: string
  subject: string
  content: string
  timestamp: string
  isRead: boolean
  isFromIntro: boolean
  projectId?: string
  roleId?: string
  status: 'pending' | 'replied' | 'connected' | 'archived'
}

interface Thread {
  id: string
  subject: string
  participants: string[]
  lastMessage: Message
  messageCount: number
  status: 'pending' | 'replied' | 'connected' | 'archived'
  projectTitle?: string
  roleTitle?: string
  createdAt: string
}

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'sent' | 'archived'>('all')
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null)
  const [threads, setThreads] = useState<Thread[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [replyText, setReplyText] = useState('')
  const [isReplying, setIsReplying] = useState(false)

  useEffect(() => {
    // TODO: Fetch from database
    // Simulate data for now
    setThreads([
      {
        id: '1',
        subject: 'Interested in Technical Cofounder role',
        participants: ['john-doe', 'sarah-smith'],
        lastMessage: {
          id: '1',
          threadId: '1',
          senderId: 'john-doe',
          senderName: 'John Doe',
          recipientId: 'sarah-smith',
          subject: 'Interested in Technical Cofounder role',
          content: 'Hey Sarah, I\'m interested in the Technical Cofounder role for your EdTech platform. My React and Node.js experience aligns well with your needs.',
          timestamp: '2024-01-20T10:30:00Z',
          isRead: false,
          isFromIntro: true,
          projectId: 'edtech-platform',
          roleId: 'tech-cofounder',
          status: 'pending'
        },
        messageCount: 1,
        status: 'pending',
        projectTitle: 'EdTech Learning Platform',
        roleTitle: 'Technical Cofounder',
        createdAt: '2024-01-20T10:30:00Z'
      },
      {
        id: '2',
        subject: 'Cofounder opportunity',
        participants: ['mike-johnson', 'alex-lee'],
        lastMessage: {
          id: '2',
          threadId: '2',
          senderId: 'mike-johnson',
          senderName: 'Mike Johnson',
          recipientId: 'alex-lee',
          subject: 'Cofounder opportunity',
          content: 'Hi Alex, I came across your fintech project and I\'m impressed by your vision. I\'d love to discuss how I can contribute.',
          timestamp: '2024-01-19T14:20:00Z',
          isRead: true,
          isFromIntro: true,
          projectId: 'fintech-app',
          roleId: 'business-cofounder',
          status: 'replied'
        },
        messageCount: 3,
        status: 'replied',
        projectTitle: 'FinTech Mobile App',
        roleTitle: 'Business Cofounder',
        createdAt: '2024-01-19T14:20:00Z'
      }
    ])

    if (selectedThread) {
      setMessages([
        {
          id: '1',
          threadId: selectedThread.id,
          senderId: 'john-doe',
          senderName: 'John Doe',
          recipientId: 'sarah-smith',
          subject: selectedThread.subject,
          content: 'Hey Sarah, I\'m interested in the Technical Cofounder role for your EdTech platform. My React and Node.js experience aligns well with your needs.',
          timestamp: '2024-01-20T10:30:00Z',
          isRead: true,
          isFromIntro: true,
          projectId: 'edtech-platform',
          roleId: 'tech-cofounder',
          status: 'pending'
        }
      ])
    }
  }, [selectedThread])

  const handleReply = async () => {
    if (!replyText.trim() || !selectedThread) return

    setIsReplying(true)
    try {
      // TODO: Submit reply to database
      console.log('Submitting reply:', replyText)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Add reply to messages
      const newMessage: Message = {
        id: Date.now().toString(),
        threadId: selectedThread.id,
        senderId: 'current-user', // TODO: Get from auth
        senderName: 'You',
        recipientId: selectedThread.participants.find(p => p !== 'current-user') || '',
        subject: `Re: ${selectedThread.subject}`,
        content: replyText,
        timestamp: new Date().toISOString(),
        isRead: true,
        isFromIntro: false,
        status: 'replied'
      }

      setMessages(prev => [...prev, newMessage])
      setReplyText('')
      
      // Update thread status
      setThreads(prev => prev.map(thread => 
        thread.id === selectedThread.id 
          ? { ...thread, status: 'replied', lastMessage: newMessage }
          : thread
      ))
    } catch (error) {
      console.error('Error sending reply:', error)
    } finally {
      setIsReplying(false)
    }
  }

  const handleMarkConnected = async (threadId: string) => {
    try {
      // TODO: Update thread status in database
      console.log('Marking as connected:', threadId)
      
      setThreads(prev => prev.map(thread => 
        thread.id === threadId 
          ? { ...thread, status: 'connected' }
          : thread
      ))
    } catch (error) {
      console.error('Error marking as connected:', error)
    }
  }

  const handleArchive = async (threadId: string) => {
    try {
      // TODO: Archive thread in database
      console.log('Archiving thread:', threadId)
      
      setThreads(prev => prev.map(thread => 
        thread.id === threadId 
          ? { ...thread, status: 'archived' }
          : thread
      ))
    } catch (error) {
      console.error('Error archiving thread:', error)
    }
  }

  const filteredThreads = threads.filter(thread => {
    switch (activeTab) {
      case 'unread':
        return !thread.lastMessage.isRead
      case 'sent':
        return thread.lastMessage.senderId === 'current-user'
      case 'archived':
        return thread.status === 'archived'
      default:
        return thread.status !== 'archived'
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'replied':
        return 'bg-blue-100 text-blue-800'
      case 'connected':
        return 'bg-green-100 text-green-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3" />
      case 'replied':
        return <Reply className="h-3 w-3" />
      case 'connected':
        return <CheckCircle className="h-3 w-3" />
      case 'archived':
        return <Archive className="h-3 w-3" />
      default:
        return <MessageSquare className="h-3 w-3" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Inbox</h1>
            <p className="text-muted-foreground">
              Manage your introductions and conversations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Threads List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Conversations</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Tabs */}
                  <div className="flex border-b">
                    {[
                      { id: 'all', label: 'All', count: threads.length },
                      { id: 'unread', label: 'Unread', count: threads.filter(t => !t.lastMessage.isRead).length },
                      { id: 'sent', label: 'Sent', count: threads.filter(t => t.lastMessage.senderId === 'current-user').length },
                      { id: 'archived', label: 'Archived', count: threads.filter(t => t.status === 'archived').length }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'all' | 'unread' | 'sent' | 'archived')}
                        className={`flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tab.label} ({tab.count})
                      </button>
                    ))}
                  </div>

                  {/* Threads */}
                  <div className="max-h-96 overflow-y-auto">
                    {filteredThreads.map((thread) => (
                      <div
                        key={thread.id}
                        onClick={() => setSelectedThread(thread)}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedThread?.id === thread.id ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">{thread.subject}</h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {thread.lastMessage.content}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1 ml-2">
                            <Badge variant="secondary" className={`text-xs ${getStatusColor(thread.status)}`}>
                              {getStatusIcon(thread.status)}
                            </Badge>
                            {!thread.lastMessage.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{thread.lastMessage.senderName}</span>
                          <span>{new Date(thread.lastMessage.timestamp).toLocaleDateString()}</span>
                        </div>

                        {thread.projectTitle && (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs">
                              {thread.projectTitle} • {thread.roleTitle}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}

                    {filteredThreads.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Inbox className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No conversations yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Messages */}
            <div className="lg:col-span-2">
              {selectedThread ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{selectedThread.subject}</CardTitle>
                        <CardDescription>
                          {selectedThread.projectTitle && (
                            <span>{selectedThread.projectTitle} • {selectedThread.roleTitle}</span>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => handleMarkConnected(selectedThread.id)}
                          variant="outline"
                          size="sm"
                          disabled={selectedThread.status === 'connected'}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Connected
                        </Button>
                        <Button
                          onClick={() => handleArchive(selectedThread.id)}
                          variant="ghost"
                          size="sm"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Messages */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex space-x-3 ${
                            message.senderId === 'current-user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={message.senderAvatar} />
                            <AvatarFallback>
                              {message.senderName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`flex-1 ${message.senderId === 'current-user' ? 'text-right' : ''}`}>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">{message.senderName}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(message.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reply Form */}
                    <div className="border-t pt-4">
                      <div className="space-y-3">
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply..."
                          rows={3}
                        />
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            <p>💡 <strong>Pro tip:</strong> Be specific about next steps and availability.</p>
                          </div>
                          <Button
                            onClick={handleReply}
                            disabled={!replyText.trim() || isReplying}
                            variant="gradient"
                          >
                            {isReplying ? 'Sending...' : 'Send Reply'}
                            <Send className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground">
                      Choose a conversation from the list to view messages
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
