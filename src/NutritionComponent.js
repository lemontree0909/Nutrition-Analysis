// function NutritionComponent({ label, quantity, unit }) {



//     return(<div>
//         <div className="container">
//             <h2>{label}</h2>
//         </div>

//         <div className="container">
//             <h2>{quantity} {unit}</h2>
//         </div>

//         </div>)
// }

// export default NutritionComponent;

export const NutritionComponent = ({ label, quantity, unit }) => {
    return (
        <div>
            <p><b>{label}</b> - {quantity} {unit}</p>
        </div>
    )
}