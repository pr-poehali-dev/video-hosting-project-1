import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  uploadTime: string;
  duration: string;
  thumbnail: string;
  avatar: string;
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
  replies?: Comment[];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Анна Петрова',
      avatar: 'AP',
      content: 'Отличное видео! Очень познавательно и интересно подано.',
      likes: 24,
      timestamp: '2 часа назад',
      replies: [
        {
          id: '1-1',
          user: 'Максим Иванов',
          avatar: 'МИ',
          content: 'Полностью согласен, качество контента на высоте!',
          likes: 8,
          timestamp: '1 час назад'
        }
      ]
    },
    {
      id: '2',
      user: 'Дмитрий Сидоров',
      avatar: 'ДС',
      content: 'Можете сделать больше видео на эту тему?',
      likes: 15,
      timestamp: '4 часа назад'
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const videos: Video[] = [
    {
      id: '1',
      title: 'Как создать успешный стартап: 10 ключевых принципов',
      channel: 'Бизнес Академия',
      views: '2.3M',
      uploadTime: '1 день назад',
      duration: '15:24',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
      avatar: 'БА'
    },
    {
      id: '2',
      title: 'Секреты продуктивности: как успевать больше за меньшее время',
      channel: 'Лайфхаки Pro',
      views: '1.8M',
      uploadTime: '3 дня назад',
      duration: '12:45',
      thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=225&fit=crop',
      avatar: 'ЛП'
    },
    {
      id: '3',
      title: 'Искусственный интеллект: будущее уже здесь',
      channel: 'Технологии Завтра',
      views: '5.1M',
      uploadTime: '1 неделю назад',
      duration: '23:17',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop',
      avatar: 'ТЗ'
    },
    {
      id: '4',
      title: 'Изучение языков: эффективные методики для быстрого результата',
      channel: 'Полиглот Школа',
      views: '892K',
      uploadTime: '5 дней назад',
      duration: '18:33',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop',
      avatar: 'ПШ'
    },
    {
      id: '5',
      title: 'Здоровое питание: простые рецепты на каждый день',
      channel: 'Кулинарный Мир',
      views: '1.2M',
      uploadTime: '2 дня назад',
      duration: '14:56',
      thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=225&fit=crop',
      avatar: 'КМ'
    },
    {
      id: '6',
      title: 'Фотография для начинающих: основы композиции',
      channel: 'Фото Мастерская',
      views: '654K',
      uploadTime: '1 неделю назад',
      duration: '21:08',
      thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=225&fit=crop',
      avatar: 'ФМ'
    }
  ];

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
    if (newComment.trim() && isLoggedIn) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'Вы',
        avatar: 'В',
        content: newComment.trim(),
        likes: 0,
        timestamp: 'только что'
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-youtube-bg-dark text-youtube-text-primary font-sans">
      {/* Header */}
      <header className="bg-youtube-dark-gray border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="Play" className="text-youtube-red" size={32} />
              <span className="text-xl font-bold">VideoHost</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                placeholder="Поиск видео..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-youtube-bg-dark border-gray-600 text-white pr-12 focus:border-youtube-red"
              />
              <Button
                size="sm"
                className="absolute right-0 top-0 h-full bg-gray-600 hover:bg-gray-500 border-l border-gray-600"
              >
                <Icon name="Search" size={18} />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Bell" size={20} />
            </Button>
            {isLoggedIn ? (
              <Avatar>
                <AvatarFallback className="bg-youtube-red">В</AvatarFallback>
              </Avatar>
            ) : (
              <Button 
                className="bg-youtube-red hover:bg-red-700"
                onClick={() => setIsLoggedIn(true)}
              >
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-youtube-dark-gray min-h-screen p-4 space-y-2">
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
              <Icon name="Home" className="mr-3" size={20} />
              Главная
            </Button>
            <Button variant="ghost" className="w-full justify-start text-youtube-text-secondary hover:bg-gray-700">
              <Icon name="Compass" className="mr-3" size={20} />
              Рекомендации
            </Button>
            <Button variant="ghost" className="w-full justify-start text-youtube-text-secondary hover:bg-gray-700">
              <Icon name="Users" className="mr-3" size={20} />
              Подписки
            </Button>
          </nav>

          <Separator className="bg-gray-600" />

          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-youtube-text-secondary hover:bg-gray-700">
              <Icon name="History" className="mr-3" size={20} />
              История
            </Button>
            <Button variant="ghost" className="w-full justify-start text-youtube-text-secondary hover:bg-gray-700">
              <Icon name="Clock" className="mr-3" size={20} />
              Смотреть позже
            </Button>
            <Button variant="ghost" className="w-full justify-start text-youtube-text-secondary hover:bg-gray-700">
              <Icon name="ThumbsUp" className="mr-3" size={20} />
              Понравившиеся
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {selectedVideo ? (
            /* Video Player View */
            <div className="max-w-5xl mx-auto space-y-6">
              <Card className="bg-black border-gray-700">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Play" className="text-youtube-red mx-auto mb-4" size={64} />
                      <p className="text-xl font-semibold">{selectedVideo.title}</p>
                      <p className="text-youtube-text-secondary mt-2">Видеоплеер будет здесь</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{selectedVideo.title}</h1>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback className="bg-youtube-red">{selectedVideo.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{selectedVideo.channel}</p>
                          <p className="text-sm text-youtube-text-secondary">1.2M подписчиков</p>
                        </div>
                      </div>
                      <Button className="bg-youtube-red hover:bg-red-700">
                        Подписаться
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                        <Icon name="ThumbsUp" className="mr-2" size={16} />
                        1.2K
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                        <Icon name="Share" className="mr-2" size={16} />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-600" />

                {/* Comments Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Комментарии ({comments.length})</h3>
                  
                  {isLoggedIn && (
                    <div className="flex space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-youtube-red">В</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <Input
                          placeholder="Добавьте комментарий..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="bg-transparent border-b border-gray-600 rounded-none focus:border-youtube-red"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setNewComment('')}
                          >
                            Отмена
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-youtube-red hover:bg-red-700"
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                          >
                            Комментировать
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="space-y-3">
                        <div className="flex space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-blue-600">{comment.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-sm">{comment.user}</span>
                              <span className="text-xs text-youtube-text-secondary">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                            <div className="flex items-center space-x-4">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleLikeComment(comment.id)}
                                className="text-youtube-text-secondary hover:text-white"
                              >
                                <Icon name="ThumbsUp" className="mr-1" size={14} />
                                {comment.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-youtube-text-secondary hover:text-white">
                                <Icon name="MessageCircle" className="mr-1" size={14} />
                                Ответить
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="ml-12 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-green-600 text-xs">{reply.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-sm">{reply.user}</span>
                                    <span className="text-xs text-youtube-text-secondary">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-sm">{reply.content}</p>
                                  <div className="flex items-center space-x-4">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleLikeComment(reply.id)}
                                      className="text-youtube-text-secondary hover:text-white"
                                    >
                                      <Icon name="ThumbsUp" className="mr-1" size={14} />
                                      {reply.likes}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={() => setSelectedVideo(null)}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                Вернуться к видео
              </Button>
            </div>
          ) : (
            /* Video Grid View */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Рекомендованные видео</h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="border-gray-600 text-youtube-text-secondary">
                    Популярное
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-youtube-text-secondary">
                    Новое
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                      <div className="p-3 space-y-2">
                        <h3 className="font-semibold text-sm line-clamp-2 leading-tight">
                          {video.title}
                        </h3>
                        <div className="flex items-start space-x-2">
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarFallback className="bg-youtube-red text-xs">{video.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="text-youtube-text-secondary text-xs truncate">{video.channel}</p>
                            <p className="text-youtube-text-secondary text-xs">
                              {video.views} просмотров • {video.uploadTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;