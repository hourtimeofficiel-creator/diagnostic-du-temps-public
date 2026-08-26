window.HOURTIME = window.HOURTIME || {};

HOURTIME.WHEELS_LIBRARY = [
  {id:"R01",title:"Titre officiel à compléter",mechanism:"comprendre",description:"à compléter"},
  {id:"R02",title:"Titre officiel à compléter",mechanism:"comprendre",description:"à compléter"},
  {id:"R03",title:"Titre officiel à compléter",mechanism:"comprendre",description:"à compléter"},
  {id:"R04",title:"Titre officiel à compléter",mechanism:"comprendre",description:"à compléter"},
  {id:"R05",title:"Titre officiel à compléter",mechanism:"comprendre",description:"à compléter"},
  {id:"R06",title:"Titre officiel à compléter",mechanism:"comprendre",description:"à compléter"},
  {id:"R07",title:"Titre officiel à compléter",mechanism:"organiser",description:"à compléter"},
  {id:"R08",title:"Titre officiel à compléter",mechanism:"organiser",description:"à compléter"},
  {id:"R09",title:"Titre officiel à compléter",mechanism:"organiser",description:"à compléter"},
  {id:"R10",title:"Titre officiel à compléter",mechanism:"organiser",description:"à compléter"},
  {id:"R11",title:"Titre officiel à compléter",mechanism:"organiser",description:"à compléter"},
  {id:"R12",title:"Titre officiel à compléter",mechanism:"organiser",description:"à compléter"},
  {id:"R13",title:"Titre officiel à compléter",mechanism:"proteger",description:"à compléter"},
  {id:"R14",title:"Titre officiel à compléter",mechanism:"proteger",description:"à compléter"},
  {id:"R15",title:"Titre officiel à compléter",mechanism:"proteger",description:"à compléter"},
  {id:"R16",title:"Titre officiel à compléter",mechanism:"proteger",description:"à compléter"},
  {id:"R17",title:"Titre officiel à compléter",mechanism:"proteger",description:"à compléter"},
  {id:"R18",title:"Titre officiel à compléter",mechanism:"proteger",description:"à compléter"},
  {id:"R19",title:"Titre officiel à compléter",mechanism:"agir",description:"à compléter"},
  {id:"R20",title:"Titre officiel à compléter",mechanism:"agir",description:"à compléter"},
  {id:"R21",title:"Titre officiel à compléter",mechanism:"agir",description:"à compléter"},
  {id:"R22",title:"Titre officiel à compléter",mechanism:"agir",description:"à compléter"},
  {id:"R23",title:"Rebondir après un échec",mechanism:"agir",description:"Retrouver rapidement une dynamique d'action après un blocage."},
  {id:"R24",title:"Construire avec son temps",mechanism:"agir",description:"Transformer les ajustements ponctuels en système durable."}
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
