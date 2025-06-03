const express = require("express");
const Job = require("../models/Jobs");
const authMiddleware = require("../middleware/authMiddleware");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.post("/create",authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      contact,
      requirements,
      jobType,
    } = req.body;
    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      contact,
      requirements,
      jobType,
      createdBy: req.user.id,
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create job", message: error.message });
  }
});
router.get("/all-jobs", async (req, res) => {
    try{
        const jobs =await Job.find().populate("createdBy","name")
        res.status(200).json(jobs)
    }
    catch(error){
        res.status(500).json({error: "Failed to fetch jobs"})
    }
})
router.get("/:id",async (req, res)=> {
    try{
        const JobId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(JobId)){
            return res.status(400).json({error: "Invaild job id"})
        }
        const job = await Job.findById(JobId);
        if(!job){
            return res.status(404).json({error :"Job Not found"})
        }
        res.status(200).json(job);
    }    
    catch(error) {
        return res.status(500).json({error: "Failed to get Job"})
    }
})
router.get("/my-jobs" , authMiddleware , async(req,res) => {
    try{
        const userJobs = await Job.findOne({createdBy: req.user.id})
        res.status(200).json(userJobs)
    }
    catch(error){
        res.status(500).json({error: "Failed to get MY Jobs"})
    }
})
router.put("/:id" , authMiddleware , async(req,res)=>{
try{
   const JobId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(JobId)){
       return res.status(500).json({error: "failed to fetch id"})
    }
    const updateJob = await Job.findByIdAndUpdate(JobId , req.body ,{new: true, runValidators: true})
    if(!mongoose.Types.ObjectId.isValid(updateJob)){
        return res.status(500).json({error: "not find id"})
    }
    res.status(200).json(updateJob)
}
catch(error){
    res.status(500).json({error: "Failed to update"})
}
})
router.delete("/:id", authMiddleware, async (req, res)=>{
    try{
        const JobId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(JobId)){
            return res.status(500).json({error: "Invaild Id"})
        }
        const deletedJob = await Job.findOneAndDelete(JobId)
        if(!deletedJob){
            return res.status(404).json({error: "Job Not found"})
        }
        res.status(200).json({message: "Job Deleted Successfully"})
    }
    catch(error){
        res.status(500).json({error: "Failed to Delete"})
    }
    
})

module.exports = router;