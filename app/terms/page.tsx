import { AlertCircle, FileText, Info, Lock, Scale, Shield, UserCheck } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using HebronAI ("Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.',
        'These terms constitute a legally binding agreement between you and VIRALLINKUP LTD (Company No. 16804604), a private limited company registered in England and Wales.',
        'Your continued use of the Service after any modifications to these terms constitutes acceptance of those changes.'
      ]
    },
    {
      icon: UserCheck,
      title: 'Use of Service',
      content: [
        'HebronAI provides access to multiple artificial intelligence models for information, assistance, and content generation. You may use the Service for lawful purposes only.',
        'You are responsible for all content you input into the Service and for ensuring your use complies with applicable laws and regulations.',
        'We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice.',
        'The Service is provided "as is" and "as available" without warranties of any kind, either express or implied.'
      ]
    },
    {
      icon: Lock,
      title: 'User Accounts & Authentication',
      content: [
        'Some features may require account registration. You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to provide accurate, current, and complete information during registration and to update such information as necessary.',
        'You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use.',
        'We reserve the right to terminate accounts that violate these terms or engage in fraudulent activity.'
      ]
    },
    {
      icon: Shield,
      title: 'Privacy & Data Protection',
      content: [
        'We are committed to protecting your privacy in accordance with UK GDPR and applicable data protection laws.',
        'Your personal data is processed as described in our Privacy Policy. By using the Service, you consent to such processing.',
        'We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction.',
        'Conversation data may be used to improve our services unless you opt out. We do not sell your personal data to third parties.'
      ]
    },
    {
      icon: Scale,
      title: 'Intellectual Property Rights',
      content: [
        'All intellectual property rights in the Service, including software, design, text, and graphics, are owned by VIRALLINKUP LTD or our licensors.',
        'You retain ownership of content you input into the Service. AI-generated outputs are provided to you for your use, subject to these terms.',
        'You may not copy, modify, distribute, sell, or exploit any portion of the Service without our express written permission.',
        'Our trademarks, logos, and brand features ("HebronAI", "VIRALLINKUP") may not be used without prior authorization.'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Prohibited Activities',
      content: [
        'You may not use the Service to generate illegal, harmful, fraudulent, or abusive content.',
        'Prohibited uses include: harassment, hate speech, violence promotion, illegal activities, misinformation campaigns, or violation of third-party rights.',
        'You may not attempt to reverse engineer, hack, or circumvent security measures of the Service.',
        'Automated scraping, excessive API usage, or attempts to overload our systems are strictly prohibited.',
        'We reserve the right to suspend or terminate access for users who violate these prohibitions.'
      ]
    },
    {
      icon: Info,
      title: 'AI-Generated Content & Accuracy',
      content: [
        'AI-generated content may contain inaccuracies, errors, or outdated information. Always verify critical information from authoritative sources.',
        'The Service relies on third-party AI models. We do not guarantee the accuracy, completeness, or reliability of generated content.',
        'You are solely responsible for evaluating and using AI-generated content. Do not rely on it for medical, legal, or financial advice.',
        'AI outputs may occasionally include biased or inappropriate content despite our filtering efforts. Report such content to help us improve.'
      ]
    },
    {
      icon: Shield,
      title: 'Limitation of Liability',
      content: [
        'To the maximum extent permitted by law, VIRALLINKUP LTD shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
        'This includes damages for loss of profits, data, use, goodwill, or other intangible losses resulting from your use or inability to use the Service.',
        'Our total liability for any claims arising from these terms or your use of the Service shall not exceed the amount you paid us in the past 12 months.',
        'Some jurisdictions do not allow limitations on liability, so these limitations may not apply to you.'
      ]
    },
    {
      icon: Scale,
      title: 'Indemnification',
      content: [
        'You agree to indemnify and hold harmless VIRALLINKUP LTD, its officers, directors, employees, and agents from any claims, damages, losses, or expenses.',
        'This includes reasonable legal fees arising from your use of the Service, violation of these terms, or infringement of third-party rights.',
        'We reserve the right to assume exclusive defense and control of any matter subject to indemnification by you.'
      ]
    },
    {
      icon: FileText,
      title: 'Governing Law & Jurisdiction',
      content: [
        'These terms are governed by the laws of England and Wales, without regard to conflict of law principles.',
        'Any disputes arising from these terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
        'If any provision of these terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Third-Party Services',
      content: [
        'The Service integrates third-party AI models and services (OpenAI, Anthropic, Google, XAI). Your use is also subject to their respective terms.',
        'We are not responsible for third-party services, their availability, content, or policies.',
        'Links to external websites are provided for convenience. We do not endorse or control external sites and are not responsible for their content.'
      ]
    },
    {
      icon: Info,
      title: 'Changes to Terms',
      content: [
        'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page.',
        'Continued use of the Service after changes constitutes acceptance of the modified terms.',
        'We encourage you to review these terms periodically. The "Last Updated" date at the top indicates when changes were last made.'
      ]
    }
  ]

  return (
    <div className="h-full overflow-auto">
      <div className="w-full py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: January 16, 2026
            </p>
          </section>

          <section className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 border space-y-4">
            <h2 className="text-2xl font-bold">Welcome to HebronAI</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                HebronAI is operated by <strong className="text-foreground">VIRALLINKUP LTD</strong>, a private 
                limited company registered in England and Wales (Company No. <strong className="text-foreground">16804604</strong>).
              </p>
              <p>
                These Terms of Service govern your access to and use of our artificial intelligence platform. 
                Please read them carefully before using our services.
              </p>
              <p className="text-sm pt-2 border-t">
                <strong className="text-foreground">Registered Office:</strong> 128 City Road, London, United Kingdom, EC1V 2NX
              </p>
            </div>
          </section>

          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <section key={index} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="bg-card rounded-lg p-6 shadow-sm border space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            )
          })}

          <section className="bg-card rounded-lg p-8 shadow-sm border space-y-4">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong className="text-foreground">Company:</strong> VIRALLINKUP LTD</p>
                <p><strong className="text-foreground">Registration:</strong> 16804604 (England & Wales)</p>
                <p><strong className="text-foreground">Address:</strong> 128 City Road, London, EC1V 2NX, United Kingdom</p>
                <p><strong className="text-foreground">Phone:</strong> +44 741 129 0120</p>
              </div>
            </div>
          </section>

          <section className="text-center space-y-6 py-8">
            <p className="text-muted-foreground">
              By using HebronAI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="/"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Return to HebronAI
              </a>
              <a 
                href="/company"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors"
              >
                About Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
