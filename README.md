# Barber App - Gestione Appuntamenti

## Descrizione

Barber App è un'applicazione web progettata per semplificare la gestione degli appuntamenti in un salone da barbiere. L'obiettivo principale dell'app è offrire un'esperienza intuitiva sia ai clienti che al barbiere, permettendo di prenotare trattamenti in modo rapido e senza complicazioni.

Gli utenti possono registrarsi, accedere alla propria area personale e prenotare un appuntamento scegliendo il trattamento desiderato e un orario disponibile. La piattaforma permette inoltre di visualizzare gli appuntamenti futuri e storici, offrendo una panoramica chiara delle prenotazioni.

Il barbiere, invece, può gestire gli appuntamenti ricevuti, consultare gli orari disponibili e monitorare il flusso di clienti in modo efficace. Grazie a un sistema di autenticazione sicuro e ruoli ben definiti, Barber App garantisce un'esperienza d'uso ottimale per tutti gli utenti.

## Funzionalità principali

- **Registrazione e login** per accedere alle funzionalità riservate agli utenti
- **Prenotazione appuntamenti** con selezione di trattamento e orario
- **Visualizzazione appuntamenti** futuri e passati
- **Gestione utenti** con possibilità di modifica del profilo
- **Ruoli utenti:**
  - `USER`: Cliente che può prenotare e gestire i propri appuntamenti
  - `BARBER`: Barbiere con accesso alla gestione degli appuntamenti e alla visualizzazione degli orari disponibili

## Tecnologie utilizzate

### **Frontend:**

- React con React Router per il routing
- React-Bootstrap
- Fetch API per la gestione delle chiamate HTTP
- Stile minimale e intuitivo per un'esperienza utente fluida

### **Backend:**

- Spring Boot con Spring Security per la gestione dell'autenticazione e delle autorizzazioni
- Spring Mail per l'invio della Mail alla creazione dell'appuntamento
- PostgreSQL come database relazionale
- API REST per la comunicazione tra frontend e backend

## API principali

### **Autenticazione**

- `POST /auth/register` → Registra un nuovo utente
- `POST /auth/login` → Effettua il login e restituisce il token di sessione

### **Prenotazioni**

- `GET /appointments` → Recupera gli appuntamenti dell'utente loggato
- `POST /appointments` → Prenota un nuovo appuntamento
- `PUT /appointments/{id}` → Modifica un appuntamento esistente
- `DELETE /appointments/{id}` → Cancella un appuntamento

## Contatti

Se hai domande o desideri contribuire al progetto, puoi contattarmi a [davide.depasquale1998@gmail.com](mailto:davide.depasquale1998@gmail.com).

## PARTE BACK-END :

https://github.com/DavideDePasquale/barber.git
