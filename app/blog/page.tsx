import { Bot, Brain, Sparkles, Zap } from 'lucide-react'

export default function BlogPage() {
  const models = [
    {
      name: 'GPT-4',
      provider: 'OpenAI',
      icon: Brain,
      strength: 'Natural Language Processing',
      description: 'The most advanced language model for human-like conversations and creative writing.'
    },
    {
      name: 'Claude',
      provider: 'Anthropic',
      icon: Sparkles,
      strength: 'Advanced Reasoning',
      description: 'Superior analytical capabilities with deep understanding and thoughtful responses.'
    },
    {
      name: 'Gemini',
      provider: 'Google',
      icon: Zap,
      strength: 'Real-time Search',
      description: 'Lightning-fast responses with seamless web integration and multimodal understanding.'
    },
    {
      name: 'Grok',
      provider: 'XAI',
      icon: Bot,
      strength: 'Innovation',
      description: 'Cutting-edge AI with unique perspectives and real-time knowledge capabilities.'
    }
  ]

  const features = [
    'Multi-model AI support',
    'Real-time web search',
    'File upload & analysis',
    'Advanced reasoning',
    'Natural conversations',
    'Creative content generation'
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            The AI Revolution
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how artificial intelligence is transforming the way we work, create, and innovate
          </p>
        </section>

        <section className="bg-card rounded-lg p-8 shadow-sm border space-y-6">
          <h2 className="text-3xl font-bold">Unleashing the Power of AI</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Artificial Intelligence has evolved from a futuristic concept to an essential tool that empowers 
              individuals and businesses worldwide. At HebronAI, we harness the capabilities of the world's most 
              advanced AI models to deliver unprecedented productivity and creativity.
            </p>
            <p>
              Our platform integrates multiple cutting-edge AI systems, each excelling in different domains. 
              Whether you need natural language understanding, complex reasoning, real-time information retrieval, 
              or creative content generation, we provide access to the best tools available.
            </p>
            <p>
              The synergy of these AI models creates a powerful ecosystem where your ideas transform into reality. 
              From writing and analysis to research and problem-solving, HebronAI serves as your intelligent partner 
              in achieving excellence.
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Powered by Leading AI Models</h2>
            <p className="text-muted-foreground">Experience the best of artificial intelligence technology</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((model) => {
              const Icon = model.icon
              return (
                <div 
                  key={model.name} 
                  className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-xl font-bold">{model.name}</h3>
                      <p className="text-sm text-muted-foreground">{model.provider}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                      {model.strength}
                    </div>
                    <p className="text-muted-foreground">
                      {model.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border space-y-6">
          <h2 className="text-3xl font-bold text-center">Why Choose HebronAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div 
                key={feature} 
                className="flex items-center gap-3 bg-background/50 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="size-2 bg-primary rounded-full" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center space-y-6 py-8">
          <h2 className="text-3xl font-bold">Start Creating Today</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who are already leveraging the power of AI to transform their ideas into reality.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
