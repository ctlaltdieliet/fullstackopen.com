function  Part(props){
  
return (<p key={props.i}>

      {props.part.name} {props.part.exercises}
    </p>
  )
  }

  export default Part
