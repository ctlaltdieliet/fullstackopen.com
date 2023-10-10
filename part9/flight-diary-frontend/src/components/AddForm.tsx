const AddForm= () => {
  return(
<><h2>Add new entry</h2><table>
      <tr>
        <td><strong>Date</strong></td>
        <td><input type="text" id="date" name="date" /></td>
      </tr>
      <tr>
        <td><strong>Visibility</strong></td>
        <td><input type="text" id="Visibility" name="Visibility" /></td>
      </tr>
      <tr>
        <td><strong>Weather</strong></td>
        <td><input type="text" id="Weather" name="Weather" /></td>
      </tr>
      <tr>
        <td><strong>Comment</strong></td>
        <td><input type="text" id="Comment" name="Comment" /></td>
      </tr>
    </table>
    <button  value="add">Add</button></>
  )
}
export default AddForm;