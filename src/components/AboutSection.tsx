import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Truck, Heart, Award } from "lucide-react";

export const AboutSection = () => {
  const highlights = [
    {
      icon: <Check className="h-5 w-5" />,
      text: "সবকিছু এক জায়গায় – বাজার থেকে স্বাস্থ্যকর গ্রোসারি",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      text: "১০০% খাঁটি ও বাছাইকৃত পণ্য",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      text: "গ্রাহকের বিশ্বাস ও সন্তুষ্টি আমাদের প্রথম অগ্রাধিকার",
    },
    {
      icon: <Truck className="h-5 w-5" />,
      text: "সহজ অর্ডার, দ্রুত ডেলিভারি",
    },
  ];

  const features = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "গুণমান নিশ্চয়তা",
      description: "প্রতিটি পণ্য কঠোর মান নিয়ন্ত্রণের মধ্য দিয়ে পরীক্ষিত",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "নিরাপদ কেনাকাটা",
      description: "সুরক্ষিত পেমেন্ট ও ব্যক্তিগত তথ্যের গোপনীয়তা",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "দ্রুত ডেলিভারি",
      description: "সারা বাংলাদেশে দ্রুততম ডেলিভারি সেবা",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-6 py-2 text-lg">
            আমাদের সম্পর্কে
          </Badge>
          <h2 className="text-4xl font-bold text-gradient mb-6">
            সবকিছু.com – আমাদের সম্পর্কে
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-foreground leading-relaxed">
                <strong>সবকিছু.com</strong> একটি অনলাইন প্ল্যাটফর্ম যেখানে এক ক্লিকেই পাওয়া যায় আপনার দৈনন্দিন জীবনের সব প্রয়োজনীয় জিনিস।
              </p>
              <p className="text-muted-foreground leading-relaxed">
                আমরা বিশ্বাস করি – সময়ের সঠিক ব্যবহার আর বিশুদ্ধ পণ্যের নিশ্চয়তা দিতে পারলেই গ্রাহকের জীবনে স্বাচ্ছন্দ্য আসে।
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">আমাদের বৈশিষ্ট্য</h3>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-success">{highlight.icon}</span>
                    </div>
                    <span className="text-foreground leading-relaxed">{highlight.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gradient-subtle rounded-xl border border-border/50">
              <p className="text-foreground leading-relaxed">
                <strong>সবকিছু.com</strong>-এর মূল লক্ষ্য — আধুনিক প্রযুক্তিকে কাজে লাগিয়ে মানুষের জীবনকে সহজ করা। আমরা চাই, আপনার কেনাকাটা হোক ঝামেলাহীন, নিরাপদ ও আনন্দদায়ক।
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-primary text-primary-foreground rounded-xl">
              <p className="text-xl font-bold">
                👉 কারণ, "যা দরকার, তাই পাবেন – সবকিছু.com"
              </p>
            </div>
          </div>

          {/* Features Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-modern">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary">{feature.icon}</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Statistics */}
            <Card className="card-modern bg-gradient-secondary text-secondary-foreground">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold">৫০০+</div>
                    <div className="text-sm opacity-90">সন্তুষ্ট গ্রাহক</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">৯৮%</div>
                    <div className="text-sm opacity-90">পণ্যের গুণমান</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};