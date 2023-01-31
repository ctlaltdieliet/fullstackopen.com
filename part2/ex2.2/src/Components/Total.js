function  Total(props){
  let total=0
  for (const i in props["parts"]){
    console.log(props["parts"][i].exercises)
    total+=props["parts"][i].exercises
  }
  console.log("total is "+total)
  return (<strong>
      The total exercises is {total}
      </strong>
  )
}
  
  
  export default Total