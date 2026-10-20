import { enProduction } from '@/lib/publication';

// Rappel visible uniquement en développement : contenu à fournir ou à valider
export default function TodoBadge({ texte, className = '' }) {
  if (enProduction || !texte) return null;
  return (
    <p className={`text-xs font-mono text-[#F5C518] border border-dashed border-[#F5C518]/60 rounded px-2 py-1 ${className}`}>
      TODO (masqué en production) : {texte}
    </p>
  );
}
