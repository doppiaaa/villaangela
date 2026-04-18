import { useState, useEffect, useRef } from 'react';
import { 
  Wifi, 
  Waves, 
  Utensils, 
  Wind, 
  Car, 
  Tv, 
  Coffee, 
  Sun, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Send,
  X,
  Loader2,
  Globe,
  Home,
  Maximize,
  Dog,
  Snowflake,
  Bath,
  Droplet,
  Shirt,
  Star,
  User,
  Quote,
  ShieldCheck,
  Bone,
  ShowerHead,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import Dashboard from './Dashboard';
import { supabase } from './lib/supabase';


// --- Types & Constants ---

type Language = 'en' | 'it' | 'fr' | 'es' | 'de' | 'pl' | 'zh' | 'ar' | 'da' | 'sv';

interface Content {
  hero: { tagline: string };
  about: { title: string; text: string };
  units: {
    title: string;
    apartment: {
      name: string;
      desc: string;
      features: string[];
    };
    luxury: {
      name: string;
      desc: string;
      features: string[];
    };
    viewDetails: string;
  };
  amenities: { 
    title: string;
    items: string[];
  };
  location: { title: string; galleryTitle: string; desc: string };
  gallery: string;
  reviews: { title: string };
  contact: {
    title: string;
    name: string;
    email: string;
    unit: string;
    guests: string;
    checkIn: string;
    checkOut: string;
    message: string;
    desc: string;
    submit: string;
  };
  footer: {
    cin: string;
    location: string;
    type: string;
    privacy: string;
    reserved: string;
  };
  legal: {
    privacyTitle: string;
    privacyIntro: string;
    titolareTitle: string;
    titolareText: string;
    conservazioneTitle: string;
    conservazioneText: string;
    cookieTitle: string;
    cookieWhatTitle: string;
    cookieWhatText: string;
    cookieHowTitle: string;
    cookieHowText: string;
    cookieProfiling: string;
    cookieThirdParty: string;
    cookieTechnical: string;
    lastUpdated: string;
    date: string;
    accept: string;
    reject: string;
    privacyAndCookies: string;
    bannerText: string;
    comingSoon: string;
    bookingPlatforms: {
      title: string;
      subtitle: string;
      availableNow: string;
      directListing: string;
      viewListing: string;
    };
    dateErrorSame: string;
    login: {
      user: string;
      pass: string;
      submit: string;
      invalid: string;
    };
  };
}

const translations: Record<string, Content> = {
  en: {
    hero: { tagline: "Two souls, one paradise" },
    about: {
      title: "A Mediterranean Dream",
      text: "Nestled in the heart of Southern Italy, Villa Angela is more than just a destination; it's a sanctuary where time slows down. Between the scent of lemon groves and the whisper of the sea, we offer two distinct experiences tailored to your desires. Whether you seek a warm family retreat or an exclusive luxury escape, your Italian story begins here."
    },
    units: {
      title: "Our Accommodations",
      apartment: {
        name: "Holiday Apartment",
        desc: "A stunning villa surrounded by greenery, equipped with all the amenities for an unforgettable stay. A spacious and welcoming retreat, ideal for families and groups of friends seeking relaxation and comfort.",
        features: ["Free WiFi", "Fully Equipped Kitchen", "Entire home for you", "150 m² size", "Free parking on premises", "Pets allowed", "Air conditioning", "Private bathroom", "Washing machine"]
      },
      luxury: {
        name: "Luxury House",
        desc: "An exclusive sanctuary surrounded by tranquility. Elegant design, premium services, and total privacy for an upscale group experience.",
        features: ["Exclusive Access", "Premium Design", "Surrounded by Nature"]
      },
      viewDetails: "View Details"
    },
    amenities: { 
      title: "Amenities",
      items: [
        "Entire home for you",
        "150 m² size",
        "Free parking on premises",
        "Pets allowed",
        "Free WiFi connection",
        "Kitchen",
        "Air conditioning",
        "Private bathroom",
        "Washing machine"
      ]
    },
    location: {
      title: "How to find us",
      galleryTitle: "Explore the surroundings",
      desc: "Located in Angri, Campania. A short distance from Pompeii, Naples, and the Amalfi Coast. Ideal for those seeking tranquility without sacrificing convenience."
    },
    gallery: "Gallery",
    reviews: {
      title: "Guest Reviews"
    },
    contact: {
      title: "Contact Us",
      name: "Full Name",
      email: "Email Address",
      unit: "Select Unit",
      guests: "Guests",
      checkIn: "Check-in Date",
      checkOut: "Check-out Date",
      message: "Your Message",
      desc: "Ready to experience the Mediterranean? Fill out the form below and we will get back to you with availability and a personalized offer.",
      submit: "Send Inquiry"
    },
    footer: {
      cin: "CIN: IT065007C2W5T7ULLD",
      location: "Angri, Salerno",
      type: "Non-entrepreneurial tourist lease",
      privacy: "Privacy & Cookie Policy",
      reserved: "Reserved Area"
    },
    legal: {
      privacyTitle: "Privacy Policy",
      privacyIntro: "This website serves as the informational showcase for 'Villa Angela'. To ensure maximum performance and security, we utilize a cloud-native infrastructure powered by Supabase.",
      titolareTitle: "1. Data Controller and Cloud Systems",
      titolareText: "The data controller is the owner. Guest data for legal compliance (Alloggiati Web) and public reviews are securely managed and stored globally via Supabase. Fiscal management remains with Novasol.",
      conservazioneTitle: "2. Real-time Operations and Rights",
      conservazioneText: "We use high-performance systems for real-time data synchronization. Additionally, the Google Translate API is utilized to provide multilingual access to guest reviews. Under GDPR, you have full rights to access or erasure by contacting holidayvillaangela@gmail.com.",
      cookieTitle: "Cookie Policy",
      cookieWhatTitle: "1. What are Cookies?",
      cookieWhatText: "Cookies are small text files stored on your device to enhance site functionality.",
      cookieHowTitle: "2. Transparent Usage",
      cookieHowText: "This website respects your privacy by design:",
      cookieProfiling: "No Invasive Profiling: We do not use Google Analytics, Meta Pixel, or native tracking tools to profile your behavior for advertising.",
      cookieThirdParty: "Global Services: Media assets are hosted on Supabase and review translations are powered by Google Translate, both optimized for privacy and compliance.",
      cookieTechnical: "Technical Elements: We use a technical cookie to remember your language choice and an anonymous global counter in Supabase to monitor site engagement anonymously.",
      lastUpdated: "Last updated",
      date: "March 30, 2026",
      accept: "Accept",
      reject: "Reject",
      privacyAndCookies: "Privacy & Cookies",
      bannerText: "We use cookies to enhance your experience and keep anonymous statistics. We do not use invasive tracking. You can choose to accept or continue without non-essential cookies.",
      comingSoon: "Coming soon!",
      bookingPlatforms: {
        title: "Book Where You Prefer",
        subtitle: "Find Villa Angela Holiday Apartment on all major international booking platforms.",
        availableNow: "Available now",
        directListing: "Direct listing",
        viewListing: "View listing"
      },
      dateErrorSame: "Check-out date cannot be the same as check-in date.",
      login: {
        user: "Username",
        pass: "Password",
        submit: "Login",
        invalid: "Invalid credentials"
      }
    }
  },
  it: {
    hero: { tagline: "Due anime, un unico paradiso" },
    about: {
      title: "Un Sogno Mediterraneo",
      text: "Immersa nel cuore del Sud Italia, Villa Angela è più di una semplice destinazione; è un santuario dove il tempo rallenta. Tra il profumo dei limoneti e il sussurro del mare, offriamo due esperienze distinte su misura per i vostri desideri. Che cerchiate un caloroso rifugio familiare o un'esclusiva fuga di lusso, la vostra storia italiana inizia qui."
    },
    units: {
      title: "Le Nostre Sistemazioni",
      apartment: {
        name: "Casa Vacanza",
        desc: "Una splendida villa immersa nel verde, dotata di tutti i servizi necessari per un soggiorno indimenticabile. Un rifugio spazioso e accogliente, ideale per famiglie e gruppi di amici in cerca di relax e comodità.",
        features: ["WiFi Gratuito", "Cucina Attrezzata", "Intero alloggio tutto per te", "150 m² superficie", "Parcheggio gratuito sul posto", "Animali ammessi", "Aria condizionata", "Bagno privato", "Lavatrice"]
      },
      luxury: {
        name: "Luxury House",
        desc: "Un santuario esclusivo circondato dalla tranquillità. Design sofisticato, servizi premium e privacy totale per un'esperienza di gruppo di alto livello.",
        features: ["Accesso Esclusivo", "Design Ricercato", "Immerso nel Verde"]
      },
      viewDetails: "Scopri di più"
    },
    amenities: { 
      title: "Servizi",
      items: [
        "Intero alloggio tutto per te",
        "150 m² superficie",
        "Parcheggio gratuito sul posto",
        "Animali ammessi",
        "Connessione WiFi gratuita",
        "Cucina",
        "Aria condizionata",
        "Bagno privato",
        "Lavatrice"
      ]
    },
    location: {
      title: "Come trovarci",
      galleryTitle: "Esplora i dintorni",
      desc: "Situato ad Angri, in Campania. A breve distanza da Pompei, Napoli e la Costiera Amalfitana. Ideale per chi cerca tranquillità senza rinunciare alla comodità."
    },
    gallery: "Galleria",
    reviews: {
      title: "Recensioni degli Ospiti"
    },
    contact: {
      title: "Contattaci",
      name: "Nome Completo",
      email: "Indirizzo Email",
      unit: "Seleziona Unità",
      guests: "Ospiti",
      checkIn: "Data Check-in",
      checkOut: "Data Check-out",
      message: "Il Tuo Messaggio",
      desc: "Pronti a vivere il Mediterraneo? Compilate il modulo sottostante e vi risponderemo con la disponibilità e un'offerta personalizzata.",
      submit: "Invia Richiesta"
    },
    footer: {
      cin: "CIN: IT065007C2W5T7ULLD",
      location: "Angri, Salerno",
      type: "Locazione turistica in forma non imprenditoriale",
      privacy: "Privacy & Cookie Policy",
      reserved: "Area Riservata"
    },
    legal: {
      privacyTitle: "Informativa sulla Privacy",
      privacyIntro: "Questo sito funge da vetrina informativa per 'Villa Angela'. Per garantire massime prestazioni e sicurezza, utilizziamo un'infrastruttura cloud-native basata su Supabase.",
      titolareTitle: "1. Titolare e Sistemi Cloud",
      titolareText: "Il titolare del trattamento è il proprietario. I dati degli ospiti (Alloggiati Web) e le recensioni pubbliche sono gestiti e archiviati in modo sicuro a livello globale tramite Supabase. La gestione fiscale è di Novasol.",
      conservazioneTitle: "2. Operatività in Real-time e Diritti",
      conservazioneText: "Utilizziamo sistemi ad alte prestazioni per la sincronizzazione dei dati in tempo reale. Inoltre, utilizziamo le API di Google Translate per gestire le recensioni multilingua. Ai sensi del GDPR, hai pieno diritto di accesso o cancellazione scrivendo a holidayvillaangela@gmail.com.",
      cookieTitle: "Cookie Policy",
      cookieWhatTitle: "1. Cosa sono i Cookie",
      cookieWhatText: "I cookie sono piccoli file di testo salvati sul tuo dispositivo per migliorare le funzionalità del sito.",
      cookieHowTitle: "2. Utilizzo Trasparente",
      cookieHowText: "Questo sito tutela la tua privacy 'by design':",
      cookieProfiling: "Nessuna Profilazione Invasiva: Non utilizziamo Google Analytics, Meta Pixel o sistemi di tracciamento nativi per profilare il tuo comportamento a fini pubblicitari.",
      cookieThirdParty: "Servizi Globali: I contenuti multimediali sono ospitati su Supabase e le traduzioni delle recensioni sono gestite tramite Google Translate, entrambi ottimizzati per privacy e conformità.",
      cookieTechnical: "Elementi Tecnici: Utilizziamo un cookie tecnico per ricordare la lingua scelta e un contatore globale anonimo su Supabase per monitorare le statistiche del sito in forma aggregata.",
      lastUpdated: "Ultimo aggiornamento",
      date: "30 Marzo 2026",
      accept: "Accetta",
      reject: "Rifiuta",
      privacyAndCookies: "Privacy e Cookie",
      bannerText: "Utilizziamo i cookie per migliorare la tua esperienza e mantenere statistiche anonime. Non utilizziamo tracciamenti invasivi. Puoi scegliere di accettare o continuare senza i cookie non essenziali.",
      comingSoon: "Prossimamente!",
      bookingPlatforms: {
        title: "Prenota Dove Preferisci",
        subtitle: "Trovi Villa Angela sui principali portali internazionali di prenotazione.",
        availableNow: "Disponibile ora",
        directListing: "Annuncio diretto",
        viewListing: "Vai all'annuncio"
      },
      dateErrorSame: "La data di check-out non può essere uguale alla data di check-in.",
      login: {
        user: "Utente",
        pass: "Password",
        submit: "Accedi",
        invalid: "Credenziali non valide"
      }
    }
  },
  fr: {
    hero: { tagline: "Deux âmes, un paradis" },
    about: {
      title: "Un Rêve Méditerranéen",
      text: "Niché au cœur de l'Italie du Sud, Villa Angela est bien plus qu'une destination; c'est un sanctuaire où le temps s'arrête. Entre le parfum des citronniers et le murmure de la mer, nous offrons deux expériences distinctes adaptées à vos désirs. Que vous cherchiez une retraite familiale ou une évasion de luxe exclusive, votre histoire italienne commence ici."
    },
    units: {
      title: "Nos Hébergements",
      apartment: {
        name: "Appartement de Vacances",
        desc: "Un espace accueillant 4 étoiles situé à <span class='script-title'>Angri</span>, parfait pour la famille et les amis. Vivez l'art de vivre italien authentique avec une cuisine équipée, le WiFi gratuit et un balcon avec vue.",
        features: ["4 Étoiles", "WiFi Gratuit", "Cuisine Équipée", "Logement entier", "150 m² de surface", "Parking gratuit", "Animaux acceptés", "Climatisation", "Salle de bain privée", "Lave-洗濯机"]
      },
      luxury: {
        name: "Maison de Luxe",
        desc: "Un sanctuaire exclusif 5 étoiles pour le voyageur exigeant. Design sophistiqué, équipements haut de gamme et intimité inégalée.",
        features: ["5 Étoiles", "Accès Exclusif", "Design Premium"]
      },
      viewDetails: "Voir Détails"
    },
    amenities: {
      title: "Services",
      items: ["Logement entier", "150 m² de surface", "Parking gratuit", "Animaux acceptés", "WiFi gratuit", "Cuisine", "Climatisation", "Salle de bain privée", "Lave-linge"]
    },
    location: { title: "Comment nous trouver", galleryTitle: "Explorez les environs", desc: "Stratégiquement située, Villa Angela offre un accès facile aux destinations les plus emblématiques de la région." },
    gallery: "Galerie",
    reviews: {
      title: "Avis des Clients"
    },
    contact: {
      title: "Contactez-nous",
      name: "Nom complet",
      email: "Adresse e-mail",
      unit: "Unité",
      guests: "Invités",
      checkIn: "Arrivée",
      checkOut: "Départ",
      message: "Votre message",
      desc: "Prêt à vivre la Méditerranée ? Remplissez le formulaire ci-dessous et nous vous répondrons avec les disponibilités et une offre personnalisée.",
      submit: "Envoyer la demande"
    },
    footer: {
      cin: "CIN: IT065007C2W5T7ULLD",
      location: "Angri, Salerne",
      type: "Location touristique non entrepreneuriale",
      privacy: "Politique de confidentialité et cookies",
      reserved: "Espace réservé"
    },
    legal: {
      privacyTitle: "Politique de Confidentialité",
      privacyIntro: "Ce site sert de vitrine informative pour 'Villa Angela'. Pour garantir des performances et une sécurité maximales, nous utilisons une infrastructure cloud-native basée sur Supabase.",
      titolareTitle: "1. Responsable et Systèmes Cloud",
      titolareText: "Le responsable du traitement est le propriétaire. Les données des clients (Alloggiati Web) et les avis publics sont gérés et stockés en toute sécurité au niveau mondial via Supabase. La gestion fiscale est assurée par Novasol.",
      conservazioneTitle: "2. Opérations en temps réel et Droits",
      conservazioneText: "Nous utilisons des systèmes performants pour la synchronisation des données en temps réel. De plus, nous utilisons l'API Google Translate pour gérer les avis multilingues. Conformément au RGPD, vous avez un droit complet d'accès ou de suppression en écrivant à holidayvillaangela@gmail.com.",
      cookieTitle: "Politique relative aux Cookies",
      cookieWhatTitle: "1. Que sont les Cookies ?",
      cookieWhatText: "Les cookies sont de petits fichiers texte enregistrés sur votre appareil pour améliorer les fonctionnalités du site.",
      cookieHowTitle: "2. Utilisation Transparente",
      cookieHowText: "Ce site protège votre vie privée dès la conception :",
      cookieProfiling: "Aucun Profilage Invasif : Nous n'utilisons pas Google Analytics, Meta Pixel ou de systèmes de suivi natifs pour profiler votre comportement à des fins publicitaires.",
      cookieThirdParty: "Services Mondiaux : Le contenu multimédia est hébergé sur Supabase et les traductions des avis sont gérées via Google Translate, tous deux optimisés pour la confidentialité et la conformité.",
      cookieTechnical: "Éléments Techniques : Nous utilisons un cookie technique pour mémoriser la langue choisie et un compteur global anonyme sur Supabase pour monitorare le statistiche del sito in forma aggregata.",
      lastUpdated: "Dernière mise à jour",
      date: "30 Mars 2026",
      accept: "Accepter",
      reject: "Refuser",
      privacyAndCookies: "Confidentialité et Cookies",
      bannerText: "Nous utilisons des cookies pour améliorer votre expérience et maintenir des statistiques anonymes. Nous n'utilisons pas de suivi invasif. Vous pouvez choisir d'accepter ou de continuer sans cookies non essentiels.",
      comingSoon: "Bientôt disponible !",
      bookingPlatforms: {
        title: "Réservez où vous préférez",
        subtitle: "Retrouvez Villa Angela sur les principaux portaux de réservation internationaux.",
        availableNow: "Disponible maintenant",
        directListing: "Annonce directe",
        viewListing: "Voir l'annonce"
      },
      dateErrorSame: "La date de départ ne peut pas être la même que la date d'arrivée.",
      login: {
        user: "Utilisateur",
        pass: "Mot de passe",
        submit: "Connexion",
        invalid: "Identifiants invalides"
      }
    }
  },
  es: {
    hero: { tagline: "Dos almas, un paraíso" },
    about: {
      title: "Un Sueño Mediterráneo",
      text: "Ubicada en el corazón del sur de Italia, Villa Angela es más que un destino; es un santuario donde el tiempo se detiene. Entre el aroma de los limoneros y el susurro del mar, ofrecemos dos experiencias distintas adaptadas a sus deseos. Ya sea que busque un refugio familiar o una escapada de lujo exclusiva, su historia italiana comienza aquí."
    },
    units: {
      title: "Nuestros Alojamientos",
      apartment: {
        name: "Apartamento Vacacional",
        desc: "Un acogedor espacio de 4 estrellas en <span class='script-title'>Angri</span>, perfecto para familias y amigos. Experimente el auténtico estilo de vida italiano con cocina equipada, WiFi gratis y balcón con vistas.",
        features: ["4 Estrellas", "WiFi Gratis", "Cocina Equipada", "Alojamiento entero", "150 m² superficie", "Aparcamiento gratuito", "Se admiten mascotas", "Aire acondicionado", "Baño privado", "Lavadora"]
      },
      luxury: {
        name: "Casa de Lujo",
        desc: "Un santuario exclusivo de 5 estrellas para el viajero exigente. Diseño sofisticado, comodidades premium y privacidad inigualable.",
        features: ["5 Estrellas", "Acceso Exclusivo", "Diseño Premium"]
      },
      viewDetails: "Ver Detalles"
    },
    amenities: {
      title: "Servicios",
      items: ["Alojamiento entero", "150 m² superficie", "Aparcamiento gratuito", "Se admiten mascotas", "WiFi gratuito", "Cocina", "Aire acondicionado", "Baño privado", "Lavadora"]
    },
    location: { title: "Cómo encontrarnos", galleryTitle: "Explora los alrededores", desc: "Estratégicamente ubicada, Villa Angela tiene fácil acceso a los destinos más emblemáticos de la región." },
    gallery: "Galería",
    reviews: {
      title: "Opiniones de huéspedes"
    },
    contact: {
      title: "Contáctenos",
      name: "Nombre completo",
      email: "Correo electrónico",
      unit: "Unidad",
      guests: "Huéspedes",
      checkIn: "Entrada",
      checkOut: "Salida",
      message: "Su mensaje",
      desc: "¿Listo para vivir el Mediterráneo? Complete el formulario a continuación y nos pondremos en contacto con usted con la disponibilidad y una oferta personalizada.",
      submit: "Enviar consulta"
    },
    footer: {
      cin: "CIN: IT065007C2W5T7ULLD",
      location: "Angri, Salerno",
      type: "Alquiler turístico no empresarial",
      privacy: "Política de privacidad y cookies",
      reserved: "Área reservada"
    },
    legal: {
      privacyTitle: "Política de Privacidad",
      privacyIntro: "Este sitio web sirve como escaparate informativo para 'Villa Angela'. Para garantizar el máximo rendimiento y seguridad, utilizamos una infraestructura cloud-native basada en Supabase.",
      titolareTitle: "1. Responsable y Sistemas Cloud",
      titolareText: "El responsable del tratamiento es el propietario. Los datos de los huéspedes (Alloggiati Web) y las opiniones públicas se gestionan y almacenan de forma segura a nivel mundial a través de Supabase. La gestión fiscal corre a cargo de Novasol.",
      conservazioneTitle: "2. Operaciones en Tiempo Real y Derechos",
      conservazioneText: "Utilizamos sistemas de alto rendimiento para la sincronización de datos en tiempo real. Además, utilizamos la API de Google Translate para gestionar las opiniones multilingües. Según el RGPD, tiene pleno derecho de acceso o eliminación escribiendo a holidayvillaangela@gmail.com.",
      cookieTitle: "Política de Cookies",
      cookieWhatTitle: "1. ¿Qué son las Cookies?",
      cookieWhatText: "Las cookies son pequeños archivos de texto que se guardan en su dispositivo para mejorar las funciones del sitio.",
      cookieHowTitle: "2. Uso Transparente",
      cookieHowText: "Este sitio protege su privacidad por diseño:",
      cookieProfiling: "Sin Perfilado Invasivo: No utilizamos Google Analytics, Meta Pixel o sistemas de seguimiento nativos para perfilar su comportamiento con fines publicitarios.",
      cookieThirdParty: "Servicios Globales: El contenido multimedia está alojado en Supabase y las traducciones de las opiniones se gestionan a través de Google Translate, ambos optimizados para la privacidad y el cumplimiento.",
      cookieTechnical: "Elementos Técnicos: Utilizamos una cookie técnica para recordar el idioma elegido y un contador global anónimo en Supabase para monitorear las estadísticas del sitio de forma agregada.",
      lastUpdated: "Última actualización",
      date: "30 de marzo de 2026",
      accept: "Aceptar",
      reject: "Rechazar",
      privacyAndCookies: "Privacidad y Cookies",
      bannerText: "Utilizamos cookies para mejorar su experiencia y mantener estadísticas anónimas. No utilizamos seguimiento invasivo. Puede elegir aceptar o continuar sin cookies no esenciales.",
      comingSoon: "¡Próximamente!",
      bookingPlatforms: {
        title: "Reserve Donde Prefiera",
        subtitle: "Encuentre Villa Angela en los principales portales internacionales de reserva.",
        availableNow: "Disponible ahora",
        directListing: "Anuncio directo",
        viewListing: "Ver anuncio"
      },
      dateErrorSame: "La fecha de salida no puede ser la misma que la de entrada.",
      login: {
        user: "Usuario",
        pass: "Contraseña",
        submit: "Acceder",
        invalid: "Credenciales no válidas"
      }
    }
  },
  de: {
    hero: { tagline: "Zwei Seelen, ein Paradies" },
    about: {
      title: "Ein mediterraner Traum",
      text: "Im Herzen Süditaliens gelegen, ist die Villa Angela mehr als nur ein Reiseziel; sie ist ein Zufluchtsort, an dem die Zeit stillsteht. Zwischen dem Duft von Zitronenhainen und dem Rauschen des Meeres bieten wir zwei unterschiedliche Erlebnisse, die auf Ihre Wünsche zugeschnitten sind. Ob Sie einen familiären Rückzugsort oder einen exklusiven Luxusurlaub suchen, Ihre italienische Geschichte beginnt hier."
    },
    units: {
      title: "Unsere Unterkünfte",
      apartment: {
        name: "Ferienwohnung",
        desc: "Ein einladender 4-Sterne-Raum in <span class='script-title'>Angri</span>, ideal für Familien und Freunde. Erleben Sie den authentischen italienischen Lebensstil mit ausgestatteter Küche, kostenlosem WLAN und Balkon mit Aussicht.",
        features: ["4 Sterne", "Kostenloses WLAN", "Ausgestattete Küche", "Ganze Unterkunft", "150 m² Wohnfläche", "Kostenloser Parkplatz", "Haustiere erlaubt", "Klimaanlage", "Eigenes Badezimmer", "Waschmaschine"]
      },
      luxury: {
        name: "Luxushaus",
        desc: "Ein exklusives 5-Sterne-Heiligtum für den anspruchsvollen Reisenden. Anspruchsvolles Design, erstklassige Annehmlichkeiten und unvergleichliche Privatsphäre.",
        features: ["5 Sterne", "Exklusiver Zugang", "Premium-Design"]
      },
      viewDetails: "Details Anzeigen"
    },
    amenities: {
      title: "Ausstattung",
      items: ["Ganze Unterkunft", "150 m² Wohnfläche", "Kostenloser Parkplatz", "Haustiere erlaubt", "Kostenloses WLAN", "Küche", "Klimaanlage", "Eigenes Badezimmer", "Waschmaschine"]
    },
    location: { title: "Wie Sie uns finden", galleryTitle: "Die Umgebung erkunden", desc: "Strategisch günstig gelegen, bietet die Villa Angela einfachen Zugang zu den symbolträchtigsten Zielen der Region." },
    gallery: "Galerie",
    reviews: {
      title: "Gästebewertungen"
    },
    contact: {
      title: "Kontakt",
      name: "Vollständiger Name",
      email: "E-Mail-Adresse",
      unit: "Unterkunft",
      guests: "Gäste",
      checkIn: "Anreise",
      checkOut: "Abreise",
      message: "Ihre Nachricht",
      desc: "Bereit, das Mittelmeer zu erleben? Füllen Sie das folgende Formular aus und wir werden uns mit Verfügbarkeit und einem personalisierten Angebot bei Ihnen melden.",
      submit: "Anfrage senden"
    },
    footer: {
      cin: "CIN: IT065007C2W5T7ULLD",
      location: "Angri, Salerno",
      type: "Nicht-unternehmerische touristische Vermietung",
      privacy: "Datenschutz- und Cookie-Richtlinie",
      reserved: "Reservierter Bereich"
    },
    legal: {
      privacyTitle: "Datenschutzerklärung",
      privacyIntro: "Diese Website dient als Informationsschaufenster für 'Villa Angela'. Um maximale Leistung und Sicherheit zu gewährleisten, verwenden wir eine Cloud-native Infrastruktur auf Basis von Supabase.",
      titolareTitle: "1. Verantwortlicher und Cloud-Systeme",
      titolareText: "Verantwortlich für die Datenverarbeitung ist der Eigentümer. Gastdaten (Alloggiati Web) und öffentliche Bewertungen werden sicher und weltweit über Supabase verwaltet und gespeichert. Die steuerliche Verwaltung erfolgt durch Novasol.",
      conservazioneTitle: "2. Echtzeit-Betrieb und Rechte",
      conservazioneText: "Wir nutzen Hochleistungssysteme für die Datensynchronisation in Echtzeit. Zusätzlich wird die Google Translate API verwendet, um mehrsprachige Bewertungen bereitzustellen. Gemäß DSGVO haben Sie das volle Recht auf Auskunft oder Löschung, indem Sie an holidayvillaangela@gmail.com schreiben.",
      cookieTitle: "Cookie-Richtlinie",
      cookieWhatTitle: "1. Was sind Cookies?",
      cookieWhatText: "Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, um die Funktionalität der Website zu verbessern.",
      cookieHowTitle: "2. Transparente Nutzung",
      cookieHowText: "Diese Website schützt Ihre Privatsphäre durch 'Privacy by Design':",
      cookieProfiling: "Kein invasives Profiling: Wir verwenden kein Google Analytics, Meta Pixel oder native Tracking-Systeme, um Ihr Verhalten zu Werbezwecken zu profilieren.",
      cookieThirdParty: "Globale Dienste: Multimedia-Inhalte werden auf Supabase gehostet und Übersetzungen von Bewertungen werden über Google Translate verwaltet, beides optimiert für Datenschutz und Compliance.",
      cookieTechnical: "Technische Elemente: Wir verwenden ein technisches Cookie, um die gewählte Sprache zu speichern, und einen anonymen globalen Zähler auf Supabase, um die Website-Statistiken in aggregierter Form zu überwachen.",
      lastUpdated: "Zuletzt aktualisiert",
      date: "30. März 2026",
      accept: "Akzeptieren",
      reject: "Ablehnen",
      privacyAndCookies: "Datenschutz & Cookies",
      bannerText: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und anonyme Statistiken zu führen. Wir nutzen kein invasives Tracking. Sie können wählen, ob Sie Cookies akzeptieren oder ohne nicht-essenzielle Cookies fortfahren möchten.",
      comingSoon: "Demnächst verfügbar!",
      bookingPlatforms: {
        title: "Buchen Sie, wo Sie möchten",
        subtitle: "Finden Sie Villa Angela auf allen großen internationalen Buchungsportalen.",
        availableNow: "Jetzt verfügbar",
        directListing: "Direkte Anzeige",
        viewListing: "Anzeige ansehen"
      },
      dateErrorSame: "Das Abreisedatum darf nicht mit dem Anreisedatum übereinstimmen.",
      login: {
        user: "Benutzername",
        pass: "Passwort",
        submit: "Anmelden",
        invalid: "Ungültige Anmeldeinformationen"
      }
    }
  },
  pl: {
    hero: { tagline: "Dwie dusze, jeden raj" },
    about: {
      title: "Śródziemnomorskie Marzenie",
      text: "Położona w sercu południowych Włoch, Villa Angela to więcej niż cel podróży; to sanktuarium, w którym czas płynie wolniej. Wśród zapachu gajów cytrynowych i szumu morza oferujemy dwa różne doświadczenia dopasowane do Twoich pragnień. Niezależnie od tego, czy szukasz rodzinnego wypoczynku, czy ekskluzywnego, luksusowego azylu, Twoja włoska historia zaczyna się tutaj."
    },
    units: {
      title: "Nasze zakwaterowanie",
      apartment: {
        name: "Apartament Wakacyjny",
        desc: "Ciepła, 4-gwiazdkowa przestrzeń w <span class='script-title'>Angri</span>, idealna dla rodzin i przyjaciół. Doświadcz autentycznego włoskiego stylu życia z w pełni wyposażoną kuchnią, darmowym WiFi i balkonem z widokiem.",
        features: ["4 Gwiazdki", "Darmowe WiFi", "Wyposażona Kuchnia", "Całe mieszkanie", "150 m² powierzchni", "Darmowy parking", "Zwierzęta akceptowane", "Klimatyzacja", "Prywatna łazienka", "Pralka"]
      },
      luxury: {
        name: "Luksusowy Dom",
        desc: "Ekskluzywne, 5-gwiazdkowe sanktuarium dla wymagających podróżników. Wyrafinowany design, udogodnienia premium i niezrównana prywatność.",
        features: ["5 Gwiazdek", "Ekskluzywny Dostęp", "Design Premium"]
      },
      viewDetails: "Zobacz Szczegóły"
    },
    amenities: {
      title: "Udogodnienia",
      items: ["Całe mieszkanie", "150 m² powierzchni", "Darmowy parking", "Zwierzęta akceptowane", "Darmowe WiFi", "Kuchnia", "Klimatyzacja", "Prywatna łazienka", "Pralka"]
    },
    location: { title: "Jak nas znaleźć", galleryTitle: "Odkryj okolicę", desc: "Strategicznie położona Villa Angela zapewnia łatwy dostęp do najbardziej kultowych miejsc w regionie." },
    gallery: "Galeria",
    reviews: {
      title: "Opinie gości"
    },
    contact: {
      title: "Kontakt",
      name: "Imię i nazwisko",
      email: "Adres e-mail",
      unit: "Obiekt",
      guests: "Goście",
      checkIn: "Przyjazd",
      checkOut: "Wyjazd",
      message: "Twoja wiadomość",
      desc: "Gotowy na doświadczenie śródziemnomorskie? Wypełnij poniższy formularz, a my skontaktujemy się z Tobą w sprawie dostępności i spersonalizowanej oferty.",
      submit: "Wyślij zapytanie"
    },
    footer: {
      cin: "CIN: IT065007C2W5T7ULLD",
      location: "Angri, Salerno",
      type: "Niedziałalny najem turystyczny",
      privacy: "Polityka prywatności i plików cookie",
      reserved: "Strefa zastrzeżona"
    },
    legal: {
      privacyTitle: "Polityka Prywatności",
      privacyIntro: "Ta strona internetowa służy jako pokaz informacyjny apartamentu 'Villa Angela'. Aby zapewnić maksymalną wydajność i bezpieczeństwo, korzystamy z infrastruktury cloud-native opartej na Supabase.",
      titolareTitle: "1. Administrator i Systemy Chmurowe",
      titolareText: "Administratorem danych jest właściciel. Dane gości (Alloggiati Web) oraz publiczne opinie są bezpiecznie zarządzane i przechowywane globalnie przez Supabase. Zarządzaniem fiskalnym zajmuje się Novasol.",
      conservazioneTitle: "2. Operacje w Czasie Rzeczywistym i Prawa",
      conservazioneText: "Korzystamy z wysokowydajnych systemów do synchronizacji danych w czasie rzeczywistym. Ponadto, korzystamy z Google Translate API do obsługi wielojęzycznych opinii. Zgodnie z RODO, masz pełne prawo do dostępu lub usunięcia danych, kontaktując się z nami pod adresem holidayvillaangela@gmail.com.",
      cookieTitle: "Polityka Plików Cookie",
      cookieWhatTitle: "1. Co to są Pliki Cookie?",
      cookieWhatText: "Pliki cookie to małe pliki tekstowe zapisywane na Twoim urządzeniu w celu poprawy funkcjonalności strony.",
      cookieHowTitle: "2. Przejrzyste Użytkowanie",
      cookieHowText: "Ta strona chroni Twoją prywatność poprzez 'privacy by design':",
      cookieProfiling: "Brak Inwazyjnego Profilowania: Nie używamy Google Analytics, Meta Pixel ani natywnych systemów śledzenia do profilowania Twoich zachowań w celach reklamowych.",
      cookieThirdParty: "Usługi Globalne: Treści multimedialne są hostowane na Supabase, a tłumaczenia opinii są obsługiwane przez Google Translate, oba zoptymalizowane pod kątem prywatności i zgodności.",
      cookieTechnical: "Elementy Techniczne: Używamy technicznego pliku cookie do zapamiętania wybranego języka oraz anonimowego globalnego licznika na Supabase do monitorowania statystyk strony w formie zagregowanej.",
      lastUpdated: "Ostatnia aktualizacja",
      date: "30 marca 2026",
      accept: "Akceptuj",
      reject: "Odrzuć",
      privacyAndCookies: "Prywatność i Pliki Cookie",
      bannerText: "Używamy plików cookie, aby poprawić Twoje wrażenia i prowadzić anonimowe statystyki. Nie używamy inwazyjnego śledzenia. Możesz zaakceptować lub kontynuować bez plików cookie.",
      comingSoon: "Już wkrótce!",
      bookingPlatforms: {
        title: "Rezerwuj Tam, Gdzie Wolisz",
        subtitle: "Znajdź Villa Angela na wszystkich głównych międzynarodowych portalach rezerwacyjnych.",
        availableNow: "Dostępne teraz",
        directListing: "Bezpośrednia oferta",
        viewListing: "Zobacz ofertę"
      },
      dateErrorSame: "Data wyjazdu nie może być taka sama jak data przyjazdu.",
      login: {
        user: "Użytkownik",
        pass: "Hasło",
        submit: "Zaloguj się",
        invalid: "Nieprawidłowe dane uwierzytelniające"
      }
    }
  },
  zh: {
    hero: { tagline: "两个灵魂，一个天堂" },
    about: { 
      title: "关于安杰拉别墅", 
      text: "安杰拉别墅不仅仅是一个度假胜地；它是一个远离尘嚣的避风港。别墅坐落在地中海沿岸，在这里，现代奢华与永恒的自然之美相遇。我们的公寓和豪宅旨在为您提供极致的舒适，配有私人阳台和令人惊叹的海景。" 
    },
    units: {
      title: "我们的单位",
      apartment: {
        name: "度假公寓",
        desc: "带私人阳台的现代双人间，可欣赏壮丽的海景。位于 <span class='script-title'>Angri</span>。",
        features: ["Wi-Fi", "空调", "私人露台", "海景"]
      },
      luxury: {
        name: "奢华之家",
        desc: "优雅的套房，专为追求绝对舒适和风格的客人设计。",
        features: ["按摩浴缸", "景观露台", "智能电视", "迷你吧"]
      },
      viewDetails: "查看详情"
    },
    amenities: {
      title: "设施",
      items: ["免费 Wi-Fi", "私人停车场", "空调", "海滨", "露台", "礼宾服务"]
    },
    location: { 
      title: "如何找到我们", 
      galleryTitle: "探索周边", 
      desc: "位于沿海最独特的地段之一，距离最好的海滩和繁华的市中心仅几步之遥。" 
    },
    gallery: "画廊",
    reviews: { title: "客人评价" },
    contact: {
      title: "联系我们",
      name: "姓名",
      email: "电子邮件",
      unit: "选择单位",
      guests: "人数",
      checkIn: "入住日期",
      checkOut: "离店日期",
      message: "您的留言",
      desc: "准备好体验地中海了吗？填写下方表格，我们将为您提供空房情况和个性化报价。",
      submit: "发送查询"
    },
    footer: {
      cin: "CIN: IT065007C2W5T7ULLD",
      location: "昂格里, 萨莱诺",
      type: "非企业旅游租赁",
      privacy: "隐私和 Cookie 政策",
      reserved: "预留区域"
    },
    legal: {
      privacyTitle: "隐私政策",
      privacyIntro: "本网站作为“安杰拉别墅”的信息展示平台。为了确保最佳性能和安全性，我们采用了基于 Supabase 的云原生基础设施。",
      titolareTitle: "1. 数据控制者与云系统",
      titolareText: "数据控制者为房东。房客数据（Alloggiati Web）和公共评论均通过 Supabase 在全球范围内安全管理和存储。财务管理由 Novasol 负责。",
      conservazioneTitle: "2. 实时操作与权利",
      conservazioneText: "我们使用高性能系统进行实时数据同步。此外，我们还利用 Google Translate API 提供多语言评论支持。根据 GDPR 的规定，您有权通过发送邮件至 holidayvillaangela@gmail.com 随时访问或要求删除您的数据。",
      cookieTitle: "Cookie 政策",
      cookieWhatTitle: "1. 什么是 Cookie？",
      cookieWhatText: "Cookie 是为了提升网站功能而存储在您的设备上的小型文本文件。",
      cookieHowTitle: "2. 透明使用",
      cookieHowText: "本网站在设计上尊重您的隐私：",
      cookieProfiling: "无侵入式画像：我们不使用 Google Analytics、Meta Pixel 或任何原生跟踪工具对您的行为进行广告画像分析。",
      cookieThirdParty: "全球服务：多媒体资产托管在 Supabase 上，评论翻译由 Google Translate 提供支持，两者均针对隐私和合规性进行了优化。",
      cookieTechnical: "技术元素：我们使用技术性 Cookie 来记住您的语言选择，并使用 Supabase 上的匿名全球计数器来汇总监控网站统计数据。",
      lastUpdated: "最后更新",
      date: "2026年3月30日",
      accept: "接受",
      reject: "拒绝",
      privacyAndCookies: "隐私与 Cookie",
      bannerText: "我们使用 Cookie 以改善您的体验并进行匿名统计。我们不进行侵入式跟踪。您可以选择接受或在不启用非必要 Cookie 的情况下继续浏览。",
      comingSoon: "即将推出！",
      bookingPlatforms: {
        title: "选择您偏好的预订平台",
        subtitle: "在主要的国际预订平台上查找安杰拉别墅度假公寓。",
        availableNow: "现已推出",
        directListing: "直接房源",
        viewListing: "查看房源"
      },
      dateErrorSame: "退房日期不能与入住日期相同。",
      login: {
        user: "用户名",
        pass: "密码",
        submit: "登录",
        invalid: "身份验证失败"
      }
    }
  },
  ar: {
    hero: { tagline: "روحان، جنة واحدة" },
    about: { 
      title: "حول فيلا أنجيلا", 
      text: "فيلا أنجيلا ليست مجرد وجهة؛ إنها ملاذ بعيد عن العالم. تقع الفيلا على ساحل البحر الأبيض المتوسط، حيث تلتقي الفخامة الحديثة بجمال الطبيعة الخالد. تم تصميم شققنا ومنازلنا الفاخرة لتوفير أقصى درجات الراحة، مع شرفات خاصة وإطلالات خلابة على البحر." 
    },
    units: {
      title: "وحداتنا",
      apartment: {
        name: "شقة عطلات",
        desc: "غرفة مزدوجة حديثة مع شرفة خاصة وإطلالة رائعة على البحر. تقع في <span class='script-title'>Angri</span>。",
        features: ["واي فاي", "تكييف", "تراس خاص", "إطلالة على البحر"]
      },
      luxury: {
        name: "منزل فاخر",
        desc: "جناح أنيق مصمم للضيوف الذين يبحثون عن الراحة المطلقة والأناقة.",
        features: ["جاكوزي", "تراس بانورامي", "تلفزيون ذكي", "ميني بار"]
      },
      viewDetails: "عرض التفاصيل"
    },
    amenities: {
      title: "المرافق",
      items: ["واي فاي مجاني", "موقف سيارات خاص", "تكييف", "على الشاطئ", "تراس", "خدمة الكونسيرج"]
    },
    location: { 
      title: "كيف تجدنا", 
      galleryTitle: "استكشف الأماكن المجاورة", 
      desc: "يقع في أحد أكثر المواقع حصرية على الساحل، على بعد خطوات قليلة من أفضل الشواطئ ووسط المدينة النابض بالحياة." 
    },
    gallery: "المعرض",
    reviews: { title: "آراء الضيوف" },
    contact: {
      title: "اتصل بنا",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      unit: "اختر الوحدة",
      guests: "الضيوف",
      checkIn: "تاريخ الوصول",
      checkOut: "تاريخ المغادرة",
      message: "رسالتك",
      desc: "مستعد لتجربة البحر الأبيض المتوسط؟ املأ النموذج أدناه وسنعاود الاتصال بك لمعرفة التوفر وعرض أسعار مخصص.",
      submit: "إرسال الاستفسار"
    },
    footer: {
      cin: "CIN: IT065007C2W5T7ULLD",
      location: "أنجري، ساليرنو",
      type: "إيجار سياحي غير تجاري",
      privacy: "سياسة الخصوصية وملفات تعريف الارتباط",
      reserved: "منطقة خاصة"
    },
    legal: {
      privacyTitle: "سياسة الخصوصية",
      privacyIntro: "يعمل هذا الموقع كمنصة عرض معلوماتية لـ 'Villa Angela'. لضمان أقصى أداء وأمان، نستخدم بنية تحتية سحابية تعتمد على Supabase.",
      titolareTitle: "1. مراقب البيانات والأنظمة السحابية",
      titolareText: "مراقب البيانات هو المالك. يتم إدارة بيانات الضيوف (Alloggiati Web) والمراجعات العامة وتخزينها بأمان عالميًا عبر Supabase. الإدارة الضريبية تتم بواسطة Novasol.",
      conservazioneTitle: "2. عمليات الوقت الفعلي والحقوق",
      conservazioneText: "نستخدم أنظمة عالية الأداء لمزامنة البيانات في الوقت الفعلي. بالإضافة إلى ذلك، نستخدم Google Translate API لإدارة المراجعات متعددة اللغات. بموجب GDPR، لديك كامل الحق في الوصول أو الحذف عن طريق مراسلتنا على holidayvillaangela@gmail.com.",
      cookieTitle: "سياسة ملفات تعريف الارتباط",
      cookieWhatTitle: "1. ما هي ملفات تعريف الارتباط؟",
      cookieWhatText: "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم حفظها على جهازك لتحسين وظائف الموقع.",
      cookieHowTitle: "2. استخدام شفاف",
      cookieHowText: "هذا الموقع يحمي خصوصيتك من خلال التصميم:",
      cookieProfiling: "لا يوجد تتبع تطفلي: نحن لا نستخدم Google Analytics أو Meta Pixel أو أنظمة تتبع أصلية لتحليل سلوكك لأغراض إعلانية.",
      cookieThirdParty: "خدمات عالمية: يتم استضافة محتوى الوسائط على Supabase وتتم إدارة ترجمات المراجعات عبر Google Translate، وكلاهما محسن للخصوصية والامتثال.",
      cookieTechnical: "عناصر تقنية: نستخدم ملف تعريف ارتباط تقني لتذكر لغتك المختارة وعدادًا عالميًا مجهول الهوية على Supabase لمراقبة إحصائيات الموقع بشكل مجمع.",
      lastUpdated: "آخر تحديث",
      date: "٣٠ مارس ٢٠٢٦",
      accept: "قبول",
      reject: "رفض",
      privacyAndCookies: "الخصوصية وملفات تعريف الارتباط",
      bannerText: "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك والحفاظ على إحصائيات مجهولة. نحن لا نستخدم تتبعًا تطفليًا. يمكنك اختيار القبول أو الاستمرار بدون ملفات تعريف ارتباط غير ضرورية.",
      comingSoon: "قريباً!",
      bookingPlatforms: {
        title: "احجز أينما تفضل",
        subtitle: "ابحث عن Villa Angela على جميع منصات الحجز الدولية الكبرى.",
        availableNow: "متاح الآن",
        directListing: "إدراج مباشر",
        viewListing: "عرض القائمة"
      },
      dateErrorSame: "لا يمكن أن يكون تاريخ المغادرة هو نفس تاريخ الوصول.",
      login: {
        user: "اسم المستخدم",
        pass: "كلمة المرور",
        submit: "تسجيل الدخول",
        invalid: "بيانات الاعتماد غير صالحة"
      }
    }
  },
  da: {
    hero: { tagline: "To sjæle, ét paradis" },
    about: { 
      title: "Om Villa Angela", 
      text: "Villa Angela er mere end blot en feriedestination; det er et fristed væk fra verden. Beliggende på Middelhavskysten, hvor moderne luksus møder tidløs naturlig skønhed. Vores lejligheder og luksushuse er designed til at give dig den ultimative komfort med private balkoner og betagende havudsigt." 
    },
    units: {
      title: "Vores Enheder",
      apartment: {
        name: "Ferielejlighed",
        desc: "Moderne dobbeltværelse med privat balkon og fantastisk havudsigt.",
        features: ["Wi-Fi", "Aircondition", "Privat terrasse", "Havsudsigt"]
      },
      luxury: {
        name: "Luksushus",
        desc: "Elegant suite designet til gæster, der søger absolut komfort og stil.",
        features: ["Jacuzzi", "Panoramaterrasse", "Smart TV", "Minibar"]
      },
      viewDetails: "Se Detaljer"
    },
    amenities: {
      title: "Faciliteter",
      items: ["Gratis Wi-Fi", "Privat parkering", "Aircondition", "Ved stranden", "Terrasse", "Concierge service"]
    },
    location: { 
      title: "Sådan finder du os", 
      galleryTitle: "Udforsk omgivelserne", 
      desc: "Beliggende i et af de mest eksklusive områder på kysten, kun få skridt fra de bedste strande og det pulserende centrum." 
    },
    gallery: "Galleri",
    reviews: { title: "Gæsteanmeldelser" },
    contact: {
      title: "Kontakt Os",
      name: "Fulde Navn",
      email: "E-mailadresse",
      unit: "Vælg Enhed",
      guests: "Gäster",
      checkIn: "Indtjekningsdato",
      checkOut: "Udtjekningsdato",
      message: "Din Besked",
      desc: "Klar til at opleve Middelhavet? Udfyld formularen nedenfor, så vender vi tilbage til dig med tilgængelighed og et personligt tilbud.",
      submit: "Send Forespørgsel"
    },
    footer: {
      cin: "CIN: IT065007C2W5T7ULLD",
      location: "Angri, Salerno",
      type: "Ikke-erhvervsmæssig turistudlejning",
      privacy: "Privatlivs- & Cookiepolitik",
      reserved: "Reserveret Område"
    },
    legal: {
      privacyTitle: "Privatlivspolitik",
      privacyIntro: "Denne hjemmeside fungerer som et informationsvindue for 'Villa Angela'. For at sikre maksimal ydeevne og sikkerhed bruger vi en cloud-native infrastruktur baseret på Supabase.",
      titolareTitle: "1. Dataansvarlig og Cloud-systemer",
      titolareText: "Den dataansvarlige er ejeren. Gæstedata (Alloggiati Web) og offentlige anmeldelser administreres og opbevares sikkert globalt via Supabase. Økonomisk forvaltning varetages af Novasol.",
      conservazioneTitle: "2. Realtidssynkronisering og Rettigheder",
      conservazioneText: "Vi bruger højydelsessystemer til realtidssynkronisering af data. Derudover bruges Google Translate API til at håndtere flersprogede anmeldelser. Under GDPR har du fuld ret til indsigt eller sletning ved at skrive til holidayvillaangela@gmail.com.",
      cookieTitle: "Cookiepolitik",
      cookieWhatTitle: "1. Hvad er Cookies?",
      cookieWhatText: "Cookies er små tekstfiler, der gemmes på din enhed for at forbedre hjemmesidens funktionalitet.",
      cookieHowTitle: "2. Gennemsigtig Brug",
      cookieHowText: "Denne hjemmeside respekterer dit privatliv gennem 'privacy by design':",
      cookieProfiling: "Ingen Invasiv Profilering: Vi bruger ikke Google Analytics, Meta Pixel eller indfødte sporingssystemer til at profilere din adfærd til reklameformål.",
      cookieThirdParty: "Globale Tjenester: Multimedieindhold hostes på Supabase, og oversættelser af anmeldelser håndteres via Google Translate, begge optimeret til privatliv og overholdelse.",
      cookieTechnical: "Tekniske Elementer: Vi bruger en teknisk cookie til at huske dit valgte sprog og en anonym global tæller på Supabase til at overvåge hjemmesidens statistik i samlet form.",
      lastUpdated: "Sidst opdateret",
      date: "30. marts 2026",
      accept: "Accepter",
      reject: "Afvis",
      privacyAndCookies: "Privatliv & Cookies",
      bannerText: "Vi bruger cookies til at forbedre din oplevelse og føre anonym statistik. Vi bruger ikke invasiv sporing. Du kan vælge at acceptere eller fortsætte uden ikke-essentielle cookies.",
      comingSoon: "Kommer snart!",
      bookingPlatforms: {
        title: "Book Hvor Du Foretrækker",
        subtitle: "Find Villa Angela på alle de største internationale bookingportaler.",
        availableNow: "Tilgængelig nu",
        directListing: "Direkte opslag",
        viewListing: "Se opslag"
      },
      dateErrorSame: "Udtjekningsdatoen kan ikke være den samme som indtjekningsdatoen.",
      login: {
        user: "Brugernavn",
        pass: "Adgangskode",
        submit: "Log ind",
        invalid: "Ugyldige legitimationsoplysninger"
      }
    }
  },
  sv: {
    hero: { tagline: "Två själar, ett paradis" },
    about: { 
      title: "Om Villa Angela", 
      text: "Villa Angela är mer än bara en semesterdestination; det är en tillflyktsort bortom världen. Beläget på Medelhavskusten, där modern lyx möter tidlös naturlig skönhet. Våra lägenheter och lyxhus är designade för att ge dig ultimat komfort med privata balkonger och fantastisk havsutsikt." 
    },
    units: {
      title: "Våra Enheter",
      apartment: {
        name: "Semesterlägenhet",
        desc: "Modernt dubbelrum med privat balkong och fantastisk havsutsikt.",
        features: ["Wi-Fi", "Luftkonditionering", "Privat terrass", "Havsutsikt"]
      },
      luxury: {
        name: "Lyxhus",
        desc: "Elegant svit designad för gäster som söker absolut komfort och stil.",
        features: ["Jacuzzi", "Panoramaterrass", "Smart TV", "Minibar"]
      },
      viewDetails: "Visa Detaljer"
    },
    amenities: {
      title: "Faciliteter",
      items: ["Gratis Wi-Fi", "Privat parkering", "Luftkonditionering", "Vid stranden", "Terrass", "Concierge-service"]
    },
    location: { 
      title: "Hitta till oss", 
      galleryTitle: "Utforska omgivningarna", 
      desc: "Villa Angela är strategiskt belägen och erbjuder enkel tillgång till de mest ikoniska destinationerna i regionen." 
    },
    gallery: "Galleri",
    reviews: { title: "Gästrevensioner" },
    contact: {
      title: "Kontakta Oss",
      name: "Fullständigt Namn",
      email: "E-postadress",
      unit: "Välj Enhet",
      guests: "Gäster",
      checkIn: "Incheckningsdatum",
      checkOut: "Utcheckningsdatum",
      message: "Ditt Meddelande",
      desc: "Redo att uppleva Medelhavet? Fyll i formuläret nedan så återkommer vi till dig med tillgänglighet och ett personligt erbjudande.",
      submit: "Skicka Förfrågan"
    },
    footer: {
      cin: "CIN: IT065007C2W5T7ULLD",
      location: "Angri, Salerno",
      type: "Icke-yrkesmässig turistuthyrning",
      privacy: "Integritets- & Cookiepolicy",
      reserved: "Reserverat Område"
    },
    legal: {
      privacyTitle: "Integritetspolicy",
      privacyIntro: "Denna webbplats fungerar som ett informationsfönster för 'Villa Angela'. För att säkerställa maximal prestanda och säkerhet använder vi en molnbaserad infrastruktur baserad på Supabase.",
      titolareTitle: "1. Personuppgiftsansvarig och Molnsystem",
      titolareText: "Personuppgiftsansvarig är ägaren. Gästdata (Alloggiati Web) och offentliga recensioner hanteras och lagras säkert globalt via Supabase. Den finansiella förvaltningen sköts av Novasol.",
      conservazioneTitle: "2. Realtidsdrift och Rättigheter",
      conservazioneText: "Vi använder högpresterande system för datasynkronisering i realtid. Dessutom används Google Translate API för att hantera flersprogliga recensioner. Enligt GDPR har du full rätt till tillgång eller radering genom att skriva till holidayvillaangela@gmail.com.",
      cookieTitle: "Cookiepolicy",
      cookieWhatTitle: "1. Vad är Cookies?",
      cookieWhatText: "Cookies är små textfiler som sparas på din enhet för att förbättra webbplatsens funktionalitet.",
      cookieHowTitle: "2. Transparent Användning",
      cookieHowText: "Denna webbplats respekterar din integritet genom 'privacy by design':",
      cookieProfiling: "Ingen Invasiv Profilering: Vi använder inte Google Analytics, Meta Pixel eller inbyggda spårningssystem för att profilera ditt beteende i reklamsyfte.",
      cookieThirdParty: "Globala Tjenster: Multimedietillgångar hostas på Supabase och översättningar av recensioner hanteras via Google Translate, båda optimerade för integritet och efterlevnad.",
      cookieTechnical: "Tekniska Element: Vi använder en teknisk cookie för att komma ihåg ditt valda språk och en anonym global räknare på Supabase för att övervaka webbplatsens statistik i aggregerad form.",
      lastUpdated: "Senast uppdaterad",
      date: "30 mars 2026",
      accept: "Acceptera",
      reject: "Avvisa",
      privacyAndCookies: "Integritet & Cookies",
      bannerText: "Vi använder cookies för att förbättra din upplevelse och föra anonym statistik. Vi använder inte invasiv spårning. Du kan välja att acceptera eller fortsätta utan icke-nödvändiga cookies.",
      comingSoon: "Kommer snart!",
      bookingPlatforms: {
        title: "Boka Där Du Föredrar",
        subtitle: "Hitta Villa Angela på alla stora internationella bokningsportaler.",
        availableNow: "Tillgänglig nu",
        directListing: "Direktannons",
        viewListing: "Visa annons"
      },
      dateErrorSame: "Utcheckningsdatumet kan inte vara detsamma som incheckningsdatumet.",
      login: {
        user: "Användarnamn",
        pass: "Lösenord",
        submit: "Logga in",
        invalid: "Ogiltiga uppgifter"
      }
    }
  }
};


// --- Hooks ---

const useHorizontalMarquee = (speed: number = 1.0) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    let frameId: number;
    let lastTime = 0;
    let isInteracting = false;
    let lastInteractionTime = 0;
    let currentX = 0;
    
    // Drag/Swipe state
    let startX = 0;
    let initialX = 0;

    const step = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      const now = Date.now();
      const isInteractionActive = isInteracting || (now - lastInteractionTime < 300);

      if (!isInteractionActive && inner) {
        // GPU-accelerated movement for sub-pixel accuracy
        currentX += (speed * delta) / 16.67; 
        
        const halfWidth = inner.scrollWidth / 2;
        if (halfWidth > 0 && currentX >= halfWidth) {
          currentX -= halfWidth;
        }
        inner.style.transform = `translate3d(-${currentX}px, 0, 0)`;
      }
      frameId = requestAnimationFrame(step);
    };

    const handleStart = (clientX: number) => {
      isInteracting = true;
      startX = clientX;
      initialX = currentX;
      lastInteractionTime = Date.now();
    };

    const handleMove = (clientX: number) => {
      if (!isInteracting) return;
      const dx = startX - clientX;
      currentX = initialX + dx;
      
      // Bounds & Loop logic for dragging
      const halfWidth = inner.scrollWidth / 2;
      if (halfWidth > 0) {
        if (currentX >= halfWidth) {
          currentX -= halfWidth;
          startX -= (halfWidth / (initialX === currentX ? 1 : 1)); // Adjust startX to keep motion relative
          initialX -= halfWidth;
        } else if (currentX < 0) {
          currentX += halfWidth;
          startX += halfWidth;
          initialX += halfWidth;
        }
      }
      
      inner.style.transform = `translate3d(-${currentX}px, 0, 0)`;
      lastInteractionTime = Date.now();
    };

    const handleEnd = () => {
      if (!isInteracting) return;
      isInteracting = false;
      lastInteractionTime = Date.now();
    };

    // Desktop Events
    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    
    // Touch Events
    const onTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => handleEnd();

    // Wheel Events (Touchpad scrolling)
    const onWheel = (e: WheelEvent) => {
      // If the scroll is mostly vertical, let the browser handle it (page scroll)
      // and DO NOT stop the marquee animation.
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        return;
      }

      // Horizontal scroll (Trackpad or Shift+Wheel)
      currentX += e.deltaX;
      
      const halfWidth = inner.scrollWidth / 2;
      if (halfWidth > 0) {
        if (currentX >= halfWidth) currentX -= halfWidth;
        else if (currentX < 0) currentX += halfWidth;
      }
      
      inner.style.transform = `translate3d(-${currentX}px, 0, 0)`;
      lastInteractionTime = Date.now();
      
      // Prevent default only for horizontal scroll to avoid triggering browser "back/forward" swipes
      e.preventDefault();
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    
    container.addEventListener('wheel', onWheel, { passive: false });

    frameId = requestAnimationFrame(step);
    
    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('wheel', onWheel);
    };
  }, [speed]);

  return { containerRef, innerRef };
};

