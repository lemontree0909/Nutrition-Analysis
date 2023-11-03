export function NutritionComponent({ label, quantity, unit }) {



    return(<div>
        <div className="container">
            <p><b>{label}</b></p>
            <p>{quantity} {unit}</p>
        </div>

        </div>)
}