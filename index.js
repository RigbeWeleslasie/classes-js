// 1.You are building a feature rollout system for a startup where a FeatureToggle constructor function has properties: featureName (string), isEnabled (boolean), and userGroupAccess (array of strings like "betaTesters", "admins"), and you must use a prototype method canAccess(userRole) to return true or false, a method toggleFeature(flag) to enable or disable the feature, and simulate access attempts using if-else and switch statements for different roles.

function FeatureToggle(featureName, isEnabled, userGroupAccess) {
    this.featureName = featureName;
    this.isEnabled = isEnabled;
    this.userGroupAccess = userGroupAccess;
}

FeatureToggle.prototype.canAccess = function (userRole) {
    if (this.isEnabled == false) {
        return false;
    }
    if (this.userGroupAccess.length === 0) {
        return true;
    }
    return this.userGroupAccess.includes(userRole);
};

FeatureToggle.prototype.toggleFeature = function (flag) {
    this.isEnabled = flag;
};

const newFeature = new FeatureToggle("NewDashboard", false, ["betaTesters", "admins"]);
const userOneRole = "regularUser";
const userTwoRole = "betaTesters";
const userThreeRole = "admins";

console.log(`Feature: ${newFeature.featureName}, Enabled: ${newFeature.isEnabled}`);
if (newFeature.canAccess(userOneRole)) {
    console.log(`${userOneRole} can access ${newFeature.featureName}`);
} else {
    console.log(`${userOneRole} cannot access ${newFeature.featureName}`);
}

if (newFeature.canAccess(userTwoRole)) {
    console.log(`${userTwoRole} can access ${newFeature.featureName}`);
} else {
    console.log(`${userTwoRole} cannot access ${newFeature.featureName}`);
}
newFeature.toggleFeature(true);
console.log(`Feature: ${newFeature.featureName}, Enabled: ${newFeature.isEnabled}`);
if (newFeature.canAccess(userOneRole)) {
    console.log(`${userOneRole} can access ${newFeature.featureName}`);
} else {
    console.log(`${userOneRole} cannot access ${newFeature.featureName}`);
}

if (newFeature.canAccess(userTwoRole)) {
    console.log(`${userTwoRole} can access ${newFeature.featureName}`);
} else {
    console.log(`${userTwoRole} cannot access ${newFeature.featureName}`);
}

// Add a switch statement example for handling different feature access scenarios based on user role
function checkAccess(feature, userRole) {
    switch (userRole) {
        case "regularUser":
            if (feature.canAccess(userRole)) {
                console.log("Regular user can access the feature.");
            } else {
                console.log("Regular user cannot access the feature.");
            }
            break;
        case "betaTesters":
            if (feature.canAccess(userRole)) {
                console.log("Beta tester can access the feature.");
            } else {
                console.log("Beta tester cannot access the feature.");
            }
            break;
        case "admins":
            if (feature.canAccess(userRole)) {
                console.log("Admin can access the feature.");
            } else {
                console.log("Admin cannot access the feature.");
            }
            break;
        default:
            console.log("Unknown user role. Access denied.");
    }
}

checkAccess(newFeature, userOneRole);
checkAccess(newFeature, userTwoRole);
checkAccess(newFeature, userThreeRole);
const publicFeature = new FeatureToggle("PublicFeature", true, []);
console.log(`Feature: ${publicFeature.featureName}, Enabled: ${publicFeature.isEnabled}`);
if (publicFeature.canAccess(userOneRole)) {
    console.log(`${userOneRole} can access ${publicFeature.featureName}`);
} else {
    console.log(`${userOneRole} cannot access ${publicFeature.featureName}`);
}

// 2.In a freelancer time-tracking platform, create a TimeLog constructor function with properties: freelancerName (string), projectDetails (object with name and hourlyRate), and logs (array of objects with date, hoursWorked), then add prototype methods to calculate total earnings, filter logs by date range, and determine if weekly hours exceed 40 using if-else logic.
function TimeLog(freelancerName, projectDetails, logs) {
    this.freelancerName = freelancerName;
    this.projectDetails = projectDetails;
    this.logs = logs;
}

TimeLog.prototype.calculateTotalEarnings = function () {
    let totalEarnings = 0;
    for (const log of this.logs) {
        totalEarnings += log.hoursWorked * this.projectDetails.hourlyRate;
    }
    return totalEarnings;
};

