import Header from "./Header"
import Content from "./Content"
 
function  Course(props){
  let p=props.course.parts    

  return(
    <div>
      <Header course = {props.course.name}/>
      {p.map((party,ideeke)=> <Content   parts={party} key={ideeke}  />)}
      
    </div>
  )
}
  export default Course
//        
//{p.map((part,i)=> <Content   parts={part} id={i} />)}
  