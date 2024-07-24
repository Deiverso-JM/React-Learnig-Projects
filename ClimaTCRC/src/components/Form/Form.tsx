import { ChangeEvent, FormEvent, useState } from "react"
import { countries } from "../../data/countries"
import styles from './Form.module.css'
import { SearchType } from "../../types"
import Alert from "../Alert/Alert"

type FormProps = {
    fecthWeather: (search: SearchType) => Promise<void>
}

function Form({fecthWeather}: FormProps) {

    const [search, setSearch] = useState<SearchType>({
        country: '',
        city: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) =>{
        e.preventDefault()


        if(Object.values(search).includes('')){
            return setAlert('Debes rellenar todos los campos')
        }

        
        fecthWeather(search)


    }

  return (
    <form onSubmit={e => handleSubmit(e)} className={styles.form}>
        {alert && <Alert>{alert}</Alert>}
        <div className={styles.field}> 
            <label htmlFor="city">Ciudad:</label>
            <input 
                type="text" 
                id="city"
                name="city"
                placeholder="Ciudad"
                value={search.city}
                onChange={handleChange}/>
        </div>

        <div className={styles.field}>
            <label htmlFor="country">Pais:</label>
            <select  name="country" id="country" value={search.country} onChange={handleChange}>
            <option >-- Selecciones un pais --</option>
            {countries.map((country) => (
                <option
                    key={country.code}
                    value={country.code}
                >
                    {country.name}
                </option>
            ))}
            </select>
        </div>


        <input className={styles.submit} type="submit" value={'Consultar Clima'} />
    </form>

  )
}

export default Form