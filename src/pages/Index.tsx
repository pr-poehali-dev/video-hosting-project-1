import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
  avatar: string;
}

interface Video {
  id: string;
  title: string;
  channel: string;
  channelId: string;
  views: string;
  uploadTime: string;
  duration: string;
  thumbnail: string;
  avatar: string;
  description?: string;
}

interface Comment {
  id: string;
  user: string;
  userId: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
  replies?: Comment[];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Auth form states
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    username: '',
    displayName: ''
  });
  
  // Upload form states
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    videoFile: null as File | null,
    thumbnail: null as File | null
  });

  // Mock function to simulate video upload
  const handleVideoUpload = () => {
    if (!uploadForm.title || !currentUser) return;
    
    const newVideo: Video = {
      id: Date.now().toString(),
      title: uploadForm.title,
      channel: currentUser.displayName,
      channelId: currentUser.id,
      views: '0',
      uploadTime: 'только что',
      duration: '0:00',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop',
      avatar: currentUser.avatar,
      description: uploadForm.description
    };
    
    setVideos(prev => [newVideo, ...prev]);
    setUploadForm({ title: '', description: '', videoFile: null, thumbnail: null });
    setShowUploadDialog(false);
  };

  const handleAuth = () => {
    if (isLogin) {
      // Login logic
      if (authForm.email === 'admin@ruvideo.com' && authForm.password === 'RuVideo2024!Admin') {
        setCurrentUser({
          id: 'admin',
          username: 'RuVideo',
          displayName: 'RuVideo',
          email: 'admin@ruvideo.com',
          isAdmin: true,
          avatar: 'RV'
        });
      } else if (authForm.email && authForm.password) {
        setCurrentUser({
          id: Date.now().toString(),
          username: authForm.email.split('@')[0],
          displayName: authForm.displayName || authForm.email.split('@')[0],
          email: authForm.email,
          isAdmin: false,
          avatar: authForm.email[0].toUpperCase()
        });
      }
    } else {
      // Registration logic
      if (authForm.email.includes('@gmail.com') && authForm.username && authForm.password) {
        setCurrentUser({
          id: Date.now().toString(),
          username: authForm.username,
          displayName: authForm.displayName || authForm.username,
          email: authForm.email,
          isAdmin: false,
          avatar: authForm.username[0].toUpperCase()
        });
      }
    }
    setShowAuthDialog(false);
    setAuthForm({ email: '', password: '', username: '', displayName: '' });
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const handleDeleteChannel = (channelId: string) => {
    setVideos(prev => prev.filter(video => video.channelId !== channelId));
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
          )
        };
      }
      return comment;
    }));
  };

  const handleAddComment = () => {
    if (newComment.trim() && currentUser) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: currentUser.displayName,
        userId: currentUser.id,
        avatar: currentUser.avatar,
        content: newComment.trim(),
        likes: 0,
        timestamp: 'только что'
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  // Load comments when video is selected
  useEffect(() => {
    if (selectedVideo) {
      setComments([
        {
          id: '1',
          user: 'Анна Петрова',
          userId: 'user1',
          avatar: 'АП',
          content: 'Отличное видео! Очень познавательно.',
          likes: 24,
          timestamp: '2 часа назад'
        },
        {
          id: '2',
          user: 'Дмитрий Сидоров',
          userId: 'user2',
          avatar: 'ДС',
          content: 'Можете сделать больше видео на эту тему?',
          likes: 15,
          timestamp: '4 часа назад'
        }
      ]);
    }
  }, [selectedVideo]);

  const SidebarContent = () => (
    <nav className="space-y-1 p-4">
      <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
        <Icon name="Home" className="mr-3" size={20} />
        <span className="hidden md:inline">Главная</span>
      </Button>
      <Button variant="ghost" className="w-full justify-start text-youtube-text-secondary hover:bg-gray-700">
        <Icon name="Compass" className="mr-3" size={20} />
        <span className="hidden md:inline">Рекомендации</span>
      </Button>
      <Button variant="ghost" className="w-full justify-start text-youtube-text-secondary hover:bg-gray-700">
        <Icon name="Users" className="mr-3" size={20} />
        <span className="hidden md:inline">Подписки</span>
      </Button>
      <Separator className="bg-gray-600 my-4" />
      <Button variant="ghost" className="w-full justify-start text-youtube-text-secondary hover:bg-gray-700">
        <Icon name="History" className="mr-3" size={20} />
        <span className="hidden md:inline">История</span>
      </Button>
      <Button variant="ghost" className="w-full justify-start text-youtube-text-secondary hover:bg-gray-700">
        <Icon name="Clock" className="mr-3" size={20} />
        <span className="hidden md:inline">Позже</span>
      </Button>
      <Button variant="ghost" className="w-full justify-start text-youtube-text-secondary hover:bg-gray-700">
        <Icon name="ThumbsUp" className="mr-3" size={20} />
        <span className="hidden md:inline">Лайки</span>
      </Button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-youtube-bg-dark text-youtube-text-primary font-sans">
      {/* Header */}
      <header className="bg-youtube-dark-gray border-b border-gray-700 sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-6">
            {/* Mobile menu button */}
            <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Icon name="Menu" size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-youtube-dark-gray border-gray-700 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center space-x-2">
              <Icon name="Play" className="text-youtube-red" size={24} />
              <span className="text-lg md:text-xl font-bold">RuVideo</span>
            </div>
          </div>

          {/* Search - responsive */}
          <div className="flex-1 max-w-md md:max-w-2xl mx-2 md:mx-8">
            <div className="relative">
              <Input
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-youtube-bg-dark border-gray-600 text-white pr-12 focus:border-youtube-red text-sm"
              />
              <Button
                size="sm"
                className="absolute right-0 top-0 h-full bg-gray-600 hover:bg-gray-500 border-l border-gray-600 px-2 md:px-3"
              >
                <Icon name="Search" size={16} />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 md:space-x-4">
            {currentUser && (
              <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <Icon name="Video" size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-youtube-dark-gray border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Загрузить видео</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Название</Label>
                      <Input
                        id="title"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-youtube-bg-dark border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={uploadForm.description}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-youtube-bg-dark border-gray-600"
                      />
                    </div>
                    <Button onClick={handleVideoUpload} className="bg-youtube-red hover:bg-red-700 w-full">
                      Загрузить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`${currentUser.isAdmin ? 'bg-yellow-600' : 'bg-youtube-red'} text-xs`}>
                    {currentUser.avatar}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentUser(null)}
                  className="hidden md:flex text-xs"
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-youtube-red hover:bg-red-700 text-xs md:text-sm px-2 md:px-4">
                    Войти
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-youtube-dark-gray border-gray-700 text-white w-[95vw] max-w-md">
                  <DialogHeader>
                    <DialogTitle>{isLogin ? 'Вход' : 'Регистрация'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {!isLogin && (
                      <>
                        <div>
                          <Label htmlFor="username">Имя пользователя</Label>
                          <Input
                            id="username"
                            value={authForm.username}
                            onChange={(e) => setAuthForm(prev => ({ ...prev, username: e.target.value }))}
                            className="bg-youtube-bg-dark border-gray-600"
                          />
                        </div>
                        <div>
                          <Label htmlFor="displayName">Отображаемое имя</Label>
                          <Input
                            id="displayName"
                            value={authForm.displayName}
                            onChange={(e) => setAuthForm(prev => ({ ...prev, displayName: e.target.value }))}
                            className="bg-youtube-bg-dark border-gray-600"
                          />
                        </div>
                      </>
                    )}
                    <div>
                      <Label htmlFor="email">Gmail адрес</Label>
                      <Input
                        id="email"
                        type="email"
                        value={authForm.email}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-youtube-bg-dark border-gray-600"
                        placeholder={isLogin ? "email@gmail.com" : "Только @gmail.com"}
                      />
                      {!isLogin && !authForm.email.includes('@gmail.com') && authForm.email && (
                        <Alert className="mt-2 border-red-600 bg-red-900/20">
                          <AlertDescription className="text-red-400 text-sm">
                            Только Gmail адреса разрешены для регистрации
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="password">Пароль</Label>
                      <Input
                        id="password"
                        type="password"
                        value={authForm.password}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-youtube-bg-dark border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Button onClick={handleAuth} className="bg-youtube-red hover:bg-red-700 w-full">
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => setIsLogin(!isLogin)}
                        className="w-full text-sm"
                      >
                        {isLogin ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
                      </Button>
                    </div>
                    {isLogin && (
                      <Alert className="border-blue-600 bg-blue-900/20">
                        <AlertDescription className="text-blue-400 text-sm">
                          <strong>Админ доступ:</strong><br/>
                          Email: admin@ruvideo.com<br/>
                          Пароль: RuVideo2024!Admin
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-16 lg:w-64 bg-youtube-dark-gray min-h-screen">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-6">
          {selectedVideo ? (
            /* Video Player View - Mobile Optimized */
            <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
              <Card className="bg-black border-gray-700">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Play" className="text-youtube-red mx-auto mb-4" size={48} />
                      <p className="text-lg md:text-xl font-semibold px-4">{selectedVideo.title}</p>
                      <p className="text-youtube-text-secondary mt-2 text-sm">Видеоплеер будет здесь</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <h1 className="text-lg md:text-2xl font-bold mb-2 px-2 md:px-0">{selectedVideo.title}</h1>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 px-2 md:px-0">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-youtube-red text-xs md:text-sm">{selectedVideo.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm md:text-base">{selectedVideo.channel}</p>
                        <p className="text-xs md:text-sm text-youtube-text-secondary">1.2M подписчиков</p>
                      </div>
                      <Button className="bg-youtube-red hover:bg-red-700 text-xs md:text-sm px-3 md:px-4">
                        Подписаться
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700 text-xs md:text-sm">
                        <Icon name="ThumbsUp" className="mr-1 md:mr-2" size={14} />
                        1.2K
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700 text-xs md:text-sm">
                        <Icon name="Share" className="mr-1 md:mr-2" size={14} />
                        <span className="hidden md:inline">Поделиться</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-600" />

                {/* Comments Section - Mobile Optimized */}
                <div className="space-y-4 md:space-y-6 px-2 md:px-0">
                  <h3 className="text-lg md:text-xl font-semibold">Комментарии ({comments.length})</h3>
                  
                  {currentUser && (
                    <div className="flex space-x-2 md:space-x-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className={`${currentUser.isAdmin ? 'bg-yellow-600' : 'bg-youtube-red'} text-xs`}>
                          {currentUser.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <Input
                          placeholder="Добавьте комментарий..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="bg-transparent border-b border-gray-600 rounded-none focus:border-youtube-red text-sm"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setNewComment('')}
                            className="text-xs"
                          >
                            Отмена
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-youtube-red hover:bg-red-700 text-xs"
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                          >
                            Отправить
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 md:space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-3">
                        <div className="flex space-x-2 md:space-x-3">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="bg-blue-600 text-xs">{comment.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-xs md:text-sm">{comment.user}</span>
                              <span className="text-xs text-youtube-text-secondary">{comment.timestamp}</span>
                            </div>
                            <p className="text-xs md:text-sm break-words">{comment.content}</p>
                            <div className="flex items-center space-x-3 md:space-x-4">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleLikeComment(comment.id)}
                                className="text-youtube-text-secondary hover:text-white p-1 text-xs"
                              >
                                <Icon name="ThumbsUp" className="mr-1" size={12} />
                                {comment.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-youtube-text-secondary hover:text-white p-1 text-xs">
                                <Icon name="MessageCircle" className="mr-1" size={12} />
                                Ответить
                              </Button>
                              {currentUser?.isAdmin && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="text-red-400 hover:text-red-300 p-1 text-xs"
                                >
                                  <Icon name="Trash2" size={12} />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={() => setSelectedVideo(null)}
                className="border-gray-600 text-white hover:bg-gray-700 mx-2 md:mx-0 text-sm"
              >
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                Назад к видео
              </Button>
            </div>
          ) : (
            /* Video Grid View - Mobile Optimized */
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                <h2 className="text-xl md:text-2xl font-bold">Загружено пользователями</h2>
                {currentUser?.isAdmin && (
                  <Badge variant="outline" className="border-yellow-600 text-yellow-400 w-fit">
                    Админ режим
                  </Badge>
                )}
              </div>

              {videos.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Video" className="mx-auto mb-4 text-gray-500" size={64} />
                  <h3 className="text-lg font-semibold mb-2">Пока нет видео</h3>
                  <p className="text-youtube-text-secondary mb-4">Станьте первым, кто загрузит видео!</p>
                  {currentUser && (
                    <Button 
                      onClick={() => setShowUploadDialog(true)}
                      className="bg-youtube-red hover:bg-red-700"
                    >
                      <Icon name="Upload" className="mr-2" size={16} />
                      Загрузить видео
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                  {videos.map((video) => (
                    <Card 
                      key={video.id} 
                      className="bg-youtube-dark-gray border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full aspect-video object-cover rounded-t-lg"
                          />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-2 md:p-3 space-y-2">
                          <h3 className="font-semibold text-xs md:text-sm line-clamp-2 leading-tight">
                            {video.title}
                          </h3>
                          <div className="flex items-start space-x-2">
                            <Avatar className="h-6 w-6 md:h-8 md:w-8 flex-shrink-0">
                              <AvatarFallback className="bg-youtube-red text-xs">{video.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="text-youtube-text-secondary text-xs truncate">{video.channel}</p>
                              <p className="text-youtube-text-secondary text-xs">
                                {video.views} • {video.uploadTime}
                              </p>
                              {currentUser?.isAdmin && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteChannel(video.channelId);
                                  }}
                                  className="text-red-400 hover:text-red-300 p-0 h-auto text-xs mt-1"
                                >
                                  <Icon name="Trash2" className="mr-1" size={10} />
                                  Удалить канал
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Upload FAB */}
      {currentUser && (
        <div className="fixed bottom-4 right-4 md:hidden">
          <Button 
            onClick={() => setShowUploadDialog(true)}
            className="bg-youtube-red hover:bg-red-700 rounded-full h-14 w-14 shadow-lg"
          >
            <Icon name="Plus" size={24} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;