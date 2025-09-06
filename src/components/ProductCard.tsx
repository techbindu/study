import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
}

interface ProductCardProps {
  product: Product;
  onOrderNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onPreview: (product: Product) => void;
}

export const ProductCard = ({ 
  product, 
  onOrderNow, 
  onAddToCart, 
  onPreview 
}: ProductCardProps) => {
  return (
    <Card className="card-modern group cursor-pointer overflow-hidden">
      <CardContent className="p-0">
        {/* Image Section */}
        <div 
          className="relative overflow-hidden"
          onClick={() => onPreview(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(product);
            }}
          >
            <Eye className="h-4 w-4 mr-1" />
            দেখুন
          </Button>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="secondary" className="bg-gradient-secondary text-secondary-foreground font-bold text-lg px-3 py-1">
                  ৳{product.price}
                </Badge>
                <span className="text-sm text-success font-medium">স্টকে আছে</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-success flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => onOrderNow(product)}
                className="btn-primary flex-1"
                size="lg"
              >
                অর্ডার করুন
              </Button>
              <Button
                onClick={() => onAddToCart(product)}
                variant="outline"
                className="btn-ghost"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                কার্ট
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};