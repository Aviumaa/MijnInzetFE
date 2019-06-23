const {Course, EducationalProgramCourse} = require("../sequelize");

exports.getAllCourses = async () => {
    try {
        return await Course.findAll()
    } catch (e) {
        throw Error("Error while finding all courses");
    }
};

exports.getCourseById = async (id) => {
    try {
        return await Course.findOne(
            {
                where:
                    {id: id}
            })
    } catch (e) {
        throw Error("Error while finding course with id: " + id);
    }
};

exports.postCourse = async (title, ects, period, type) => {
    try {
        return await Course.create({
            title: title,
            ects: ects,
            period: period,
            type: type
        })
    } catch (e) {
        throw Error("Error while creating new course")
    }
}

exports.postCourseWithProgram = async (title, ects, period, type, programId) => {
    try {
        return await Course.created({
            title: title,
            ects: ects,
            period: period,
            type: type
        }).then(result => {
            EducationalProgramCourse.create({
                educationalProgramId: programId,
                courseId: result.id
            })
        })
    } catch (e) {
        throw Error("Error while creating new course")
    }
}

exports.destroyCoursesByProgramId = async (id) => {
    try {
        return await EducationalProgramCourse.destroy({
            where: {
                educationalProgramId: id
            }
        });
    } catch (e) {
        throw Error("Error while deleting courses with program id: " + id);
    }
}
