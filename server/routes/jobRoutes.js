const express = require("express");
const { mongoose } = require("mongoose");
const Job = require("../models/Jobs");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router()
router.post('/create', authMiddleware, async (req, res) => {
    try {
      const {
        title, description, company, contact,location, salary, requirements, jobType
      } = req.body;
  
      const newJob = new Job({
        title,
        description,
        company,
        location,
        salary,
        requirements,
        jobType,
        contact,
        createdBy: req.user.id // 👈 taken from token
      });
  
      const savedJob = await newJob.save();
      res.status(201).json(savedJob);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create job', message: error.message });
    }
  });

router.get("/all-jobs" , async (req, res, next) => {
    try {
        const jobs = await Job.find().populate("createdBy", "name email");
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});
router.get("/my-jobs", authMiddleware, async (req, res) => {
    try {
      const userJobs = await Job.find({ createdBy: req.user.id });
      res.status(200).json(userJobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user jobs" });
    }
  });
router.get("/:id", async (req, res,next) => {
    try{
        const jobId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ error: "Invalid job ID" });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ error: "Failed to fetch job" });

    }
})
router.put('/:id',authMiddleware, async (req, res, next) => {
    try {
        const jobId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ error: "Invalid job ID" });
        }   
        const updateJob = await Job.findByIdAndUpdate(jobId , req.body ,{new: true,runValidators: true});
        if (!updateJob) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json(updateJob);
    }
    catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ error: "Failed to update job" });
    }
});

router.delete('/:id', authMiddleware,async (req, res, next) => {
    try{
        const jobId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ error: "Invalid job ID" });
        }
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ error: "Failed to delete job" });

    }
})
module.exports = router;