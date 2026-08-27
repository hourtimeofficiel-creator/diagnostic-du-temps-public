window.HOURTIME = window.HOURTIME || {};

HOURTIME.MECHANISMS_LIGHT_URL = HOURTIME.MECHANISMS_LIGHT_URL || "mecanismes-light.html";
HOURTIME.ROUAGES_PREMIUM_URL = HOURTIME.ROUAGES_PREMIUM_URL || "https://lnk.bio/Hourtime.officiel";

HOURTIME.RECOMMENDATIONS={notifications:"Coupez les notifications non essentielles pendant au moins deux plages de la journée.",reseaux:"Définissez des moments précis pour les réseaux sociaux e[...]
HOURTIME.MECHANISM_ACTIONS={comprendre:"Pendant une journée, notez vos principales activités et ce qu'elles vous ont réellement apporté.",organiser:"Préparez votre prochaine journée autour de[...]
HOURTIME.levelCopy=function(level){const map={"Temps subi":"Votre temps semble aujourd'hui largement déterminé par ce qui arrive, par les urgences ou par les demandes extérieures. La priorité e[...]
HOURTIME.buildPlan=function(result){const top=result.topThieves.map(x=>x.id);return[{day:1,title:"Observer",duration:"10 min",text:"Notez pendant une journée les moments où votre temps part autre[...]
HOURTIME.escapeHtml=str=>String(str??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

HOURTIME.renderMechanismRadar=function(canvas,mechanisms){
  if(!canvas||!window.Chart)return;
  if(HOURTIME._radarChart){HOURTIME._radarChart.destroy();}
  const data=["comprendre","organiser","proteger","agir"].map(k=>Math.round(mechanisms[k]||0));
  HOURTIME._radarChart=new Chart(canvas.getContext("2d"),{
    type:"radar",
    data:{labels:["Comprendre","Organiser","Protéger","Agir & mieux vivre"],datasets:[{label:"Score",data,fill:true,backgroundColor:"rgba(223,196,140,0.18)",borderColor:"rgba(223,196,140,0.95)",b[...]
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{r:{min:0,max:100,ticks:{stepSize:20,color:"#B9B7B2",showLabelBackdrop:false},angleLines:{color:"rgba[...]
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
<section class="report-section"><div class="report-hero"><div class="score-ring" style="--score:${Math.round(result.index)}"><strong>${Math.round(result.index)}</strong><small>/100</small></div><d[...]
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">LES 4 MÉCANISMES</div><h2>Votre manière de vivre le temps</h2></div><p>Scores sur 100</p></div><div class="[...]
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">VOTRE PROFIL TEMPOREL</div><h2>${HOURTIME.escapeHtml(p.label)}</h2></div></div><div class="profile-grid"><div[...]
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">VOLEURS DE TEMPS</div><h2>Vos 3 principaux voleurs</h2></div></div><div class="thief-grid">${result.topThieve[...]
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">ROUAGES À TRAVAILLER</div><h2>Les 3 rouages prioritaires</h2></div></div><div class="mechanism-grid">${wheel[...]
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">PRIORITÉS</div><h2>3 recommandations</h2></div></div><div class="recommendation-grid">${recommendations.map([...]
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">PLAN D'ACTION</div><h2>7 jours pour reprendre la main</h2></div></div><div class="plan-grid">${plan.map(a=>`<[...]
<section class="report-section"><div class="section-heading"><div><div class="eyebrow">POUR ALLER PLUS LOIN</div><h2>Passez du diagnostic à l'action</h2></div></div><p class="report-copy">Votre d[...]
<section class="report-section"><p class="disclaimer">Le Diagnostic du Temps HourTime est un outil d'auto-évaluation destiné à favoriser la réflexion sur l'utilisation du temps. Ses résultats[...]

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
  const para=(txt,y,size=11)=>{pdf.setFont("helvetica","normal");pdf.setFontSize(size);pdf.setTextColor(50,50,50);const lines=pdf.splitTextToSize(String(txt||""),maxW);pdf.text(lines,margin,y);ret[...]

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
