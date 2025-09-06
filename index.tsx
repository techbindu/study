import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { CartModal } from "@/components/CartModal";
import { OrderModal } from "@/components/OrderModal";
import { ProductPreviewModal } from "@/components/ProductPreviewModal";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import productImage from "@/assets/product-balachao.jpg";
import heroBg from "@/assets/hero-bg.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: "balachao_150g",
      name: "Suddho Deal চিংড়ি বালাচাও (150 গ্রাম)",
      price: 195,
      image: productImage,
      description: "ঝালের স্বাদ আর খাঁটি চিংড়ির অনন্য সংমিশ্রণ। ঘরে বসেই অর্ডার করুন।",
      features: ["ফ্রেশ ড্রাই চিংড়ি", "আসল মসলা", "ঝাঁজালো স্বাদ", "হালাল"]
    },
    {
      id: "balachao_250g",
      name: "Suddho Deal চিংড়ি বালাচাও (250 গ্রাম)",
      price: 310,
      image: productImage,
      description: "বড় প্যাক, বড় স্বাদ। পরিবারের জন্য উপযুক্ত। ঘরে বসেই অর্ডার করুন।",
      features: ["ফ্রেশ ড্রাই চিংড়ি", "আসল মসলা", "ঝাঁজালো স্বাদ", "হালাল"]
    }
  ];

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
      }
    });

    toast({
      title: "কার্টে যোগ হয়েছে!",
      description: `${product.name} সফলভাবে কার্টে যোগ করা হয়েছে।`,
    });
  };

  const handleOrderNow = (product: Product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const handlePreview = (product: Product) => {
    setSelectedProduct(product);
    setIsPreviewModalOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartModalOpen(true)} />
      
      {/* Hero Section */}
      <section className="py-16 text-center animate-fade-in">
        <Badge variant="secondary" className="mb-6 px-8 py-3 text-lg font-medium animate-scale-in">
          স্বাগতম
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4 animate-slide-up">
          সবকিছু.com
        </h1>
        <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
          এক ক্লিকে সবকিছু। 🛒
        </p>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-6 py-2 text-lg">
              📦 আমাদের পণ্যসমূহ 📦
            </Badge>
            <h2 className="text-4xl font-bold text-gradient">বিশেষ অফার</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="animate-fade-in">
                <ProductCard
                  product={product}
                  onOrderNow={handleOrderNow}
                  onAddToCart={handleAddToCart}
                  onPreview={handlePreview}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />
      <Footer />

      {/* Modals */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={selectedProduct}
      />

      <ProductPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        product={selectedProduct}
        onOrderNow={handleOrderNow}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Index;
