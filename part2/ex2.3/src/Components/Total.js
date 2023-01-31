const Total = (props) => {
  
  const total = props.parts.reduce(
    (sum, prop) => {
      return sum + prop.exercises
      }
    ,0);
  
  return (
    <strong>
      The total numbers of exercises {total}
    </strong>
  )
};

export default Total