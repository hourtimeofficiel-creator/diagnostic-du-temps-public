window.HOURTIME = window.HOURTIME || {};

HOURTIME.WHEELS_LIBRARY = [
  {id:"R01",title:"Identifier ses voleurs de temps",mechanism:"comprendre",description:"Repérer les activités, habitudes et interruptions qui détournent le temps."},
  {id:"R02",title:"Définir ses véritables priorités",mechanism:"comprendre",description:"Distinguer ce qui occupe le temps de ce qui mérite réellement de le recevoir."},
  {id:"R03",title:"La méthode Pareto",mechanism:"comprendre",description:"Identifier les actions à fort impact qui produisent l'essentiel des résultats."},
  {id:"R04",title:"La matrice d'Eisenhower",mechanism:"comprendre",description:"Distinguer l'important de l'urgent et choisir l'action adaptée."},
  {id:"R05",title:"Estimer correctement la durée d'une tâche",mechanism:"comprendre",description:"Construire une estimation réaliste incluant les temps invisibles et l'incertitude."},
  {id:"R06",title:"Faire le bilan de sa journée ou de sa semaine",mechanism:"comprendre",description:"Observer le réel, comprendre les écarts et préparer un ajustement."},
  {id:"R07",title:"La planification hebdomadaire",mechanism:"organiser",description:"Donner une direction claire à la semaine avant qu'elle ne se remplisse."},
  {id:"R08",title:"Construire sa semaine idéale",mechanism:"organiser",description:"Créer une structure de référence adaptée aux priorités, à l'énergie et à l'équilibre."},
  {id:"R09",title:"Planifier sa journée la veille",mechanism:"organiser",description:"Préparer les priorités, engagements et conditions de démarrage du lendemain."},
  {id:"R10",title:"La méthode Time Blocking",mechanism:"organiser",description:"Réserver des blocs de temps précis aux tâches et priorités importantes."},
  {id:"R11",title:"Créer des routines utiles",mechanism:"organiser",description:"Associer une petite action utile à un déclencheur stable pour réduire l'effort de décision."},
  {id:"R12",title:"Prévoir du temps pour les imprévus",mechanism:"organiser",description:"Réserver une marge d'adaptation afin de protéger les priorités."},
  {id:"R13",title:"Apprendre à dire non",mechanism:"proteger",description:"Poser des limites claires sans abîmer la relation."},
  {id:"R14",title:"Gérer les interruptions",mechanism:"proteger",description:"Filtrer les interruptions et préparer une reprise rapide."},
  {id:"R15",title:"Créer des périodes de concentration profonde",mechanism:"proteger",description:"Protéger un temps défini pour une tâche exigeante et unique."},
  {id:"R16",title:"Réduire les distractions numériques",mechanism:"proteger",description:"Réduire les signaux numériques et créer de la friction."},
  {id:"R17",title:"La méthode Pomodoro",mechanism:"proteger",description:"Alterner concentration et récupération avec un rythme soutenable."},
  {id:"R18",title:"La règle des deux minutes",mechanism:"proteger",description:"Traiter immédiatement les petites actions utiles et claires sans perdre la priorité."},
  {id:"R19",title:"Sortir de la procrastination",mechanism:"agir",description:"Réduire la résistance en rendant le premier pas très petit et concret."},
  {id:"R20",title:"Passer de l'intention à l'action",mechanism:"agir",description:"Transformer une intention en action précise, datée et préparée."},
  {id:"R21",title:"Suivre sa progression",mechanism:"agir",description:"Rendre les avancées visibles afin de comprendre et ajuster l'effort."},
  {id:"R22",title:"Maintenir sa motivation dans le temps",mechanism:"agir",description:"S'appuyer sur le sens, le progrès et un rythme soutenable."},
  {id:"R23",title:"Rebondir après un échec",mechanism:"agir",description:"Transformer un écart en apprentissage puis en nouvelle action."},
  {id:"R24",title:"Construire avec son temps",mechanism:"agir",description:"Assembler les rouages utiles en un système personnel simple et évolutif."}
];

HOURTIME.WHEEL_BY_ID = Object.fromEntries(HOURTIME.WHEELS_LIBRARY.map(w => [w.id, w]));
HOURTIME.getWheelById = id => HOURTIME.WHEEL_BY_ID[id] || null;

HOURTIME.selectPriorityWheels=function(result,profile){
  const used=new Set();
  const selected=[];
  const mechanismMap={comprendre:["R01","R03","R06"],organiser:["R07","R09","R12"],proteger:["R13","R15","R18"],agir:["R19","R22","R24"]};
  const thiefMap={
    notifications:"R13",reseaux:"R15",interruptions:"R14",urgences:"R07",priorites:"R08",surcharge:"R12",
    dispersion:"R20",procrastination:"R19",perfectionnisme:"R21",autres:"R17","manque-recul":"R02",energie:"R23"
  };
  const profileMap={subi:"R07",disperse:"R20",sacrifie:"R17",controle:"R21",aligne:"R24"};

  const add=(id,reason)=>{
    const wheel=HOURTIME.getWheelById(id);
    if(!wheel||used.has(id)||selected.length>=3)return;
    used.add(id);
    selected.push({...wheel,reason});
  };

  const weakest = result.primaryMechanism;
  (mechanismMap[weakest]||[]).forEach((id,idx)=>{
    if(idx===0){
      add(id,`Parce que ${HOURTIME.MECHANISM_LABELS[weakest]} est actuellement votre mécanisme le plus fragile.`);
    }
  });

  (result.topThieves||[]).forEach(t=>{
    add(thiefMap[t.id],`Relié à votre voleur de temps : ${t.label.toLowerCase()}.`);
  });

  add(profileMap[profile.primary],`Cohérent avec votre profil principal : ${HOURTIME.PROFILE_COPY[profile.primary]?.label||""}.`);
  add("R24","Pour transformer les corrections ponctuelles en système durable.");

  const fallbackPool=(mechanismMap[weakest]||[]).concat(["R23","R24"]);
  fallbackPool.forEach(id=>add(id,`Rouage de consolidation du mécanisme ${HOURTIME.MECHANISM_LABELS[weakest]}.`));

  return selected.slice(0,3);
};
