import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, Edit3, Building2, Shield, MessageSquare, Bot, Heart, Highlighting, 
  Settings, Award, Share2, Video, FileText, Send, Sparkles, CheckCircle2, 
  TrendingUp, Users, DollarSign, Globe, Plus, Trash2, Eye, ExternalLink,
  Search, Sliders, Moon, Sun, BookMarked, Download, X, Play, RefreshCw, Layers
} from 'lucide-react';

const INITIAL_BOOKS = [
  {
    id: 'b1',
    title: 'Cien Años de Sombras en el Cosmos',
    author: 'Elena Rostova',
    genre: 'Ciencia Ficción / Realismo Mágico',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    synopsis: 'Una epopeya galáctica donde la poesía trasciende el espacio-tiempo en la colonia Orquídea Beta.',
    likes: 12450,
    chapters: [
      {
        id: 'c1',
        title: 'Capítulo 1: El Susurro de las Estrellas',
        content: `La noche en el asteroide Alpha no era oscura, sino teñida de un violeta profundo que quemaba los ojos de quien intentara descifrarla. Elena ajustó su visor óptico, sintiendo el frío metálico contra los pómulos. Durante siglos, los poetas estelares habían hablado de la Flor Imperial, un misterio cuántico que florecía únicamente en el vacío espacial.

"No deberías mirar tan fijo", advirtió Mateo, apoyado en el marco hidropónico del invernadero. "Las estrellas te devuelven la mirada si te descuidas".

Elena sonrió sin apartar la vista. Las señales cuánticas emitían una melodía sorda en su receptor. La humanidad había viajado millones de años luz solo para descubrir que la soledad del universo era un idioma que aún no aprendían a traducir.`
      },
      {
        id: 'c2',
        title: 'Capítulo 2: Eco en la Cámara Gravitacional',
        content: `El motor de curvatura pulsaba suavemente en la sala central. Con cada ciclo, los fragmentos de memoria colectiva resonaban en las pantallas táctiles. Mateo desplegó el mapa estelar mientras revisaba las propuestas editoriales que llegaban de la Tierra.

"Una editorial física en Madrid quiere imprimir nuestro diario de a bordo", comentó con cautela.

Elena se giró despacio. "¿Impresión en papel vegetal con código QR cuántico? Solo aceptamos si respetan el 70% de regalías y garantizan distribución en Latinoamérica y Asia".`
      }
    ]
  },
  {
    id: 'b2',
    title: 'El Jardín del Alquimista Urbano',
    author: 'Carlos Benítez',
    genre: 'Fantasía Urbana',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    synopsis: 'Entre las calles de Barcelona se oculta un taller botánico capaz de cambiar el destino de las palabras.',
    likes: 8930,
    chapters: [
      {
        id: 'c21',
        title: 'Capítulo 1: Botánica en el Asfalto',
        content: `Las orquídeas negras solo germinan cuando alguien escribe una verdad desgarradora. Carlos observó el diminuto brote que emergía del concreto cerca de la estación del metro. Saco su libreta de cuero gastado y escribió las primeras tres líneas de su nuevo manifiesto literario.`
      }
    ]
  }
];

const INITIAL_WORKSHOPS = [
  { id: 'w1', title: 'Worldbuilding para Novela de Fantasía y Ciencia Ficción', instructor: 'Sofía Martínez (Editorial Lumina)', date: '15 Octubre, 2026', seats: '12 cupos' },
  { id: 'w2', title: 'Derechos de Autor e Industria Editorial Internacional', instructor: 'Dr. Alejandro Ruiz (Abogado Editorial)', date: '22 Octubre, 2026', seats: 'Aforo Abierto' },
  { id: 'w3', title: 'Estrategias de Marketing en Instagram y Tiktok para Autores', instructor: 'Floria AI Marketing Lab', date: '30 Octubre, 2026', seats: 'Gratuito' }
];

const INITIAL_PROPOSALS = [
  {
    id: 'prop-1',
    bookTitle: 'Cien Años de Sombras en el Cosmos',
    authorName: 'Elena Rostova',
    publisherName: 'Editorial Planeta Digital',
    status: 'Pendiente',
    date: '10 Oct, 2026',
    royalties: '18%',
    copies: 5000,
    distribution: 'España, México, Colombia y Argentina'
  }
];

const INITIAL_MESSAGES = [
  { id: 'm1', sender: 'Floria (Asistente)', role: 'IA Assistant', text: '¡Bienvenido a Orquídea! ¿En qué puedo guiarte hoy?', time: '10:00 AM' },
  { id: 'm2', sender: 'Editorial Planeta Digital', role: 'Editorial Verificada', text: 'Hola Elena, hemos leído tus primeros capítulos y nos encantaría enviarte un contrato de pre-impresión.', time: '11:15 AM' }
];

