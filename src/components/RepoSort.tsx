import { type JSX, useState, useRef, useEffect } from "react";
import { useAppStore } from "../store";
import '../styles/OpenSource.css';

const RepoSort = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sortOption = useAppStore((state) => state.repoSortOption);
  const setRepoSortOption = useAppStore((state) => state.setRepoSortOption);

  const sortOptions = [
    { value: 'updated' as const, label: 'Last updated' },
    { value: 'name' as const, label: 'Name' },
    { value: 'stars' as const, label: 'Stars' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: 'updated' | 'name' | 'stars') => {
    setRepoSortOption(value);
    setIsOpen(false);
  };

  return (
    <div className="repo-sort-container" ref={dropdownRef}>
      <button
        className="btn btn-primary"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        Sort <span className="ml-1">▼</span>
      </button>

      {isOpen && (
        <div className="repo-sort-dropdown">
          <div className="repo-sort-header">
            <span>Select order</span>
            <button 
              className="repo-sort-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="repo-sort-options">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`repo-sort-option ${sortOption === option.value ? 'active' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {sortOption === option.value && <span className="checkmark">✓</span>}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoSort;
