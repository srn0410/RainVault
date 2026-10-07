const STORAGE_KEY = 'rainvault_designs';

export const saveDesign = (design) => {
  const existing = getSavedDesigns();
  const newDesign = { ...design, id: Date.now().toString(), date: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newDesign, ...existing]));
  return newDesign;
};

export const getSavedDesigns = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const deleteDesign = (id) => {
  const existing = getSavedDesigns();
  const filtered = existing.filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

// Also save active/current draft
export const saveDraft = (draft) => {
  localStorage.setItem('rainvault_draft', JSON.stringify(draft));
};

export const getDraft = () => {
  const data = localStorage.getItem('rainvault_draft');
  return data ? JSON.parse(data) : null;
};
