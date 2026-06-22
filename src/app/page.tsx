'use client';

import { useState, useEffect } from 'react';
import { PlayerStats } from './types/types';
import StatsTable from './components/StatsTable';
import ConfirmModal from './components/ConfirmModal';
import AddPlayerModal from './components/AddPlayerModal';

const initialRows: PlayerStats[] = [];

export default function Home() {
  const [players, setPlayers] = useState<PlayerStats[]>(initialRows);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('volleyball-stats');
    if (savedData) {
      try {
        setPlayers(JSON.parse(savedData));
      } catch (e) {
        console.error('Błąd odczytu danych z LocalStorage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('volleyball-stats', JSON.stringify(players));
    }
  }, [players, isLoaded]);

  const handleInputChange = (id: number, field: 'number' | 'name', value: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleStatChange = (
    id: number,
    field: 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError' | 'blockPoint' | 'digSuccess' | 'receptionPerfect' | 'receptionGood' | 'receptionInaccurate' | 'receptionError',
    amount: 1 | -1
  ) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: Math.max(0, p[field] + amount) } : p));
  };

  const handleAddPlayer = (number: string, name: string) => {
    const newPlayer: PlayerStats = {
      id: Date.now(),
      number,
      name,
      serveAce: 0,
      serveCont: 0,
      serveError: 0,
      attackKill: 0,
      attackError: 0,
      attackCont: 0,
      blockPoint: 0,
      digSuccess: 0,
      receptionPerfect: 0,
      receptionGood: 0,
      receptionInaccurate: 0,
      receptionError: 0,
    };
    setPlayers([...players, newPlayer]);
  };

  const confirmReset = () => {
    setPlayers(initialRows);
    setIsResetModalOpen(false);
  };

  if (!isLoaded) {
    return <main className="p-6 bg-amber-950 min-h-screen text-white">Ładowanie dashboardu...</main>;
  }

  return (
    <main className="py-6 px-0 bg-amber-950 min-h-screen text-white relative">

      <div className="flex justify-between items-center mb-6 px-6">
        <h1 className="text-2xl font-bold">Dashboard Statystyk Siatkarskich</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded transition cursor-pointer text-sm shadow-md"
          >
            + Dodaj Zawodnika
          </button>

          <button
            onClick={() => setIsResetModalOpen(true)}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded transition cursor-pointer text-sm"
          >
            Resetuj Mecz
          </button>
        </div>
      </div>

      {players.length > 0 ? (
        <StatsTable
          players={players}
          onInputChange={handleInputChange}
          onStatChange={handleStatChange}
        />
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg">Brak zawodników w tym meczu.</p>
          <p className="text-sm mt-1">Kliknij przycisk powyżej, aby dodać pierwszego gracza i zacząć statystyki.</p>
        </div>
      )}

      <ConfirmModal
        isOpen={isResetModalOpen}
        title="Ostrzeżenie"
        message="Czy na pewno chcesz wyczyścić wszystkie bieżące statystyki i rozpocząć nowy mecz? Tej operacji nie da się cofnąć."
        onConfirm={confirmReset}
        onCancel={() => setIsResetModalOpen(false)}
      />

      <AddPlayerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPlayer}
      />
    </main>
  );
}
