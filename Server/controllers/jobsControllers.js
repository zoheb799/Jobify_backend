const createJob = async (req, res) => {
    res.send('create job')
}
const deleteJob = async (req, res) => {
    res.send('delete job')
}

const GetallJobs = async (req, res) => {
    res.send('GetallJobs')
}
const updateJob = async (req, res) => {
    res.send('updateJob')
}
const showStats = async (req, res) => {
    res.send('showStats job')
}

export {createJob, deleteJob, GetallJobs, updateJob,showStats}