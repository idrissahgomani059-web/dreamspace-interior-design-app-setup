
import { useState } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Sofa, Sparkles } from 'lucide-react';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const designPrompts = [
    {
      title: 'Modern Living Room',
      description: 'Design a modern living room with a minimalist aesthetic, incorporating natural materials and plenty of greenery.',
      icon: Sofa,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
    },
    {
      title: 'Cozy 2-Bedroom Apartment',
      description: 'Create a cozy 2-bedroom apartment layout with a loft area, incorporating a mix of modern and rustic design elements.',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    },
    {
      title: 'Large-Scale Office Building',
      description: 'Design a large-scale office building with 10 floors, featuring a sleek and modern aesthetic.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-gradient-gold">I.B.A</div>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-xl font-bold text-foreground">DreamSpace</h1>
              <p className="text-xs text-muted-foreground">Interior Design Studio</p>
            </div>
          </div>
          <Button className="bg-gradient-gold text-foreground hover:opacity-90 shadow-gold">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-premium">
            Design Your Dream Space
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Create stunning 3D floor plans, visualize your dream space with thousands of furniture items,
            and bring your interior design vision to life with professional-grade tools.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-gradient-gold text-foreground hover:opacity-90 shadow-gold">
              Start Designing
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-[hsl(var(--gold))] text-foreground hover:bg-[hsl(var(--gold))]/10">
              Browse Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Design Prompts */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-3 text-foreground">Get Started with a Design Prompt</h3>
          <p className="text-muted-foreground">Choose a template to begin your design journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {designPrompts.map((prompt, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-premium transition-all duration-300 cursor-pointer border-2 hover:border-[hsl(var(--gold))]"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={prompt.image} 
                  alt={prompt.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <prompt.icon className="w-5 h-5" />
                    <h4 className="font-bold text-lg">{prompt.title}</h4>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardDescription className="text-sm leading-relaxed">
                  {prompt.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-silver text-foreground hover:opacity-90">
                  Use This Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16 bg-gradient-to-br from-slate-50 to-white rounded-3xl my-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-3 text-foreground">Powerful Features</h3>
          <p className="text-muted-foreground">Everything you need to design professional spaces</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: '3D Floor Plans', description: 'Create detailed floor plans with intuitive drawing tools' },
            { title: 'Multi-Floor Buildings', description: 'Design buildings with 5+ floors and complex layouts' },
            { title: 'Furniture Library', description: 'Browse thousands of furniture items and materials' },
            { title: 'Design Styles', description: 'Apply preset styles from minimalist to luxurious' },
            { title: '4K Renders', description: 'Generate photorealistic renders of your designs' },
            { title: 'Real-time Collaboration', description: 'Work together with designers and architects' },
          ].map((feature, index) => (
            <Card key={index} className="border-2 hover:border-[hsl(var(--silver))] transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
          <p className="text-sm">
            © 2025 Idrees Building Architecture. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;