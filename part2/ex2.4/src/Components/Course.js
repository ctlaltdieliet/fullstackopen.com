import Header from "./Header"
import Content from "./Content"
import Total from "./Total"
 
function  Course(props){
  let p=props.course.parts;    
  return(
    <div>
    <Header course = {props.course.name}/>
    {p.map((party,ideeke)=> <Content   parts={party} key={ideeke}  />)}
    <Total parts={props.course.parts}/>
  </div>
  )
}
  export default Course