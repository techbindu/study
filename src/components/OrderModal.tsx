import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const OrderModal = ({ isOpen, onClose, product }: OrderModalProps) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  if (!product) return null;

  const productTotal = product.price * quantity;
  const deliveryCharge = deliveryLocation === "inside" ? 50 : deliveryLocation === "outside" ? 130 : 0;
  const total = productTotal + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryLocation) {
      toast({
        title: "ত্রুটি",
        description: "দয়া করে ডেলিভারি এলাকা নির্বাচন করুন।",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowThankYou(true);
      
      setTimeout(() => {
        setShowThankYou(false);
        onClose();
        // Reset form
        setQuantity(1);
        setCustomerName("");
        setAddress("");
        setPhoneNumber("");
        setDeliveryLocation("");
      }, 3000);

      toast({
        title: "অর্ডার সফল!",
        description: "আপনার অর্ডারটি গ্রহণ করা হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।",
      });
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "অর্ডার প্রক্রিয়াকরণে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const adjustQuantity = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  if (showThankYou) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="card-modern max-w-md">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">অর্ডার সফল!</h3>
            <p className="text-muted-foreground">
              আপনার অর্ডারটি গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। 😊
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="card-modern max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">
            অর্ডার কনফার্ম করুন
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex gap-4 p-4 bg-muted/30 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-bold text-foreground">{product.name}</h4>
              <p className="text-success font-bold">৳{product.price}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Quantity Selector */}
            <div className="space-y-2">
              <Label>পরিমাণ</Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => adjustQuantity(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => adjustQuantity(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="ml-4 text-sm text-muted-foreground">
                  সাবটোটাল: ৳{productTotal}
                </span>
              </div>
            </div>

            <Separator />

            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order-name">আপনার নাম *</Label>
                <Input
                  id="order-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  placeholder="নাম লিখুন"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-phone">ফোন নম্বর *</Label>
                <Input
                  id="order-phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  placeholder="০১৭xxxxxxxx"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order-address">সম্পূর্ণ ঠিকানা *</Label>
              <Input
                id="order-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="বিস্তারিত ঠিকানা লিখুন"
              />
            </div>

            {/* Delivery Location */}
            <div className="space-y-3">
              <Label>ডেলিভারি এলাকা নির্বাচন করুন *</Label>
              <RadioGroup
                value={deliveryLocation}
                onValueChange={setDeliveryLocation}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="inside" id="order-inside" />
                  <Label htmlFor="order-inside" className="flex-1 cursor-pointer">
                    গোপালগঞ্জ জেলার ভিতরে (৳৫০)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="outside" id="order-outside" />
                  <Label htmlFor="order-outside" className="flex-1 cursor-pointer">
                    অন্যান্য জেলায় (৳১৩০)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Price Summary */}
            <div className="space-y-2 p-4 bg-gradient-subtle rounded-lg">
              <div className="flex justify-between text-sm">
                <span>পণ্যের মূল্য ({quantity}টি):</span>
                <span>৳{productTotal}</span>
              </div>
              {deliveryCharge > 0 && (
                <div className="flex justify-between text-sm">
                  <span>ডেলিভারি চার্জ:</span>
                  <span>৳{deliveryCharge}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold text-gradient">
                <span>মোট:</span>
                <span>৳{total}</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-lg py-6"
            >
              {isSubmitting ? "অর্ডার প্রক্রিয়াকরণ..." : "অর্ডার কনফার্ম করুন"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};