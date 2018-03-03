import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import {db} from '../../components/firebase';

class HomeComponent extends Component {
    constructor(props){
      super(props);
      this.state={
        content : [],
        loader:1
      }
    }
    componentWillMount(){
      let movieRevies = db.collection("movies-reviews");
      let datas = [];
      movieRevies.orderBy("id", "desc").limit(7).get().then((querySnapshot)=>{
          querySnapshot.forEach(function(doc) {
                  datas.push(doc.data());
              })
              this.setState({content:datas,loader:0});
      }).catch(function(error) {
          console.log("Error getting document:", error); console.log("Error getting document:", error);
      })
    }
    setPrimaryContent = () =>{
      if(this.state.content && this.state.content.length){
        let content = this.state.content[0];
        return (
          <div>
            <div className="row" >
              <div className=" col-lg-6" >
              <h2><strong>Latest : </strong></h2>
              <h4 className="card-title">
                <a href={'/detail/'+content.id}>{content.title}</a>
              </h4>
              </div>
            </div>
            <div className="row" >
              <div className=" my-4 col-lg-6 videoWrapper">
                <iframe src={"https://www.youtube.com/embed/"+content.youtube_trailer} frameborder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
              </div>
              <div className=" my-4 col-lg-6" >
              <div className="card">
                <h5 className="card-header">Cast and crew</h5>
                <div className="card-body cast-info">
                  <div className="row">
                    <div className="col-lg-4">
                      <ul className="list-unstyled mb-0">
                        <li><p><strong>{content.cast_crew[0].title}</strong></p></li>
                      </ul>
                    </div>
                    <div className="col-lg-8">
                      <ul className="list-unstyled mb-0">
                        <li><p>{content.cast_crew[0].value}</p></li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <ul className="list-unstyled mb-0">
                        <li><p><strong>{content.cast_crew[1].title}</strong></p></li>
                      </ul>
                    </div>
                    <div className="col-lg-8">
                      <ul className="list-unstyled mb-0">
                        <li><p>{content.cast_crew[1].value}</p></li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <ul className="list-unstyled mb-0">
                        <li><p><strong>{content.cast_crew[2].title}</strong></p></li>
                      </ul>
                    </div>
                    <div className="col-lg-8">
                      <ul className="list-unstyled mb-0">
                        <li><p>{content.cast_crew[2].value}</p></li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <ul className="list-unstyled mb-0">
                        <li><p><strong>{content.cast_crew[3].title}</strong></p></li>
                      </ul>
                    </div>
                    <div className="col-lg-8">
                      <ul className="list-unstyled mb-0">
                        <li><p>{content.cast_crew[3].value}</p></li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <ul className="list-unstyled mb-0">
                        <li><p><strong>{content.cast_crew[4].title}</strong></p></li>
                      </ul>
                    </div>
                    <div className="col-lg-8">
                      <ul className="list-unstyled mb-0">
                        <li><p>{content.cast_crew[4].value}</p></li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <ul className="list-unstyled mb-0">
                        <li><p><strong>{content.cast_crew[5].title}</strong></p></li>
                      </ul>
                    </div>
                    <div className="col-lg-8">
                      <ul className="list-unstyled mb-0">
                        <li><p>{content.cast_crew[5].value}</p></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="row" >
                <p className="movie-short-content">{content.shortcontent}..</p>
            </div>
          </div>
        );
      }
    }
    
    loadRemaining = () => {
      return this.state.content && this.state.content.length>0 && this.state.content.map((content,index)=>{
        if(index){
          return (
            <div className="col-lg-4 col-sm-6 portfolio-item">
              <div className="card h-100">
                <a href={'/detail/' + content.id} className="card-a-top"><img className="card-img-top" src={content.image} alt={content.title}/></a>
                <div className="card-body">
                  <h4 className="card-title">
                  <a href={'/detail/'+content.id}>{content.title}</a>
                  </h4>
                  <p className="card-text">{content.shortcontent}..</p>
                </div>
              </div>
            </div>
            );
        }
      })
    }

    render() {
        return (<div>
          <header>
          <Carousel infiniteLoop={true} showArrows={true} autoPlay={true}>
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/abhisreview.appspot.com/o/kaala_with_name.png?alt=media&token=6beb728f-7072-4f1d-b0b5-329adc93b145" />
                </div>
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/abhisreview.appspot.com/o/kaala_with_name.png?alt=media&token=6beb728f-7072-4f1d-b0b5-329adc93b145" />
                </div>
                <div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/abhisreview.appspot.com/o/kaala_with_name.png?alt=media&token=6beb728f-7072-4f1d-b0b5-329adc93b145" />
                </div>
            </Carousel>
          </header>
          {this.state.loader == 1 && <div className="loader"><div></div></div>}
          {this.state.loader == 0 && <div className="container">
            {this.setPrimaryContent()}
      
            <h2  className="my-4">Others</h2>
            <div className="row">
              {this.loadRemaining()}
            </div>      
            <hr/>
            <div className="row mb-4">
              <div className="col-md-8">
                <p>This page hosts the reviews of the latest Tamil Movies. It also includes a verdict about the movie basically in three categories <b><i>#OnetimeWatchabe</i></b>, <b><i>#DefinitelyWatchable</i></b>, and  <b><i>#GreatToWatch </i></b> Only after collecting the response from the people.</p>
              </div>
              <div className="col-md-4">
                <a className="btn btn-block btn-primary btn-lg waves-effect waves-light" href="/list">View all</a>
              </div>
            </div>
          </div>}
        </div>)
    
    }
}

export default HomeComponent;