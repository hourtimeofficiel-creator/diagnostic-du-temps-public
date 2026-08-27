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
    data:{labels:["Comprendre","Organiser","Protéger",["Agir & mieux","vivre"]],datasets:[{label:"Score",data,fill:true,backgroundColor:"rgba(223,196,140,0.18)",borderColor:"rgba(223,196,140,0.95)",borderWidth:2,pointBackgroundColor:"rgba(223,196,140,1)",pointRadius:3}]},
    options:{responsive:true,maintainAspectRatio:false,layout:{padding:{top:12,right:48,bottom:12,left:48}},plugins:{legend:{display:false}},scales:{r:{min:0,max:100,ticks:{stepSize:20,color:"#B9B7B2",showLabelBackdrop:false,font:{size:10,weight:"600"}},angleLines:{color:"rgba(200,169,107,.25)"},grid:{color:"rgba(200,169,107,.20)"},pointLabels:{color:"#F4EFE6",padding:8,font:{family:"Arial, sans-serif",size:13,weight:"700",lineHeight:1.2}}}}}
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
  const isMobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||window.matchMedia("(max-width: 800px)").matches;
  if(!window.jspdf){
    window.print();
    return;
  }
  const payload=HOURTIME._lastPayload;
  if(!payload){
    window.print();
    return;
  }

  try{
    const {result,profile,wheels,recommendations,plan}=payload;
    const profileCopy=HOURTIME.PROFILE_COPY[profile.primary];
    const secondary=profile.secondary?HOURTIME.PROFILE_COPY[profile.secondary]:null;
    const {jsPDF}=window.jspdf;
    const pdf=new jsPDF({orientation:"portrait",unit:"mm",format:"a4",compress:true});
    const W=210,H=297,M=17,C={ink:[28,27,25],gold:[180,140,67],goldLight:[222,197,143],muted:[92,88,82],paper:[250,248,243],soft:[242,236,224],ruby:[125,31,46]};
    let pageNo=0;

    const setColor=c=>pdf.setTextColor(...c);
    const lines=(text,width,size=10)=>{pdf.setFontSize(size);return pdf.splitTextToSize(String(text||""),width)};
    const footer=()=>{pdf.setDrawColor(220,211,194);pdf.line(M,H-15,W-M,H-15);pdf.setFont("helvetica","normal");pdf.setFontSize(8);setColor(C.muted);pdf.text("HourTime - Maîtriser son temps, c'est choisir sa vie.",M,H-9);pdf.text(pageNo+" / 7",W-M,H-9,{align:"right"});};
    const header=(kicker,title,subtitle="")=>{
      pdf.setFillColor(...C.paper);pdf.rect(0,0,W,H,"F");
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(.6);pdf.line(M,15,W-M,15);
      pdf.setFont("helvetica","bold");pdf.setFontSize(9);setColor(C.gold);pdf.text(kicker.toUpperCase(),M,23);
      pdf.setFont("times","bold");pdf.setFontSize(25);setColor(C.ink);pdf.text(lines(title,W-M*2,25),M,35);
      let y=title.length>38?53:47;
      if(subtitle){pdf.setFont("helvetica","normal");pdf.setFontSize(10);setColor(C.muted);pdf.text(lines(subtitle,W-M*2,10),M,y);y+=11;}
      return y+5;
    };
    const newPage=(k,t,s="")=>{if(pageNo>0)pdf.addPage();pageNo+=1;const y=header(k,t,s);footer();return y;};
    const paragraph=(text,x,y,w,size=10,color=C.muted,style="normal",leading=5)=>{
      pdf.setFont("helvetica",style);pdf.setFontSize(size);setColor(color);const l=lines(text,w,size);pdf.text(l,x,y);return y+l.length*leading;
    };
    const card=(x,y,w,h,label,title,body,options={})=>{
      pdf.setFillColor(...(options.fill||C.soft));pdf.setDrawColor(222,211,190);pdf.roundedRect(x,y,w,h,3,3,"FD");
      pdf.setFont("helvetica","bold");pdf.setFontSize(7.5);setColor(options.accent||C.gold);pdf.text(String(label).toUpperCase(),x+5,y+7);
      pdf.setFont("helvetica","bold");pdf.setFontSize(options.titleSize||12);setColor(C.ink);pdf.text(lines(title,w-10,options.titleSize||12),x+5,y+15);
      if(body)paragraph(body,x+5,y+(options.bodyY||24),w-10,options.bodySize||9,C.muted,"normal",options.leading||4.2);
    };
    const bar=(label,value,y)=>{
      pdf.setFont("helvetica","bold");pdf.setFontSize(10);setColor(C.ink);pdf.text(label,M,y);
      pdf.setFillColor(226,220,208);pdf.roundedRect(66,y-3.2,102,4,2,2,"F");
      pdf.setFillColor(...C.gold);pdf.roundedRect(66,y-3.2,Math.max(2,102*Math.round(value)/100),4,2,2,"F");
      pdf.setFontSize(10);setColor(C.gold);pdf.text(Math.round(value)+"/100",W-M,y,{align:"right"});
    };

    let y=newPage("Diagnostic du Temps","Votre synthèse HourTime","Une lecture claire de votre rapport au temps et de vos priorités d'action.");
    pdf.setFillColor(...C.ink);pdf.roundedRect(M,y,W-M*2,58,5,5,"F");
    pdf.setFont("times","bold");pdf.setFontSize(42);setColor(C.goldLight);pdf.text(String(Math.round(result.index)),M+13,y+28);
    pdf.setFont("helvetica","normal");pdf.setFontSize(12);pdf.text("/100",M+37,y+28);
    pdf.setFont("helvetica","bold");pdf.setFontSize(18);pdf.text(result.level.label,M+70,y+20);
    pdf.setFontSize(11);setColor([242,238,229]);pdf.text(lines(profileCopy.label,95,11),M+70,y+31);
    y+=69;
    card(M,y,W-M*2,52,"Votre lecture",result.level.label,HOURTIME.levelCopy(result.level.label),{bodySize:10,leading:4.8});
    y+=61;
    card(M,y,(W-M*2-7)/2,39,"Profil principal",profileCopy.label,profileCopy.strength,{bodySize:8.5,bodyY:23});
    card(M+(W-M*2-7)/2+7,y,(W-M*2-7)/2,39,"Priorité",HOURTIME.MECHANISM_LABELS[result.primaryMechanism],HOURTIME.MECHANISM_ACTIONS[result.primaryMechanism],{bodySize:8.5,bodyY:23});

    y=newPage("Les 4 mécanismes","Votre manière de vivre le temps","Les scores mettent en évidence vos appuis et le mécanisme à renforcer en priorité.");
    Object.entries(result.mechanisms).forEach(([k,v],i)=>bar(HOURTIME.MECHANISM_LABELS[k],v,y+i*14));
    /* Radar vectoriel : rendu net dans tous les lecteurs PDF, sans étirement
       de canvas ni déformation de la police. */
    const radar={cx:105,cy:y+101,rx:49,ry:40};
    pdf.setLineWidth(.25);pdf.setDrawColor(205,190,160);
    for(let level=1;level<=5;level+=1){
      const rx=radar.rx*level/5,ry=radar.ry*level/5;
      pdf.lines([[rx,ry],[-rx,ry],[-rx,-ry],[rx,-ry]],radar.cx,radar.cy-ry,[1,1],"S",true);
    }
    pdf.setDrawColor(190,166,116);
    pdf.line(radar.cx,radar.cy-radar.ry,radar.cx,radar.cy+radar.ry);
    pdf.line(radar.cx-radar.rx,radar.cy,radar.cx+radar.rx,radar.cy);
    const radarScores=[result.mechanisms.comprendre,result.mechanisms.organiser,result.mechanisms.proteger,result.mechanisms.agir].map(v=>Math.max(0,Math.min(100,Number(v)||0))/100);
    const pts=[
      [radar.cx,radar.cy-radar.ry*radarScores[0]],
      [radar.cx+radar.rx*radarScores[1],radar.cy],
      [radar.cx,radar.cy+radar.ry*radarScores[2]],
      [radar.cx-radar.rx*radarScores[3],radar.cy]
    ];
    pdf.setFillColor(231,216,181);pdf.setDrawColor(...C.gold);pdf.setLineWidth(.8);
    pdf.lines([[pts[1][0]-pts[0][0],pts[1][1]-pts[0][1]],[pts[2][0]-pts[1][0],pts[2][1]-pts[1][1]],[pts[3][0]-pts[2][0],pts[3][1]-pts[2][1]],[pts[0][0]-pts[3][0],pts[0][1]-pts[3][1]]],pts[0][0],pts[0][1],[1,1],"FD",true);
    pts.forEach(([px,py])=>pdf.circle(px,py,1.25,"F"));
    pdf.setFont("helvetica","bold");pdf.setFontSize(10);setColor(C.ink);
    pdf.text("Comprendre",radar.cx,radar.cy-radar.ry-7,{align:"center"});
    pdf.text("Organiser",radar.cx+radar.rx+7,radar.cy+2,{align:"left"});
    pdf.text("Protéger",radar.cx,radar.cy+radar.ry+8,{align:"center"});
    pdf.text(["Agir & mieux","vivre"],radar.cx-radar.rx-7,radar.cy-2,{align:"right"});
    pdf.setFont("helvetica","normal");pdf.setFontSize(7);setColor(C.muted);
    [20,40,60,80,100].forEach((value,i)=>pdf.text(String(value),radar.cx+2,radar.cy-radar.ry*(i+1)/5+2));
    card(M,220,W-M*2,42,"Mécanisme prioritaire",HOURTIME.MECHANISM_LABELS[result.primaryMechanism],HOURTIME.MECHANISM_ACTIONS[result.primaryMechanism],{bodySize:9,bodyY:23});

    y=newPage("Votre profil temporel",profileCopy.label,"Votre profil décrit une tendance actuelle : il peut évoluer avec vos choix et vos habitudes.");
    card(M,y,W-M*2,47,"Portrait",profileCopy.label,profileCopy.description,{bodySize:10,leading:4.8});
    y+=56;
    const cw=(W-M*2-7)/2;
    card(M,y,cw,49,"Votre force","Votre point d'appui",profileCopy.strength,{bodySize:9,bodyY:24});
    card(M+cw+7,y,cw,49,"Votre risque","Votre point de vigilance",profileCopy.risk,{bodySize:9,bodyY:24,accent:C.ruby});
    y+=58;
    card(M,y,cw,49,"Votre levier","Votre prochain mouvement",profileCopy.lever,{bodySize:9,bodyY:24});
    if(secondary)card(M+cw+7,y,cw,49,"Tendance secondaire",secondary.label,secondary.description,{bodySize:8.5,bodyY:24});
    y+=60;
    pdf.setFont("times","bold");pdf.setFontSize(16);setColor(C.ink);pdf.text("Vos 3 principaux voleurs de temps",M,y);
    result.topThieves.forEach((t,i)=>card(M+i*((W-M*2-10)/3+5),y+8,(W-M*2-10)/3,43,"#"+(i+1),t.label,Math.round(t.score)+"/100",{titleSize:10.5,bodySize:12,bodyY:33,accent:C.ruby}));

    y=newPage("Les rouages HourTime","Les 3 rouages à travailler","Trois points d'appui concrets sélectionnés à partir de votre diagnostic.");
    wheels.forEach((w,i)=>{card(M,y+i*61,W-M*2,51,"Priorité "+(i+1),w.id+" - "+w.title,w.reason,{bodySize:9.5,bodyY:25,leading:4.6});});

    y=newPage("Vos priorités","3 recommandations personnalisées","Commencez petit : choisissez une recommandation et transformez-la en action visible.");
    recommendations.forEach((r,i)=>{
      pdf.setFillColor(...C.gold);pdf.circle(M+10,y+i*58+15,8,"F");pdf.setFont("helvetica","bold");pdf.setFontSize(13);setColor([255,255,255]);pdf.text(String(i+1),M+10,y+i*58+19,{align:"center"});
      card(M+23,y+i*58,W-M*2-23,47,"Priorité "+(i+1),"Action recommandée",r,{bodySize:10,bodyY:24,leading:4.8});
    });
    card(M,230,W-M*2,32,"Conseil HourTime","Une action tenue vaut mieux que trois intentions parfaites.","Planifiez dès maintenant le premier créneau dans votre agenda.",{bodySize:9,bodyY:23});

    y=newPage("Votre plan d'action","7 jours pour reprendre la main","Un parcours progressif : observer, choisir, protéger, simplifier et consolider.");
    plan.forEach((step,i)=>{
      const rowY=y+i*27;
      pdf.setFillColor(...(i===3||i===4?C.soft:[247,244,237]));pdf.setDrawColor(225,215,196);pdf.roundedRect(M,rowY,W-M*2,23,3,3,"FD");
      pdf.setFont("helvetica","bold");pdf.setFontSize(8);setColor(C.gold);pdf.text("JOUR "+step.day,M+5,rowY+7);
      pdf.setFontSize(11);setColor(C.ink);pdf.text(step.title,M+5,rowY+14);
      pdf.setFont("helvetica","normal");pdf.setFontSize(8.3);setColor(C.muted);pdf.text(lines(step.text,96,8.3),M+50,rowY+7);
      pdf.setFont("helvetica","bold");pdf.setFontSize(8);setColor(C.gold);pdf.text(step.duration,W-M-5,rowY+7,{align:"right"});
      pdf.setDrawColor(...C.gold);pdf.rect(W-M-10,rowY+12,5,5);
    });

    y=newPage("Pour aller plus loin","Passez du diagnostic à l'action","Choisissez la ressource qui correspond à votre prochaine étape.");
    card(M,y,W-M*2,63,"Étape 1 - Gratuit","Les 4 mécanismes HourTime - Version Light","Comprendre, Organiser, Protéger, Agir et mieux vivre son temps. Une vue d'ensemble claire des fondamentaux HourTime.",{bodySize:10,bodyY:27,leading:4.8});
    pdf.setFont("helvetica","bold");pdf.setFontSize(10);setColor(C.gold);pdf.textWithLink("Ouvrir les 4 mécanismes",M+5,y+54,{url:new URL(HOURTIME.MECHANISMS_LIGHT_URL,window.location.href).href});
    y+=74;
    card(M,y,W-M*2,63,"Étape 2 - Premium","Les 24 rouages HourTime","Passez du diagnostic à la transformation avec 24 leviers concrets pour construire une maîtrise durable de votre temps.",{bodySize:10,bodyY:27,leading:4.8});
    pdf.setFont("helvetica","bold");pdf.setFontSize(10);setColor(C.gold);pdf.textWithLink("Découvrir les 24 rouages",M+5,y+54,{url:HOURTIME.ROUAGES_PREMIUM_URL});
    y+=78;
    card(M,y,W-M*2,35,"Votre cap","Pilotez votre temps au lieu de subir vos journées.","Maîtriser son temps, c'est choisir sa vie.",{bodySize:10,bodyY:25});

    const filename="Diagnostic-du-Temps-HourTime.pdf";
    const blob=pdf.output("blob");
    if(isMobile){
      const file=new File([blob],filename,{type:"application/pdf"});
      const blobUrl=URL.createObjectURL(blob);
      const previous=document.getElementById("hourtimePdfActions");
      if(previous)previous.remove();
      const panel=document.createElement("div");
      panel.id="hourtimePdfActions";
      panel.setAttribute("role","dialog");
      panel.setAttribute("aria-modal","true");
      panel.innerHTML=`<div style="position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:9998"></div><div style="position:fixed;z-index:9999;left:16px;right:16px;bottom:20px;padding:22px;border:1px solid #c8a96b;border-radius:18px;background:#171719;color:#f4efe6;box-shadow:0 20px 60px rgba(0,0,0,.55);font-family:Arial,sans-serif"><strong style="display:block;font-size:18px;margin-bottom:6px">Votre rapport PDF est prêt</strong><p style="color:#b9b7b2;line-height:1.45;margin:0 0 16px">Choisissez directement l'action souhaitée.</p><div style="display:grid;gap:10px"><a id="hourtimeOpenPdf" style="padding:14px;border-radius:11px;text-align:center;text-decoration:none;background:#f4efe6;color:#17120b;font-weight:700">Ouvrir le PDF</a><a id="hourtimeSavePdf" download="${filename}" style="padding:14px;border-radius:11px;text-align:center;text-decoration:none;background:#c8a96b;color:#17120b;font-weight:700">Enregistrer le PDF</a><button id="hourtimeSharePdf" type="button" style="display:none;padding:14px;border-radius:11px;border:1px solid #c8a96b;background:transparent;color:#f4efe6;font-weight:700">Partager</button><button id="hourtimeClosePdf" type="button" style="padding:10px;border:0;background:transparent;color:#b9b7b2">Fermer</button></div></div>`;
      document.body.appendChild(panel);
      const openLink=panel.querySelector("#hourtimeOpenPdf");
      const saveLink=panel.querySelector("#hourtimeSavePdf");
      openLink.href=blobUrl;openLink.target="_blank";openLink.rel="noopener";
      saveLink.href=blobUrl;
      const shareButton=panel.querySelector("#hourtimeSharePdf");
      if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
        shareButton.style.display="block";
        shareButton.addEventListener("click",async()=>{
          try{await navigator.share({files:[file],title:"Diagnostic du Temps HourTime"});}
          catch(error){if(!error||error.name!=="AbortError")console.error("Partage PDF impossible",error);}
        });
      }
      panel.querySelector("#hourtimeClosePdf").addEventListener("click",()=>panel.remove());
    }else{
      const blobUrl=URL.createObjectURL(blob);
      const link=document.createElement("a");
      link.href=blobUrl;link.download=filename;
      document.body.appendChild(link);link.click();link.remove();
      setTimeout(()=>URL.revokeObjectURL(blobUrl),30000);
    }
  }catch(error){
    console.error("Échec de génération du rapport PDF",error);
    alert("Le rapport PDF n'a pas pu être généré. Vous pouvez utiliser le bouton Imprimer puis choisir « Enregistrer en PDF ».");
    throw error;
  }
};
