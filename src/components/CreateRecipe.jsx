export function CreateRecipe() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input type='text' name='create-title' id='create-title' />
      </div>
      <br />
      <div>
        <label htmlFor='create_author'>Author: </label>
        <input type='text' name='create-author' id='create_author' />
      </div>
      <div>
        <label htmlFor='create_ingredients'>Ingredients: </label>
        <input type='text' name='create-ingredients' id='create_ingredients' />
      </div>
      <div>
        <label htmlFor='create_steps'>Recipe Steps: </label>
        <input type='text' name='create-steps' id='create_steps' />
      </div>
      <br />
      <textarea />
      <br />
      <br />
      <input type='submit' value='Create' />
    </form>
  )
}
