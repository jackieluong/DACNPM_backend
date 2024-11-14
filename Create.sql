
create schema da_cnpm  --Name of the database, using mysql
-- Table: Person
CREATE TABLE Person (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Birthday DATETIME,
    Phone_number VARCHAR(10),
    Address VARCHAR(100),
    Gender VARCHAR(5),
    Email VARCHAR(50)
);

-- Table: Employee
CREATE TABLE Employee (
    ID INT PRIMARY KEY,
    Start_date DATETIME,
    Type VARCHAR(50),
    FOREIGN KEY (ID) REFERENCES Person(ID) ON DELETE CASCADE
);

-- Table: Teacher
CREATE TABLE Teacher (
    ID INT PRIMARY KEY,
    Certificate VARCHAR(50),
    Start_date DATETIME,
    FOREIGN KEY (ID) REFERENCES Person(ID) ON DELETE CASCADE
);

-- Table: Student
CREATE TABLE Student (
    ID INT PRIMARY KEY,
    FOREIGN KEY (ID) REFERENCES Person(ID) ON DELETE CASCADE
);

-- Table: Course
CREATE TABLE Course (
    ID VARCHAR(5) PRIMARY KEY,
    Name VARCHAR(50),
    Fee INT,
    Description VARCHAR(100),
    Status VARCHAR(50)
--     ID_employee INT,
--     FOREIGN KEY (ID_employee) REFERENCES Employee(ID) ON DELETE SET NULL
);

-- Table: Register
CREATE TABLE Register (
    ID_student INT,
    ID_course VARCHAR(5),
    PRIMARY KEY (ID_student, ID_course),
    FOREIGN KEY (ID_student) REFERENCES Student(ID) ON DELETE CASCADE,
    FOREIGN KEY (ID_course) REFERENCES Course(ID) ON DELETE CASCADE
);

-- Table: Class
CREATE TABLE Class (
    ID VARCHAR(5) PRIMARY KEY,
    Place VARCHAR(100),
    Start_date DATE,
    End_date DATE,
    Study_time TIME,
    Duration INT, -- minute
    ID_course VARCHAR(5),
    ID_teacher INT,
    
    FOREIGN KEY (ID_course) REFERENCES Course(ID) ON DELETE SET NULL,
    FOREIGN KEY (ID_teacher) REFERENCES Teacher(ID) ON DELETE SET NULL
);

-- Table: ClassDocument
CREATE TABLE ClassDocument (
    ID INT PRIMARY KEY AUTO_INCREMENT, -- Unique identifier for each document
    ClassID VARCHAR(5) NOT NULL,       -- Links the document to a specific class
    DocumentName VARCHAR(255) NOT NULL, -- Name of the document (e.g., syllabus.pdf)
    DocumentPath VARCHAR(500) NOT NULL, -- Path to the document storage (e.g., file location)
    UploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the document was uploaded
    FOREIGN KEY (ClassID) REFERENCES Class(ID) ON DELETE CASCADE -- Ensures documents are deleted when the class is removed
);

-- Table: Has
CREATE TABLE Has (
    ID_student INT NOT NULL,
    ID_class VARCHAR(5) NOT NULL,
    Grade VARCHAR(5), -- Stores the student's grade for the class
    PRIMARY KEY (ID_student, ID_class),
    FOREIGN KEY (ID_student) REFERENCES Student(ID) ON DELETE CASCADE,
    FOREIGN KEY (ID_class) REFERENCES Class(ID) ON DELETE CASCADE
);

-- Table: Receipt
-- CREATE TABLE Receipt (
--     ID VARCHAR(10) PRIMARY KEY,
--     Create_at DATETIME,
--     Fee INT,
--     Description VARCHAR(100),
--     Payment_date DATETIME,
--     ID_student INT,
--     FOREIGN KEY (ID_student) REFERENCES Student(ID) ON DELETE SET NULL
-- );

-- Table: Notify
CREATE TABLE Notify (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_employee INT,
    ID_teacher INT,
    ID_student INT,
    Date TIMESTAMP,
    Content VARCHAR(100),
    FOREIGN KEY (ID_employee) REFERENCES Employee(ID) ON DELETE SET NULL,
    FOREIGN KEY (ID_teacher) REFERENCES Teacher(ID) ON DELETE SET NULL,
    FOREIGN KEY (ID_student) REFERENCES Student(ID) ON DELETE SET NULL
);


-- Insert data into Person table
INSERT INTO Person (ID, Name, Birthday, Phone_number, Address, Gender, Email)
VALUES
(1,'John Doe', '1990-05-12 08:30:00', '1234567890', '123 Main St, City', 'Male', 'john.doe@example.com'),
(2,'Jane Smith', '1985-09-23 10:15:00', '0987654321', '456 Oak Ave, City', 'Female', 'jane.smith@example.com'),
(3,'Michael Johnson', '2000-02-10 14:45:00', '1122334455', '789 Pine Rd, City', 'Male', 'michael.johnson@example.com');

-- Insert data into Employee table
INSERT INTO Employee (ID, Start_date, Type)
VALUES
(1, '2020-01-15 09:00:00', 'Full-time'),
(2, '2021-07-01 10:30:00', 'Part-time');

-- Insert data into Teacher table
INSERT INTO Teacher (ID, Certificate, Start_date)
VALUES
(4, 'Mathematics Degree', '2020-09-01 08:00:00'),
(5, 'English Literature Degree', '2021-02-10 09:30:00');

-- Insert data into Student table
INSERT INTO Student (ID)
VALUES
(1),
(2),
(3);

-- Insert data into Course table
INSERT INTO Course (ID, Name, Fee, Description, Status)
VALUES
('C001', 'Mathematics 101', 500, 'Basic Mathematics course', 'Active'),
('C002', 'English 101', 400, 'Introduction to English literature', 'Active');

-- Insert data into Register table
INSERT INTO Register (ID_student, ID_course)
VALUES
(1, 'C001'),
(2, 'C002'),
(3, 'C001');

-- Insert data into Class table
INSERT INTO Class (ID, Place, Start_date, End_date, Study_time,Duration, ID_course, ID_teacher)
VALUES
('CL001', 'Room 101', '2024-01-10', '2024-01-10', '18:00:00',3, 'C001', 4),
('CL002', 'Room 102', '2024-02-15', '2024-02-15', '18:00:00', 3, 'C002', 5);

-- Insert data into ClassDocument table
INSERT INTO ClassDocument (ClassID, DocumentName, DocumentPath)
VALUES
('CL001', 'Math Syllabus', '/documents/math_syllabus.pdf'),
('CL002', 'English Syllabus', '/documents/english_syllabus.pdf');

-- Insert data into Has table
INSERT INTO Has (ID_student, ID_class, Grade)
VALUES
(1, 'CL001', 'A'),
(2, 'CL002', 'B'),
(3, 'CL001', 'A');

-- Insert data into Notify table
INSERT INTO Notify (ID_employee, ID_teacher, ID_student, Date, Content)
VALUES
(1, 1, 1, '2024-01-01 10:00:00', 'Course registration reminder'),
(2, 2, 2, '2024-01-05 11:00:00', 'Class update notification');

