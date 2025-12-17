import { Mail, Twitter } from 'lucide-react';

const team = [
  {
    name: "Jean-Paul Mwilambwe",
    role: "Editor-in-Chief",
    bio: "20 years of experience covering conflict in the DRC. Former correspondent for Reuters and AFP.",
    initials: "JM"
  },
  {
    name: "Sarah Manzi",
    role: "Senior Humanitarian Correspondent",
    bio: "Focuses on displacement crises and human rights. Based in Goma.",
    initials: "SM"
  },
  {
    name: "David K.",
    role: "Political Analyst",
    bio: "Expert on regional diplomacy and peace accords.",
    initials: "DK"
  },
  {
    name: "Aline Mwiza",
    role: "Investigative Reporter",
    bio: "Specializes in tracking illicit resource flows and armed group financing.",
    initials: "AM"
  }
];

export default function TeamPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black font-serif text-slate-900 mb-4">Editorial Team</h1>
        <p className="text-slate-600">The journalists dedicated to bringing you the truth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {team.map((member) => (
          <div key={member.name} className="bg-slate-50 p-6 rounded-xl text-center border border-slate-100 hover:shadow-md transition-shadow">
            <div className="h-24 w-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black text-slate-400 font-serif">
              {member.initials}
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900 mb-1">{member.name}</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">{member.role}</p>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {member.bio}
            </p>
            <div className="flex justify-center gap-4 text-slate-400">
              <Mail className="h-4 w-4 hover:text-slate-900 cursor-pointer" />
              <Twitter className="h-4 w-4 hover:text-slate-900 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}