// --- Components ---

interface AmenityProps {
  item: string;
  index: number;
  key?: number | string;
}

const AmenityCard = ({ item, index }: AmenityProps) => {
  const icons = [Home, Maximize, Car, Dog, Wifi, Utensils, Snowflake, Bath, Shirt];
  const Icon = icons[index] || Home;

  // Animations for specific boxes
  const isFirst = index === 0;
  const isSecond = index === 1;
  const isThird = index === 2;
  const isFourth = index === 3;
  const isSeventh = index === 6;

  const boxAnimate = isFirst ? { 
    boxShadow: [
      "0 2px 8px rgba(0,0,0,0.06), 0 0 0px rgba(59, 43, 31, 0)", 
      "0 4px 20px rgba(0,0,0,0.12), 0 0 40px rgba(59, 43, 31, 0.6)", 
      "0 2px 8px rgba(0,0,0,0.06), 0 0 0px rgba(59, 43, 31, 0)"
    ] 
  } : {};

  const iconAnimate = isSecond ? {
    scale: [1, 1.35, 1]
  } : (index === 8 ? {
    rotate: 360
  } : {});

  const iconTransition = isSecond ? { 
    repeat: Infinity, 
    duration: 2.5, 
    ease: "easeInOut" 
  } : (index === 8 ? {
    repeat: Infinity, 
    duration: 4, 
    ease: "linear"
  } : {});

  return (
    <motion.div 
      animate={boxAnimate}
      transition={{ 
        repeat: Infinity, 
        duration: 4, 
        ease: "easeInOut" 
      }}
      className={`flex items-center border-none bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] rounded-[14px] min-h-[64px] h-auto pointer-events-none fade-in relative overflow-hidden ${isSeventh ? 'p-[3.5px]' : 'px-5 py-4 gap-4'}`}
    >
      {/* Animated rotating gradient border ONLY for AC */}
      {isSeventh && (
        <>
          {/* Subtle Glow Aura */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
            style={{ 
              background: 'conic-gradient(#60A5FA 0%, #60A5FA 25%, #FB923C 25%, #FB923C 75%, #60A5FA 75%, #60A5FA 100%)',
              width: '280%',
              height: '280%',
              left: '-90%',
              top: '-90%',
              filter: 'blur(15px)',
              opacity: 0.45
            }}
            className="absolute z-0"
          />
          {/* Main Sharp Border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
            style={{ 
              background: 'conic-gradient(#60A5FA 0%, #60A5FA 25%, #FB923C 25%, #FB923C 75%, #60A5FA 75%, #60A5FA 100%)',
              width: '250%',
              height: '250%',
              left: '-75%',
              top: '-75%'
            }}
            className="absolute z-0"
          />
        </>
      )}

      <div className={`flex items-center w-full h-full relative z-10 ${isSeventh ? 'bg-white rounded-[11px] px-5 py-4 gap-4' : 'gap-4'}`}>
        <div className="flex items-center gap-3 flex-shrink-0 relative z-10">
          <motion.div 
            animate={iconAnimate}
            transition={iconTransition}
            className="flex items-center justify-center flex-shrink-0"
          >
            <Icon size={20} strokeWidth={1.5} className="text-[#5C4A3A]" />
          </motion.div>
          <span className="text-[14px] font-sans font-normal tracking-wide text-[#3D2B1F]">
            {item}
          </span>
        </div>

      {/* Moving car animation after the text only for Parcheggio */}
      {isThird && (
        <div className="flex-1 overflow-hidden relative h-full flex items-center min-w-[40px]">
          <motion.div
            animate={{ x: ["-100%", "230%"] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="opacity-[0.6] pointer-events-none"
          >
            <Car size={24} strokeWidth={1.2} className="text-[#5C4A3A]" />
          </motion.div>
        </div>
      )}

      {/* Moving bone animation after the text only for Animali */}
      {isFourth && (
        <div className="flex-1 overflow-hidden relative h-full flex items-center min-w-[40px]">
          <motion.div
            animate={{ x: ["-100%", "230%"], rotate: [0, 45, 0, -45, 0] }}
            transition={{ 
              x: { repeat: Infinity, duration: 6, ease: "linear" },
              rotate: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }}
            className="opacity-[0.6] pointer-events-none"
          >
            <Bone size={24} strokeWidth={1.2} className="text-[#5C4A3A]" />
          </motion.div>
        </div>
      )}

      {/* Animated network cable after the text only for WiFi */}
      {index === 4 && (
        <div className="flex-1 overflow-hidden relative h-full flex items-center min-w-[60px] ml-2">
          <svg width="40" height="20" viewBox="0 0 40 20" className="opacity-[0.7]">
            <motion.path
              d="M 0 10 L 30 10 M 30 5 L 38 5 L 38 15 L 30 15 Z"
              fill="none"
              stroke="#5C4A3A"
              strokeWidth="1.8"
              strokeLinecap="round"
              initial={{ pathLength: 0.8, x: -5 }}
              animate={{ x: [ -5, 2, -5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <motion.circle
              cx="0"
              cy="10"
              r="2.5"
              fill="#5C4A3A"
              animate={{ cx: [0, 32] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />
          </svg>
        </div>
      )}

      {/* Steaming plate animation after the text only for Cucina */}
      {index === 5 && (
        <div className="flex-1 overflow-hidden relative h-full flex items-center min-w-[50px] ml-2">
          <svg width="40" height="24" viewBox="0 0 40 24" className="opacity-[0.8]">
            {/* Plate */}
            <path d="M 5 18 C 5 21, 35 21, 35 18 L 32 16 L 8 16 Z" fill="#5C4A3A" />
            {/* Steam paths */}
            {[10, 20, 30].map((x, i) => (
              <motion.path
                key={i}
                d={`M ${x} 14 Q ${x+2} 10, ${x} 6`}
                fill="none"
                stroke="#5C4A3A"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{ 
                  y: [2, -6],
                  opacity: [0, 1, 0],
                  pathLength: [0, 1, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.8, 
                  delay: i * 0.5,
                  ease: "easeInOut" 
                }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Shower head animation after the text only for Bagno */}
      {index === 7 && (
        <div className="flex-1 overflow-hidden relative h-full flex items-center min-w-[50px] ml-2">
          <div className="relative">
            <ShowerHead size={24} strokeWidth={1.5} className="text-[#5C4A3A] opacity-80" />
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: [8, 18],
                  x: [0, (i - 1) * 4]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1, 
                  delay: i * 0.3,
                  ease: "easeIn" 
                }}
                className="absolute top-2 left-1/2 -ml-1 text-[#5C4A3A]"
              >
                <Droplet size={9} fill="currentColor" stroke="none" />
              </motion.div>
            ))}
          </div>
        </div>
      )}
      </div>
    </motion.div>
  );
};

const BackgroundGallery = ({ isActive }: { isActive: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/676096734.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911497.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911499.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911510.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911526.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334701.jpg"
  ];

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Crossfade every 4s
    return () => clearInterval(interval);
  }, [isActive, images.length]);

  return (
    <>
      <style>
        {`
          @keyframes slowPan {
            0% { transform: scale(1.05) translateX(0); }
            100% { transform: scale(1.1) translateX(-3%); }
          }
          .animate-pan { animation: slowPan 30s infinite alternate ease-in-out; }
        `}
      </style>
      <div className="w-full h-full relative bg-[#3b2b1f]">
        {images.map((src, idx) => (
          <div 
            key={src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ${idx === currentIndex && isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img 
              src={src}
              className="w-full h-full object-cover animate-pan"
              alt="Background Slide"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  );
};

const Nav = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: Record<string, any> = {
    it: { about: "Chi Siamo", units: "Unità", gallery: "Galleria", location: "Posizione", reviews: "Recensioni", booking: "Prenota", contact: "Contatti" },
    en: { about: "About", units: "Units", gallery: "Gallery", location: "Location", reviews: "Reviews", booking: "Book", contact: "Contact" },
    fr: { about: "À Propos", units: "Unités", gallery: "Galerie", location: "Emplacement", reviews: "Avis", booking: "Réserver", contact: "Contact" },
    es: { about: "Nosotros", units: "Unidades", gallery: "Galería", location: "Ubicación", reviews: "Reseñas", booking: "Reservar", contact: "Contacto" },
    de: { about: "Über Uns", units: "Einheiten", gallery: "Galerie", location: "Standort", reviews: "Bewertungen", booking: "Buchen", contact: "Kontakt" },
    pl: { about: "O Nas", units: "Jednostki", gallery: "Galeria", location: "Lokalizacja", reviews: "Opinie", booking: "Rezerwuj", contact: "Kontakt" }
  };
  const t = navLinks[lang] || navLinks.en;

  return (
    <nav className={`fixed top-0 w-full z-50 py-3 md:py-4 px-3 md:px-12 flex flex-row justify-between items-center transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-[#1E323C] shadow-md' : 'bg-transparent'}`}>
      <div className="flex items-center gap-2 md:gap-3 font-serif text-[1rem] md:text-xl tracking-widest uppercase text-white font-[600] drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] z-[60] relative shrink-0">
        <img src="/side-logo.png" alt="Villa Angela Logo" className="h-6 md:h-8 object-contain" />
        <span className="whitespace-nowrap">Villa Angela</span>
      </div>
      
      <div className="flex items-center justify-end gap-2 md:gap-8 z-[60] relative">
        {/* Desktop Links - hidden on mobile */}
        <div className="hidden lg:flex gap-6 text-[10px] md:text-[0.85rem] uppercase tracking-[0.08em] font-[500] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] relative whitespace-nowrap">
          <a href="#about" className="hover:text-[#F5F0E8] transition-colors">{t.about}</a>
          <a href="#units" className="hover:text-[#F5F0E8] transition-colors">{t.units}</a>
          <a href="#gallery" className="hover:text-[#F5F0E8] transition-colors">{t.gallery}</a>
          <a href="#location" className="hover:text-[#F5F0E8] transition-colors">{t.location}</a>
          <a href="#reviews" className="hover:text-[#F5F0E8] transition-colors">{t.reviews}</a>
          <a href="#booking" className="hover:text-[#F5F0E8] transition-colors">{t.booking}</a>
          <a href="#contact" className="hover:text-[#F5F0E8] transition-colors">{t.contact}</a>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative" onMouseLeave={() => setIsLangOpen(false)}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-[10px] md:text-[0.85rem] uppercase tracking-[0.08em] font-[500] border border-white/30 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-white/10 transition-all"
            >
              <Globe size={12} />
              <img src={`https://flagcdn.com/w20/${{en:'gb', zh:'cn', ar:'sa', da:'dk', sv:'se'}[lang] || lang}.png`} alt={lang.toUpperCase()} className="w-3 md:w-4 h-2 md:h-3 rounded-sm object-cover" />
              {lang}
            </button>
            <div className={`absolute right-0 top-full pt-2 w-44 transition-all duration-300 z-50 ${isLangOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <div className="bg-white border border-[#3b2b1f]/10 rounded-[1.25rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col py-2">
                {[
                  { code: 'it', name: 'Italiano', flag: 'it' },
                  { code: 'en', name: 'English', flag: 'gb' },
                  { code: 'fr', name: 'Français', flag: 'fr' },
                  { code: 'es', name: 'Español', flag: 'es' },
                  { code: 'de', name: 'Deutsch', flag: 'de' },
                  { code: 'pl', name: 'Polski', flag: 'pl' },
                  { code: 'zh', name: '中文', flag: 'cn' },
                  { code: 'ar', name: 'العربية', flag: 'sa' },
                  { code: 'da', name: 'Dansk', flag: 'dk' },
                  { code: 'sv', name: 'Svenska', flag: 'se' }
                ].map((l) => (
                  <button 
                    key={l.code}
                    onClick={() => { setLang(l.code as Language); setIsLangOpen(false); }}
                    className={`flex items-center gap-3 px-5 py-2.5 hover:bg-transparent text-left text-[13px] font-medium tracking-wide transition-colors ${lang === l.code ? 'text-[#a67c52]' : 'text-[#3D2B1F]'}`}
                  >
                    <img src={`https://flagcdn.com/w40/${l.flag}.png`} alt={l.code.toUpperCase()} className="w-5 h-3.5 rounded-[3px] object-cover shadow-[0_1px_3px_rgba(0,0,0,0.15)]" />
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button - only visible on mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-white hover:bg-white/10 rounded-full transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ top: 0 }}
            className="fixed inset-0 bg-[#1E323C] z-40 lg:hidden flex flex-col pt-24 px-8 pb-8 gap-8 shadow-2xl overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {[
                { id: 'about', label: t.about },
                { id: 'units', label: t.units },
                { id: 'gallery', label: t.gallery },
                { id: 'location', label: t.location },
                { id: 'reviews', label: t.reviews },
                { id: 'booking', label: t.booking },
                { id: 'contact', label: t.contact }
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-2xl font-serif tracking-widest uppercase border-b border-white/5 pb-4 hover:text-[#F5F0E8] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Concierge = ({ lang, today }: { lang: Language, today: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const tForm: Record<string, any> = {
    it: { waSub: "Prenota su WhatsApp", name: "NOME E COGNOME", unit: "STRUTTURA", checkin: "CHECK-IN", checkout: "CHECK-OUT", guests: "OSPITI", msg: "MESSAGGIO (OPZIONALE)", submit: "Invia su WhatsApp", waMsg: "Ciao! Vorrei avere informazioni per un soggiorno a Villa Angela.", waLabelName: "Nome e Cognome", waLabelUnit: "Struttura", waLabelGuests: "Ospiti" },
    en: { waSub: "Book on WhatsApp", name: "FULL NAME", unit: "UNIT", checkin: "CHECK-IN", checkout: "CHECK-OUT", guests: "GUESTS", msg: "MESSAGE (OPTIONAL)", submit: "Send on WhatsApp", waMsg: "Hello! I would like to get information for a stay at Villa Angela.", waLabelName: "Name", waLabelUnit: "Unit", waLabelGuests: "Guests" },
    fr: { waSub: "Réserver sur WhatsApp", name: "NOM COMPLET", unit: "UNITÉ", checkin: "ARRIVÉE", checkout: "DÉPART", guests: "INVITÉS", msg: "MESSAGE (OPTIONNEL)", submit: "Envoyer sur WhatsApp", waMsg: "Bonjour ! Je souhaite obtenir des informations pour un séjour à Villa Angela.", waLabelName: "Nom", waLabelUnit: "Unité", waLabelGuests: "Invités" },
    es: { waSub: "Reserva en WhatsApp", name: "NOMBRE COMPLETO", unit: "ALOJAMIENTO", checkin: "LLEGADA", checkout: "SALIDA", guests: "HUÉSPEDES", msg: "MENSAJE (OPCIONAL)", submit: "Enviar por WhatsApp", waMsg: "¡Hola! Me gustaría obtener información para una estancia en Villa Angela.", waLabelName: "Nombre", waLabelUnit: "Alojamiento", waLabelGuests: "Huéspedes" },
    de: { waSub: "Buchen über WhatsApp", name: "VOLLSTÄNDIGER NAME", unit: "UNTERKUNFT", checkin: "ANREISE", checkout: "ABREISE", guests: "GÄSTE", msg: "NACHRICHT (OPTIONAL)", submit: "Auf WhatsApp senden", waMsg: "Hallo! Ich hätte gerne Informationen für einen Aufenthalt in der Villa Angela.", waLabelName: "Name", waLabelUnit: "Unterkunft", waLabelGuests: "Gäste" },
    pl: { waSub: "Rezerwuj przez WhatsApp", name: "IMIĘ I NAZWISKO", unit: "OBIEKT", checkin: "ZAMELDOWANIE", checkout: "WYMELDOWANIE", guests: "GOŚCIE", msg: "WIADOMOŚĆ (OPCJONALNIE)", submit: "Wyślij na WhatsApp", waMsg: "Cześć! Chciałbym uzyskać informacje na temat pobytu w Villa Angela.", waLabelName: "Imię i nazwisko", waLabelUnit: "Obiekt", waLabelGuests: "Goście" },
    zh: { waSub: "通过 WhatsApp 预订", name: "姓名", unit: "住宿单元", checkin: "入住日期", checkout: "离店日期", guests: "人数", msg: "留言 (可选)", submit: "通过 WhatsApp 发送", waMsg: "你好！我想咨询一下安杰拉别墅的入住信息。", waLabelName: "姓名", waLabelUnit: "住宿单元", waLabelGuests: "人数" },
    ar: { waSub: "احجز عبر واتساب", name: "الاسم الكامل", unit: "الوحدة", checkin: "تاريخ الوصول", checkout: "تاريخ المغادرة", guests: "الضيوف", msg: "رسالة (اختياري)", submit: "إرسال عبر واتساب", waMsg: "مرحباً! أود الحصول على معلومات للإقامة في فيلا أنجيلا.", waLabelName: "الاسم", waLabelUnit: "الوحدة", waLabelGuests: "الضيوف" },
    da: { waSub: "Book på WhatsApp", name: "FULDE NAVN", unit: "ENHED", checkin: "INDTJEKNING", checkout: "UDTJEKNING", guests: "GÆSTER", msg: "BESKED (VALGFRI)", submit: "Send på WhatsApp", waMsg: "Hej! Jeg vil gerne have information om et ophold på Villa Angela.", waLabelName: "Navn", waLabelUnit: "Enhed", waLabelGuests: "Gæster" },
    sv: { waSub: "Boka på WhatsApp", name: "FULLSTÄNDIGT NAMN", unit: "ENHET", checkin: "INCHECKNING", checkout: "UTCHECKNING", guests: "GÄSTER", msg: "MEDDELANDE (VALFRITT)", submit: "Skicka på WhatsApp", waMsg: "Hej! Jag skulle vilja ha information om en vistelse på Villa Angela.", waLabelName: "Namn", waLabelUnit: "Enhet", waLabelGuests: "Gäster" }
  };
  const tf = tForm[lang] || tForm.en;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: fd.get('name') as string,
      unit: fd.get('unit') as string,
      checkin: fd.get('checkin') as string,
      checkout: fd.get('checkout') as string,
      guests: fd.get('guests') as string,
      message: fd.get('message') as string
    };

    let text = tf.waMsg;
    text += `👤 *${tf.waLabelName}:* ${data.name}`;
    text += `🏨 *${tf.waLabelUnit}:* ${data.unit}`;
    if (data.checkin) text += `📅 *${tf.checkin}:* ${data.checkin}`;
    if (data.checkout) text += `📅 *${tf.checkout}:* ${data.checkout}`;
    if (data.guests) text += `👥 *${tf.waLabelGuests}:* ${data.guests}`;
    
    if (data.message && data.message.trim() !== '') {
      text += `💬 *Message:*${data.message}`;
    }

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/393501250165?text=${encodedText}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-[60px] h-[60px] bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <X size={28} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] bg-[#171717] rounded-[1.25rem] shadow-2xl flex flex-col overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="bg-[#075E54] text-white p-4 flex justify-between items-center relative">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16" className="text-[#25D366]">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                <div>
                  <h3 className="font-serif text-[17px] tracking-widest uppercase font-normal text-white/95 leading-tight">Villa Angela</h3>
                  <p className="text-[11px] font-medium text-white/80 mt-0.5">{tf.waSub}</p>
                </div>
              </div>
            </div>
            
            {/* Form Area */}
            <form onSubmit={handleSubmit} className="px-5 py-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 tracking-wider">{tf.name}</label>
                <input 
                  name="name" type="text" placeholder="..." required
                  className="bg-[#171717] border border-[#3b2b1f] rounded-lg px-3 py-2 text-[13px] text-white/90 outline-none focus:border-[#25D366] transition-colors placeholder:text-white/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 tracking-wider">{tf.unit}</label>
                <select 
                  name="unit"
                  className="bg-[#171717] border border-[#3b2b1f] rounded-lg px-3 py-2 text-[13px] text-white/90 outline-none focus:border-[#25D366] transition-colors"
                >
                  <option>Holiday Apartment ★★★★</option>
                  <option>Luxury House ★★★★★</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-white/50 tracking-wider">{tf.checkin}</label>
                  <input 
                    name="checkin" type="date" required 
                    min={today}
                    onChange={(e) => { if (e.target.value && e.target.value < today) e.target.value = today; }}
                    className="bg-[#171717] border border-[#3b2b1f] rounded-lg px-3 py-2 text-[13px] text-white/90 outline-none focus:border-[#25D366] transition-colors [&::-webkit-calendar-picker-indicator]:invert-[0.6]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-white/50 tracking-wider">{tf.checkout}</label>
                  <input 
                    name="checkout" type="date" required 
                    min={today}
                    onChange={(e) => { if (e.target.value && e.target.value < today) e.target.value = today; }}
                    className="bg-[#171717] border border-[#3b2b1f] rounded-lg px-3 py-2 text-[13px] text-white/90 outline-none focus:border-[#25D366] transition-colors [&::-webkit-calendar-picker-indicator]:invert-[0.6]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 tracking-wider">{tf.guests}</label>
                <select 
                  name="guests"
                  className="bg-[#171717] border border-[#3b2b1f] rounded-lg px-3 py-2 text-[13px] text-white/90 outline-none focus:border-[#25D366] transition-colors"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 tracking-wider">{tf.msg}</label>
                <textarea 
                  name="message" rows={2} placeholder="..."
                  className="bg-[#171717] border border-[#3b2b1f] rounded-lg px-3 py-2 text-[13px] text-white/90 outline-none focus:border-[#25D366] transition-colors placeholder:text-white/20 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="mt-3 w-full flex items-center justify-center gap-2 border border-[#3b2b1f] bg-[#171717] text-white/90 font-bold text-[13px] py-2.5 rounded-[0.5rem] hover:bg-[#171717] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                {tf.submit}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface Review {
  name: string;
  platform: string;
  metadata: string;
  stars: number;
  date: string;
  quote: string;
}

export default function App() {
  const supportedLangs: Language[] = ['en', 'it', 'fr', 'es', 'de', 'pl', 'zh', 'ar', 'da', 'sv'];
  const [lang, setLang] = useState<Language>(() => {
    const browserLang = navigator.language.split('-')[0] as Language;
    return supportedLangs.includes(browserLang) ? browserLang : 'en';
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache] = useState<Record<string, Review[]>>({});
  const [selectedUnit, setSelectedUnit] = useState<'apartment' | 'luxury' | null>(null);
  const [hoveredUnit, setHoveredUnit] = useState<'apartment' | 'luxury' | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showAdmin, setShowAdmin] = useState(() => {
    return localStorage.getItem('villa_angela_admin_open') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('villa_angela_admin_open', showAdmin.toString());
  }, [showAdmin]);
  const [showLogin, setShowLogin] = useState(false);
  const [bookingDates, setBookingDates] = useState({ checkin: '', checkout: '' });
  
  const today = new Date().toISOString().split('T')[0];
  const content = translations[lang] || translations['en'];
  
  const { containerRef: galleryContainerRef, innerRef: galleryInnerRef } = useHorizontalMarquee(1.5);
  const { containerRef: locationContainerRef, innerRef: locationInnerRef } = useHorizontalMarquee(1.5);

  const trackCookieConsent = async (accepted: boolean) => {
    try {
      await supabase.rpc('increment_cookie_stats', { 
        stat_type: accepted ? 'accepted' : 'rejected' 
      });
    } catch (error) {
      console.error('Error tracking cookie consent globally:', error);
    }
  };

  const triggerComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3500);
  };
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const handleNextImage = (e?: any) => {
    e?.stopPropagation();
    if (!enlargedImage) return;
    const currentIndex = apartmentGalleryImages.indexOf(enlargedImage);
    const nextIndex = (currentIndex + 1) % apartmentGalleryImages.length;
    setEnlargedImage(apartmentGalleryImages[nextIndex]);
  };

  const handlePrevImage = (e?: any) => {
    e?.stopPropagation();
    if (!enlargedImage) return;
    const currentIndex = apartmentGalleryImages.indexOf(enlargedImage);
    const prevIndex = (currentIndex - 1 + apartmentGalleryImages.length) % apartmentGalleryImages.length;
    setEnlargedImage(apartmentGalleryImages[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!enlargedImage) return;
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'Escape') setEnlargedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enlargedImage]);
  const [loadedReviews, setLoadedReviews] = useState<Review[]>([]);
  useEffect(() => {
    const translateContent = async (data: Review[], targetLang: Language) => {
      if (targetLang === 'it') return data;
      const cacheKey = `${targetLang}-${JSON.stringify(data.map(r => r.name))}`;
      if (translationCache[cacheKey]) return translationCache[cacheKey];

      setIsTranslating(true);
      try {
        // Prepare texts for batch translation
        const textsToTranslate = data.flatMap(r => [r.metadata || '', r.date || '', r.quote || '']);
        const joinedText = textsToTranslate.join(' [SEP] ');
        
        // sl=auto permits translating reviews written in any language
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(joinedText)}`;
        const res = await fetch(url);
        const json = await res.json();
        
        // Extract translated chunks
        const fullTranslation = json[0].map((item: any) => item[0]).join('');
        const translatedParts = fullTranslation.split(' [SEP] ').map((s: string) => s.trim());

        const translatedReviews = data.map((r, i) => ({
          ...r,
          metadata: translatedParts[i * 3] || r.metadata,
          date: translatedParts[i * 3 + 1] || r.date,
          quote: translatedParts[i * 3 + 2] || r.quote
        }));

        translationCache[cacheKey] = translatedReviews;
        return translatedReviews;
      } catch (error) {
        console.error('Translation error:', error);
        return data; // Fallback
      } finally {
        setIsTranslating(false);
      }
    };

    const processReviews = async (baseData: Review[]) => {
      let allReviews = [...baseData];
      
      try {
        // Fetch custom reviews from Supabase
        const { data: supabaseReviews, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (supabaseReviews) {
          const formatted = supabaseReviews.map((r: any) => ({
            id: r.id,
            name: r.name,
            platform: r.platform,
            date: r.date,
            stars: r.stars,
            quote: r.quote,
            metadata: r.platform
          }));
          allReviews = [...formatted, ...baseData];
        }
      } catch (e) {
        console.error('Error fetching Supabase reviews:', e);
      }

      // Translate EVERYTHING together
      const translated = await translateContent(allReviews, lang);
      setLoadedReviews(translated);
    };

    const fetchBaseReviews = () => {
      fetch(`/api/reviews?lang=${lang}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            processReviews(data);
          } else {
            fetch('/reviews.json')
              .then(res => res.json())
              .then(data => processReviews(data));
          }
        })
        .catch(err => {
          console.error('Failed to load reviews from API:', err);
          fetch('/reviews.json')
            .then(res => res.json())
            .then(data => processReviews(data));
        });
    };

    fetchBaseReviews();

    // Subscribe to Realtime changes for 'reviews' table
    const reviewsChannel = supabase
      .channel('public:reviews')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, () => {
        // Refetch whenever a change occurs to ensure perfect sync with static reviews
        fetchBaseReviews();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(reviewsChannel);
    };
  }, [lang, showAdmin]);
  
  useEffect(() => {
    // Check for cookie consent
    const consent = localStorage.getItem('villa_angela_cookie_consent');
    if (!consent) {
      setTimeout(() => setShowCookieBanner(true), 2000);
    }
  }, []);

  const apartmentGalleryImages = [
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/676096734.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/676096753.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911497.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911498.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911499.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911505.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911506.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911508.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911510.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911512.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911515.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911517.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911519.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911526.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911527.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911533.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911536.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911537.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334699.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334700.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334701.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334702.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334703.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334704.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334705.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334706.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334707.jpg",
    "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334708.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334710.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334711.jpg"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-transparent text-[#5C4A3A] selection:bg-[#a67c52] selection:text-white overflow-x-hidden">
      <div className="bg-[linear-gradient(135deg,#C8B89A_0%,#E8DDD0_40%,#F5F0E8_70%,#D4C5B0_100%)]">
      {/* Styles moved to index.css to prevent scroll blocking on state updates */}
      <Nav lang={lang} setLang={setLang} />
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        
        {/* Gallery Background (shown on hover for apartment) */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${hoveredUnit === 'apartment' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <BackgroundGallery isActive={hoveredUnit === 'apartment'} />
        </div>

        {/* Coming Soon Background (shown on hover for luxury) */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 bg-[#3b2b1f]/95 flex items-center justify-center overflow-hidden ${hoveredUnit === 'luxury' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <span className="text-[12vw] font-serif uppercase tracking-widest text-[#a67c52] whitespace-nowrap select-none animate-pulse">COMING SOON</span>
          </div>
        </div>
        
        {/* Local background video (hidden on hover) */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${hoveredUnit ? 'opacity-0' : 'opacity-100'}`}>
          <video 
            autoPlay muted loop playsInline preload="auto"
            className="hero-video absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none" 
          >
            <source src="https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Pellicola opaca (Overlay) */}
        <div className="absolute inset-0 hero-overlay z-10 pointer-events-none transition-colors duration-1000"></div>
        
        {/* Top fade — for smooth transition to status bar */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none z-30" style={{ height: '140px', background: 'linear-gradient(to top, transparent 0%, rgba(30,50,60,0.3) 40%, rgba(30,50,60,0.8) 85%, #1E323C 100%)' }}></div>
        
        {/* Bottom fade — inside the hero, within overflow-hidden */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-30" style={{ height: '280px', background: 'linear-gradient(to bottom, transparent 0%, rgba(200,184,154,0.25) 30%, rgba(216,200,178,0.55) 55%, rgba(232,221,208,0.82) 75%, #E8DDD0 100%)' }}></div>
        
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full gap-8 md:gap-20 pt-8 md:pt-16">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 w-full max-w-6xl px-4">
            <div 
              onClick={() => setSelectedUnit('apartment')}
              onMouseEnter={() => setHoveredUnit('apartment')}
              onMouseLeave={() => setHoveredUnit(null)}
              className="logo-card relative w-[70vw] md:w-[40vw] max-w-[500px] aspect-[4/3] cursor-pointer flex items-center justify-center"
            >
              <div className="w-full h-full rounded-xl md:rounded-[1.25rem] overflow-hidden bg-white ring-2 ring-white">
                <img src="https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/holiday-fixed.png" alt="Villa Angela Holiday Apartment" className="w-[102%] h-[102%] max-w-none object-cover scale-[1.03]" />
              </div>
            </div>
            
            <div 
              onClick={triggerComingSoon}
              onMouseEnter={() => setHoveredUnit('luxury')}
              onMouseLeave={() => setHoveredUnit(null)}
              className="logo-card relative w-[70vw] md:w-[40vw] max-w-[500px] aspect-[4/3] cursor-pointer flex items-center justify-center"
            >
              <div className="w-full h-full rounded-xl md:rounded-[1.25rem] overflow-hidden bg-white ring-2 ring-white">
                <img src="https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/luxury-fixed.jpg" alt="Villa Angela Luxury House" className="w-[102%] h-[102%] max-w-none object-cover scale-[1.03]" />
              </div>
              {/* Coming Soon badge on hero luxury card */}
              <div className="absolute top-3 right-3 z-30 animate-badge-pulse">
                <span className="bg-[#a67c52] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
          
          <p className="font-serif tagline">
            {content.hero.tagline}
          </p>
        </div>
        
        <div 
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 z-[35] cursor-pointer"
          style={{ animation: 'gentleBounce 1.8s ease-in-out infinite' }}
        >
          <ChevronRight size={44} strokeWidth={2.5} className="rotate-90" style={{ color: '#FFFFFF', fontSize: '2.8rem', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.45))' }} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-12 md:py-24 px-4 md:px-12 flex flex-col items-center text-center bg-transparent">
        {/* Top bridge: matches hero gradient end color and fades into the page background */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '150px', background: 'linear-gradient(to bottom, #E8DDD0 0%, rgba(232,221,208,0.6) 50%, transparent 100%)' }}></div>
        <div className="max-w-4xl fade-in bg-white/30 backdrop-blur-[12px] border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-6 md:p-16 rounded-[2.5rem]">
          <h2 className="font-serif text-[2.8rem] md:text-[3.5rem] font-medium text-[#3D2B1F] tracking-wide mb-8">{content.about.title}</h2>
          <div className="w-24 h-px bg-[#a67c52] mx-auto mb-10"></div>
          <p className="text-[1.05rem] md:text-[1.15rem] leading-[2] md:leading-[2.2] text-[#3D2B1F] font-medium max-w-2xl mx-auto">
            {content.about.text}
          </p>
        </div>
      </section>

      {/* The Two Units Section */}
      <section id="units" className="py-12 md:py-24 px-4 md:px-12 bg-transparent">
        <h2 className="font-serif text-[2.8rem] md:text-[3.5rem] font-medium text-[#3D2B1F] tracking-wide mb-16 text-center fade-in">{content.units.title}</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Apartment Card */}
          <div className="unit-card bg-white/85 backdrop-blur-[2px] border border-white/20 text-[#3D2B1F] p-6 md:p-12 rounded-3xl flex flex-col items-center text-center fade-in shadow-[0_8px_32px_rgba(100,70,40,0.08)]">
            <img src="https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/holiday-fixed.png" alt="Villa Angela Holiday Apartment Logo" className="h-40 mb-8 rounded-xl object-contain shadow-md" />
            <h3 className="font-serif text-[1.8rem] md:text-[2.2rem] font-medium text-[#3D2B1F] mb-4">{content.units.apartment.name}</h3>
            <p className="text-[#5C4A3A] mb-8 flex-1 font-medium leading-[1.7] text-[0.95rem]">{content.units.apartment.desc}</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {content.units.apartment.features.map(f => (
                <span key={f} className="text-[10px] uppercase tracking-widest border border-[#a67c52]/50 px-3 py-1 rounded-full text-[#a67c52] font-bold">
                  {f}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-6 mb-10 text-[#5C4A3A]/70">
              <Wifi size={24} />
              <Utensils size={24} />
              <Wind size={24} />
              <Tv size={24} />
            </div>
            <button onClick={() => setSelectedUnit('apartment')} className="bg-[#a67c52] text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-[#3D2B1F] transition-colors shadow-md">
              {content.units.viewDetails}
            </button>
          </div>

          {/* Luxury Card */}
          <div className="unit-card bg-white/85 backdrop-blur-[2px] border border-white/20 text-[#3D2B1F] p-6 md:p-12 rounded-3xl flex flex-col items-center text-center fade-in shadow-[0_8px_32px_rgba(100,70,40,0.08)] relative overflow-hidden">
            {/* Coming Soon banner */}
            <div className="absolute top-5 right-5 z-10 animate-badge-pulse">
              <span className="bg-[#a67c52] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
                Coming Soon
              </span>
            </div>
            <img src="https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/luxury-fixed.jpg" alt="Villa Angela Luxury House Logo" className="h-40 mb-8 rounded-xl object-contain shadow-md opacity-90" />
            <h3 className="font-serif text-[1.8rem] md:text-[2.2rem] font-medium text-[#3D2B1F] mb-4">{content.units.luxury.name}</h3>
            <p className="text-[#5C4A3A] mb-8 flex-1 font-medium leading-[1.7] text-[0.95rem]">{content.units.luxury.desc}</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {content.units.luxury.features.map(f => (
                <span key={f} className="text-[10px] uppercase tracking-widest border border-[#a67c52]/50 px-3 py-1 rounded-full text-[#a67c52] font-bold">
                  {f}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-6 mb-10 text-[#5C4A3A]/70">
              <Waves size={24} />
              <Wind size={24} />
              <Coffee size={24} />
              <Sun size={24} />
            </div>
            <button onClick={triggerComingSoon} className="opacity-90 bg-white/20 text-white border border-white/30 px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold flex items-center gap-2 hover:bg-white/30 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a67c52] animate-pulse inline-block"></span>
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-12 md:py-24 px-0 bg-transparent overflow-hidden fade-in">
        <h2 className="text-center font-serif text-[2.8rem] md:text-[3.5rem] font-medium text-[#3D2B1F] tracking-wide mb-10">
          {content.gallery}
        </h2>
        
        <div ref={galleryContainerRef} className="w-full overflow-hidden relative pb-8 cursor-grab active:cursor-grabbing select-none">
          <div ref={galleryInnerRef} className="flex w-max will-change-transform">
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-4 pr-4">
                {[
                  "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/676096734.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/676096753.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911497.jpg",
                  "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911498.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911499.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911505.jpg",
                  "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911506.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911508.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911510.jpg",
                  "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911512.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911515.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911517.jpg",
                  "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911519.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911526.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911527.jpg",
                  "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911533.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911536.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/683911537.jpg",
                  "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334699.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334700.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334701.jpg",
                  "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334702.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334703.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334704.jpg",
                  "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334705.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334706.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334707.jpg",
                  "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334708.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334710.jpg", "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/722334711.jpg"
                ].reduce((acc: any[], img: string, i: number) => {
                  if (i % 6 === 0) acc.push(apartmentGalleryImages.slice(i, i + 6));
                  return acc;
                }, []).map((chunk, idx) => {
                  return (
                    <div key={`${set}-${idx}`} className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-4 w-[90vw] md:w-[75vw] lg:w-[60vw] h-[400px] md:h-[500px] lg:h-[600px] flex-none">
                      {idx % 2 === 0 ? (
                        <>
                          {chunk[0] && <div className="col-span-2 row-span-2"><img src={chunk[0]} className="w-full h-full object-cover rounded-3xl cursor-pointer hover:opacity-90 hover:scale-[1.01] transition-all duration-500 shadow-lg" onClick={() => setEnlargedImage(chunk[0])} alt="Gallery" /></div>}
                          <div className="col-span-2 grid grid-cols-2 gap-3 md:gap-4">
                            {chunk[1] && <div className="col-span-1 row-span-1"><img src={chunk[1]} className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all shadow-md" onClick={() => setEnlargedImage(chunk[1])} alt="Gallery" /></div>}
                            {chunk[2] && <div className="col-span-1 row-span-1"><img src={chunk[2]} className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all shadow-md" onClick={() => setEnlargedImage(chunk[2])} alt="Gallery" /></div>}
                          </div>
                          <div className="col-span-2 grid grid-cols-3 gap-3 md:gap-4">
                            {chunk[3] && <div className="col-span-2 row-span-1"><img src={chunk[3]} className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all shadow-md" onClick={() => setEnlargedImage(chunk[3])} alt="Gallery" /></div>}
                            {chunk[4] && <div className="col-span-1 row-span-1"><img src={chunk[4]} className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all shadow-md" onClick={() => setEnlargedImage(chunk[4])} alt="Gallery" /></div>}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-span-1 row-span-2 grid grid-rows-2 gap-3 md:gap-4">
                            {chunk[0] && <div className="row-span-1"><img src={chunk[0]} className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all shadow-md" onClick={() => setEnlargedImage(chunk[0])} alt="Gallery" /></div>}
                            {chunk[1] && <div className="row-span-1"><img src={chunk[1]} className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all shadow-md" onClick={() => setEnlargedImage(chunk[1])} alt="Gallery" /></div>}
                          </div>
                          {chunk[2] && <div className="col-span-2 row-span-2"><img src={chunk[2]} className="w-full h-full object-cover rounded-3xl cursor-pointer hover:opacity-90 hover:scale-[1.01] transition-all duration-500 shadow-lg" onClick={() => setEnlargedImage(chunk[2])} alt="Gallery" /></div>}
                          <div className="col-span-1 row-span-2 grid grid-rows-3 gap-3 md:gap-4">
                            {chunk[3] && <div className="row-span-1"><img src={chunk[3]} className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all shadow-md" onClick={() => setEnlargedImage(chunk[3])} alt="Gallery" /></div>}
                            {chunk[4] && <div className="row-span-2"><img src={chunk[4]} className="w-full h-full object-cover rounded-2xl cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all shadow-md" onClick={() => setEnlargedImage(chunk[4])} alt="Gallery" /></div>}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-transparent" id="servizi-section">
        <h2 className="text-center font-serif text-[2.8rem] md:text-[3.5rem] font-medium text-[#3D2B1F] tracking-wide mb-10 fade-in">
          {content.amenities.title}
        </h2>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch px-4 md:px-0">
          {content.amenities.items.map((item, idx) => (
            <AmenityCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-12 md:py-24 px-4 md:px-12 bg-transparent">
        <div className="max-w-4xl mx-auto text-center fade-in bg-white/30 backdrop-blur-[12px] border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-6 md:p-16 rounded-[2.5rem]">
          <h2 className="font-serif text-[2.8rem] md:text-[3.5rem] font-medium text-[#3D2B1F] tracking-wide mb-10">{content.location.title}</h2>
          <div className="w-16 h-px bg-[#a67c52] mx-auto mb-10"></div>
          <p className="text-lg text-[#3D2B1F] mb-8 font-medium leading-relaxed">{content.location.desc}</p>
          <div className="flex justify-center text-[#a67c52] mb-10">
            <MapPin size={48} />
          </div>
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-white/20">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.861750692!2d14.5658838!3d40.7534651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133bb9ec2c0da89b%3A0x927f88d5c66c3423!2sVILLA%20ANGELA%20holiday%20apartment!5e0!3m2!1sit!2sit!4v1711467400000!5m2!1sit!2sit" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* Surroundings Horizontal Gallery */}
      <section className="py-20 px-0 bg-transparent overflow-hidden fade-in">
        <h2 className="text-center font-serif text-[2.8rem] md:text-[3.5rem] font-medium text-[#3D2B1F] tracking-wide mb-10">{content.location.galleryTitle}</h2>
        
        <div ref={locationContainerRef} className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing select-none">
          <div ref={locationInnerRef} className="flex w-max will-change-transform">
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-4 pr-4">
                {[
                  { name: "Pompei", img: "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/pompei.jpg" },
                  { name: "Amalfi", img: "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/amalfi.jpg" },
                  { name: "Positano", img: "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/positano.jpg" },
                  { name: "Sorrento", img: "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/sorrento.jpg" },
                  { name: "Maiori", img: "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/maiori.jpg" },
                  { name: "Minori", img: "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/minori.jpg" },
                  { name: "Salerno", img: "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/salerno.jpg" },
                  { name: "Vietri sul mare", img: "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/Vietri%20sul%20mare.jpg" },
                  { name: "Napoli", img: "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/napoli.jpg" }
                ].map((place) => (
                  <div key={`${set}-${place.name}`} className="relative flex-none w-64 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden group shadow-lg cursor-pointer">
                    <img 
                      src={place.img} 
                      alt={place.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-bottom p-6 overflow-hidden">
                      <h3 className="text-white text-4xl mt-auto font-transcity">{place.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="relative py-12 md:py-24 px-4 md:px-12 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto text-center fade-in">
          <h2 className="text-center font-serif text-[2.8rem] md:text-[3.5rem] font-medium text-[#3D2B1F] tracking-wide mb-12">{content.reviews.title}</h2>
          
          <div className="relative group">
            {/* Frosted Glass Background covering the entire area */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-xl rounded-[3.5rem] border border-white/20 shadow-xl z-0"></div>

            <div className="relative z-10">
              {/* Navigation Left - Hidden on Mobile */}
              <button 
                onClick={() => {
                  const container = document.getElementById('reviews-container');
                  if (container) {
                    const width = container.offsetWidth;
                    container.scrollBy({ left: -width, behavior: 'smooth' });
                  }
                }}
                className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 text-[#3b2b1f] hover:bg-[#a67c52] hover:text-white transition-all shadow-lg items-center justify-center font-bold z-20"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Scrollable Container - Vertical List on Mobile, Carousell on Desktop */}
              <div 
                id="reviews-container"
                className="flex flex-col md:flex-row gap-6 md:gap-8 overflow-y-visible md:overflow-x-auto md:snap-x md:snap-mandatory scrollbar-hide py-12 px-4 md:px-1 transition-opacity duration-300"
                style={{ opacity: isTranslating ? 0.5 : 1 }}
              >
                {loadedReviews.map((review, i) => (
                  <div 
                    key={i} 
                    className="flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.34px)]"
                  >
                    <div className="h-full flex flex-col gap-6 p-6 md:p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-[40px] border border-white/10 shadow-lg transition-all duration-500 hover:bg-white/50">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-[#3b2b1f]/80 shrink-0 overflow-hidden ring-1 ring-white/40 shadow-inner">
                          {'platform' in review && review.platform === 'airbnb' ? (
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#FF5A5F] fill-current"><path d="M16 1.98C7.67 1.98 1 8.31 1 16.5s6.67 14.52 15 14.52 15-6.31 15-14.52S24.33 1.98 16 1.98zm0 28.58c-7.75 0-14.08-6.14-14.08-13.84 0-7.7 6.33-14.06 14.08-14.06s14.08 6.36 14.08 14.06-6.33 13.84-14.08 13.84zm7.25-15.65h-4.47l4.31-7.24a.68.68 0 0 0-.08-.82.69.69 0 0 0-.91-.12l-6.8 4.63-1.63-2.67a6.9 6.9 0 0 0-5.83-3.26c-3.13 0-5.96 1.83-7.23 4.68-.07.16-.03.35.1.48s.33.16.5.09c1.1-0.49 2.3-0.74 3.52-0.74 2.87 0 5.48 1.55 6.7 4.02l2.36 3.84-4.22 7.08a.68.68 0 0 0 .1.82.69.69 0 0 0 .9-.1l6.73-4.66 1.63 2.67a6.9 6.9 0 0 0-5.83 3.26 6.93 6.93 0 0 0 5.86-3.29c.1-.15.06-.35-.08-.47-.14-.13-.34-.14-.49-.03a5.55 5.55 0 0 1-4.7 1.63 5.48 5.48 0 0 1-4.63-2.61l-2.43-3.95 4.34-7.29zm-10.02 5.84a1.86 1.86 0 1 1 0-3.72 1.86 1.86 0 0 1 0 3.72zm4.1-1.3l-2.02 3.4-3.1-2.1a3.25 3.25 0 1 0 2.9-4.82l2.22 3.52z"></path></svg>
                          ) : 'platform' in review && review.platform === 'booking' ? (
                            <span className="font-bold text-[#003580] text-2xl px-1">B.</span>
                          ) : (
                            <User size={28} className="text-[#3b2b1f]/40" />
                          )}
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-[1.1rem] text-[#3D2B1F]">{review.name}</h4>
                          <p className="text-sm text-[#9A8070] text-[0.85rem] font-medium">{review.metadata}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#3D2B1F]">
                        <div className="flex gap-0.5 text-[#FF5A5F]">
                          {[...Array(review.stars)].map((_, s) => <Star key={s} size={14} fill="currentColor" stroke="none" />)}
                        </div>
                        <span className="ml-1 opacity-40">·</span>
                        <span className="opacity-90">{review.date}</span>
                      </div>
                      <p className="text-[#3D2B1F] leading-relaxed text-[15px] text-left italic font-medium">
                        "{review.quote}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Right - Hidden on Mobile */}
              <button 
                onClick={() => {
                  const container = document.getElementById('reviews-container');
                  if (container) {
                    const width = container.offsetWidth;
                    container.scrollBy({ left: width, behavior: 'smooth' });
                  }
                }}
                className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 text-[#3b2b1f] hover:bg-[#a67c52] hover:text-white transition-all shadow-lg items-center justify-center group z-20"
              >
                <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            
            {/* Mobile indicator dots - Hidden */}
            <div className="hidden">
              {loadedReviews.slice(0, 5).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#3b2b1f]/20"></div>
              ))}
            </div>
          </div>

          {isTranslating && (
            <div className="flex items-center justify-center gap-2 mt-8 text-[#9A8070] italic animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>
                {lang === 'en' ? 'Translation in progress...' : 
                 lang === 'fr' ? 'Traduction en cours...' :
                 lang === 'es' ? 'Traducción en curso...' :
                 lang === 'de' ? 'Übersetzung läuft...' :
                 lang === 'pl' ? 'Tłumaczenie w toku...' :
                 lang === 'zh' ? '正在翻译...' :
                 lang === 'ar' ? 'جاري الترجمة...' :
                 lang === 'da' ? 'Oversættelse i gang...' :
                 lang === 'sv' ? 'Översättning pågår...' :
                 'Traduzione in corso...'}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Booking Platforms Section */}
      <section id="booking" className="py-20 px-6 md:px-12 bg-transparent">
        <div className="max-w-5xl mx-auto text-center fade-in">
          <h2 className="font-serif text-[2.8rem] md:text-[3.5rem] font-medium text-[#3D2B1F] tracking-wide mb-10">
            {content.legal.bookingPlatforms.title}
          </h2>
          <p className="text-[#5C4A3A] font-medium mb-16 text-lg">
            {content.legal.bookingPlatforms.subtitle}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
            {[
              {
                name: 'Airbnb',
                logo: 'https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/airbnb-logo.png',
                color: '#FF5A5F',
                url: 'https://www.airbnb.it/rooms/1409282031863396948?adults=3&check_in=2026-04-13&check_out=2026-04-20&search_mode=regular_search&source_impression_id=p3_1774436822_P3vo99Wn-EUzQs90&previous_page_section_name=1000&federated_search_id=08a1bc04-c55b-46a1-a785-871dc25a2476',
                badge: '★ 5.0 · Guest Favourite',
                textLogo: null
              },
              {
                name: 'Booking.com',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Booking.com_logo.svg',
                color: '#003580',
                url: 'https://www.booking.com/hotel/it/amazing-apartment-in-angri.it.html?aid=866831&app_hotel_id=14025234&checkin=2025-05-18&checkout=2025-05-25&from_sn=ios&group_adults=2&group_children=0&label=Share-s5ewYy%401747414014-MUD5hUI%401747419654&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA%2C',
                badge: '⭐ 9.7 / 10',
                textLogo: null
              },
              {
                name: 'HomeToGo',
                logo: 'https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/hometogo-logo.png',
                color: '#009B8C',
                url: 'https://www.hometogo.it/rental/a7c2258e5b60041a73a7fbae9befdf78',
                badge: content.legal.bookingPlatforms.availableNow,
                textLogo: null
              },
              {
                name: 'VRBO',
                logo: 'https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/vrbo-logo.png',
                logoScale: 'scale-[2.0]',
                color: '#3A5CAB',
                url: 'https://www.vrbo.com/5615436ha',
                badge: content.legal.bookingPlatforms.directListing,
                textLogo: null
              },
              {
                name: 'Expedia',
                logo: 'https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/expedia-logo.png',
                color: '#FEC022',
                url: 'https://www.expedia.it/Angri-Hotel-Villa-Angela-Holiday-Apartment.h115349584.Informazioni-Hotel',
                badge: content.legal.bookingPlatforms.directListing,
                textLogo: null
              },
              {
                name: 'Agoda',
                logo: 'https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/agoda-logo.png',
                logoScale: 'scale-[1.4]',
                color: '#5373BB',
                url: 'https://www.agoda.com/it-it/villa-angela-holiday-apartment/hotel/all/angri-it.html',
                badge: content.legal.bookingPlatforms.directListing,
                textLogo: null
              }
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ '--platform-color': platform.color } as any}
                className="group bg-white/30 backdrop-blur-[12px] border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-3xl p-6 flex flex-col items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 flex items-center justify-center w-full">
                  {platform.logo ? (
                    <div className={`flex items-center justify-center ${platform.logoScale || ''}`}>
                      <img 
                        src={platform.logo} 
                        alt={platform.name} 
                        className="max-h-9 max-w-[120px] object-contain group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                  ) : (
                    <span className={`${platform.textLogo!.style} group-hover:scale-105 transition-transform inline-block`} style={{ color: platform.textLogo!.color }}>
                      {platform.textLogo!.text}
                    </span>
                  )}
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-center"
                  style={{ backgroundColor: platform.color + '18', color: platform.color }}
                >
                  {platform.badge}
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#3D2B1F]/50 flex items-center gap-1 group-hover:text-[var(--platform-color)] transition-colors">
                  {content.legal.bookingPlatforms.viewListing} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}

      <section id="contact" className="relative py-12 md:py-24 px-4 md:px-12" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(196,168,130,0.08) 20%, rgba(196,168,130,0.25) 45%, rgba(196,168,130,0.50) 65%, rgba(196,168,130,0.78) 82%, #C4A882 100%)' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="fade-in">
            <h2 className="font-serif text-[2.8rem] md:text-[3.5rem] font-medium text-[#3D2B1F] tracking-wide mb-12">{content.contact.title}</h2>
            <p className="text-[#3D2B1F] font-medium mb-16 leading-relaxed text-[1.05rem] md:text-[1.1rem]">
              {content.contact.desc}
            </p>
            <div className="space-y-8">
              <div className="flex items-center gap-6 text-[#3D2B1F] font-medium text-[1.05rem]">
                <MapPin className="text-[#a67c52] flex-shrink-0" size={26} strokeWidth={1.5} />
                <span>Via Pontoni Seconda, 26, 84012 Angri (SA), Italia</span>
              </div>
              <div className="flex items-center gap-6 text-[#3D2B1F] font-medium text-[1.05rem]">
                <Phone className="text-[#a67c52] flex-shrink-0" size={26} strokeWidth={1.5} />
                <a href="tel:+393501250165" className="hover:text-[#a67c52] transition-colors line-clamp-1">+39 350 1250165</a>
              </div>
              <div className="flex items-center gap-6 text-[#3D2B1F] font-medium text-[1.05rem]">
                <Mail className="text-[#a67c52] flex-shrink-0" size={26} strokeWidth={1.5} />
                <a href="mailto:holidayvillaangela@gmail.com" className="hover:text-[#a67c52] transition-colors break-all">holidayvillaangela@gmail.com</a>
              </div>
            </div>
          </div>
          
          <form 
            className="bg-white/30 backdrop-blur-[12px] border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] p-6 md:p-12 rounded-[2.5rem] space-y-10 fade-in"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const data = {
                name: fd.get('name'),
                email: fd.get('email'),
                unit: fd.get('unit'),
                guests: fd.get('guests'),
                checkin: fd.get('checkin'),
                checkout: fd.get('checkout'),
                message: fd.get('message')
              };
              const subject = encodeURIComponent(`Nuova Richiesta Soggiorno: ${data.name} - ${data.unit}`);
              const body = encodeURIComponent(
                `Nome: ${data.name}\nEmail: ${data.email}\nCheck-in: ${data.checkin}\nCheck-out: ${data.checkout}\nOspiti: ${data.guests}\nArea: ${data.unit}\nMessaggio:\n${data.message}`
              );
              window.location.href = `mailto:holidayvillaangela@gmail.com?subject=${subject}&body=${body}`;
            }}
          >
            {/* Section 1: Personal Info */}
            <div className="space-y-6">
              <div className="border-b border-[#a67c52]/10 pb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a67c52] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a67c52]"></span>
                  {lang === 'it' ? 'Informazioni Personali' : 'Personal Information'}
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-[#3D2B1F]/60 px-1">{content.contact.name}</label>
                  <input name="name" type="text" required className="w-full bg-white/60 border border-[#6e4d31]/30 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-[#a67c52] focus:bg-white text-[#3D2B1F] font-medium transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-[#3D2B1F]/60 px-1">{content.contact.email}</label>
                  <input name="email" type="email" required className="w-full bg-white/60 border border-[#6e4d31]/30 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-[#a67c52] focus:bg-white text-[#3D2B1F] font-medium transition-all" />
                </div>
              </div>
            </div>

            {/* Section 2: Stay Details */}
            <div className="space-y-6">
              <div className="border-b border-[#a67c52]/10 pb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a67c52] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a67c52]"></span>
                  {lang === 'it' ? 'Dettagli del Soggiorno' : 'Stay Details'}
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 md:col-span-2 space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-[#3D2B1F]/60 px-1">{content.contact.unit}</label>
                  <select name="unit" className="w-full bg-white/60 border border-[#6e4d31]/30 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#a67c52] focus:bg-white text-[#3D2B1F] font-medium appearance-none">
                    <option>{content.units.apartment.name}</option>
                    <option>{content.units.luxury.name}</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-2 space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-[#3D2B1F]/60 px-1">{content.contact.guests}</label>
                  <select name="guests" className="w-full bg-white/60 border border-[#6e4d31]/30 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#a67c52] focus:bg-white text-[#3D2B1F] font-medium appearance-none">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-[#3D2B1F]/60 px-1">{content.contact.checkIn}</label>
                  <input 
                    name="checkin" type="date" required 
                    min={today}
                    value={bookingDates.checkin}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && val < today) return;
                      setBookingDates({ ...bookingDates, checkin: val, checkout: (val && bookingDates.checkout && val >= bookingDates.checkout) ? '' : bookingDates.checkout });
                    }}
                    className="w-full bg-white/60 border border-[#6e4d31]/30 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#a67c52] focus:bg-white text-[#3D2B1F] font-medium text-sm" 
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-[#3D2B1F]/60 px-1">{content.contact.checkOut}</label>
                  <input 
                    name="checkout" type="date" required 
                    min={bookingDates.checkin || today}
                    value={bookingDates.checkout}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val && val < today) return;
                      if (val && val === bookingDates.checkin) {
                        alert(content.legal.dateErrorSame);
                        return;
                      }
                      setBookingDates({ ...bookingDates, checkout: val });
                    }}
                    className="w-full bg-white/60 border border-[#6e4d31]/30 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#a67c52] focus:bg-white text-[#3D2B1F] font-medium text-sm" 
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Message */}
            <div className="space-y-6">
              <div className="border-b border-[#a67c52]/10 pb-3">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a67c52] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a67c52]"></span>
                  {lang === 'it' ? 'Messaggio' : 'Message'}
                </h3>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest font-bold text-[#3D2B1F]/60 px-1">{content.contact.message}</label>
                <textarea name="message" rows={4} className="w-full bg-white/60 border border-[#6e4d31]/30 rounded-2xl px-5 py-4 focus:outline-none focus:border-[#a67c52] focus:bg-white text-[#3D2B1F] font-medium resize-none transition-all placeholder:text-[#3D2B1F]/30" placeholder={lang === 'it' ? 'Scrivi qui la tua richiesta...' : 'Write your request here...'}></textarea>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#3b2b1f] text-white py-5 rounded-2xl uppercase tracking-[0.2em] text-[13px] font-bold hover:bg-[#a67c52] transition-all duration-300 shadow-xl active:scale-[0.98]">
              {content.contact.submit}
            </button>
          </form>
        </div>
      </section>
      </div>

      {/* Footer Section */}
      <footer className="text-[#e3d1ba] pt-16 px-6 md:px-12 text-center" style={{ background: 'linear-gradient(to bottom, #C4A882 0%, #9B7A52 35%, #7A5C38 65%, #5C3D1E 100%)', paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
        <h2 className="font-serif text-2xl mb-5 tracking-widest uppercase text-[#e3d1ba]">VILLA ANGELA</h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 mb-3 text-[13px] md:text-[15px] tracking-widest uppercase font-medium text-[#e3d1ba]/80">
          <p className="bg-transparent">{content.footer.cin}</p>
          <span className="hidden md:inline text-[#a67c52]">|</span>
          <p className="bg-transparent">{content.footer.location}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-8 text-[12px] md:text-[14px] tracking-widest font-medium text-[#e3d1ba]/60">
          <p className="uppercase bg-transparent">{content.footer.type}</p>
          <span className="hidden md:inline text-[#a67c52]">|</span>
          <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition-colors underline underline-offset-4 decoration-[#a67c52] uppercase bg-transparent">{content.footer.privacy}</button>
          <span className="hidden md:inline text-[#a67c52]">|</span>
          <button 
            onClick={() => {
              setShowLogin(true);
            }} 
            className="hover:text-white transition-colors underline underline-offset-4 decoration-[#a67c52] uppercase bg-transparent"
          >
            {content.footer.reserved}
          </button>
        </div>

        <div className="flex justify-center gap-8 mb-4">
          <a href="https://www.instagram.com/villaangela2025/" target="_blank" rel="noreferrer" className="hover:text-[#F5F0E8] hover:scale-110 transition-all duration-300">
            <Instagram size={22} strokeWidth={1.5} />
          </a>
          <a href="https://www.facebook.com/villaangelaholidayapartment/?locale=it_IT" target="_blank" rel="noreferrer" className="hover:text-[#F5F0E8] hover:scale-110 transition-all duration-300">
            <Facebook size={22} strokeWidth={1.5} />
          </a>
        </div>
      </footer>

      <Concierge lang={lang} today={today} />

      {/* Unit Details Modal */}
      <AnimatePresence>
        {selectedUnit && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          >
            <div className="sticky top-0 bg-white/80 backdrop-blur-md p-6 flex justify-between items-center z-10 border-b border-[#6e4d31]">
              <h2 className="text-3xl font-serif">
                {selectedUnit === 'apartment' ? content.units.apartment.name : content.units.luxury.name}
              </h2>
              <button 
                onClick={() => setSelectedUnit(null)} 
                className="bg-[#3b2b1f] text-white p-2 rounded-full hover:bg-[#a67c52] transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="max-w-7xl mx-auto p-6 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div>
                  <img 
                    src={selectedUnit === 'apartment' ? "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/676096734.jpg" : "https://lizeyrhkjhqhoeafonzi.supabase.co/storage/v1/object/public/videos/luxury-fixed.jpg"} 
                    className="w-full h-auto rounded-3xl object-cover shadow-2xl" 
                    alt="Unit preview"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xl leading-relaxed text-[#3D2B1F]/80 mb-8">
                    {selectedUnit === 'apartment' ? content.units.apartment.desc : content.units.luxury.desc}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {(selectedUnit === 'apartment' ? content.units.apartment.features : content.units.luxury.features).map(f => (
                      <span key={f} className="text-sm uppercase tracking-widest border border-[#a67c52]/50 px-4 py-2 rounded-full text-[#3D2B1F] font-bold">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedUnit === 'apartment' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {apartmentGalleryImages.map((src, idx) => (
                    <img 
                      key={src} 
                      src={src} 
                      className="w-full h-64 object-cover rounded-2xl cursor-pointer hover:opacity-90 transition-opacity" 
                      alt={`Gallery ${idx + 1}`} 
                      onClick={() => setEnlargedImage(src)}
                    />
                  ))}
                </div>
              )}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {enlargedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setEnlargedImage(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-white/20 transition-all z-[210] border border-white/20"
              onClick={(e) => { e.stopPropagation(); setEnlargedImage(null); }}
              aria-label="Close fullscreen image"
            >
              <X size={28} />
            </button>

            {/* Navigation Arrows */}
            <button 
              className="absolute left-4 md:left-8 text-white bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-full hover:bg-white/20 transition-all z-[210] border border-white/10 group shadow-2xl"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button 
              className="absolute right-4 md:right-8 text-white bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-full hover:bg-white/20 transition-all z-[210] border border-white/10 group shadow-2xl"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              <ChevronRight size={32} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Image Container */}
            <motion.div
              key={enlargedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={enlargedImage} 
                alt="Enlarged gallery view" 
                className="max-w-full max-h-full object-contain shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-lg select-none" 
              />
              
              {/* Counter indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white/70 text-[10px] uppercase tracking-widest font-bold border border-white/10">
                {apartmentGalleryImages.indexOf(enlargedImage) + 1} / {apartmentGalleryImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-[8px] overflow-y-auto"
          >
            <div className="sticky top-0 bg-transparent/90 backdrop-blur-md p-6 flex justify-between items-center z-10 border-b border-[#6e4d31]/20 shadow-sm">
              <h2 className="text-2xl font-serif text-[#3D2B1F]">
                {content.legal.privacyAndCookies}
              </h2>
              <button 
                onClick={() => setShowPrivacy(false)} 
                className="bg-[#3b2b1f] text-white p-2 rounded-full hover:bg-[#a67c52] transition-colors shadow-md"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            <div className="max-w-4xl mx-auto p-6 md:p-12 text-[#3D2B1F]">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col gap-6 font-medium leading-relaxed">
                <h3 className="text-2xl font-bold uppercase tracking-widest text-[#a67c52]">{content.legal.privacyTitle}</h3>
                <p>{content.legal.privacyIntro}</p>
                
                <div className="mb-4 border-l-[3px] border-[#C8B89A]/60 pl-4">
                  <h4 className="font-serif font-semibold text-[1.35rem] text-[#3D2B1F] mb-2">{content.legal.titolareTitle}</h4>
                  <p className="text-[0.9rem] text-[#5C4A3A] leading-[1.8] mt-2">
                    {content.legal.titolareText}
                  </p>
                </div>

                <div className="mb-4 border-l-[3px] border-[#C8B89A]/60 pl-4">
                  <h4 className="font-serif font-semibold text-[1.35rem] text-[#3D2B1F] mb-2">{content.legal.conservazioneTitle}</h4>
                  <p className="text-[0.9rem] text-[#5C4A3A] leading-[1.8] mt-2">
                    {content.legal.conservazioneText}
                  </p>
                </div>

                <div className="w-full h-px bg-[#3b2b1f]/10 my-6"></div>

                <h3 className="text-2xl font-bold uppercase tracking-widest text-[#a67c52]">{content.legal.cookieTitle}</h3>
                
                <div className="mb-4 border-l-[3px] border-[#C8B89A]/60 pl-4">
                  <h4 className="font-serif font-semibold text-[1.35rem] text-[#3D2B1F] mb-2">{content.legal.cookieWhatTitle}</h4>
                  <p className="text-[0.9rem] text-[#5C4A3A] leading-[1.8] mt-2">{content.legal.cookieWhatText}</p>
                </div>

                <div className="mb-4 border-l-[3px] border-[#C8B89A]/60 pl-4">
                  <h4 className="font-serif font-semibold text-[1.35rem] text-[#3D2B1F] mb-2">{content.legal.cookieHowTitle}</h4>
                  <p className="text-[0.9rem] text-[#5C4A3A] leading-[1.8] mt-2">{content.legal.cookieHowText}</p>
                  <ul className="list-disc pl-5 space-y-2 text-[#3D2B1F]/80 mt-2">
                    <li>{content.legal.cookieProfiling}</li>
                    <li>{content.legal.cookieThirdParty}</li>
                    <li>{content.legal.cookieTechnical}</li>
                  </ul>
                </div>

                <p className="mt-8 text-sm text-[#3D2B1F]/50 font-bold uppercase tracking-widest">{content.legal.lastUpdated}: 30/03/2026</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Elegant Toast Notification for Coming Soon */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] bg-[#3b2b1f]/95 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex items-center gap-4 border border-[#a67c52]/50"
          >
            <div className="w-8 h-8 rounded-full bg-[#a67c52]/20 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#a67c52] animate-pulse"></span>
            </div>
            <span className="font-serif tracking-widest uppercase text-[13px] font-medium text-[#e3d1ba]">
              {content.legal.comingSoon}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 md:left-12 md:right-auto md:max-w-md z-[200] bg-white/90 backdrop-blur-xl border border-[#a67c52]/30 p-6 rounded-3xl shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#a67c52]" size={24} />
                <h4 className="font-serif text-lg font-medium text-[#3D2B1F]">
                  {content.legal.privacyAndCookies}
                </h4>
              </div>
              <p className="text-sm text-[#3D2B1F]/70 leading-relaxed font-medium">
                {content.legal.bannerText}
              </p>
              <div className="flex gap-3 mt-2">
                <button 
                  onClick={() => {
                    localStorage.setItem('villa_angela_cookie_consent', 'accepted');
                    trackCookieConsent(true);
                    setShowCookieBanner(false);
                  }}
                  className="flex-1 bg-[#3b2b1f] text-white py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#a67c52] transition-colors"
                >
                  {content.legal.accept}
                </button>
                <button 
                  onClick={() => {
                    localStorage.setItem('villa_angela_cookie_consent', 'rejected');
                    trackCookieConsent(false);
                    setShowCookieBanner(false);
                  }}
                  className="flex-1 border border-[#3b2b1f]/20 text-[#3b2b1f] py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#3b2b1f]/5 transition-colors"
                >
                  {content.legal.reject}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAdmin && (
          <Dashboard lang={lang} onClose={() => setShowAdmin(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[350] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-[#3b2b1f]/10 flex justify-between items-center bg-[#3b2b1f] text-white">
                <h3 className="font-serif text-xl tracking-widest uppercase">Login</h3>
                <button onClick={() => setShowLogin(false)} className="text-white/50 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form 
                className="p-8 space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  if (fd.get('user') === 'admin' && fd.get('pass') === 'Passeggino1025') {
                    setShowAdmin(true);
                    setShowLogin(false);
                  } else {
                    alert(content.legal.login.invalid);
                  }
                }}
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.legal.login.user}</label>
                  <input 
                    name="user" required type="text" autoFocus
                    className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.legal.login.pass}</label>
                  <input 
                    name="pass" required type="password" 
                    className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#3b2b1f] text-white py-4 rounded-xl uppercase tracking-widest text-[13px] font-bold hover:bg-[#a67c52] transition-all shadow-md mt-4"
                >
                  {content.legal.login.submit}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}
