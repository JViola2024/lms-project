# StudyTrack

Webes tanulásszervező alkalmazás egyetemi hallgatóknak. A felhasználó tárgyakat, beadandókat, zárthelyi dolgozatokat és szóbeli vizsgákat tud rögzíteni határidővel és státusszal (hátralévő, folyamatban, befejezett), majd ezeket szerkeszteni vagy törölni.

A projekt egyetemi alkalmazásfejlesztési tárgyhoz készült beadandó.

## Teljes szoftverdokumentáció

A részletes, fejezetekre bontott dokumentáció (követelmények, technológiák, architektúra, adatmodell, REST API specifikáció, telepítés, felhasználói kézikönyv stb.) PDF formában található a repo gyökerében:

- [StudyTrack_dokumentacio.pdf](StudyTrack_dokumentacio.pdf)

## Architektúra röviden

- **Frontend:** HTML, CSS, JavaScript (Fetch API)
- **Backend:** Node.js, Express 5, Mongoose 9
- **Adatbázis:** MongoDB (felhőben MongoDB Atlas)
- **Hosting:** Render (backend), statikus frontend bárhol

## Mappastruktúra

```
.
├── index.html, app.js, style.css
├── background.jpg
└── backend/
    ├── package.json
    └── src/
        ├── app.js                  
        ├── routes/api.js          
        ├── controllers/            
        ├── models/Subject.js       
        └── utils/logger.js
```

További részletek a teljes dokumentációban.
