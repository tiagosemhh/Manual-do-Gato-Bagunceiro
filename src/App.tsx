/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Check,
  Crown,
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ShieldCheck, 
  Gift, 
  MousePointer2,
  Home,
  Zap,
  BookOpen,
  Cat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 28, seconds: 56 });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [notification, setNotification] = useState<{ name: string, cat: string, title: string, action: string, time: number } | null>(null);

  const femaleNames = ["Ana", "Beatriz", "Mariana", "Fernanda", "Juliana", "Camila", "Larissa", "Patrícia", "Renata", "Cláudia"];
  const maleNames = ["Carlos", "João", "Ricardo", "Gabriel", "Lucas", "Mateus", "Rodrigo", "Felipe", "Bruno", "André"];
  const catNames = ["Simba", "Luna", "Mel", "Thor", "Nina", "Fred", "Mia", "Oliver", "Amora", "Tom", "Bento", "Maya"];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerNotification = () => {
      const isFemale = Math.random() > 0.5;
      const randomName = isFemale 
        ? femaleNames[Math.floor(Math.random() * femaleNames.length)]
        : maleNames[Math.floor(Math.random() * maleNames.length)];
      
      const randomCat = catNames[Math.floor(Math.random() * catNames.length)];
      
      const femaleTitles = ["mãe", "tutora", "dona"];
      const maleTitles = ["pai", "tutor", "dono"];
      
      const randomTitle = isFemale
        ? femaleTitles[Math.floor(Math.random() * femaleTitles.length)]
        : maleTitles[Math.floor(Math.random() * maleTitles.length)];

      const actions = ["comprou", "garantiu o Manual Gato Bagunceiro"];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomTime = Math.floor(Math.random() * 4) + 2; // 2 to 5 minutes
      
      setNotification({ 
        name: randomName, 
        cat: randomCat, 
        title: randomTitle, 
        action: randomAction,
        time: randomTime
      });
      
      // Auto-dismiss after 5-7 seconds
      const dismissTime = Math.floor(Math.random() * 2000) + 5000;
      setTimeout(() => {
        setNotification(null);
      }, dismissTime);

      // Schedule next notification (35-50 seconds)
      const nextInterval = Math.floor(Math.random() * 15000) + 35000;
      timeoutId = setTimeout(triggerNotification, nextInterval);
    };

    // Initial trigger after 10s
    timeoutId = setTimeout(triggerNotification, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toLocaleDateString('pt-BR');

  const faqs = [
    {
      question: "Como recebo o material?",
      answer: "O acesso é imediato! Assim que o pagamento for confirmado, você receberá um e-mail com os dados de acesso à nossa plataforma exclusiva onde todos os manuais e bônus estarão disponíveis para download em PDF."
    },
    {
      question: "Posso aplicar em qualquer idade de gato?",
      answer: "Sim! O manual cobre desde filhotes até gatos idosos. Temos inclusive um módulo específico focado na criação de filhotes para evitar que os problemas comecem."
    },
    {
      question: "E se eu não gostar?",
      answer: "Você tem 7 dias de garantia incondicional. Se por qualquer motivo você achar que o material não é para você, basta nos enviar um e-mail e devolveremos 100% do seu dinheiro, sem perguntas."
    },
    {
      question: "Os brinquedos caseiros são caros de fazer?",
      answer: "Não! O foco do bônus de 20 brinquedos caseiros é justamente usar materiais que você já tem em casa (como caixas, rolos de papel, etc.) para economizar e divertir seu gato."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      {/* Top Banner */}
      <div className="bg-[#E53E3E] text-white py-2 px-4 text-center text-xs md:text-sm font-bold uppercase tracking-wider">
        DESCONTO ESPECIAL SOMENTE HOJE: - {today}
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-20 px-4 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-7xl font-black leading-tight mb-6 uppercase tracking-tight">
            <span className="text-[#2B6CB0]">Manual do Gato sem Bagunça</span><br />
            <span className="text-[#38A169]">+ BÔNUS</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
            Transforme seu gato bagunceiro em um companheiro <span className="text-orange-600 font-bold underline decoration-orange-200 underline-offset-4">educado e calmo</span> em apenas 7 dias e recupere a paz da sua casa sem gastar fortunas com adestradores.
          </p>

          <div className="relative max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://i.imgur.com/Fc5QJcl.png" 
              alt="Manual do Gato sem Bagunça" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end justify-center pb-8">
              <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
                <Cat className="text-orange-500 w-6 h-6" />
                <span className="font-bold text-slate-800">Guia Definitivo para Gateiros</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Identification Section */}
        <div className="mt-20 max-w-3xl mx-auto text-left bg-slate-50 p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm">
          <p className="text-lg md:text-xl text-slate-600 font-medium mb-6 italic">
            Você ama seu gato, mas sente que a convivência está se tornando um peso diário?
          </p>
          
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-slate-900 uppercase tracking-tight">
            Esse guia foi feito para donos que...
          </h2>
          
          <ul className="grid gap-4 mb-10">
            {[
              "Sofrem com a falta de tempo para brincar e estimular o gato adequadamente.",
              "Estão cansados de ver móveis, cortinas e sofás novos sendo destruídos.",
              "Sentem culpa por deixar o gato entediado e agitado o dia todo sozinho.",
              "Não sabem como educar corretamente sem usar punições que não funcionam.",
              "Querem uma rotina de paz e um gato muito mais calmo, educado e feliz.",
              "Estão exaustos de acordar no meio da noite com correrias e miados incessantes.",
              "Buscam uma solução prática e rápida que realmente funcione em poucos dias."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-orange-500 font-bold shrink-0">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <p className="text-lg text-slate-800 font-bold leading-relaxed border-l-4 border-orange-500 pl-6">
            Chega de estresse. Recupere o controle da sua casa e transforme a relação com seu melhor amigo em uma experiência de pura alegria e tranquilidade.
          </p>
        </div>
      </section>

      {/* What You Will Receive */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-2">O Que Você<br /><span className="text-[#2B6CB0]">Vai Receber?</span></h2>
            <div className="w-20 h-1 bg-[#2B6CB0] mx-auto rounded-full"></div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">9 Manuais Digitais Completos</h3>
              <ul className="space-y-3 text-left w-full">
                {[
                  "Por que seu Gato Bagunça?",
                  "Casa Anti-Bagunça",
                  "Arranhões sob controle",
                  "Elimine a mastigação sem punição",
                  "Posicionar – Proteger – Redirecionar",
                  "Como criar seu gato desde filhote"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Cat className="text-orange-400 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Inside the Material */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase">VEJA COMO É<br /><span className="text-[#38A169]">O MATERIAL POR DENTRO</span></h2>
          <p className="text-slate-600 mb-12">Manuais ilustrados, passo a passo. Pega e aplica sem enrolação.</p>
          
          <div className="relative">
            {/* Infinite Marquee */}
            <div className="flex gap-6 overflow-hidden py-4">
              <motion.div 
                className="flex gap-6 shrink-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 20, 
                  ease: "linear", 
                  repeat: Infinity 
                }}
              >
                {[
                  "https://i.imgur.com/zEic7mz.png",
                  "https://i.imgur.com/WO7hFqF.png",
                  "https://i.imgur.com/uh2fxHS.png",
                  // Duplicate for seamless loop
                  "https://i.imgur.com/zEic7mz.png",
                  "https://i.imgur.com/WO7hFqF.png",
                  "https://i.imgur.com/uh2fxHS.png"
                ].map((src, i) => (
                  <div key={i} className="w-[300px] md:w-[400px] shrink-0 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                    <img 
                      src={src} 
                      alt={`Página do material ${i + 1}`} 
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-20 bg-blue-50/50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4">
            BÔNUS EXCLUSIVOS — VALOR R$ 111,00
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase">LEVE HOJE MAIS 3 BÔNUS<br /><span className="text-[#38A169]">SEM PAGAR NADA A MAIS!</span></h2>
          
          <div className="relative mt-12">
            {/* Infinite Horizontal Scroll for Bonus Items */}
            <div className="flex gap-8 overflow-hidden py-4">
              <motion.div 
                className="flex gap-8 shrink-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 25, // Medium-low speed
                  ease: "linear", 
                  repeat: Infinity 
                }}
              >
                {[
                  { title: "20 Brinquedos Caseiros", desc: "Economize centenas de reais criando diversão com o que você tem em casa.", img: "https://i.imgur.com/WYzGa39.png" },
                  { title: "Cansar em 10 Minutos", desc: "A rotina perfeita para gastar a energia do gato antes de você dormir.", img: "https://i.imgur.com/EX5q0sw.png" },
                  { title: "Adestramento Simplificado", desc: "Comandos básicos que todo gato pode aprender para facilitar a convivência.", img: "https://i.imgur.com/50FGdyr.png" },
                  // Duplicate for seamless loop
                  { title: "20 Brinquedos Caseiros", desc: "Economize centenas de reais criando diversão com o que você tem em casa.", img: "https://i.imgur.com/WYzGa39.png" },
                  { title: "Cansar em 10 Minutos", desc: "A rotina perfeita para gastar a energia do gato antes de você dormir.", img: "https://i.imgur.com/EX5q0sw.png" },
                  { title: "Adestramento Simplificado", desc: "Comandos básicos que todo gato pode aprender para facilitar a convivência.", img: "https://i.imgur.com/50FGdyr.png" }
                ].map((bonus, i) => (
                  <div key={i} className="w-[280px] md:w-[350px] bg-white rounded-3xl overflow-hidden shadow-lg border border-blue-100 group shrink-0">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={bonus.img} 
                        alt={bonus.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <div className="p-6 text-left">
                      <h4 className="font-black text-lg mb-2 uppercase">{bonus.title}</h4>
                      <p className="text-slate-600 text-sm">{bonus.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-blue-50/50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-blue-50/50 to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[#E53E3E] text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-xl md:text-2xl font-bold mb-8 uppercase tracking-widest">ATENÇÃO: DESCONTO ACABA EM:</h3>
          
          <div className="flex justify-center gap-4 mb-16">
            {[
              { label: "HORAS", val: timeLeft.hours },
              { label: "MINUTOS", val: timeLeft.minutes },
              { label: "SEGUNDOS", val: timeLeft.seconds }
            ].map((unit, i) => (
              <div key={i} className="bg-white text-slate-900 rounded-2xl p-4 w-24 md:w-32 shadow-xl">
                <div className="text-3xl md:text-5xl font-black">{unit.val.toString().padStart(2, '0')}</div>
                <div className="text-[10px] md:text-xs font-bold text-slate-400 mt-1">{unit.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {/* Basic Plan */}
            <div className="bg-white text-slate-900 rounded-[40px] p-10 shadow-2xl flex flex-col">
              <h4 className="text-2xl font-black mb-2 uppercase">PACOTE BÁSICO</h4>
              <div className="text-[#E53E3E] line-through font-bold mb-2">R$ 47</div>
              <div className="text-6xl font-black text-[#38A169] mb-4">R$ 10,00</div>
              <div className="text-sm font-bold text-slate-400 mb-8 uppercase">PAGAMENTO ÚNICO</div>
              
              <ul className="space-y-4 text-left mb-10 flex-grow">
                {[
                  "Por que seu Gato Bagunça?",
                  "Casa Anti-Bagunça",
                  "Arranhões sob controle"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Cat className="text-orange-400 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => setShowUpsell(true)}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition-colors uppercase tracking-wider"
              >
                QUERO O BÁSICO
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white text-slate-900 rounded-[40px] p-10 shadow-2xl border-4 border-yellow-400 relative flex flex-col transform md:scale-105">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-8 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-lg">
                MAIS VENDIDO
              </div>
              <h4 className="text-2xl font-black mb-2 uppercase flex items-center justify-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400 w-6 h-6" />
                PACOTE PREMIUM
              </h4>
              <div className="text-[#E53E3E] line-through font-bold mb-2">R$ 87</div>
              <div className="text-6xl font-black text-[#38A169] mb-4">R$ 27,00</div>
              <div className="text-sm font-bold text-slate-400 mb-8 uppercase">PAGAMENTO ÚNICO</div>
              
              <ul className="space-y-4 text-left mb-10 flex-grow">
                {[
                  { text: "TODOS OS 9 MANUAIS", isBonus: false },
                  { text: "Como criar desde filhote", isBonus: false },
                  { text: "Elimine a mastigação", isBonus: false },
                  { text: "BÔNUS: 20 Brinquedos Caseiros", isBonus: true },
                  { text: "BÔNUS: Cansar em 10 Minutos", isBonus: true },
                  { text: "BÔNUS: Adestramento Simplificado", isBonus: true }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {item.isBonus ? (
                      <Crown className="text-orange-400 w-5 h-5 shrink-0 mt-0.5" />
                    ) : (
                      <Cat className="text-orange-400 w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <span className="text-slate-800 font-bold">{item.text}</span>
                  </li>
                ))}
              </ul>
              
              <motion.button 
                onClick={() => window.location.href = 'https://pay.cakto.com.br/3ddqhn3_788956'}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-orange-600 transition-colors uppercase tracking-wider shadow-xl shadow-orange-200"
              >
                QUERO O PACOTE COMPLETO
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-16">O Que Dizem Nossos<br /><span className="text-[#2B6CB0]">Gateiros Felizes</span></h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Mariana Costa", 
                role: "Mãe do Simba", 
                text: "Gente, sério... comprei faz 3 dias e o Simba já parou de morder o pé da mesa. O manual de redirecionar é bizarro de bom! Valeu cada centavo.", 
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
                time: "há 2 horas"
              },
              { 
                name: "Rafael Mendes", 
                role: "Dono da Luna", 
                text: "Passando pra agradecer! Minha casa tava um caos com 2 gatos novos, mas a técnica de cansar em 10 min salvou minhas noites. Eles dormem igual anjinhos agora kkkk", 
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
                time: "há 5 horas"
              },
              { 
                name: "Fernanda Rocha", 
                role: "Gateira de primeira viagem", 
                text: "Finalmente consegui salvar meu sofá novo! O Thor nem olha mais pra ele, só pro arranhador que eu fiz seguindo o guia. Recomendo demais pra quem tá quase desistindo.", 
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
                time: "há 1 dia"
              }
            ].map((test, i) => (
              <div key={i} className="flex flex-col items-start text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src={test.img} alt={test.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{test.name}</h4>
                    <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">{test.role}</div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 relative">
                  <p className="text-slate-700 text-sm leading-relaxed">{test.text}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{test.time}</span>
                    <div className="flex gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Author */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 uppercase tracking-tight">QUEM CRIOU O MÉTODO?</h2>
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-40 h-40 shrink-0 rounded-full overflow-hidden border-4 border-blue-50">
              <img src="https://i.imgur.com/Y6sed88.png" alt="Larissa Monteiro" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h4 className="text-2xl font-black mb-1">Larissa Monteiro</h4>
              <p className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wider">Especialista em Comportamento Felino</p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">10+ anos</span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">5.000+ alunos</span>
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">Amante de Gatos</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Gateira apaixonada há mais de 15 anos, já vivi na pele a frustração de ter sofás destruídos e a casa em constante caos. Foi unindo minha experiência prática com estudos de comportamento felino que desenvolvi o método <span className="font-bold">Manual do Gato sem Bagunça</span>. Tudo o que você vai encontrar aqui foi testado e aprovado por milhares de alunos que hoje vivem em harmonia com seus gatos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-green-50 border-2 border-green-200 rounded-[40px] p-12 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-6">Garantia Incondicional</h2>
          <p className="text-slate-700 text-lg max-w-2xl mx-auto">
            Teste o material sem risco por 7 dias. Se não fizer sentido para você, devolveremos 100% do seu dinheiro. Sem letras miúdas.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 uppercase tracking-tight">PERGUNTAS FREQUENTES</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className={`w-full p-6 flex items-center justify-between text-left font-bold transition-colors ${activeFaq === i ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50'}`}
                >
                  {faq.question}
                  {activeFaq === i ? <ChevronUp /> : <ChevronDown />}
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-[#E53E3E]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.button 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.2, 
              ease: "easeInOut" 
            }}
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full bg-white text-[#E53E3E] py-6 rounded-2xl font-black text-2xl hover:bg-slate-50 transition-all transform uppercase tracking-widest shadow-2xl"
          >
            QUERO MEU GATO EDUCADO AGORA!
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A202C] text-white py-16 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Cat className="text-green-500 w-8 h-8" />
            <span className="text-xl font-black uppercase tracking-widest">Manual do Gato sem Bagunça</span>
          </div>
          
          <p className="text-slate-400 text-sm mb-8">
            © 2026 Manual do Gato sem Bagunça. Todos os direitos reservados.
          </p>
          
          <div className="flex justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </footer>

      {/* Upsell Modal */}
      <AnimatePresence>
        {showUpsell && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] max-w-lg w-full p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400"></div>
              
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-orange-600 w-10 h-10 fill-orange-600" />
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight uppercase">
                ESPERA! <br />
                <span className="text-orange-600">PROMOÇÃO ESPECIAL</span>
              </h3>
              
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Vimos que você escolheu o básico, mas temos uma oferta <span className="font-bold text-slate-900">ÚNICA</span> para você agora:
              </p>

              <div className="bg-slate-50 rounded-3xl p-6 mb-8 border-2 border-dashed border-orange-200">
                <p className="text-sm font-bold text-slate-400 uppercase mb-1">Leve o Pacote Completo por apenas:</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-slate-400 line-through text-xl font-bold">R$ 87</span>
                  <span className="text-5xl font-black text-[#38A169]">R$ 17,00</span>
                </div>
                <p className="text-xs text-orange-600 font-bold mt-2 uppercase tracking-widest">VOCÊ ECONOMIZA R$ 70,00 AGORA!</p>
              </div>

              <div className="space-y-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = 'https://pay.cakto.com.br/3584y5d_788981'}
                  className="w-full bg-[#38A169] text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-green-100 uppercase tracking-wider"
                >
                  SIM! QUERO O COMPLETO POR R$ 17
                </motion.button>
                
                <button 
                  onClick={() => window.location.href = 'https://pay.cakto.com.br/3fquncc_788979'}
                  className="text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors uppercase tracking-widest underline underline-offset-4"
                >
                  Não, prefiro levar apenas o básico por R$ 10
                </button>
              </div>

              <p className="mt-8 text-[10px] text-slate-400 font-medium uppercase leading-tight">
                *Esta oferta é válida apenas para esta página e não poderá ser acessada novamente depois que você fechar este aviso.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Social Proof Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-24 right-4 z-[110] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex items-center gap-4 max-w-[320px] md:max-w-sm"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center shrink-0 border border-orange-100">
              <span className="text-2xl">🐱</span>
            </div>
            <div className="flex flex-col">
              <p className="text-[13px] text-slate-700 leading-tight">
                <span className="font-bold text-slate-900">{notification.name}</span>, {notification.title} do gato <span className="font-bold text-slate-900">{notification.cat}</span>, {notification.action} há {notification.time} minutos.
              </p>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <Zap className="w-3 h-3 rotate-45" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
