import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import $ from 'jquery';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { db } from '../../components/firebase';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        let dynamciValues = [];
        dynamciValues.push(<div class="col-sm-12">
            <div class="row">
                <div className="col-sm-5">
                    <input type="text" name="key1" class="form-control" placeholder="Enter key" />
                </div>
                <div className="col-sm-5">
                    <input type="text" name="value1" class="form-control" placeholder="Enter value" />
                </div>
                <div className="col-sm-2">
                    <button type="button" class="btn btn-danger">Remove</button>
                </div>
            </div>
        </div>);
        this.state = {
            editorState: EditorState.createEmpty(),
            dynamciValues: dynamciValues,
            dynamcivalue: 1
        }
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }
    submitForm = (e) => {
        e.preventDefault();
        console.log($(e.target).serializeArray());
        debugger;
    }
    addToFirebase = (e) => {
        e.preventDefault();
        var movieRevies = db.collection("movies-reviews");
        var dateNow = Date.now();
        var crew = [{
            title: 'Background score',
            value: 'Bindhu Malini and Vedanth Bharadwaj'
        }, {
            title: 'Direction',
            value: "Arun Prabu, Purushothaman"
        }, {
            title: 'Dialogues',
            value: "Arun Prabu, Purushothaman"
        }, {
            title: 'Background score',
            value: 'Bindhu Malini and Vedanth Bharadwaj'
        }, {
            title: 'Cinematography',
            value: "Shelley Calist"
        }, {
            title: 'Cast',
            value: "Aditi Balan, Anjali Varadhan, Lakshmi Gopalaswamy"
        }, {
            title: 'Production',
            value: "S. R. Prabhu, S. R. Prakashbabu"
        }, {
            title: 'S Music',
            value: "Bindhu Malini ,Vedanth Bharadwaj"
        }, {
            title: 'Screenplay',
            value: "Arun Prabu, Purushothaman"
        }, {
            title: 'Story',
            value: "Arun Prabu, Purushothaman"
        }];
        let shortcontent = `I hope everyone had gone through this movie 🎥 already if not dont make yourself rushing and start filing your social media after it had won a ton of awards ..
        Amazon prime fellas out there just go and watch it as i did . I would suggest ppl to watch it single coz evn a minute of`
     
     
        let content = 'I hope everyone had gone through this movie 🎥 already if not dont make yourself rushing and start filing your social media after it had won a ton of awards .. Amazon prime fellas out there just go and watch it as i did . I would suggest ppl to watch it single coz evn a minute of shake will cost you more than that .. Getting to business now : As its name suggests aruvi pola thelivaana movie !! It relates you , me , the society in a blood sheaded rope very tightly tied with your heart in mouth for sure .. Everything worked well ?? The story by itself stood tall among everyone and aditi balan (aruvi) added essence to it .. Just loved the way the STORY carried herself .. To me the main drive (hero) is the story by itself which hammered my heart throughout the movie None of the faces are known to me personally and its like an un breakable milestone set . If arun prabhu (director) tries to take this film again , he ll definitely fail for sure .. Music done by Bindhu Malini , Vedanth Bharadwaj seriously speaking if the story is heart your music is the Arteries keeps them connected 💗 Editor Raymond Derrick : You are the OXYGEN of this movie , Never seen a single lag keeps me pinned completely Running time 1.30 minutes you ll see a life history of an isolated girl !! (By the society) and the way she replied back with her middle finger pointed towards the face of the society .. Movie stood as an example showing, no big cast is needed for a movie to reach ppl .. To finish it off, Completely un expected movie from a bunch of new faces , released independently without support.. Do watch if you haven&rsquo;t !!'

        movieRevies.doc('review' + dateNow).set({
            cast_crew: crew,
            title: "Aruvi",
            content: content,
            shortcontent: shortcontent,
            reviewby: "Abhilash",
            publish: true,
            id: dateNow,
            youtube_trailer: 'jgYYxs_d_bo',
            created_at: Date(),
            updated_at: Date(),
            release_date: 'Jan 12,2018',
            movie_run_time: '130 minutes',
            censor_rating: 'U',
            image: 'http://images.indianexpress.com/2017/12/aruvi-film-review-759.jpg'
        });
    }
    getDynamicCastCrew() {
        return this.state.dynamciValues.map((value) => { return value; });
    }
    removeDynamicCastCrew = (index) => {
        //check funtionality here
        let dynamciValues = this.state.dynamciValues.splice(index, 1);
        this.setState({
            ...this.state,
            dynamciValues: dynamciValues
        });
    }
    addDynamicCastCrew = (e) => {
        let dynamciValues = this.state.dynamciValues;
        let dynamcivalue = this.state.dynamcivalue + 1;
        dynamciValues.push(<div class="col-sm-12">
            <div class="row">
                <div className="col-sm-5">
                    <input type="text" name={"key" + dynamcivalue} class="form-control" placeholder="Enter key" />
                </div>
                <div className="col-sm-5">
                    <input type="text" name={"value" + dynamcivalue} class="form-control" placeholder="Enter value" />
                </div>
                <div className="col-sm-2">
                    <button type="button" onClick={(e) => { this.removeDynamicCastCrew(dynamcivalue) }} class="btn btn-danger">Remove</button>
                </div>
            </div>
        </div>);
        this.setState({
            ...this.state,
            dynamciValues: dynamciValues,
            dynamcivalue: dynamcivalue
        });
    }
    render() {
        const { editorState } = this.state;
        return (
            <div className="container">
                <h1 className="mt-4 mb-3">Add post</h1>
                <button onClick={this.addToFirebase}>Add new</button>
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" required={true} className="form-control" id="title" name="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cast_crew">Cast and Crew <button type="button" onClick={this.addDynamicCastCrew} class="btn btn-primary">Add</button></label>
                        {this.getDynamicCastCrew()}
                    </div>
                    <div className="form-group">
                        <label htmlFor="reviewby">Review By </label>
                        <input type="text" required={true} className="form-control" id="reviewby" name="reviewby" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="youtube_trailer">Youtube id </label>
                        <input type="text" required={true} className="form-control" id="youtube_trailer" name="youtube_trailer" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="release_date">Release date </label>
                        <input type="text" className="form-control" id="release_date" name="release_date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="movie_run_time">Movie run time </label>
                        <input type="text" className="form-control" id="movie_run_time" name="movie_run_time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="censor_rating">Censor rating </label>
                        <input type="text" className="form-control" id="censor_rating" name="censor_rating" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image </label>
                        <input type="text" className="form-control" id="image" name="image" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="publish">Publish </label>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <input type="radio" id="publish1" name="publish" value={true} />
                            <label htmlFor="publish1">&nbsp; Yes</label>
                        </div>
                        <div className="form-group">
                            <input type="radio" id="publish0" name="publish" value={false} checked={true} />
                            <label htmlFor="publish0">&nbsp; No</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="shortcontent">Short description </label>
                        <input type="text" required={true} className="form-control" id="shortcontent" name="shortcontent" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content </label>
                        <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                        />
                        <textarea style={{ display: 'none' }} disabled required value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>);
    }
}

export default DashboardComponent;