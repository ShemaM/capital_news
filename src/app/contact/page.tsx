import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div>
          <h1 className="text-4xl font-black font-serif text-slate-900 mb-6">Contact Us</h1>
          <p className="text-lg text-slate-600 mb-8">
            Have a news tip, a correction, or an inquiry? We want to hear from you. 
            For sensitive information, please use our encrypted channels.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900">General Inquiries</h3>
                <p className="text-slate-600">info@capitalnews.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900">Newsroom Desk</h3>
                <p className="text-slate-600">+254 700 000 000</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900">Bureau Office</h3>
                <p className="text-slate-600">
                  Capital News Bureau<br />
                  Kilimani, Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}