export default function App() {
  // Global States
  const [currentRole, setCurrentRole] = useState('lector'); // lector | escritor | editorial | admin
  const [activeTab, setActiveTab] = useState('explore');
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [selectedBook, setSelectedBook] = useState(INITIAL_BOOKS[0]);
  const [selectedChapter, setSelectedChapter] = useState(INITIAL_BOOKS[0].chapters[0]);

  // Reader Settings State
  const [readerTheme, setReaderTheme] = useState('midnight'); // midnight | sepia | light | orchid
  const [fontSize, setFontSize] = useState(18);
  const [highlights, setHighlights] = useState([]);
  const [notes, setNotes] = useState([]);
  const [selectedText, setSelectedText] = useState('');
  const [showTextMenu, setShowTextMenu] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [newNoteText, setNewNoteText] = useState('');
  const [chapterComments, setChapterComments] = useState([
    { id: 'cm1', user: 'LauraG_Lektora', text: '¡Esa descripción del asteroide me dejó con la boca abierta!', date: 'Hace 2 horas' }
  ]);
  const [commentInput, setCommentInput] = useState('');

  // Writer States
  const [myChapters, setMyChapters] = useState(INITIAL_BOOKS[0].chapters);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [quoteForInstagram, setQuoteForInstagram] = useState('La soledad del universo era un idioma que aún no aprendían a traducir.');
  const [igTheme, setIgTheme] = useState('dark');
  const [clubName, setClubName] = useState('');
  const [vlogs, setVlogs] = useState([
    { id: 'v1', title: 'Mi rutina de escritura nocturna + Café y Bocetos', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=500', views: '2.4k' }
  ]);
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);

  // Publisher States
  const [contractForm, setContractForm] = useState({
    bookTitle: 'Cien Años de Sombras en el Cosmos',
    authorName: 'Elena Rostova',
    copies: 3000,
    royalties: 15,
    durationMonths: 24,
    distribution: 'América Latina y Europa',
    marketingBudget: '$2,500 USD',
    extraClauses: 'El autor conserva derechos para adaptación auditiva independiente.'
  });
  const [showContractModal, setShowContractModal] = useState(false);

  // Admin States
  const [featureToggles, setFeatureToggles] = useState({
    workshops: true,
    vlogs: true,
    kdpAutoSync: true,
    editorialProposals: true,
    communityHighlights: true
  });
  const [termsAndConditions, setTermsAndConditions] = useState(
    "TÉRMINOS Y CONDICIONES DE ORQUÍDEA PLATFORM (2026)\n\n1. Propiedad Intelectual: El autor mantiene el 100% de sus derechos sobre sus obras hasta la firma explícita de un contrato editorial.\n2. Regalías en Edición Física: Todas las editoriales verificadas deberán otorgar un mínimo del 10% de regalías en ventas físicas.\n3. Conducta de la Comunidad: Cero tolerancia al plagio y discurso de odio."
  );

  // Floria Bot States
  const [showFloria, setShowFloria] = useState(true);
  const [floriaMessages, setFloriaMessages] = useState([
    { sender: 'Floria', text: '¡Hola! Soy Floria, tu guía botánica en Orquídea 🌸. ¿Qué rol te gustaría explorar hoy?' }
  ]);
  const [floriaInput, setFloriaInput] = useState('');

  // Universal Inbox State
  const [inbox, setInbox] = useState(INITIAL_MESSAGES);
  const [messageText, setMessageText] = useState('');
  const [activeChatUser, setActiveChatUser] = useState('Editorial Planeta Digital');

  // Text selection handler for reader
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const text = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text);
      setMenuPos({
        top: rect.top + window.scrollY - 50,
        left: rect.left + window.scrollX + rect.width / 2 - 80
      });
      setShowTextMenu(true);
    } else {
      setShowTextMenu(false);
    }
  };

  const addHighlight = (color) => {
    if (!selectedText) return;
    setHighlights([...highlights, { id: Date.now(), text: selectedText, color, chapterId: selectedChapter.id }]);
    setShowTextMenu(false);
  };

  const addNote = () => {
    if (!selectedText) return;
    const noteContent = prompt(`Escribe tu nota para: "${selectedText.slice(0, 30)}..."`);
    if (noteContent) {
      setNotes([...notes, { id: Date.now(), text: selectedText, note: noteContent, chapterId: selectedChapter.id }]);
    }
    setShowTextMenu(false);
  };

  const handleSendFloria = (customText) => {
    const query = customText || floriaInput;
    if (!query) return;

    const userMsg = { sender: 'Tú', text: query };
    let replyText = 'Entendido. Estoy aquí para ayudarte a sacar el máximo provecho de Orquídea.';

    const lower = query.toLowerCase();
    if (lower.includes('lector') || lower.includes('leer')) {
      replyText = 'Como Lector en Orquídea puedes personalizar tu tipografía, subrayar en colores, guardar notas y unirte a clubes de lectura.';
    } else if (lower.includes('escritor') || lower.includes('publicar')) {
      replyText = '¡Excelente! Los escritores pueden crear talleres, generar imágenes para Instagram, subir Vlogs y enviar propuestas a Editoriales Verificadas.';
    } else if (lower.includes('editorial') || lower.includes('imprimir')) {
      replyText = 'Las Editoriales en Orquídea cuentan con un distintivo de verificación, creador de contratos con cláusulas automáticas y sincronización KDP.';
    } else if (lower.includes('contrato') || lower.includes('regalías')) {
      replyText = 'Nuestros contratos incluyen cláusulas estrictas: % de regalías, distribución internacional y compromiso publicitario.';
    }

    setFloriaMessages(prev => [...prev, userMsg, { sender: 'Floria', text: replyText }]);
    setFloriaInput('');
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setInbox([
      ...inbox,
      {
        id: Date.now().toString(),
        sender: `Usuario (${currentRole.toUpperCase()})`,
        role: currentRole,
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setMessageText('');
  };

  const getThemeStyles = () => {
    switch (readerTheme) {
      case 'sepia':
        return 'bg-[#fbf0d9] text-[#433422] border-[#e6d5b8]';
      case 'light':
        return 'bg-white text-gray-900 border-gray-200';
      case 'orchid':
        return 'bg-[#2A1730] text-[#F3E5F5] border-[#EC407A]/30';
      case 'midnight':
      default:
        return 'bg-[#120914] text-[#E0E0E0] border-[#2A1730]';
    }
  };

  return (
    <div className="min-h-screen bg-[#120914] text-[#F3E5F5] font-sans antialiased flex flex-col selection:bg-[#EC407A] selection:text-white">
      {}
      <header className="sticky top-0 z-40 bg-[#1E1022]/90 backdrop-blur-md border-b border-[#EC407A]/20 px-4 lg:px-8 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D81B60] via-[#EC407A] to-[#00E5FF] flex items-center justify-center shadow-md shadow-[#D81B60]/30 animate-pulse">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-[#EC407A] via-[#F3E5F5] to-[#00E5FF] bg-clip-text text-transparent">
              ORQUÍDEA
            </h1>
            <p className="text-[10px] text-pink-300/70 tracking-widest uppercase -mt-1 font-semibold">Comunidad Literaria Global</p>
          </div>
        </div>

        {/* Role Switcher Pill */}
        <div className="flex items-center bg-[#120914] p-1 rounded-full border border-[#EC407A]/30 shadow-inner">
          <button 
            onClick={() => { setCurrentRole('lector'); setActiveTab('explore'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${currentRole === 'lector' ? 'bg-[#D81B60] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Lector
          </button>
          <button 
            onClick={() => { setCurrentRole('escritor'); setActiveTab('studio'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${currentRole === 'escritor' ? 'bg-[#D81B60] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Escritor
          </button>
          <button 
            onClick={() => { setCurrentRole('editorial'); setActiveTab('publisher-dashboard'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${currentRole === 'editorial' ? 'bg-[#D81B60] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <Building2 className="w-3.5 h-3.5" /> Editorial <CheckCircle2 className="w-3 h-3 text-[#00E676]" />
          </button>
          <button 
            onClick={() => { setCurrentRole('admin'); setActiveTab('admin-panel'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${currentRole === 'admin' ? 'bg-[#00E5FF] text-black shadow-md font-bold' : 'text-gray-400 hover:text-white'}`}
          >
            <Shield className="w-3.5 h-3.5" /> Admin
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('inbox')}
            className={`relative p-2 rounded-xl border transition-all ${activeTab === 'inbox' ? 'bg-[#EC407A]/20 border-[#EC407A]' : 'border-white/10 hover:bg-white/5'}`}
            title="Buzón de Mensajes"
          >
            <MessageSquare className="w-5 h-5 text-pink-300" />
            <span className="absolute -top-1 -right-1 bg-[#00E676] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          <button 
            onClick={() => setShowFloria(!showFloria)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#D81B60] to-[#EC407A] text-white px-3 py-1.5 rounded-xl font-medium text-xs shadow-md hover:opacity-90 transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Floria AI</span>
          </button>
        </div>
      </header>

      {}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#1E1022]/60 border-r border-[#EC407A]/10 p-4 flex flex-col gap-2 shrink-0">
          <p className="text-[11px] font-bold tracking-wider text-pink-400/60 uppercase px-3 mb-1">
            Menú de {currentRole.toUpperCase()}
          </p>

          {currentRole === 'lector' && (
            <>
              <button 
                onClick={() => setActiveTab('explore')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'explore' ? 'bg-[#D81B60]/20 text-[#EC407A] border border-[#EC407A]/30' : 'text-gray-300 hover:bg-white/5'}`}
              >
                <BookOpen className="w-4 h-4" /> Catálogo e Historias
              </button>
              <button 
                onClick={() => setActiveTab('reader-mode')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'reader-mode' ? 'bg-[#D81B60]/20 text-[#EC407A] border border-[#EC407A]/30' : 'text-gray-300 hover:bg-white/5'}`}
              >
                <BookMarked className="w-4 h-4" /> Lector Inmersivo
              </button>
            </>
          )}

          {currentRole === 'escritor' && (
            <>
              <button 
                onClick={() => setActiveTab('studio')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'studio' ? 'bg-[#D81B60]/20 text-[#EC407A] border border-[#EC407A]/30' : 'text-gray-300 hover:bg-white/5'}`}
              >
                <Edit3 className="w-4 h-4" /> Taller de Escritura
              </button>
              <button 
                onClick={() => setActiveTab('potential-hub')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'potential-hub' ? 'bg-[#D81B60]/20 text-[#EC407A] border border-[#EC407A]/30' : 'text-gray-300 hover:bg-white/5'}`}
              >
                <Award className="w-4 h-4" /> Escritor con Potencial
              </button>
              <button 
                onClick={() => setActiveTab('instagram-generator')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'instagram-generator' ? 'bg-[#D81B60]/20 text-[#EC407A] border border-[#EC407A]/30' : 'text-gray-300 hover:bg-white/5'}`}
              >
                <Share2 className="w-4 h-4" /> Tarjetas para Instagram
              </button>
            </>
          )}

          {currentRole === 'editorial' && (
            <>
              <button 
                onClick={() => setActiveTab('publisher-dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'publisher-dashboard' ? 'bg-[#D81B60]/20 text-[#EC407A] border border-[#EC407A]/30' : 'text-gray-300 hover:bg-white/5'}`}
              >
                <Building2 className="w-4 h-4" /> Matchmaking de Talentos
              </button>
              <button 
                onClick={() => setActiveTab('contracts-portal')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'contracts-portal' ? 'bg-[#D81B60]/20 text-[#EC407A] border border-[#EC407A]/30' : 'text-gray-300 hover:bg-white/5'}`}
              >
                <FileText className="w-4 h-4" /> Impresión & Contratos
              </button>
            </>
          )}

          {currentRole === 'admin' && (
            <>
              <button 
                onClick={() => setActiveTab('admin-panel')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'admin-panel' ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30' : 'text-gray-300 hover:bg-white/5'}`}
              >
                <Shield className="w-4 h-4" /> Panel Administradora
              </button>
            </>
          )}

          <hr className="my-2 border-white/10" />

          <button 
            onClick={() => setActiveTab('inbox')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'inbox' ? 'bg-[#D81B60]/20 text-[#EC407A] border border-[#EC407A]/30' : 'text-gray-300 hover:bg-white/5'}`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4" /> Buzón Inter-Roles
            </div>
            <span className="bg-[#EC407A] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">2</span>
          </button>

          {/* Publisher Badge Status Widget */}
          <div className="mt-auto p-3 rounded-2xl bg-[#2A1730]/60 border border-white/10 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
              <span className="font-bold text-white">Sello Orquídea Verificado</span>
            </div>
            <p className="text-pink-200/70 text-[11px]">Garantía de derechos de autor y publicación transparente internacional.</p>
          </div>
        </aside>

        {/* Main Interactive Screen Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-[#120914]/90 relative">

          {}
          {activeTab === 'explore' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">Catálogo Global de Historias</h2>
                  <p className="text-sm text-pink-200/70">Lee capítulos ilimitados de autores emergentes e internacionales.</p>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Buscar libros, autores, géneros..." 
                    className="w-full bg-[#1E1022] border border-[#EC407A]/30 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#EC407A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map((b) => (
                  <div key={b.id} className="bg-[#1E1022]/80 border border-[#EC407A]/20 rounded-2xl p-4 flex gap-4 hover:border-[#EC407A]/50 transition-all shadow-lg group">
                    <img src={b.cover} alt={b.title} className="w-28 h-40 object-cover rounded-xl shadow-md group-hover:scale-105 transition-all" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#D81B60]/20 text-[#EC407A] border border-[#D81B60]/30">
                          {b.genre}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2 group-hover:text-[#EC407A] transition-colors">{b.title}</h3>
                        <p className="text-xs text-pink-300/80 mb-2">Por {b.author}</p>
                        <p className="text-xs text-gray-300 line-clamp-2">{b.synopsis}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                        <span className="flex items-center gap-1 text-xs text-pink-300">
                          <Heart className="w-3.5 h-3.5 fill-[#EC407A] text-[#EC407A]" /> {b.likes.toLocaleString()}
                        </span>
                        <button 
                          onClick={() => {
                            setSelectedBook(b);
                            setSelectedChapter(b.chapters[0]);
                            setActiveTab('reader-mode');
                          }}
                          className="bg-[#D81B60] hover:bg-[#EC407A] text-white px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                        >
                          <BookOpen className="w-3.5 h-3.5" /> Leer Gratis
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          {activeTab === 'reader-mode' && selectedBook && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Customization Toolbar */}
              <div className="bg-[#1E1022] border border-[#EC407A]/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-pink-300 font-medium">Tema de lectura:</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => setReaderTheme('midnight')} className={`w-6 h-6 rounded-full bg-[#120914] border-2 ${readerTheme === 'midnight' ? 'border-[#00E5FF]' : 'border-gray-600'}`} title="Medianoche" />
                    <button onClick={() => setReaderTheme('orchid')} className={`w-6 h-6 rounded-full bg-[#2A1730] border-2 ${readerTheme === 'orchid' ? 'border-[#EC407A]' : 'border-gray-600'}`} title="Orquídea" />
                    <button onClick={() => setReaderTheme('sepia')} className={`w-6 h-6 rounded-full bg-[#fbf0d9] border-2 ${readerTheme === 'sepia' ? 'border-amber-600' : 'border-gray-600'}`} title="Sepia" />
                    <button onClick={() => setReaderTheme('light')} className={`w-6 h-6 rounded-full bg-white border-2 ${readerTheme === 'light' ? 'border-gray-800' : 'border-gray-400'}`} title="Claro" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-pink-300">Fuente:</span>
                  <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="px-2 py-1 bg-white/10 rounded text-xs hover:bg-white/20">A-</button>
                  <span className="text-xs font-mono">{fontSize}px</span>
                  <button onClick={() => setFontSize(Math.min(26, fontSize + 2))} className="px-2 py-1 bg-white/10 rounded text-xs hover:bg-white/20">A+</button>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      const updated = books.map(bk => bk.id === selectedBook.id ? {...bk, likes: bk.likes + 1} : bk);
                      setBooks(updated);
                      setSelectedBook({...selectedBook, likes: selectedBook.likes + 1});
                    }}
                    className="flex items-center gap-1.5 bg-[#D81B60]/20 border border-[#EC407A]/40 text-[#EC407A] px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#D81B60] hover:text-white transition-all"
                  >
                    <Heart className="w-4 h-4 fill-current" /> {selectedBook.likes} Likes
                  </button>
                </div>
              </div>

              {/* Selection Context Menu Popup */}
              {showTextMenu && (
                <div 
                  style={{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }}
                  className="fixed z-50 bg-[#1E1022] border border-[#EC407A] shadow-2xl rounded-xl p-2 flex items-center gap-2 animate-bounce"
                >
                  <button onClick={() => addHighlight('#FFD54F')} className="w-5 h-5 rounded-full bg-yellow-400 hover:scale-110" title="Subrayado Amarillo" />
                  <button onClick={() => addHighlight('#EC407A')} className="w-5 h-5 rounded-full bg-pink-500 hover:scale-110" title="Subrayado Rosa" />
                  <button onClick={() => addHighlight('#00E5FF')} className="w-5 h-5 rounded-full bg-cyan-400 hover:scale-110" title="Subrayado Cían" />
                  <div className="w-px h-4 bg-white/20" />
                  <button onClick={addNote} className="text-xs bg-[#D81B60] text-white px-2 py-1 rounded hover:bg-[#EC407A]">
                    + Nota
                  </button>
                </div>
              )}

              {/* Reader Document Canvas */}
              <div 
                onMouseUp={handleTextSelection}
                className={`p-8 lg:p-12 rounded-3xl border shadow-2xl transition-all ${getThemeStyles()}`}
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
              >
                <div className="border-b border-current/20 pb-4 mb-6">
                  <h2 className="text-2xl font-bold">{selectedBook.title}</h2>
                  <p className="text-sm opacity-80">Por {selectedBook.author} • {selectedChapter.title}</p>
                </div>

                <div className="whitespace-pre-line font-serif selection:bg-[#EC407A]/40">
                  {selectedChapter.content}
                </div>

                {/* Inline Saved Highlights / Notes for this Chapter */}
                {(highlights.length > 0 || notes.length > 0) && (
                  <div className="mt-10 pt-6 border-t border-current/20 text-xs font-sans space-y-3">
                    <h4 className="font-bold uppercase tracking-wider opacity-90">Tus Marcadores y Notas</h4>
                    {highlights.map(h => (
                      <div key={h.id} className="p-2 rounded bg-black/10 border-l-4" style={{ borderColor: h.color }}>
                        "{h.text}"
                      </div>
                    ))}
                    {notes.map(n => (
                      <div key={n.id} className="p-2.5 rounded bg-black/10 border border-current/20">
                        <span className="font-bold opacity-75">Cita: "{n.text}"</span>
                        <p className="mt-1 font-semibold text-pink-500">Nota: {n.note}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reader Comments Drawer */}
              <div className="bg-[#1E1022] border border-[#EC407A]/20 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#EC407A]" /> Comentarios del Capítulo
                </h3>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Escribe tu opinión sobre este capítulo..."
                    className="flex-1 bg-[#120914] border border-[#EC407A]/30 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                  />
                  <button 
                    onClick={() => {
                      if (!commentInput.trim()) return;
                      setChapterComments([...chapterComments, { id: Date.now(), user: 'Tú (Lector)', text: commentInput, date: 'Ahora' }]);
                      setCommentInput('');
                    }}
                    className="bg-[#D81B60] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#EC407A]"
                  >
                    Publicar
                  </button>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {chapterComments.map(c => (
                    <div key={c.id} className="bg-[#120914]/60 p-3 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-[#EC407A]">{c.user}</span>
                        <span className="text-[10px] text-gray-400">{c.date}</span>
                      </div>
                      <p className="text-xs text-gray-200">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {}
          {activeTab === 'studio' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Estudio de Escritura</h2>
                  <p className="text-sm text-pink-200/70">Gestiona tus borradores, impulsa tu alcance y envía propuestas a editoriales.</p>
                </div>
                <button 
                  onClick={() => {
                    const newChap = { id: `c-${Date.now()}`, title: 'Nuevo Capítulo', content: 'Escribe aquí tu nuevo capítulo...' };
                    setMyChapters([...myChapters, newChap]);
                  }}
                  className="bg-[#D81B60] hover:bg-[#EC407A] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Crear Capítulo
                </button>
              </div>

              {/* Writer Tools Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Editor Panel */}
                <div className="lg:col-span-2 bg-[#1E1022] border border-[#EC407A]/30 rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white">Editor de Capítulos</h3>
                  
                  <input 
                    type="text" 
                    value={editingTitle || (myChapters[0]?.title ?? '')}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    placeholder="Título del Capítulo"
                    className="w-full bg-[#120914] border border-[#EC407A]/30 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                  />

                  <textarea 
                    rows={12}
                    value={editingContent || (myChapters[0]?.content ?? '')}
                    onChange={(e) => setEditingContent(e.target.value)}
                    placeholder="Escribe la historia..."
                    className="w-full bg-[#120914] border border-[#EC407A]/30 rounded-2xl p-4 text-sm text-white font-serif focus:outline-none focus:border-[#EC407A]"
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Guardado automático activado</span>
                    <button 
                      onClick={() => alert('Capítulo guardado con éxito en Orquídea Cloud.')}
                      className="bg-[#00E676] text-black font-bold px-5 py-2 rounded-xl text-xs hover:bg-[#00E676]/80"
                    >
                      Guardar Borrador
                    </button>
                  </div>
                </div>

                {/* Campaign & Direct Submission Side Widget */}
                <div className="space-y-6">
                  {/* Proposal Submission Widget */}
                  <div className="bg-[#1E1022] border border-[#EC407A]/30 rounded-2xl p-5 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#00E5FF]" /> Propuesta Editorial Directa
                    </h3>
                    <p className="text-xs text-gray-300">Envía tu manuscrito revisado a sellos verificados internacionalmente.</p>
                    <button 
                      onClick={() => {
                        alert('Tu propuesta fue enviada a 3 editoriales verificadas (Planeta Digital, Lumina, Madrid Press).');
                      }}
                      className="w-full bg-gradient-to-r from-[#D81B60] to-[#00E5FF] text-white py-2 rounded-xl text-xs font-bold shadow-md hover:opacity-90"
                    >
                      Enviar Propuesta Global
                    </button>
                  </div>

                  {/* Recommendation Campaign Generator */}
                  <div className="bg-[#1E1022] border border-[#EC407A]/30 rounded-2xl p-5 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#FFD54F]" /> Campaña de Visibilidad
                    </h3>
                    <p className="text-xs text-gray-300">Aumenta la exposición de tu obra en las recomendaciones semanales.</p>
                    <div className="bg-[#120914] p-3 rounded-xl border border-white/10 text-xs space-y-2">
                      <div className="flex justify-between text-gray-300">
                        <span>Alcance Estimado:</span>
                        <span className="font-bold text-[#00E676]">+15,000 Lectores</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Club de Lectura Dedicado:</span>
                        <span className="font-bold text-white">Incluido</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert('Campaña de recomendación activada exitosamente.')}
                      className="w-full bg-[#FFD54F] text-black py-2 rounded-xl text-xs font-bold hover:bg-yellow-400"
                    >
                      Lanzar Campaña
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {}
          {activeTab === 'potential-hub' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#2A1730] via-[#1E1022] to-[#D81B60]/30 p-6 rounded-3xl border border-[#EC407A]/30">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-[#FFD54F]" />
                  <h2 className="text-2xl font-bold text-white">Programa: "Soy un Escritor con Potencial"</h2>
                </div>
                <p className="text-sm text-pink-200/80 max-w-2xl">
                  Accede a mentores de la industria, talleres en vivo y publica tus Vlogs para conectar de forma humana con tus lectores.
                </p>
              </div>

              {/* Workshops Grid */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Talleres Exclusivos de Escritura</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {INITIAL_WORKSHOPS.map(w => (
                    <div key={w.id} className="bg-[#1E1022] border border-[#EC407A]/20 p-5 rounded-2xl space-y-3">
                      <span className="text-[10px] font-bold uppercase bg-[#00E5FF]/20 text-[#00E5FF] px-2.5 py-1 rounded-full">
                        {w.seats}
                      </span>
                      <h4 className="font-bold text-white text-sm">{w.title}</h4>
                      <p className="text-xs text-pink-300">Mentor: {w.instructor}</p>
                      <p className="text-xs text-gray-400">Fecha: {w.date}</p>
                      <button 
                        onClick={() => alert(`Te has inscrito correctamente a: ${w.title}`)}
                        className="w-full bg-[#D81B60] hover:bg-[#EC407A] text-white py-1.5 rounded-xl text-xs font-semibold"
                      >
                        Inscribirse Gratis
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Writer Vlogs Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#EC407A]" /> Mis Vlogs Literarios
                  </h3>
                  <button 
                    onClick={() => {
                      const title = prompt('Título del Vlog:');
                      if (title) {
                        setVlogs([...vlogs, { id: `v-${Date.now()}`, title, url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=500', views: '1' }]);
                      }
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl text-xs font-semibold"
                  >
                    + Subir Vlog
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {vlogs.map(v => (
                    <div key={v.id} className="bg-[#1E1022] border border-white/10 rounded-2xl overflow-hidden group">
                      <div className="relative">
                        <img src={v.url} alt={v.title} className="w-full h-36 object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-10 h-10 text-white fill-current" />
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-xs text-white line-clamp-1">{v.title}</h4>
                        <p className="text-[10px] text-gray-400 mt-1">{v.views} reproducciones</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {}
          {activeTab === 'instagram-generator' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Generador Minimalista para Instagram</h2>
                <p className="text-sm text-pink-200/70">Diseña tarjetas estéticas cuadradas (1080x1080) de tus citas para compartir en redes.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Controls */}
                <div className="bg-[#1E1022] border border-[#EC407A]/30 p-6 rounded-2xl space-y-4">
                  <div>
                    <label className="text-xs text-pink-300 font-medium block mb-2">Cita / Fragmento del libro:</label>
                    <textarea 
                      rows={4}
                      value={quoteForInstagram}
                      onChange={(e) => setQuoteForInstagram(e.target.value)}
                      className="w-full bg-[#120914] border border-[#EC407A]/30 rounded-xl p-3 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-pink-300 font-medium block mb-2">Estilo Visual:</label>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setIgTheme('dark')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${igTheme === 'dark' ? 'border-[#EC407A] bg-[#120914] text-white' : 'border-white/10 text-gray-400'}`}
                      >
                        Oscuro Orquídea
                      </button>
                      <button 
                        onClick={() => setIgTheme('minimal')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${igTheme === 'minimal' ? 'border-[#EC407A] bg-white text-black' : 'border-white/10 text-gray-400'}`}
                      >
                        Blanco Puro
                      </button>
                      <button 
                        onClick={() => setIgTheme('gradient')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border ${igTheme === 'gradient' ? 'border-[#EC407A] bg-gradient-to-br from-[#D81B60] to-[#2A1730] text-white' : 'border-white/10 text-gray-400'}`}
                      >
                        Degradado
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert('Descargando imagen en formato PNG 1080x1080...')}
                    className="w-full bg-[#00E676] text-black py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#00E676]/80"
                  >
                    <Download className="w-4 h-4" /> Descargar para Instagram Post
                  </button>
                </div>

                {/* Preview 1:1 Canvas */}
                <div className="flex justify-center">
                  <div 
                    className={`w-80 h-80 rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative border ${
                      igTheme === 'dark' ? 'bg-[#120914] text-white border-[#EC407A]/30' :
                      igTheme === 'minimal' ? 'bg-white text-gray-900 border-gray-300' :
                      'bg-gradient-to-br from-[#D81B60] via-[#2A1730] to-[#00E5FF] text-white border-none'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] opacity-60 font-mono tracking-widest uppercase">
                      <span>ORQUÍDEA APP</span>
                      <span>@ElenaRostova</span>
                    </div>

                    <p className="font-serif italic text-base leading-relaxed text-center px-2">
                      "{quoteForInstagram}"
                    </p>

                    <div className="text-center text-[10px] opacity-70 font-sans">
                      Capítulo 1 • Cien Años de Sombras
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {}
          {activeTab === 'publisher-dashboard' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    Matchmaking de Talentos Editorial <CheckCircle2 className="w-5 h-5 text-[#00E676]" />
                  </h2>
                  <p className="text-sm text-pink-200/70">Recomendaciones impulsadas por analíticas reales de lectura y engagement.</p>
                </div>
              </div>

              {/* High Potential Writer Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map(b => (
                  <div key={b.id} className="bg-[#1E1022] border border-[#EC407A]/30 p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold uppercase bg-[#00E676]/20 text-[#00E676] px-2.5 py-1 rounded-full">
                          Potencial de Impresión: 96%
                        </span>
                        <h3 className="text-lg font-bold text-white mt-2">{b.title}</h3>
                        <p className="text-xs text-pink-300">Autor: {b.author}</p>
                      </div>
                      <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300 font-mono">
                        {b.likes} Lectores activos
                      </span>
                    </div>

                    <p className="text-xs text-gray-300">{b.synopsis}</p>

                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                      <button 
                        onClick={() => {
                          setContractForm({...contractForm, bookTitle: b.title, authorName: b.author});
                          setShowContractModal(true);
                        }}
                        className="bg-[#D81B60] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#EC407A]"
                      >
                        Generar Contrato de Publicación Física
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          {activeTab === 'contracts-portal' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Portal de Impresión Física e Integraciones</h2>
                  <p className="text-sm text-pink-200/70">Sincronizado con Amazon KDP e Imprentas Digitales Internacionales.</p>
                </div>
                <button 
                  onClick={() => setShowContractModal(true)}
                  className="bg-[#00E676] text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#00E676]/80"
                >
                  + Nuevo Contrato Legal
                </button>
              </div>

              {/* Integrations Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1E1022] border border-[#EC407A]/20 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">Amazon Kindle Direct Publishing (KDP)</h4>
                    <p className="text-xs text-gray-400">Sincronización directa de ISBN y metadatos global.</p>
                  </div>
                  <span className="text-xs bg-[#00E676]/20 text-[#00E676] font-bold px-3 py-1 rounded-full">
                    Conectado
                  </span>
                </div>

                <div className="bg-[#1E1022] border border-[#EC407A]/20 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">Red Internacional de Imprentas Bajo Demanda</h4>
                    <p className="text-xs text-gray-400">Distribución en España, México, Argentina y Colombia.</p>
                  </div>
                  <span className="text-xs bg-[#00E676]/20 text-[#00E676] font-bold px-3 py-1 rounded-full">
                    Activo
                  </span>
                </div>
              </div>

              {/* Proposals & Active Contracts Table */}
              <div className="bg-[#1E1022] border border-[#EC407A]/30 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">Contratos y Propuestas Enviadas</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-[#120914] text-pink-300 uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Obra</th>
                        <th className="p-3">Autor</th>
                        <th className="p-3">Ejemplares</th>
                        <th className="p-3">% Regalías Autor</th>
                        <th className="p-3">Distribución</th>
                        <th className="p-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {proposals.map(p => (
                        <tr key={p.id}>
                          <td className="p-3 font-bold text-white">{p.bookTitle}</td>
                          <td className="p-3">{p.authorName}</td>
                          <td className="p-3">{p.copies.toLocaleString()}</td>
                          <td className="p-3 font-bold text-[#00E676]">{p.royalties}</td>
                          <td className="p-3">{p.distribution}</td>
                          <td className="p-3">
                            <span className="bg-yellow-400/20 text-yellow-300 font-bold px-2 py-0.5 rounded text-[10px]">
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {}
          {activeTab === 'admin-panel' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-[#00E5FF] flex items-center gap-2">
                    Panel de Control Principal - Administradora
                  </h2>
                  <p className="text-sm text-pink-200/70">Supervisión en tiempo real de métricas, términos y funciones de la plataforma Orquídea.</p>
                </div>
              </div>

              {/* Key Platform KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1E1022] border border-[#00E5FF]/30 p-4 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Lectores Activos</p>
                  <p className="text-2xl font-black text-white mt-1">48,290</p>
                  <span className="text-[10px] text-[#00E676]">+12% este mes</span>
                </div>
                <div className="bg-[#1E1022] border border-[#00E5FF]/30 p-4 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Escritores Registrados</p>
                  <p className="text-2xl font-black text-white mt-1">6,120</p>
                  <span className="text-[10px] text-[#00E676]">+8% este mes</span>
                </div>
                <div className="bg-[#1E1022] border border-[#00E5FF]/30 p-4 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Editoriales Verificadas</p>
                  <p className="text-2xl font-black text-white mt-1">142</p>
                  <span className="text-[10px] text-[#00E5FF]">Globales</span>
                </div>
                <div className="bg-[#1E1022] border border-[#00E5FF]/30 p-4 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Impresiones Físicas KDP</p>
                  <p className="text-2xl font-black text-white mt-1">12,800</p>
                  <span className="text-[10px] text-[#00E676]">Ejemplares</span>
                </div>
              </div>

              {/* Feature Switchers & Toggles */}
              <div className="bg-[#1E1022] border border-[#00E5FF]/30 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Interruptores Dinámicos de Funciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(featureToggles).map((key) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-[#120914] rounded-xl border border-white/5">
                      <span className="text-xs font-bold capitalize text-gray-200">
                        {key.replace(/([AZ])/g, ' $1')}
                      </span>
                      <button 
                        onClick={() => setFeatureToggles({...featureToggles, [key]: !featureToggles[key]})}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${featureToggles[key] ? 'bg-[#00E5FF]' : 'bg-gray-700'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-black transition-transform ${featureToggles[key] ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Legal & Terms Editor */}
              <div className="bg-[#1E1022] border border-[#00E5FF]/30 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white">Editor de Términos, Condiciones y Cláusulas Globales</h3>
                <textarea 
                  rows={6}
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                  className="w-full bg-[#120914] border border-[#00E5FF]/30 rounded-xl p-4 text-xs font-mono text-gray-200 focus:outline-none"
                />
                <button 
                  onClick={() => alert('Términos y Condiciones actualizados en toda la plataforma.')}
                  className="bg-[#00E5FF] text-black font-bold px-6 py-2 rounded-xl text-xs hover:bg-[#00E5FF]/80"
                >
                  Guardar y Publicar Términos
                </button>
              </div>
            </div>
          )}

          {}
          {activeTab === 'inbox' && (
            <div className="bg-[#1E1022] border border-[#EC407A]/30 rounded-2xl h-[calc(100vh-160px)] flex flex-col overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-white/10 bg-[#120914]/50 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#EC407A]" /> Buzón de Mensajes Inter-Roles
                  </h2>
                  <p className="text-xs text-pink-200/70">Comunicación directa entre Lectores, Escritores, Editoriales y Admins.</p>
                </div>
                <span className="text-xs bg-[#EC407A]/20 text-[#EC407A] font-bold px-3 py-1 rounded-full uppercase">
                  Rol actual: {currentRole}
                </span>
              </div>

              {/* Chat Log Window */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#120914]/40">
                {inbox.map((m) => (
                  <div key={m.id} className="bg-[#1E1022] p-3 rounded-2xl border border-white/10 max-w-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#EC407A]">{m.sender}</span>
                      <span className="text-[10px] text-gray-400">{m.time}</span>
                    </div>
                    <p className="text-xs text-gray-200">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* Message Input Box */}
              <div className="p-3 border-t border-white/10 bg-[#120914] flex gap-2">
                <input 
                  type="text" 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Escribir mensaje como ${currentRole.toUpperCase()}...`}
                  className="flex-1 bg-[#1E1022] border border-[#EC407A]/30 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-[#D81B60] hover:bg-[#EC407A] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Send className="w-4 h-4" /> Enviar
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {}
      {showFloria && (
        <div className="fixed bottom-6 right-6 w-80 lg:w-96 bg-[#1E1022] border-2 border-[#EC407A] rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#D81B60] via-[#EC407A] to-[#2A1730] p-3 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold">🌸</div>
              <div>
                <h4 className="font-bold text-xs">Floria - Guía Botánica Orquídea</h4>
                <p className="text-[9px] opacity-80">Asistente Virtual 24/7</p>
              </div>
            </div>
            <button onClick={() => setShowFloria(false)} className="hover:opacity-70">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-3 h-64 overflow-y-auto space-y-2 bg-[#120914]/90 text-xs">
            {floriaMessages.map((m, idx) => (
              <div key={idx} className={`p-2.5 rounded-2xl ${m.sender === 'Floria' ? 'bg-[#2A1730] text-pink-100 border border-[#EC407A]/30' : 'bg-[#D81B60] text-white ml-auto max-w-[80%]'}`}>
                <p className="font-bold text-[10px] text-pink-300 mb-0.5">{m.sender}</p>
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          {/* Prompt Quick Buttons */}
          <div className="p-2 bg-[#1E1022] border-t border-white/10 flex flex-wrap gap-1">
            <button onClick={() => handleSendFloria('¿Cómo funciona el rol de Lector?')} className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded-full text-pink-300 border border-white/10">
              📖 Lectores
            </button>
            <button onClick={() => handleSendFloria('¿Qué beneficios tienen los Escritores?')} className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded-full text-pink-300 border border-white/10">
              ✍️ Escritores
            </button>
            <button onClick={() => handleSendFloria('¿Cómo funcionan los contratos editoriales?')} className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded-full text-pink-300 border border-white/10">
              🏢 Editoriales
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-2 bg-[#120914] flex gap-1 border-t border-white/10">
            <input 
              type="text" 
              value={floriaInput}
              onChange={(e) => setFloriaInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendFloria()}
              placeholder="Pregúntale a Floria..."
              className="flex-1 bg-[#1E1022] border border-[#EC407A]/30 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
            />
            <button 
              onClick={() => handleSendFloria()}
              className="bg-[#D81B60] text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-[#EC407A]"
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      {}
      {showContractModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E1022] border-2 border-[#EC407A] w-full max-w-2xl rounded-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#00E676]" /> Generador de Contrato Editorial Obligatorio
              </h3>
              <button onClick={() => setShowContractModal(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </button>
            </div>

            <p className="text-xs text-pink-200/70">
              Este contrato se enviará directamente al escritor y garantizará las cláusulas de protección de la plataforma Orquídea.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-pink-300 font-bold block mb-1">Título de la Obra</label>
                <input 
                  type="text" 
                  value={contractForm.bookTitle} 
                  onChange={(e) => setContractForm({...contractForm, bookTitle: e.target.value})}
                  className="w-full bg-[#120914] border border-[#EC407A]/30 p-2 rounded-xl text-white" 
                />
              </div>

              <div>
                <label className="text-pink-300 font-bold block mb-1">Nombre del Autor</label>
                <input 
                  type="text" 
                  value={contractForm.authorName} 
                  onChange={(e) => setContractForm({...contractForm, authorName: e.target.value})}
                  className="w-full bg-[#120914] border border-[#EC407A]/30 p-2 rounded-xl text-white" 
                />
              </div>

              <div>
                <label className="text-pink-300 font-bold block mb-1">Cantidad de Ejemplares (Tiraje Físico)</label>
                <input 
                  type="number" 
                  value={contractForm.copies} 
                  onChange={(e) => setContractForm({...contractForm, copies: Number(e.target.value)})}
                  className="w-full bg-[#120914] border border-[#EC407A]/30 p-2 rounded-xl text-white" 
                />
              </div>

              <div>
                <label className="text-pink-300 font-bold block mb-1">% Porcentaje de Regalías para Autor</label>
                <input 
                  type="number" 
                  value={contractForm.royalties} 
                  onChange={(e) => setContractForm({...contractForm, royalties: Number(e.target.value)})}
                  className="w-full bg-[#120914] border border-[#EC407A]/30 p-2 rounded-xl text-white" 
                />
              </div>

              <div>
                <label className="text-pink-300 font-bold block mb-1">Duración del Contrato (Meses)</label>
                <input 
                  type="number" 
                  value={contractForm.durationMonths} 
                  onChange={(e) => setContractForm({...contractForm, durationMonths: Number(e.target.value)})}
                  className="w-full bg-[#120914] border border-[#EC407A]/30 p-2 rounded-xl text-white" 
                />
              </div>

              <div>
                <label className="text-pink-300 font-bold block mb-1">Presupuesto para Campaña Publicitaria</label>
                <input 
                  type="text" 
                  value={contractForm.marketingBudget} 
                  onChange={(e) => setContractForm({...contractForm, marketingBudget: e.target.value})}
                  className="w-full bg-[#120914] border border-[#EC407A]/30 p-2 rounded-xl text-white" 
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-pink-300 font-bold block mb-1">Distribución Internacional Comprometida</label>
              <input 
                type="text" 
                value={contractForm.distribution} 
                onChange={(e) => setContractForm({...contractForm, distribution: e.target.value})}
                className="w-full bg-[#120914] border border-[#EC407A]/30 p-2 rounded-xl text-xs text-white" 
              />
            </div>

            <div>
              <label className="text-xs text-pink-300 font-bold block mb-1">Condiciones Adicionales</label>
              <textarea 
                rows={3}
                value={contractForm.extraClauses} 
                onChange={(e) => setContractForm({...contractForm, extraClauses: e.target.value})}
                className="w-full bg-[#120914] border border-[#EC407A]/30 p-2 rounded-xl text-xs text-white" 
              />
            </div>

            <div className="flex gap-3 pt-3 border-t border-white/10">
              <button 
                onClick={() => setShowContractModal(false)}
                className="flex-1 bg-white/10 text-white py-2 rounded-xl text-xs font-bold hover:bg-white/20"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  setProposals([
                    ...proposals,
                    {
                      id: `prop-${Date.now()}`,
                      bookTitle: contractForm.bookTitle,
                      authorName: contractForm.authorName,
                      publisherName: 'Tu Editorial Verificada',
                      status: 'Enviado a Firma',
                      date: 'Hoy',
                      royalties: `${contractForm.royalties}%`,
                      copies: contractForm.copies,
                      distribution: contractForm.distribution
                    }
                  ]);
                  setShowContractModal(false);
                  alert('Contrato generado y enviado electrónicamente al escritor.');
                }}
                className="flex-1 bg-[#00E676] text-black py-2 rounded-xl text-xs font-bold hover:bg-[#00E676]/80"
              >
                Emitir Contrato Oficial
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}