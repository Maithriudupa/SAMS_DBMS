const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
// const student = require('./Usertype/Student')

const saltRounds = 10;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// app.use(student);
// app.use(express.static('public'));//to access the files in public folder

app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods:["GET","POST", "PUT", "DELETE"],
        credentials:true,
    }
));
app.use(fileUpload());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   
//     next();
//   });
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60*60*24
    },

}));

 
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"kram@158",
    database:"sams_dbms",
    
}); 

db.connect((err)=>{
    if(err){
        console.log("Db unsuccessfull"+err)
    }
    else{
        console.log("Db successfull")
    }
    
});
app.post ("/register",(req,res)=>
{
const username = req.body.username
const password = req.body.password

bcrypt.hash(password, saltRounds, (err, hash)=>{
    if(err)
    {
        console.log(err);
    }
    db.query("INSERT INTO usertype (username,password) VALUES(?,?)",
    [username,hash],
    (err,result)=>{
        console.log(err);
    })

})
    
})
app.get("/login",(req,res)=>
{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})
app.post ("/login",(req,res)=>
{
const username = req.body.username
const password = req.body.password


    db.query("SELECT * FROM usertype WHERE username=?;" ,
    username,
    (err,result)=>{
        if(err){
            res.send({err: err});
        }else{
            if(result.length > 0){
               bcrypt.compare(password, result[0].password, (err, response)=>
               {
                   if(response){
                       req.session.user = result;
                       console.log(req.session.user)
                       res.send(result);
                   }else{
                    res.send({message:"Wrong username or password"})
                   }
               })
            }else{
                res.send({message:"User doesn't exist"})
            }
           
        }
       
    })
})

app.post ("/student/register",(req,res)=>
{
const first_name = req.body.first_name
const last_name = req.body.last_name
const usn = req.body.usn
const mail = req.body.mail
const phonenumber = req.body.phonenumber
const sem = req.body.sem
const password = req.body.password
const branch = req.body.branch
bcrypt.hash(password, saltRounds, (err, hash)=>{
    if(err)
    {
        console.log(err);
    }
    db.query("INSERT INTO student (first_name, last_name, usn, mail, phonenumber, sem_id, branch_id, password ) VALUES(?,?,?,?,?,?,?,?)",
    [first_name, last_name, usn, mail, phonenumber, sem, branch, hash],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"User Already exist!"})
        }else{
            res.send({message:`Successful ${first_name}`})
            console.log(result)
        }
       
    })

})
    
});
app.post ("/student/login",(req,res)=>
{
const first_name = req.body.first_name
const password = req.body.password


    db.query("SELECT * FROM student WHERE first_name=?;" ,
    first_name,
    (err,result)=>{
        if(err){
            res.send({err: err});
        }else{
            if(result.length > 0){
               bcrypt.compare(password, result[0].password, (err, response)=>
               {
                   if(response){
                       req.session.user = result;
                       console.log(req.session.user)
                       res.send(result);
                   }else{
                    res.send({message:"Wrong username or password"})
                   }
               })
            }else{
                res.send({message:"User doesn't exist"})
            }

        }
       
    })
})
app.get("/student/getAssignment",(req,res)=>
{
    const sem_id = req.query.sem
    const branch_id = req.query.branch

    db.query("SELECT s.subject_id, s.subject, s.subject_code, se.sem, b.branch, a.assignment, l.first_name, s.Assign_date, s.dateof_submission, s.description FROM subject s, lecturer l, assignment a, branch b,sem se WHERE s.sem_id = ? AND s.branch_id = ? AND s.sem_id = se.sem_id AND s.branch_id= b.branch_id AND s.Assignment_id = a.assignment_id AND s.Lecturer_id = l.Lecturer_id",
    [sem_id,branch_id],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"No assignment"})
        }else{
            console.log(result.data)
            res.send(result);
        }
    }
    )
})

