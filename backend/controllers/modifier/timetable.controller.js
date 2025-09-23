

const SCHEDULER_URL=process.env.SCHEDULER_URL;
const timetableController= async (req,res)=>{
    try {
    // Basic validation for the incoming request body.
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Empty request body" });
    }

    console.log("Forwarding request to scheduler:", SCHEDULER_URL);
    // Forward the request to the Python microservice (scheduler).
    // A generous timeout is set for potentially long-running scheduling tasks.
    const response = await axios.post(SCHEDULER_URL, req.body, {
      timeout: 60000,
    });

    // Respond with the data from the microservice.
    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Error while generating schedule:", err.message);

    // If the scheduler service responded with an error, forward that error.
    // This provides more specific error details to the client.
    if (err.response) {
      const status = err.response.status || 500;
      const data = err.response.data || { error: "Scheduler service error" };
      return res.status(status).json({ ...data, forwarded: true });
    }

    // Handle network errors or other issues when communicating with the scheduler.
    return res.status(502).json({
      error: "Failed to communicate with the scheduler service",
      details: err.message,
    });
  }
}
export {timetableController}