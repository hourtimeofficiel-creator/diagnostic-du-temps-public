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
  ]
};

HOURTIME.OPTIONS = FACTUAL_OPTIONS.daysLowToHigh;
HOURTIME.QUESTIONS=[
{id:1,mechanism:"comprendre",weight:1.50,scored:true,text:"Sur les 7 derniers jours, combien de jours avez-vous noté où votre temps est parti ?",options:FACTUAL_OPTIONS.daysLowToHigh},
{id:2,mechanism:"comprendre",weight:1.25,scored:true,text:"Cette semaine, combien de fois avez-vous repéré une activité qui prend trop de temps pour peu de valeur ?",options:FACTUAL_OPTIONS.daysLowToHigh},
{id:3,mechanism:"comprendre",weight:1.25,scored:true,text:"Sur les 7 derniers jours, combien de jours avez-vous travaillé sur une tâche importante pendant votre meilleur créneau d'énergie ?",options:FACTUAL_OPTIONS.daysLowToHigh},
{id:4,mechanism:"comprendre",weight:1.50,scored:true,text:"Quand une nouvelle demande arrive, à quelle fréquence prenez-vous 30 secondes pour vérifier si c'est prioritaire ?",options:FACTUAL_OPTIONS.daysLowToHigh},
{id:5,mechanism:"comprendre",weight:1.50,scored:true,text:"Sur les 7 derniers jours, combien de fois avez-vous pris 10 minutes de recul en fin de journée ?",options:FACTUAL_OPTIONS.daysLowToHigh},
{id:6,mechanism:"comprendre",weight:1.50,scored:true,text:"Combien de vos 3 principaux voleurs de temps sont clairement identifiés aujourd'hui ?",options:[{value:1,label:"Aucun"},{value:2,label:"1 sur 3"},{value:3,label:"2 sur 3"},{value:4,label:"3 sur 3"},{value:5,label:"3 sur 3 + actions déjà prévues"}]},
{id:7,mechanism:"comprendre",weight:1.50,scored:true,text:"Avez-vous défini par écrit vos 3 priorités de temps pour la semaine en cours ?",options:[{value:1,label:"Aucune"},{value:2,label:"1 priorité"},{value:3,label:"2 priorités"},{value:4,label:"3 priorités"},{value:5,label:"3 priorités + créneaux planifiés"}]},
{id:8,mechanism:"organiser",weight:1.50,scored:true,text:"En moyenne, combien de priorités gardez-vous réellement par jour ?",options:FACTUAL_OPTIONS.prioritiesLowToHigh},
{id:9,mechanism:"organiser",weight:1.50,scored:true,text:"Sur les 4 dernières semaines, combien de semaines ont été préparées à l'avance ?",options:[{value:1,label:"0 semaine"},{value:2,label:"1 semaine"},{value:3,label:"2 semaines"},{value:4,label:"3 semaines"},{value:5,label:"4 semaines"}]},
{id:10,mechanism:"organiser",weight:1.25,scored:true,text:"Sur une semaine type, combien de créneaux sont réservés à vos priorités personnelles ou stratégiques ?",options:FACTUAL_OPTIONS.blocksLowToHigh},
{id:11,mechanism:"organiser",weight:1.25,scored:true,text:"Quelle part de votre agenda reste libre pour absorber les imprévus ?",options:FACTUAL_OPTIONS.marginLowToHigh},
{id:12,mechanism:"organiser",weight:1.50,scored:true,text:"Quand vous avez un objectif important, en combien d'actions concrètes le découpez-vous en général ?",options:[{value:1,label:"Aucune action claire"},{value:2,label:"1 action"},{value:3,label:"2 actions"},{value:4,label:"3 à 4 actions"},{value:5,label:"5 actions ou plus"}]},
{id:13,mechanism:"organiser",weight:1.50,scored:true,text:"Sur les 7 derniers jours, quelle proportion de vos priorités prévues a été terminée ?",options:FACTUAL_OPTIONS.completionLowToHigh},
{id:14,mechanism:"organiser",weight:1.50,scored:true,text:"Sur votre agenda de la semaine, quelle part du temps est dédiée à ce qui compte le plus pour vous ?",options:FACTUAL_OPTIONS.completionLowToHigh},
{id:15,mechanism:"proteger",weight:1.50,scored:true,text:"Sur une plage de concentration d'environ 1 heure, combien de fois consultez-vous généralement votre téléphone ou vos notifications ?",options:FACTUAL_OPTIONS.interruptionsHighToLow},
{id:16,mechanism:"proteger",weight:1.50,scored:true,text:"Sur une journée type, combien de plages sans interruption (30 à 60 min) réussissez-vous à protéger ?",options:FACTUAL_OPTIONS.blocksLowToHigh},
{id:17,mechanism:"proteger",weight:1.25,scored:true,text:"Sur les 7 derniers jours, combien de demandes non prioritaires avez-vous reportées ou refusées ?",options:[{value:1,label:"0 demande"},{value:2,label:"1 demande"},{value:3,label:"2 demandes"},{value:4,label:"3 demandes"},{value:5,label:"4 demandes ou plus"}]},
{id:18,mechanism:"proteger",weight:1.25,scored:true,text:"Combien de temps quotidien passez-vous sur les réseaux sociaux/vidéos hors besoin réel ?",options:FACTUAL_OPTIONS.socialHighToLow},
{id:19,mechanism:"proteger",weight:1.50,scored:true,text:"Sur les 7 derniers jours, combien de jours avez-vous protégé un vrai temps pour vos proches, votre santé ou votre repos ?",options:FACTUAL_OPTIONS.daysLowToHigh},
{id:20,mechanism:"proteger",weight:1.50,scored:true,text:"Cette semaine, combien de fois une demande des autres a pris la place d'une priorité personnelle importante ?",options:FACTUAL_OPTIONS.daysHighToLow},
{id:21,mechanism:"proteger",weight:1.50,scored:true,text:"Combien de règles de protection appliquez-vous réellement (notifications coupées, plage focus, heure de fin, etc.) ?",options:[{value:1,label:"Aucune"},{value:2,label:"1 règle"},{value:3,label:"2 règles"},{value:4,label:"3 règles"},{value:5,label:"4 règles ou plus"}]},
{id:22,mechanism:"agir",weight:1.50,scored:true,text:"Quand une tâche importante est prévue, sous combien de minutes la commencez-vous le plus souvent ?",options:[{value:1,label:"Après plus de 2 h"},{value:2,label:"Entre 1 h et 2 h"},{value:3,label:"Entre 30 et 60 min"},{value:4,label:"Entre 10 et 30 min"},{value:5,label:"En moins de 10 min"}]},
{id:23,mechanism:"agir",weight:1.50,scored:true,text:"Sur une journée type, combien de tâches importantes terminez-vous avant d'en démarrer une nouvelle ?",options:[{value:1,label:"Aucune"},{value:2,label:"1 tâche"},{value:3,label:"2 tâches"},{value:4,label:"3 tâches"},{value:5,label:"4 tâches ou plus"}]},
{id:24,mechanism:"agir",weight:1.25,scored:true,text:"Sur les 7 derniers jours, combien de fois avez-vous dépassé le temps prévu à cause du perfectionnisme ?",options:FACTUAL_OPTIONS.daysHighToLow},
{id:25,mechanism:"agir",weight:1.25,scored:true,text:"Sur les 7 derniers jours, combien d'actions ont concrètement fait avancer un projet important pour vous ?",options:[{value:1,label:"0 action"},{value:2,label:"1 action"},{value:3,label:"2 actions"},{value:4,label:"3 actions"},{value:5,label:"4 actions ou plus"}]},
{id:26,mechanism:"agir",weight:1.50,scored:true,text:"Cette semaine, combien de jours avez-vous avancé sur vos projets même avec imprévus ?",options:FACTUAL_OPTIONS.daysLowToHigh},
{id:27,mechanism:"agir",weight:1.50,scored:true,text:"Sur les 7 derniers jours, combien de jours avez-vous pris au moins une vraie pause de récupération ?",options:FACTUAL_OPTIONS.daysLowToHigh},
{id:28,mechanism:"agir",weight:1.50,scored:true,text:"À la fin de la semaine, quelle part de votre temps vous a semblé alignée avec vos priorités ?",options:FACTUAL_OPTIONS.completionLowToHigh}
];
HOURTIME.MECHANISM_LABELS={comprendre:"Comprendre",organiser:"Organiser",proteger:"Protéger",agir:"Agir & mieux vivre"};
