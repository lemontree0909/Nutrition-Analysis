export function NutritionComponent({ label, quantity, unit }) {



    return(<div>
        <ul className="container total">
            <li>{label}: </li>
            <p><b>{quantity.toFixed(1)}</b> {unit}</p>
        </ul>

        </div>)
}