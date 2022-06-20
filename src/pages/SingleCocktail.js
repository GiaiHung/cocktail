import React from 'react'
import { Link, useParams } from 'react-router-dom'

const SingleCocktail = () => {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [cocktail, setCocktail] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)

    async function getSingleCocktail() {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await response.json()
        const { drinks } = data

        if (!drinks) {
          setCocktail(null)
        }

        const {
          strDrink: name,
          strCategory: category,
          strAlcoholic: info,
          strGlass: glass,
          strDrinkThumb: img,
          strInstructions: instructions,
          strIngredient1: ingredient1,
          strIngredient2: ingredient2,
          strIngredient3: ingredient3,
          strIngredient4: ingredient4,
          strIngredient5: ingredient5,
        } = drinks[0]

        const ingredients = [ingredient1, ingredient2, ingredient3, ingredient4, ingredient5]
        const newCocktail = {
          name, img, category, info, glass, instructions, ingredients
        }
        console.log(newCocktail);
        setCocktail(newCocktail)
      }

      catch (error) {
        console.error('you have error');
      }

      setLoading(false)
    }

    getSingleCocktail()
  }, [id])


  if (loading) {
    return (
      <div className="loader"></div>
    )
  }

  if(!cocktail) {
    return (
      <div className="section-title">
        <h2>
          Sorry, we can't find your drinks
        </h2>
      </div>
    )
  }

  const { name, img, category, info, glass, instructions, ingredients } = cocktail

  return (
    <section className="section cocktail-section">
      <Link to='/' className='btn btn-primary'>
        Back to home
      </Link>

      <div className="section-title">
        <h2>{name}</h2>
      </div>

      <div className="drink">
        <img src={img} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span> 
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span> 
            {category}
          </p>
          <p>
            <span className="drink-data">info:</span> 
            {info}
          </p>
          <p>
            <span className="drink-data">glass:</span> 
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions:</span> 
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients:</span> 
            {
              ingredients.map((item, index) => {
                return (
                  <span key={index}>
                    {item}
                  </span>
                )
              })
            }
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
