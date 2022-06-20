import { Link } from 'react-router-dom'
import { useGlobalContext } from "../context"

const CocktailList = () => {
    const { loading, cocktails } = useGlobalContext()

    if (loading) {
        return (
            <div className="loader"></div>
        )
    }

    if (cocktails.length < 1) {
        return (
            <h2 className="section-title">
                sorry, we can't find your drinks
            </h2>
        )
    }

    return (
        <section className="section">
            <h2 className="section-title">
                Cocktails
            </h2>
            <div className="cocktails-center">
                {
                    cocktails.map(cocktail => {
                        const { 
                            idDrink: id,
                            strDrinkThumb: img,
                            strDrink: name,
                            strAlcoholic: alcoholic,
                            strGlass: glass, 
                        } = cocktail

                        return (
                            <article key={id} className="cocktail">
                                <div className="img-container">
                                    <img src={img} alt={name} />
                                </div>
                                <div className="cocktail-footer">
                                    <h3>{name}</h3>
                                    <h4>{glass}</h4>
                                    <p>{alcoholic}</p>
                                </div>
                                <Link to={`/cocktail/${id}`} className='btn btn-primary btn-details'>
                                    Details
                                </Link>
                            </article>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default CocktailList
