const courses = [
    { code: "CSE 111", name: "Programming with Functions", credits: 3, completed: true, category: "CSE" },
    { code: "CSE 210", name: "Programming with Classes", credits: 3, completed: true, category: "CSE" },
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true, category: "WDD" },
    { code: "WDD 131", name: "Web Development", credits: 3, completed: true, category: "WDD" },
    { code: "ITM 111", name: "Intro to IT Management", credits: 3, completed: true, category: "ITM" },
    { code: "WDD 231", name: "Web Backend Development", credits: 3, completed: false, category: "WDD" },
    { code: "CSE 222", name: "Data Structures", credits: 3, completed: false, category: "CSE" }
];

// Function to display courses with filtering
function displayCourses(filter = "all") {
    let courseList = document.getElementById("course-list");
    courseList.innerHTML = ""; // Clear existing courses

    let filteredCourses = courses.filter(course => 
        filter === "all" || course.category === filter
    );

    filteredCourses.forEach(course => {
        let courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        // Apply category-specific classes
        courseCard.classList.add(course.category.toLowerCase());

        // Apply styles based on completion
        if (course.completed) {
            courseCard.classList.add("completed");
        } else {
            courseCard.classList.add("in-progress");
        }

        courseCard.innerHTML = `<strong>${course.code}</strong>: ${course.name} (${course.credits} credits)`;
        courseList.appendChild(courseCard);
    });
}

// Event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("all-btn").addEventListener("click", () => displayCourses("all"));
    document.getElementById("cse-btn").addEventListener("click", () => displayCourses("CSE"));
    document.getElementById("wdd-btn").addEventListener("click", () => displayCourses("WDD"));

    displayCourses(); // Load all courses by default
});

