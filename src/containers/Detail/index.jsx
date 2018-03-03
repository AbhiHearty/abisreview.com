import React, { Component } from 'react';
import { db } from '../../components/firebase';
import { setTitle, setMetaDescription } from '../../route';

class DashboardComponent extends Component {
    constructor(props){
      super(props);
      this.state={
        content : {}
      }

    }
    componentWillMount(){
        db.collection("movies-reviews").doc('review'+this.props.match.params.id).get().then((doc)=>{
            if (doc.exists) {
                setTitle(doc.data().title +' | abhisreview.com | Movie Reviews by Abhi');
                setMetaDescription(doc.data().shortcontent);
                this.setState({content:doc.data()});
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        })
    }
    formatDate(date) {
        date  = new Date(date);
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
      
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      }
    render() {
        if(this.state.content && this.state.content.id){
    
        return (
            <div className="container">

                <h1 className="mt-4 mb-3">{this.state.content.title}</h1>
                <div className="row">

                    <div className="col-lg-8">

                        <img className="img-fluid rounded" style={{width: '100%'}} src={this.state.content.image} alt={this.state.content.title}/>

                        <hr/>

                        <p className="posted-info">Posted on <span className="review-date">{this.formatDate(this.state.content.created_at)}</span> </p>

                        <hr/>

                        <p dangerouslySetInnerHTML={{ __html: this.state.content.content }} />
                        
                        <hr/>

                    
                    </div>

                    <div className="col-md-4">


                        <div className="card">
                        <h5 className="card-header">Trailer</h5>
                        <div className="card-body">
                    
                   <iframe src={"https://www.youtube.com/embed/"+ this.state.content.youtube_trailer} frameborder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    
                        </div>
                        </div>

                        <div className="card my-4">
                        <div className="card-body movie-cast">
                            <div className="row">
                                <div className="col-lg-6">
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <p className="field-label">Censor rating</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <p className="field-value">{this.state.content.censor_rating}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <p className="field-label">Release date</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <p className="field-value">{this.state.content.release_date}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <p className="field-label">Movie run time</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <p className="field-value">{this.state.content.movie_run_time}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div className="card my-4">
                        <h5 className="card-header">Cast</h5>
                        <div className="card-body detail-cast">
                            {this.state.content.cast_crew.map((crew)=>{
                                return (<div className="row">
                                <div className="col-lg-6">
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <p className="field-label">{crew.title}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <ul className="list-unstyled mb-0">
                                    <li>
                                        {crew.value.split(',').map((valueArray)=>{
                                            return (valueArray.split('and').map((subArray)=>{ 
                                                return (<p className="field-value">{subArray}</p>)
                                            }));})
                                        }
                                    </li>
                                    </ul>
                                </div>
                            </div>);
                            })}
                        </div>
                        </div>

                        <div className="card my-4" style={{display:'none'}}>
                        <h5 className="card-header">Tags</h5>
                        <div className="card-body">
                            <div className="row">
                            <div className="col-lg-6">
                                <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#">Web Design</a>
                                </li>
                                <li>
                                    <a href="#">HTML</a>
                                </li>
                                <li>
                                    <a href="#">Freebies</a>
                                </li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#">JavaScript</a>
                                </li>
                                <li>
                                    <a href="#">CSS</a>
                                </li>
                                <li>
                                    <a href="#">Tutorials</a>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        </div>

                    </div>

                </div>

            </div>);
        }else{
            return <div className="loader"><div></div></div>
        }
    }
}

export default DashboardComponent;