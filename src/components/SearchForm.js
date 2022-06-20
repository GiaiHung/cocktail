import React from 'react'
import { useGlobalContext } from "../context"

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()
  const formInput = React.useRef('')

  function setSearchValue() {
    setSearchTerm(formInput.current.value)
  }

  React.useEffect(() => {
    formInput.current.focus()
  }, [])

  return (
    <section className="section search">
      <form className="search-form" onSubmit={e => e.preventDefault()}>
        <div className="form-control">
          <label htmlFor="name">search your drinks</label>
          <input
            type="text"
            placeholder='example: gin, vodka...'
            onChange={setSearchValue}
            id='name'
            name='name'
            ref={formInput}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
