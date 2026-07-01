Volleyball Stats App

Aplikacja webowa stworzona w Next.js służąca do rejestrowania, kalkulacji oraz zaawansowanej analizy statystyk siatkarskich w czasie rzeczywistym.

Funkcje i komponenty projektu:

Projekt wykorzystuje architekturę komponentową do zarządzania danymi meczowymi:
* **Zarządzanie składem**: Dodawanie i usuwanie zawodników za pomocą interaktywnych okien modalnych (`AddPlayerModal`, `ConfirmModal`).
* **Moduły statystyk**: Podział na szczegółowe elementy gry:
  * `PlayerAttackCells` – skuteczność i efektywność ataku.
  * `PlayerReceptionCells` – dokładność przyjęcia zagrywki.
  * `PlayerServeCells` – asy, błędy i efektywność serwisu.
  *  Zliczamy również bloki oraz obronę zawodnika
* **Agregacja danych**: Dynamiczna tabela wyników (`StatsTable`, `StatsTableContent`, `PlayerRow`, `StatCell`) sterowana za pomocą panelu kontrolnego (`StatControl`).
* **Automatyczne obliczenia**: Zaawansowane algorytmy liczące wskaźniki siatkarskie zlokalizowane w helperze `statCalculators.ts`.

Technologia:

* **Framework**: Next.js (App Router)
* **Język**: TypeScript
* **Stylizowanie**: Tailwind CSS (plik `globals.css`)

Jak uruchomić projekt lokalnie:

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com
   ```

2. Przejdź do folderu projektu:
   ```bash
   cd VOLLEYBALL-STATS-APP
   ```

3. Zainstaluj zależności:
   ```bash
   npm install
   ```

4. Uruchom aplikację w trybie deweloperskim:
   ```bash
   npm run dev
   ```
   Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

Struktura katalogów (kluczowe pliki):

```text
src/app/
├── components/          # Komponenty UI i moduły statystyk
├── helpers/             # Logika matematyczna i obliczenia
├── types/               # Definicje typów TypeScript
├── layout.tsx           # Główny układ aplikacji
└── page.tsx             # Główny widok tabeli statystyk
```