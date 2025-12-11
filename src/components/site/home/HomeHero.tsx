// Combined intro and content in single box
export default function HomeHero() {
  return (
    <div className="bg-[#f0f1f3] rounded-lg border border-gray-100 shadow-3d p-4 mb-6">
      <h1 className="text-sm font-semibold text-gray-800 mb-2">
        Bemästra Sökmotoroptimering (SEO)
      </h1>
      
      <div className="text-xs space-y-2">
        <p>
          För dig som vill <strong>lära dig SEO</strong> och verkligen förstå hur{' '}
          <strong>sökmotoroptimering</strong> fungerar, är detta rätt plats. Vi täcker allt från
          grunderna i en sökordsanalys till avancerad optimering av din hemsida. Vårt uppdrag är
          att ge dig beprövade strategier och praktisk kunskap så att du kan{' '}
          <strong>synas på Google</strong>.
        </p>
        
        <p>
          Men vad innebär det i praktiken? Sökmotoroptimering kan kännas överväldigande. Det är
          en värld av ständigt uppdaterade algoritmer, tekniska termer och hundratals så kallade
          &quot;rankingfaktorer&quot;. Det är lätt att gå vilse. AlltomSEO.se är skapad för att vara din
          kompass i denna värld – en central kunskapskälla som bryter ner komplexa ämnen till
          begripliga och handlingskraftiga steg.
        </p>
        
        <h3 className="text-xs font-semibold text-gray-800 mt-2 mb-1">
          Hur vi hjälper dig att lyckas
        </h3>
        
        <p>
          För att ge dig en tydlig väg framåt har vi strukturerat vår kunskap kring de tre
          kärnpelarna inom all framgångsrik sökmotoroptimering. Genom att förstå och arbeta med
          dessa kan du systematiskt förbättra din närvaro på nätet.
        </p>
        
        <ul className="list-disc pl-4 space-y-0.5 my-1.5">
          <li>
            <strong>On-Page SEO:</strong> Allt du gör direkt på din egen webbplats. Vi lär dig
            att skriva och strukturera innehåll som både användare och Google älskar, från
            sökordsplacering och rubriker till interna länkar och användarupplevelse.
          </li>
          <li>
            <strong>Off-Page SEO:</strong> De signaler som bygger din trovärdighet utanför din
            webbplats. Här handlar det främst om länkar från andra relevanta sidor, men även om
            andra auktoritetssignaler som visar att du är en aktör att lita på.
          </li>
          <li>
            <strong>Teknisk SEO:</strong> Den osynliga ryggraden i din sajt. Vi guidar dig genom
            hur du säkerställer att din webbplats är snabb, säker, mobilvänlig och enkel för
            sökmotorer att genomsöka (indexera), så att inget tekniskt står i vägen för din
            ranking.
          </li>
        </ul>
        
        <h3 className="text-xs font-semibold text-gray-800 mt-2 mb-1">
          Alltid uppdaterad – Alltid relevant
        </h3>
        
        <p>
          Googles introduktion av AI, som SGE (Search Generative Experience), förändrar
          spelplanen kontinuerligt. Att förlita sig på förlegad information är inte ett
          alternativ. Vi bevakar aktivt branschen, analyserar uppdateringar och ser till att
          våra guider och strategier reflekterar de metoder som fungerar idag och imorgon. Hos
          oss hittar du inga snabba &quot;hacks&quot;, bara hållbara och beprövade strategier som bygger
          verkligt värde över tid.
        </p>
        
        <h2 className="text-xs font-semibold text-gray-800 mt-2 mb-1">
          Utforska våra senaste artiklar
        </h2>
        
        <p>
          Börja din resa nu. Dyk ner i våra senaste guider och artiklar här nedanför. 👇
        </p>
      </div>
    </div>
  );
}
