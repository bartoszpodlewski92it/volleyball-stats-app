'use client';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-6 max-w-sm w-full space-y-4 transform transition-all animate-scale-in">
        <div className="flex items-center gap-3 text-rose-500">
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        
        <p className="text-slate-300 text-sm leading-relaxed">
          {message}
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded font-semibold transition cursor-pointer text-sm"
          >
            Anuluj
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded font-semibold transition cursor-pointer text-sm shadow-lg shadow-rose-600/20"
          >
            Resetuj mecz
          </button>
        </div>
      </div>
    </div>
  );
}
