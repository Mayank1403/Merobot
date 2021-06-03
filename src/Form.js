export const PENCIL = "pencil";
export const RECTANGLE = "rectangle";

const Form = props => {
    return (
        <div className = "flex-child sidebar">

            <h2>Fill the Query</h2>
            <form className = "form" onSubmit={(e) => e.preventDefault()}>
                <label>Type in Input</label>
                <input 
                    type = "text"
                    required
                    value = {props.query}
                    onChange={(e)=>props.setQuery(e.target.value)}
                />
                <button>Submit</button>
            </form>

            <label>Select Tool</label>
            <select value={props.tool} onChange={(e) => props.setTool(e.target.value)}>
                <option value={PENCIL}>Pencil</option>
                <option value={RECTANGLE}>Rectangle</option>
            </select>
            <label>Stroke Color</label>
            <input type="color" value={props.color} onChange={props.changeColor}/>
            <label>Fill Color</label>
            <input type="color" value={props.fillColor} onChange={props.changeFillColor}/>
        </div>
    );
}

export default Form;


