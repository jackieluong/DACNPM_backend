const connection = require("../config/database");



let getAllCourses = async (req, res) => {
    try {
        // Execute the query to fetch all courses
        const [results, fields] = await connection.execute("SELECT * FROM course");

        // Respond with the fetched courses
        return res.status(200).json({
            message: 'ok',
            data: results
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error fetching courses:", error.message);
        return res.status(500).json({
            message: 'Error fetching courses',
            error: error.message
        });
    }
};

let createNewCourse = async (req, res) => {
    try {
        let { id, name, fee, description, status } = req.body;

        
        if (!name || !fee || !description || !status) {
            return res.status(400).json({
                message: 'Missing required params'
            });
        }

        // Execute the query to insert a new course
        const [results, fields] = await connection.execute(
            `INSERT INTO Course(ID, Name, Fee, Description, Status) VALUES (?, ?, ?, ?, ?)`,
            [id, name, fee, description, status]
        );

        // Respond with a success message
        return res.status(201).json({
            message: 'Course created successfully',
            newCourseID: id
        });
    } catch (error) {
        // Handle errors if the query fails
        console.error("Error creating course:", error.message);
        return res.status(500).json({
            message: 'Error creating course',
            error: error.message
        });
    }
};

module.exports = {
    getAllCourses,
    createNewCourse
};
