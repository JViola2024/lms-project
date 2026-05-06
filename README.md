# StudyTrack

Webes tanulásszervező alkalmazás egyetemi hallgatóknak. A felhasználó tárgyakat, beadandókat, zárthelyi dolgozatokat és szóbeli vizsgákat tud rögzíteni határidővel és státusszal (hátralévő, folyamatban, befejezett), majd ezeket szerkeszteni vagy törölni.

A projekt egyetemi alkalmazásfejlesztési tárgyhoz készült beadandó.

## Teljes szoftverdokumentáció

A részletes, fejezetekre bontott dokumentáció (követelmények, technológiák, architektúra, adatmodell, REST API specifikáció, telepítés, felhasználói kézikönyv stb.) PDF formában található a repo gyökerében:

- [StudyTrack_dokumentacio.pdf](StudyTrack_dokumentacio.pdf)

## Architektúra röviden

- **Frontend:** vanilla HTML, CSS, JavaScript (Fetch API)
- **Backend:** Node.js, Express 5, Mongoose 9
- **Adatbázis:** MongoDB (felhőben MongoDB Atlas)
- **Hosting:** Render (backend), statikus frontend bárhol

## Mappastruktúra

```
.
├── index.html, app.js, style.css   # frontend
├── background.jpg
└── backend/
    ├── package.json
    └── src/
        ├── app.js                  # Express belépési pont
        ├── routes/api.js           # REST végpontok
        ├── controllers/            # üzleti logika
        ├── models/Subject.js       # Mongoose séma
        └── utils/logger.js
```

## Helyi futtatás

1. Klónozd a repozitóriumot.
2. Backend indítása:
   ```
   cd backend
   npm install
   npm run dev
   ```
3. Hozz létre egy `.env` fájlt a `backend/` mappában:
   ```
   URI=mongodb+srv://<felhasznalo>:<jelszo>@<klaszter>.mongodb.net/studytrack
   ORIGIN=http://localhost:5500
   PORT=5000
   ```
4. A frontend (`index.html`) tetszőleges statikus szerverrel kiszolgálható (pl. VS Code Live Server).

## REST API végpontok

| Metódus | Útvonal | Leírás |
|---|---|---|
| GET | `/api/subjects` | Összes tárgy lekérdezése |
| GET | `/api/subjects/:id` | Egy tárgy lekérdezése |
| POST | `/api/subjects` | Új tárgy létrehozása |
| PUT | `/api/subjects/:id` | Tárgy módosítása |
| DELETE | `/api/subjects/:id` | Tárgy törlése |

További részletek a teljes dokumentációban.
