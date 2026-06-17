'use client';

import { useState } from 'react';

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (number: string, name: string) => void;
}

export default function AddPlayerModal({ isOpen, onClose, onAdd }: AddPlayerModalProps) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Walidacja numeru (tylko cyfry 0-99)
  const handleNumberChange = (val: string) => {
    setError('');
    if (val === '') {
      setNumber('');
      return;
    }
    if (!/^\d+$/.test(val)) {
      setError('Numer na koszulce musi składać się wyłącznie z cyfr!');
      return;
    }
    const num = parseInt(val, 10);
    if (num < 0 || num > 99) {
      setError('Numer musi mieścić się w zakresie od 0 do 99!');
      return;
    }
    setNumber(val);
  };

  const handleNameChange = (val: string) => {
    setError('');
    setName(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    const trimmedNumber = number.trim();

    if (!trimmedNumber) {
      setError('Musisz podać numer zawodnika!');
      return;
    }

    if (trimmedName.length < 3 || trimmedName.length > 30) {
      setError('Imię i nazwisko musi mieć od 3 do 30 znaków!');
      return;
    }

    onAdd(trimmedNumber, trimmedName);
    setNumber('');
    setName('');
    onClose();
  };

  const isInvalid = !number || name.trim().length < 3 || !!error;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-6 max-w-sm w-full space-y-4 transform transition-all animate-scale-in">
        <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">Dodaj Zawodnika</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Numer na koszulce (0-99)</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="np. 9"
              value={number}
              onChange={(e) => handleNumberChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-sky-500 text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Imię i Nazwisko (3-30 znaków)</label>
            <input
              type="text"
              placeholder="np. Wilfredo Leon"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-sky-500 text-sm"
            />
          </div>

          {error && (
            <p className="text-xs font-semibold text-rose-400 bg-rose-950/30 border border-rose-900/50 p-2 rounded animate-shake">
              ⚠️ {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setError('');
                setNumber('');
                setName('');
                onClose();
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded font-semibold transition cursor-pointer text-sm"
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={isInvalid}
              className={`px-4 py-2 text-white rounded font-semibold transition text-sm shadow-lg ${
                isInvalid 
                  ? 'bg-slate-600 opacity-40 cursor-not-allowed shadow-none' 
                  : 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer shadow-emerald-600/20'
              }`}
            >
              Dodaj zawodnika
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
