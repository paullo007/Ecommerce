import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react'

const props = [
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'On all orders over $200. White-glove delivery available.',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'Changed your mind? No problem. Easy, free returns.',
  },
  {
    icon: Shield,
    title: '5-Year Warranty',
    description: 'Every product backed by our quality craftsmanship guarantee.',
  },
  {
    icon: Headphones,
    title: 'Design Support',
    description: 'Expert advice from our in-house design team — free.',
  },
]

export function ValueProps() {
  return (
    <section className="bg-cream-200/60 border-y border-cream-200">
      <div className="max-w-9xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {props.map((prop) => {
            const Icon = prop.icon
            return (
              <div key={prop.title} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-terracotta" />
                </div>
                <h3 className="text-sm font-medium text-charcoal mb-1">{prop.title}</h3>
                <p className="text-xs text-charcoal-400 leading-relaxed">
                  {prop.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
