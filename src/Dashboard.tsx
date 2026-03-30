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
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Guest {
  id: string;
  name: string;
  surname: string;
  documentId: string;
  nationality: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  unit: string;
}

interface Review {
  id: string;
  name: string;
  platform: string;
  date: string;
  stars: number;
  quote: string;
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
      reviewModalTitle: "Nuova Recensione", 
      labelName: "Nome", 
      labelSurname: "Cognome", 
      labelDoc: "Documento (ID/Passport)", 
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
      saveReview: "Salva Recensione", 
      confirmDelete: "Sei sicuro di voler eliminare?", 
      dateError: "La data di check-out non può essere uguale alla data di check-in.",
      extractLabel: "Carica da Link (Airbnb)",
      extractPlaceholder: "Incolla il link della recensione...",
      extractBtn: "Estrai Dati",
      autoTranslate: "Traduci in tutte le lingue",
      extracting: "Estrazione in corso...",
      saving: "Salvataggio..."
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
      reviewModalTitle: "New Review", 
      labelName: "Name", 
      labelSurname: "Surname", 
      labelDoc: "Document", 
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
      saveReview: "Save Review", 
      confirmDelete: "Are you sure you want to delete?", 
      dateError: "Check-out date cannot be the same as check-in date.",
      extractLabel: "Load from Link (Airbnb)",
      extractPlaceholder: "Paste review link here...",
      extractBtn: "Extract Data",
      autoTranslate: "Translate to all languages",
      extracting: "Extracting...",
      saving: "Saving..."
    }
  };
  const content = t[lang] || t.en;

  const [guests, setGuests] = useState<Guest[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<CookieStats>({ accepted: 0, rejected: 0 });
  const [activeTab, setActiveTab] = useState<'guests' | 'stats' | 'reviews'>('guests');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);
  const [newGuest, setNewGuest] = useState<Omit<Guest, 'id'>>({
    name: '',
    surname: '',
    documentId: '',
    nationality: '',
    checkIn: '',
    checkOut: '',
    guestsCount: 1,
    unit: 'Holiday Apartment'
  });
  const [newReview, setNewReview] = useState<Omit<Review, 'id'>>({
    name: '',
    platform: 'Airbnb',
    date: new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' }),
    stars: 5,
    quote: ''
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [extractUrl, setExtractUrl] = useState('');
  const [autoTranslate, setAutoTranslate] = useState(true);

  useEffect(() => {
    // Load guests
    const savedGuests = localStorage.getItem('villa_angela_guests');
    if (savedGuests) setGuests(JSON.parse(savedGuests));

    // Load stats
    const savedStats = localStorage.getItem('villa_angela_cookie_stats');
    if (savedStats) setStats(JSON.parse(savedStats));

    // Load custom reviews
    const savedReviews = localStorage.getItem('villa_angela_custom_reviews');
    if (savedReviews) setReviews(JSON.parse(savedReviews));
  }, []);

  const sendEmailUpdate = async (guestList: Guest[]) => {
    setIsSyncing(true);
    const headers = ["Nome", "Cognome", "Documento", "Nazionalita", "Check-in", "Check-out", "Ospiti", "Locazione"];
    const rows = guestList.map(g => [
      g.name, g.surname, g.documentId, g.nationality, g.checkIn, g.checkOut, g.guestsCount, g.unit
    ]);
    const csvString = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    
    try {
      await fetch('https://formsubmit.co/ajax/holidayvillaangela@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "Aggiornamento Automatica Banca Dati Ospiti - Villa Angela",
          message: "Dati aggiornati degli ospiti (CSV):\n\n" + csvString,
          _template: "table",
          _captcha: "false"
        })
      });
      console.log('Sync successful');
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const saveGuests = (updatedGuests: Guest[]) => {
    setGuests(updatedGuests);
    localStorage.setItem('villa_angela_guests', JSON.stringify(updatedGuests));
    // Trigger automatic silent email sync
    sendEmailUpdate(updatedGuests);
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    const guestWithId: Guest = { ...newGuest, id: Date.now().toString() };
    const updated = [guestWithId, ...guests];
    saveGuests(updated);
    setShowAddForm(false);
    setNewGuest({
      name: '',
      surname: '',
      documentId: '',
      nationality: '',
      checkIn: '',
      checkOut: '',
      guestsCount: 1,
      unit: 'Holiday Apartment'
    });
  };

  const handleDeleteGuest = (id: string) => {
    if (window.confirm(content.confirmDelete)) {
      const updated = guests.filter(g => g.id !== id);
      saveGuests(updated);
    }
  };

  const saveReviews = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
    localStorage.setItem('villa_angela_custom_reviews', JSON.stringify(updatedReviews));
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
      // Save to backend (JSON files)
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          review: newReview,
          autoTranslate 
        })
      });
      
      if (!response.ok) throw new Error('Failed to save to backend');
      
      // Also update local state for immediate feedback
      const reviewWithId: Review = { ...newReview, id: Date.now().toString() };
      const updated = [reviewWithId, ...reviews];
      setReviews(updated);
      localStorage.setItem('villa_angela_custom_reviews', JSON.stringify(updated));
      
      setShowAddReviewForm(false);
      setNewReview({
        name: '',
        platform: 'Airbnb',
        date: new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' }),
        stars: 5,
        quote: ''
      });
    } catch (error) {
      console.error('Save failed:', error);
      alert('Errore durante il salvataggio della recensione.');
    } finally {
      setIsSavingReview(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (window.confirm(content.confirmDelete)) {
      try {
        await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, action: 'delete' })
        });
        const updated = reviews.filter(r => r.id !== id);
        saveReviews(updated);
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Errore durante l\'eliminazione della recensione.');
      }
    }
  };

  const exportToCSV = () => {
    const headers = ["Nome", "Cognome", "Documento", "Nazionalita", "Check-in", "Check-out", "Ospiti", "Locazione"];
    const rows = guests.map(g => [
      g.name, g.surname, g.documentId, g.nationality, g.checkIn, g.checkOut, g.guestsCount, g.unit
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

  const filteredGuests = guests.filter(g => 
    `${g.name} ${g.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.documentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60">{content.tableGuest}</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60">{content.tableDoc}</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60">{content.tableCheck}</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60">{content.tableLoc}</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/60 text-center">{content.tableCount}</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3b2b1f]/5">
                  {filteredGuests.length > 0 ? filteredGuests.map((guest) => (
                    <tr key={guest.id} className="hover:bg-[#3b2b1f]/[0.02] transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-serif text-[1.1rem] text-[#3D2B1F]">{guest.name} {guest.surname}</div>
                        <div className="text-[11px] font-medium text-[#a67c52] uppercase tracking-wider mt-1">{guest.nationality}</div>
                      </td>
                      <td className="px-6 py-5">
                        <code className="bg-[#3b2b1f]/5 px-2 py-1 rounded text-xs font-bold text-[#3D2B1F]/70">{guest.documentId}</code>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#3D2B1F]">
                          <Calendar size={14} className="text-[#a67c52]" />
                          {guest.checkIn} → {guest.checkOut}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[11px] font-bold text-[#3D2B1F] uppercase tracking-wider">{guest.unit}</div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="bg-[#a67c52]/10 text-[#a67c52] px-3 py-1 rounded-full text-xs font-bold">{guest.guestsCount}</span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="p-2 text-[#3b2b1f]/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  )) : (
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
                <h3 className="font-serif text-[1.5rem] text-[#3D2B1F] mb-2">{stats.accepted}</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#a67c52]">{content.accepted}</p>
                <div className="w-full h-2 bg-green-100 rounded-full mt-8 overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-1000" 
                    style={{ width: `${(stats.accepted / (stats.accepted + stats.rejected || 1)) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-[#3b2b1f]/10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mb-6 shadow-sm">
                  <AlertCircle size={40} className="text-red-400" />
                </div>
                <h3 className="font-serif text-[1.5rem] text-[#3D2B1F] mb-2">{stats.rejected}</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#a67c52]">{content.rejected}</p>
                <div className="w-full h-2 bg-red-100 rounded-full mt-8 overflow-hidden">
                  <div 
                    className="h-full bg-red-400 transition-all duration-1000" 
                    style={{ width: `${(stats.rejected / (stats.accepted + stats.rejected || 1)) * 100}%` }}
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
                        <code className="bg-[#3b2b1f]/5 px-2 py-1 rounded text-xs font-bold text-[#3D2B1F]/70">{review.platform}</code>
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
                  {content.modalTitle}
                </h3>
                <button onClick={() => setShowAddForm(false)} className="text-[#3D2B1F]/30 hover:text-[#3D2B1F]">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddGuest} className="p-4 md:p-8 space-y-4 md:space-y-6">
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
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelDoc}</label>
                    <input 
                      required type="text" 
                      value={newGuest.documentId}
                      onChange={e => setNewGuest({...newGuest, documentId: e.target.value})}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelNat}</label>
                    <input 
                      required type="text" 
                      value={newGuest.nationality}
                      onChange={e => setNewGuest({...newGuest, nationality: e.target.value})}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelCheckIn}</label>
                    <input 
                      required type="date" 
                      min={today}
                      value={newGuest.checkIn}
                      onChange={e => {
                        const newCheckIn = e.target.value;
                        if (newCheckIn && newCheckIn < today) return;
                        setNewGuest({
                          ...newGuest, 
                          checkIn: newCheckIn,
                          checkOut: (newCheckIn && newGuest.checkOut && newCheckIn >= newGuest.checkOut) ? '' : newGuest.checkOut
                        });
                      }}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelCheckOut}</label>
                    <input 
                      required type="date" 
                      min={newGuest.checkIn || today}
                      value={newGuest.checkOut}
                      onChange={e => {
                        const val = e.target.value;
                        if (val && val < today) return;
                        if (val && val === newGuest.checkIn) {
                          alert(content.dateError);
                          return;
                        }
                        setNewGuest({...newGuest, checkOut: val});
                      }}
                      className="w-full bg-[#F5F0E8]/50 border border-[#3b2b1f]/10 rounded-xl px-4 py-3 outline-none focus:border-[#a67c52] transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#3D2B1F]/50">{content.labelGuests}</label>
                    <input 
                      required type="number" min="1" max="10"
                      value={newGuest.guestsCount}
                      onChange={e => setNewGuest({...newGuest, guestsCount: parseInt(e.target.value)})}
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

                <button 
                  type="submit"
                  className="w-full bg-[#3b2b1f] text-white py-4 rounded-xl uppercase tracking-widest text-[13px] font-bold hover:bg-[#a67c52] transition-all shadow-md mt-4"
                >
                  {content.save}
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
                      <option value="HomeToGo">HomeToGo</option>
                      <option value="Expedia">Expedia</option>
                      <option value="VRBO">VRBO</option>
                      <option value="Agoda">Agoda</option>
                      <option value="Google">Google</option>
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
