window.HOURTIME = window.HOURTIME || {};

HOURTIME.MECHANISMS_LIGHT_URL = HOURTIME.MECHANISMS_LIGHT_URL || "mecanismes-light.html";
HOURTIME.ROUAGES_PREMIUM_URL = HOURTIME.ROUAGES_PREMIUM_URL || "https://lnk.bio/Hourtime.officiel";

HOURTIME.RECOMMENDATIONS={notifications:"Coupez les notifications non essentielles pendant au moins deux plages de la journée.",reseaux:"Définissez des moments précis pour les réseaux sociaux et évitez de les ouvrir par réflexe entre deux tâches.",interruptions:"Créez une plage de 30 à 60 minutes sans interruption pour une activité réellement importante.",urgences:"Avant de réagir, demandez-vous : est-ce vraiment urgent, ou simplement immédiat ?",priorites:"Choisissez trois priorités maximum pour la journée et acceptez que tout le reste soit secondaire.",surcharge:"Ne planifiez pas plus de 70 à 75 % de votre temps disponible afin de conserver 25 à 30 % de marge.",dispersion:"Fermez les tâches secondaires et terminez une chose importante avant d'en ouvrir une nouvelle.",procrastination:"Commencez par une action de moins de dix minutes pour réduire la résistance au démarrage.",perfectionnisme:"Décidez à l'avance du niveau de qualité réellement nécessaire et fixez une limite de temps.",autres:"Réservez dans votre agenda un temps qui vous appartient avant de répondre aux demandes des autres.","manque-recul":"Prenez dix minutes en fin de journée pour noter où votre temps est réellement parti.",energie:"Planifiez une vraie pause et une heure de fin de journée pour protéger votre énergie."};
HOURTIME.MECHANISM_ACTIONS={comprendre:"Pendant une journée, notez vos principales activités et ce qu'elles vous ont réellement apporté.",organiser:"Préparez votre prochaine journée autour de trois priorités maximum et gardez une marge pour l'imprévu.",proteger:"Choisissez une règle simple de protection : notifications coupées, plage sans interruption ou limite claire.",agir:"Choisissez une action importante à terminer avant de passer aux tâches faciles ou secondaires."};
HOURTIME.levelCopy=function(level){const map={"Temps subi":"Votre temps semble aujourd'hui largement déterminé par ce qui arrive, par les urgences ou par les demandes extérieures. La priorité est de retrouver de la visibilité et de la marge.","Temps sous tension":"Vous avez déjà certaines bases, mais votre organisation reste fragile face aux imprévus, aux sollicitations ou à la surcharge.","Temps en transition":"Vous maîtrisez une partie importante de votre temps, mais quelques fragilités continuent de vous éloigner de vos véritables priorités.","Temps maîtrisé":"Votre organisation est solide et vos choix sont globalement cohérents. Le travail porte désormais surtout sur les quelques zones qui consomment encore inutilement votre énergie.","Temps aligné":"Votre temps reflète largement vos priorités et votre manière de vivre. L'objectif n'est plus de tout optimiser, mais de préserver cet alignement."};return map[level]||""};
HOURTIME.buildPlan=function(result){const top=result.topThieves.map(x=>x.id);return[{day:1,title:"Observer",duration:"10 min",text:"Notez pendant une journée les moments où votre temps part autrement que prévu."},{day:2,title:"Choisir",duration:"10 min",text:"Définissez trois priorités maximum pour la journée suivante."},{day:3,title:"Protéger",duration:"30–60 min",text:HOURTIME.RECOMMENDATIONS[top[0]]||HOURTIME.MECHANISM_ACTIONS.proteger},{day:4,title:"Simplifier",duration:"15 min",text:"Supprimez, réduisez ou reportez une activité qui consomme du temps sans réelle valeur."},{day:5,title:"Rééquilibrer",duration:"15 min",text:HOURTIME.RECOMMENDATIONS[top[1]]||HOURTIME.RECOMMENDATIONS.autres},{day:6,title:"Créer de la marge",duration:"10 min",text:HOURTIME.RECOMMENDATIONS.surcharge},{day:7,title:"Faire le bilan",duration:"20 min",text:"Notez ce qui a fonctionné, ce qui a résisté et choisissez une seule habitude HourTime à conserver la semaine prochaine."}]};
HOURTIME.escapeHtml=str=>String(str??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

HOURTIME.renderMechanismRadar=function(canvas,mechanisms){
  if(!canvas||!window.Chart)return;
  if(HOURTIME._radarChart){HOURTIME._radarChart.destroy();}
  const data=["comprendre","organiser","proteger","agir"].map(k=>Math.round(mechanisms[k]||0));
  HOURTIME._radarChart=new Chart(canvas.getContext("2d"),{
    type:"radar",
    data:{labels:["Comprendre","Organiser","Protéger","Agir & mieux vivre"],datasets:[{label:"Score",data,fill:true,backgroundColor:"rgba(223,196,140,0.18)",borderColor:"rgba(223,196,140,0.95)",borderWidth:2,pointBackgroundColor:"rgba(223,196,140,1)",pointRadius:3}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{r:{min:0,max:100,ticks:{stepSize:20,color:"#B9B7B2",showLabelBackdrop:false},angleLines:{color:"rgba(200,169,107,.25)"},grid:{color:"rgba(200,169,107,.20)"},pointLabels:{color:"#F4EFE6",font:{size:12}}}}}
  });
};

HOURTIME.renderReport=function(container,answers,result,profile){
  const mechLabels=HOURTIME.MECHANISM_LABELS;
  const p=HOURTIME.PROFILE_COPY[profile.primary];
  const secondary=profile.secondary?HOURTIME.PROFILE_COPY[profile.secondary]:null;
  const recommendations=[
    HOURTIME.RECOMMENDATIONS[result.topThieves[0]?.id],
    HOURTIME.MECHANISM_ACTIONS[result.primaryMechanism],
    HOURTIME.RECOMMENDATIONS[result.topThieves[1]?.id]
  ].filter(Boolean).filter((x,i,a)=>a.indexOf(x)===i).slice(0,3);
  const plan=HOURTIME.buildPlan(result);
  const wheels=HOURTIME.selectPriorityWheels(result,profile);

  HOURTIME._lastPayload={answers,result,profile,recommendations,plan,wheels};

  container.innerHTML=`
<section class="report-section"><div class="report-hero"><div class="score-ring" style="--score:${Math.round(result.index)}"><strong>${Math.round(result.index)}</strong><small>/100</small></div><div><div class="eyebrow">INDICE HOURTIME</div><h2 class="report-title">${HOURTIME.escapeHtml(result.level.label)}</h2><p class="report-copy">${HOURTIME.levelCopy(result.level.label)}</p></div></div></section>
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">LES 4 MÉCANISMES</div><h2>Votre manière de vivre le temps</h2></div><p>Scores sur 100</p></div><div class="mechanism-bars">${Object.entries(result.mechanisms).map(([k,v])=>`<div class="metric-row"><span>${HOURTIME.escapeHtml(mechLabels[k])}</span><div class="metric-track"><div class="metric-fill" style="width:${Math.round(v)}%"></div></div><span class="metric-value">${Math.round(v)}</span></div>`).join("")}</div><div class="mechanism-radar-wrap"><canvas id="mechanismRadar" aria-label="Radar des mécanismes"></canvas></div><p class="report-copy" style="margin-top:18px">Mécanisme prioritaire : <strong>${HOURTIME.escapeHtml(mechLabels[result.primaryMechanism])}</strong>${result.secondaryMechanism?` · Mécanisme associé : <strong>${HOURTIME.escapeHtml(mechLabels[result.secondaryMechanism])}</strong>`:""}.</p></section>
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">VOTRE PROFIL TEMPOREL</div><h2>${HOURTIME.escapeHtml(p.label)}</h2></div></div><div class="profile-grid"><div class="card"><p>${HOURTIME.escapeHtml(p.description)}</p></div><div class="card"><h3>Votre force</h3><p>${HOURTIME.escapeHtml(p.strength)}</p></div><div class="card"><h3>Votre risque</h3><p>${HOURTIME.escapeHtml(p.risk)}</p></div><div class="card"><h3>Votre levier</h3><p>${HOURTIME.escapeHtml(p.lever)}</p></div>${secondary?`<div class="card"><div class="eyebrow">TENDANCE SECONDAIRE</div><h3>${HOURTIME.escapeHtml(secondary.label)}</h3><p>${HOURTIME.escapeHtml(secondary.description)}</p></div>`:""}</div></section>
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">VOLEURS DE TEMPS</div><h2>Vos 3 principaux voleurs</h2></div></div><div class="thief-grid">${result.topThieves.map((t,i)=>{const rl=HOURTIME.getRiskLevel(Math.round(t.score));return `<article class="card"><div class="eyebrow">#${i+1}</div><h3>${HOURTIME.escapeHtml(t.label)}</h3><div class="big">${Math.round(t.score)}/100</div><span class="risk-badge ${rl.className}">${rl.label}</span><p>${HOURTIME.escapeHtml(HOURTIME.RECOMMENDATIONS[t.id])}</p></article>`}).join("")}</div></section>
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">ROUAGES À TRAVAILLER</div><h2>Les 3 rouages prioritaires</h2></div></div><div class="mechanism-grid">${wheels.map(w=>`<div class="card"><div class="eyebrow">${HOURTIME.escapeHtml(w.id)}</div><h3>${HOURTIME.escapeHtml(w.title)}</h3><p>${HOURTIME.escapeHtml(w.reason)}</p></div>`).join("")}</div></section>
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">PRIORITÉS</div><h2>3 recommandations</h2></div></div><div class="recommendation-grid">${recommendations.map((r,i)=>`<article class="card"><div class="eyebrow">PRIORITÉ ${i+1}</div><p>${HOURTIME.escapeHtml(r)}</p></article>`).join("")}</div></section>
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">PLAN D'ACTION</div><h2>7 jours pour reprendre la main</h2></div></div><div class="plan-grid">${plan.map(a=>`<div class="card plan-day"><div><div class="eyebrow">JOUR ${a.day}</div><strong>${HOURTIME.escapeHtml(a.title)}</strong></div><div><p>${HOURTIME.escapeHtml(a.text)}</p><small>${HOURTIME.escapeHtml(a.duration)}</small></div><input type="checkbox" aria-label="Jour ${a.day} réalisé"></div>`).join("")}</div></section>
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">POUR ALLER PLUS LOIN</div><h2>Passez du diagnostic à l'action</h2></div></div><p class="report-copy">Votre diagnostic vous montre où agir. HourTime peut maintenant vous aider à comprendre comment agir.</p><div class="cta-grid"><article class="card"><div class="eyebrow">GRATUIT</div><h3>Les 4 Mécanismes HourTime — Version Light</h3><p>Découvrez gratuitement les quatre fondamentaux de la méthode HourTime : Comprendre, Organiser, Protéger, Agir & mieux vivre son temps.</p><a class="primary-btn" target="_blank" rel="noopener" href="${HOURTIME.escapeHtml(HOURTIME.MECHANISMS_LIGHT_URL)}">Découvrir gratuitement les 4 mécanismes</a></article><article class="card"><div class="eyebrow">PREMIUM</div><h3>Les 24 Rouages HourTime</h3><p>Passez du diagnostic à la transformation. Les 24 Rouages HourTime vous accompagnent étape par étape pour construire une maîtrise durable de votre temps.</p><a class="primary-btn" target="_blank" rel="noopener" href="${HOURTIME.escapeHtml(HOURTIME.ROUAGES_PREMIUM_URL)}">Découvrir les 24 Rouages</a></article></div></section>
<section class="report-section"><p class="disclaimer">Le Diagnostic du Temps HourTime est un outil d'auto-évaluation destiné à favoriser la réflexion sur l'utilisation du temps. Ses résultats sont indicatifs et ne constituent ni un diagnostic médical, ni psychologique.</p></section>`;

  HOURTIME.renderMechanismRadar(document.getElementById("mechanismRadar"),result.mechanisms);
};

HOURTIME.downloadPdf=async function(reportNode){
  if(!window.jspdf){window.print();return}
  const payload=HOURTIME._lastPayload;
  if(!payload){window.print();return}

  const {result,profile,wheels,recommendations,plan}=payload;
  const profileCopy=HOURTIME.PROFILE_COPY[profile.primary];
  const secondary=profile.secondary?HOURTIME.PROFILE_COPY[profile.secondary]:null;
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF("p","mm","a4");
  const pageW=210,pageH=297,margin=15,maxW=pageW-margin*2;

  const addFooter=(n)=>{pdf.setFontSize(9);pdf.setTextColor(140,140,140);pdf.text(`Page ${n} / 7`,pageW/2,pageH-8,{align:"center"});};
  const title=(txt,y)=>{pdf.setFont("helvetica","bold");pdf.setFontSize(17);pdf.setTextColor(30,30,30);pdf.text(txt,margin,y);return y+8;};
  const para=(txt,y,size=11)=>{pdf.setFont("helvetica","normal");pdf.setFontSize(size);pdf.setTextColor(50,50,50);const lines=pdf.splitTextToSize(String(txt||""),maxW);pdf.text(lines,margin,y);return y+lines.length*5+2;};

  // Page 1
  let y=title("DIAGNOSTIC DU TEMPS — HOURTIME",22);
  y=para(`Indice HourTime : ${Math.round(result.index)}/100`,y+2,12);
  y=para(`Niveau : ${result.level.label}`,y);
  y=para(`Profil : ${profileCopy.label}`,y);
  y=para(HOURTIME.levelCopy(result.level.label),y+2);
  addFooter(1);

  // Page 2
  pdf.addPage();
  y=title("LES 4 MÉCANISMES",22);
  Object.entries(result.mechanisms).forEach(([k,v])=>{y=para(`${HOURTIME.MECHANISM_LABELS[k]} : ${Math.round(v)}/100`,y,11);});

  let radarData=null;
  const radarCanvas=document.getElementById("mechanismRadar");
  if(radarCanvas){radarData=radarCanvas.toDataURL("image/png");}
  else if(window.html2canvas&&reportNode){
    const radarNode=reportNode.querySelector(".mechanism-radar-wrap");
    if(radarNode){
      const canvas=await html2canvas(radarNode,{scale:2,backgroundColor:null,useCORS:true});
      radarData=canvas.toDataURL("image/png");
    }
  }
  if(radarData){pdf.addImage(radarData,"PNG",35,70,140,90,undefined,"FAST");}
  y=175;
  y=para(`Mécanisme prioritaire : ${HOURTIME.MECHANISM_LABELS[result.primaryMechanism]}`,y,11);
  if(result.secondaryMechanism){y=para(`Mécanisme associé : ${HOURTIME.MECHANISM_LABELS[result.secondaryMechanism]}`,y,11);}
  addFooter(2);

  // Page 3
  pdf.addPage();
  y=title("VOTRE PROFIL",22);
  y=para(profileCopy.label,y,12);
  y=para(profileCopy.description,y);
  if(secondary){y=para(`Tendance secondaire : ${secondary.label}`,y);}
  y=para(`Force : ${profileCopy.strength}`,y);
  y=para(`Risque : ${profileCopy.risk}`,y);
  y=para(`Levier : ${profileCopy.lever}`,y);
  y=para("Vos 3 principaux voleurs de temps",y+3,12);
  result.topThieves.forEach((t,i)=>{y=para(`${i+1}. ${t.label} (${Math.round(t.score)}/100)`,y);});
  addFooter(3);

  // Page 4
  pdf.addPage();
  y=title("LES ROUAGES HOURTIME À TRAVAILLER",22);
  wheels.forEach((w,i)=>{
    y=para(`${i+1}. ${w.id} — ${w.title}`,y,12);
    y=para(w.reason,y);
  });
  addFooter(4);

  // Page 5
  pdf.addPage();
  y=title("VOS 3 RECOMMANDATIONS PRIORITAIRES",22);
  recommendations.forEach((r,i)=>{y=para(`${i+1}. ${r}`,y);});
  addFooter(5);

  // Page 6
  pdf.addPage();
  y=title("VOTRE PLAN D'ACTION — 7 JOURS",22);
  plan.forEach(step=>{y=para(`Jour ${step.day} — ${step.title} (${step.duration})`,y,11);y=para(step.text,y);});
  addFooter(6);

  // Page 7
  pdf.addPage();
  y=title("ET MAINTENANT ?",22);
  y=para("Étape 1 — Gratuit",y,12);
  pdf.setTextColor(20,90,160);pdf.setFontSize(11);
  pdf.textWithLink("Découvrir les 4 mécanismes HourTime Light",margin,y,{url:HOURTIME.MECHANISMS_LIGHT_URL});
  y+=10;
  pdf.setTextColor(50,50,50);
  y=para("Étape 2 — Approfondir",y,12);
  pdf.setTextColor(20,90,160);pdf.setFontSize(11);
  pdf.textWithLink("Découvrir les 24 Rouages HourTime",margin,y,{url:HOURTIME.ROUAGES_PREMIUM_URL});
  y+=14;
  pdf.setTextColor(50,50,50);
  y=para("HourTime — Pilotez votre temps au lieu de subir vos journées.",y,12);
  addFooter(7);

  pdf.save("Diagnostic-du-Temps-HourTime.pdf");
};

