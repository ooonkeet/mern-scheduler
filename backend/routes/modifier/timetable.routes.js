import express from 'express'
import { timetableController } from '../../controllers/modifier/timetable.controller.js';

const router=express()
router.post("/schedule" ,timetableController);
// Optional: An endpoint to check the availability of the scheduler service.
router.get("/api/scheduler-status", async (req, res) => {
  try {
    // The health/docs endpoint of the scheduler might be different.
    const schedulerHealthUrl =
      process.env.SCHEDULER_URL_HEALTH ||
      SCHEDULER_URL.replace(/\/schedule$/, "") + "/docs";
    const r = await axios.get(schedulerHealthUrl, { timeout: 3000 });
    res.json({ scheduler: "reachable", status: r.status });
  } catch (e) {
    res.status(502).json({ scheduler: "unreachable", error: e.message });
  }
});
export default router