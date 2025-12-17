export default function MissionPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black font-serif text-slate-900 mb-6">Our Mission</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          To provide independent, fearless, and accurate reporting on the conflict, politics, and humanitarian crisis defining the Great Lakes Region.
        </p>
      </div>

      <div className="prose prose-lg prose-slate mx-auto font-serif">
        <p>
          In a region often misunderstood or overlooked by global media, <strong>Capital News</strong> stands as a witness to history. 
          We believe that reliable information is the foundation of peace and accountability.
        </p>
        <p>
          Our journalism is rooted in three core values:
        </p>
        <ul>
          <li><strong>Independence:</strong> We are not funded by any government or armed group. Our loyalty is to the truth alone.</li>
          <li><strong>Depth:</strong> We go beyond the headlines to understand the &quot;why&quot; behind the conflict.</li>
          <li><strong>Humanity:</strong> We center the voices of the civilians caught in the crossfire, not just the politicians and generals.</li>
        </ul>
        <h3>Why We Focus on the Great Lakes</h3>
        <p>
          From the highlands of South Kivu to the diplomatic corridors of Luanda, the story of this region is complex. 
          It requires journalists who know the terrain, speak the languages, and understand the history. That is who we are.
        </p>
      </div>
    </main>
  );
}