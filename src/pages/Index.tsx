import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  brand: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Кожаная куртка',
    price: 15990,
    category: 'Одежда',
    image: 'https://cdn.poehali.dev/projects/6fdbcff3-2564-461e-bce3-3334685dcab7/files/b95a7454-0645-4184-b4d6-e9501f4ab646.jpg',
    brand: 'UrbanStyle',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Коричневый'],
    isNew: true
  },
  {
    id: 2,
    name: 'Белые кроссовки',
    price: 8990,
    category: 'Обувь',
    image: 'https://cdn.poehali.dev/projects/6fdbcff3-2564-461e-bce3-3334685dcab7/files/ccce012a-3fff-433d-bced-9838d02561ac.jpg',
    brand: 'SportLux',
    sizes: ['39', '40', '41', '42', '43'],
    colors: ['Белый', 'Бежевый'],
    isNew: true
  },
  {
    id: 3,
    name: 'Джинсовая куртка',
    price: 6990,
    category: 'Одежда',
    image: 'https://cdn.poehali.dev/projects/6fdbcff3-2564-461e-bce3-3334685dcab7/files/b95a7454-0645-4184-b4d6-e9501f4ab646.jpg',
    brand: 'DenimCo',
    sizes: ['S', 'M', 'L'],
    colors: ['Синий', 'Черный'],
  },
  {
    id: 4,
    name: 'Рюкзак Urban',
    price: 4990,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/6fdbcff3-2564-461e-bce3-3334685dcab7/files/ccce012a-3fff-433d-bced-9838d02561ac.jpg',
    brand: 'UrbanStyle',
    sizes: ['ONE SIZE'],
    colors: ['Черный', 'Серый', 'Синий'],
  },
  {
    id: 5,
    name: 'Спортивные брюки',
    price: 3990,
    category: 'Одежда',
    image: 'https://cdn.poehali.dev/projects/6fdbcff3-2564-461e-bce3-3334685dcab7/files/b95a7454-0645-4184-b4d6-e9501f4ab646.jpg',
    brand: 'SportLux',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Черный', 'Серый'],
  },
  {
    id: 6,
    name: 'Солнцезащитные очки',
    price: 2990,
    category: 'Аксессуары',
    image: 'https://cdn.poehali.dev/projects/6fdbcff3-2564-461e-bce3-3334685dcab7/files/ccce012a-3fff-433d-bced-9838d02561ac.jpg',
    brand: 'LuxVision',
    sizes: ['ONE SIZE'],
    colors: ['Черный', 'Коричневый'],
  },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('catalog');

  const brands = Array.from(new Set(products.map(p => p.brand)));
  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));

  const filteredProducts = products.filter(product => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesSize = selectedSizes.length === 0 || product.sizes.some(size => selectedSizes.includes(size));
    const matchesColor = selectedColors.length === 0 || product.colors.some(color => selectedColors.includes(color));
    const matchesSearch = searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSize && matchesColor && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const newItem: CartItem = {
      ...product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0]
    };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleFilter = (value: string, selected: string[], setter: (v: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              StyleHub
            </h1>
            <nav className="hidden md:flex gap-6">
              <button 
                onClick={() => setActiveSection('catalog')}
                className={`font-medium transition-colors ${activeSection === 'catalog' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
              >
                Каталог
              </button>
              <button 
                onClick={() => setActiveSection('about')}
                className={`font-medium transition-colors ${activeSection === 'about' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
              >
                О нас
              </button>
              <button 
                onClick={() => setActiveSection('contacts')}
                className={`font-medium transition-colors ${activeSection === 'contacts' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
              >
                Контакты
              </button>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative hover:scale-105 transition-transform">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-secondary to-accent">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                          <div className="flex gap-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.selectedSize} • {item.selectedColor}
                              </p>
                              <p className="font-bold text-primary mt-1">{item.price.toLocaleString()} ₽</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeFromCart(index)}
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                          </div>
                        </Card>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity text-white font-semibold py-6">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {activeSection === 'catalog' && (
        <>
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-fade-in"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center animate-scale-in">
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Новая коллекция 2024
                </h2>
                <p className="text-xl text-gray-700 mb-8">
                  Стиль, качество и комфорт в каждой детали
                </p>
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold px-8 py-6 text-lg">
                  Смотреть коллекцию
                </Button>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-64 space-y-6">
                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Icon name="Search" size={20} className="text-primary" />
                    Поиск
                  </h3>
                  <Input 
                    placeholder="Найти товар..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-primary/20 focus:border-primary"
                  />
                </Card>

                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Icon name="Tag" size={20} className="text-secondary" />
                    Бренды
                  </h3>
                  <div className="space-y-3">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                        <Checkbox 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Icon name="Ruler" size={20} className="text-accent" />
                    Размеры
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map(size => (
                      <Badge
                        key={size}
                        variant={selectedSizes.includes(size) ? 'default' : 'outline'}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Icon name="Palette" size={20} className="text-primary" />
                    Цвета
                  </h3>
                  <div className="space-y-3">
                    {allColors.map(color => (
                      <label key={color} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                        <Checkbox 
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleFilter(color, selectedColors, setSelectedColors)}
                        />
                        <span className="text-sm">{color}</span>
                      </label>
                    ))}
                  </div>
                </Card>
              </aside>

              <main className="flex-1">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">Каталог товаров</h2>
                  <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <Card 
                      key={product.id} 
                      className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-secondary to-accent">
                            NEW
                          </Badge>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="mb-2">
                          <Badge variant="outline" className="text-xs">{product.category}</Badge>
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{product.brand}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {product.price.toLocaleString()} ₽
                          </span>
                          <Button 
                            onClick={() => addToCart(product)}
                            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                          >
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            В корзину
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </main>
            </div>
          </section>
        </>
      )}

      {activeSection === 'about' && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              О нас
            </h2>
            <Card className="p-8 shadow-xl">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  StyleHub — это современный интернет-магазин одежды и аксессуаров, где каждый найдет что-то особенное для своего стиля.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Мы тщательно отбираем товары от лучших брендов, следим за качеством и актуальными трендами моды. 
                  Наша миссия — сделать стильную и качественную одежду доступной каждому.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                    <Icon name="Award" size={40} className="mx-auto mb-4 text-primary" />
                    <h3 className="font-bold text-lg mb-2">Качество</h3>
                    <p className="text-sm text-gray-600">Проверенные бренды и материалы</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg">
                    <Icon name="Truck" size={40} className="mx-auto mb-4 text-secondary" />
                    <h3 className="font-bold text-lg mb-2">Доставка</h3>
                    <p className="text-sm text-gray-600">Быстрая доставка по всей России</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg">
                    <Icon name="Heart" size={40} className="mx-auto mb-4 text-accent" />
                    <h3 className="font-bold text-lg mb-2">Забота</h3>
                    <p className="text-sm text-gray-600">Поддержка клиентов 24/7</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Контакты
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 shadow-xl">
                <h3 className="font-bold text-xl mb-6">Свяжитесь с нами</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-gray-600">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={24} className="text-secondary" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">info@stylehub.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={24} className="text-accent" />
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-gray-600">г. Москва, ул. Примерная, д. 1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-gray-600">Ежедневно 9:00 - 21:00</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-8 shadow-xl">
                <h3 className="font-bold text-xl mb-6">Написать нам</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Имя</label>
                    <Input placeholder="Ваше имя" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение</label>
                    <Input placeholder="Ваше сообщение" className="min-h-[100px]" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Отправить
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                StyleHub
              </h3>
              <p className="text-gray-400">Ваш стиль — наша страсть</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-white transition-colors">Каталог</button></li>
                <li><button onClick={() => setActiveSection('about')} className="hover:text-white transition-colors">О нас</button></li>
                <li><button onClick={() => setActiveSection('contacts')} className="hover:text-white transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="hover:bg-primary hover:border-primary">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-secondary hover:border-secondary">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-accent hover:border-accent">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StyleHub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
