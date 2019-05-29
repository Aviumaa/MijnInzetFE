'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const newData = [];

        const titles = ["Fasten your seatbelts",
            "User interaction",
            "Personal skills",
            "Programming",
            "Object oriented programming 1",
            "Databases",
            "Project skills",
            "Project agile development",
            "Object oriented programming 2",
            "Infrastructure",
            "Research skills",
            "Business",
            "Databases 2",
            "Communication skills",
            "Essential skills wiskunde",
            "Essential skills Nederlands",
            "Essential skills Engels",
            "Enterprise web application",
            "Datastructes",
            "Object oriented analysis an design",
            "Beroepsethiek en maatschappelijke orientatie",
            "Bedrijfspunt",
            "Sorting and searching",
            "Testing",
            "Professional skills",
            "Portfolio presentatie"];

        const ects = [12, 3, 2, 3, 3, 3, 2, 12, 3, 3, 2, 3, 3, 2, 2, 1, 1, 12, 3, 3, 2, 1, 3, 3, 2, 1];
        const periods = ["Sem 1",
            "Blok 1",
            "Blok 1",
            "Blok 1",
            "Blok 2",
            "Blok 2",
            "Blok 2",
            "Sem 2",
            "Blok 3",
            "Blok 3",
            "Blok 3",
            "Blok 4",
            "Blok 4",
            "Blok 4",
            "",
            "",
            "",
            "Sem 1",
            "Blok 1",
            "Blok 1",
            "Blok 1",
            "Blok 1",
            "Blok 2",
            "Blok 2",
            "Blok 2",
            "Blok 2"];

        const types = [
            "Project",
            "Class",
            "Class",
            "Class",
            "Class",
            "Class",
            "Class",
            "Project",
            "Class",
            "Class",
            "Class",
            "Class",
            "Class",
            "Class",
            "Class",
            "Class",
            "Class",
            "Project",
            "Class",
            "Class",
            "Class",
            "Business point",
            "Class",
            "Class",
            "Class",
            "Presentation"
        ];

        for (let i = 0; i < titles.length; i++) {
            const seedData = {
                title: titles[i],
                ects: ects[i],
                period: periods[i],
                type: types[i],
                createdAt: new Date(),
                updatedAt: new Date()
            };
            newData.push(seedData);
        }

        return queryInterface.bulkInsert('courses', newData);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('courses', null, {});
    }
};
