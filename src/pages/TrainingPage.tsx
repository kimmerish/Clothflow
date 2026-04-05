import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTrainingLessons, mockOrderTraining, mockOrders } from '@/data/mockData';
import type { TrainingLesson, OrderTraining, TrainingProgress } from '@/types';
import { cn } from '@/lib/utils';
import { 
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Play,
  Award,
  ChevronRight,
  Video,
  FileText,
  Trophy,
  Users,
  Target,
  Star
} from 'lucide-react';

const categoryIcons: Record<string, React.ElementType> = {
  cutting: Scissors,
  sewing: BookOpen,
  finishing: Award,
  quality: Target,
  materials: Package,
};

const categoryLabels: Record<string, string> = {
  cutting: 'Крій',
  sewing: 'Пошив',
  finishing: 'ВТО',
  quality: 'Якість',
  materials: 'Матеріали',
};

const categoryColors: Record<string, string> = {
  cutting: '#e94560',
  sewing: '#8b5cf6',
  finishing: '#06b6d4',
  quality: '#f59e0b',
  materials: '#10b981',
};

export default function TrainingPage() {
  const [lessons] = useState<TrainingLesson[]>(mockTrainingLessons);
  const [orderTraining] = useState<OrderTraining[]>(mockOrderTraining);
  const [selectedLesson, setSelectedLesson] = useState<TrainingLesson | null>(null);
  const [isLessonOpen, setIsLessonOpen] = useState(false);

  const completedLessons = lessons.filter(l => 
    orderTraining.some(ot => 
      ot.progress.some(p => p.lessonId === l.id && p.completed)
    )
  ).length;

  const totalScore = orderTraining
    .filter(ot => ot.score !== undefined)
    .reduce((sum, ot) => sum + (ot.score || 0), 0) / 
    (orderTraining.filter(ot => ot.score !== undefined).length || 1);

  const startLesson = (lesson: TrainingLesson) => {
    setSelectedLesson(lesson);
    setIsLessonOpen(true);
  };

  const completeLesson = (lessonId: string) => {
    // In real app, this would update the state
    console.log('Completed lesson:', lessonId);
    setIsLessonOpen(false);
    setSelectedLesson(null);
  };

  return (
    <Layout title="Навчання" subtitle="Система тренінгів та навчальні матеріали">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e94560]/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#e94560]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{lessons.length}</p>
                  <p className="text-sm text-gray-500">Всього уроків</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{completedLessons}</p>
                  <p className="text-sm text-gray-500">Завершено</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {orderTraining.filter(ot => ot.status === 'in_progress').length}
                  </p>
                  <p className="text-sm text-gray-500">В процесі</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#f59e0b]">{totalScore.toFixed(0)}%</p>
                  <p className="text-sm text-gray-500">Середній бал</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lessons" className="space-y-4">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="lessons" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Уроки
            </TabsTrigger>
            <TabsTrigger value="training" className="gap-2">
              <Users className="w-4 h-4" />
              Навчання за замовленнями
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-4">
            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const count = lessons.filter(l => l.category === key).length;
                const Icon = categoryIcons[key] || BookOpen;
                const color = categoryColors[key];
                
                return (
                  <Card 
                    key={key} 
                    className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <CardContent className="p-4 text-center">
                      <div 
                        className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <p className="font-medium text-sm">{label}</p>
                      <p className="text-xs text-gray-500">{count} уроків</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Lessons List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lessons.map((lesson) => {
                const isCompleted = completedLessons > 0 && 
                  orderTraining.some(ot => 
                    ot.progress.some(p => p.lessonId === lesson.id && p.completed)
                  );
                const Icon = categoryIcons[lesson.category] || BookOpen;
                const color = categoryColors[lesson.category];
                
                return (
                  <Card 
                    key={lesson.id}
                    className={cn(
                      "border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer",
                      isCompleted && "ring-2 ring-green-500"
                    )}
                    onClick={() => startLesson(lesson)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${color}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>
                        {isCompleted && (
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Badge 
                          variant="secondary"
                          style={{ 
                            backgroundColor: `${color}15`,
                            color: color
                          }}
                        >
                          {categoryLabels[lesson.category]}
                        </Badge>
                        <CardTitle className="text-lg mt-2">{lesson.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {lesson.description}
                        </CardDescription>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lesson.duration} хв
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-[#e94560]"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Почати
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Order Training Tab */}
          <TabsContent value="training" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Навчання за замовленнями</CardTitle>
                <CardDescription>
                  Перед виконанням замовлення працівники проходять обов'язкові уроки
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderTraining.map((training) => {
                    const completedCount = training.progress.filter(p => p.completed).length;
                    const totalCount = training.requiredLessons.length;
                    const progressPercent = (completedCount / totalCount) * 100;
                    
                    const order = mockOrders.find(o => o.id === training.orderId);
                    
                    return (
                      <div 
                        key={training.id}
                        className="p-4 rounded-xl border bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={
                                  training.status === 'completed' ? 'default' :
                                  training.status === 'in_progress' ? 'secondary' : 'outline'
                                }
                                className={cn(
                                  training.status === 'completed' && 'bg-green-600',
                                  training.status === 'in_progress' && 'bg-purple-600 text-white'
                                )}
                              >
                                {training.status === 'completed' ? 'Завершено' :
                                 training.status === 'in_progress' ? 'В процесі' : 'Очікує'}
                              </Badge>
                              {training.score !== undefined && (
                                <Badge variant="outline" className="gap-1">
                                  <Star className="w-3 h-3" />
                                  {training.score.toFixed(0)}%
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold mt-2">
                              Замовлення {training.orderNumber}
                            </h3>
                            {order && (
                              <p className="text-sm text-gray-500">{order.customerName}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#e94560]">
                              {completedCount}/{totalCount}
                            </p>
                            <p className="text-xs text-gray-500">уроків</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Прогрес</span>
                            <span className="font-medium">{progressPercent.toFixed(0)}%</span>
                          </div>
                          <Progress value={progressPercent} className="h-2" />
                        </div>

                        {/* Required Lessons */}
                        <div className="space-y-2">
                          {training.progress.map((progress) => {
                            const lesson = lessons.find(l => l.id === progress.lessonId);
                            if (!lesson) return null;
                            
                            return (
                              <div 
                                key={progress.lessonId}
                                className={cn(
                                  "flex items-center justify-between p-2 rounded-lg",
                                  progress.completed ? "bg-green-50" : "bg-white"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  {progress.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                                  )}
                                  <span className={cn(
                                    "text-sm",
                                    progress.completed && "text-green-700"
                                  )}>
                                    {progress.lessonTitle}
                                  </span>
                                </div>
                                {progress.completed && progress.score !== undefined && (
                                  <Badge variant="secondary" className="text-xs">
                                    {progress.score}%
                                  </Badge>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-3 border-t">
                          <div className="text-xs text-gray-500">
                            {training.startedAt && (
                              <span>Розпочато: {new Date(training.startedAt).toLocaleDateString('uk-UA')}</span>
                            )}
                          </div>
                          <Button size="sm" className="bg-[#e94560] hover:bg-[#d63d56]">
                            Продовжити
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Lesson Modal */}
        {selectedLesson && (
          <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setIsLessonOpen(false)}
          >
            <Card 
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="sticky top-0 bg-white z-10 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${categoryColors[selectedLesson.category]}15` }}
                    >
                      {categoryIcons[selectedLesson.category] && 
                        React.createElement(categoryIcons[selectedLesson.category], {
                          className: 'w-6 h-6',
                          style: { color: categoryColors[selectedLesson.category] }
                        })
                      }
                    </div>
                    <div>
                      <Badge 
                        variant="secondary"
                        style={{ 
                          backgroundColor: `${categoryColors[selectedLesson.category]}15`,
                          color: categoryColors[selectedLesson.category]
                        }}
                      >
                        {categoryLabels[selectedLesson.category]}
                      </Badge>
                      <CardTitle className="mt-1">{selectedLesson.title}</CardTitle>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsLessonOpen(false)}
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {selectedLesson.duration} хвилин
                  </div>
                  {selectedLesson.videoUrl && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Video className="w-4 h-4" />
                      Відео
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    Текстовий матеріал
                  </div>
                </div>

                {/* Content */}
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {selectedLesson.content}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <Button variant="outline" onClick={() => setIsLessonOpen(false)}>
                    Закрити
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => completeLesson(selectedLesson.id)}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Пройдено
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}

// Import Package and Scissors for the icons
import { Package, Scissors } from 'lucide-react';