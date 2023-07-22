import express from 'express'
const router = express.Router()
import {createJob, deleteJob, GetallJobs, updateJob,showStats} from '../controllers/jobsControllers.js'
router.route('/').post(createJob).get(GetallJobs)

router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)


export default router