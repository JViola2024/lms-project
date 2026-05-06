const Subject = require('../models/Subject');
const log = require('../utils/logger');

// Összes tárgy lekérése
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    log.db(`Lekérve: ${subjects.length} tárgy`);
    res
      .status(200)
      .json({ success: true, count: subjects.length, data: subjects });
  } catch (error) {
    log.error('Hiba a listázáskor:', error.message);
    res.status(500).json({ success: false, error: 'Szerver hiba történt' });
  }
};

// Egy tárgy lekérése ID alapján
exports.getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findById(id);

    if (!subject) {
      log.warn(`Tárgy nem található: ${id}`);
      return res
        .status(404)
        .json({ success: false, message: 'Nincs ilyen azonosítójú tárgy!' });
    }

    log.db(`Lekérve: ${subject.name}`);
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    log.error('Hiba a lekéréskor:', error.message);
    res.status(500).json({ success: false, error: 'Szerver hiba történt' });
  }
};

// Tárgy létrehozása
exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    log.db(`Létrehozva: ${subject.name}`);
    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    log.error('Hiba a létrehozáskor:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Tárgy módosítása
exports.editSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: 'Nincs ilyen elnevezésű tárgy!' });
    }

    log.db(`Módosítva: ${subject.name}`);
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    log.error('Hiba a módosításkor:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Egy tárgy törlése
exports.deleteSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: 'Nincs ilyen elnevezésű tárgy!' });
    }

    log.db(`Törölve: ${subject.name}`);
    res.status(200).json({ success: true, message: 'Tárgy sikeresen törölve' });
  } catch (error) {
    log.error('Hiba a törléskor:', error.message);
    res.status(500).json({ success: false, error: 'Szerver hiba történt' });
  }
};

// Összes tárgy törlése
exports.deleteSubjects = async (req, res) => {
  try {
    await Subject.deleteMany();
    log.warn('AZ ÖSSZES ADAT TÖRÖLVE!');
    res.status(200).json({ success: true, message: 'Minden tárgy törölve' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Szerver hiba történt' });
  }
};
