export const getLanguageColorClass = (language: string): string => {
  const languageMap: Record<string, string> = {
    'TypeScript': 'lang-typescript',
    'JavaScript': 'lang-javascript',
    'Python': 'lang-python',
    'Java': 'lang-java',
    'Shell': 'lang-shell',
    'TeX': 'lang-tex',
  };
  
  return languageMap[language] || 'lang-default';
};
