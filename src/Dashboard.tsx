import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Download, 
  Trash2, 
  ArrowLeft, 
  PieChart, 
  Calendar, 
  Settings,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Star,
  Link as LinkIcon,
  Languages,
  Camera,
  Image as ImageIcon,
  FileText,
  Pencil,
  ChevronUp,
  ChevronDown,
  Globe
} from 'lucide-react';

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua e Barbuda", "Arabia Saudita", "Argentina", "Armenia", "Australia", "Austria", "Azerbaigian",
  "Bahamas", "Bahrein", "Bangladesh", "Barbados", "Belgio", "Belize", "Benin", "Bhutan", "Bielorussia", "Birmania (Myanmar)", "Bolivia", "Bosnia ed Erzegovina", "Botswana", "Brasile", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambogia", "Camerun", "Canada", "Capo Verde", "Ciad", "Cile", "Cina", "Cipro", "Città del Vaticano", "Colombia", "Comore", "Corea del Nord", "Corea del Sud", "Costa d'Avorio", "Costa Rica", "Croazia", "Cuba",
  "Danimarca", "Dominica",
  "Ecuador", "Egitto", "El Salvador", "Emirati Arabi Uniti", "Eritrea", "Estonia", "Etiopia",
  "Figi", "Filippine", "Finlandia", "Francia",
  "Gabon", "Gambia", "Georgia", "Germania", "Ghana", "Giamaica", "Giappone", "Gibuti", "Giordania", "Grecia", "Grenada", "Guatemala", "Guinea", "Guinea Equatoriale", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras",
  "India", "Indonesia", "Iran", "Iraq", "Irlanda", "Islanda", "Isole Marshall", "Isole Salomone", "Israele", "Italia",
  "Kazakistan", "Kenya", "Kirghizistan", "Kiribati", "Kuwait",
  "Laos", "Lesotho", "Lettonia", "Libano", "Liberia", "Libia", "Liechtenstein", "Lituania", "Lussemburgo",
  "Macedonia del Nord", "Madagascar", "Malawi", "Malaysia", "Maldive", "Mali", "Malta", "Marocco", "Mauritania", "Mauritius", "Messico", "Micronesia", "Moldavia", "Monaco", "Mongolia", "Montenegro", "Mozambico",
  "Namibia", "Nauru", "Nepal", "Nicaragua", "Niger", "Nigeria", "Norvegia", "Nuova Zelanda",
  "Oman",
  "Paesi Bassi", "Pakistan", "Palau", "Palestina", "Panama", "Papua Nuova Guinea", "Paraguay", "Perù", "Polonia", "Portogallo",
  "Qatar",
  "Regno Unito", "Repubblica Ceca", "Repubblica Centrafricana", "Repubblica del Congo", "Repubblica Democratica del Congo", "Repubblica Dominicana", "Romania", "Ruanda", "Russia",
  "Saint Kitts e Nevis", "Saint Lucia", "Saint Vincent e Grenadine", "Samoa", "San Marino", "São Tomé e Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Siria", "Slovacchia", "Slovenia", "Somalia", "Spagna", "Sri Lanka", "Stati Uniti", "Sudafrica", "Sudan", "Sudan del Sud", "Suriname", "Svezia", "Svizzera", "Swaziland (Eswatini)",
  "Tagikistan", "Taiwan", "Tanzania", "Thailandia", "Timor Est", "Togo", "Tonga", "Trinidad e Tobago", "Tunisia", "Turchia", "Turkmenistan", "Tuvalu",
  "Ucraina", "Uganda", "Ungheria", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabase';

interface GuestBody {
  name: string;
  surname: string;
  document_id: string;
  document_type: string;
  document_photo_url?: string;
  nationality: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  unit: string;
  parent_id?: string | null;
}

interface Guest extends GuestBody {
  id: string;
}

interface ReviewBody {
  name: string;
  platform: string;
  date: string;
  stars: number;
  quote: string;
  is_published?: boolean;
}

interface Review extends ReviewBody {
  id: string;
}

interface CookieStats {
  accepted: number;
  rejected: number;
}

interface DashboardProps {
  onClose: () => void;
  lang: string;
}

