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
        return (<div className="row" >
          <div className=" my-4 col-lg-6" >
            <h2><strong>Latest : </strong></h2>
            <h4 className="card-title">
              <a href={'/detail/'+content.id}>{content.title}</a>
            </h4>
            <ul>
              <li>
                <strong>Cast and crew</strong>
              </li>
              <li>{content.cast_crew[0].title} : {content.cast_crew[0].value}</li>
              <li>{content.cast_crew[1].title} : {content.cast_crew[1].value}</li>
              <li>{content.cast_crew[2].title} : {content.cast_crew[2].value}</li>
              <li>{content.cast_crew[3].title} : {content.cast_crew[3].value}</li>
              <li>{content.cast_crew[4].title} : {content.cast_crew[4].value}</li>
              <li>{content.cast_crew[5].title} : {content.cast_crew[5].value}</li>
            </ul>
            <p>{content.shortcontent}..</p>
          </div>
          <div className=" my-4 col-lg-6 videoWrapper">
          <iframe src={"https://www.youtube.com/embed/"+content.youtube_trailer} frameborder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </div>
        </div>);
      }
    }
    
    loadRemaining = () => {
      return this.state.content && this.state.content.length>0 && this.state.content.map((content,index)=>{
        if(index){
          return (
            <div className="col-lg-4 col-sm-6 portfolio-item">
              <div className="card h-100">
                <a href={'/detail/'+content.id}>{content.title}><img className="card-img-top" src={content.image} alt="" height="200 px"/></a>
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
                    <img src="https://i.ytimg.com/vi/DW7vT_P3444/maxresdefault.jpg" />
                </div>
                <div>
                    <img src="https://i.ytimg.com/vi/YqbNeUTrXKE/maxresdefault.jpg" />
                </div>
                <div>
                    <img src="https://i.ytimg.com/vi/5Y6oqSWVMhA/maxresdefault.jpg" />
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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, expedita, saepe, vero rerum deleniti beatae veniam harum neque nemo praesentium cum alias asperiores commodi.</p>
              </div>
              <div className="col-md-4">
                <a className="btn btn-lg btn-secondary btn-block" href="/list">View all</a>
              </div>
            </div>
          </div>}
        </div>)
    
    }
}

export default HomeComponent;