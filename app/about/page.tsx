import { CheckCircle2, Globe, Heart, Rocket, Sparkles, Target } from 'lucide-react'

export default function AboutPage() {
  const goals = [
    'Make AI accessible across Palestine',
    'Provide seamless user experience',
    'Support Arabic language fully',
    'Offer multiple AI models in one platform',
    'Enable creativity and productivity',
    'Build local AI community'
  ]

  const features = [
    {
      icon: Globe,
      title: 'Built in Palestine',
      description: 'Created in Hebron, serving the world'
    },
    {
      icon: Sparkles,
      title: 'Multi-Model Platform',
      description: 'Access GPT-4, Claude, Gemini, and more'
    },
    {
      icon: Target,
      title: 'Real-time Search',
      description: 'Up-to-date information at your fingertips'
    },
    {
      icon: Heart,
      title: 'Community Focused',
      description: 'Empowering Palestinian innovation'
    },
    {
      icon: Rocket,
      title: 'Fast & Reliable',
      description: 'Optimized for the best experience'
    }
  ]

  return (
    <div className="h-full overflow-auto">
      <div className="w-full py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              About HebronAI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Born in Hebron, Built for the Future
            </p>
          </section>

          <section className="bg-card rounded-lg p-8 shadow-sm border space-y-6">
            <h2 className="text-3xl font-bold">Making AI Accessible in Palestine</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                HebronAI is dedicated to bringing cutting-edge artificial intelligence technology to Palestine, 
                making it seamless, flexible, and accessible for everyone. Our platform bridges the gap between 
                advanced AI capabilities and local innovation needs.
              </p>
              <p>
                Our mission is to break down barriers and empower Palestinian innovators, students, and businesses 
                with world-class AI tools. We believe that access to powerful technology should not be limited by 
                geography, and we are committed to democratizing AI for our community.
              </p>
              <p>
                By providing a unified platform that integrates multiple leading AI models, we enable users to 
                leverage the best of artificial intelligence without the complexity of managing multiple services 
                or navigating international payment barriers.
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border space-y-4">
              <h2 className="text-2xl font-bold">The Creator</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="text-lg font-semibold text-foreground">Osama Qonaibe</p>
                <p>
                  A passionate developer from Hebron with a vision to democratize AI technology in Palestine. 
                  Osama combines technical expertise with a deep commitment to empowering local communities 
                  through innovative solutions.
                </p>
                <p>
                  With a focus on creating accessible, user-friendly platforms, Osama leads the development 
                  of HebronAI to ensure that Palestinian users have access to the same cutting-edge tools 
                  available anywhere in the world.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border space-y-4">
              <h2 className="text-2xl font-bold">Part of Viral LinkUp Ltd</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  HebronAI is proudly part of Viral LinkUp Ltd, a digital innovation company dedicated to 
                  creating cutting-edge solutions that empower businesses and individuals across the region.
                </p>
                <p>
                  As a flagship project of Viral LinkUp, HebronAI represents our commitment to bringing 
                  world-class technology to emerging markets and underserved communities.
                </p>
                <p>
                  Together, we are building a future where technology serves as a bridge, not a barrier, 
                  connecting Palestinian talent with global opportunities.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-lg p-8 shadow-sm border space-y-6">
            <h2 className="text-3xl font-bold text-center">Our Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <div key={goal} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{goal}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Why Choose HebronAI?</h2>
              <p className="text-muted-foreground">A platform designed with you in mind</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={feature.title} 
                    className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow space-y-3"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg w-fit">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="text-center space-y-6 py-8">
            <h2 className="text-3xl font-bold">Join Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be part of the AI revolution in Palestine. Start creating, innovating, and transforming ideas into reality.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="/" 
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </a>
              <a 
                href="/blog" 
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