export default function Dashboard({ onClose, lang }: DashboardProps) {
  const t: Record<string, any> = {
    it: { 
      title: "Area Riservata", 
      sub: "Gestione Villa Angela", 
      guests: "Ospiti", 
      stats: "Cookie", 
      reviewsTab: "Recensioni", 
      search: "Cerca ospite o documento...", 
      add: "Aggiungi Ospite", 
      addReview: "Aggiungi Recensione", 
      tableGuest: "Ospite", 
      tableDoc: "Documento", 
      tableCheck: "Check-in / Out", 
      tableLoc: "Locazione", 
      tableCount: "Ospiti", 
      noGuests: "Nessun ospite registrato", 
      noReviews: "Nessuna recensione manuale", 
      accepted: "Cookie Accettati", 
      rejected: "Cookie Rifiutati", 
      privacyInfoTitle: "Informazione Privacy", 
      privacyInfo: "In rispetto del GDPR, queste statistiche sono anonime e non associate a singoli utenti. I dati sono memorizzati esclusivamente in questa banca dati locale.", 
      modalTitle: "Nuova Registrazione", 
      editModalTitle: "Modifica Registrazione",
      reviewModalTitle: "Nuova Recensione", 
      labelName: "Nome", 
      labelSurname: "Cognome", 
      labelDoc: "Numero Documento", 
      labelDocType: "Tipo Documento",
      labelDocPhoto: "Foto Documento",
      labelNat: "Nazionalità", 
      labelCheckIn: "Check-in", 
      labelCheckOut: "Check-out", 
      labelGuests: "Ospiti", 
      labelLoc: "Locazione", 
      labelPlatform: "Piattaforma (es. Airbnb)", 
      labelDate: "Data (es. Gennaio 2026)", 
      labelStars: "Stelle (1-5)", 
      labelQuote: "Testo Recensione", 
      save: "Salva Ospite", 
      update: "Aggiorna Ospite",
      saveReview: "Salva Recensione", 
      confirmDelete: "Sei sicuro di voler eliminare?", 
      dateError: "La data di check-out non può essere uguale alla data di check-in.",
      extractLabel: "Carica da Link (Airbnb)",
      extractPlaceholder: "Incolla il link della recensione...",
      extractBtn: "Estrai Dati",
      autoTranslate: "Traduci in tutte le lingue",
      extracting: "Estrazione in corso...",
      saving: "Salvataggio...",
      uploading: "Caricamento foto...",
      uploadSuccess: "Foto caricata correttamente",
      uploadError: "Errore caricamento foto",
      docTypes: {
        id: "Carta d'Identità",
        passport: "Passaporto",
        license: "Patente"
      },
      familyModalTitle: "Registrazione Familiare",
      familyMemberLabel: "Membro Famiglia",
      finishRegistration: "Completa Registrazione"
    },
    en: { 
      title: "Reserved Area", 
      sub: "Villa Angela Management", 
      guests: "Guests", 
      stats: "Cookies", 
      reviewsTab: "Reviews", 
      search: "Search guest or document...", 
      add: "Add Guest", 
      addReview: "Add Review", 
      tableGuest: "Guest", 
      tableDoc: "Document", 
      tableCheck: "Check-in / Out", 
      tableLoc: "Location", 
      tableCount: "Guests", 
      noGuests: "No guests registered", 
      noReviews: "No manual reviews", 
      accepted: "Cookies Accepted", 
      rejected: "Cookies Rejected", 
      privacyInfoTitle: "Privacy Information", 
      privacyInfo: "In compliance with GDPR, these statistics are anonymous.", 
      modalTitle: "New Registration", 
      editModalTitle: "Edit Registration",
      reviewModalTitle: "New Review", 
      labelName: "Name", 
      labelSurname: "Surname", 
      labelDoc: "Document Number", 
      labelDocType: "Document Type",
      labelDocPhoto: "Document Photo",
      labelNat: "Nationality", 
      labelCheckIn: "Check-in", 
      labelCheckOut: "Check-out", 
      labelGuests: "Guests", 
      labelLoc: "Location", 
      labelPlatform: "Platform", 
      labelDate: "Date", 
      labelStars: "Stars (1-5)", 
      labelQuote: "Review Text", 
      save: "Save Guest", 
      update: "Update Guest",
      saveReview: "Save Review", 
      confirmDelete: "Are you sure you want to delete?", 
      dateError: "Check-out date cannot be the same as check-in date.",
      extractLabel: "Load from Link (Airbnb)",
      extractPlaceholder: "Paste review link here...",
      extractBtn: "Extract Data",
      autoTranslate: "Translate to all languages",
      extracting: "Extracting...",
      saving: "Saving...",
      uploading: "Uploading photo...",
      uploadSuccess: "Photo uploaded successfully",
      uploadError: "Photo upload failed",
      docTypes: {
        id: "ID Card",
        passport: "Passport",
        license: "Driver's License"
      },
      familyModalTitle: "Family Registration",
      familyMemberLabel: "Family Member",
      finishRegistration: "Complete Registration"
    }
  };
  const content = t[lang] || t.en;

  const [guests, setGuests] = useState<Guest[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<CookieStats>({ accepted: 0, rejected: 0 });
  const [activeTab, setActiveTab] = useState<'guests' | 'stats' | 'reviews'>('guests');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Guest | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [hasLocalData, setHasLocalData] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [extractUrl, setExtractUrl] = useState('');
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [familyMembersLeft, setFamilyMembersLeft] = useState(0);
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);
  const [expandedFamilies, setExpandedFamilies] = useState<string[]>([]);

  // Form states using snake_case to match DB schema where possible, or camelCase for UI consistency
  const [newGuest, setNewGuest] = useState<GuestBody>({
    name: '',
    surname: '',
    document_id: '',
    document_type: "Carta d'Identità",
    document_photo_url: '',
    nationality: '',
    check_in: '',
    check_out: '',
    guests_count: 1,
    unit: 'Holiday Apartment'
  });

  const [newReview, setNewReview] = useState<ReviewBody>({
    name: '',
    platform: 'Airbnb',
    date: new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' }),
    stars: 5,
    quote: ''
  });

  useEffect(() => {
    const initDashboard = async () => {
      setIsSyncing(true);
      await fetchData();
      checkLocalData();
    };
    initDashboard();
  }, []);

  const checkLocalData = () => {
    const guests = localStorage.getItem('villa_angela_guests');
    const reviews = localStorage.getItem('villa_angela_custom_reviews');
    const stats = localStorage.getItem('villa_angela_cookie_stats');
    if (
      (guests && JSON.parse(guests).length > 0) || 
      (reviews && JSON.parse(reviews).length > 0) ||
      (stats && (JSON.parse(stats).accepted > 0 || JSON.parse(stats).rejected > 0))
    ) {
      setHasLocalData(true);
    }
  };

  const handleMigration = async () => {
    if (!window.confirm("Vuoi trasferire tutti gli ospiti e le recensioni salvate nel browser nel nuovo database Cloud? I dati locali verranno poi rimossi.")) return;
    
    setIsMigrating(true);
    try {
      const localGuests = JSON.parse(localStorage.getItem('villa_angela_guests') || '[]');
      const localReviews = JSON.parse(localStorage.getItem('villa_angela_custom_reviews') || '[]');

      // Migrate Guests
      if (localGuests.length > 0) {
        const dbGuests = localGuests.map((g: any) => ({
          name: g.name,
          surname: g.surname,
          document_id: g.document_id,
          document_type: g.document_type || "Carta d'Identità",
          document_photo_url: g.document_photo_url,
          nationality: g.nationality,
          check_in: g.checkIn || g.check_in,
          check_out: g.checkOut || g.check_out,
          guests_count: g.guestsCount || g.guests_count,
          unit: g.unit
        }));
        await supabase.from('guests').insert(dbGuests);
      }

      // Migrate Reviews
      if (localReviews.length > 0) {
        const dbReviews = localReviews.map((r: any) => ({
          name: r.name,
          platform: r.platform,
          date: r.date,
          stars: r.stars,
          quote: r.quote
        }));
        await supabase.from('reviews').insert(dbReviews);
      }

      // Cleanup
      localStorage.removeItem('villa_angela_guests');
      localStorage.removeItem('villa_angela_custom_reviews');
      
      const localStats = JSON.parse(localStorage.getItem('villa_angela_cookie_stats') || '{"accepted":0,"rejected":0}');
      if (localStats.accepted > 0 || localStats.rejected > 0) {
        // Increment global stats by local amounts
        for (let i = 0; i < localStats.accepted; i++) {
          await supabase.rpc('increment_cookie_stats', { stat_type: 'accepted' });
        }
        for (let i = 0; i < localStats.rejected; i++) {
          await supabase.rpc('increment_cookie_stats', { stat_type: 'rejected' });
        }
        localStorage.removeItem('villa_angela_cookie_stats');
      }

      setHasLocalData(false);
      fetchData(); // Refresh view
      alert("Migrazione completata con successo!");
    } catch (error) {
      console.error('Migration failed:', error);
      alert("Errore durante la migrazione. Controlla la console.");
    } finally {
      setIsMigrating(false);
    }
  };

  const fetchData = async () => {
    // Non resettiamo isSyncing qui se è già gestito dall'useEffect iniziale o da altre chiamate
    try {
      // Fetch guests
      const { data: guestData, error: guestError } = await supabase
        .from('guests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (guestError) throw guestError;
      
      if (guestData) {
        setGuests(guestData.map((g: any) => ({
          id: g.id,
          name: g.name,
          surname: g.surname,
          document_id: g.document_id,
          document_type: g.document_type || "Carta d'Identità",
          document_photo_url: g.document_photo_url,
          nationality: g.nationality,
          check_in: g.check_in,
          check_out: g.check_out,
          guests_count: g.guests_count,
          unit: g.unit
        })));
      }

      // Fetch custom reviews
      const { data: reviewData, error: reviewError } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (reviewError) throw reviewError;
      
      if (reviewData) {
        setReviews(reviewData.map((r: any) => ({
          id: r.id,
          name: r.name,
          platform: r.platform,
          date: r.date,
          stars: r.stars,
          quote: r.quote
        })));
      }

      // Load Global Cookie Stats
      const { data: statsData, error: statsError } = await supabase
        .from('cookie_stats')
        .select('accepted, rejected')
        .eq('id', 'global')
        .maybeSingle(); // Usiamo maybeSingle per evitare errori se non trova nulla
      
      if (statsError) {
        console.error('Errore caricamento cookie stats:', statsError);
      } else if (statsData) {
        setStats({ 
          accepted: statsData.accepted || 0, 
          rejected: statsData.rejected || 0 
        });
      }
      
    } catch (error) {
      console.error('Fetch data failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    // Realtime subscription for Guests
    const guestsChannel = supabase
      .channel('dashboard:guests')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'guests' }, (payload: any) => {
        if (payload.eventType === 'INSERT') {
          setGuests(prev => {
            // Anti-duplicato: aggiungi solo se non esiste già
            if (prev.some(g => g.id === payload.new.id)) return prev;
            return [payload.new as Guest, ...prev];
          });
        } else if (payload.eventType === 'DELETE') {
          setGuests(prev => prev.filter(g => g.id !== payload.old.id));
        } else if (payload.eventType === 'UPDATE') {
          setGuests(prev => prev.map(g => g.id === payload.new.id ? payload.new as Guest : g));
        }
      })
      .subscribe();

    // Realtime subscription for Reviews
    const reviewsChannel = supabase
      .channel('dashboard:reviews')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, (payload: any) => {
        if (payload.eventType === 'INSERT') {
          setReviews(prev => {
            // Anti-duplicato: aggiungi solo se non esiste già
            if (prev.some(r => r.id === payload.new.id)) return prev;
            return [payload.new as Review, ...prev];
          });
        } else if (payload.eventType === 'DELETE') {
          setReviews(prev => prev.filter(r => r.id !== payload.old.id));
        } else if (payload.eventType === 'UPDATE') {
          setReviews(prev => prev.map(r => r.id === payload.new.id ? payload.new as Review : r));
        }
      })
      .subscribe();

    // Realtime subscription for Cookie Stats
    const statsChannel = supabase
      .channel('dashboard:stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cookie_stats' }, (payload: any) => {
        if (payload.new && payload.new.id === 'global') {
          setStats({ accepted: payload.new.accepted, rejected: payload.new.rejected });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(guestsChannel);
      supabase.removeChannel(reviewsChannel);
      supabase.removeChannel(statsChannel);
    };
  }, []);

  
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { data, error } = await supabase.storage
        .from('guest-documents')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('guest-documents')
        .getPublicUrl(filePath);

      setNewGuest(prev => ({ ...prev, document_photo_url: publicUrl }));
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert(content.uploadError);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleEditClick = (guest: Guest) => {
    setEditingGuest(guest);
    setNewGuest({
      name: guest.name,
      surname: guest.surname,
      document_id: guest.document_id,
      document_type: guest.document_type,
      document_photo_url: guest.document_photo_url,
      nationality: guest.nationality,
      check_in: guest.check_in,
      check_out: guest.check_out,
      guests_count: guest.guests_count,
      unit: guest.unit
    });
    setShowAddForm(true);
  };

  const handleSaveGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const dbGuest: any = {
        name: newGuest.name,
        surname: newGuest.surname,
        document_id: newGuest.document_id,
        document_type: newGuest.document_type,
        document_photo_url: newGuest.document_photo_url,
        nationality: newGuest.nationality,
        check_in: newGuest.check_in,
        check_out: newGuest.check_out,
        guests_count: newGuest.guests_count,
        unit: newGuest.unit,
        parent_id: currentParentId
      };

      let savedId = editingGuest?.id;

      if (editingGuest) {
        const { error } = await supabase
          .from('guests')
          .update(dbGuest)
          .eq('id', editingGuest.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('guests')
          .insert([dbGuest])
          .select();

        if (error) throw error;
        if (data && data[0]) savedId = data[0].id;
      }

      // Gestione famiglia
      if (!editingGuest && !currentParentId && newGuest.guests_count > 1) {
        // Abbiamo appena salvato il capofamiglia
        setCurrentParentId(savedId);
        setFamilyMembersLeft(newGuest.guests_count - 1);
        // Reset solo dei campi anagrafici per il prossimo membro
        setNewGuest(prev => ({
          ...prev,
          name: '',
          surname: '',
          document_id: '',
          document_photo_url: '',
          guests_count: 1 // I membri extra contano come 1 o ereditano? Di solito 1.
        }));
        return; // Non chiudiamo il form
      }

      if (familyMembersLeft > 1) {
        setFamilyMembersLeft(prev => prev - 1);
        setNewGuest(prev => ({
          ...prev,
          name: '',
          surname: '',
          document_id: '',
          document_photo_url: ''
        }));
        return;
      }

      // Fine registrazione
      setShowAddForm(false);
      setEditingGuest(null);
      setCurrentParentId(null);
      setFamilyMembersLeft(0);
      setNewGuest({
        name: '',
        surname: '',
        document_id: '',
        document_type: "Carta d'Identità",
        document_photo_url: '',
        nationality: '',
        check_in: '',
        check_out: '',
        guests_count: 1,
        unit: 'Holiday Apartment',
        parent_id: null
      });
    } catch (error) {
      console.error('Error saving guest:', error);
      alert('Errore durante il salvataggio su Supabase.');
    }
  };

  const handleDeleteGuest = async (id: string, photoUrl?: string) => {
    if (window.confirm(content.confirmDelete)) {
      try {
        // Delete photo from storage if exists - non blocchiamo la UI
        if (photoUrl) {
          const path = photoUrl.split('/guest-documents/').pop();
          if (path) {
            supabase.storage.from('guest-documents').remove([path]);
          }
        }

        const { error } = await supabase
          .from('guests')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        // Il Realtime rimuoverà l'ospite dalla lista
      } catch (error) {
        console.error('Error deleting guest:', error);
        alert('Errore durante l\'eliminazione su Supabase.');
      }
    }
  };


  const handleExtractReview = async () => {
    if (!extractUrl) return;
    setIsExtracting(true);
    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: extractUrl })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setNewReview({
        name: data.name || '',
        platform: data.platform || 'Airbnb',
        date: data.date || '',
        stars: data.stars || 5,
        quote: data.quote || ''
      });
      setExtractUrl('');
    } catch (error) {
      console.error('Extraction failed:', error);
      alert('Errore durante l\'estrazione dei dati. Verifica il link.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingReview(true);
    
    try {
      // 1. Save to Supabase (primary persistent storage)
      const { error } = await supabase
        .from('reviews')
        .insert([newReview]);

      if (error) throw error;

      // 2. Also trigger the backend API if auto-translation is needed - in background
      if (autoTranslate) {
        fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            review: newReview,
            autoTranslate 
          })
        });
      }
      
      // Il Realtime aggiungerà la recensione alla UI
      setShowAddReviewForm(false);
      setNewReview({
        name: '',
        platform: 'Airbnb',
        date: new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' }),
        stars: 5,
        quote: ''
      });
    } catch (error) {
      console.error('Save review failed:', error);
      alert('Errore durante il salvataggio su Supabase.');
    } finally {
      setIsSavingReview(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (window.confirm(content.confirmDelete)) {
      try {
        const { error } = await supabase
          .from('reviews')
          .delete()
          .eq('id', id);
        
        if (error) throw error;

        // Optionally delete from JSON files too - in background
        fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, action: 'delete' })
        });

        // Il Realtime gestirà la rimozione dalla UI
      } catch (error) {
        console.error('Delete review failed:', error);
        alert('Errore durante l\'eliminazione su Supabase.');
      }
    }
  };

  const exportToCSV = () => {
    const headers = ["Nome", "Cognome", "Documento", "Nazionalita", "Check-in", "Check-out", "Ospiti", "Locazione"];
    const rows = guests.map(g => [
      g.name, g.surname, g.document_id, g.nationality, g.check_in, g.check_out, g.guests_count, g.unit
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `villa_angela_ospiti_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSort = (key: keyof Guest) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getGuestStatus = (checkOut: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkOutDate = new Date(checkOut);
    checkOutDate.setHours(0, 0, 0, 0);
    
    if (today <= checkOutDate) return 'active';
    return 'expired';
  };

  const filteredGuests = guests
    .filter(g => !g.parent_id) // Mostra solo capifamiglia nella lista principale
    .filter(g => 
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      g.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.document_id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === undefined || bVal === undefined) return 0;

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const toggleFamily = (parentId: string) => {
    setExpandedFamilies(prev => 
      prev.includes(parentId) 
        ? prev.filter(id => id !== parentId) 
        : [...prev, parentId]
    );
  };

  const statsToDisplay: CookieStats = {
    accepted: stats.accepted,
    rejected: stats.rejected
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-[#F5F0E8] overflow-hidden flex flex-col font-sans"
    >
      {/* Sidebar / Header */}
      <header className="bg-white border-b border-[#3b2b1f]/10 px-4 md:px-8 py-4 md:py-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
          <button onClick={onClose} className="p-2 hover:bg-[#3b2b1f]/5 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-[#3b2b1f]" />
          </button>
          <div>
            <h1 className="font-serif text-2xl tracking-widest uppercase text-[#3D2B1F]">{content.title}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[11px] font-bold text-[#a67c52] uppercase tracking-[0.2em]">{content.sub}</p>
              {isSyncing && (
                <div className="flex items-center gap-1.5 ml-2 bg-[#a67c52]/10 px-2 py-0.5 rounded-full">
                  <Loader2 size={10} className="text-[#a67c52] animate-spin" />
                  <span className="text-[9px] font-bold text-[#a67c52] uppercase tracking-wider">Syncing...</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex bg-[#F5F0E8] p-1 rounded-xl border border-[#3b2b1f]/5 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('guests')}
            className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'guests' ? 'bg-white text-[#a67c52] shadow-sm' : 'text-[#3D2B1F]/50 hover:text-[#3D2B1F]'}`}
          >
            <div className="flex items-center gap-2">
              <Users size={14} />
              {content.guests}
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'stats' ? 'bg-white text-[#a67c52] shadow-sm' : 'text-[#3D2B1F]/50 hover:text-[#3D2B1F]'}`}
          >
            <div className="flex items-center gap-2">
              <PieChart size={14} />
              {content.stats}
            </div>
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'reviews' ? 'bg-white text-[#a67c52] shadow-sm' : 'text-[#3D2B1F]/50 hover:text-[#3D2B1F]'}`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={14} />
              {content.reviewsTab}
            </div>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* Migration Alert */}
        {hasLocalData && (
          <div className="mb-8 p-6 bg-[#3b2b1f] rounded-3xl text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <Settings size={20} className="text-[#e3d1ba]" />
              </div>
              <div>
                <h4 className="font-serif text-[1.1rem] tracking-wider uppercase mb-1">Dati Locali Rilevati</h4>
                <p className="text-[#e3d1ba]/70 text-xs">Hai degli ospiti o recensioni salvati in questo browser. Trasferiscili nel Database Cloud per non perderli mai.</p>
              </div>
            </div>
            <button 
              onClick={handleMigration}
              disabled={isMigrating}
              className="relative z-10 bg-[#e3d1ba] text-[#3b2b1f] px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-md flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
            >
              {isMigrating ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              Esegui Migrazione
            </button>
          </div>
        )}

        {activeTab === 'guests' ? (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-[400px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b2b1f]/30" size={18} />
                <input 
                  type="text" 
                  placeholder={content.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-[#3b2b1f]/10 rounded-[1.25rem] pl-12 pr-6 py-3.5 text-sm outline-none focus:border-[#a67c52] transition-colors shadow-sm"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={exportToCSV}
                  disabled={guests.length === 0}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#3b2b1f]/10 px-4 md:px-6 py-3 md:py-3.5 rounded-xl md:rounded-[1.25rem] text-[11px] md:text-[13px] font-bold uppercase tracking-widest text-[#3D2B1F] hover:bg-[#3b2b1f]/5 transition-all disabled:opacity-50"
                >
                  <Download size={16} />
                  CSV
                </button>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#3b2b1f] px-4 md:px-6 py-3 md:py-3.5 rounded-xl md:rounded-[1.25rem] text-[11px] md:text-[13px] font-bold uppercase tracking-widest text-white hover:bg-[#a67c52] transition-all shadow-md"
                >
                  <UserPlus size={16} />
                  {content.add}
                </button>
              </div>
            </div>

            {/* Guests Table */}
            <div className="bg-white rounded-3xl border border-[#3b2b1f]/10 shadow-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#3b2b1f]/5 border-b border-[#3b2b1f]/10">
                  <tr>
                    <th 
                      onClick={() => handleSort('name')}
                      className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60 cursor-pointer hover:text-[#a67c52] transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        {content.tableGuest}
                        {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60">{content.tableDoc}</th>
                    <th 
                      onClick={() => handleSort('check_in')}
                      className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60 cursor-pointer hover:text-[#a67c52] transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        {content.tableCheck}
                        {sortConfig.key === 'check_in' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('unit')}
                      className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60 cursor-pointer hover:text-[#a67c52] transition-colors"
                    >
                      <div className="flex items-center gap-1">
                        {content.tableLoc}
                        {sortConfig.key === 'unit' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('guests_count')}
                      className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60 text-center cursor-pointer hover:text-[#a67c52] transition-colors"
                    >
                      <div className="flex items-center justify-center gap-1">
                        {content.tableCount}
                        {sortConfig.key === 'guests_count' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3b2b1f]/5">
                  {filteredGuests.length > 0 ? filteredGuests.map((guest) => {
                    const status = getGuestStatus(guest.check_out);
                    const familyMembers = guests.filter(g => g.parent_id === guest.id);
                    const isExpanded = expandedFamilies.includes(guest.id);

                    return (
                      <React.Fragment key={guest.id}>
                        <tr className={`hover:bg-[#3b2b1f]/[0.02] transition-colors border-l-4 ${status === 'active' ? 'border-l-green-500/50' : 'border-l-red-400/50'}`}>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              {familyMembers.length > 0 && (
                                <button 
                                  onClick={() => toggleFamily(guest.id)}
                                  className="p-1 hover:bg-[#3b2b1f]/5 rounded transition-colors text-[#a67c52]"
                                >
                                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                              )}
                              <div>
                                <div className={`font-serif text-[1.1rem] transition-colors ${status === 'active' ? 'text-green-800' : 'text-[#3D2B1F]'}`}>{guest.name} {guest.surname}</div>
                                <div className="text-[11px] font-medium text-[#a67c52] uppercase tracking-wider mt-1">{guest.nationality}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-wider bg-[#a67c52]/5 px-1.5 py-0.5 rounded">
                                  {guest.document_type}
                                </span>
                                {guest.document_photo_url && (
                                  <a 
                                    href={guest.document_photo_url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-[#a67c52] hover:text-[#3b2b1f] transition-colors"
                                  >
                                    <ImageIcon size={14} />
                                  </a>
                                )}
                              </div>
                              <code className="bg-[#3b2b1f]/5 px-2 py-1 rounded text-xs font-bold text-[#3D2B1F]/70 w-fit">{guest.document_id}</code>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className={`flex items-center gap-2 text-xs font-bold transition-colors ${status === 'active' ? 'text-green-700' : 'text-red-500/80'}`}>
                              <Calendar size={14} className={status === 'active' ? 'text-green-600' : 'text-red-400'} />
                              {guest.check_in} → {guest.check_out}
                              <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded-full ${status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}`}>
                                {status === 'active' ? 'Attiva' : 'Scaduta'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="text-[11px] font-bold text-[#3D2B1F] uppercase tracking-wider">{guest.unit}</div>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'active' ? 'bg-green-100 text-green-700' : 'bg-[#a67c52]/10 text-[#a67c52]'}`}>{guest.guests_count}</span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleEditClick(guest)}
                                className="p-2 text-[#3b2b1f]/20 hover:text-[#a67c52] transition-colors"
                              >
                                <Pencil size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteGuest(guest.id, guest.document_photo_url)}
                                className="p-2 text-[#3b2b1f]/20 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        
                        {/* Family Members Row */}
                        <AnimatePresence>
                          {isExpanded && familyMembers.map(member => (
                            <motion.tr 
                              key={member.id}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-[#F5F0E8]/30 border-l-4 border-l-[#a67c52]/20"
                            >
                              <td className="px-6 py-3 pl-14">
                                <div className="text-[14px] font-medium text-[#3D2B1F]">{member.name} {member.surname}</div>
                                <div className="text-[9px] font-bold text-[#a67c52]/50 uppercase tracking-widest">{content.familyMemberLabel}</div>
                              </td>
                              <td className="px-6 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-bold text-[#a67c52]/60 uppercase tracking-wider">
                                    {member.document_type}
                                  </span>
                                  <code className="text-[10px] text-[#3D2B1F]/50">{member.document_id}</code>
                                </div>
                              </td>
                              <td colSpan={3} className="px-6 py-3">
                                {/* Inherited info from parent */}
                              </td>
                              <td className="px-6 py-3 text-right">
                                <button 
                                  onClick={() => handleDeleteGuest(member.id, member.document_photo_url)}
                                  className="p-1 text-[#3b2b1f]/10 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </React.Fragment>
                    );
                  }) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 text-[#3D2B1F]/30">
                          <Users size={48} strokeWidth={1} />
                          <p className="font-serif italic text-lg">{content.noGuests}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'stats' ? (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-[#3b2b1f]/10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="font-serif text-[1.5rem] text-[#3D2B1F] mb-2">{statsToDisplay.accepted}</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#a67c52]">{content.accepted}</p>
                <div className="w-full h-2 bg-green-100 rounded-full mt-8 overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-1000" 
                    style={{ width: `${(statsToDisplay.accepted / (statsToDisplay.accepted + statsToDisplay.rejected || 1)) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-[#3b2b1f]/10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mb-6 shadow-sm">
                  <AlertCircle size={40} className="text-red-400" />
                </div>
                <h3 className="font-serif text-[1.5rem] text-[#3D2B1F] mb-2">{statsToDisplay.rejected}</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#a67c52]">{content.rejected}</p>
                <div className="w-full h-2 bg-red-100 rounded-full mt-8 overflow-hidden">
                  <div 
                    className="h-full bg-red-400 transition-all duration-1000" 
                    style={{ width: `${(statsToDisplay.rejected / (statsToDisplay.accepted + statsToDisplay.rejected || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#3b2b1f] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h4 className="font-serif text-xl tracking-widest uppercase mb-4">{content.privacyInfoTitle}</h4>
                <p className="text-[#e3d1ba]/80 leading-[1.8] text-sm md:text-[15px]">
                  {content.privacyInfo}
                </p>
              </div>
            </div>
          </div>
        ) : activeTab === 'reviews' ? (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 justify-end items-center">
              <button 
                onClick={() => setShowAddReviewForm(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#3b2b1f] px-4 md:px-6 py-3 md:py-3.5 rounded-xl md:rounded-[1.25rem] text-[11px] md:text-[13px] font-bold uppercase tracking-widest text-white hover:bg-[#a67c52] transition-all shadow-md"
              >
                <MessageSquare size={16} />
                {content.addReview}
              </button>
            </div>
            
            <div className="bg-white rounded-3xl border border-[#3b2b1f]/10 shadow-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#3b2b1f]/5 border-b border-[#3b2b1f]/10">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60">{content.labelName}</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60">{content.labelPlatform}</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60">{content.labelDate}</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60 text-center">{content.labelStars}</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60">{content.labelQuote}</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3b2b1f]/5">
                  {reviews.length > 0 ? reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-[#3b2b1f]/[0.02] transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-serif text-[1.1rem] text-[#3D2B1F]">{review.name}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          review.platform === 'Airbnb' ? 'bg-[#FF385C]/10 text-[#FF385C]' :
                          review.platform === 'Booking.com' ? 'bg-[#003580]/10 text-[#003580]' :
                          review.platform === 'Google' ? 'bg-[#4285F4]/10 text-[#4285F4]' :
                          review.platform === 'TripAdvisor' ? 'bg-[#34E0A1]/10 text-[#00AF87]' :
                          'bg-[#3b2b1f]/5 text-[#3D2B1F]/70'
                        }`}>
                          {review.platform}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#3D2B1F]">
                          <Calendar size={14} className="text-[#a67c52]" />
                          {review.date}
                        </div>
                      </td>
                      <td className="px-6 py-5 flex justify-center gap-1">
                        {Array.from({ length: review.stars }).map((_, i) => (
                          <Star key={i} size={12} fill="#a67c52" className="text-[#a67c52]" />
                        ))}
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[11px] font-bold text-[#3D2B1F] italic max-w-xs truncate">"{review.quote}"</div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-2 text-[#3b2b1f]/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 text-[#3D2B1F]/30">
                          <MessageSquare size={48} strokeWidth={1} />
                          <p className="font-serif italic text-lg">{content.noReviews}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </main>

      {/* Add Guest Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
            >
              <div className="p-8 border-b border-[#3b2b1f]/10 flex justify-between items-center">
                <h3 className="font-serif text-xl tracking-widest uppercase text-[#3D2B1F]">
                  {familyMembersLeft > 0 ? content.familyModalTitle : (editingGuest ? content.editModalTitle : content.modalTitle)}
                </h3>
                <button 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingGuest(null);
                    setCurrentParentId(null);
                    setFamilyMembersLeft(0);
                    setNewGuest({
                      name: '', surname: '', document_id: '', document_type: "Carta d'Identità",
                      document_photo_url: '', nationality: '', check_in: '', check_out: '',
                      guests_count: 1, unit: 'Holiday Apartment'
                    });
                  }} 
                  className="text-[#3D2B1F]/30 hover:text-[#3D2B1F]"
                >
                  <X size={24} />
                </button>
              </div>

              {familyMembersLeft > 0 && (
                <div className="px-8 py-4 bg-[#a67c52]/10 border-b border-[#3b2b1f]/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#a67c52]">
                    Registrazione familiari in corso...
                  </span>
                  <span className="bg-[#a67c52] text-white px-3 py-1 rounded-full text-[10px] font-bold">
                    Mancanti: {familyMembersLeft}
                  </span>
                </div>
              )}

              <form onSubmit={handleSaveGuest} className="p-4 md:p-8 space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelName}</label>
                    <input 
                      required type="text" 
                      value={newGuest.name}
                      onChange={e => setNewGuest({...newGuest, name: e.target.value})}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelSurname}</label>
                    <input 
                      required type="text" 
                      value={newGuest.surname}
                      onChange={e => setNewGuest({...newGuest, surname: e.target.value})}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelDocType}</label>
                    <select 
                      required
                      value={newGuest.document_type}
                      onChange={e => setNewGuest({...newGuest, document_type: e.target.value})}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors"
                    >
                      <option value="Carta d'Identità">{content.docTypes.id}</option>
                      <option value="Passaporto">{content.docTypes.passport}</option>
                      <option value="Patente">{content.docTypes.license}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelDoc}</label>
                    <input 
                      required type="text" 
                      value={newGuest.document_id}
                      onChange={e => setNewGuest({...newGuest, document_id: e.target.value})}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelDocPhoto}</label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 flex items-center justify-center gap-3 bg-[#F5F0E8]/50 border-2 border-dashed border-[#3b2b1f]/10 rounded-xl px-4 py-6 cursor-pointer hover:border-[#a67c52]/30 transition-all group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload}
                        className="hidden" 
                      />
                      {isUploadingPhoto ? (
                        <Loader2 size={24} className="text-[#a67c52] animate-spin" />
                      ) : newGuest.document_photo_url ? (
                        <CheckCircle2 size={24} className="text-green-500" />
                      ) : (
                        <Camera size={24} className="text-[#3b2b1f]/20 group-hover:text-[#a67c52]/50 transition-colors" />
                      )}
                      <span className="text-sm font-medium text-[#3b2b1f]/40">
                        {isUploadingPhoto ? content.uploading : 
                         newGuest.document_photo_url ? content.uploadSuccess : 
                         "Clicca per caricare o scattare foto"}
                      </span>
                    </label>
                    {newGuest.document_photo_url && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#3b2b1f]/10 shrink-0 shadow-sm relative group">
                        <img src={newGuest.document_photo_url} className="w-full h-full object-cover" alt="Preview" />
                        <button 
                          type="button"
                          onClick={() => setNewGuest({...newGuest, document_photo_url: ''})}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                 {!currentParentId && (
                  <>
                    <div className="space-y-2 relative">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelNat}</label>
                      <div className="relative">
                        <input 
                          required type="text" 
                          placeholder="Cerca nazionalità..."
                          value={showCountryDropdown ? countrySearch : newGuest.nationality}
                          onFocus={() => {
                            setShowCountryDropdown(true);
                            setCountrySearch('');
                          }}
                          onChange={e => setCountrySearch(e.target.value)}
                          className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3b2b1f]/20 pointer-events-none">
                          <Search size={18} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {showCountryDropdown && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-[500] left-0 right-0 top-full mt-2 bg-white border border-[#3b2b1f]/10 rounded-2xl shadow-xl max-h-60 overflow-y-auto scrollbar-hide"
                          >
                            {COUNTRIES.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase())).length > 0 ? (
                              COUNTRIES.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase())).map(country => (
                                <button
                                  key={country}
                                  type="button"
                                  onClick={() => {
                                    setNewGuest({...newGuest, nationality: country});
                                    setShowCountryDropdown(false);
                                    setCountrySearch('');
                                  }}
                                  className="w-full text-left px-5 py-3 text-sm hover:bg-[#F5F0E8] transition-colors border-b border-[#3b2b1f]/5 last:border-0 font-medium text-[#3D2B1F]"
                                >
                                  {country}
                                </button>
                              ))
                            ) : (
                              <div className="px-5 py-6 text-center text-[#3D2B1F]/40 italic text-sm">
                                Nessun paese trovato
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {showCountryDropdown && (
                        <div 
                          className="fixed inset-0 z-[490]" 
                          onClick={() => setShowCountryDropdown(false)}
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelCheckIn}</label>
                        <input 
                          required type="date" 
                          value={newGuest.check_in}
                          onChange={e => {
                            const newCheckIn = e.target.value;
                            setNewGuest({
                              ...newGuest, 
                              check_in: newCheckIn
                            });
                          }}
                          className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelCheckOut}</label>
                        <input 
                          required type="date" 
                          value={newGuest.check_out}
                          onChange={e => {
                            const val = e.target.value;
                            if (val && val === newGuest.check_in) {
                              alert(content.dateError);
                              return;
                            }
                            setNewGuest({...newGuest, check_out: val});
                          }}
                          className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelGuests}</label>
                        <input 
                          required type="number" min="1" max="10"
                          value={newGuest.guests_count}
                          onChange={e => setNewGuest({...newGuest, guests_count: parseInt(e.target.value)})}
                          className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelLoc}</label>
                      <select 
                        required
                        value={newGuest.unit}
                        onChange={e => setNewGuest({...newGuest, unit: e.target.value})}
                        className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors"
                      >
                        <option value="Holiday Apartment">Holiday Apartment</option>
                        <option value="Luxury House">Luxury House</option>
                      </select>
                    </div>
                  </>
                )}

                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#3b2b1f] text-white py-4 rounded-xl uppercase tracking-widest text-[13px] font-bold hover:bg-[#a67c52] transition-all shadow-md mt-4"
                >
                  {familyMembersLeft > 0 ? (familyMembersLeft === 1 ? content.finishRegistration : `Salva e continua (${familyMembersLeft})`) : (editingGuest ? content.update : content.save)}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Add Review Modal */}
        {showAddReviewForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
            >
              <div className="p-8 border-b border-[#3b2b1f]/10 flex justify-between items-center">
                <h3 className="font-serif text-xl tracking-widest uppercase text-[#3D2B1F]">
                  {content.reviewModalTitle}
                </h3>
                <button onClick={() => setShowAddReviewForm(false)} className="text-[#3D2B1F]/30 hover:text-[#3D2B1F]">
                  <X size={24} />
                </button>
              </div>

              <div className="px-8 pt-8">
                <div className="bg-[#F5F0E8] p-6 rounded-2xl border border-[#3b2b1f]/10">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50 block mb-3">
                    {content.extractLabel}
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D2B1F]/30" />
                      <input 
                        type="text" 
                        value={extractUrl}
                        onChange={e => setExtractUrl(e.target.value)}
                        placeholder={content.extractPlaceholder}
                        className="w-full bg-white border border-[#3b2b1f]/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-[#a67c52] transition-all"
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={handleExtractReview}
                      disabled={!extractUrl || isExtracting}
                      className="bg-[#3D2B1F] text-white px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-[#a67c52] transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isExtracting ? <Loader2 size={14} className="animate-spin" /> : null}
                      {isExtracting ? content.extracting : content.extractBtn}
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAddReview} className="p-4 md:p-8 space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelName}</label>
                    <input 
                      required type="text" 
                      value={newReview.name}
                      placeholder="es. Marco Rossi"
                      onChange={e => setNewReview({...newReview, name: e.target.value})}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelPlatform}</label>
                    <select 
                      required
                      value={newReview.platform}
                      onChange={e => setNewReview({...newReview, platform: e.target.value})}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors"
                    >
                      <option value="Airbnb">Airbnb</option>
                      <option value="Booking.com">Booking.com</option>
                      <option value="Google">Google</option>
                      <option value="TripAdvisor">TripAdvisor</option>
                      <option value="HomeToGo">HomeToGo</option>
                      <option value="Expedia">Expedia</option>
                      <option value="VRBO">VRBO</option>
                      <option value="Agoda">Agoda</option>
                      <option value="Direct">Diretta</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelDate}</label>
                    <input 
                      required type="text" 
                      value={newReview.date}
                      placeholder="es. Gennaio 2026"
                      onChange={e => setNewReview({...newReview, date: e.target.value})}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelStars}</label>
                    <input 
                      required type="number" min="1" max="5"
                      value={newReview.stars}
                      onChange={e => setNewReview({...newReview, stars: parseInt(e.target.value)})}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelQuote}</label>
                  <textarea 
                    required rows={4}
                    value={newReview.quote}
                    onChange={e => setNewReview({...newReview, quote: e.target.value})}
                    placeholder="Incolla il testo della recensione qui (preferibilmente in inglese/italiano)..."
                    className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 bg-[#F5F0E8]/50 p-4 rounded-xl border border-[#3b2b1f]/5">
                  <input 
                    type="checkbox" 
                    id="autoTranslate"
                    checked={autoTranslate}
                    onChange={e => setAutoTranslate(e.target.checked)}
                    className="w-4 h-4 rounded border-[#3b2b1f]/20 text-[#a67c52] focus:ring-[#a67c52]"
                  />
                  <label htmlFor="autoTranslate" className="text-xs font-bold text-[#3D2B1F]/70 uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                    <Languages size={14} className="text-[#a67c52]" />
                    {content.autoTranslate}
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={isSavingReview}
                  className="w-full bg-[#3b2b1f] text-white py-4 rounded-xl uppercase tracking-widest text-[13px] font-bold hover:bg-[#a67c52] transition-all shadow-md mt-4 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSavingReview ? <Loader2 size={18} className="animate-spin" /> : null}
                  {isSavingReview ? content.saving : content.saveReview}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
