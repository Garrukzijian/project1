import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuotationTable from "./QuotationTable";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useLocalStorage from 'react-localstorage-hook';


var id=0;
var nameId=0;
var Subject_code,Subjects_name,group_name,Subjects="";

const GroupNameList=[];
require("./cs-2019.json")
var myData = require("./cs-2019.json")
for (var x in myData.curriculum.subjects){
   group_name=myData.curriculum.subjects[x].groupName;
   Subjects=myData.curriculum.subjects[x];
   for (var y in myData.curriculum.subjects[x].subjects){
     Subject_code = myData.curriculum.subjects[x].subjects[y].code;
     Subjects_name =myData.curriculum.subjects[x].subjects[y].name;
     GroupNameList[id]={"id":id,"nameid":nameId,"name":group_name,"code":Subject_code,"Subjects_name":Subjects_name};
     id+=1;
    }
  nameId+=1;

}

function App() {
  const coursenameRef = useRef();
  const coursecodeRef = useRef();
  const groupenameRef = useRef();
  const gradeRef = useRef();
  const semeteryearRef = useRef();
  const semeterRef = useRef();



  const [dataItems, setDataItems] = useLocalStorage("dataItems",[]);
  
  const addItem = () => {
   
    if (coursecodeRef.current.value === "") {
      alert("Course code is empty");
      return;
    }
    const Coursecode = coursecodeRef.current.value;
    const product = GroupNameList.find((e) => e.code === Coursecode);
    const semseter = semeterRef.current.value
    var itemObj = {
      semseteryear:semeteryearRef.current.value,
      semseter:semeterRef.current.value,
      Coursecode: Coursecode,
      Coursename: product.Subjects_name,
      Groupname: product.name,
      Grade:gradeRef.current.value,
  }
    dataItems.push(itemObj);
    setDataItems([...dataItems]);
  };

  const CourseNameChange = (e) => {
    const pid = coursenameRef.current.value;
    const Course = GroupNameList.find((e) => e.id == pid);
    coursecodeRef.current.value = Course.code;
    groupenameRef.current.value = Course.name;
  }
  const SubjectsNameOptions = GroupNameList.map((v)=>{
    return <option value={v.id}>{v.Subjects_name}</option>
  });

  return (
    <Container>
      <Row>
        <h1>My gpa</h1>
      </Row>
      <Row>
        <Col style={{ backgroundColor: "#eaeaea" }}>
          <Form>
          <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Semeter</Form.Label>
              <Form.Control
                type="number"
                placeholder="Year "
                ref={semeteryearRef}
              >
              </Form.Control>
              <Form.Control
                 type="number"
                 placeholder="Semeter "
                 ref={semeterRef}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Subject Name</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={coursenameRef}
                onChange={CourseNameChange}
              >
                {SubjectsNameOptions}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                  type="string"
                  placeholder="Course Group name "
                  ref={groupenameRef}
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label style={{disable:true}} >Subject Code</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Course code"
                  ref={coursecodeRef}
                >
                </Form.Control>
              </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Grade of the course"
                ref={gradeRef}
              />
            </Form.Group>
            <Button variant="outline-dark" onClick={addItem}>
              Add Course
            </Button>
          </Form>
        </Col>
        <Col>
          <QuotationTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
