window.HOURTIME = window.HOURTIME || {};

const FACTUAL_OPTIONS = {
  daysLowToHigh:[
    {value:1,label:"0 à 1 jour sur 7"},
    {value:2,label:"2 jours sur 7"},
    {value:3,label:"3 à 4 jours sur 7"},
    {value:4,label:"5 jours sur 7"},
    {value:5,label:"6 à 7 jours sur 7"}
  ],
  daysHighToLow:[
    {value:1,label:"6 à 7 jours sur 7"},
    {value:2,label:"5 jours sur 7"},
    {value:3,label:"3 à 4 jours sur 7"},
    {value:4,label:"2 jours sur 7"},
    {value:5,label:"0 à 1 jour sur 7"}
  ],
  interruptionsHighToLow:[
    {value:1,label:"6 fois ou plus"},
    {value:2,label:"4 à 5 fois"},
    {value:3,label:"2 à 3 fois"},
    {value:4,label:"1 fois"},
    {value:5,label:"0 fois"}
  ],
  blocksLowToHigh:[
    {value:1,label:"0 bloc"},
    {value:2,label:"1 bloc"},
    {value:3,label:"2 blocs"},
    {value:4,label:"3 blocs"},
    {value:5,label:"4 blocs ou plus"}
  ],
  prioritiesLowToHigh:[
    {value:1,label:"5 priorités ou plus"},
    {value:2,label:"4 priorités"},
    {value:3,label:"3 priorités"},
    {value:4,label:"2 priorités"},
    {value:5,label:"1 priorité claire"}
  ],
  marginLowToHigh:[
    {value:1,label:"Moins de 5 %"},
    {value:2,label:"5 à 10 %"},
    {value:3,label:"11 à 20 %"},
    {value:4,label:"21 à 30 %"},
    {value:5,label:"Plus de 30 %"}
  ],
  socialHighToLow:[
    {value:1,label:"Plus de 3 h"},
    {value:2,label:"2 à 3 h"},
    {value:3,label:"1 à 2 h"},
    {value:4,label:"30 à 60 min"},
    {value:5,label:"Moins de 30 min"}
  ],
  completionLowToHigh:[
    {value:1,label:"0 % à 20 %"},
    {value:2,label:"21 % à 40 %"},
    {value:3,label:"41 % à 60 %"},
    {value:4,label:"61 % à 80 %"},
    {value:5,label:"81 % à 100 %"}
  ],
  phoneHighToLow:[
    {value:1,label:"Plus de 4 h"},
    {value:2,label:"3 à 4 h"},
    {value:3,label:"2 à 3 h"},
    {value:4,label:"1 à 2 h"},
    {value:5,label:"Moins de 1 h"}
  ],
  openProjectsHighToLow:[
    {value:1,label:"10 ou plus"},
    {value:2,label:"7 à 9"},
    {value:3,label:"4 à 6"},
    {value:4,label:"2 à 3"},
    {value:5,label:"0 à 1"}
  ],
  energyLowToHigh:[
    {value:1,label:"Épuisé(e), plus rien à donner"},
    {value:2,label:"Fatigué(e), difficulté à me concentrer"},
    {value:3,label:"Moyen, je tiens mais sans élan"},
    {value:4,label:"Correct, encore de l'énergie disponible"},
    {value:5,label:"Bon, je me sens disponible et concentré(e)"}
  ]
};

