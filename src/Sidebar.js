const Sidebar = ({color, fillColor, changeColor, changeFillColor, closeModal}) => {
    return (
        <div className = "sidebar">
            <label>Select Stroke Color</label>
            <input
                type="color"
                value={color}
                onChange={changeColor}
            />
            <label>Select Fill Color</label>
            <input
                type="color"
                value={fillColor}
                onChange={changeFillColor}
            />
            <button
                onClick={closeModal}
            >
                Done
            </button>
        </div>
    );
}
 
export default Sidebar;