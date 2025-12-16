import Link from 'next/link';
import { Newspaper, Mail, Download, Gift, Shield, Home, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        
        {/* Mission Statement */}
        <div className="mb-12 max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 italic leading-relaxed">
            Capital News believes that independent journalism has the power to inform, engage, 
            and empower citizens, making our society stronger and more just.
          </p>
        </div>

        {/* Main Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          
          {/* NEWS */}
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">NEWS</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/live" className="text-gray-700 hover:text-red-600">Live</Link></li>
              <li><Link href="/world" className="text-gray-700 hover:text-red-600">World</Link></li>
              <li><Link href="/gender" className="text-gray-700 hover:text-red-600">Gender</Link></li>
              <li><Link href="/tech" className="text-gray-700 hover:text-red-600">Tech</Link></li>
              <li><Link href="/politics" className="text-gray-700 hover:text-red-600">Politics</Link></li>
            </ul>
          </div>

          {/* COUNTIES */}
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">COUNTIES</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/nairobi" className="text-gray-700 hover:text-red-600">Nairobi Metro</Link></li>
              <li><Link href="/coast" className="text-gray-700 hover:text-red-600">Coast</Link></li>
              <li><Link href="/mountain" className="text-gray-700 hover:text-red-600">Mountain</Link></li>
              <li><Link href="/lake" className="text-gray-700 hover:text-red-600">Lake Region</Link></li>
              <li><Link href="/rift" className="text-gray-700 hover:text-red-600">Rift Valley</Link></li>
              <li><Link href="/northern" className="text-gray-700 hover:text-red-600">Northern</Link></li>
            </ul>
          </div>

          {/* BUSINESS */}
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">BUSINESS</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/companies" className="text-gray-700 hover:text-red-600">Companies</Link></li>
              <li><Link href="/markets" className="text-gray-700 hover:text-red-600">Finance & Markets</Link></li>
              <li><Link href="/agriculture" className="text-gray-700 hover:text-red-600">Seeds of Gold</Link></li>
              <li><Link href="/enterprise" className="text-gray-700 hover:text-red-600">Enterprise</Link></li>
              <li><Link href="/economy" className="text-gray-700 hover:text-red-600">Economy</Link></li>
            </ul>
          </div>

          {/* OPINION */}
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">OPINION</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/editorials" className="text-gray-700 hover:text-red-600">Editorials</Link></li>
              <li><Link href="/columnists" className="text-gray-700 hover:text-red-600">Our Columnists</Link></li>
              <li><Link href="/guest-blogs" className="text-gray-700 hover:text-red-600">Guest Blogs</Link></li>
              <li><Link href="/letters" className="text-gray-700 hover:text-red-600">Letters</Link></li>
              <li><Link href="/cutting-edge" className="text-gray-700 hover:text-red-600">Cutting Edge</Link></li>
              <li><Link href="/cartoons" className="text-gray-700 hover:text-red-600">Cartoons</Link></li>
            </ul>
          </div>

          {/* SPORTS */}
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">SPORTS</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/motorsport" className="text-gray-700 hover:text-red-600">Motorsport</Link></li>
              <li><Link href="/football" className="text-gray-700 hover:text-red-600">Football</Link></li>
              <li><Link href="/athletics" className="text-gray-700 hover:text-red-600">Athletics</Link></li>
              <li><Link href="/rugby" className="text-gray-700 hover:text-red-600">Rugby</Link></li>
              <li><Link href="/talkup" className="text-gray-700 hover:text-red-600">TalkUP!</Link></li>
              <li><Link href="/sports" className="text-gray-700 hover:text-red-600">Other Sports</Link></li>
            </ul>
          </div>

          {/* LIFE & STYLE */}
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">LIFE & STYLE</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/motoring" className="text-gray-700 hover:text-red-600">Motoring</Link></li>
              <li><Link href="/culture" className="text-gray-700 hover:text-red-600">Culture</Link></li>
              <li><Link href="/family" className="text-gray-700 hover:text-red-600">Family</Link></li>
              <li><Link href="/relationships" className="text-gray-700 hover:text-red-600">Relationships</Link></li>
              <li><Link href="/art-books" className="text-gray-700 hover:text-red-600">Art & Books</Link></li>
              <li><Link href="/travel" className="text-gray-700 hover:text-red-600">Travel Wellness</Link></li>
            </ul>
          </div>
        </div>

        {/* Secondary Navigation Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10 pb-10 border-b border-gray-300">
          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">HEALTH</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/health" className="text-gray-700 hover:text-red-600">Healthy Nation</Link></li>
              <li><Link href="/talking-point" className="text-gray-700 hover:text-red-600">Talking Point</Link></li>
              <li><Link href="/wellness" className="text-gray-700 hover:text-red-600">Wellness</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">PODCASTS</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/podcasts" className="text-gray-700 hover:text-red-600">All Podcasts</Link></li>
              <li><Link href="/daily-brief" className="text-gray-700 hover:text-red-600">Daily Brief</Link></li>
              <li><Link href="/investigations" className="text-gray-700 hover:text-red-600">Investigations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">PHOTOS</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/photo-essays" className="text-gray-700 hover:text-red-600">Photo Essays</Link></li>
              <li><Link href="/galleries" className="text-gray-700 hover:text-red-600">Galleries</Link></li>
              <li><Link href="/visual-stories" className="text-gray-700 hover:text-red-600">Visual Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">NEWSLETTERS</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/newsletters" className="text-gray-700 hover:text-red-600">Morning Brief</Link></li>
              <li><Link href="/evening" className="text-gray-700 hover:text-red-600">Evening Update</Link></li>
              <li><Link href="/weekly" className="text-gray-700 hover:text-red-600">Weekly Digest</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-sm text-gray-900 tracking-wider mb-4">PUZZLES</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/crossword" className="text-gray-700 hover:text-red-600">Crossword</Link></li>
              <li><Link href="/sudoku" className="text-gray-700 hover:text-red-600">Sudoku</Link></li>
              <li><Link href="/word-games" className="text-gray-700 hover:text-red-600">Word Games</Link></li>
            </ul>
          </div>
        </div>

        {/* Subscription & Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="h-5 w-5 text-red-600" />
              <h4 className="font-bold text-gray-900">Capital News Access</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link href="/faqs" className="hover:text-red-600">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-red-600">Contact Us</Link></li>
              <li><Link href="/subscribe" className="hover:text-red-600">Gift Subscription</Link></li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-red-600">
                  <Download className="h-4 w-4" />
                  Download App
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gift className="h-5 w-5 text-red-600" />
              <h4 className="font-bold text-gray-900">Other Subscriptions</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link href="/group" className="hover:text-red-600">Group Subscriptions</Link></li>
              <li><Link href="/student" className="hover:text-red-600">Student Rates</Link></li>
              <li><Link href="/corporate" className="hover:text-red-600">Corporate Plans</Link></li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-5 w-5 text-red-600" />
              <h4 className="font-bold text-gray-900">Home Delivery</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link href="/delivery" className="hover:text-red-600">Schedule Delivery</Link></li>
              <li><Link href="/manage" className="hover:text-red-600">Manage Delivery</Link></li>
              <li><Link href="/holiday" className="hover:text-red-600">Holiday Schedule</Link></li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-red-600" />
              <h4 className="font-bold text-gray-900">Reader Services</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link href="/subscribe" className="hover:text-red-600 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Subscribe to Newsletter</span>
              </Link></li>
              <li><Link href="/mobile" className="hover:text-red-600">Mobile Apps</Link></li>
              <li><Link href="/reprint" className="hover:text-red-600">Reprints & Permissions</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              <p>© 2025 Capital News Company</p>
              <p className="text-xs text-gray-500 mt-1">All rights reserved</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <Link href="/terms" className="hover:text-red-600">Terms of Sale</Link>
              <Link href="/privacy" className="hover:text-red-600 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Privacy Policy</span>
              </Link>
              <Link href="/cookies" className="hover:text-red-600">Cookie Policy</Link>
              <Link href="/accessibility" className="hover:text-red-600">Accessibility</Link>
              <Link href="/help" className="hover:text-red-600">Help</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}