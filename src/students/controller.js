const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.rows.length > 0) {
                res.status(200).json(results.rows[0]);
            } else {
                res.status(404).send('Student not found');
            }
        }
    });
};

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    // Check if email already exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.rows.length > 0) {
                return res.status(400).send('Email already exists');
            }
            // Add student if email does not exist
            pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
                if (error) {
                    console.error('Error executing query', error);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    res.status(201).send(`Student added with ID: ${results.rows[0].id}`);
                }
            });
        }
    });
};

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.rowCount === 0) {
                res.status(404).send(`Student not found with ID ${id}`);
            } else {
                res.status(200).send(`Student deleted Successfully`);
            }
        }
    });
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, age, dob } = req.body;
    pool.query(queries.updateStudent, [name, email, age, dob, id], (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).send(`Student updated Successfully`);
        }
    });
};

module.exports = { getStudents, getStudentById, addStudent, removeStudent, updateStudent };
