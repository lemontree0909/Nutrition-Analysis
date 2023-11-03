export function NutritionComponent({ label, quantity, unit }) {



    return(<div>
        <ul className="container total">
            <li>{label} </li>
            <p><b>: {quantity.toFixed()}</b> {unit}</p>
        </ul>

        </div>)
}