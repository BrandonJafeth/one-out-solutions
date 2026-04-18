import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  CheckCircle, TrendingUp, BarChart3, Building2, Cloud, Rocket, ShieldCheck, Check
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={twMerge("inline-flex items-center gap-3 px-4 py-1.5 font-display text-[10px] tracking-[0.3em] uppercase font-bold text-white border border-white/10 bg-white/5 rounded-full backdrop-blur-md", className)}>
    <div className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange"></span>
    </div>
    {children}
  </div>
);

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es muy corto'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  company: z.string().optional(),
  message: z.string().min(10, 'El mensaje es muy corto, cuéntanos un poco más sobre tus objetivos'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  { id: 'growth-platform', title: 'ATRAER CLIENTES', desc: 'Soluciones que te consiguen presencia activa y prospectos', icon: TrendingUp },
  { id: 'conversion-engine', title: 'VENDER ONLINE', desc: 'Sistemas para pagos, descargas o reservas directas', icon: BarChart3 },
  { id: 'enterprise-system', title: 'PORTAL CORPORATIVO', desc: 'Tu oficina oficial en internet como líder del negocio', icon: Building2 },
  { id: 'saas-infrastructure', title: 'APP PRIVADA / SAAS', desc: 'Software para manejar las reglas internas de tu equipo', icon: Cloud },
  { id: 'strategic-mvp', title: 'VALIDAR UN PROYECTO', desc: 'La parte técnica veloz para que presentes una idea seria', icon: Rocket },
  { id: 'security-audit', title: 'MODERNIZAR SISTEMA', desc: 'Arreglar páginas rotas o lentas que espantan tu público', icon: ShieldCheck },
];

const investmentOptions = [
  { id: 'c1', title: 'Módulo Básico', desc: 'Inversión enfocada a plataformas sólidas de información', price: 1200 },
  { id: 'c2', title: 'Comercio Dinámico', desc: 'Ideal para quienes procesan compras y citas activamente', price: 2500 },
  { id: 'c3', title: 'Sistemas Pro', desc: 'Apps grandes en la nube y sincronizadas a otros puntos', price: 5000 },
  { id: 'c4', title: 'Acompañamiento Abierto', desc: 'La máxima prioridad ejecutando requerimientos mensuales', price: 10000 },
];

