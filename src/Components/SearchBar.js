import { useState } from "react"
import '../App.css'

import './CSS/SearchBar.css'

export default function SearchBar(props) {
    const [innerSearch, setInnerSearch] = useState("")
    const [selectYear, setSelectYear] = useState("");

    return (

        <div className="container">

            <input
                aria-labelledby="search-button"
                //id="input"
                type="search"
                className="inputSearch"

                placeholder="Search Movies"
                value={innerSearch}
                onChange={e => {
                    setInnerSearch(e.target.value)
                    props.onSubmit(innerSearch)
                }}

            />
            <input
                aria-labelledby="search-button"
                type="search"
                className="inputYear"
                placeholder="Search Year"
                value={selectYear}
                onChange={(e) => setSelectYear(e.target.value)}

            />


            <button
                className="Button"
                id="Search-button"
                type="button"
                placeholder="Search"
                onClick={() => props.onSubmit(innerSearch, selectYear)}
            > Search

            </button>

        </div>
    );
}