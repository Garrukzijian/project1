import { number } from "echarts";
import { useState, useEffect } from "react";
import { Container,Row,Col,Table, Button} from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

function QuotationTable({ data, setDataItems}) {
  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);
  const [GPA, setGPA] = useState(0);
  const [semseteryear, setSemseteryear] = useState(0);
  const [semseter, setSemseter] = useState(0);

  const style= {
    textCenter:{textAlign:"center"},
    textRight:{textAlign:"right"},
  }

  useEffect(() => {
    let sum = 0;
    let GPA = 0;
    let gardenumber=0;
    let semseteryear=0;
    let semseter =0;
    const z = data.map((v, i) => {
     switch(v.Grade){
       case("A"):
       case("a"):
        gardenumber=4;
        break

       case("A-"):
       case("a-"):
         gardenumber=3.75;
        break

       case("B+"):
       case("b+"):
        gardenumber=3.25;
        break

       case("B"):
       case("b"):
        gardenumber=3;
        break

       case("B-"):
       case("b-"):
        gardenumber=2.75
        break

       case("C+"):
       case("c+"):
        gardenumber=2.25;
        break

       case("C"):
       case("c"):
        gardenumber=2;
        break

      case("C-"):
      case("c-"):

        gardenumber=1.75;
        break
      
      case("D"):
      case("d"):
        gardenumber=1;
        break
      
      case("F"):
      case("f"):
        gardenumber=0;
        break
     }
    
    sum+=gardenumber;
    GPA = sum/(i+1);
    return (
      <tr key={i}>
        <td className={style.textCenter}>
          <FaTrashAlt onClick={() => deleteItem(i)} />
        </td>
        <td className={style.textCenter}>{v.Coursecode}</td>
        <td>{v.Coursename}</td>
        <td className={style.textCenter}>{v.Groupname}</td>
        <td className={style.textCenter}>{gardenumber}</td>
      </tr>
      );
    });
    setDataRows(z);
    setSemseteryear(semseteryear);
    setSemseter(semseter);
    setTotal(sum);
    setGPA(GPA);
  }, [data]);
  

  const deleteItem = (i) => {
    data.splice(i,1)
    setDataItems([...data])
  };

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Container>
      <Row>
        <Col>
            <h1>My GPA</h1>
        </Col>
        <Col style={style.textRight}>
            <Button onClick={clearTable} variant="dark">Clear</Button>
        </Col>
      </Row>
      <Row>
        <h2>Year{semseteryear} Semester{semseter}</h2>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th style={{ width: "20px" }}>&nbsp;</th>
            <th className={style.textCenter}>Coursecode</th>
            <th className={style.textCenter}>Coursename</th>
            <th className={style.textCenter}>Groupname</th>
            <th className={style.textCenter}>Grade</th>
            <th className={style.textCenter}>GPA</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>
              {formatNumber(total)}
            </td>
            <td className={style.textRight}>
              {formatNumber(GPA)}
            </td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
