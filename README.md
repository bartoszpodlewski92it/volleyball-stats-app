Volleyball Stats App

Live Demo: [volleyball-stats-app](https://volleyball-stats-app-azure.vercel.app/)

Aplikacja webowa desktopowa stworzona w Next.js służąca do rejestrowania, kalkulacji oraz zaawansowanej analizy statystyk siatkarskich w czasie rzeczywistym.

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

Struktura katalogów:

```text
src/app/
├── components/          # Komponenty UI i moduły statystyk
├── helpers/             # Logika matematyczna i obliczenia
├── types/               # Definicje typów TypeScript
├── layout.tsx           # Główny układ aplikacji
└── page.tsx             # Główny widok tabeli statystyk
```

Volleyball Stats App

Live Demo: [volleyball-stats-app](https://volleyball-stats-app-azure.vercel.app/)

A web application desktop built with Next.js designed for real-time tracking, calculation, and advanced analysis of volleyball statistics.

Features and Components:

The project utilizes a component-based architecture to manage match data

* **Squad Management**: Adding and removing players using interactive modals (`AddPlayerModal`, `ConfirmModal`).
* **Statistical Modules**: Breakdown of detailed game elements:
  * `PlayerAttackCells` – attack efficiency and effectiveness.
  * `PlayerReceptionCells` – serve reception accuracy.
  * `PlayerServeCells` – aces, errors, and service efficiency.
  * The app also tracks player blocks and digs.
* **Data Aggregation**: A dynamic scoreboard and stats table (`StatsTable`, `StatsTableContent`, `PlayerRow`, `StatCell`) controlled via the dashboard panel (`StatControl`).
* **Automated Calculations**: Advanced algorithms for computing volleyball metrics, located in the `statCalculators.ts` helper.

Tech Stack:

* **Framework**: Next.js (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS (`globals.css` file)

How to Run the Project Locally:

1. Clone the repository:
   ```bash
   git clone https://github.com
   ```

2. Navigate to the project directory:
   ```bash
   cd VOLLEYBALL-STATS-APP
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the application in development mode:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

Directory Structure:

```text
src/app/
├── components/          # UI components and statistical modules
├── helpers/             # Mathematical logic and calculations
├── types/               # TypeScript type definitions
├── layout.tsx           # Main application layout
└── page.tsx             # Main view of the statistics table
```