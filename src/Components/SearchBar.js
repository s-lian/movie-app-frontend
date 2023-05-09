import { useState } from "react"
import '../App.css'

import './CSS/SearchBar.css'

export default function SearchBar(props) {
    const [innerSearch, setInnerSearch] = useState("")
    const [selectYear, setSelectYear] = useState("");

    return (

        <div class="container">

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
            <button
                className="Button"
                type="button"
                placeholder="Search"
                onClick={() => props.onSubmit(innerSearch)}
            > Search

            </button>

        </div>
    );
}