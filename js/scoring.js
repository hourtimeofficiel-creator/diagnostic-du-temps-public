window.HOURTIME = window.HOURTIME || {};
HOURTIME.CONFIG={levels:[{min:0,max:39,label:"Temps subi"},{min:40,max:54,label:"Temps sous tension"},{min:55,max:69,label:"Temps en transition"},{min:70,max:84,label:"Temps maîtrisé"},{min:85,max:100,label:"Temps aligné"}],riskLevels:[{min:0,max:34,label:"Faible",className:"risk-low"},{min:35,max:49,label:"Modéré",className:"risk-moderate"},{min:50,max:69,label:"Élevé",className:"risk-high"},{min:70,max:100,label:"Critique",className:"risk-critical"}]};
HOURTIME.normalize=value=>value==null?null:(Number(value)-1)*25;
HOURTIME.deficit=value=>{const n=HOURTIME.normalize(value);return n==null?null:100-n};
HOURTIME.clamp=n=>Math.max(0,Math.min(100,Number.isFinite(n)?n:0));
HOURTIME.calculateMechanismScore=function(mechanism,answers){const qs=HOURTIME.QUESTIONS.filter(q=>q.mechanism===mechanism&&q.scored);let weighted=0,weights=0,valid=0;qs.forEach(q=>{const a=answers[q.id];if(a===null||a===undefined)return;const s=HOURTIME.normalize(a);weighted+=s*q.weight;weights+=q.weight;valid++});return valid>=5&&weights>0?weighted/weights:null};
HOURTIME.weightedRisk=function(answers,pairs){let sum=0,weight=0,maxDeficit=0;for(const[qid,w]of pairs){const a=answers[qid];if(a===null||a===undefined)continue;const d=HOURTIME.deficit(a);sum+=d*w;weight+=w;maxDeficit=Math.max(maxDeficit,d)}return{score:weight>0?HOURTIME.clamp(sum/weight):null,maxDeficit}};
HOURTIME.calculateThieves=function(answers,mechanisms){const defs=[
{id:"notifications",label:"Notifications et téléphone",mechanism:"proteger",pairs:[[15,.55],[16,.20],[18,.25]]},
{id:"reseaux",label:"Réseaux sociaux et contenus numériques",mechanism:"proteger",pairs:[[18,.70],[15,.20],[28,.10]]},
{id:"interruptions",label:"Interruptions",mechanism:"proteger",pairs:[[16,.55],[21,.25],[15,.20]]},
{id:"urgences",label:"Urgences et imprévus",mechanism:"organiser",pairs:[[4,.35],[11,.30],[26,.20],[8,.15]]},
{id:"priorites",label:"Manque de priorités",mechanism:"organiser",pairs:[[8,.40],[14,.30],[4,.15],[28,.15]]},
{id:"surcharge",label:"Agenda trop chargé",mechanism:"organiser",pairs:[[11,.45],[9,.20],[19,.20],[27,.15]]},
{id:"dispersion",label:"Dispersion / trop de choses à la fois",mechanism:"agir",pairs:[[23,.45],[16,.20],[12,.15],[26,.20]]},
{id:"procrastination",label:"Procrastination",mechanism:"agir",pairs:[[22,.65],[26,.20],[28,.15]]},
{id:"perfectionnisme",label:"Perfectionnisme",mechanism:"agir",pairs:[[24,.70],[23,.15],[26,.15]]},
{id:"autres",label:"Temps donné aux autres",mechanism:"proteger",pairs:[[17,.25],[19,.25],[20,.35],[21,.15]]},
{id:"manque-recul",label:"Manque de recul",mechanism:"comprendre",pairs:[[5,.40],[1,.20],[6,.20],[7,.20]]},
{id:"energie",label:"Manque de récupération / énergie",mechanism:"agir",pairs:[[27,.60],[3,.20],[19,.20]]}
];const thieves=defs.map(def=>{const r=HOURTIME.weightedRisk(answers,def.pairs);return{...def,score:r.score,maxDeficit:r.maxDeficit}});const weakest=Object.entries(mechanisms).filter(([,v])=>v!=null).sort((a,b)=>a[1]-b[1])[0]?.[0];thieves.sort((a,b)=>{if(b.score!==a.score)return b.score-a.score;if(b.maxDeficit!==a.maxDeficit)return b.maxDeficit-a.maxDeficit;if(a.mechanism===weakest&&b.mechanism!==weakest)return-1;if(b.mechanism===weakest&&a.mechanism!==weakest)return 1;return a.label.localeCompare(b.label,"fr")});return thieves};
HOURTIME.getLevel=score=>HOURTIME.CONFIG.levels.find(x=>score>=x.min&&score<=x.max)||HOURTIME.CONFIG.levels[0];
HOURTIME.getRiskLevel=score=>HOURTIME.CONFIG.riskLevels.find(x=>score>=x.min&&score<=x.max)||HOURTIME.CONFIG.riskLevels[0];
HOURTIME.calculateAll=function(answers){const mechanisms={comprendre:HOURTIME.calculateMechanismScore("comprendre",answers),organiser:HOURTIME.calculateMechanismScore("organiser",answers),proteger:HOURTIME.calculateMechanismScore("proteger",answers),agir:HOURTIME.calculateMechanismScore("agir",answers)};const vals=Object.values(mechanisms).filter(v=>v!=null);const index=vals.length===4?vals.reduce((a,b)=>a+b,0)/4:null;const thieves=HOURTIME.calculateThieves(answers,mechanisms);const ordered=Object.entries(mechanisms).filter(([,v])=>v!=null).sort((a,b)=>a[1]-b[1]);const primaryMechanism=ordered[0]?.[0]||null;const secondaryMechanism=ordered[1]&&ordered[1][1]-ordered[0][1]<=7?ordered[1][0]:null;return{mechanisms,index,level:index!=null?HOURTIME.getLevel(Math.round(index)):null,thieves,topThieves:thieves.slice(0,3),primaryMechanism,secondaryMechanism}};
