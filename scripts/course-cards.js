// 1. Your Course Array
const courses = [
  { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce students to programming...', technology: ['Python'], completed: true },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course introduces students to the World Wide Web...', technology: ['HTML', 'CSS'], completed: true },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, certificate: 'Web and Computer Programming', description: 'CSE 111 students become more organized...', technology: ['Python'], completed: false },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, certificate: 'Web and Computer Programming', description: 'This course will introduce the notion of classes...', technology: ['C#'], completed: false },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience...', technology: ['HTML', 'CSS', 'JavaScript'], completed: true },
  { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, certificate: 'Web and Computer Programming', description: 'This course builds on prior experience...', technology: ['HTML', 'CSS', 'JavaScript'], completed: false }
];

// 2. Select HTML Elements
const courseList = document.querySelector('#course-list');
const creditTotal = document.querySelector('#credit-total');

// 3. Reusable function to render courses to the screen
function renderCourses(filteredCourses) {
  // Clear out the HTML list so we can rebuild it
  courseList.innerHTML = '';

  // Loop through the provided array and create HTML elements
  filteredCourses.forEach(course => {
    const li = document.createElement('li');
    li.textContent = `${course.subject} ${course.number}`;

    // If the course is completed, add our special CSS class
    if (course.completed === true) {
      li.classList.add('completed');
    }

    courseList.appendChild(li);
  });

  // 4. Use reduce to calculate the total credits of the currently displayed courses
  const totalCredits = filteredCourses.reduce((accumulator, course) => {
    return accumulator + course.credits;
  }, 0); // 0 is the starting value for the accumulator

  creditTotal.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

// 5. Button Event Listeners using array.filter()
document.querySelector('#all').addEventListener('click', () => {
  renderCourses(courses); // Pass the whole, unfiltered array
});

document.querySelector('#CSE').addEventListener('click', () => {
  // Filter for only CSE courses
  const cseCourses = courses.filter(course => course.subject === 'CSE');
  renderCourses(cseCourses); 
});

document.querySelector('#WDD').addEventListener('click', () => {
  // Filter for only WDD courses
  const wddCourses = courses.filter(course => course.subject === 'WDD');
  renderCourses(wddCourses);
});

// 6. Run once when the page loads to display all courses by default
renderCourses(courses);