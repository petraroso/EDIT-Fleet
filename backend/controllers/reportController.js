import { Report } from "../models/models.js";

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({});
    res.json(reports);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja prijava:", error);
    res.status(500).json({ error: "Dogodila se greška na serveru" });
  }
};

export const reportProblem = async (req, res) => {
  const report = req.body;

  if (!req.user) {
    return res.status(401).json({ error: "Neautoriziran zahtjev" });
  }

  const newReport = new Report({
    title: report.title,
    description: report.description,
    vehicle: report.vehicle,
    user: req.user._id,
  });

  try {
    const savedReport = await newReport.save();
    res.status(201).json({
      message: "Prijava problema stvorena",
      report: savedReport,
    });
  } catch (error) {
    console.error("Greška prilikom spremanja prijave problema:", error);
    res.status(500).json({ error: "Dogodila se greška na serveru" });
  }
};
