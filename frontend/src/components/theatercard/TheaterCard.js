import EmptyImage from "../../images/sampleSize.jpg";
import './Theatercard.css'
export default function MyTheaterCard(props) {
    return (
        <>
            <div className="container" style={{ maxHeight: '200px' }}>
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-2 text-center">
                            <img src={EmptyImage} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-10">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


