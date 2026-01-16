import { BadgeCheck, Building2, Code2, Globe, MessageCircle, Phone, Rocket, ShoppingCart, Sparkles, Store } from 'lucide-react'

export default function CompanyPage() {
  const projects = [
    {
      name: 'ViralLinkUp.org',
      icon: Globe,
      tagline: 'Web Hosting Solutions',
      description: 'Premium web hosting services with exclusive offers and reliable performance for your online presence.',
      link: 'https://virallinkup.org',
      gradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      name: 'ViralLinkUp.net',
      icon: Store,
      tagline: 'Digital Library & Marketplace',
      description: 'Publish your creative work and access premium templates and digital products at unbeatable prices.',
      link: 'https://virallinkup.net',
      gradient: 'from-purple-500/10 to-pink-500/10'
    },
    {
      name: 'HebronMart.com',
      icon: ShoppingCart,
      tagline: 'Palestine Digital Mall',
      description: 'Multi-vendor marketplace connecting Palestinian sellers with global buyers. FREE listing for sellers.',
      link: 'https://hebronmart.com',
      gradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      name: 'HebronAI.com',
      icon: Sparkles,
      tagline: 'AI-Powered Answer Engine',
      description: 'Access multiple leading AI models in one unified platform. Built in Palestine, serving the world.',
      link: 'https://hebronai.com',
      gradient: 'from-orange-500/10 to-red-500/10'
    }
  ]

  const services = [
    { code: '58190', name: 'Publishing Activities' },
    { code: '62012', name: 'Software Development' },
    { code: '63110', name: 'Data Processing & Hosting' },
    { code: '70229', name: 'Management Consultancy' }
  ]

  const contacts = [
    { number: '+972 56 622 3014', country: 'Palestine' },
    { number: '+972 53 441 4330', country: 'Palestine' },
    { number: '+44 741 129 0120', country: 'United Kingdom' }
  ]

  return (
    <div className="h-full overflow-auto">
      <div className="w-full py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              VIRALLINKUP LTD
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering Digital Innovation from Palestine
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <BadgeCheck className="size-4 text-primary" />
              <span>Company No. 16804604 | Registered in England & Wales</span>
            </div>
          </section>

          <section className="bg-card rounded-lg p-8 shadow-sm border space-y-6">
            <h2 className="text-3xl font-bold">About VIRALLINKUP LTD</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A digital innovation company registered in London, founded by Palestinian entrepreneur Osama Qonaibe 
                from Hebron. We specialize in creating cutting-edge digital solutions that bridge international 
                markets and empower creators worldwide.
              </p>
              <p>
                With Palestinian roots and global reach, VIRALLINKUP LTD combines technical expertise with deep 
                commitment to democratizing technology. Our portfolio spans web hosting, digital marketplaces, 
                AI platforms, and creative solutions designed to serve both local and international communities.
              </p>
              <p>
                We believe in making premium digital services accessible, affordable, and tailored to the needs of 
                emerging markets while maintaining world-class standards.
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="size-8 text-primary" />
                <h2 className="text-2xl font-bold">Official Registration</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Company Number:</span>
                  <span className="text-foreground font-semibold">16804604</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Company Type:</span>
                  <span className="text-foreground">Private Limited</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                    <BadgeCheck className="size-4" />
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Incorporated:</span>
                  <span className="text-foreground">23 October 2025</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium mb-1">Registered Office:</p>
                  <p className="text-sm">128 City Road, London,<br />United Kingdom, EC1V 2NX</p>
                </div>
                <a 
                  href="https://find-and-update.company-information.service.gov.uk/company/16804604"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-2"
                >
                  View on Companies House →
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border space-y-4">
              <div className="flex items-center gap-3">
                <Code2 className="size-8 text-primary" />
                <h2 className="text-2xl font-bold">Nature of Business</h2>
              </div>
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.code} className="flex gap-3">
                    <span className="text-primary font-mono text-sm font-semibold">{service.code}</span>
                    <span className="text-muted-foreground">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Our Projects</h2>
              <p className="text-muted-foreground">Innovative digital solutions serving communities worldwide</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => {
                const Icon = project.icon
                return (
                  <div 
                    key={project.name} 
                    className={`bg-gradient-to-br ${project.gradient} rounded-lg p-6 border hover:shadow-md transition-shadow space-y-4`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-background rounded-lg">
                        <Icon className="size-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.tagline}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{project.description}</p>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      <Rocket className="size-4" />
                      Get Service
                    </a>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="bg-card rounded-lg p-8 shadow-sm border space-y-6">
            <h2 className="text-3xl font-bold text-center">Founder & Managing Director</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold">Osama Qonaibe</h3>
                <p className="text-muted-foreground">Palestinian Software Developer from Hebron</p>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Palestinian software developer and entrepreneur from Hebron with a vision to create digital 
                  solutions that empower communities and bridge global markets.
                </p>
                <p>
                  Specializing in full-stack web development, AI-powered applications, SaaS platforms, and 
                  digital marketplaces. Committed to making world-class technology accessible to Palestinian 
                  entrepreneurs and businesses.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border space-y-6">
            <h2 className="text-3xl font-bold text-center">Contact Us</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-center text-muted-foreground">
                Get in touch via WhatsApp or Phone
              </p>
              <div className="grid gap-4">
                {contacts.map((contact) => (
                  <div 
                    key={contact.number}
                    className="flex items-center justify-between bg-background/50 rounded-lg p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="size-5 text-primary" />
                      <div>
                        <p className="font-semibold">{contact.number}</p>
                        <p className="text-sm text-muted-foreground">{contact.country}</p>
                      </div>
                    </div>
                    <a 
                      href={`https://wa.me/${contact.number.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="size-4" />
                      WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="text-center space-y-6 py-8">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our services and discover how VIRALLINKUP LTD can help bring your digital vision to life.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a 
                href="/"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Explore HebronAI
              </a>
              <a 
                href="/about"
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
