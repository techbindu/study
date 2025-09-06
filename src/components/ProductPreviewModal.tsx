import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
}

interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onOrderNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductPreviewModal = ({
  isOpen,
  onClose,
  product,
  onOrderNow,
  onAddToCart
}: ProductPreviewModalProps) => {
  if (!product) return null;

  const handleOrderNow = () => {
    onClose();
    onOrderNow(product);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="card-modern max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            পণ্যের বিস্তারিত
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  স্টকে আছে
                </Badge>
              </div>
            </div>
            
            {/* Rating Display (Mock) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(৪.৮ রেটিং)</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                {product.name}
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="bg-gradient-secondary text-secondary-foreground font-bold text-xl px-4 py-2">
                  ৳{product.price}
                </Badge>
                <span className="text-sm text-muted-foreground line-through">
                  ৳{Math.round(product.price * 1.2)}
                </span>
                <Badge variant="destructive" className="text-xs">
                  ২০% ছাড়
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">বিবরণ</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">বৈশিষ্ট্যসমূহ</h3>
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-success" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="p-4 bg-gradient-subtle rounded-lg border border-border/50">
              <h4 className="font-semibold text-foreground mb-2">গুণগত মানের নিশ্চয়তা</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ ১০০% খাঁটি ও প্রাকৃতিক উপাদান</li>
                <li>✓ হালাল সার্টিফাইড</li>
                <li>✓ স্বাস্থ্য মন্ত্রণালয় কর্তৃক অনুমোদিত</li>
                <li>✓ ৭ দিনের রিটার্ন গ্যারান্টি</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleOrderNow}
                className="btn-primary flex-1 text-lg py-6"
              >
                এখনই অর্ডার করুন
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="btn-ghost flex-1 text-lg py-6"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                কার্টে যোগ করুন
              </Button>
            </div>

            {/* Contact Info */}
            <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
              <p>সরাসরি অর্ডার করতে কল করুন: <span className="font-bold text-primary">০১৭xxxxxxxxx</span></p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};