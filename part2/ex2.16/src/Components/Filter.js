
const Filter=(props) => {
  return (
    <div>
      Filter shown with 
      <input onChange={props.onChange} value={props.filterNeedle} />
    </div>
  )
}
export default Filter