TimeLog.prototype.filterLogsByDateRange = function (startDate, endDate) {
    const filteredLogs = this.logs.filter(log => {
        const logDate = new Date(log.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return logDate >= start && logDate <= end;
    });
    return filteredLogs;
};

TimeLog.prototype.exceedsWeeklyHours = function (weekStartDate) {
    let totalWeeklyHours = 0;
    const start = new Date(weekStartDate);
    const end = new Date(weekStartDate);
    end.setDate(end.getDate() + 6);

    for (const log of this.logs) {
        const logDate = new Date(log.date);
        if (logDate >= start && logDate <= end) {
            totalWeeklyHours += log.hoursWorked;
        }
    }

    if (totalWeeklyHours > 40) {
        return true;
    } else {
        return false;
    }
};
const project = { name: "Website Development", hourlyRate: 50 };
const logs = [
    { date: "2024-01-01", hoursWorked: 8 },
    { date: "2024-01-02", hoursWorked: 6 },
    { date: "2024-01-08", hoursWorked: 10 },
    { date: "2024-01-09", hoursWorked: 7 },
    { date: "2024-01-10", hoursWorked: 9 },
    { date: "2024-01-16", hoursWorked: 8 },
];
const timeLog = new TimeLog("Abel Adhanom", project, logs);
console.log("Total Earnings:", timeLog.calculateTotalEarnings());
const filteredLogs = timeLog.filterLogsByDateRange("2024-01-01", "2024-01-09");
console.log("Filtered logs:", filteredLogs);
console.log("Exceeds weekly hours (2024-01-01):", timeLog.exceedsWeeklyHours("2024-01-01"));
console.log("Exceeds weekly hours (2024-01-08):", timeLog.exceedsWeeklyHours("2024-01-08"));



// 3.You are developing a startup’s order management system where an Order constructor function should contain customer (object with name and email), items (array of objects with productName, quantity, and unitPrice), and status (string), then implement prototype methods to compute total cost, update order status based on payment, and categorize order urgency using switch and conditional statements.

function Order(customer, items, status) {
    this.customer = customer;
    this.items = items;
    this.status = status;
}

Order.prototype.computeTotalCost = function () {
    let totalCost = 0;
    for (const item of this.items) {
        totalCost += item.quantity * item.unitPrice;
    }
    return totalCost;
};

Order.prototype.updateOrderStatusBasedOnPayment = function (paymentStatus) {
    if (paymentStatus === "paid") {
        this.status = "processing";
    } else if (paymentStatus === "failed") {
        this.status = "payment_failed";
    } else if (paymentStatus === "refunded") {
        this.status = "refunded";
    } else {
        console.log("Unknown payment status.");
    }
};

Order.prototype.categorizeOrderUrgency = function () {
    const totalCost = this.computeTotalCost();
    let urgency;

    switch (this.status) {
        case "pending":
            urgency = "Low";
            break;
        case "processing":
            urgency = "Medium";
            break;
        case "shipped":
            urgency = "High";
            break;
        case "delivered":
            urgency = "Completed";
            break;
        case "cancelled":
            urgency = "Cancelled";
            break;
        case "payment_failed":
            urgency = "Payment Issue";
            break;
        case "refunded":
            urgency = "Refunded";
            break;
        default:
            urgency = "Unknown";
    }
    if (totalCost > 1000 && urgency !== "Cancelled" && urgency !== "Payment Issue" && urgency !== "Refunded" && urgency !== "Completed") {
        return urgency = "Very High";
    }
    return urgency;
};
const customer = { name: "John Doe", email: "john.doe@example.com" };
const items = [
    { productName: "Laptop", quantity: 1, unitPrice: 1200 },
    { productName: "Mouse", quantity: 1, unitPrice: 25 },
    { productName: "Keyboard", quantity: 1, unitPrice: 75 }
];
const order = new Order(customer, items, "pending");
console.log("Total Cost:", order.computeTotalCost());
order.updateOrderStatusBasedOnPayment("paid");
console.log("Order Status:", order.status);
console.log("Order Urgency:", order.categorizeOrderUrgency());
order.updateOrderStatusBasedOnPayment("failed");
console.log("Order Status:", order.status);
console.log("Order Urgency:", order.categorizeOrderUrgency());

const cheap_items = [
    { productName: "Mousepad", quantity: 1, unitPrice: 10 },
    { productName: "Keyboard Wrist Rest", quantity: 1, unitPrice: 15 }
];
const cheap_order = new Order(customer, cheap_items, "pending");
console.log("Cheap Order Total Cost:", cheap_order.computeTotalCost());
console.log("Cheap Order Urgency:", cheap_order.categorizeOrderUrgency());
cheap_order.updateOrderStatusBasedOnPayment("paid");
console.log("Cheap Order Urgency:", cheap_order.categorizeOrderUrgency());


//4.In a startup’s employee review tool, design an Employee class with properties: id (number), name (string), performanceMetrics (object with keys like communication, efficiency, and reliability), and feedback (array of strings), then use prototypes to calculate an average score, classify performance level using control flow, and add new feedback based on conditions.



class Employee {
    constructor(id, name, performanceMetrics, feedback) {
        this.id = id;
        this.name = name;
        this.performanceMetrics = performanceMetrics;
        this.feedback = feedback || [];
    }

    calculateAverageScore() {
        let totalScore = 0;
        let metricCount = 0;

        for (const metric in this.performanceMetrics) {
            if (this.performanceMetrics.hasOwnProperty(metric)) {
                totalScore += this.performanceMetrics[metric];
                metricCount++;
            }
        }
        if (metricCount === 0) {
            return 0;
        }
        return totalScore / metricCount;
    }
    classifyPerformanceLevel() {
        const averageScore = this.calculateAverageScore();
        let performanceLevel;

        if (averageScore >= 90) {
            performanceLevel = "Outstanding";
        } else if (averageScore >= 80) {
            performanceLevel = "Excellent";
        } else if (averageScore >= 70) {
            performanceLevel = "Good";
        } else if (averageScore >= 60) {
            performanceLevel = "Needs Improvement";
        } else {
            performanceLevel = "Unsatisfactory";
        }

        return performanceLevel;
    }

    addFeedback(newFeedback, condition) {
        if (typeof condition === 'boolean') {
            if (condition) {
                this.feedback.push(newFeedback);
            }
        } else if (typeof condition === 'function') {
            if (condition(this)) {
                this.feedback.push(newFeedback);
            }
        } else if (condition === undefined || condition === null) {
            this.feedback.push(newFeedback);
        }
    }
}
const employee1 = new Employee(1, "Alice Johnson", { communication: 95, efficiency: 88, reliability: 92 }, ["Great communicator"]);
const employee2 = new Employee(2, "Bob Smith", { communication: 75, efficiency: 65, reliability: 70 });
console.log(`${employee1.name} Average Score:`, employee1.calculateAverageScore());
console.log(`${employee1.name} Performance Level:`, employee1.classifyPerformanceLevel());
console.log(`${employee1.name} Feedback:`, employee1.feedback);
employee1.addFeedback("Excellent teamwork", true);
console.log(`${employee1.name} Feedback after adding:`, employee1.feedback);
console.log(`${employee2.name} Average Score:`, employee2.calculateAverageScore());
console.log(`${employee2.name} Performance Level:`, employee2.classifyPerformanceLevel());
console.log(`${employee2.name} Feedback:`, employee2.feedback);
employee2.addFeedback("Needs to improve time management", employee => employee.performanceMetrics.efficiency < 70);
console.log(`${employee2.name} Feedback after conditional add:`, employee2.feedback);
const employee3 = new Employee(3, "Charlie Brown", { communication: 50, efficiency: 55, reliability: 40 });
employee3.addFeedback("Improve overall performance");
console.log(`${employee3.name} Feedback after adding without condition:`, employee3.feedback);
//5.Build a simple e-learning system where a Course class has properties: title (string), instructor (object with name and expertise), and students (array of objects with name and completionStatus), then add prototype methods to return names of students who completed the course, count enrolled students by expertise area, and use control flow to output different messages for instructors with more or less than 5 students.  

class Course {
    constructor(title, instructor, students) {
        this.title = title;
        this.instructor = instructor;
        this.students = students || [];
    }

    getCompletedStudents() {
        const completedStudents = this.students.filter(student => student.completionStatus === true);
        return completedStudents.map(student => student.name);
    }

    countEnrolledStudentsByExpertise(expertiseArea) {
        let count = 0;
        for (const student of this.students) {
            if (student.expertise === expertiseArea) {
                count++;
            }
        }
        return count;
    }
    instructorMessage() {
        const studentCount = this.students.length;
        if (studentCount > 5) {
            return `${this.instructor.name}, you have a large class of ${studentCount} students!`;
        } else if (studentCount > 0) {
            return `${this.instructor.name}, you have a small class of ${studentCount} students.`;
        } else {
            return `${this.instructor.name}, no students are currently enrolled in your course.`;
        }
    }
}
const instructor1 = { name: "Dr. Jane Smith", expertise: "Data Science" };
const instructor2 = { name: "Prof. David Lee", expertise: "Web Development" };
const students1 = [
    { name: "Alice", completionStatus: true, expertise: "Data Science" },
    { name: "Bob", completionStatus: false, expertise: "Web Development" },
    { name: "Charlie", completionStatus: true, expertise: "Data Science" },
    { name: "David", completionStatus: true, expertise: "Web Development" },
    { name: "Eve", completionStatus: false, expertise: "Data Science" }
];
const students2 = [
    { name: "Frank", completionStatus: true, expertise: "Web Development" },
    { name: "Grace", completionStatus: false, expertise: "Web Development" },
    { name: "Heidi", completionStatus: true, expertise: "Web Development" },
    { name: "Ivan", completionStatus: false, expertise: "Data Science" },
    { name: "Judy", completionStatus: true, expertise: "Web Development" },
    { name: "Kelly", completionStatus: false, expertise: "Data Science" }
];
const course1 = new Course("Introduction to Data Science", instructor1, students1);
const course2 = new Course("Advanced Web Development", instructor2, students2);
const course3 = new Course("Empty Course", instructor1, []);
console.log(`${course1.title} - Completed Students:`, course1.getCompletedStudents());
console.log(`${course1.title} - Data Science Students:`, course1.countEnrolledStudentsByExpertise("Data Science"));
console.log(`${course1.title} - Instructor Message:`, course1.instructorMessage());
console.log(`${course2.title} - Completed Students:`, course2.getCompletedStudents());
console.log(`${course2.title} - Web Development Students:`, course2.countEnrolledStudentsByExpertise("Web Development"));
console.log(`${course2.title} - Instructor Message:`, course2.instructorMessage());
console.log(`${course3.title} - Instructor Message:`, course3.instructorMessage());



