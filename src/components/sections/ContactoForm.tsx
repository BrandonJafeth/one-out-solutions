import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  CheckCircle, AlertCircle, Globe, Laptop, LayoutTemplate, 
  ShoppingCart, Cloud, Building2, Info, Check
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es muy corto'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  company: z.string().optional(),
  message: z.string().min(10, 'El mensaje es muy corto, cuéntanos un poco más'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  { id: 'pagina-web', title: 'PÁGINA WEB', desc: 'Landing pages y sitios corporativos', icon: Globe },
  { id: 'app-web', title: 'APLICACIÓN WEB', desc: 'Plataformas web interactivas', icon: Laptop },
  { id: 'app-movil', title: 'APP MÓVIL', desc: 'iOS, Android o multiplataforma', icon: LayoutTemplate },
  { id: 'ecommerce', title: 'E-COMMERCE', desc: 'Tiendas online completas', icon: ShoppingCart },
  { id: 'saas', title: 'PLATAFORMA SAAS', desc: 'Software como servicio', icon: Cloud },
  { id: 'enterprise', title: 'SOLUCIÓN ENTERPRISE', desc: 'Sistema empresarial a medida', icon: Building2 },
];

const complexityOptions = [
  { id: 'c1', title: '1-3 Páginas', desc: 'Landing page o sitio básico', price: 2500 },
  { id: 'c2', title: '4-7 Páginas', desc: 'Sitio corporativo mediano', price: 4500 },
  { id: 'c3', title: '8-15 Páginas', desc: 'Portal web completo', price: 7500 },
  { id: 'c4', title: 'Más de 15 páginas', desc: 'Portal extenso personalizado', price: 12000 },
];