// app.post("/student/uploadAssignment",(req,res)=>
// {
// const first_name = req.body.first_name
// const subject_id = req.body.subject
// const  dateOfsubmission = req.body.dateOfsubmission
// const upload = req.body.formData
// db.query("SELECT student_id FROM Student WHERE Student.first_name = ?",
// [first_name],
// (err,result)=>{
//   if(err){
//       console.log(err);
//   }else{
//       const student_id = result;
//       db.query("INSERT INTO uploadAssignment(student_id, subject_id, uploadedAssignment, dateOfSubmission ) VALUES(?,?,?,?)",
//       [student_id[0].student_id, subject_id, upload, dateOfsubmission],
//       (err,result)=>{
//       if(err){
//        console.log(err);
//       }
//         else{
//         res.send(result)
//       }
// })

//   }

// })
// })
app.post('/student/uploadAssignment', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
  
    file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
     
      res.json( {filePath: `uploads/${file.name}` });
    });
  });
app.post("/student/insert",(req,res)=>
{
const first_name = req.body.first_name
const subject_id = req.body.subject
const dateOfsubmission = req.body.dateOfsubmission
const upload = req.body.upload
db.query("SELECT student_id FROM student WHERE Student.first_name = ?",
[first_name],
(err,result)=>{
  if(err){
      console.log(err);
  }else{
      const student_id = result;
      db.query("INSERT INTO uploadassignment(student_id, subject_id, uploadAssignment, dateOfSubmission ) VALUES(?,?,?,?)",
      [student_id[0].student_id, subject_id, upload, dateOfsubmission],
      (err,result)=>{
      if(err){
       console.log(err);
       res.send({message:"Warning: Cannot upload your assignment as submission date is over!"})
      }
        else{
        res.send({message:"Sucessfull: Assignment got uploaded!"})
      }
})

  }

})
})

app.get("/student/getmyAssignment",(req,res)=>
{
    const first_name = req.query.first_name
   
    db.query("SELECT student_id FROM student WHERE Student.first_name = ?",
    [first_name],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            const student_id = result;
            db.query(" SELECT u.Grade, st.first_name, u.uploadAssignment, u.dateOfSubmission, s.subject FROM uploadassignment u, subject s, student st WHERE u.student_id = ? AND u.subject_id = s.subject_id AND u.student_id = st.student_id ",
    [student_id[0].student_id],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"No assignment"})
        }else{
            res.send(result);
        }
    })

}

})
})
app.get('/student/viewAssignment', function(req, res) {
    const file = req.query.filePath
   
    res.sendFile( __dirname + "/public/" + file );
});

