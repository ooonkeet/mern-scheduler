import University from "../../models/admin/university.model.js";

export const createUniversity = async (req, res) => {
  try {
    const university = new University(req.body);
    await university.save();
    res.status(201).json(university);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUniversities = async (req, res) => {
  try {
    const university= await University.find({});
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) return res.status(404).json({ message: "Not found" });
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!university) return res.status(404).json({ message: "Not found" });
    res.json(university);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUniversity = async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    if (!university) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
