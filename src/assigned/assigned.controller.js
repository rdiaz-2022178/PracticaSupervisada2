import Assigned from '../assigned/assigned.model.js'
import User from '../user/user.model.js'
import Course from '../courses/course.model.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const add = async (req, res) => {
    try {

        let data = req.body
        let existingAssignment = await Assigned.findOne({
            student: data.student,
            course: data.course
        });

        if (existingAssignment) {
            return res.status(400).send({ message: 'User is already assigned to this course' });
        }
        let user = await User.findById(data.student);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        if (user.role == 'TEACHER') return res.status(400).send({ message: 'Teacher cannot be assigned to a course' });
        let assignmentCount = await Assigned.countDocuments({ student: data.student });
        if (assignmentCount >= 3) {
            return res.status(400).send({ message: 'User cannot be assigned to more than 3 courses' });
        }

        let course = await Course.findById(data.course);
        if (!course) {
            return res.status(404).send({ message: 'Course not found' });
        }
        let assigned = new Assigned(data)
        await assigned.save()
        return res.send({ message: 'assigned successfully' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'error when assigning to a course' })
    }
}

export const find = async (req, res) => {
    try {
        let {id} = req.params
        let assigned = await Assigned.find({student: id}).populate('course')
        return res.send({ assigned })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting assigned' })
    }
}

export const unassign = async (req, res)=>{
    try {
        
    } catch (error) {
        
    }
}