HOURTIME.OPTIONS = FACTUAL_OPTIONS.daysLowToHigh;
HOURTIME.QUESTIONS=[
{id:1,mechanism:"comprendre",pillar:"mindset",weight:1.50,scored:true,text:"Si je vous demande de reconstituer votre journée d'hier, heure par heure, vous pouvez le faire avec précision ?",options:[{value:1,label:"Non, je n'ai aucune idée"},{value:2,label:"Je me souviens de 2 ou 3 moments"},{value:3,label:"Je reconnais les grandes plages mais pas les détails"},{value:4,label:"Je me souviens de la majorité de ma journée"},{value:5,label:"Oui, je peux reconstituer presque toute ma journée"}]},
{id:2,mechanism:"comprendre",pillar:"accomplissement",weight:1.25,scored:true,text:"Cette semaine, combien de fois avez-vous repéré une activité qui prend trop de temps pour peu de valeur réelle ?",options:[{value:1,label:"Aucune fois"},{value:2,label:"1 fois"},{value:3,label:"2 à 3 fois"},{value:4,label:"4 à 5 fois"},{value:5,label:"6 fois ou plus"}]},
{id:3,mechanism:"comprendre",pillar:"lifestyle",weight:1.25,scored:true,text:"En ce moment, à quel moment de la journée réalisez-vous vos activités les plus exigeantes intellectuellement ?",options:[{value:1,label:"Je ne sais pas, ça dépend de ce qui arrive"},{value:2,label:"Plutôt en fin de journée, quand tout le reste est fait"},{value:3,label:"Le matin mais souvent interrompu(e)"},{value:4,label:"Je connais mon pic d'énergie et j'essaie de l'utiliser"},{value:5,label:"Je protège systématiquement mon pic d'énergie pour ces tâches"}]},
{id:4,mechanism:"comprendre",pillar:"mindset",weight:1.50,scored:true,text:"Quand quelque chose d'important est en attente et qu'une demande urgente arrive, que se passe-t-il le plus souvent ?",options:[{value:1,label:"Je laisse tout tomber et je réponds à l'urgence"},{value:2,label:"Je réponds à l'urgence, l'important attend souvent longtemps"},{value:3,label:"Je gère l'urgence mais je reviens à l'important ensuite"},{value:4,label:"J'évalue rapidement et je décide selon les priorités"},{value:5,label:"J'ai un système clair pour gérer les deux sans perdre le fil"}]},
{id:5,mechanism:"comprendre",pillar:"mindset",weight:1.50,scored:true,text:"En ce moment, si vous deviez nommer vos 3 priorités absolues pour les 7 prochains jours, lesquelles citeriez-vous ?",options:[{value:1,label:"Je ne saurais pas quoi répondre"},{value:2,label:"J'aurais du mal, tout me semble important"},{value:3,label:"J'en vois 1 ou 2 clairement, les autres sont floues"},{value:4,label:"Je peux nommer 3 priorités mais sans certitude"},{value:5,label:"Je connais mes 3 priorités et elles guident mes décisions"}]},
{id:6,mechanism:"comprendre",pillar:"lifestyle",weight:1.50,scored:true,text:"En moyenne, combien d'heures par jour passez-vous sur votre téléphone (tous usages confondus) ?",options:FACTUAL_OPTIONS.phoneHighToLow},
{id:7,mechanism:"comprendre",pillar:"mindset",weight:1.50,scored:true,text:"Si cette semaine avait été différente — mieux organisée, plus alignée avec vos priorités — qu'est-ce qui aurait changé concrètement ?",options:[{value:1,label:"Je n'y ai pas réfléchi"},{value:2,label:"J'aurais été moins débordé(e)"},{value:3,label:"J'aurais avancé sur un ou deux sujets importants"},{value:4,label:"Je vois précisément ce qui aurait été différent"},{value:5,label:"Je sais exactement ce qui aurait changé et pourquoi"}]},
{id:8,mechanism:"organiser",pillar:"lifestyle",weight:1.50,scored:true,text:"Comment construisez-vous votre semaine en ce moment ?",options:[{value:1,label:"Je ne planifie pas, je gère au fur et à mesure"},{value:2,label:"Je regarde mon agenda le matin même"},{value:3,label:"Je prépare parfois la semaine mais sans méthode stable"},{value:4,label:"J'ai une routine de planification hebdomadaire régulière"},{value:5,label:"Je planifie chaque semaine avec priorités, marges et blocs dédiés"}]},
{id:9,mechanism:"organiser",pillar:"mindset",weight:1.50,scored:true,text:"Quand vous regardez votre liste de tâches ou votre agenda, comment distinguez-vous ce qui est vraiment indispensable de ce qui pourrait attendre ou disparaître ?",options:[{value:1,label:"Je ne fais pas vraiment cette distinction"},{value:2,label:"Parfois, mais selon l'humeur du moment"},{value:3,label:"J'essaie mais j'ai du mal à lâcher certaines tâches"},{value:4,label:"J'ai une méthode, même imparfaite, pour trier"},{value:5,label:"Je passe chaque tâche au filtre de sa valeur réelle avant d'agir"}]},
{id:10,mechanism:"organiser",pillar:"lifestyle",weight:1.25,scored:true,text:"Dans votre organisation actuelle, quelle marge avez-vous pour respirer — c'est-à-dire du temps non planifié disponible si quelque chose surgit ?",options:FACTUAL_OPTIONS.marginLowToHigh},
{id:11,mechanism:"organiser",pillar:"lifestyle",weight:1.25,scored:true,text:"Dans votre agenda actuel, quelle place le repos, la récupération ou le temps pour soi occupe-t-il réellement ?",options:[{value:1,label:"Aucune — il n'existe pas dans mon agenda"},{value:2,label:"Il arrive parfois, par hasard ou épuisement"},{value:3,label:"Il est là mais souvent sacrifié quand c'est chargé"},{value:4,label:"Je lui réserve du temps, même si ce n'est pas encore stable"},{value:5,label:"Il est planifié et protégé comme une priorité à part entière"}]},
{id:12,mechanism:"organiser",pillar:"accomplissement",weight:1.50,scored:true,text:"Pensez à un objectif important que vous avez en ce moment. Quelle est la prochaine action concrète que vous devriez faire pour avancer ?",options:[{value:1,label:"Je n'ai pas d'objectif défini en ce moment"},{value:2,label:"J'ai un objectif mais aucune action planifiée"},{value:3,label:"Je sais ce que je devrais faire mais ce n'est pas encore prévu"},{value:4,label:"J'ai une prochaine action claire mais pas encore dans mon agenda"},{value:5,label:"Ma prochaine action est définie, datée et dans mon agenda"}]},
{id:13,mechanism:"organiser",pillar:"mindset",weight:1.50,scored:true,text:"Quand un imprévu important surgit en milieu de journée et bouleverse votre planning, quelle est votre réaction habituelle ?",options:[{value:1,label:"Je perds pied et la journée part en improvisation"},{value:2,label:"Je gère l'imprévu et j'abandonne le reste"},{value:3,label:"Je m'adapte mais ça me coûte beaucoup d'énergie"},{value:4,label:"Je réévalue rapidement et je réorganise mes priorités"},{value:5,label:"J'ai une marge prévue et je sais exactement quoi faire"}]},
{id:14,mechanism:"organiser",pillar:"accomplissement",weight:1.50,scored:true,text:"Quand vous estimez la durée d'une tâche avant de la faire, à quelle fréquence votre estimation est-elle proche de la réalité ?",options:[{value:1,label:"Rarement — je sous-estime presque toujours"},{value:2,label:"Parfois juste, souvent en dehors"},{value:3,label:"À peu près la moitié du temps"},{value:4,label:"Souvent juste, avec quelques écarts"},{value:5,label:"Presque toujours — j'intègre les aléas dans mes estimations"}]},
{id:15,mechanism:"proteger",pillar:"lifestyle",weight:1.50,scored:true,text:"Sur une journée type, combien de fois êtes-vous interrompu(e) par une notification, un message ou une sollicitation extérieure pendant que vous travaillez sur quelque chose d'important ?",options:[{value:1,label:"6 fois ou plus"},{value:2,label:"4 à 5 fois"},{value:3,label:"2 à 3 fois"},{value:4,label:"1 fois"},{value:5,label:"0 fois — j'ai mis des règles en place"}]},
{id:16,mechanism:"proteger",pillar:"mindset",weight:1.50,scored:true,text:"Quand quelqu'un vous dit « j'ai juste besoin de 5 minutes », quelle est votre réaction habituelle ?",options:[{value:1,label:"J'accepte toujours, même si ça tombe mal"},{value:2,label:"J'accepte la plupart du temps, difficile de dire non"},{value:3,label:"Je dis parfois non mais avec gêne"},{value:4,label:"Je sais poser une limite quand c'est vraiment nécessaire"},{value:5,label:"Je gère ces demandes avec clarté et sans culpabilité"}]},
{id:17,mechanism:"proteger",pillar:"lifestyle",weight:1.25,scored:true,text:"Sur les 7 derniers jours, combien de fois avez-vous volontairement posé votre téléphone ou coupé vos notifications pendant au moins 30 minutes pour vous concentrer ?",options:FACTUAL_OPTIONS.daysLowToHigh},
{id:18,mechanism:"proteger",pillar:"lifestyle",weight:1.25,scored:true,text:"En fin de journée, après avoir rempli vos obligations principales, quel niveau d'énergie reste-t-il généralement ?",options:FACTUAL_OPTIONS.energyLowToHigh},
{id:19,mechanism:"proteger",pillar:"lifestyle",weight:1.50,scored:true,text:"Sur les 7 derniers jours, combien de fois avez-vous réellement protégé un temps prévu — sans le sacrifier à une demande extérieure ou à une urgence ?",options:FACTUAL_OPTIONS.daysLowToHigh},
{id:20,mechanism:"proteger",pillar:"mindset",weight:1.50,scored:true,text:"Quand une demande vous est faite et qu'elle n'est pas alignée avec vos priorités du moment, que faites-vous le plus souvent ?",options:[{value:1,label:"J'accepte presque toujours, je ne sais pas comment refuser"},{value:2,label:"J'accepte souvent mais avec frustration"},{value:3,label:"Je négocie parfois, selon la personne"},{value:4,label:"Je sais dire non ou proposer un autre moment"},{value:5,label:"Je gère ces situations avec clarté et sans tension"}]},
{id:21,mechanism:"proteger",pillar:"accomplissement",weight:1.50,scored:true,text:"Quand une idée secondaire ou une tâche non prévue surgit pendant que vous travaillez sur quelque chose d'important, que faites-vous ?",options:[{value:1,label:"Je l'intègre tout de suite et je perds le fil"},{value:2,label:"Je bascule souvent dessus, même si ce n'est pas prévu"},{value:3,label:"Je résiste parfois, mais je cède assez régulièrement"},{value:4,label:"Je la note pour plus tard et je continue ma tâche"},{value:5,label:"J'ai un système clair pour capturer sans interrompre"}]},
{id:22,mechanism:"agir",pillar:"accomplissement",weight:1.50,scored:true,text:"Quand vous avez une tâche difficile ou inconfortable à faire, que se passe-t-il le plus souvent ?",options:[{value:1,label:"Je l'évite ou je la reporte indéfiniment"},{value:2,label:"Je la retarde souvent et je commence par des choses plus faciles"},{value:3,label:"Je la fais, mais après avoir procrastiné un moment"},{value:4,label:"Je la programme et je la fais même si ce n'est pas agréable"},{value:5,label:"Je la traite en priorité, c'est ancré dans mes habitudes"}]},
{id:23,mechanism:"agir",pillar:"mindset",weight:1.50,scored:true,text:"Quand vous avez une semaine où rien n'a fonctionné comme prévu, quelle est votre réaction habituelle dans les jours qui suivent ?",options:[{value:1,label:"Je me décourage et j'ai du mal à repartir"},{value:2,label:"Je mets du temps à récupérer et à retrouver le rythme"},{value:3,label:"Je repars, mais sans vraiment comprendre ce qui s'est passé"},{value:4,label:"Je prends du recul, j'analyse et j'ajuste"},{value:5,label:"J'en tire un apprentissage précis et je repars avec un plan"}]},
{id:24,mechanism:"agir",pillar:"lifestyle",weight:1.25,scored:true,text:"Quand du temps se libère de manière imprévue dans votre journée, qu'est-ce que vous faites le plus souvent avec ce temps ?",options:[{value:1,label:"Je scrolle ou je regarde des vidéos sans vraiment choisir"},{value:2,label:"Je remplis avec ce qui est immédiat ou facile"},{value:3,label:"Je ne sais pas trop quoi en faire sur le moment"},{value:4,label:"Je l'utilise pour quelque chose d'utile mais sans plan précis"},{value:5,label:"Je sais exactement quoi en faire : j'ai une liste de tâches utiles prête"}]},
{id:25,mechanism:"agir",pillar:"accomplissement",weight:1.25,scored:true,text:"En ce moment, combien de projets ou d'intentions importantes avez-vous en tête pour lesquels vous n'avez pas réalisé la moindre action depuis plus d'une semaine ?",options:FACTUAL_OPTIONS.openProjectsHighToLow},
{id:26,mechanism:"agir",pillar:"accomplissement",weight:1.50,scored:true,text:"Quand vous travaillez sur une tâche, comment savez-vous que vous avez atteint un niveau suffisant pour passer à la suite ?",options:[{value:1,label:"Je n'arrive jamais vraiment à m'arrêter, je retouche encore et encore"},{value:2,label:"J'ai tendance à trop peaufiner avant de livrer ou passer à autre chose"},{value:3,label:"Je m'arrête parfois au bon moment, parfois trop tard"},{value:4,label:"J'ai un niveau de qualité cible que je respecte la plupart du temps"},{value:5,label:"Je définis à l'avance ce que « assez bien » signifie et je m'y tiens"}]},
{id:27,mechanism:"agir",pillar:"mindset",weight:1.50,scored:true,text:"Y a-t-il en ce moment une activité importante dans votre vie ou votre travail que vous continuez à faire alors qu'elle ne correspond plus vraiment à vos priorités actuelles ?",options:[{value:1,label:"Oui, plusieurs — je ne sais pas comment m'en dégager"},{value:2,label:"Oui, au moins une — je le sais mais je ne fais rien"},{value:3,label:"Peut-être, mais je n'ai pas encore tranché"},{value:4,label:"J'en ai identifié une et j'ai commencé à réduire"},{value:5,label:"Non — je révise régulièrement ce qui mérite mon temps"}]},
{id:28,mechanism:"agir",pillar:"lifestyle",weight:1.50,scored:true,text:"Si vous récupériez une heure par jour que vous ne saviez pas que vous perdiez, qu'en feriez-vous ?",options:[{value:1,label:"Je ne sais pas, je n'y ai pas réfléchi"},{value:2,label:"Je remplirai probablement avec d'autres choses urgentes"},{value:3,label:"J'ai une idée vague mais rien de précis"},{value:4,label:"J'ai quelques projets en tête pour lesquels je manque de temps"},{value:5,label:"Je sais exactement où je l'investirais — c'est déjà réfléchi"}]}
];
if (HOURTIME.QUESTIONS.length !== 28 || HOURTIME.QUESTIONS.some(question => !Array.isArray(question.options) || question.options.length !== 5)) {
  throw new Error("Configuration invalide : le diagnostic doit contenir 28 questions avec 5 options chacune.");
}
HOURTIME.MECHANISM_LABELS={comprendre:"Comprendre",organiser:"Organiser",proteger:"Protéger",agir:"Agir & mieux vivre"};
