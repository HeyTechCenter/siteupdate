'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    email: '',
    telephone: '',
    projet: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ nom: '', entreprise: '', email: '', telephone: '', projet: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-[#1A1A1A] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Partie texte à gauche */}
          <div className="space-y-6">
            <span className="text-[#F5C518] text-sm font-semibold tracking-widest uppercase block">
              Discutons de votre projet
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Prêt à <br />
              <span className="text-[#1A7A4A] relative">
                innover
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#1A7A4A] rounded-full"></span>
              </span>
              ?
            </h2>
            
            <div className="w-16 h-1 bg-[#1A7A4A] rounded-full lg:hidden" />
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Que vous ayez une idée précise ou que vous cherchiez des conseils pour 
              digitaliser votre activité, notre équipe est là pour vous accompagner.
            </p>

            {/* Petite statistique ou témoignage rapide */}
            <div className="pt-6 flex gap-6">
              <div>
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-gray-500 text-sm">Délai de réponse</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-gray-500 text-sm">Projets réalisés</div>
              </div>
            </div>
          </div>

          {/* Formulaire à droite */}
          <div>
            <form onSubmit={handleSubmit} className="bg-[#111111] p-8 rounded-2xl border border-[#1A7A4A]/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#1A7A4A] rounded-full"></span>
                Envoyez-nous un message
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="nom" className="block text-gray-300 text-sm mb-2 font-medium">Nom complet </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1A1A1A] border border-[#1A7A4A]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#1A7A4A] focus:ring-1 focus:ring-[#1A7A4A]/50 transition-colors"
                    placeholder=""
                  />
                </div>

                <div>
                  <label htmlFor="entreprise" className="block text-gray-300 text-sm mb-2 font-medium">Entreprise / Organisation</label>
                  <input
                    type="text"
                    id="entreprise"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleChange}
                    className="w-full bg-[#1A1A1A] border border-[#1A7A4A]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#1A7A4A] focus:ring-1 focus:ring-[#1A7A4A]/50 transition-colors"
                    placeholder="optionel"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-gray-300 text-sm mb-2 font-medium">Email </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#1A1A1A] border border-[#1A7A4A]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#1A7A4A] focus:ring-1 focus:ring-[#1A7A4A]/50 transition-colors"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label htmlFor="telephone" className="block text-gray-300 text-sm mb-2 font-medium">Téléphone</label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full bg-[#1A1A1A] border border-[#1A7A4A]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#1A7A4A] focus:ring-1 focus:ring-[#1A7A4A]/50 transition-colors"
                      placeholder=""
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="projet" className="block text-gray-300 text-sm mb-2 font-medium">Description du message</label>
                  <textarea
                    id="projet"
                    name="projet"
                    value={formData.projet}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-[#1A1A1A] border border-[#1A7A4A]/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#1A7A4A] focus:ring-1 focus:ring-[#1A7A4A]/50 transition-colors resize-none"
                    placeholder="Parlez-nous de votre idée, vos besoins, vos objectifs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#1A7A4A] hover:bg-[#145f3a] text-white font-semibold px-6 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg hover:shadow-[#1A7A4A]/30'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-center">
                    ✓ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}