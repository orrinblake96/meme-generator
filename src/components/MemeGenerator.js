import React from 'react'
import saveAs  from 'file-saver';
import dometoimage from 'dom-to-image';
// import Draggable from 'react-draggable';


class MemeGenerator extends React.Component {
    constructor(){
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImages: []
        }
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data;
                this.setState({
                    allMemeImages : memes
                })
            })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            randomImage : this.state.allMemeImages[Math.floor(Math.random() * this.state.allMemeImages.length)].url
        })
    }

    handleImageDownload = () => {
            dometoimage.toBlob(document.getElementById("meme-image"))
                .then(blob => {
                    saveAs(blob, 'meme-name.png');
                })
        }
    
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Top Text"
                        name="topText"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Bottom Text"
                        name="bottomText"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>

                <div id="meme-image" className="meme">
                    <img src={this.state.randomImage} alt="Broken?"/>
                        {/* <Draggable> */}
                            <h2 className="top">{this.state.topText}</h2>
                        {/* </Draggable>    */}
                        {/* <Draggable> */}
                        <h2 className="bottom">{this.state.bottomText}</h2> 
                        {/* </Draggable>    */}
                </div>

                <button className="download-button" onClick={this.handleImageDownload}>Download Meme</button>
            </div>
        )
    }
}

export default MemeGenerator;