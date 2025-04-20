// Problem 1
console.log("Part 1... creating employees...");

const sam = {
    firstName: "Sam",
    department: "Tech",
    designation: "Manager",
    salary: 40000,
    raiseEligible: true
};
const mary = {
    firstName: "Mary",
    department: "Finance",
    designation: "Trainee",
    salary: 18500,
    raiseEligible: false
};
const bill = {
    firstName: "Bill",
    department: "HR",
    designation: "Executive",
    salary: 21200,
    raiseEligible: false
};

console.log(sam);
console.log(mary);
console.log(bill);

// Problem 2
console.log("Part 2... creating company...");

const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: [sam, mary, bill]
}

console.log(company);

// Problem 3
console.log("Part 3... creating new employee...");

const anna = {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false
}

console.log(anna);
console.log("Adding Anna to company...");

company.employees.push(anna);
console.log(company);

// Problem 4
console.log("Part 4... calculating the total salary for all company employees from company...");
let totalSalary = 0;
for (const object of company.employees){
    totalSalary += object.salary;
}
console.log("Total Salary: " + totalSalary);

//Problem 5
console.log("Part 5... giving 10% raises to eligible employees from company...");
console.log("Raises given to (these include updated salaries and raise eligibility):");
function providingRaises(company){
    for (const object of company.employees){
        if (object.raiseEligible){
            object.salary *= 1.1;
            object.raiseEligible = false;
            console.log(object);
            continue;
        }
        else{
            continue;
        }
    }
}

// Problem 6
console.log("Part 6... updating work from home employee data...");
const employeesFromHome = ['Anna', 'Sam'];
console.log("Employees who are now working from home:");
function workingFromHome(wfhEmployees){
    for (const object of company.employees){
        object.wfh = false;
        for (const name of wfhEmployees){
            if (object.firstName === name){
                object.wfh = true;
                console.log(object);
            }
        }
    }
}
workingFromHome(employeesFromHome);