const Images = ({images, openCanvas}) => {
    return (
        <div className="images">
            {images.map(image =>{
                return <img className="images__image" src = {image.url} key = {image.id} alt = "" onClick = {event => openCanvas(image.id)}/>
            })}
        </div>
    );
}
 
export default Images;