export default function ContactoForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [selectedComplexities, setSelectedComplexities] = useState<string[]>([]);
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
    return selectedComplexities.reduce((total, cid) => {
      const option = complexityOptions.find(o => o.id === cid);
      return total + (option?.price || 0);
    }, 0);
  }, [selectedComplexities]);

  const toggleComplexity = (id: string) => {
    setSelectedComplexities(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    // Payload simulation
    const payload = {
      projectType: selectedProjectType,
      complexities: selectedComplexities,
      totalEstimate,
      ...data
    };
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    reset();
  };

  if (status === 'success') {
    return (
      <div className="bg-success/10 border border-success p-12 text-center animate-in fade-in max-w-3xl mx-auto">
        <CheckCircle className="mx-auto text-success mb-6" size={64} />
        <h3 className="text-white font-display font-bold text-2xl mb-4">Solicitud Recibida</h3>
        <p className="text-muted text-lg">Hemos recibido tu configuración con éxito. Analizaremos los datos de tu estimación por <strong>${totalEstimate.toLocaleString('en-US')} USD</strong> y te contactaremos prontamente.</p>
        <button 
          onClick={() => {
            setStatus('idle');
            setStep(1);
            setSelectedProjectType(null);
            setSelectedComplexities([]);
          }}
          className="mt-8 text-orange font-bold text-sm tracking-widest uppercase hover:text-white transition-colors"
        >
          Iniciar Nueva Cotización
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      
      {/* Header General */}
      {step < 3 && (
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-white mb-4">
            COTIZA TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-cyan">PROYECTO</span>
          </h2>
          <p className="text-muted text-lg">Obtén una estimación de inversión base aplicable al tipo de proyecto que necesitas</p>
        </div>
      )}

      {/* STEP 1: Tipo de Proyecto */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-orange text-white flex items-center justify-center font-display font-bold text-xl">1</div>
            <h3 className="font-display font-bold text-white tracking-widest text-sm uppercase">SELECCIONA EL TIPO DE PROYECTO</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTypes.map(pt => {
              const Icon = pt.icon;
              const isSelected = selectedProjectType === pt.id;
              
              return (
                <button
                  key={pt.id}
                  onClick={() => setSelectedProjectType(pt.id)}
                  className={twMerge(
                    "relative text-left p-8 bg-surface border transition-all duration-300 group outline-none",
                    isSelected ? "border-orange" : "border-border hover:border-cyan"
                  )}
                >
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-orange text-white flex items-center justify-center rounded-sm">
                      <Check size={16} strokeWidth={3} />
                    </div>
                  )}
                  
                  <div className={twMerge("mb-6 transition-colors", isSelected ? "text-orange" : "text-cyan group-hover:text-orange")}>
                    <Icon size={32} />
                  </div>
                  <h4 className="font-display font-bold text-white text-lg mb-2">{pt.title}</h4>
                  <p className="text-muted text-sm">{pt.desc}</p>
                </button>
              )
            })}
          </div>

          <div className="mt-12 flex justify-end border-t border-border pt-8">
             <button
                disabled={!selectedProjectType}
                onClick={() => setStep(2)}
                className="bg-orange text-white disabled:opacity-50 disabled:cursor-not-allowed font-display font-bold text-sm tracking-widest uppercase px-12 py-4 hover:bg-white hover:text-black transition-colors"
              >
                Continuar
              </button>
          </div>
        </div>
      )}

      {/* STEP 2: Complejidad */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-orange text-white flex items-center justify-center font-display font-bold text-xl">2</div>
            <h3 className="font-display font-bold text-white tracking-widest text-sm uppercase">SELECCIONA LA COMPLEJIDAD (PUEDES ELEGIR MÚLTIPLES OPCIONES)</h3>
          </div>

          <div className="space-y-4 mb-12">
            {complexityOptions.map(c => {
              const isSelected = selectedComplexities.includes(c.id);

              return (
                <button
                  key={c.id}
                  onClick={() => toggleComplexity(c.id)}
                  className={twMerge(
                    "w-full flex items-center justify-between p-6 bg-surface border transition-all duration-300 group outline-none",
                    isSelected ? "border-orange" : "border-border hover:border-cyan"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <div className={twMerge(
                      "w-6 h-6 flex-shrink-0 border flex items-center justify-center transition-colors",
                      isSelected ? "bg-orange border-orange text-white" : "border-muted text-transparent"
                    )}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-display font-bold text-white text-base">{c.title}</h4>
                      <p className="text-muted text-sm">{c.desc}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="font-display font-bold text-orange text-xl">${c.price.toLocaleString('en-US')}</span>
                    <span className="text-muted text-xs block uppercase">USD</span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="border-t border-border pt-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
              <div>
                <h4 className="font-display font-bold text-white uppercase tracking-widest text-sm mb-2">INVERSIÓN ESTIMADA TOTAL</h4>
                <p className="text-muted text-sm max-w-sm">Esta es una estimación base. El costo final puede variar según características específicas, integraciones o complejidad.</p>
              </div>
              <div className="text-right">
                <span className="font-display font-bold text-orange text-4xl md:text-5xl tracking-tight">${totalEstimate.toLocaleString('en-US')}</span>
                <span className="text-muted text-sm block uppercase tracking-widest">USD</span>
              </div>
            </div>

            <div className="bg-surface border-l-2 border-orange p-4 flex gap-4 mb-12">
               <Info className="flex-shrink-0 text-orange mt-0.5" size={20} />
               <p className="text-muted text-sm leading-relaxed">
                 <strong className="text-white">Importante:</strong> Los precios mostrados son referenciales. Para una cotización exacta adaptada a tus necesidades, contáctanos y nuestro equipo evaluará tu proyecto en detalle.
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                disabled={selectedComplexities.length === 0}
                onClick={() => setStep(3)}
                className="flex-1 bg-orange text-white disabled:opacity-50 disabled:cursor-not-allowed font-display font-bold text-sm tracking-widest uppercase py-4 hover:bg-white hover:text-black transition-colors order-1 sm:order-2"
              >
                Solicitar Cotización Exacta
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedComplexities([]);
                  setSelectedProjectType(null);
                }}
                className="bg-black border border-border text-white font-display font-bold text-sm tracking-widest uppercase py-4 px-8 hover:border-muted transition-colors order-2 sm:order-1"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Final Form */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
           <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl tracking-tight text-white mb-4">
                DATOS DE <span className="text-orange">CONTACTO</span>
              </h2>
              <p className="text-muted">Déjanos tu información para enviar formalmente la estimación de <strong>${totalEstimate.toLocaleString('en-US')} USD</strong> generada.</p>
           </div>

           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {status === 'error' && (
              <div className="bg-error/10 border border-error p-4 flex gap-3 text-error items-start">
                <AlertCircle size={20} className="mt-0.5 shrink-0" />
                <p className="text-sm">Ocurrió un error. Por favor intenta enviarnos un correo a info@oneoutsolutions.com.</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">
                  Nombre <span className="text-orange">*</span>
                </label>
                <input 
                  {...register('name')}
                  id="name"
                  className={twMerge(
                    "w-full bg-surface border border-border px-4 py-3 text-white outline-none focus:border-cyan transition-colors",
                    errors.name && "border-error focus:border-error"
                  )}
                />
                {errors.name && <p className="text-error text-xs mt-2">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">
                  Email <span className="text-orange">*</span>
                </label>
                <input 
                  {...register('email')}
                  id="email"
                  type="email"
                  className={twMerge(
                    "w-full bg-surface border border-border px-4 py-3 text-white outline-none focus:border-cyan transition-colors",
                    errors.email && "border-error focus:border-error"
                  )}
                />
                {errors.email && <p className="text-error text-xs mt-2">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">
                Empresa (Opcional)
              </label>
              <input 
                {...register('company')}
                id="company"
                className="w-full bg-surface border border-border px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">
                Detalles Adicionales <span className="text-orange">*</span>
              </label>
              <textarea 
                {...register('message')}
                id="message"
                rows={5}
                className={twMerge(
                  "w-full bg-surface border border-border px-4 py-3 text-white outline-none focus:border-cyan transition-colors resize-y",
                  errors.message && "border-error focus:border-error"
                )}
              ></textarea>
              {errors.message && <p className="text-error text-xs mt-2">{errors.message.message}</p>}
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                  type="button"
                  disabled={status === 'submitting'}
                  onClick={() => setStep(2)}
                  className="bg-black border border-border text-white disabled:opacity-50 font-display font-bold text-sm tracking-widest uppercase py-4 px-8 outline-none hover:border-muted transition-colors"
                >
                  Volver
              </button>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="flex-1 bg-orange text-white disabled:opacity-50 disabled:cursor-not-allowed font-display font-bold text-sm tracking-widest uppercase py-4 outline-none hover:bg-white hover:text-black transition-colors overflow-hidden relative"
              >
                {status === 'submitting' ? 'Enviando...' : 'Enviar Solicitud'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
