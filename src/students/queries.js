const getStudentsQuery = 'SELECT * FROM students';
const getStudentByIdQuery = 'SELECT * FROM students WHERE id = $1';
const checkEmailExistsQuery = 'SELECT * FROM students WHERE email = $1';
const addStudentQuery = 'INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4) RETURNING id';
const removeStudentQuery = 'DELETE FROM students WHERE id = $1';
const updateStudentQuery = 'UPDATE students SET name = $1, email = $2, age = $3, dob = $4 WHERE id = $5';

module.exports = {
    getStudents: getStudentsQuery,
    getStudentById: getStudentByIdQuery,
    checkEmailExists: checkEmailExistsQuery,
    addStudent: addStudentQuery,
    removeStudent: removeStudentQuery,
    updateStudent: updateStudentQuery,
};
