'use client';

import { useRef, useEffect, useState } from 'react';
import { PlayerStats, OnInputChangeFn, OnStatChangeFn } from '../types/types';
import StatsTableContent from './StatsTableContent';
import { 
  getTeamTotalPoints, 
  getTeamReceptionStats, 
  getTeamAttackStats 
} from '../helpers/statCalculators';

interface StatsTableProps {
  players: PlayerStats[];
  onInputChange: OnInputChangeFn;
  onStatChange: OnStatChangeFn;
}

export default function StatsTable({ players, onInputChange, onStatChange }: StatsTableProps) {
  const fakeScrollRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState(2100);

  useEffect(() => {
    if (!tableContainerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const tableEl = entry.target.querySelector('table');
        if (tableEl) {
          setTableWidth(tableEl.offsetWidth);
        }
      }
    });

    resizeObserver.observe(tableContainerRef.current);
    return () => resizeObserver.disconnect();
  }, [players]);

  const handleFakeScroll = () => {
    if (fakeScrollRef.current && tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = fakeScrollRef.current.scrollLeft;
    }
  };

  const handleTableScroll = () => {
    if (fakeScrollRef.current && tableContainerRef.current) {
      fakeScrollRef.current.scrollLeft = tableContainerRef.current.scrollLeft;
    }
  };

  const teamPoints = getTeamTotalPoints(players);
  const rcStats = getTeamReceptionStats(players);
  const atkStats = getTeamAttackStats(players);

  return (
    <div className="w-full relative pb-6">
      <div 
        ref={tableContainerRef}
        onScroll={handleTableScroll}
        className="overflow-x-auto w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <StatsTableContent 
          players={players}
          onInputChange={onInputChange}
          onStatChange={onStatChange}
          teamPoints={teamPoints}
          rcStats={rcStats}
          atkStats={atkStats}
        />
      </div>

      <div 
        ref={fakeScrollRef}
        onScroll={handleFakeScroll}
        className="fixed bottom-0 left-0 w-full overflow-x-auto z-50 bg-transparent"
      >
        <div style={{ width: `${tableWidth}px` }} className="h-[12px]"></div>
      </div>
    </div>
  );
}
