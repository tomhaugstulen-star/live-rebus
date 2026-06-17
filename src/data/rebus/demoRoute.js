export const DEMO_ROUTE = {
  id: "demo-route-akershus",
  title: "Demo-rebus i nærområdet",
  areaName: "Live Rebus demo",
  distanceMeters: 1800,
  estimatedDurationMinutes: 45,
  checkpoints: [
    {
      id: "post-1",
      title: "Post 1",
      clue: "Kort naturord. Svaret er ås.",
      question: "Hva kalles en lav høyde i terrenget?",
      answer: "ås",
      acceptedAnswers: ["ås", "aas"],
      hint: "To bokstaver.",
      coordinates: { latitude: 59.9139, longitude: 10.7522 }
    },
    {
      id: "post-2",
      title: "Post 2",
      clue: "Noe gammelt som er verdt å ta vare på.",
      question: "Hva kaller vi et spor etter eldre tid?",
      answer: "kulturminne",
      acceptedAnswers: ["kulturminne"],
      hint: "Starter med kultur.",
      coordinates: { latitude: 59.9142, longitude: 10.753 }
    },
    {
      id: "post-3",
      title: "Post 3",
      clue: "Finnes i bekk, elv og innsjø.",
      question: "Hva er dette?",
      answer: "vann",
      acceptedAnswers: ["vann"],
      hint: "Fire bokstaver.",
      coordinates: { latitude: 59.9146, longitude: 10.7536 }
    },
    {
      id: "post-4",
      title: "Post 4",
      clue: "Et minne på en gravplass.",
      question: "Hva heter dette?",
      answer: "gravminne",
      acceptedAnswers: ["gravminne"],
      hint: "Satt sammen av grav + minne.",
      coordinates: { latitude: 59.915, longitude: 10.7542 }
    },
    {
      id: "post-5",
      title: "Post 5",
      clue: "Gammel betegnelse for bukt.",
      question: "Hva er ordet?",
      answer: "vik",
      acceptedAnswers: ["vik"],
      hint: "Tre bokstaver.",
      coordinates: { latitude: 59.9154, longitude: 10.7548 }
    },
    {
      id: "post-6",
      title: "Post 6",
      clue: "En rund forhøyning i landskapet.",
      question: "Hva kalles dette?",
      answer: "haug",
      acceptedAnswers: ["haug"],
      hint: "Fire bokstaver.",
      coordinates: { latitude: 59.9158, longitude: 10.7554 }
    },
    {
      id: "post-7",
      title: "Post 7",
      clue: "Et sted der mennesker bor.",
      question: "Hva kalles dette?",
      answer: "bosetning",
      acceptedAnswers: ["bosetning"],
      hint: "Starter med bo.",
      coordinates: { latitude: 59.9162, longitude: 10.756 }
    }
  ]
};