app.put("/student/updateAssignment",(req,res)=>{
    const  dateOfsubmission = req.body.dateOfsubmission
    const upload = req.body.upload
    const upload_id = req.body.upload_id
    db.query("UPDATE uploadassignment SET uploadAssignment =?, dateOfSubmission= ? WHERE upload_id = ? ",
    [upload,dateOfsubmission,upload_id],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"No assignment"})
        }else{
            res.send(result);
        }
    })
})
app.post ("/Lecturer/register",(req,res)=>
{
const first_name = req.body.first_name
const last_name = req.body.last_name
const ssn = req.body.ssn
const mail = req.body.mail
const phonenumber = req.body.phonenumber

const password = req.body.password

bcrypt.hash(password, saltRounds, (err, hash)=>{
    if(err)
    {
        console.log(err);
    }
    db.query("call Lecturerregistration(?,?,?,?,?,?)",
    [first_name, last_name, ssn, mail, phonenumber, hash],
    (err,result)=>{
        if(err){
        console.log(err);
        res.send({message:"User Already exist!"})
        }else{
            res.send({message:`Successful ${first_name}`})
            console.log(result)
        }
    })

})
    
});
app.post ("/Lecturer/login",(req,res)=>
{
const first_name = req.body.first_name
const password = req.body.password


    db.query("SELECT * FROM lecturer WHERE first_name=?;" ,
    first_name,
    (err,result)=>{
        if(err){
            res.send({err: err});
        }else{
            if(result.length > 0){
               bcrypt.compare(password, result[0].password, (err, response)=>
               {
                   if(response){
                       req.session.user = result;
                       console.log(req.session.user)
                       res.send(result);
                   }else{
                    res.send({message:"Wrong username or password"})
                   }
               })
            }else{
                res.send({message:"User doesn't exist"})
            }

        }
       
    })
})
app.get("/Lecturer/login",(req,res)=>
{
    if(req.session.user){
        console.log(req.session.user)
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
})
app.post ("/Lecturer/addAssignment",(req,res)=>
{
    const first_name = req.body.first_name
    const subject= req.body.subject
    const subject_code = req.body.subjectcode
    const sem_id = req.body.sem
    const branch_id = req.body.branch
    const Assignment_id = req.body.assignment
    const Assign_date = req.body.Assign_date
    const dateof_submission = req.body.dateof_submission 
    const description = req.body.description


    db.query("SELECT Lecturer_id FROM lecturer WHERE first_name = ?",
      [first_name],
      (err,result)=>{
        if(err){
            console.log(err);
        }else{
            const Lecturer_id = result;
            db.query("INSERT INTO subject(subject, subject_code, sem_id, branch_id, Assignment_id, Lecturer_id, Assign_date, dateof_submission, description ) VALUES(?,?,?,?,?,?,?,?,?)",
            [subject, subject_code, sem_id, branch_id, Assignment_id, Lecturer_id[0].Lecturer_id, Assign_date, dateof_submission, description],
            (err,result)=>{
                if(err){
                    res.send({message:"Unsucessful"})
                    console.log(err)
                }else{
                    res.send({success:true})
                    console.log(result);
                }
            })
        
        }
    })   
});
app.get("/Lecturer/getStudentList",(req,res)=>
{
    const first_name = req.query.first_name
    const sem = req.query.sem
    const branch = req.query.branch
    db.query("SELECT Lecturer_id FROM lecturer WHERE first_name = ?",
    [first_name],
    (err,result)=>{
      if(err){
          console.log(err);
          res.send({message:"Students need yet to upload"})  
      }else{
          const Lecturer_id = result;
            db.query(" SELECT  subject_id FROM subject WHERE Lecturer_id=? AND sem_id= ? AND branch_id = ? ",
            [Lecturer_id[0].Lecturer_id, sem , branch],
            (err,result)=>{
            if(err){
            console.log(err);
            res.send({message:"Students need yet to upload"})
            }else{
            const subject_id = result;
           
            db.query(" SELECT u.upload_id, u.Grade, st.first_name, u.uploadAssignment, u.dateOfSubmission, s.subject FROM uploadassignment u, subject s, student st WHERE u.subject_id = ? AND u.subject_id = s.subject_id AND u.student_id = st.student_id  ",
            [subject_id[0].subject_id],
            (err,result)=>{
             if(err){
             console.log(err);
             res.send({message:"Students need yet to upload"})
             }else{
                console.log(result);
            res.send(result);
        }
        })
    }
    })

}

})
})
app.get("/Lecturer/getAssignmentAssignedByMe",(req,res)=>
{
    const first_name = req.query.first_name
   
    db.query("SELECT Lecturer_id FROM lecturer WHERE Lecturer.first_name = ?",
    [first_name],
    (err,result)=>{
      if(err){
          console.log(err);
      }else{
           const Lecturer_id = result;
           for(i=0; i<result.length; i++){
            db.query(" SELECT s.subject_id, s.sem_id, s.branch_id, s.Assignment_id, se.sem, b.branch, a.assignment, s.subject, s.subject_code, s.Assign_date, s.dateof_submission, s.description FROM subject s, sem se, branch b, assignment a WHERE Lecturer_id=? AND s.sem_id = se.sem_id AND s.branch_id = b.branch_id AND s.Assignment_id = a.assignment_id ",
            [Lecturer_id[i].Lecturer_id],
            (err,result)=>{
            if(err){
            console.log(err);
            res.send({message:"No Assignment Assigned"})
            }else{
           
            res.send(result);
            
        }
    
        })
    }
    }
    })

}
)
app.put("/Lecturer/updateAssignment",(req,res)=>{
   const subject_id = req.body.subject_id
    const subject= req.body.subject
    const subject_code = req.body.subjectcode
    const sem_id = req.body.sem
    const branch_id = req.body.branch
    const Assignment_id = req.body.assignment
    const Assign_date = req.body.Assign_date
    const dateof_submission = req.body.dateof_submission 
    const description = req.body.description
   
    db.query("UPDATE subject SET subject =?, subject_code= ?,sem_id=?, branch_id=?, Assignment_id=?, Assign_date = ?, dateof_submission=?, description=?   WHERE subject_id = ? ",
    [subject, subject_code, sem_id, branch_id, Assignment_id, Assign_date, dateof_submission, description, subject_id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
           
            console.log(result)
            res.send(result);
        }
    })
})
app.put("/Lecturer/updateStudentList",(req,res)=>{
    
    const Grade = req.body.Grade
    const upload_id = req.body.upload_id
    console.log(Grade)
   
    db.query("UPDATE uploadassignment SET Grade =? WHERE upload_id = ? ",
    [Grade,upload_id],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log(result)
            res.send(result);
        }
    })
})
app.get("/Admin/assignment",(req,res)=>
{
   

    db.query("SELECT * FROM  assignment",
    
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result.data)
            res.send(result);
        }
    }
    )
})
app.put("/Admin/updateAssignment",(req,res)=>{
    const assignment_id = req.body.assignment_id
     const assignment= req.body.assignment
   
    
     db.query("UPDATE assignment SET assignment =? WHERE assignment_id = ? ",
     [assignment, assignment_id],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })
 app.put("/Admin/deleteAssignment",(req,res)=>{
    const assignment_id = req.body.assignment_id
     
   
    
     db.query("DELETE FROM assignment WHERE assignment_id = ? ",
     [ assignment_id],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })
 app.get("/Admin/branch",(req,res)=>
{
   

    db.query("SELECT * FROM branch",
    
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result.data)
            res.send(result);
        }
    }
    )
})
app.put("/Admin/updatebranch",(req,res)=>{
    const branch_id = req.body.branch_id
     const branch= req.body.branch
   
    
     db.query("UPDATE branch SET branch =? WHERE branch_id = ? ",
     [branch, branch_id],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })
 app.put("/Admin/deleteAssignment",(req,res)=>{
    const branch_id = req.body.branch_id
     
   
    
     db.query("DELETE FROM branch WHERE branch_id = ? ",
     [ branch_id],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })
 app.get("/Admin/lecturer",(req,res)=>
 {
    
 
     db.query("SELECT * FROM lecturer",
     
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
             console.log(result.data)
             res.send(result);
         }
     }
     )
 })
 app.put ("/Admin/updatelecturer",(req,res)=>
{
const first_name = req.body.first_name
const last_name = req.body.last_name
const ssn = req.body.ssn
const mail = req.body.mail
const phonenumber = req.body.phonenumber

const password = req.body.password
const Lecturer_id = req.body.Lecturer_id
bcrypt.hash(password, saltRounds, (err, hash)=>{
    if(err)
    {
        console.log(err);
    }
    db.query("UPDATE lecturer SET first_name=?, last_name=?, ssn=?, mail=?, phonenumber=?, password=? WHERE Lecturer_id =?",
    [first_name, last_name, ssn, mail, phonenumber, hash,Lecturer_id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
           
            console.log(result)
            res.send(result);
        }
    })
})
})
app.put("/Admin/deletelecturer",(req,res)=>{
    const Lecturer_id = req.body.Lecturer_id
     
   console.log(Lecturer_id)
    
     db.query("DELETE FROM lecturer WHERE Lecturer_id = ? ",
     [ Lecturer_id],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })
 app.get("/Admin/sem",(req,res)=>
{
   

    db.query("SELECT * FROM sem",
    
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result.data)
            res.send(result);
        }
    }
    )
})
app.put("/Admin/updatesem",(req,res)=>{
    const sem_id = req.body.sem_id
     const sem= req.body.sem
   
    
     db.query("UPDATE sem SET sem =? WHERE sem_id = ? ",
     [sem, sem_id],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })
 app.put("/Admin/deletesem",(req,res)=>{
    const sem_id = req.body.sem_id
     
   
    
     db.query("DELETE FROM sem WHERE sem_id = ? ",
     [ sem_id],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })
 app.get("/Admin/student",(req,res)=>
 {
    
 
     db.query("SELECT * FROM student",
     
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
             console.log(result.data)
             res.send(result);
         }
     }
     )
 })
 app.put ("/Admin/updatestudent",(req,res)=>
{
const first_name = req.body.first_name
const last_name = req.body.last_name
const usn = req.body.usn
const mail = req.body.mail
const phonenumber = req.body.phonenumber
const sem_id = req.body.sem
const branch_id = req.body.branch
const password = req.body.password
const student_id = req.body.student_id

    db.query("UPDATE student SET first_name=?, last_name=?, usn=?, mail=?, phonenumber=?,sem_id =? branch_id=? password=? WHERE student_id =?",
    [first_name, last_name, usn, mail, phonenumber, password,sem_id,branch_id, student_id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
           
            console.log(result)
            res.send(result);
        }
    })

})
app.put("/Admin/deletestudent",(req,res)=>{
    const student_id = req.body.student_id
     
   
    
     db.query("DELETE FROM student WHERE student_id = ? ",
     [ student_id],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })
 app.get("/Admin/subject",(req,res)=>
 {
    
 
     db.query("SELECT * FROM subject",
     
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
             console.log(result.data)
             res.send(result);
         }
     }
     )
 })
 app.put ("/Admin/updatesubject",(req,res)=>
{
    const Lecturer_id = req.body.Lecturer_id
    const subject_id = req.body.subject_id
    const subject= req.body.subject
    const subject_code = req.body.subjectcode
    const sem_id = req.body.sem
    const branch_id = req.body.branch
    const Assignment_id = req.body.assignment
    const Assign_date = req.body.Assign_date
    const dateof_submission = req.body.dateof_submission 
    const description = req.body.description
   
    db.query("UPDATE subject SET subject =?, subject_code= ?,sem_id=?, branch_id=?, Assignment_id=?, Lecturer_id=?, Assign_date = ?, dateof_submission=?, description=?   WHERE subject_id = ? ",
    [subject, subject_code, sem_id, branch_id, Assignment_id,Lecturer_id, Assign_date, dateof_submission, description, subject_id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
           
            console.log(result)
            res.send(result);
        }
    })

})
app.put("/Admin/deletesubject",(req,res)=>{
    const subject_id = req.body.subject_id
     
   
    
     db.query("DELETE FROM subject WHERE subject_id = ? ",
     [ subject_id],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })
 app.get("/Admin/uploadedAssignment",(req,res)=>
 {
    
 
     db.query("SELECT * FROM uploadassignment",
     
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
             console.log(result.data)
             res.send(result);
         }
     }
     )
 })
 app.put("/Admin/deleteuploadedAssignment",(req,res)=>{
    const upload_id = req.body.upload_id
     
   
    
     db.query("DELETE FROM uploadassignment WHERE upload_id = ? ",
     [ upload_id],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })
app.listen(3001, ()=>{
    console.log('running at port 3001')
})