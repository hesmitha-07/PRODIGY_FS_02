// ---------------------
// Authentication
// ---------------------

function login()
{
    let username =
    document.getElementById("username").value;

    let password =
    document.getElementById("password").value;

    if(username==="admin" &&
       password==="admin123")
    {
        localStorage.setItem(
            "admin",
            "true"
        );

        window.location.href =
        "dashboard.html";
    }
    else
    {
        alert("Invalid Credentials");
    }
}

// Protect Dashboard

if(window.location.pathname.includes("dashboard"))
{
    if(localStorage.getItem("admin")!=="true")
    {
        window.location.href =
        "login.html";
    }
}

// Logout

function logout()
{
    localStorage.removeItem("admin");

    window.location.href =
    "login.html";
}

// ---------------------
// Employee CRUD
// ---------------------

let employees =
JSON.parse(
localStorage.getItem("employees")
) || [];

let editIndex = -1;

// Save Employee

function saveEmployee()
{
    let id =
    document.getElementById("empId").value.trim();

    let name =
    document.getElementById("empName").value.trim();

    let department =
    document.getElementById("department").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let salary =
    document.getElementById("salary").value.trim();

    // Validation

    if(id==="" ||
       name==="" ||
       department==="" ||
       email==="" ||
       salary==="")
    {
        alert("All fields are required");
        return;
    }

    if(isNaN(salary))
    {
        alert("Salary must be numeric");
        return;
    }

    if(!email.includes("@"))
    {
        alert("Enter valid email");
        return;
    }

    // Duplicate Employee ID

    if(editIndex===-1)
    {
        let duplicate =
        employees.find(emp=>emp.id===id);

        if(duplicate)
        {
            alert("Employee ID already exists");
            return;
        }
    }

    let employee =
    {
        id,
        name,
        department,
        email,
        salary
    };

    if(editIndex===-1)
    {
        employees.push(employee);
    }
    else
    {
        employees[editIndex] =
        employee;

        editIndex = -1;
    }

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    clearForm();

    displayEmployees();
}

// Display Employees

function displayEmployees()
{
    let table =
    document.getElementById(
        "employeeTable"
    );

    if(!table) return;

    table.innerHTML = "";

    employees.forEach((emp,index)=>{

        table.innerHTML += `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.email}</td>
            <td>${emp.salary}</td>

            <td>

                <button
                class="edit"
                onclick="editEmployee(${index})">
                Edit
                </button>

                <button
                class="delete"
                onclick="deleteEmployee(${index})">
                Delete
                </button>

            </td>
        </tr>
        `;
    });
}

// Edit Employee

function editEmployee(index)
{
    let emp = employees[index];

    document.getElementById("empId").value =
    emp.id;

    document.getElementById("empName").value =
    emp.name;

    document.getElementById("department").value =
    emp.department;

    document.getElementById("email").value =
    emp.email;

    document.getElementById("salary").value =
    emp.salary;

    editIndex = index;
}

// Delete Employee

function deleteEmployee(index)
{
    let confirmDelete =
    confirm(
    "Are you sure you want to delete?"
    );

    if(confirmDelete)
    {
        employees.splice(index,1);

        localStorage.setItem(
            "employees",
            JSON.stringify(employees)
        );

        displayEmployees();
    }
}

// Clear Form

function clearForm()
{
    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("department").value = "";
    document.getElementById("email").value = "";
    document.getElementById("salary").value = "";
}

displayEmployees();