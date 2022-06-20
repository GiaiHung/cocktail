import React, { useState, useEffect, useContext, useCallback } from 'react'

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [cocktails, setCocktails] = useState([])
    const [searchTerm, setSearchTerm] = useState('a')

    const fetchDrinks = useCallback(async () => {
        setLoading(true)

        try {
            const response = await fetch(`${URL}${searchTerm}`)
            const data = await response.json()
            const { drinks } = data
            if (!drinks) {
                setCocktails([])
            } else {
                setCocktails(drinks)
            }
        } catch (error) {
            console.error('Cant fetch!!')
        }

        setLoading(false)
    }, [searchTerm])

    useEffect(() => {
        fetchDrinks()
    }, [searchTerm, fetchDrinks])

    return (
        <AppContext.Provider value={{
            loading,
            cocktails,
            setLoading,
            setSearchTerm
        }}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext }