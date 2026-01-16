'use client'

import Link from 'next/link'

import { BadgeCheck, Building2, Crown, GraduationCap, Rocket, Sparkles, Users, Zap } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      icon: Sparkles,
      price: 0,
      tagline: 'Get Started',
      description: 'Perfect for trying out HebronAI and exploring its capabilities.',
      features: [
        'Basic AI models access',
        'Limited messages per day',
        'Standard response speed',
        'Community support'
      ],
      gradient: 'from-gray-500/10 to-slate-500/10',
      popular: false
    },
    {
      id: 'student',
      name: 'Student',
      icon: GraduationCap,
      price: null,
      tagline: 'Canvas Subscribers Only',
      description: 'Exclusive plan for our Canva course subscribers.',
      features: [
        'All Free features',
        'Extended message limit',
        'Priority models access',
        'Email support',
        'Exclusive content'
      ],
      gradient: 'from-blue-500/10 to-cyan-500/10',
      popular: false,
      note: 'Available only for Canva course subscribers'
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Crown,
      price: null,
      tagline: 'Most Popular',
      description: 'Unlimited access to all premium features and AI models.',
      features: [
        'Unlimited messages',
        'All AI models (GPT-4, Claude, Gemini)',
        'Priority response speed',
        'Advanced features',
        'Priority support',
        'Early access to new models'
      ],
      gradient: 'from-purple-500/10 to-pink-500/10',
      popular: true
    },
    {
      id: 'business',
      name: 'Business',
      icon: Building2,
      price: null,
      tagline: 'For Teams',
      description: 'Advanced features for teams and businesses.',
      features: [
        'All Premium features',
        'Team collaboration',
        'Admin dashboard',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee'
      ],
      gradient: 'from-green-500/10 to-emerald-500/10',
      popular: false
    }
  ]

  const faqs = [
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. No questions asked.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and digital wallets through Stripe.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! The Free plan is available forever with no credit card required.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 7-day money-back guarantee for all paid plans. Contact us for assistance.'
    }
  ]

  return (
    <div className="h-full overflow-auto">
      <div className="w-full py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Scale as you grow. Upgrade, downgrade, or cancel anytime.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <div
                  key={plan.id}
                  className={`bg-gradient-to-br ${plan.gradient} rounded-lg p-6 border hover:shadow-lg transition-all space-y-4 relative ${
                    plan.popular ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Zap className="size-3" />
                        {plan.tagline}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-background rounded-lg">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      {!plan.popular && (
                        <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                      )}
                    </div>
                  </div>

                  <div className="py-4">
                    {plan.price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">${plan.price}</span>
                        {plan.price > 0 && <span className="text-muted-foreground">/month</span>}
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-muted-foreground">Coming Soon</div>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm">{plan.description}</p>

                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <BadgeCheck className="size-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.note && (
                    <p className="text-xs text-muted-foreground italic border-t pt-3">
                      {plan.note}
                    </p>
                  )}

                  <button
                    className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={plan.price === null}
                  >
                    {plan.price === null ? (
                      'Coming Soon'
                    ) : plan.price === 0 ? (
                      <>
                        <Rocket className="size-4" />
                        Get Started
                      </>
                    ) : (
                      <>
                        <Crown className="size-4" />
                        Subscribe
                      </>
                    )}
                  </button>
                </div>
              )
            })}
          </section>

          <section className="bg-card rounded-lg p-8 shadow-sm border space-y-6">
            <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center space-y-6 py-8">
            <h2 className="text-3xl font-bold">Still have questions?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Contact us and we&apos;ll help you find the perfect plan for your needs.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                <Sparkles className="size-4" />
                Try HebronAI Free
              </Link>
              <Link
                href="/company"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors inline-flex items-center gap-2"
              >
                <Users className="size-4" />
                Contact Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