export default function ContactoForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [selectedInvestments, setSelectedInvestments] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const totalEstimate = useMemo(() => {
    return selectedInvestments.reduce((total, cid) => {
      const option = investmentOptions.find(o => o.id === cid);
      return total + (option?.price || 0);
    }, 0);
  }, [selectedInvestments]);

  const toggleInvestment = (id: string) => {
    setSelectedInvestments(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    reset();
  };

  if (status === 'success') {
    return (
      <div className="bg-black border border-white/10 p-12 md:p-20 text-center animate-in fade-in max-w-[1400px] mx-auto relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-orange to-transparent"></div>
        <CheckCircle className="mx-auto text-orange mb-8" size={80} strokeWidth={1} />
        <h3 className="text-white font-display font-bold text-4xl mb-6 tracking-[-0.05em]">ORDEN RECONOCIDA</h3>
        <p className="text-silver text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Hemos recibido tu configuración estratégica. Un ingeniero senior analizará tu proyección de inversión de <strong>${totalEstimate.toLocaleString('en-US')} USD</strong> y se pondrá en contacto en menos de 24 horas.
        </p>
        <button 
          onClick={() => {
            setStatus('idle');
            setStep(1);
            setSelectedProjectType(null);
            setSelectedInvestments([]);
          }}
          className="mt-12 pill-cta pill-cta-secondary px-12 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all"
        >
          REINICIAR PROCESO DE ESCALA
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4">
      
      {/* Header General */}
      {step < 3 && (
        <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-display font-bold text-5xl md:text-7xl leading-[0.9] tracking-[-0.07em] text-white mb-6">
            ES HORA DE AUMENTAR <span className="text-orange italic">TUS RESULTADOS.</span>
          </h2>
          <p className="text-silver text-xl font-light tracking-wide">Da el salto definitivo. Cuéntanos tu problema y lo destruimos con software.</p>
        </div>
      )}

      {/* STEP 1: Tipo de Proyecto */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="flex items-center gap-6 mb-12 border-b border-white/5 pb-8">
            <span className="font-display font-bold text-orange text-2xl tracking-tighter">01.</span>
            <h3 className="font-display font-bold text-white tracking-[0.2em] text-xs uppercase">ELIGE EL OBJETIVO PARA TU NEGOCIO</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 mx-auto">
            {projectTypes.map(pt => {
              const Icon = pt.icon;
              const isSelected = selectedProjectType === pt.id;
              
              return (
                <button
                  key={pt.id}
                  onClick={() => setSelectedProjectType(pt.id)}
                  className={twMerge(
                    "relative text-left p-8 sm:p-12 bg-black transition-colors duration-500 group outline-none min-h-[250px] flex flex-col justify-end",
                    isSelected ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                  )}
                >
                  <div className={twMerge("mb-12 transition-transform duration-500 will-change-transform", isSelected ? "text-orange scale-110" : "text-silver/40 group-hover:text-white")}>
                    <Icon size={40} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-display font-bold text-white text-xl md:text-2xl mb-3 tracking-[-0.03em] uppercase transition-colors duration-500">{pt.title}</h4>
                  <p className="text-silver text-base font-light transition-colors duration-500">{pt.desc}</p>
                  
                  {isSelected && (
                    <div className="absolute top-8 right-8 w-2 h-2 bg-orange rounded-full shadow-[0_0_15px_rgba(219,105,35,0.8)]"></div>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-16 flex justify-end">
             <button
                disabled={!selectedProjectType}
                onClick={() => setStep(2)}
                className="pill-cta pill-cta-primary px-16 py-5 font-bold text-base tracking-[0.1em] disabled:opacity-30 disabled:grayscale transition-all"
              >
                CONTINUAR →
              </button>
          </div>
        </div>
      )}

      {/* STEP 2: Complejidad */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-700">
          <div className="flex items-center gap-6 mb-12 border-b border-white/5 pb-8">
            <span className="font-display font-bold text-orange text-2xl tracking-tighter">02.</span>
            <h3 className="font-display font-bold text-white tracking-[0.2em] text-xs uppercase">ESCALA DE INVERSIÓN ESTRATÉGICA</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 mb-16">
            {investmentOptions.map(c => {
              const isSelected = selectedInvestments.includes(c.id);

              return (
                <button
                  key={c.id}
                  onClick={() => toggleInvestment(c.id)}
                  className={twMerge(
                    "w-full flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-16 gap-6 md:gap-0 bg-black transition-colors duration-500 group outline-none",
                    isSelected ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                  )}
                >
                  <div className="flex items-start md:items-center gap-6 md:gap-10">
                    <div className={twMerge(
                      "w-4 h-4 rounded-full border border-white/20 flex-shrink-0 flex items-center justify-center transition-all duration-500 will-change-transform mt-1 md:mt-0",
                      isSelected ? "bg-orange border-orange scale-125" : "bg-transparent group-hover:border-white"
                    )}>
                      {isSelected && <Check size={10} strokeWidth={4} className="text-white" />}
                    </div>
                    <div className="text-left">
                      <h4 className="font-display font-bold text-white text-xl md:text-3xl mb-2 tracking-[-0.04em]">{c.title}</h4>
                      <p className="text-silver text-sm md:text-base font-light">{c.desc}</p>
                    </div>
                  </div>
                  
                  <div className="text-left md:text-right pl-10 md:pl-0 w-full md:w-auto">
                    <span className={twMerge("font-display font-bold text-3xl md:text-5xl tracking-tighter transition-colors duration-500", isSelected ? "text-orange" : "text-white/20")}>${c.price.toLocaleString('en-US')}</span>
                    <span className="text-silver/40 text-[10px] block font-bold tracking-[0.2em] uppercase mt-2">USD INIT</span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="pt-20 border-t border-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-12">
              <div>
                <h4 className="font-display font-bold text-white uppercase tracking-[0.2em] text-xs mb-4">MAPA DE INVERSIÓN PROYECTADO</h4>
                <p className="text-silver text-lg font-light max-w-md leading-relaxed">Este valor representa el núcleo de ingeniería. Optimizaciones específicas se refinarán en la auditoría inicial.</p>
              </div>
              <div className="text-right">
                <span className="font-display font-bold text-white text-[3rem] md:text-[6rem] tracking-tighter leading-none">${totalEstimate.toLocaleString('en-US')}</span>
                <span className="text-orange text-[10px] md:text-xs block font-bold tracking-[0.3em] uppercase mt-4">INVERSIÓN TOTAL ESTIMADA</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <button
                disabled={selectedInvestments.length === 0}
                onClick={() => setStep(3)}
                className="flex-1 pill-cta pill-cta-primary py-3.5 md:py-4 font-bold text-xs md:text-sm tracking-[0.15em] uppercase order-1 sm:order-2"
              >
                FORMALIZAR ESTRATEGIA
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedInvestments([]);
                  setSelectedProjectType(null);
                }}
                className="pill-cta pill-cta-secondary px-8 md:px-12 py-3.5 md:py-4 font-bold text-xs tracking-[0.2em] uppercase order-2 sm:order-1"
              >
                REINICIAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Final Form */}
      {step === 3 && (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8 duration-700">
           <div className="text-center mb-20">
              <Badge className="mb-8 border-orange/20 bg-orange/5 text-orange">FINAL DEPLOYMENT</Badge>
              <h2 className="font-display font-bold text-5xl md:text-7xl leading-[0.9] tracking-[-0.07em] text-white">
                NÚCLEO DE <span className="text-orange">AUTORIDAD.</span>
              </h2>
           </div>

           <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="relative group">
                <label htmlFor="name" className="block text-[10px] font-bold text-white/80 uppercase tracking-[0.3em] mb-4 group-focus-within:text-orange transition-colors">
                  NOMBRE COMPLETO <span className="text-orange">*</span>
                </label>
                <input 
                  {...register('name')}
                  id="name"
                  className={twMerge(
                    "w-full bg-transparent border-b border-white/10 px-0 py-4 text-white text-xl md:text-2xl outline-none focus:border-orange transition-colors placeholder:text-white/50",
                    errors.name && "border-error focus:border-error"
                  )}
                  placeholder="Tu nombre o firma"
                />
                {errors.name && <p className="text-error text-[10px] absolute -bottom-6 font-bold tracking-widest uppercase">{errors.name.message}</p>}
              </div>

              <div className="relative group">
                <label htmlFor="email" className="block text-[10px] font-bold text-white/80 uppercase tracking-[0.3em] mb-4 group-focus-within:text-orange transition-colors">
                  CORREO DE ENLACE <span className="text-orange">*</span>
                </label>
                <input 
                  {...register('email')}
                  id="email"
                  type="email"
                  className={twMerge(
                    "w-full bg-transparent border-b border-white/10 px-0 py-4 text-white text-xl md:text-2xl outline-none focus:border-orange transition-colors placeholder:text-white/50",
                    errors.email && "border-error focus:border-error"
                  )}
                  placeholder="email@corporacion.com"
                />
                {errors.email && <p className="text-error text-[10px] absolute -bottom-6 font-bold tracking-widest uppercase">{errors.email.message}</p>}
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="company" className="block text-[10px] font-bold text-white/80 uppercase tracking-[0.3em] mb-4 group-focus-within:text-orange transition-colors">
                EMPRESA / ENTIDAD
              </label>
              <input 
                {...register('company')}
                id="company"
                className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white text-xl md:text-2xl outline-none focus:border-orange transition-colors placeholder:text-white/50"
                placeholder="Nombre de la marca a escalar"
              />
            </div>

            <div className="relative group">
              <label htmlFor="message" className="block text-[10px] font-bold text-white/80 uppercase tracking-[0.3em] mb-4 group-focus-within:text-orange transition-colors">
                OBJETIVOS ESTRATÉGICOS <span className="text-orange">*</span>
              </label>
              <textarea 
                {...register('message')}
                id="message"
                rows={3}
                className={twMerge(
                  "w-full bg-transparent border-b border-white/10 px-0 py-4 text-white text-xl md:text-2xl outline-none focus:border-orange transition-colors resize-none placeholder:text-white/50",
                  errors.message && "border-error focus:border-error"
                )}
                placeholder="Descríbenos tu meta de crecimiento..."
              ></textarea>
              {errors.message && <p className="text-error text-[10px] absolute -bottom-6 font-bold tracking-widest uppercase">{errors.message.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-8 pt-12">
              <button 
                  type="button"
                  disabled={status === 'submitting'}
                  onClick={() => setStep(2)}
                  className="pill-cta pill-cta-secondary px-12 py-6 font-bold text-xs tracking-[0.2em] transition-all"
                >
                  VOLVER
              </button>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="flex-1 pill-cta pill-cta-primary py-6 font-bold text-base tracking-[0.2em] relative overflow-hidden group/btn"
              >
                <div className="relative z-10 flex items-center justify-center gap-4">
                  {status === 'submitting' ? 'PROCESANDO ESTRUCTURA...' : 'DESPLEGAR ESTRATEGIA'}
                  <Rocket size={20} className={twMerge("transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1", status === 'submitting' && "animate-bounce")} />
                </div>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
