import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Facebook, Instagram, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-subtle border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Card className="card-modern">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gradient">
                  সবকিছু.com
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  বাংলাদেশের সেরা অনলাইন শপিং প্ল্যাটফর্ম। এক ক্লিকেই পাবেন সব প্রয়োজনীয় পণ্য।
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>গোপালগঞ্জ, বাংলাদেশ</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-foreground">যোগাযোগ করুন</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <a 
                      href="mailto:shobkichuofficial@gmail.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      shobkichuofficial@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">০১৭xxxxxxxxx</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-foreground">সোশ্যাল মিডিয়া</h4>
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-2 h-auto"
                    asChild
                  >
                    <a
                      href="https://www.facebook.com/share/16sSjnvbCa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <Facebook className="h-4 w-4 text-blue-600" />
                      <span className="text-muted-foreground">Facebook Page</span>
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-2 h-auto"
                    asChild
                  >
                    <a
                      href="https://www.instagram.com/shobkichuofficial/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <Instagram className="h-4 w-4 text-pink-600" />
                      <span className="text-muted-foreground">Instagram</span>
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-2 h-auto"
                    asChild
                  >
                    <a
                      href="mailto:shobkichuofficial@gmail.com"
                      className="flex items-center gap-3"
                    >
                      <Mail className="h-4 w-4 text-red-600" />
                      <span className="text-muted-foreground">Email</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                  &copy; {currentYear} সবকিছু.com. সকল অধিকার সংরক্ষিত।
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>🌐 shobkichuofficial.github.io</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
};