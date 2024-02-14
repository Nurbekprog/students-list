let students = JSON.parse(localStorage.getItem('students')) || [];
let studentEditing = null;

const studentList = document.getElementById('student-list');
const search = document.getElementById('search');
const filter = document.getElementById('filter');
const btnAdd = document.getElementById('btn-add');
const btnEdit = document.getElementById('btn-edit');
const btnUpdate = document.getElementById('btn-update');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const group = document.getElementById('group');
const doesWork = document.getElementById('doesWork');

const firstNameEdit = document.getElementById('firstNameEdit');
const lastNameEdit = document.getElementById('lastNameEdit');
const groupEdit = document.getElementById('groupEdit');
const doesWorkEdit = document.getElementById('doesWorkEdit');

function displayStudents(students) {
  let str = '';
  students.forEach((student) => {
    str += `
      <tr >
        <td>${student.id}</td>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.group}</td>
        <td>${student.doesWork ? 'Ha' : "Yo'q"}</td>
        <td>
          <button class="btn btn-sm btn-warning" data-bs-toggle="modal"
          data-bs-target="#editModal" onclick="handleEdit(${
            student.id
          })">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteStudent(${
            student.id
          })">Delete</button>
        </td>
      </tr>
    `;
  });
  studentList.innerHTML = str;
}

displayStudents(students);

btnAdd.addEventListener('click', function (e) {
  e.preventDefault();
  const newStudent = {
    id: students.length + 1,
    firstName: firstName.value,
    lastName: lastName.value,
    group: group.value,
    doesWork: doesWork.checked,
  };
  let newStudents = [...students, newStudent];
  displayStudents(newStudents);
  localStorage.setItem('students', JSON.stringify(newStudents));
});

function deleteStudent(studentId) {
  if (confirm('Are you sure you want to delete this student?')) {
    let students = JSON.parse(localStorage.getItem('students'));
    let newStudents = students.filter((student) => student.id !== studentId);
    displayStudents(newStudents);
    localStorage.setItem('students', JSON.stringify(newStudents));
  }
}

function handleEdit(studentId) {
  const students = JSON.parse(localStorage.getItem('students'));
  const studentEdit = students.find((student) => student.id === studentId);
  studentEditing = studentEdit;

  firstNameEdit.value = studentEdit.firstName;
  lastNameEdit.value = studentEdit.lastName;
  groupEdit.value = studentEdit.group;
  doesWorkEdit.checked = studentEdit.doesWork;
}

btnUpdate.addEventListener('click', function (e) {
  e.preventDefault();
  let studentId = studentEditing.id;
  let studentUpdated = {
    id: studentId,
    firstName: firstNameEdit.value,
    lastName: lastNameEdit.value,
    group: groupEdit.value,
    doesWork: doesWorkEdit.checked,
  };

  let students = JSON.parse(localStorage.getItem('students'));
  let newStudents = students.map((student) =>
    student.id === studentId ? studentUpdated : student
  );
  displayStudents(newStudents);
  localStorage.setItem('students', JSON.stringify(newStudents));
});

search.addEventListener('input', function (e) {
  let text = e.target.value.toLowerCase();
  let students = JSON.parse(localStorage.getItem('students'));
  let newStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(text) ||
      student.lastName.toLowerCase().includes(text) ||
      student.group.toLowerCase().includes(text)
  );
  displayStudents(newStudents);
});

filter.addEventListener('change', function (e) {
  let value = e.target.value;
  let students = JSON.parse(localStorage.getItem('students'));
  let newStudents =
    value === 'All'
      ? students
      : students.filter((student) => student.group === value);
  displayStudents(newStudents);
});
