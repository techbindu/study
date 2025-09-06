import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartModal = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartModalProps) => {
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = deliveryLocation === "inside" ? 50 : deliveryLocation === "outside" ? 130 : 0;
  const total = subtotal + deliveryCharge;

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
      onClearCart();
      
      setTimeout(() => {
        setShowThankYou(false);
        onClose();
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

  const adjustQuantity = (id: string, change: number) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        onUpdateQuantity(id, newQuantity);
      } else {
        onRemoveItem(id);
      }
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
            আপনার শপিং কার্ট
          </DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">আপনার কার্ট খালি</h3>
            <p className="text-muted-foreground">কেনাকাটা শুরু করতে পণ্য যোগ করুন</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">৳{item.price} প্রতিটি</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => adjustQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => adjustQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="w-20 text-right">
                      <span className="font-bold">৳{item.price * item.quantity}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Order Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">আপনার নাম *</Label>
                  <Input
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    placeholder="নাম লিখুন"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">ফোন নম্বর *</Label>
                  <Input
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    placeholder="০১৭xxxxxxxx"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">সম্পূর্ণ ঠিকানা *</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="বিস্তারিত ঠিকানা লিখুন"
                />
              </div>

              <div className="space-y-3">
                <Label>ডেলিভারি এলাকা নির্বাচন করুন *</Label>
                <RadioGroup
                  value={deliveryLocation}
                  onValueChange={setDeliveryLocation}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="inside" id="inside" />
                    <Label htmlFor="inside" className="flex-1 cursor-pointer">
                      গোপালগঞ্জ জেলার ভিতরে (৳৫০)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <RadioGroupItem value="outside" id="outside" />
                    <Label htmlFor="outside" className="flex-1 cursor-pointer">
                      অন্যান্য জেলায় (৳১৩০)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Price Summary */}
              <div className="space-y-2 p-4 bg-gradient-subtle rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>সাবটোটাল:</span>
                  <span>৳{subtotal}</span>
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
        )}
      </DialogContent>
    </Dialog>
  );
};