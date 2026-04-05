import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Settings as SettingsIcon,
  Building2,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Palette,
  Save,
  User,
  Key
} from 'lucide-react';

export default function SettingsPage() {
  const { user, company } = useAuth();

  return (
    <Layout title="Налаштування" subtitle="Конфігурація системи">
      <div className="space-y-6">
        <Tabs defaultValue="company" className="space-y-4">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="company" className="gap-2">
              <Building2 className="w-4 h-4" />
              Компанія
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Профіль
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Сповіщення
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Безпека
            </TabsTrigger>
          </TabsList>

          {/* Company Settings */}
          <TabsContent value="company" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Інформація про компанію</CardTitle>
                <CardDescription>Основні дані вашої компанії</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Назва компанії</Label>
                    <Input defaultValue={company.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Телефон</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input defaultValue={company.phone} className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input defaultValue={company.email} className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Адреса</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input defaultValue={company.address} className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                    <Save className="w-4 h-4 mr-2" />
                    Зберегти зміни
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Релейти</CardTitle>
                <CardDescription>Налаштування підключення до Nostr релеїв</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { url: 'wss://relay.ditto.pub', read: true, write: true },
                    { url: 'wss://relay.primal.net', read: true, write: true },
                    { url: 'wss://relay.damus.io', read: true, write: true },
                  ].map((relay, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-mono text-sm">{relay.url}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={relay.read ? 'default' : 'secondary'}>Read</Badge>
                        <Badge variant={relay.write ? 'default' : 'secondary'}>Write</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Профіль користувача</CardTitle>
                <CardDescription>Ваші персональні дані</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e94560] to-[#ff6b6b] flex items-center justify-center text-white text-3xl font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user?.name}</h3>
                    <p className="text-gray-500">{user?.email}</p>
                    <Badge className="mt-2 bg-[#e94560]">{user?.role}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>ПІБ</Label>
                    <Input defaultValue={user?.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue={user?.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Телефон</Label>
                    <Input defaultValue={user?.phone || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label>Посада</Label>
                    <Input defaultValue={user?.position || ''} />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                    <Save className="w-4 h-4 mr-2" />
                    Зберегти зміни
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Сповіщення</CardTitle>
                <CardDescription>Налаштування отримання сповіщень</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: 'Нові замовлення', description: 'Сповіщення про нові замовлення від клієнтів', enabled: true },
                  { label: 'Зміна статусу', description: 'Оновлення статусів виробничих замовлень', enabled: true },
                  { label: 'Низький запас', description: 'Сповіщення про недостатню кількість матеріалів', enabled: true },
                  { label: 'Дедлайни', description: 'Нагадування про наближення дедлайнів', enabled: false },
                  { label: 'Фінансові звіти', description: 'Щоденні звіти про доходи та витрати', enabled: false },
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{notification.label}</p>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                    <Switch defaultChecked={notification.enabled} />
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button className="bg-[#e94560] hover:bg-[#d63d56]">
                    <Save className="w-4 h-4 mr-2" />
                    Зберегти зміни
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Безпека</CardTitle>
                <CardDescription>Налаштування безпеки облікового запису</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Key className="w-5 h-5 text-gray-400" />
                    <h3 className="font-medium">Зміна пароля</h3>
                  </div>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Поточний пароль</Label>
                      <Input type="password" placeholder="Введіть поточний пароль" />
                    </div>
                    <div className="space-y-2">
                      <Label>Новий пароль</Label>
                      <Input type="password" placeholder="Введіть новий пароль" />
                    </div>
                    <div className="space-y-2">
                      <Label>Підтвердження пароля</Label>
                      <Input type="password" placeholder="Підтвердіть новий пароль" />
                    </div>
                    <Button className="bg-[#e94560] hover:bg-[#d63d56] w-fit">
                      Змінити пароль
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <h3 className="font-medium">Двофакторна автентифікація</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Додатковий рівень захисту для вашого облікового запису
                  </p>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 py-4">
          <p>FashionFlow v1.0.0</p>
          <p className="mt-1">Система управління швейним виробництвом</p>
        </div>
      </div>
    </Layout>
  );
}